import transporter from "../utils/Mail.js";

export const sendContactEmail = async (req, res) => {
  try {
    console.log("📧 Received contact form submission:", req.body);
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: "avidevelop60@gmail.com",
      replyTo: email,
      subject: `New Contact Form Enquiry: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1f2937; border-bottom: 2px solid #ef4444; padding-bottom: 10px;">New Contact Enquiry</h2>
          <table style="width: 100%; margin: 20px 0;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">Name:</td>
              <td style="padding: 10px 0; color: #1f2937;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">Email:</td>
              <td style="padding: 10px 0; color: #1f2937;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">Phone:</td>
              <td style="padding: 10px 0; color: #1f2937;">${phone || "Not provided"}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151;">Subject:</td>
              <td style="padding: 10px 0; color: #1f2937;">${subject}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; color: #374151; vertical-align: top;">Message:</td>
              <td style="padding: 10px 0; color: #1f2937; line-height: 1.5;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">This email was sent from your website contact form.</p>
        </div>
      `,
    };

    console.log("📤 Sending email to avidevelop60@gmail.com...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully! Message ID:", info.messageId);

    res.status(200).json({
      success: true,
      message: "Enquiry sent successfully!",
    });
  } catch (error) {
    console.error("❌ Error sending contact email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send enquiry. Please try again later.",
      error: error.message,
    });
  }
};
