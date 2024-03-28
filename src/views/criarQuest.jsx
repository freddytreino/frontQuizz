import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux'; // Importe useDispatch
import { useNavigate } from 'react-router-dom';
import { showSnackbar } from "../redux/snackbarSlice";
import { Link } from 'react-router-dom';

// Imagem de fundo
import backgroundImage from '/home/freddy/Área de Trabalho/Engenharia_de_Software/progWeb/trabalhofront/quiz/src/views/background.jpg';

export function QuestionForm() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: "5px"
  };
  const buttonStyle = {
    width: '100%',
    margin: '5px',
  };
  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Verifica se o usuário está autenticado
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [numero, setNumero] = useState(''); // Adicione o estado para o número da questão
  const [question, setQuestion] = useState('');
  const [level, setLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [alt1, setAlt1] = useState('');
  const [alt2, setAlt2] = useState('');
  const [alt3, setAlt3] = useState('');
  const [alt4, setAlt4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(1); // Definir a primeira alternativa como correta por padrão

  const showAlertError = (message) => {
    dispatch(
      showSnackbar({
        variant: "danger",
        title: 'Um erro ocorreu',
        message
      })
    )
  };

  const handleCreateQuestion = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post("https://backquizz.onrender.com/quest", {
        numero,
        question,
        level,
        subject,
        alternatives: [
          { text: alt1, isCorrect: correctAnswer === 1 },
          { text: alt2, isCorrect: correctAnswer === 2 },
          { text: alt3, isCorrect: correctAnswer === 3 },
          { text: alt4, isCorrect: correctAnswer === 4 }
        ]
      });
      console.log(response.data);
      // Limpar o formulário após o envio bem-sucedido
      setNumero(""); // Limpar também o campo de número
      setQuestion("");
      setLevel("");
      setSubject("");
      setAlt1("");
      setAlt2("");
      setAlt3("");
      setAlt4("");
      setCorrectAnswer(1); // Resetar para a primeira alternativa
      alert("Questão criada com sucesso!");
    } catch (error) {
      //console.error('Erro ao criar questão:', error);
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else {
        console.error('Erro ao criar questão:', error);
      }
      showAlertError(error.message);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={4}>
          <Card className="mt-5">
            <Card.Body style={{ ...containerStyle, maxWidth: '100%', borderRadius: '5px' }}>
              <Card.Title>
                <Row className="justify-content-md-center">
                  <Col xs={12} style={{ textAlign: "center" }} className="my-3">
                    <h1>Criar Questão</h1>
                  </Col>
                </Row>
              </Card.Title>

              <Form>
                <Form.Group className="mb-3" controlId="formBasicNumero">
                  <Form.Label>Número da Questão</Form.Label>
                  <Form.Control
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    type="number"
                    placeholder="Digite o número da questão"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicQuestion">
                  <Form.Label>Pergunta</Form.Label>
                  <Form.Control
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    type="text"
                    placeholder="Digite sua pergunta"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLevel">
                  <Form.Label>Nível</Form.Label>
                  <Form.Select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  >
                    <option value="">Selecione o nível</option>
                    <option value="fácil">Fácil</option>
                    <option value="médio">Médio</option>
                    <option value="difícil">Difícil</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicSubject">
                  <Form.Label>Disciplina</Form.Label>
                  <Form.Select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="">Selecione a disciplina</option>
                    <option value="história">História</option>
                    <option value="química">Química</option>
                    <option value="biologia">Biologia</option>
                    <option value="geografia">Geografia</option>
                    <option value="artes">Artes</option>
                    <option value="matemática">Matemática</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAlt1">
                  <Form.Label>Alternativa 1</Form.Label>
                  <Form.Control
                    value={alt1}
                    onChange={(e) => setAlt1(e.target.value)}
                    type="text"
                    placeholder="Digite a alternativa 1"
                  />
                  <Form.Check
                    type="radio"
                    name="correctAnswer"
                    label="Correta"
                    checked={correctAnswer === 1}
                    onChange={() => setCorrectAnswer(1)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAlt2">
                  <Form.Label>Alternativa 2</Form.Label>
                  <Form.Control
                    value={alt2}
                    onChange={(e) => setAlt2(e.target.value)}
                    type="text"
                    placeholder="Digite a alternativa 2"
                  />
                  <Form.Check
                    type="radio"
                    name="correctAnswer"
                    label="Correta"
                    checked={correctAnswer === 2}
                    onChange={() => setCorrectAnswer(2)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAlt3">
                  <Form.Label>Alternativa 3</Form.Label>
                  <Form.Control
                    value={alt3}
                    onChange={(e) => setAlt3(e.target.value)}
                    type="text"
                    placeholder="Digite a alternativa 3"
                  />
                  <Form.Check
                    type="radio"
                    name="correctAnswer"
                    label="Correta"
                    checked={correctAnswer === 3}
                    onChange={() => setCorrectAnswer(3)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAlt4">
                  <Form.Label>Alternativa 4</Form.Label>
                  <Form.Control
                    value={alt4}
                    onChange={(e) => setAlt4(e.target.value)}
                    type="text"
                    placeholder="Digite a alternativa 4"
                  />
                  <Form.Check
                    type="radio"
                    name="correctAnswer"
                    label="Correta"
                    checked={correctAnswer === 4}
                    onChange={() => setCorrectAnswer(4)}
                  />
                </Form.Group>
                <div className="d-grid gap-2 mt-4">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => handleCreateQuestion()}
                  >
                    ENVIAR
                  </Button>
                   
               
                             
                             {user.usuario ?
                                 <Button variant="success" as={Link} to="/home" >VOLTAR</Button> :
                                 <Button variant="success" as={Link} to="/adm" >VOLTAR</Button>
                             }
                        
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
