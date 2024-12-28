import nodemailer from 'nodemailer';

const sendMail = async (to: string, subject: string, html: string)=>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
          user: "your email address",
          pass: "App password from the same email",
        },
      });
      
      await transporter.sendMail({
        from: 'Tour and Travles 😎', // sender address
        to, // list of receivers
        subject, // Subject line
        text: "Hello world?", // plain text body
        html, // html body
      });
}

export default sendMail;