import React, { useState, useEffect } from 'react';
import { Table, Card, CardText, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, InputGroup,InputGroupAddon } from 'reactstrap';
import * as S from './styles';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';



function Patient({match}){
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  const [patients, setPatients] = useState([]);

  const [cpf, setCpf] = useState();

  async function loadPatients(){
    await api.get('/patient/all')
    .then(response => {
      setPatients(response.data)
    }).catch()
  }

  async function Search(){
    await api.get(`patient/cpf/${cpf}`)
    .then(response => {
      setPatients(response.data)
    }).catch()
  }


  useEffect(() => {
    loadPatients();
  }, [])


  return (
    <S.Container>
      <S.ContainerCenter>
        <S.ContainerTitle>
          <Card body inverse color="primary">
            <S.CardCenter>
              <S.CardLeft>
                <CardText>Pacientes</CardText>
              </S.CardLeft>
              <S.CardRight>
                <InputGroup>
                  <Input placeholder="CPF Ex:(1234567890)"  onChange={e => setCpf(e.target.value)}/>
                  <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={() => Search()}>Search</Button>
                  </InputGroupAddon>
                </InputGroup>
                
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret color="primary">
                    Mais
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/patient/add">Cadastrar Paciente</DropdownItem>
                    <DropdownItem href="/attendance/add">Agendar atendimento</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </S.CardRight>
            </S.CardCenter>
          </Card>
        </S.ContainerTitle>
        <S.ContainerTable>
          <Table hover>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Plano</th>
                <th>CPF</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {patients.map(t => (
              <tr>
                <td>{t.nome}</td>
                <td>{t.telefone}</td>
                <td>{t.plano}</td>
                <td>{t.cpf}</td>
                <td>
                  <ButtonDropdown direction="right">
                    <Link to={`/patient/details/${t._id}`}>
                      <DropdownToggle caret color="info">Mais</DropdownToggle>
                    </Link>
                  </ButtonDropdown>
                </td>
              </tr>
            ))}
              
            </tbody>
          </Table>
        </S.ContainerTable>
      </S.ContainerCenter>
    </S.Container>
  );
}

export default Patient;