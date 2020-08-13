import React, {useState, useEffect} from 'react';
import { Table, Card, Button, CardHeader,  CardBody,
  CardTitle, CardText, Input, InputGroup, InputGroupAddon, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import * as S from './styles';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';
import {format} from 'date-fns';

function Patient({match}){
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [dropdownOpenAt, setOpenAt] = useState(false);
  const toggleAt = () => setOpenAt(!dropdownOpenAt);

  //Patient
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [telefone, setTelefone] = useState();
  const [cpf, setCpf] = useState();
  const [plano, setPlano] = useState();

  const [attendances, setAttendances] = useState([]);

  const [redirect, setRedirect] = useState(false);

  async function loadPatient(){
    await api.get(`/patient/id/${match.params.id}`)
    .then(response => {
      setId(response.data._id)
      setNome(response.data.nome)
      setTelefone(response.data.telefone)
      setCpf(response.data.cpf)
      setPlano(response.data.plano)
    }).catch()
  }


  async function loadAttendances(){
    await api.get(`/attendance/bypatient/${match.params.id}`)
    .then(response2 => {
      setAttendances(response2.data)
    }).catch()
  }

  async function Remove(){
    const res = window.confirm('Deseja realmente remover este usuário?')
    if(res == true){
      await api.delete(`/patient/${match.params.id}`)
      .then(() =>
      setRedirect(true)
    )
    }else{
      alert('tudo bem, vamos manter')
    }
  }


  useEffect(() => {
    loadPatient();
    loadAttendances();
  }, [])



  return (
    <div>
      <S.Container>
      {redirect && <Redirect to="/patient" />}
        <S.ContainerCenter>
          <Card>
            <CardHeader>
              <S.CardCenter>
                <S.CardLeft>{nome}</S.CardLeft>
                <S.CardRight>
                  <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret >
                      Mais
                    </DropdownToggle>
                    <DropdownMenu>
                      <Link to={`/patient/${id}`}>
                        <DropdownItem >Alterar</DropdownItem>
                      </Link>
                      <DropdownItem onClick={() => Remove()}>Excluir</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </S.CardRight>
              </S.CardCenter>
            </CardHeader>
            <CardBody>
              <CardTitle>CPF: {cpf}</CardTitle>
              <CardText>Telefone: {telefone}</CardText>
              <CardText>Plano: {plano}</CardText>
            </CardBody>
          </Card>


          <Card>
            <CardHeader>
              <S.CardCenter>
                <S.CardLeft>Atendimentos</S.CardLeft>
                <S.CardRight>
                  <ButtonDropdown isOpen={dropdownOpenAt} toggle={toggleAt}>
                    <DropdownToggle caret >
                      Filtro
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Hoje</DropdownItem>
                      <DropdownItem>Médico</DropdownItem>
                      <DropdownItem>Intervalo entre datas</DropdownItem>
                    </DropdownMenu>
                  </ButtonDropdown>
                </S.CardRight>
              </S.CardCenter>
            </CardHeader>
          </Card>



          <Table hover>
            <thead>
              <tr>
                <th>Nome do médico</th>
                <th>CRM</th>
                <th>Especialidade</th>
                <th>Data</th>
                <th>Hora</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {attendances.map(t => (
              <tr>
                <td>{t.id_crm.nome}</td>
                <td>{t.id_crm.crm}</td>
                <td>{t.id_crm.especialidade}</td>
                <td>{format (new Date(t.dia), 'dd-MM-yyyy')}</td>
                <td>{format(new Date(t.dia), 'HH:mm')}</td>
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
                  </ButtonDropdown>
                  </> 
                }
                </td>
              </tr>
            ))}                
            </tbody>

          </Table>

        </S.ContainerCenter>
      </S.Container>
      
    </div>
  );
};

export default Patient;