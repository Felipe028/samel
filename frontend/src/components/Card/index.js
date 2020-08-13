import React, { useState } from 'react';
import { Card, Button, CardHeader, CardFooter, CardBody,
  CardTitle, CardText, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';

const Example = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <div>
    <Row>
      <Col sm="3">
        <Card body>
          <CardTitle>Nome do médico</CardTitle>
          <CardText>Médico especialista em:</CardText>
          <CardText>CRM:</CardText>
          <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret size="sm" color="primary">Mais</DropdownToggle>
              <DropdownMenu>
                  <DropdownItem>Novo atendimento</DropdownItem>
                  <DropdownItem>Alterar</DropdownItem>
                  <DropdownItem>Excluir</DropdownItem>
              </DropdownMenu>
          </Dropdown>
          <Button color="primary">Consultas</Button>
        </Card>
      </Col>
      <Col sm="3">
        <Card body>
          <CardTitle>Special Title Treatment</CardTitle>
          <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
          <Button>Go somewhere</Button>
        </Card>
      </Col>
    </Row>
    </div>
  );
};

export default Example;