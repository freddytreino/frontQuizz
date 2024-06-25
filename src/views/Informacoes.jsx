import React from "react";
import { useSelector } from "react-redux";
import { Container, Row, Col, Card, Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from '/home/freddy/Área de Trabalho/EngSoft/ProgWeb/frontQuizz/src/views/background.jpg'
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
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
  const[usePerfil]=useState(user.perfil)
  const[atulaPontuacao,setPontuacao]=useState(0)
  const[atualRespondidos, setQuestoes]=useState(0)
  const [melhoresPerfis, setMelhoresPerfis] = useState([]);
  useEffect(() => {
    async function carregarMelhoresPerfis() {
      try {
        const response = await axios.get(
          "https://backquizz.onrender.com/perfil/melhores"
        );
        setMelhoresPerfis(response.data);
      } catch (error) {
        console.error("Erro ao carregar os melhores perfis:", error);
      }
    }
    carregarMelhoresPerfis();
  }, []);
  useEffect(()=>{
    async function achardados(){
        try {
            const res = await axios.get(`https://backquizz.onrender.com/perfil/${usePerfil}`
               
            ) 
            setPontuacao(res.data.pontuacao)
            setQuestoes(res.data.respondido)
        } catch (error) {
            
        }
    }
    achardados()
  },[])
  const buttonStyle = {
    width: "40%",
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
                {typeof atulaPontuacao === "number" && (
                  <input
                    type="text"
                    value={`Pontuação: ${atulaPontuacao}`}
                    className="form-control"
                    disabled
                  />
                )}
              </Card.Text>
              <Card.Text>
                {typeof atualRespondidos === "number" && (
                  <input
                    type="text"
                    value={`Questões respondidas: ${atualRespondidos}`}
                    className="form-control"
                    disabled
                  />
                )}
              </Card.Text>
              <Card.Title
                className="text-center mb-4"
                style={{ color: "white", fontWeight: "bolder" }}
              >
              RANK DOS MELHORES
              </Card.Title>
              <Table striped bordered hover variant="light">
                <thead>
                  <tr>
                    <th>Posição</th>
                    <th>Nome</th>
                    <th>Pontuação</th>
                    <th>Questões Respondidas</th>
                  </tr>
                </thead>
                <tbody>
                  {melhoresPerfis.slice(0, 5).map((perfil, index) => (
                    <tr key={perfil._id}>
                      <td>{index + 1}</td>
                      <td>{perfil.nome}</td>
                      <td>{perfil.pontuacao}</td>
                      <td>{perfil.respondido}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>



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
