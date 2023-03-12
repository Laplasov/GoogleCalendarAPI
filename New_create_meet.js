const { google } = require('googleapis');
const { OAuth2 } = google.auth;

// Create a new OAuth2 client instance
const oAuth2Client = new OAuth2(
  '264564119953-ib11kmq9bf76r3hvs6hktmvt058at2js.apps.googleusercontent.com',
  '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',
  'http://localhost:3000/oauth2callback'
);
const timestampMicros = Date.now() * 1000;

// Set the access token for the OAuth2 client
oAuth2Client.setCredentials({
  access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJwYW56YWNhbGVuZGFyQHBhbnphLTM4MDIwOS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6InBhbnphY2FsZW5kYXJAcGFuemEtMzgwMjA5LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwiYXVkIjoiaHR0cHM6Ly9vYXV0aDIuZ29vZ2xlYXBpcy5jb20vdG9rZW4iLCJpYXQiOjE2Nzg2NTc3MDYsImV4cCI6MTY3ODY1NzcwNywic2NvcGUiOiJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9hdXRoL2NhbGVuZGFyIn0.gGjorhtqcaplQyFAuNBMRRd5BGeI8zdHz7EJq-5lZ9tlJor8ZlY3Marzl32IQcCrWH6gxHGhxU7R7Fh4EDcuJyc68IPPtZl3Cb64d3Hf_tUosgvKkwTdbBfwATH4-KnVVctg24kT3LObZvRRCjVIsGWAYr3Y1fKIIfpOT1Z2sP7024KfQRd9y3auyK1SC3KH32vko3JHz-460T7euJqp928NLiRlUxB6m8OkU9cp8sC5jiYtyDrZcrYDZzTMM5Of1dGAL3uA3pKoZdoK00L2MoQarx8e3V9x1r5CseLG7LL7c5W-wjiIdTHqgY5-JLUDjSvs-MKxrUw_twVp9huHOQ'
});

// Create a new Calendar API client instance with the OAuth2 client
const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });

const event = {
  summary: 'Test Meet Event',
  location: 'San Francisco',
  start: {
    dateTime: '2023-03-15T10:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  end: {
    dateTime: '2023-03-15T12:00:00-07:00',
    timeZone: 'America/Los_Angeles',
  },
  conferenceData: {
    createRequest: {
      requestId: timestampMicros,
      conferenceSolutionKey: {
        type: 'hangoutsMeet'
      }
    }
  }
};

calendar.events.insert(
  {
    calendarId: 'primary',
    resource: event,
    conferenceDataVersion: 1
  },
  (err, res) => {
    if (err) {
      console.error(`Error creating event: ${err}`);
      return;
    }
    console.log(`Event created: ${res.data.htmlLink}`);
  }
);
