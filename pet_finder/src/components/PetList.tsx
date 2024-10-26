import { useState } from "react";
import { Pet } from "../models/Pet";
import { useEffect } from "react";
import { getPets } from "../services/petService";
import { Col, Form, Row } from "react-bootstrap";
import { PetCard } from "./PetCard";

export function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getPets().then((pets) => setPets(pets));
  }, []);

  const filteredPets = pets.filter(
    (pet) => 
    pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  return(
    <div className="PetList">
      <Form.Group controlId="search">
        <Form.Control 
        type="text"
        placeholder="Search by pet name or breed"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>
      <Row>
        {filteredPets.map((pets) => (
          <Col lg={4} key={pets.id}>
            <PetCard pet={pets} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
