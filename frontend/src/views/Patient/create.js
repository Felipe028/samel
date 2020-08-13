import React, {useState} from 'react';
import { Jumbotron, Button, Form, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import * as S from './styles';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';

function Patient({match}){
    const [id, setId] = useState();
    const [nome, setNome] = useState();
    const [telefone, setTelefone] = useState();
    const [plano, setPlano] = useState();
    const [cpf, setCpf] = useState();
  
    const [redirect, setRedirect] = useState(false);
  
    async function Save() {
      //Validação dos dados
      if(!nome){
        return alert("Você precisa informar o nome")
      }
      else if(!cpf){
        return alert("Você precisa informar o cpf")
      }
  
        await api.post('/patient/add', {nome, telefone, plano, cpf})
        .then(() =>
        setRedirect(true)
      ).catch(alert("Cadastro realizado com sucesso"))
    }

    
  return (
    <S.Container>
        {redirect && <Redirect to="/patient" />}
      <Jumbotron>
        <h4 className="display-5">Cadastro de pacientes</h4>
        <hr className="my-1" />
            <Form>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="examplename">Nome</Label>
                        <Input type="text" name="nome" onChange={e => setNome(e.target.value)} id="examplename" placeholder="João Teixeira da Silva" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="examplecpf">CPF</Label>
                        <Input type="text" name="cpf" onChange={e => setCpf(e.target.value)} id="examplecpf" placeholder="1234567890" />
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="examplefone">Telefone</Label>
                        <Input type="text" name="telefone" onChange={e => setTelefone(e.target.value)} id="examplefone" placeholder="92993750971" />
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="exampleplano">Plano</Label>
                        <Input type="text" name="plano" onChange={e => setPlano(e.target.value)} id="exampleplano" placeholder="123456" />
                    </FormGroup>
                    </Col>
                </Row>
                
                <Button color="primary" onClick={() => Save()}>Cadastrar</Button>
                
            </Form>
      </Jumbotron>
    </S.Container>
  );
};
export default Patient;