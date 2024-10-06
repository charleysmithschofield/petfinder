import { Card } from "react-bootstrap";
import { Pet } from "../models/Pet";
import '../components/css/petcard.css';

interface PetCardProps{
  pet : Pet
}

export function PetCard(props:PetCardProps) {
  return(
    <Card>
      <Card.Img variant="top" src={`img/${props.pet.image}`}></Card.Img>
      <Card.Body>
        <Card.Title>{props.pet.name} ({props.pet.breed})</Card.Title>
        {props.pet.description}
      </Card.Body>
      <Card.Footer>
        <button className="btn btn-primary">Adopt Me</button>
        <button className="btn btn-secondary ml-2">Details</button>
      </Card.Footer>
    </Card>
  )
}
