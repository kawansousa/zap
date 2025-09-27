const { db } = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");

const createUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let usuario = await User.findOne({ where: { email } });

    if (usuario) {
      return res.status(409).json({ message: "Email already exists" });
    }

    let hashedPassword = await bcrypt.hash(senha, 10);

    await User.create({ nome, email, senha: hashedPassword });
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    let usuario = await User.findOne({ where: { email } });

    if (!usuario) {
      return res.status(409).json({ message: "Email invalid" });
    }

    const verifyPassword = await bcrypt.compare(senha, usuario.senha);

    if (!verifyPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: usuario.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getusers = async (req, res) => {
  try {
    const user = await User.findAll();
    res.json(user);
  } catch (error) {}
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    let usuario = await User.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: "User not found" });
    }

    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (senha) usuario.senha = await bcrypt.hash(senha, 10);

    await usuario.save();

    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", err });
  }
};

module.exports = { getusers, createUser, loginUser, getUserById, updateUser };
