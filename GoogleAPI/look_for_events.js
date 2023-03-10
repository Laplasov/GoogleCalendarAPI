const {google} = require('googleapis');

// You will need to provide your own credentials
const auth = new google.auth.GoogleAuth({
  keyFile: './service_account_credentials.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({version: 'v3', auth});

calendar.events.list({
  calendarId: 'user@example.com',
  timeMin: (new Date()).toISOString(),
  maxResults: 10,
  singleEvents: true,
  orderBy: 'startTime',
}, (err, res) => {
  if (err) return console.error('The API returned an error:', err.message);
  const events = res.data.items;
  if (events.length) {
    console.log('Upcoming 10 events:');
    events.map((event, i) => {
      const start = event.start.dateTime || event.start.date;
      console.log(`${start} - ${event.summary}`);
    });
  } else {
    console.log('No upcoming events found.');
  }
});
