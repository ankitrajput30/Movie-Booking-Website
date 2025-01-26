import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).jsom({ message: "Invalid Inputs" });
  }
  let existingAdmins;
  try {
    existingAdmins = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingAdmins) {
    return res.status(400).json({
      message: "Admin with same ID already Exist. please procceed with login",
    });
  }
  const newPassword = bcrypt.hashSync(password);
  let admin;
  try {
    admin = new Admin({ email, password: newPassword });
    admin = await admin.save();
  } catch (error) {
    // return next(err);
    return console.log(error);
  }
  if (!admin) {
    return res.status(500).json({ message: "Unexpected Error Occured🙂" });
  }
  return res.status(201).json({ admin });
};

export const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).jsom({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingAdmin) {
    return res.status(404).json({ message: "Unable to find you here" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password Incorrect" });
  }
  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
  return res
    .status(200)
    .json({ message: "Login Successfully😁", token, id: existingAdmin._id });
};

export const getAdmin = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (error) {
    return console.log(error);
  }
  if (!admins) {
    return res.status(500).json({ message: "Internal Server error" });
  }
  return res.status(200).json({ admins });
};
