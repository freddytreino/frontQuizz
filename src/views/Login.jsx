import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showSnackbar } from "../redux/snackbarSlice";
import { login } from "../redux/authSlice";
import axios from "axios";
import { useDispatch } from 'react-redux';

export function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate(); // Hook useNavigate para redirecionamento
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showAlertError = (message) => {
    dispatch(
      showSnackbar({
        variant: "danger",
        title: 'Um erro ocorreu =(',
        message
      })
    )
    
  };

  const showSuccessAlert = (message) => {
    dispatch(
      showSnackbar({
        variant: "success",
        title: 'Bem Vindo!',
        message
      })
    )
  };

  const makeLogin = async () => {
    try {
      const res = await axios.post("https://backquizz.onrender.com/login", {
        email,
        senha: password,
      });
      //console.log(res.data)
      showSuccessAlert(`Você está logado!! Bem Vindo ${res.data.nome} :)`);
      
      dispatch(login(res.data))
      console.log(login(res.data))
      navigate("/home");
    } catch (error) {
      console.log(error.response.data);
      showAlertError(error.response.data.mensagem);
    }
  };
    return(
        <>
         <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>
                <Row className="justify-content-md-center">
                  <Col xs={12} style={{ textAlign: "center" }} className="my-3">
                    <Image
                      width={100}
                      height={100}
                      alt="171x180"
                      src="https://www.nicepng.com/png/detail/543-5431552_oktobercat-github-octocat.png"
                    />
                  </Col>
                  <Col style={{ textAlign: "center" }} xs={10}>
                    NerdQuiz
                  </Col>
                </Row>
              </Card.Title>

              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Seu Email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="mt-2">Senha</Form.Label>

                  <Button style={{ float: "right" }} variant="link">
                    
                  </Button>

                  <Form.Control
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Sua Senha"
                  />
                </Form.Group>
                <div className="d-grid gap-2 mt-4">
                  <Button
                    variant="success"
                    type="button"
                    onClick={() => makeLogin()}
                  >
                    Entrar
                  </Button>

                  <Button variant="link">
                    <Link to="/cadastro">Criar Conta</Link>
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
        </>
    )
}