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
      to: "avikushwaha479@gmail.com",
      replyTo: email,
      subject: `New Contact Form Enquiry: ${subject}`,
      html:
       `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
  
  <div style="background-color: #1f2937; padding: 24px; color: #ffffff;">
    <p style="margin: 0; font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">Notification</p>
    <h2 style="margin: 4px 0 0 0; font-size: 22px; font-weight: 500;">New Website Enquiry</h2>
  </div>

  <div style="padding: 24px; background-color: #ffffff;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; width: 25%; font-weight: bold; color: #4b5563; font-size: 14px;">Name</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #4b5563; font-size: 14px;">Email</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #4b5563; font-size: 14px;">Phone</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px;">${phone || "—"}</td>
      </tr>
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; font-weight: bold; color: #4b5563; font-size: 14px;">Subject</td>
        <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px; font-weight: bold;">${subject}</td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 20px 0 0 0; font-weight: bold; color: #4b5563; font-size: 14px;">Message</td>
      </tr>
      <tr>
        <td colspan="2" style="padding: 10px 0 0 0; color: #111827; font-size: 15px; line-height: 1.6;">
          <div style="background-color: #fcfcfd; border: 1px dashed #d1d5db; padding: 16px; border-radius: 6px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </td>
      </tr>
    </table>
  </div>

  <div style="background-color: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
    <p style="margin: 0; color: #9ca3af; font-size: 13px;">This email was sent from your website contact form.</p>
  </div>
</div>`
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
