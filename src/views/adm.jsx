
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import backgroundImage from '/home/freddy/Área de Trabalho/EngSoft/ProgWeb/frontQuizz/src/views/background.jpg'
export function Adm() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius:"5px"

  };
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  
  const buttonStyle = {
    width: '80%', 
    margin: '5px', 
  };

  
  if (!isAuthenticated) {
    
    navigate("/login");
    return null; 
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
                <Button variant="primary" as={Link} to="/escolha" style={buttonStyle}>JOGAR</Button>
              </Col>
              <Col style={{textAlign:'center', margin:"5px"}}>
                <Button variant="success" as={Link} to="/quest" style={buttonStyle}>CRIAR QUESTÕES</Button>
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
