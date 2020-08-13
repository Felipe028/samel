import React , {useState, useEffect} from 'react';
import { Jumbotron, Button, Form, Row, Col, FormGroup, Label, Input } from 'reactstrap';
import * as S from './styles';
import api from '../../services/api';
import {Link, Redirect} from 'react-router-dom';

function Doctor({match}){
  const [id, setId] = useState();
  const [nome, setNome] = useState();
  const [especialidade, setEspecialidade] = useState();
  const [crm, setCrm] = useState();

  const [redirect, setRedirect] = useState(false);


  async function loadDoctor(){
    await api.get(`/doctor/id/${match.params.id}`)
    .then(response => {
      setId(response.data._id)
      setNome(response.data.nome)
      setEspecialidade(response.data.especialidade)
      setCrm(response.data.crm)
    }).catch()
  }


  async function Save() {
    //Validação dos dados
    if(!nome){
      return alert("Você precisa informar o nome")
    }
    else if(!crm){
      return alert("Você precisa informar o crm")
    }

      await api.put(`/doctor/${match.params.id}`, {nome, crm, especialidade})
      .then(() =>
      setRedirect(true)
    )
  }



  useEffect(() => {
    loadDoctor();
  }, [])

  return (
    <S.Container>
      {redirect && <Redirect to="/doctor" />}
      <Jumbotron>
        <h4 className="display-5">Alterar</h4>
        <hr className="my-1" />
            <Form>
                <Row form>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="examplename">Nome</Label>
                        <Input type="text" name="nome" onChange={e => setNome(e.target.value)} id="examplename" placeholder="João Teixeira da Silva" value={nome}/>
                    </FormGroup>
                    </Col>
                    <Col md={6}>
                    <FormGroup>
                        <Label for="examplecrm">CRM</Label>
                        <Input type="text" name="crm" onChange={e => setCrm(e.target.value)} id="examplecrm" placeholder="1234" value={crm} />
                    </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={12}>
                    <FormGroup>
                        <Label for="exampleespecialidade">Especialidade</Label>
                        <Input type="text" name="telefone" onChange={e => setEspecialidade(e.target.value)} id="examplefone" placeholder="Cardiologista, Neurologista, etc..." value={especialidade}/>
                    </FormGroup>
                    </Col>
                </Row>                
                <Button color="primary" onClick={() => Save()}>Confirmar</Button>
            </Form>
      </Jumbotron>
    </S.Container>
  );
};
export default Doctor;