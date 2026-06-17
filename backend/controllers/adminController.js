import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";
import transporter from "../utils/Mail.js";
import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (req, res) => {
  try {
    console.log("Login request received! Body:", req.body);
    const { email, password } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    console.log("Looking for admin with email:", email);
    const admin = await Admin.findOne({ email });
    console.log("Admin found in DB:", admin);

    if (!admin) {
      console.log("Admin NOT found!");
      return res.status(401).json({
        success: false,
        message: "Invalid Email",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = generateToken(admin._id);
    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: false, // localhost uses HTTP
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    admin.otp = otp;
    admin.otpExpiry = new Date(
      Date.now() + 5 * 60 * 1000
    );

    await admin.save();

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Password Reset OTP",
      html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e5e5; border-radius: 10px; overflow: hidden;">
      
      <div style="background: #1f2937; padding: 20px; text-align: center;">
        <h1 style="color: #ffffff; margin: 0;">
          Admin Panel
        </h1>
      </div>

      <div style="padding: 30px;">
        <h2 style="color: #111827;">
          Password Reset Request
        </h2>

        <p style="font-size: 16px; color: #4b5563; line-height: 1.6;">
          We received a request to reset your password.
          Use the OTP below to continue.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <span style="
            display: inline-block;
            background: #f3f4f6;
            padding: 15px 30px;
            font-size: 32px;
            font-weight: bold;
            letter-spacing: 8px;
            color: #2563eb;
            border-radius: 8px;
          ">
            ${otp}
          </span>
        </div>

        <p style="font-size: 15px; color: #4b5563;">
          This OTP is valid for <strong>5 minutes</strong>.
        </p>

        <p style="font-size: 15px; color: #4b5563;">
          If you did not request a password reset, you can safely ignore this email.
        </p>
      </div>

      <div style="background: #f9fafb; padding: 15px; text-align: center;">
        <p style="margin: 0; color: #6b7280; font-size: 13px;">
          © ${new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>
      </div>

    </div>
  `,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const admin = await Admin.findOne({ email });

    if (
      !admin ||
      admin.otp !== otp ||
      admin.otpExpiry < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    return res.status(200).json({
      success: true,
      message: "OTP verified",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const admin = await Admin.findOne({ email });

    if (
      !admin ||
      admin.otp !== otp ||
      admin.otpExpiry < new Date()
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must contain uppercase, lowercase, number and special character",
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;
    admin.otp = null;
    admin.otpExpiry = null;

    await admin.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logoutAdmin = (req, res) => {
  res.cookie("adminToken", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};