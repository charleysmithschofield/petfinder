import { useState } from "react";
import { Pet } from "../models/Pet";
import { useEffect } from "react";
import { getPets } from "../services/petService";
import { Col, Form, Row } from "react-bootstrap";
import { PetCard } from "./PetCard";
import "./css/petlist.css";

export function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getPets().then((pets) => setPets(pets));
  }, []);

  // Filter pets based on name or breed when typed into search bar
  const filteredPets = pets.filter(
    (pet) => 
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return(
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

      {/* Pet Cards */}
      <Row className="justify-content-center">
        {filteredPets.map((pet) => (
          <Col lg={4} key={pet.id} className="d-flex justify-content-center pet-list-col">
            <PetCard pet={pet} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
