const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

// Create a new JWT client instance
const auth = new JWT({
  email: 'panzacalendar@panza-380209.iam.gserviceaccount.com',
  keyFile: './service_account_credentials.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

// Create a new Calendar API client instance
const calendar = google.calendar({ version: 'v3', auth });

const event = {
    summary: 'Test API Event',
    start: {
      dateTime: '2023-03-15T10:00:00+03:00',
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '2023-03-15T12:05:00+03:00',
      timeZone: 'America/Los_Angeles',
    },
    location: 'San Francisco',
    description: 'This is a test event',
    reminders: {
      useDefault: true,
    },
  };
  
  calendar.events.insert({
    calendarId: 'joncontactmail@gmail.com',
    resource: event,
  }, (err, res) => {
    if (err) {
      console.error(`Error creating event: ${err}`);
      return;
    }
    console.log(`Event created: ${res.data.htmlLink}`);
  });
  