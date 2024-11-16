const express = require('express');
const petController = require('../controllers/petController');
const router = express.Router();


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
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   adopted:
 *                     type: boolean
 *                   species:
 *                     type: string
 *                   health:
 *                     type: string
 *                   attitude:
 *                     type: string
 *                   lastFed:
 *                     type: string
 *                     format: date-time
 *                   lastPlayed:
 *                     type: string
 *                     format: date-time
 */

router.get('/user/:userId', petController.getPetsByUserId);

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
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   userId:
 *                     type: string
 *                   adopted:
 *                     type: boolean
 *                   species:
 *                     type: string
 *                   health:
 *                     type: string
 *                   attitude:
 *                     type: string
 *                   lastFed:
 *                     type: string
 *                     format: date-time
 *                   lastPlayed:
 *                     type: string
 *                     format: date-time
 */

router.get('/', petController.getPets); 

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
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     adopted:
 *                       type: boolean
 *                     species:
 *                       type: string
 *                     health:
 *                       type: string
 *                     attitude:
 *                       type: string
 *                     lastFed:
 *                       type: string
 *                       format: date-time
 *                     lastPlayed:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - User does not have the required role
 */
router.post('/', petController.createPet);

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
 *               properties:
 *                 message:
 *                   type: string
 *                 pet:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     adopted:
 *                       type: boolean
 *                     species:
 *                       type: string
 *                     health:
 *                       type: string
 *                     attitude:
 *                       type: string
 *                     lastFed:
 *                       type: string
 *                       format: date-time
 *                     lastPlayed:
 *                       type: string
 *                       format: date-time
 */

router.post('/adopt', petController.adoptPet); 

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
 *               properties:
 *                 message:
 *                   type: string
 *                 pet:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     adopted:
 *                       type: boolean
 *                     species:
 *                       type: string
 *                     health:
 *                       type: string
 *                     attitude:
 *                       type: string
 *                     lastFed:
 *                       type: string
 *                       format: date-time
 *                     lastPlayed:
 *                       type: string
 *                       format: date-time
 */

router.post('/unadopt', petController.unadoptPet); 

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
 *               adopted:
 *                 type: boolean
 *               lastFed:
 *                 type: string
 *                 format: date-time
 *               lastPlayed:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Pet updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 pet:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     adopted:
 *                       type: boolean
 *                     species:
 *                       type: string
 *                     health:
 *                       type: string
 *                     attitude:
 *                       type: string
 *                     lastFed:
 *                       type: string
 *                       format: date-time
 *                     lastPlayed:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: Error in updating pet
 *       404:
 *         description: Pet not found
 */

router.patch('/:id', petController.updatePet); 

module.exports = router;
