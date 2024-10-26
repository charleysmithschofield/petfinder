import { useState, useEffect } from "react";
import { Pet } from "../models/Pet";
import { getPetById } from "../services/petService";
import { useParams } from "react-router-dom";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { AdoptionForm } from "../models/AdoptionForm";
import { postAdoption } from "../services/adoptionService";
import './css/petadoptionform.css';

export function PetAdoptionForm() {
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [pet, setPet] = useState<Pet | null>(null);
  const [formValues, setFormValues] = useState<AdoptionForm>({
    firstName: '',
    lastName: '',
    hasFencedYard: false,
    hasChildren: false,
    hasOtherPets: false,
    phoneNumber: '',
    email: '',
    aboutSelf: ''
  });

  // Extract pet ID from the route parameters
  const { id } = useParams();

  // Load the pet data when component mounts or ID changes
  useEffect(() => {
    if (id !== undefined) {
      getPetById(Number(id)).then((pet) => {
        setPet(pet); // Store retrieved pet data in state
      });
    }
  }, [id]);

  // Update form values based on user input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormValues(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission, submit the data, and set form submission state
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    postAdoption(formValues);
    setFormSubmitted(true);
  }

  // Render adoption form header with pet’s name if available
  return (
    <div className="PetAdoptionForm container my-5">
      <Row>
        <Col lg={3}></Col>
        <Col lg={6}>

          {/* Show success message or adoption form */}
          {formSubmitted ? (
            <Alert variant="success">
              Thank you for your submission, our team will get back to you shortly!
            </Alert>
          ) : (
            <Form onSubmit={onSubmit}>
              <h2 className="text-center mb-4">Pet Adoption Application for: {pet ? pet.name : 'Loading...'}</h2>

              {/* Pet Image */}
              {pet?.image && (
                <div className="text-center mb-4">
                  <img src={`/img/${pet.image}`} alt={`${pet.name}`} className="pet-image" />
                </div>
              )}

              {/* Form fields for user input */}
              <Form.Group as={Row} controlId="firstName">
                <Form.Label column sm={4}>First Name</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formValues.firstName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="lastName">
                <Form.Label column sm={4}>Last Name</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={handleChange}
                    required
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="phoneNumber">
                <Form.Label column sm={4}>Phone Number</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="tel"
                    name="phoneNumber"
                    value={formValues.phoneNumber}
                    onChange={handleChange}
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    placeholder="123-456-7890"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="email">
                <Form.Label column sm={4}>Email</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    pattern="\S+@\S+\.\S+"
                    placeholder="email@domain.com"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="aboutSelf">
                <Form.Label column sm={4}>About Me</Form.Label>
                <Col sm={8}>
                  <Form.Control
                    as="textarea"
                    name="aboutSelf"
                    value={formValues.aboutSelf}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Tell us a little about yourself..."
                  />
                </Col>
              </Form.Group>

              {/* Checkbox questions */}
              <div className="checkbox-section">
                <Form.Group controlId="hasFencedYard" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="hasFencedYard"
                    checked={formValues.hasFencedYard}
                    onChange={handleChange}
                    label="Do you have a fenced yard?"
                  />
                </Form.Group>

                <Form.Group controlId="hasChildren" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="hasChildren"
                    checked={formValues.hasChildren}
                    onChange={handleChange}
                    label="Do you have children?"
                  />
                </Form.Group>

                <Form.Group controlId="hasOtherPets" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="hasOtherPets"
                    checked={formValues.hasOtherPets}
                    onChange={handleChange}
                    label="Do you have other pets?"
                  />
                </Form.Group>
              </div>

              {/* Form submission button */}
              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
          )}
        </Col>
        <Col lg={3}></Col>
      </Row>
    </div>
  );
}
