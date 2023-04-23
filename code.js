import * as jose from 'jose'
import jwt from 'jsonwebtoken';

// const publicKey = '';

// const decrypted = jwt.verify(
//     token, publicKey,
//     {algorithms: ['ES512'],
//     audience: 'https://domain.tld',
//     issuer: 'https://domain.tld' }
// );

//https://betterprogramming.pub/jwt-ultimate-how-to-guide-with-best-practices-in-javascript-f7ba4c48dfbd

// function decodeJwtResponse(cred) {
//     // const decoder = new TextDecoder();
//     token = cred;
//     return jwt.verify(
//         token, publicKey,
//         {algorithms: ['ES512'],
//         audience: 'https://domain.tld',
//         issuer: 'https://domain.tld' }
//     );
// }

//https://googleapis.dev/python/google-auth/1.11.3/reference/google.auth.jwt.html

// https://stackoverflow.com/questions/72546348/google-sign-in-decoding-jwt-response


var lastResponse;

console.log('')

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