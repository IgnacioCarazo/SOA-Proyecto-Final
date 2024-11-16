const express = require('express');
const apiGatewayController = require('../controllers/apiGatewayController');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user with a username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: User already exists
 */
router.post('/register', apiGatewayController.registerUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login and get a JWT token
 *     description: Log in with a username and password and get a JWT token to authenticate the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "user123"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: JWT token generated
 *       401:
 *         description: Incorrect password
 *       404:
 *         description: User not found
 */
router.post('/login', apiGatewayController.loginUser);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the user profile from the Users service
 *     responses:
 *       200:
 *         description: User profile
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.get('/profile', apiGatewayController.getUserProfile);

/**
 * @swagger
 * openapi: 3.0.0
 * info:
 *   title: User API
 *   description: API for managing users
 *   version: 1.0.0
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * paths:
 *   /users:
 *     get:
 *       summary: Get all users
 *       description: Returns a list of all users in the system.
 *       security:
 *         - BearerAuth: []  # Requires JWT Bearer token
 *       responses:
 *         200:
 *           description: List of users
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: The user ID
 *                     username:
 *                       type: string
 *                       description: The username of the user
 *                     email:
 *                       type: string
 *                       description: The user's email
 *         401:
 *           description: Unauthorized (invalid or missing token)
 *         403:
 *           description: Forbidden (token expired or insufficient permissions)
 *         500:
 *           description: Internal Server Error (unexpected issues)
 */
router.get('/', apiGatewayController.getAllUsers);



module.exports = router;
