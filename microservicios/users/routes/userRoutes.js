const express = require('express');
const { registerUser, loginUser, getProfile, getAllUsers } = require('../controllers/userController');
const { authenticateToken } = require('../utils/auth');
const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema con nombre de usuario y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario123"
 *               password:
 *                 type: string
 *                 example: "passwordseguro"
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Usuario ya existe
 */
router.post('/register', registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Inicia sesión y obtiene un token JWT
 *     description: Inicia sesión usando el nombre de usuario y la contraseña, y devuelve un token JWT para autenticar al usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "usuario123"
 *               password:
 *                 type: string
 *                 example: "passwordseguro"
 *     responses:
 *       200:
 *         description: Token JWT generado
 *       401:
 *         description: Contraseña incorrecta
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/login', loginUser);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Obtiene el perfil del usuario
 *     description: Devuelve la información del perfil del usuario autenticado usando el token JWT.
 *     security:
 *       - BearerAuth: []  # Este es el esquema de seguridad que requiere un token Bearer JWT
 *     responses:
 *       200:
 *         description: Perfil del usuario
 *       401:
 *         description: No autorizado (token inválido)
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/profile', authenticateToken, getProfile);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     description: Devuelve una lista de todos los usuarios registrados en el sistema.
 *     security:
 *       - BearerAuth: []  # Este es el esquema de seguridad que requiere un token Bearer JWT
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       401:
 *         description: No autorizado (token inválido)
 */
router.get('/', getAllUsers);

module.exports = router;
