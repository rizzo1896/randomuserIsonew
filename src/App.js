import Router from "./Routes/Router";
import { AuthProvider } from "react-auth-kit";
import { Container, Nav, Navbar } from "react-bootstrap";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Isonew</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Router />
      </AuthProvider>
    </>
  );
}

export default App;
