const bcrypt = require("bcryptjs");
const Student = require("../models/Student");
const generateToken = require("../utils/generateToken");

// Register
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await Student.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await Student.create({
    name,
    email,
    password: hashedPassword
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id)
  });
};

// Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
};