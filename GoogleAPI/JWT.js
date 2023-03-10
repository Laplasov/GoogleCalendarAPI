const { google } = require('googleapis');
const fs = require('fs');
const jwt = require('jsonwebtoken');

// Load the service account credentials from file
const serviceAccount = require('./service_account_credentials.json');

// Set the desired scope for the access token
const scope = 'https://www.googleapis.com/auth/calendar';

// Set the expiration time for the access token
const expiresIn = '1h';

// Create the JWT
const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scope,
  null
);

// Set the expiration time for the JWT
const now = Math.floor(Date.now() / 1000);
const expiresAt = now + parseInt(expiresIn);

// Create the JWT payload
const payload = {
  iss: serviceAccount.client_email,
  sub: serviceAccount.client_email,
  aud: 'https://oauth2.googleapis.com/token',
  iat: now,
  exp: expiresAt,
  scope: scope,
};

// Sign the JWT using the private key
const signedJwt = jwt.sign(payload, serviceAccount.private_key, {
  algorithm: 'RS256',
});

// Print the signed JWT
console.log(signedJwt);
