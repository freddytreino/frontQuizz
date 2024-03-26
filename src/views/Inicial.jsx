import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import backgroundImage from '/home/freddy/Área de Trabalho/Engenharia_de_Software/progWeb/trabalhofront/quiz/src/views/background.jpg'

export function Inicial() {
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    
  return (
    <Container className="border p-3 mt-5" style={{ ...containerStyle, maxWidth: '400px', borderradius:'5px' }}>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <div className="text-center my-5" style={{color:"white",textAlign:"center"}}>
            <h1>Nerdquiz</h1>
            <Button variant="primary" as={Link} to="/login">Login</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}