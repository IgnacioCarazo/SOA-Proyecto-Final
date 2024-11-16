console.log(process.env.JWT_SECRET);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getUsers, saveUser } = require('../models/User');
const { JWT_SECRET } = process.env;

const registerUser = (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  console.log("req",req.body)
 
  if (users.some(user => user.username === username)) {
    return res.status(400).json({ message: 'Usuario ya existe' });
  }

  
  const hashedPassword = bcrypt.hashSync(password, 10);

  
  const newUser = { username, password: hashedPassword, role: 'user' };
  saveUser(newUser);

  res.status(201).json({ message: 'Usuario registrado exitosamente' });
};


const loginUser = (req, res) => {
  const { username, password } = req.body;
  const users = getUsers();

  // Find the user in the database
  const user = users.find(user => user.username === username);
  if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  // Verify password
  if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
  }

  // Generate a token that includes the user's role
  try {
      const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      // Return the token but exclude the password from the response
      res.json({ token, user: { username: user.username, role: user.role } });
  } catch (error) {
      console.error('Error al generar el token JWT:', error);
      res.status(500).json({ message: 'Error en la generación del token' });
  }
};



const getProfile = (req, res) => {
  const { username } = req.user; 

  const users = getUsers();
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  res.json({ username: user.username });
};

const getAllUsers = (req, res) => {
  const users = getUsers(); 
  res.status(200).json(users); 
};

module.exports = { registerUser, loginUser, getProfile, getAllUsers };
