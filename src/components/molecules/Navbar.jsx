import React from 'react';
import "./Navbar.css";
import Container from 'react-bootstrap/Container';
import { Navbar } from 'react-bootstrap';




function TextLinkExample() {
  return (
    <Navbar bg='dark'>
      <Container>
        <Navbar.Brand className='navbar-title'>Patient Directory</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
             <div className='navbar-login'>Signed in as:Mark Otto</div>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;