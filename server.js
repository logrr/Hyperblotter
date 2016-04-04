var   express = require('express')
    , http = require('http')
    , path = require('path')
    , bodyParser = require('body-parser')
    , saml = require('logrr-electron-auth').saml
    , samlExpress = require('logrr-electron-auth').samlExpress;

var app = express();

app.set('title','OpenFin HyperBlotter');
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.urlencoded({ extended: true }));

/* Logrr configuration section for Openfin */
var samlSettings = {
    validateInResponseTo: false,
    issuer: 'logrr-saml',
    callbackUrl: 'http://localhost:5001/samlValidation',
    entryPoint: '-- Logrr auth application specific here --',
    cert: '-- base64 public key to validate assertions --'
};
var expressSettings = {
    expressApp: app
};
saml.setParams(samlSettings);
samlExpress.setParams(expressSettings);

/* serves main page */
app.get('/', function (req, res) {
    res.sendFile("index.html", {"root": __dirname});
});

/* process.env.PORT is used in case you want to push to Heroku, for example, here the port will be dynamically allocated */
var port = process.env.PORT || 5001;

http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
});