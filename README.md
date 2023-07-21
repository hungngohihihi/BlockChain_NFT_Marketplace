To run the demo follow these steps:

1:
    ```sh
    cd PROJECT_NAME # Navigate to the new folder.
    yarn install # Installs all the dependencies.
    ```
2. Create an Infuria project, copy and paste your key in the spaces below.
3. Update the `.env` file with the following details.
    ```sh
    REACT_APP_INFURIA_PID=<INFURIA_API_KEY_HERE>
    REACT_APP_INFURIA_API=<INFURIA_API_KEY_SECRET_HERE>
    ```
4. Install truffle and ganache.
    ```sh
    npm install -g truffle
    npm install ganache --global
    ```
6. Run the app using the following commands.
    ```sh
    yarn install
    ganache -d
    truffle migrate --reset
    yarn start
    ```
<br/>

