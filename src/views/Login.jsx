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
import backgroundImage from '/home/freddy/Área de Trabalho/EngSoft/ProgWeb/frontQuizz/src/views/background.jpg'

export function Login() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius:"5px"

  };
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showAlertError = (message) => {
    dispatch(
      showSnackbar({
        variant: "danger",
        title: "Um erro ocorreu",
        message,
      })
    );

    // Esconder o snackbar depois de 2 segundos
    setTimeout(() => {
      dispatch(
        showSnackbar({
          variant: "",
          title: "",
          message: "",
        })
      );
    }, 2000); // 2000 milissegundos = 2 segundos
  };



  const makeLogin = async () => {
    try {
      const res = await axios.post("https://backquizz.onrender.com/login", {
        email,
        senha: password,
      });
  
     
     
      dispatch(login(res.data))
      
      if(res.data.usuario){
        navigate("/home");

      }else{
        navigate("/adm")
      }
    } catch (error) {

      showAlertError(error.response.data.mensagem);
    }
  };
    return(
        <>
         <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <Card className="mt-5">
            <Card.Body style={{ ...containerStyle, maxWidth: '100%', borderradius:'5px' }}>
              <Card.Title>
                <Row className="justify-content-md-center">
                  <Col xs={12} style={{ textAlign: "center" }} className="my-3">
                    <Image
                      width={100}
                      height={100}
                      alt="171x180"
                      src="https://cdn.pixabay.com/photo/2020/07/11/12/31/idea-5393862_640.png"
                    />
                  </Col>
                  <Col style={{ textAlign: "center" , color:"white"}}>
                    <h1>BrainUp</h1>
                  </Col>
                </Row>
              </Card.Title>

              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={{color:"white",fontWeight:"bolder"}}>Email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Seu Email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label className="mt-2" style={{color:"white",fontWeight:"bolder"}}>Senha</Form.Label>

                  

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
                    ENTRAR
                  </Button>

                  
                <Button variant="primary" as={Link} to="/cadastro" >CRIAR CONTA</Button>
              
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