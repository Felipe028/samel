import React, {useState} from 'react';
import { Jumbotron, Button, Form, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import * as S from './styles';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';

function Attendance({match}){

  const [cpf, setCpf] = useState();
  const [crm, setCrm] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();

  const [redirect, setRedirect] = useState(false);

  async function Save() {
    //Validação dos dados
    if(!cpf){
      return alert("Você precisa informar o CPF")
    }
    else if(!crm){
      return alert("Você precisa informar o CRM")
    }
    else if(!data){
      return alert("Você precisa informar a data")
    }
    else if(!hora){
      return alert("Você precisa informar a hora")
    }

      await api.post('/attendance/add', {
        cpf,
        crm,
        dia: `${data}T${hora}:00.000`
      })
      .then(() =>
      setRedirect(true)
    ).catch(alert("Cadastro realizado com sucesso"))
  }

  return (
    <S.Container>
      {redirect && <Redirect to="/attendance" />}
      <Jumbotron>
        <h4 className="display-5">Agendamento</h4>
        <hr className="my-1" />
            <Form>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="examplecpf">CPF do paciente</Label>
                        <Input type="text" name="cpf" onChange={e => setCpf(e.target.value)} id="examplecpf" placeholder="00480264382" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="examplecrm">CRM do Médico</Label>
                        <Input type="text" name="crm" onChange={e => setCrm(e.target.value)} id="examplecrm" placeholder="1234" />
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={12}>
                    <FormGroup>
                        <Label for="exampledata">Data do atendimento</Label>
                        <Input type="date" name="date1" onChange={e => setData(e.target.value)} id="exampleDate1" placeholder="date placeholder" />
                        <Label for="exampleTime">Hora</Label>
                        <Input type="time" name="time" onChange={e => setHora(e.target.value)} id="exampleTime" placeholder="time placeholder" />
                    </FormGroup>
                    </Col>
                </Row>
                
                <Button color="primary"  onClick={() => Save()}>Agendar</Button>
                
            </Form>
      </Jumbotron>
    </S.Container>
  );
};
export default Attendance;