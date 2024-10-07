import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pet } from "../models/Pet";
import { getPetById } from "../services/petService";
import { Card, Col, Row } from "react-bootstrap";
import "./css/petdetails.css";

export function PetDetails() {
  const { id } = useParams();
  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    if(id !== undefined) {
      getPetById(Number(id)).then((pet) => setPet(pet))
    }
  }, [id]);

  return(
    <div className="PetDetails">
      { pet && 
      <Row>
        <Col lg={2}></Col>
        <Col lg={8}>
          <Card>
            <Card.Body>
              <Row>
                <Col lg={4}>
                  <img src={`/img/${pet.image}`}></img>
                </Col>
                <Col lg={8}>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Text>{pet.breed} - {pet.isBoy ? 'Boy' : 'Girl'}</Card.Text>
                <Card.Text>{pet.description}</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={2}></Col>
      </Row>}
    </div>
  )
}
