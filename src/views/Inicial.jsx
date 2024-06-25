import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import backgroundImage from '/home/freddy/Área de Trabalho/EngSoft/ProgWeb/frontQuizz/src/views/background.jpg'

import Image from 'react-bootstrap/Image';
export function Inicial() {
    const containerStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius:"5px"
      };
    
  return (
    <Container className="border p-3 mt-5" style={{ ...containerStyle, maxWidth: '400px', borderradius:'5px' }}>
      <Row className="justify-content-md-center">
      <Col xs={12} style={{ textAlign: "center" }} className="my-3">
                    <Image
                      width={100}
                      height={100}
                      alt="171x180"
                      src="https://cdn.pixabay.com/photo/2020/07/11/12/31/idea-5393862_640.png"
                    />
      </Col>
      <Col className="text-center my-5" style={{color:"white",textAlign:"center"}}>
          
            <h1 style={{ margin: 'auto 0' }}>BrainUp</h1>
            <p>Teste seus conhecimentos</p>
            <Button variant="primary" as={Link} to="/login">LOGIN</Button>
          
      </Col>
      </Row>
      <footer style={{ textAlign: "center", color: "white" }}>
    Desenvolvido por{' '}
    <a
        href='https://www.linkedin.com/in/freddy-william-okino-guedes-4638a2267/'
        target='_blank'
        rel="noopener noreferrer"
        style={{ color: "white" }}
    >
        Freddy
    </a>
</footer>
    </Container>
  );
}