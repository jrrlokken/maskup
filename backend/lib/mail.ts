import { createTransport, getTestMessageUrl } from 'nodemailer';
const nodemailerSendgrid = require('nodemailer-sendgrid');

const transport = createTransport(
  nodemailerSendgrid({
    apiKey: process.env.SENDGRID_API_KEY
  })
);

const MakeEmail = (text: string) => {
  return `
    <div className='email' style='
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    '>
      <h2>Hello :)</h2>
      <p>${text}</p>

      <p>Joshua Lokken</p>
    </div>
  `;
}

export interface MailResponse {
  accepted?: (string)[] | null;
  rejected?: (null)[] | null;
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export interface Envelope {
  from: string;
  to?: (string)[] | null;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transport.sendMail({
    to,
    from: 'me@joshualokken.com',
    subject: 'Your password reset token',
    html: MakeEmail(`Your password reset token is here
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
  })) as MailResponse;
}