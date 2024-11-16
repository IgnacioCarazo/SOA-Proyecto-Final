import React, { useState } from "react";
import axios from "axios";
import "./App.css";

interface Pet {
  id: string;
  name: string;
  userId: string | null;
  adopted: boolean;
  species: string;
  health: string;
  attitude: string;
  lastFed: string;
  lastPlayed: string;
}

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");
  const [userToken, setUserToken] = useState("");
  const [userRole, setUserRole] = useState("");
  const [pets, setPets] = useState<Pet[]>([]);

  // New Pet Form fields
  const [newPetName, setNewPetName] = useState("");
  const [newPetSpecies, setNewPetSpecies] = useState("");
  const [newPetHealth, setNewPetHealth] = useState("Healthy");
  const [newPetAttitude, setNewPetAttitude] = useState("Happy");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users/register", {
        username,
        password,
      });
    } catch (error) {
      setMessage("Registration failed! Please try again.");
      console.error("Error registering:", error, username, password);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        username: loginUsername,
        password: loginPassword,
      });
      console.log(loginUsername, loginPassword);
      setLoggedInUser(response.data.user.username);
      setUserToken(response.data.token);
      setUserRole(response.data.user.role);
    } catch (error) {
      setMessage("Login failed! Invalid credentials.");
      console.error("Error logging in:", error);
    }
  };

  const fetchPets = async () => {
    try {
      const response = await axios.get("http://localhost:3002/pets", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setPets(response.data);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  const handleAdopt = async (petId: string) => {
    try {
      console.log("logged:", loggedInUser);
      await axios.post(
        "http://localhost:3002/pets/adopt",
        { petId, userId: loggedInUser }, // Assuming loggedInUser holds the user ID
        { headers: { Authorization: `Bearer ${userToken}` } }
      );
      fetchPets(); // Refresh pet list
    } catch (error) {
      setMessage("Failed to adopt the pet.");
      console.error("Error adopting pet:", error);
    }
  };

  const handleCreatePet = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPet: Pet = {
      id: Math.random().toString(), // You can modify this to a more reliable ID generation logic
      name: newPetName,
      userId: null,
      adopted: false,
      species: newPetSpecies,
      health: newPetHealth,
      attitude: newPetAttitude,
      lastFed: new Date().toISOString(),
      lastPlayed: new Date().toISOString(),
    };

    try {
      console.log(userToken);
      await axios.post("http://localhost:3002/pets", newPet, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setMessage(`Successfully created pet: ${newPet.name}`);
      fetchPets(); // Refresh pet list
    } catch (error) {
      setMessage("Failed to create pet.");
      console.error("Error creating pet:", error);
    }
  };

  return (
    <div className="background">
      <div className="form-container">
        {/* Register Form */}
        <div className="register">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Register</button>
          </form>
        </div>

        {/* Login Form */}
        <div className="login">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label htmlFor="loginUsername">Username:</label>
              <input
                type="text"
                id="loginUsername"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="loginPassword">Password:</label>
              <input
                type="password"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>

      {/* Display logged-in user details */}
      {loggedInUser && (
        <div className="user-info">
          <h3>User Info</h3>
          <p>
            <strong>Username:</strong> {loggedInUser}
          </p>
          <p>
            <strong>Token:</strong> {userToken}
          </p>
          <p>
            <strong>Role:</strong> {userRole}
          </p>
        </div>
      )}

      <div className="form-container">
        <div className="fetch-pets">
          <button onClick={fetchPets}>Fetch Pets</button>
        </div>
        {/* Create New Pet Form */}
        <div className="create-pet">
          <h2>Create a New Pet</h2>
          <form onSubmit={handleCreatePet}>
            <div>
              <label htmlFor="petName">Pet Name:</label>
              <input
                type="text"
                id="petName"
                value={newPetName}
                onChange={(e) => setNewPetName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="petSpecies">Species:</label>
              <input
                type="text"
                id="petSpecies"
                value={newPetSpecies}
                onChange={(e) => setNewPetSpecies(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="petHealth">Health:</label>
              <input
                type="text"
                id="petHealth"
                value={newPetHealth}
                onChange={(e) => setNewPetHealth(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="petAttitude">Attitude:</label>
              <input
                type="text"
                id="petAttitude"
                value={newPetAttitude}
                onChange={(e) => setNewPetAttitude(e.target.value)}
                required
              />
            </div>
            <button type="submit">Create Pet</button>
          </form>
        </div>
      </div>

      {/* Pets List */}
      <div className="pets-list">
        <h2>Pets</h2>
        <ul>
          {pets.map((pet) => (
            <li key={pet.id} className="pet-item">
              <span>
                <strong>Name:</strong> {pet.name}
              </span>
              <span>
                <strong>Species:</strong> {pet.species}
              </span>
              <span>
                <strong>Adopted:</strong> {pet.adopted ? "Yes" : "No"}
              </span>
              <span>
                <strong>Health:</strong> {pet.health}
              </span>
              <span>
                <strong>Attitude:</strong> {pet.attitude}
              </span>
              <span>
                <strong>Last Fed:</strong>{" "}
                {new Date(pet.lastFed).toLocaleString()}
              </span>
              <span>
                <strong>Last Played:</strong>{" "}
                {new Date(pet.lastPlayed).toLocaleString()}
              </span>
              <span>
                <strong>Owner:</strong> {pet.userId || "Not Adopted"}
              </span>
              {!pet.adopted && (
                <button onClick={() => handleAdopt(pet.id)}>Adopt</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Display messages */}
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default App;
