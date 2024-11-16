const axios = require('axios');

// Utility function to make requests to services
const callPetService = (method, path, data = {}) => {
  const url = `http://pet-service:3002/pets${path}`; // Use the service name "pet-service"
  
  switch (method) {
    case 'GET':
      return axios.get(url);
    case 'POST':
      return axios.post(url, data);
    case 'PATCH':
      return axios.patch(url, data);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};

const callUserService = (method, path, data = {}) => {
    const url = `http://user-service:3001${path}`; // Use the service name "user-service"
  
    switch (method) {
      case 'GET':
        return axios.get(url);
      case 'POST':
        return axios.post(url, data);
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  };

module.exports = {
// Get the user profile from the Users service
     // Register a new user
  registerUser: (req, res) => {
    const { username, password } = req.body;
    
    callUserService('POST', '/users/register', { username, password })
      .then((response) => res.status(201).json(response.data))
      .catch((error) => res.status(400).json({ error: 'Unable to register user' }));
  },

  // Log in and get a JWT token
  loginUser: (req, res) => {
    const { username, password } = req.body;
    
    callUserService('POST', '/users/login', { username, password })
      .then((response) => res.status(200).json({ token: response.data.token, user: { username: username, role: role } }))
      .catch((error) => res.status(401).json({ error: 'Invalid credentials' }));
  },

  // Get the user profile from the Users service
  getUserProfile: (req, res) => {
    const userId = req.user.id; // Assuming that the user ID is in `req.user.id`
    
    callUserService('GET', `/users/profile/${userId}`)
      .then((response) => res.json(response.data))
      .catch((error) => res.status(500).json({ error: 'Unable to fetch user profile' }));
  },

  // Get all users
  getAllUsers: (req, res) => {
    callUserService('GET', '/users')
      .then((response) => res.json(response.data))
      .catch((error) => res.status(500).json({ error: 'Unable to fetch users' }));
  },

  // Get all pets
  getPets: (req, res) => {
    callPetService('GET', '')
      .then((response) => res.json(response.data))
      .catch((error) => res.status(500).json({ error: 'Unable to fetch pets' }));
  },

  // Get all pets belonging to a specific user
  getPetsByUserId: (req, res) => {
    const { userId } = req.params;
    callPetService('GET', `/user/${userId}`)
      .then((response) => res.json(response.data))
      .catch((error) => res.status(500).json({ error: 'Unable to fetch pets for the user' }));
  },

  // Create a new pet
  createPet: (req, res) => {
    const petData = req.body; // Data for the new pet
    console.log({petData})
    callPetService('POST', '', petData)
      .then((response) => res.status(201).json(response.data))
      .catch((error) => res.status(500).json({ error: 'Unable to create pet' }));
  },

  // Adopt a pet
  adoptPet: (req, res) => {
    const { petId, userId } = req.body;
    const adoptData = { petId, userId }; // Data for adoption
    callPetService('POST', '/adopt', adoptData)
      .then((response) => res.status(201).json(response.data))
      .catch((error) => res.status(500).json({ error: 'Unable to adopt pet' }));
  },

  // Unadopt a pet
  unadoptPet: (req, res) => {
    const { petId } = req.body;
    callPetService('POST', '/unadopt', { petId })
      .then((response) => res.json(response.data))
      .catch((error) => res.status(500).json({ error: 'Unable to unadopt pet' }));
  },

  // Update a pet's details
  updatePet: (req, res) => {
    const { id } = req.params; // Pet ID to update
    const petData = req.body;  // Updated pet details
    callPetService('PATCH', `/${id}`, petData)
      .then((response) => res.json(response.data))
      .catch((error) => res.status(500).json({ error: 'Unable to update pet' }));
  },
};
