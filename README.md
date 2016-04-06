# Hyperblotter Demo - with Logrr authentication
--
Hyperblotter is the demonstration from [OpenFin](http://openfin.co/)

This version of the app includes updates to integrate the Logrr Login window, to demonstrate server-side login capability for applications leveraging Openfin.

## Build and run demo from source on local machine:

First, clone this repository or download a zip file out of it, your choice.

Install then required dependencies by running the usual:

```
$ npm install
```

## Configuration

Once done, head to your Logrr tenant by accessing the Logrr [Portal].

Go to your SAML configured app, and grab the following value info from the settings tab:
- Sign In Url field value (e.g. *"https://connect.logrr.com/login/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"*)
- Public certificate (a veeeeeeeeeeery long base64 encoded version of your public key. e.g. *"MIIDOjCCAiKgAwIBAgIQAI3...."*)

Have a look at the image below to find the corresponding values on the Logrr Portal:

![Logrr settings](https://logrrcontent.blob.core.windows.net/images/appSetupProperties.png)

Place these values by editing the **server.js** file replacing values as follows:

Before:
```
var samlSettings = {
    validateInResponseTo: false,
    issuer: 'logrr-saml',
    callbackUrl: 'http://localhost:5001/samlValidation',
    entryPoint: '-- Logrr auth application specific here --',
    cert: '-- base64 public key to validate assertions --'
};
```
After:
```
var samlSettings = {
  validateInResponseTo: false,
  issuer: 'logrr-saml',
  callbackUrl: 'http://localhost:5001/samlValidation',
  entryPoint: 'https://connect.logrr.com/login/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
  cert: 'MIIDOjCCAiKgAwIBAgIQAI3....'
};
```
## Run the app

Open two terminal windows and in both change the directory to the 'Hyperblotter' folder.
```
$ cd Hyperblotter
```
If the build tool gulp is not installed, install it globally.
```
$ npm install -g gulp
```
Once installed, in the first terminal window, build the project from the source files.
```
$ gulp build
```
Then start the local Node server.

NB: for a production Node app this would require hosting remotely on Heroku, AWS or a similar platform. OpenFin is not designed to install apps locally (same applies to the *callbackUrl* parameter of Logrr).

```
$ gulp server
```
Once the message 'Express server is listening on port 5001' is shown in the terminal open the second terminal window (leave the first terminal window open, closing it will close the server). Launch Openfin.
```
$ gulp openfin
```
An executable should now be created an launch the Hyperblotter toolbar. 

[Logrr]: http://www.logrr.com
[Portal]: https://portal.logrr.com/