import React, { useState, useEffect } from 'react';
import { Table, Card, CardText, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import * as S from './styles';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';


function Doctor({match}){
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  const [doctors, setDoctors] = useState([]);

  const [crm, setCrm] = useState();

  async function loadDoctors(){
    await api.get('/doctor/all')
    .then(response => {
      setDoctors(response.data)
    }).catch()
  }

  async function Search(){
    await api.get(`doctor/crm/${crm}`)
    .then(response => {
      setDoctors(response.data)
    }).catch()
  }

  useEffect(() => {
    loadDoctors();
  }, [])

  return (
    <S.Container>
      <S.ContainerCenter>
        <S.ContainerTitle>
          <Card body inverse color="primary">
            <S.CardCenter>
              <S.CardLeft>
                <CardText>Médicos</CardText>
              </S.CardLeft>
              <S.CardRight>
                <InputGroup>
                  <Input placeholder="CRM Ex:(0000)" onChange={e => setCrm(e.target.value)}/>
                  <InputGroupAddon addonType="append">
                    <Button color="primary" onClick={() => Search()}>Search</Button>
                  </InputGroupAddon>
                </InputGroup>
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret color="primary">
                    Mais
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem href="/doctor/add">Cadastrar Médico</DropdownItem>
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
                <th>Especialidade</th>
                <th>CRM</th>
                <th></th>
              </tr>
            </thead>
            <tbody>

            {doctors.map(t => (
              <tr>
                <td>{t.nome}</td>
                <td>{t.especialidade}</td>
                <td>{t.crm}</td>
                <td>
                  <ButtonDropdown direction="right">
                    <Link to={`/doctor/details/${t._id}`}>
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

export default Doctor;