import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";
import imagekit from "../config/imageKit.js";

//Generate JWT Token
const generateToken = (userId) => {
  const payload = userId;
  return jwt.sign(payload, process.env.JWT_SECRET);
};

//registerUser
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.json({ success: false, message: "Enter all the fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    let imageURL = image || "";

    if (image && image.startsWith("data:image/")) {
      // upload base64 to ImageKit
      const response = await imagekit.upload({
        file: image,
        fileName: `${Date.now()}_profile.png`,
        folder: "/users",
      });

      imageURL = imagekit.url({
        path: response.filePath,
        transformation: [
          { width: "400" },
          { quality: "auto" },
          { format: "webp" },
        ],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      image: imageURL,
    });

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//loginUser

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//Get User data using token
export const getUserData = async (req, res) => {
  try {
    const { user } = req;
    res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//get all the cars for the frontend
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvaliable: true });
    res.json({ success: true, cars });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api to update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, email, password, image } = req.body;

    if (!name || !email) {
      return res.json({ success: false, message: "Name and email are required" });
    }

    const emailExists = await User.findOne({ email, _id: { $ne: _id } });
    if (emailExists) {
      return res.json({ success: false, message: "Email is already in use" });
    }

    const updateData = { name, email };

    if (password) {
      if (password.length < 8) {
        return res.json({ success: false, message: "Password must be at least 8 characters long" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    if (image) {
      if (image.startsWith("data:image/")) {
        const response = await imagekit.upload({
          file: image,
          fileName: `${Date.now()}_profile.png`,
          folder: "/users",
        });

        updateData.image = imagekit.url({
          path: response.filePath,
          transformation: [
            { width: "400" },
            { quality: "auto" },
            { format: "webp" },
          ],
        });
      } else {
        updateData.image = image;
      }
    }

    const updatedUser = await User.findByIdAndUpdate(_id, updateData, { new: true });
    res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
