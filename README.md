# Setup Instruction (For MacOS)
1. From https://nodejs.org/en/download/, download the latest version that is most appropriate for you.
2. Go to your command line and do `sudo npm install -g @angular/cli`
3. From https://www.mongodb.com/try/download/community, download the latest version of community that is the most appropriate for you.
4. Unpack the MongoDB zip/tar.gz file to get a folder. Rename that folder as “mongodb”. Put that folder somewhere safe, like your Desktop or Document. In that safe location, create another folder called “mongodb-data” that will store all MongoDB data on your local server.
5. Depending on where you put these folders, later you are going to need this command `/<safe_location>/mongodb/bin/mongod --dbpath=/<safe_location>/mongodb-data`. Remember this command.
6. Perform `git clone` on the repository. `cd` to that repository and run `npm i`.
7. Run `/<safe_location>/mongodb/bin/mongod --dbpath=/<safe_location>/mongodb-data`
8. Open up a new command line/terminal in the repository folder, and run `npm run dev`.
9. Open up a new command line/terminal in the repository folder, and run `ng serve`.

At the end of this, you should be able to access http://localhost:4200/ and see the homepage of employee manager.

# Testing Instruction
1. Frontend test can be run by the command `ng test`
2. To run the backend test, first install mocha `sudo npm install -g mocha`
3. To test the database models, run `mocha server/models/tests`
4. To test the API routes, run `mocha server/routes/tests`

# Using Employee Manager
In `/server/config/mongo.js`, two admin accounts are created with login information as the following:
`username: interview1, password: 12345` and `username: interview2, password: 12345`.
Use these two accounts to login to the system.