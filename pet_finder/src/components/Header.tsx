import { Container, Nav, Navbar } from "react-bootstrap";
import '../components/css/header.css'; // Import your custom CSS here

export function Header() {
  return (
    <Navbar className="custom-navbar" expand="lg" variant='dark'>
      <Container fluid>
        <Navbar.Brand href="/">
          <img src="img/PetFinderLogo.png" width="120" height="120" alt="PetFinder Logo" />
        </Navbar.Brand>
        <Nav className="mx-auto">
          <h1 className="text-center text-white">Help them find their fur-ever home!</h1>
        </Nav>
      </Container>
    </Navbar>
  );
}