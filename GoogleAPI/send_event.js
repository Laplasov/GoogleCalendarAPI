const { google } = require('googleapis');
const { JWT } = require('google-auth-library');
const nodemailer = require('nodemailer');

// Define variables with placeholders for event details
const eventSummary = 'Placeholder Summary';
const eventLocation = 'Virtual';
const eventDescription = 'Placeholder Description';
const eventStartDate = '2023-03-17T10:00:00-07:00';
const eventEndDate = '2023-03-17T18:00:00-07:00';
const eventTimeZone = 'America/Los_Angeles';

// Define variables with placeholders for email details
const emailSubject = 'Placeholder Subject';
const emailBody = 'Placeholder Body';
const fromEmail = 'joncontactmail@gmail.com';
const toEmail1 = 'yandire@gmail.com';
const toEmail2 = 'joncontactmail@gmail.com';
const smtpPassword = 'hrkvwmhteidaidtu';
const calendarToChange = 'joncontactmail@gmail.com';

// Define the JWT client
const credentials = require('./service_account_credentials.json');
const scopes = ['https://www.googleapis.com/auth/calendar'];
const client = new JWT({
  email: credentials.client_email,
  key: credentials.private_key,
  scopes,
});

// Define the Google Calendar API client
const calendar = google.calendar({
  version: 'v3',
  auth: client,
});

// Define the SMTP transport
const smtpTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEmail,
    pass: smtpPassword,
  },
});

// Define the email options
const emailOptions = {
  from: fromEmail,
  to: toEmail1 + ',' + toEmail2,
  subject: emailSubject,
  text: emailBody,
};

// Define the event details
const event = {
  summary: eventSummary,
  location: eventLocation,
  description: eventDescription,
  start: {
    dateTime: eventStartDate,
    timeZone: eventTimeZone,
  },
  end: {
    dateTime: eventEndDate,
    timeZone: eventTimeZone,
  },
  reminders: {
    useDefault: true,
  },
};

// Insert the event into the calendar
calendar.events.insert({
  calendarId: calendarToChange,
  resource: event,
}, (err, res) => {
  if (err) return console.error(`Error creating event: ${err}`);
  console.log(`Event created: ${res.data.htmlLink}`);
  // Send email notification
  smtpTransport.sendMail(emailOptions, (error, response) => {
    if (error) {
      console.error(`Error sending email: ${error}`);
    } else {
      console.log(`Email sent: ${response.response}`);
    }
    smtpTransport.close();
  });
});
