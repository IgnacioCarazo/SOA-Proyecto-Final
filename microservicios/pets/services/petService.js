const fs = require('fs');
const path = require('path');
const petsDbPath = path.join(__dirname, '../db/pets.json');

const getPets = () => {
  const data = fs.readFileSync(petsDbPath);
  return JSON.parse(data).pets;
};

const savePets = (pets) => {
  const data = JSON.stringify({ pets }, null, 2);
  fs.writeFileSync(petsDbPath, data);
};

const adoptPet = (petId, userId) => {
  const pets = getPets();
  const pet = pets.find(p => p.id === petId);
  
  if (!pet) {
    return { error: 'Pet not found' };
  }
  
  if (pet.adopted) {
    return { error: 'Pet already adopted' };
  }
  
  pet.userId = userId;
  pet.adopted = true;
  savePets(pets);
  
  return { pet };
};

const unadoptPet = (petId) => {
  const pets = getPets();
  const pet = pets.find(p => p.id === petId);
  
  if (!pet) {
    return { error: 'Pet not found' };
  }
  
  pet.userId = null;
  pet.adopted = false;
  savePets(pets);
  
  return { pet };
};

const updatePet = (id, updateData) => {
    const pets = getPets();
    const pet = pets.find(p => p.id === id);
    
    if (!pet) {
      return { error: 'Pet not found' };
    }
  
    pet.name = updateData.name || pet.name;
    pet.species = updateData.species || pet.species;
    pet.health = updateData.health || pet.health;
    pet.attitude = updateData.attitude || pet.attitude;
    pet.userId = updateData.userId || pet.userId;
    pet.adopted = updateData.adopted !== undefined ? updateData.adopted : pet.adopted;
    pet.lastFed = updateData.lastFed;
    pet.lastPlayed = updateData.lastPlayed;

  
    savePets(pets);
    return { pet };
  };
  

const createPet = (name, species, health, attitude, userId) => {
    const pets = getPets();
    const id = (pets.length + 1).toString(); // Generate a simple ID
    const newPet = {
      id,
      name,
      species,
      health,
      attitude,
      userId,
      adopted: false,
      lastFed: new Date().toISOString(),
      lastPlayed: new Date().toISOString(),
    };
  
    pets.push(newPet);
    savePets(pets);
    return { pet: newPet };
  };

  const checkPetStates = () => {
    const pets = getPets();
    const currentTime = new Date();
  
    pets.forEach(pet => {
      const lastFed = new Date(pet.lastFed);
      const lastPlayed = new Date(pet.lastPlayed);
  
      const timeDiff = (currentTime - lastFed) / 1000 / 60; // Difference in minutes
      const timePlayedDiff = (currentTime - lastPlayed) / 1000 / 60; // Difference in minutes
  
      // If more than 5 minutes have passed, update the pet's state
      if (timeDiff > 5 || timePlayedDiff > 5) {
        pet.health = 'Hungry';
        pet.attitude = 'Bored';
      }
    });
  
    savePets(pets);
    return { message: 'Pet states checked and updated' };
  };
  
  
  
  const getPetsByUserId = (userId) => {
    const pets = getPets(); // Reuse existing getPets method
    return pets.filter(pet => pet.userId === userId);
  };
  
  module.exports = { getPets, adoptPet, unadoptPet, updatePet, getPetsByUserId, createPet, checkPetStates };
