const express = require('express');
const router = express.Router();
const apiGatewayController = require('../controllers/apiGatewayController');
const { authenticateToken, authorizeRole } = require('../middlewares/auth');

/**
 * @swagger
 * /pets/user/{userId}:
 *   get:
 *     summary: Get all pets belonging to a specific user
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve pets for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of pets belonging to the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/user/:userId', apiGatewayController.getPetsByUserId);

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Get all pets
 *     responses:
 *       200:
 *         description: List of all pets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', apiGatewayController.getPets); 

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Create a new pet
 *     description: This route is restricted to admin users and requires a valid JWT token for authentication.
 *     security:
 *       - bearerAuth: []  # This defines that a Bearer token is required in the Authorization header
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               species:
 *                 type: string
 *               health:
 *                 type: string
 *               attitude:
 *                 type: string
 *               userId:
 *                 type: string
 *               lastFed:
 *                 type: string
 *                 format: date-time
 *               lastPlayed:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Pet created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pet:
 *                   type: object
 */
router.post('/', apiGatewayController.createPet);

/**
 * @swagger
 * /pets/adopt:
 *   post:
 *     summary: Adopt a pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pet adopted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/adopt',apiGatewayController.adoptPet); 

/**
 * @swagger
 * /pets/unadopt:
 *   post:
 *     summary: Unadopt a pet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               petId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pet unadopted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.post('/unadopt', apiGatewayController.unadoptPet); 

/**
 * @swagger
 * /pets/{id}:
 *   patch:
 *     summary: Update a pet's details
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the pet to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
router.patch('/:id', apiGatewayController.updatePet);

module.exports = router;
