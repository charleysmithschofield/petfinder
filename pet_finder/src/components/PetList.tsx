import { useState } from "react";
import { Pet } from "../models/Pet";
import { useEffect } from "react";
import { getPets } from "../services/petService";
import { Col, Row } from "react-bootstrap";
import { PetCard } from "./PetCard";

export function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    getPets().then((pets) => setPets(pets));
  }, []);

  return(
    <div className="PetList">
      <Row>
        {pets.map((pet) => (<Col lg={4}><PetCard pet={pet}/></Col>))}
      </Row>
    </div>
  )
}
