const PetService = require('../services/petService');

/**
 * Get all pets
 * @route GET /pets
 */
const getPets = (req, res) => {
  const pets = PetService.getPets();
  res.json(pets);
};

/**
 * Adopt a pet
 * @route POST /pets/adopt
 */
const adoptPet = (req, res) => {
  const { petId, userId } = req.body;
  const result = PetService.adoptPet(petId, userId);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  res.status(201).json({ message: 'Pet adopted successfully', pet: result.pet });
};

/**
 * Unadopt a pet
 * @route POST /pets/unadopt
 */
const unadoptPet = (req, res) => {
  const { petId } = req.body;
  const result = PetService.unadoptPet(petId);

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }
  res.json({ message: 'Pet unadopted successfully', pet: result.pet });
};

/**
 * Update a pet's details by pet ID
 * @route PATCH /pets/{id}
 */
const updatePet = (req, res) => {
  const { id } = req.params;
  const { name, species, health, attitude, userId, adopted, lastFed, lastPlayed  } = req.body;

  const result = PetService.updatePet(id, { name, species, health, attitude, userId, adopted, lastFed, lastPlayed  });

  if (result.error) {
    return res.status(400).json({ message: result.error });
  }

  if (!result.pet) {
    return res.status(404).json({ message: 'Pet not found' });
  }

  res.status(200).json({ message: 'Pet updated successfully', pet: result.pet });
};

/**
 * Create a new pet
 * @route POST /pets
 */
const createPet = (req, res) => {
  const { name, species, health, attitude, userId, adopted, lastFed, lastPlayed } = req.body;
  
  if (!name || !species || !health || !attitude) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const result = PetService.createPet(name, species, health, attitude, userId, adopted, lastFed, lastPlayed);

  res.status(201).json({
    message: 'Pet created successfully',
    pet: result.pet,
  });
};

/**
 * Get all pets belonging to a specific user by userId
 * @route GET /pets/user/{userId}
 */
const getPetsByUserId = (req, res) => {
  const { userId } = req.params;
  const pets = PetService.getPetsByUserId(userId);

  if (pets.length === 0) {
    return res.status(404).json({ message: 'No pets found for this user' });
  }

  res.json(pets);
};

/**
 * Check the states of all pets
 * @route GET /pets/checkStates
 */
const checkStates = (req, res) => {
  const result = PetService.checkPetStates();
  res.json(result);
};

module.exports = { getPets, adoptPet, unadoptPet, updatePet, getPetsByUserId, createPet, checkStates };
