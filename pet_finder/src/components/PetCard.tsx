import { Card } from "react-bootstrap";
import { Pet } from "../models/Pet";
import '../components/css/petcard.css';
import { Link } from "react-router-dom";

interface PetCardProps {
  pet: Pet
}

export function PetCard(props: PetCardProps) {
  return (
    <Card className="pet-card">
      <Card.Img variant="top" src={`img/${props.pet.image}`} className="pet-card-img" />
      <Card.Body className="pet-card-body">
        <Card.Title>{props.pet.name} ({props.pet.breed})</Card.Title>
        <p className="pet-description">{props.pet.description}</p>
      </Card.Body>
      <Card.Footer className="pet-card-footer">
        <Link to={`/adoptions/${props.pet.id}`} className="btn btn-primary">Adopt Me</Link>
        <Link to={`/details/${props.pet.id}`} className="btn btn-secondary ml-2">Details</Link>
      </Card.Footer>
    </Card>
  );
}
