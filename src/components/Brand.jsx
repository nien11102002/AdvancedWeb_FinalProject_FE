import { Container, Nav, Navbar, Image } from "react-bootstrap";
import logo from "../assets/Logo.svg";

export default function Brand() {
  return (
    <Navbar className="tw-mr-10">
      <Navbar.Brand href="/">
        <Image src={logo} className="logo"></Image>
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/" className="brand">
          <span
            style={{
              fontSize: "50px",
              color: "#06234F",
              fontWeight: "bold",
            }}
          >
            E
          </span>
          <span
            style={{
              fontSize: "42px",
              color: "#06234F",
              fontWeight: "bold",
            }}
          >
            DU
          </span>
          <span
            style={{
              fontSize: "42px",
              color: "#0C63E7",
              fontWeight: "bold",
            }}
          >
            CAT
          </span>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
