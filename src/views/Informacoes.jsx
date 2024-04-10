import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "/home/freddy/Área de Trabalho/Engenharia_de_Software/progWeb/trabalhofront/quiz/src/views/background.jpg";

export function Informar() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "5px",
  };

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const buttonStyle = {
    width: "100%",
    margin: "5px",
  };

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={8}>
          <Card className="mt-5">
            <Card.Body
              style={{
                ...containerStyle,
                maxWidth: "100%",
                borderradius: "5px",
              }}
            >
              <Card.Title
                className="text-center mb-4"
                style={{ color: "white", fontWeight: "bolder" }}
              >
                INFORMAÇÕES
              </Card.Title>
              <Card.Text>
                {user.nome && (
                  <input
                    type="text"
                    value={user.nome}
                    className="form-control"
                    disabled
                  />
                )}
              </Card.Text>
              <Card.Text>
                {typeof user.pontuacao === "number" && (
                  <input
                    type="text"
                    value={`Pontuação: ${user.pontuacao}`}
                    className="form-control"
                    disabled
                  />
                )}
              </Card.Text>
              <Card.Text>
                {typeof user.respondido === "number" && (
                  <input
                    type="text"
                    value={`Questões respondidas: ${user.respondido}`}
                    className="form-control"
                    disabled
                  />
                )}
              </Card.Text>
              <Col style={{ textAlign: "center", margin: "5px" }}>
                <Button
                  variant="success"
                  as={Link}
                  to={user.usuario ? "/home" : "/adm"}
                  style={buttonStyle}
                >
                  VOLTAR
                </Button>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
