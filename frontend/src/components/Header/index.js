import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

const Example = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="primary" dark expand="md">
        <NavbarBrand href="https://www.samel.com.br/">Samel</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar></Nav>
          <Nav navbar>
            <NavItem>
              <NavLink href="/doctor">Médicos</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/patient">Pacientes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/attendance/">Atendimentos</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Example;