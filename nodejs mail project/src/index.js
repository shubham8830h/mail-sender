const { google } = require("googleapis");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");


require("dotenv").config();

// Set up OAuth2 client
const oauth2Client = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);
oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN
});

const gmail = google.gmail({
  version: 'v1',
  auth: oauth2Client
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_ADDRESS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: oauth2Client.getAccessToken()
  }
});

// Function to check for new emails
async function checkEmails() {
  try {
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:inbox'
    });
    const messages = res.data.messages || [];
    for (const message of messages) {
      const threadId = message.threadId;
      const replyMessage = await checkReply(threadId);
      if (!replyMessage) {
        await sendReply(message.id);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

// Function to check whether a given email thread has any prior replies
async function checkReply(threadId) {
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: `in:inbox thread:${threadId} from:me`
  });
  const messages = res.data.messages || [];
  return messages[0];
}
