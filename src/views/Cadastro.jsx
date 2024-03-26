import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import { Link } from "react-router-dom";
import { criarConta } from "../services/CadastroService";

export function Cadastro() {
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    
    const createAccount = async () => {
      if(password !== passwordConfirm) {
          alert('Senhas devem ser iguais')
          return
      }
      const payload = {
        email,
        password,
        name
      }
      console.log(payload)
  
      const result = await criarConta(payload)
      if(!result.error) {
          // eslint-disable-next-line no-restricted-globals
         location.href = 'http://localhost:3000/login'
     }
  
      alert(result.message)
    }
  
    return (
  
      <Container>
  
        <Row className="justify-content-md-center">
          <Col xs={12} md={4}>
            <Card className="mt-5">
              <Card.Body>
                <Card.Title>
                  <Row className="justify-content-md-center">
                    <Col xs={12} style={{ textAlign: "center" }} className="my-3">
                    </Col>
                    <Col style={{ textAlign: "center" }} xs={10}>
                      Cadastro NerdQuiz
                    </Col>
                  </Row>
                </Card.Title>
  
                <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Seu Nome"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Seu Email"
                    />
                  </Form.Group>
                  <Form.Label> Sua Senha</Form.Label>
  
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                  <InputGroup className="mb-3">
                  <InputGroup.Text onClick={() => setShowPassword(state => !state) }>{showPassword ? '°_°' : '-_-'}</InputGroup.Text>
                    <Form.Control
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Sua Senha"
                    />
                  </InputGroup>
                  </Form.Group>
  
                  <Form.Label>Confirme Sua Senha</Form.Label>
                  <Form.Group  controlId="formBasicPassword">
                  <InputGroup className="mb-3">
                  <InputGroup.Text onClick={() => setShowPassword(state => !state) }>{showPassword ? '°_°' : '-_-'}</InputGroup.Text>
                    <Form.Control
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      value={passwordConfirm}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirme Sua Senha"
                    />
                  </InputGroup>
                  </Form.Group>
                  <div className="d-grid gap-2 mt-4">
                    <Button
                      variant="success"
                      type="button"
                     onClick={() => createAccount()}
                    >
                      Criar Conta
                    </Button>
                    <Button style={{ float: "right" }} variant="link">
                      <Link to='/login'>Já tem conta? Faça Login</Link>
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  