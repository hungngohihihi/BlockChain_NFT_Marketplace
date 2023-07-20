// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./ERC721.sol";
import "./ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "solidity-string-utils/strings.sol";

contract TimelessNFT is ERC721Enumerable, Ownable {
    using Strings for uint256;
    mapping(string => uint8) existingURIs; //mapping lưu trữ URI của các NFT đã tồn tại.
    mapping(uint256 => address) public holderOf; //ưu trữ địa chỉ chủ sở hữu của mỗi NFT

    address public artist; //địa chỉ của người tạo hợp đồng
    uint256 public royalityFee;
    uint256 public supply = 0; //số lượng NFT đã được tạo ra
    uint256 public totalTx = 0; //tổng số giao dịch đã được thực hiện
    uint256 public cost = 0.01 ether; //giá tiền để tạo một NFT

    // buy or create NFT
    event Sale(
        uint256 id,
        address indexed owner,
        uint256 cost,
        string metadataURI,
        uint256 timestamp
    );
    //thông tin về giao dịch (mua hoặc tạo mới NFT)
    struct TransactionStruct {
        uint256 id;
        address owner;
        uint256 cost;
        string title;
        string description;
        string metadataURI;
        uint256 timestamp;
    }

    TransactionStruct[] transactions;
    TransactionStruct[] minted;

    //người tạo hợp đồng
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _royalityFee,
        address _artist
    ) ERC721(_name, _symbol) {
        royalityFee = _royalityFee;
        artist = _artist;
    }

    function payToMint(
        string memory title,
        string memory description,
        string memory metadataURI,
        uint256 salesPrice
    ) external payable {   // payable khác với address thông thường là địa chỉ có thể gửi ether tới (transfer và send)
        require(msg.value >= cost, "Ether too low for minting!");  // require được sử dụng để kiểm tra điều kiện và nếu điều kiện không đúng, giao dịch sẽ bị hủy và tất cả các thay đổi sẽ được hồi quy (reverted). 
        require(existingURIs[metadataURI] == 0, "This NFT is already minted!");

        uint256 royality = (msg.value * royalityFee) / 100;
        payTo(artist, royality);
        payTo(owner(), (msg.value - royality));

        supply++;

        minted.push(
            TransactionStruct(
                supply,
                msg.sender,
                salesPrice,
                title,
                description,
                metadataURI,
                block.timestamp
            )
        );

        emit Sale(supply, msg.sender, msg.value, metadataURI, block.timestamp);

        _safeMint(msg.sender, supply);
        existingURIs[metadataURI] = 1;
        holderOf[supply] = msg.sender;
    }

    function payToBuy(uint256 id) external payable {
        require(
            msg.value >= minted[id - 1].cost,
            "Ether too low for purchase!"
        );
        require(msg.sender != minted[id - 1].owner, "Operation Not Allowed!");

        uint256 royality = (msg.value * royalityFee) / 100;
        payTo(artist, royality);
        payTo(minted[id - 1].owner, (msg.value - royality));

        totalTx++;

        transactions.push(
            TransactionStruct(
                totalTx,
                msg.sender,
                msg.value,
                minted[id - 1].title,
                minted[id - 1].description,
                minted[id - 1].metadataURI,
                block.timestamp
            )
        );

        emit Sale(
            totalTx,
            msg.sender,
            msg.value,
            minted[id - 1].metadataURI,
            block.timestamp
        );

        minted[id - 1].owner = msg.sender;
    }

    function changePrice(uint256 id, uint256 newPrice) external returns (bool) {
        require(newPrice > 0 ether, "Ether too low!");
        require(msg.sender == minted[id - 1].owner, "Operation Not Allowed!");

        minted[id - 1].cost = newPrice;
        return true;
    }

    function payTo(address to, uint256 amount) internal {
        //chuyển tiền đến một địa chỉ cụ thể
        (bool success, ) = payable(to).call{value: amount}("");
        require(success);
    }

    function getAllNFTs() external view returns (TransactionStruct[] memory) {
        return minted;
    }

    function getNFT(
        uint256 id
    ) external view returns (TransactionStruct memory) {
        return minted[id - 1];
    }

    function getAllTransactions()
        external
        view
        returns (TransactionStruct[] memory)
    {
        return transactions;
    }

    // function getTransactionHash(uint256 id) public view returns (bytes32) {
    //     TransactionStruct memory transaction = minted[id - 1];

    //     string memory transactionData = transaction.id.toString().toSlice().concat(
    //         transaction.owner.toString().toSlice()
    //     ).toSlice().concat(
    //         transaction.cost.toString().toSlice()
    //     ).toSlice().concat(
    //         transaction.title.toSlice()
    //     ).toSlice().concat(
    //         transaction.description.toSlice()
    //     ).toSlice().concat(
    //         transaction.metadataURI.toSlice()
    //     ).toSlice().concat(
    //         transaction.timestamp.toString().toSlice()
    //     );

    //     return keccak256(abi.encodePacked(transactionData));
    // }
}
