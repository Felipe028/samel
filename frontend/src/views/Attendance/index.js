import React, { useState, useEffect } from 'react';
import { Table, Card, CardText, Button, FormGroup, Label, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, InputGroup,InputGroupAddon, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as S from './styles';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';
import {format} from 'date-fns';

const Example = (props) => {
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [dropdownOpenF, setOpenF] = useState(false);
  const toggleF = () => setOpenF(!dropdownOpenF);

  const {buttonLabel, className} = props;
  const [modal, setModal] = useState(false);
  const toggleM = () => setModal(!modal);

  const [doctors, setDoctors] = useState([]);

  const [date, setDate] = useState('all');
  const [date1, setDate1] = useState();
  const [date2, setDate2] = useState();

  async function loadDoctors(){
    await api.get(`/attendance/${date}`)
    .then(response => {
      setDoctors(response.data)
    }).catch()
  }

  async function Search(){
    await api.get(`/attendance/alldate/${date1}T06:00:00.000/${date2}T06:00:00.000`)
    .then(response => {
      setDoctors(response.data)
    }).catch()
  }

  useEffect(() => {
    loadDoctors();
  }, [date])


  return (
    <S.Container>
      
      <Modal isOpen={modal} toggle={toggleM} className={className}>
        <ModalHeader toggle={toggleM}>Buscar por intervalo entre datas</ModalHeader>
        <ModalBody>
        <FormGroup>
          <Label for="exampleDate1">De:</Label>
          <Input type="date" name="date1" onChange={e => setDate1(e.target.value)} id="exampleDate1" placeholder="date placeholder" />
          <Label for="exampleDate1">Até:</Label>
          <Input type="date" name="date1" onChange={e => setDate2(e.target.value)} id="exampleDate1" placeholder="date placeholder" />
        </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => Search()}>Buscar</Button>{' '}
          <Button color="secondary" onClick={toggleM}>Cancelar</Button>
        </ModalFooter>
      </Modal>


      <S.ContainerCenter>
        <S.ContainerTitle>
          <Card body inverse color="primary">
            <S.CardCenter>
              <S.CardLeft>
                <CardText>Atendimentos ({date})</CardText>
              </S.CardLeft>
              <S.CardRight>

                <ButtonDropdown isOpen={dropdownOpenF} toggle={toggleF}>
                  <DropdownToggle caret color="primary">
                    Filtro
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => setDate('all')}>Todas</DropdownItem>
                    <DropdownItem onClick={() => setDate('today')}>Hoje</DropdownItem>
                    <DropdownItem onClick={toggleM}>intervalo entre datas</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>

                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                  <DropdownToggle caret color="primary">
                    Mais
                  </DropdownToggle>
                  <DropdownMenu>
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
                <th>Nome do paciente</th>
                <th>CPF</th>
                <th>Plano</th>
                <th>Data</th>
                <th>Hora</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            
            {doctors.map(t => (
              <tr>
                <td>{t.id_cpf.nome}</td>
                <td>{t.id_cpf.cpf}</td>
                <td>{t.id_cpf.plano}</td>
                <td>{format (new Date(t.dia), 'dd-MM-yyyy')}</td>
                <td>{format (new Date(t.dia), 'HH:mm')}</td>
                <td>
                { t.finalizada == true ?
                  <> 
                  <ButtonDropdown direction="right">
                    <Link to={`/attendance/detaills/${t._id}`}>
                      <DropdownToggle caret color="info">Mais</DropdownToggle>
                    </Link>
                  </ButtonDropdown></>
                 : <>
                  <ButtonDropdown direction="right">
                    <Link to={`/attendance/details/${t._id}`}>
                      <DropdownToggle caret color="info">Mais</DropdownToggle>
                    </Link>
                  </ButtonDropdown></>
                  
                }
                  
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

export default Example;