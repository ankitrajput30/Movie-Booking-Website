import Bookings from "../models/Bookings.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    // return next(err);
    return console.log(error);
  }
  if (!users) {
    return res.status(500).json({ message: "Unexpected Error Occured🙂" });
  }
  return res.status(200).json({ users });
};

export const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).jsom({ message: "Invalid Inputs" });
  }
  let existingUsers;
  try {
    existingUsers = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (existingUsers) {
    return res
      .status(400)
      .json({
        message: "User with same ID already Exist. please procceed with login",
      });
  }
  const newPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = new User({ name, email, password: newPassword });
    user = await user.save();
  } catch (error) {
    // return next(err);
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured🙂" });
  }
  return res.status(201).json({ user });
};

export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).jsom({ message: "Invalid Inputs" });
  }
  const newPassword = bcrypt.hashSync(password);
  let user;
  try {
    user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: newPassword,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured🙂" });
  }
  return res.status(200).json({ message: "Updated Successfully😁" });
};

export const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findByIdAndDelete(id);
  } catch (error) {
    return console.log(error);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured🙂" });
  }
  return res.status(200).json({ message: "Deleted Successfully😁" });
};

export const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).jsom({ message: "Invalid Inputs" });
  }
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Unable to find you here" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Password Incorrect" });
  }
  return res.status(200).json({ message: "Login Successfully😁" });
};

export const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  let bookings;
  try {
    bookings = await Bookings.find({ user: id })
      .populate("movie")
      .populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!bookings) {
    return res.status(500).json({ message: "Unable to get Bookings" });
  }
  return res.status(200).json({ bookings });
};