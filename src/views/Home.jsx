import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap'; // Importando componentes do Bootstrap

export function Home() {
  const user = useSelector(state => state.auth.user);
  console.log("Dados do usuário no componente Home:", user); // Adicione este log

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <Card className="mt-5">
            <Card.Body>
              <Card.Title>
                <Row className="justify-content-md-center">
                  <Col xs={12} style={{ textAlign: "center" }} className="my-3">
                    Bem-vindo {user.nome}
                  </Col>
                </Row>
              </Card.Title>
              <div>
                {user.nome && <p>Nome: {user.nome}</p>}
                {user.email && <p>Email: {user.email}</p>}
                {typeof user.respondido === 'number' && <p>Respondido: {user.respondido}</p>}
                {typeof user.pontuacao === 'number' && <p>Pontuação: {user.pontuacao}</p>}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
