import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showSnackbar } from "../redux/snackbarSlice";
import { Link } from 'react-router-dom';

import backgroundImage from '/home/freddy/Área de Trabalho/EngSoft/ProgWeb/frontQuizz/src/views/background.jpg'
export function QuestionForm() {
  const containerStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: "5px"
  };

  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [numero, setNumero] = useState('');
  const [question, setQuestion] = useState('');
  const [level, setLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [alt1, setAlt1] = useState('');
  const [alt2, setAlt2] = useState('');
  const [alt3, setAlt3] = useState('');
  const [alt4, setAlt4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(1);

  const showAlertError = (message) => {
    dispatch(
      showSnackbar({
        variant: "danger",
        title: 'Um erro ocorreu',
        message
      })
    )
  };

  useEffect(() => {
    if (subject) {
      fetchLastQuestionNumber();
     
    }
  }, [subject]);

  const fetchLastQuestionNumber = async () => {
    try {
      if(subject=="matemática"){
        const response = await axios.get(`https://backquizz.onrender.com/quest/ultimoMath`);
        console.log(response.data)
        if (response.data && response.data.numero) {
          setNumero(response.data.numero + 1);
        }
      }else if(subject=="linguagens"){
        const response = await axios.get(`https://backquizz.onrender.com/quest/ultimoLinguagens`);
        console.log(response.data)
        if (response.data && response.data.numero) {
          setNumero(response.data.numero + 1);
        }
      }else if(subject=="biologia"){
        const response = await axios.get(`https://backquizz.onrender.com/quest/ultimoBiologia`);
        console.log(response.data)
        if (response.data && response.data.numero) {
          setNumero(response.data.numero + 1);
        }
      }else if(subject=="filosofia"){
        const response = await axios.get(`https://backquizz.onrender.com/quest/ultimoFilosofia`);
        console.log(response.data)
        if (response.data && response.data.numero) {
          setNumero(response.data.numero + 1);
        }
      }else if(subject=="física"){
        const response = await axios.get(`https://backquizz.onrender.com/quest/ultimoFisica`);
        console.log(response.data)
        if (response.data && response.data.numero) {
          setNumero(response.data.numero + 1);
        }
      }else if(subject=="geografia"){
        const response = await axios.get(`https://backquizz.onrender.com/quest/ultimoGeografia`);
        console.log(response.data)
        if (response.data && response.data.numero) {
          setNumero(response.data.numero + 1);
        }
      }else if(subject=="história"){
        const response = await axios.get(`https://backquizz.onrender.com/quest/ultimoHistoria`);
        console.log(response.data)
        if (response.data && response.data.numero) {
          setNumero(response.data.numero + 1);
        }
      }else if(subject=="química"){
        const response = await axios.get(`https://backquizz.onrender.com/quest/ultimoQuimica`);
        console.log(response.data)
        if (response.data && response.data.numero) {
          setNumero(response.data.numero + 1);
        }
      }
     
    } catch (error) {
      console.error('Erro ao buscar número da última questão:', error);
    }
  };

  const handleCreateQuestion = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      let url = "https://backquizz.onrender.com/quest";
      if (subject.toLowerCase() === 'matemática') {
        url += '/matematica';
      }else if(subject.toLowerCase()==='linguagens'){
        url += '/linguagens';
      }else if(subject.toLowerCase()==='biologia'){
        url += '/biologia';
      }else if(subject.toLowerCase()==='filosofia'){
        url += '/filosofia';
      }else if(subject.toLowerCase()==='física'){
        url += '/fisica';
      }else if(subject.toLowerCase()==='geografia'){
        url += '/geografia';
      }else if(subject.toLowerCase()==='história'){
        url += '/historia';
      }else if(subject.toLowerCase()==='química'){
        url += '/quimica';
      }

      const response = await axios.post(url, {
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

      setNumero("");
      setQuestion("");
      setLevel("");
      setSubject("");
      setAlt1("");
      setAlt2("");
      setAlt3("");
      setAlt4("");
      setCorrectAnswer(1);
      alert("Questão criada com sucesso!");
    } catch (error) {
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
                  <Col xs={12} style={{ textAlign: "center", color:"white", fontWeight:"bolder" }} className="my-3">
                    <h1>Criar Questão</h1>
                  </Col>
                </Row>
              </Card.Title>

              <Form>
                <Form.Group className="mb-3" style={{color:"white", fontWeight:"bolder"}} controlId="formBasicSubject">
                  <Form.Label>Disciplina</Form.Label>
                  <Form.Select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  >
                    <option value="">Selecione a disciplina</option>
                    <option value="linguagens">Linguagens</option>
                    <option value="biologia">Biologia</option>
                    <option value="filosofia">Filosofia</option>
                    <option value="física">Física</option>
                    <option value="geografia">Geografia</option>
                    <option value="história">História</option>
                    <option value="matemática">Matemática</option>
                    <option value="química">Química</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" style={{color:"white", fontWeight:"bolder"}} controlId="formBasicNumero">
                  <Form.Label>Número da Questão</Form.Label>
                  <Form.Control
                    value={numero}
                    readOnly={true}
                    type="number"
                    placeholder="Digite o número da questão"
                  />
                </Form.Group>
                <Form.Group className="mb-3" style={{color:"white", fontWeight:"bolder"}} controlId="formBasicLevel">
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
                <Form.Group className="mb-3" style={{color:"white", fontWeight:"bolder"}} controlId="formBasicQuestion">
                  <Form.Label>Pergunta</Form.Label>
                  <Form.Control
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    type="text"
                    placeholder="Digite sua pergunta"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" style={{color:"white", fontWeight:"bolder"}} controlId="formBasicAlt1">
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
                <Form.Group className="mb-3" style={{color:"white", fontWeight:"bolder"}} controlId="formBasicAlt2">
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
                <Form.Group className="mb-3" style={{color:"white", fontWeight:"bolder"}} controlId="formBasicAlt3">
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
                <Form.Group className="mb-3" style={{color:"white", fontWeight:"bolder"}} controlId="formBasicAlt4">
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
                    <Button variant="success" as={Link} to="/home">VOLTAR</Button> :
                    <Button variant="success" as={Link} to="/adm">VOLTAR</Button>
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
