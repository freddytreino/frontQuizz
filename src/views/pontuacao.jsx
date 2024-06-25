import React from 'react';
import axios from "axios";
import { Container, Row, Col, Card, Button} from 'react-bootstrap';
import { useSelector} from 'react-redux';
import { useLocation } from 'react-router-dom';
import backgroundImage from '/home/freddy/Área de Trabalho/EngSoft/ProgWeb/frontQuizz/src/views/background.jpg'
import { useNavigate } from 'react-router-dom';
export function Pontuacao() {
  const location = useLocation();
  const userPontos = location.state.userPontos;
  const userQuestoes = location.state.userQuestoes;
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: "5px"
  };
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user);
  const enviarDados = async()=>{
    try {
         await axios.post("https://backquizz.onrender.com/perfil/pontuacao",{
            id:user.perfil,
            pontuacao:userPontos,
            respondido:userQuestoes
        })
        
    } catch (error) {
        console.log(error.response.data.mensagem);
    }
    navigate("/escolha")
  }
  return (
    <Container >
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <Card className="mt-5">
            <Card.Body style={{ ...containerStyle, maxWidth: '100%', borderradius: '5px'}}>
              <Card.Title>
                <Row className="justify-content-md-center">
                  <Col xs={12} style={{ textAlign: "center", color: 'white' }} className="my-3">
                   RESULTADO
                  </Col >
                </Row>
              </Card.Title>
              <Col style={{ textAlign: "center", color: 'white' }} className="my-3">
                    Sua pontuação foi de:  {userPontos}
              </Col>
              <Col style={{ textAlign: 'center', margin: "5px" }}>
                <Button variant="primary" style={{ textAlign: "center", margin: "5px" }} onClick={()=>enviarDados()}>
                    Enviar Resposta
                </Button>
              
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
