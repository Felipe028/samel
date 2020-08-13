import React, {useState, useEffect} from 'react';
import { Table, Card, Button, CardHeader,  CardBody,
  CardTitle, CardText, Input, Label, Row, Col, FormGroup, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import * as S from './styles';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';
import {format} from 'date-fns';

function Attendance({match}){
  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);
  const [dropdownOpenAt, setOpenAt] = useState(false);
  const toggleAt = () => setOpenAt(!dropdownOpenAt);

  const [id, setId] = useState();
  const [hda, setHda] = useState();
  const [hpp, setHpp] = useState();
  const [hf, setHf] = useState();
  const [receita, setReceita] = useState();
  const [id_crm, setId_crm] = useState();
  const [id_crm_nome, setId_crm_nome] = useState();
  const [id_crm_especialidade, setId_crm_especialidade] = useState();
  const [id_crm_crm, setId_crm_crm] = useState();
  const [id_cpf, setId_cpf] = useState();
  const [id_cpf_nome, setId_cpf_nome] = useState();
  const [id_cpf_telefone, setId_cpf_telefone] = useState();
  const [id_cpf_plano, setId_cpf_plano] = useState();
  const [id_cpf_cpf, setId_cpf_cpf] = useState();
  const [diaD, setDiaD] = useState();
  const [diaH, setDiaH] = useState();

  const [redirect, setRedirect] = useState(false);



  async function loadAttendance(){
    await api.get(`/attendance/id/${match.params.id}`)
    .then(response => {
      setId(response.data._id)
      setHda(response.data.hda)
      setHpp(response.data.hpp)
      setHf(response.data.hf)
      setReceita(response.data.receita)
      setId_crm(response.data.id_crm)
      setId_crm_nome(response.data.id_crm.nome)
      setId_crm_especialidade(response.data.id_crm.especialidade)
      setId_crm_crm(response.data.id_crm.crm)
      setId_cpf(response.data.id_cpf)
      setId_cpf_nome(response.data.id_cpf.nome)
      setId_cpf_telefone(response.data.id_cpf.telefone)
      setId_cpf_plano(response.data.id_cpf.plano)
      setId_cpf_cpf(response.data.id_cpf.cpf)
      setDiaD(format (new Date(response.data.dia), 'dd-MM-yyyy'))
      setDiaH(format (new Date(response.data.dia), 'HH:mm'))
    }).catch()
  }

  async function Save() {
    //Validação dos dados
    if(!hda){
      return alert("Você precisa informar a História da doença atual (HDA)")
    }
    else if(!receita){
      return alert("Você precisa informar o giagnóstico do paciente")
    }
      await api.put(`/attendance/${match.params.id}`, {hda, hpp, hf, receita})
      .then(() =>
      setRedirect(true)
    ).catch(alert("Atendimento Finalizado"))
  }

  useEffect(() => {
    loadAttendance();
  }, [])

  return (
    <div>
      <S.Container>
      {redirect && <Redirect to="/attendance" />}
        <S.ContainerCenter>
          <Card>
            <CardHeader>
              <S.CardCenter>
                <S.CardLeft>Paciente: {id_cpf_nome}</S.CardLeft>
                <S.CardBodyCenterRight>Médico: {id_crm_nome}</S.CardBodyCenterRight>
              </S.CardCenter>
            </CardHeader>
            <CardBody>
              <S.CardBodyCenter>
                <S.CardBodyCenterLeft>
                  <CardText>CPF: {id_cpf_cpf}</CardText>
                  <CardText>Telefone: {id_cpf_telefone}</CardText>
                  <CardText>Plano: {id_cpf_plano}</CardText>
                </S.CardBodyCenterLeft>
                <S.CardBodyCenterRight>
                  <CardText>CRM: {id_crm_crm}</CardText>
                  <CardText>Especialidade: {id_crm_especialidade}</CardText>
                  <CardText>Data/Hora do atendimento: {diaD} / {diaH}
                  
                  </CardText>
                </S.CardBodyCenterRight>
              </S.CardBodyCenter>
            </CardBody>
          </Card>


          <Card>
            <CardHeader>
              <S.CardCenter>
                <S.CardLeft>Atendimento</S.CardLeft>
                <S.CardRight></S.CardRight>
              </S.CardCenter>
            </CardHeader>
            <CardBody>

              <Row>
                <Col sm="6">
                  <Card body>
                    <CardTitle>História da doença atual (HDA)</CardTitle>
                    <CardText>{hda}</CardText>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card body>
                    <CardTitle>História Patológica Pregressa (HPP)</CardTitle>
                    <CardText>{hpp}</CardText>
                  </Card>
                </Col>
              </Row>

              <S.Space>
                <Row>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Histórico Familiar (HF)</CardTitle>
                      <CardText>{hf}</CardText>
                    </Card>
                  </Col>
                  <Col sm="6">
                    <Card body>
                      <CardTitle>Relatório</CardTitle>
                      <CardText>{receita}</CardText>
                    </Card>
                  </Col>
                </Row>
              </S.Space>

              
            </CardBody>
          </Card>


        </S.ContainerCenter>
      </S.Container>
      
    </div>
  );
};

export default Attendance;