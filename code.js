import jwt from 'jsonwebtoken';

var lastResponse;

function decodeJwtResponse(cred) {
    return jwt.decode(cred)
}

function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    const responsePayload = decodeJwtResponse(response.credential);
    lastResponse = responsePayload;
    logData(responsePayload);
}

function logData(responsePayload) {
    console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);
}

function testLog() {
    logData(lastResponse);
}

console.log("Hello! code.js loaded!");