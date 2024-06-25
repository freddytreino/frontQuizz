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
import { useNavigate } from "react-router-dom";
import backgroundImage from '/home/freddy/Área de Trabalho/EngSoft/ProgWeb/frontQuizz/src/views/background.jpg'
import Image from 'react-bootstrap/Image';
export function Cadastro() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius:"5px"

  };
    const [showPassword, setShowPassword] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate(); // Hook useNavigate para redirecionamento
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
         navigate('/login')
     }
  
      alert(result.message)
    }
  
    return (
  
      <Container>
  
        <Row className="justify-content-md-center">
          <Col xs={12} md={4}>
            <Card className="mt-5">
              <Card.Body style={{ ...containerStyle, maxWidth: '100%', borderradius:'5px' }}>
                <Card.Title>
                  <Row className="justify-content-md-center" style={{textAlign:"center"}}>
                  <Col xs={12} style={{ textAlign: "center" }} className="my-3">
                    <Image
                      width={100}
                      height={100}
                      alt="171x180"
                      src="https://cdn.pixabay.com/photo/2020/07/11/12/31/idea-5393862_640.png"
                    />
                  </Col>
                    <Col style={{ textAlign: "center",color:"white",margin:"auto"}} xs={10}>
                      <h1 style={{margin:"auto 0"}}>BrainUp</h1>
                    </Col>
                    
                  </Row>
                </Card.Title>
  
                <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label style={{ textAlign: "center",color:"white",fontWeight:"bolder"}}>Nome</Form.Label>
                    <Form.Control
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                      placeholder="Seu Nome"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{ textAlign: "center",color:"white",fontWeight:"bolder"}}>Email</Form.Label>
                    <Form.Control
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Seu Email"
                    />
                  </Form.Group>
                  <Form.Label style={{ textAlign: "center",color:"white",fontWeight:"bolder"}}> Sua Senha</Form.Label>
  
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
  
                  <Form.Label style={{ textAlign: "center",color:"white",fontWeight:"bolder"}}>Confirme Sua Senha</Form.Label>
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
                      <Link to='/login' style={{color:"white"}}>Já tem conta? Faça Login</Link>
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
  