import { useState, useEffect } from "react";
import { Pet } from "../models/Pet";
import { getPets } from "../services/petService";
import { Col, Form, Row, Button } from "react-bootstrap";
import { PetCard } from "./PetCard";
import "./css/petlist.css";

export function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [animalType, setAnimalType] = useState("all");

  useEffect(() => {
    getPets().then((pets) => setPets(pets));
  }, []);

  // Filter pets based on search query and selected animal type
  const filteredPets = pets.filter((pet) => {
    const matchesSearchQuery =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.breed.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAnimalType =
      animalType === "all" || pet.animalType === animalType;

    return matchesSearchQuery && matchesAnimalType;
  });

  // Function to handle animal type selection
  const handleButtonClick = (type: string) => {
    setAnimalType(type);
  };

  return (
    <div className="PetList">
      {/* Search Bar */}
      <Form.Group controlId="search" className="search-bar-wrapper">
        <Form.Control
          type="text"
          placeholder="Search for Pet by Name or Breed"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>

      {/* Buttons for filtering by animal type */}
      <div className="filter-buttons">
        <Button 
          variant="primary" 
          className={`custom-button primary ${animalType === "dog" ? "selected" : ""}`} 
          onClick={() => handleButtonClick("dog")}
        >
          Dogs Only
        </Button>
        <Button 
          variant="primary" 
          className={`custom-button primary ${animalType === "cat" ? "selected" : ""}`} 
          onClick={() => handleButtonClick("cat")}
        >
          Cats Only
        </Button>
        <Button 
          variant="secondary" 
          className={`custom-button secondary ${animalType === "all" ? "selected" : ""}`} 
          onClick={() => handleButtonClick("all")}
        >
          Show All
        </Button>
      </div>

      {/* Pet Cards */}
      <Row className="justify-content-center">
        {filteredPets.map((pet) => (
          <Col lg={4} key={pet.id} className="d-flex justify-content-center pet-list-col">
            <PetCard pet={pet} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
