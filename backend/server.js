require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skush1554@gmail.com",
    pass: "qzwm ipfa mmkv rvmc",
  },
});

app.get("/", (req, res) => {
  res.send("heloo");
});

app.post("/send-email", async (req, res) => {
  const { email, name, message } = req.body;

 const mailOption = {
  from: email,
  to: "skush1554@gmail.com",
  subject: "New Portfolio Message",
  html: `
  <div style="
      background:#f4f4f7;
      padding:20px;
      font-family:Arial, sans-serif;
      color:#333;
  ">
    <div style="
        max-width:600px;
        margin:auto;
        background:white;
        border-radius:10px;
        padding:25px;
        box-shadow:0 4px 10px rgba(0,0,0,0.1);
    ">
      <h2 style="text-align:center; color:#4A90E2; margin-bottom:20px;">
        📩 New Portfolio Message
      </h2>

      <p style="font-size:16px; margin-bottom:10px;">
        <strong>Name:</strong> ${name}
      </p>

      <p style="font-size:16px; margin-bottom:10px;">
        <strong>Email:</strong> ${email}
      </p>

      <p style="font-size:16px; margin-bottom:10px;">
        <strong>Message:</strong><br/>
        <span style="display:block; margin-top:5px; line-height:1.5;">
          ${message}
        </span>
      </p>

      <hr style="margin:25px 0; border:0; border-top:1px solid #ddd;" />

      <p style="font-size:14px; text-align:center; color:#777;">
        This message was sent from your portfolio contact form.
      </p>
    </div>
  </div>
  `
};


  try {
    await transporter.sendMail(mailOption);
    res.status(200).json({success:true,message:"Email send successfully"});
  } catch (error) {
    res.status(500).json({success:false,message:"Email  can not be send!!!"});
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
