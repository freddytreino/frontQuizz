import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import backgroundImage from '/home/freddy/Área de Trabalho/EngSoft/ProgWeb/frontQuizz/src/views/background.jpg'
export function Home() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius:"5px"

  };
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Verifica se o usuário está autenticado
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Estilo comum para todos os botões
  const buttonStyle = {
    width: '80%', // Largura de 100%
    margin: '5px', // Margem de 5px
  };

  // Verifica se o usuário está autenticado
  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    navigate("/login");
    return null; // Retorna null para não renderizar o conteúdo da página Home
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <Card className="mt-5">
            <Card.Body style={{ ...containerStyle, maxWidth: '100%', borderradius:'5px' }}>
              <Card.Title>
                <Row className="justify-content-md-center">
                  <Col xs={12} style={{ textAlign: "center",color:'white' }} className="my-3">
                    Bem-vindo {user.nome}
                  </Col>
                </Row>
              </Card.Title>
              <Col style={{textAlign:'center', margin:"5px"}}>
                <Button variant="success" as={Link} to="/escolha" style={buttonStyle}>JOGAR</Button>
              </Col>
              <Col style={{textAlign:'center', margin:"5px"}}>
                <Button variant="light" as={Link} to="/informacoes" style={buttonStyle}>INFORMAÇÕES</Button>
              </Col>
              <Col style={{textAlign:'center', margin:"5px"}}>
                <Button variant="danger" onClick={handleLogout} style={buttonStyle}>SAIR</Button>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
