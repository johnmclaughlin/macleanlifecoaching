DevNotes

TODOs


MAIN APPLICATION
1. [ done ] Link Dashboard button to authenticated landing page
2. Create Support modal; link to Support button
3. Create Unauthenticated landing page with login
4. [ done ] Clean up RWD around Program Menu
5. Work out mobile header
6. [ done ] Fix broken link in mobile Program Menu
7. Make SVG for header to scale to all devices
8. Add Google Analytics
9. Close open lists upon new list open
10. Test close mobile menu upon module selection

AUTHENTICATION
1. Built out email and other federated logins. Decide how many to build out

USER MANAGEMENT
1. Define User attributes
    a. user id
    b. current module
    c. log user login
2. Create new user generator
    a. ADMIN - create new user + auth code
    b. email auth code to new user
    c. consume auth code as URL parameter

ADMINISTRATION
1. Module Management
2. Program Management [ week ]
3. User management

MISC
1. [ done ] Setup external access with NGROK
    a. Remember to update Google OAUTH when resetting NGROK
    b. use: ngrok http 8080 -host-header="localhost:8080"
2. install aliased NPM packages:
    a.  yarn add material-ui@latest
        yarn add material-ui-next@npm:material-ui@next

Installing eslint / AirBnB

npm install eslint
npx install-peerdeps --dev eslint-config-airbnb
npm install babel-eslint --save-dev

.eslintrc
    module.exports = {
        "extends": "airbnb",
        "parser": "babel-eslint",
        "plugins": [
            "react",
            "jsx-a11y",
            "import"
        ],
        "env": {
            "browser": true,
            "node": true,
            "jasmine": true
        },
    };