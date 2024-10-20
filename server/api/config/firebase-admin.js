const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.json(__dirname,'serviceAccount.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://trendsware-b1b13-default-rtdb.firebaseio.com"
});

module.exports = admin;


