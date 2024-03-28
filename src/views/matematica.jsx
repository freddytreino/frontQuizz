import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import backgroundImage from '/home/freddy/Área de Trabalho/Engenharia_de_Software/progWeb/trabalhofront/quiz/src/views/background.jpg';

export function Math() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get("https://backquizz.onrender.com/quest");
        const mathQuestions = response.data.filter(question => question.subject === 'matemática');
        setQuestions(mathQuestions);
      } catch (error) {
        console.error('Erro ao carregar as questões:', error);
      }
    }
    fetchQuestions();
  }, []);

  // Limpa a mensagem de erro quando a resposta selecionada muda
  useEffect(() => {
    setErrorMessage('');
  }, [selectedAnswer]);

  const handleAnswerSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.alternatives.find(alt => alt.isCorrect);

    if (selectedAnswer === '') {
      setErrorMessage('Por favor, selecione uma resposta.');
      return;
    }

    setIsAnswerCorrect(selectedAnswer === correctAnswer.text);
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setIsAnswerCorrect(null);
    setShowNextButton(false);
    setErrorMessage('');
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  if (questions.length === 0) {
    return <div style={{textAlign:"center",marginTop:"10%"}}>Carregando...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius:"5px"}}>
              <Card.Title style={{color:"white"}}>{currentQuestion.question}</Card.Title>
              <Form.Group>
                {currentQuestion.alternatives.map((alt, index) => (
                  <Form.Check
                    key={index}
                    type="radio"
                    id={`radio-${index}`}
                    label={alt.text}
                    checked={selectedAnswer === alt.text}
                    onChange={() => setSelectedAnswer(alt.text)}
                    disabled={isAnswerCorrect !== null}
                  />
                ))}
              </Form.Group>
              {errorMessage && (
                <div style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
                  {errorMessage}
                </div>
              )}
              {isAnswerCorrect !== null && !isAnswerCorrect && (
                <div style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
                  Resposta incorreta. A resposta correta era: {currentQuestion.alternatives.find(alt => alt.isCorrect).text}
                </div>
              )}
              {isAnswerCorrect !== null && isAnswerCorrect && (
                <div style={{ textAlign: 'center', color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
                  Resposta correta!
                </div>
              )}
              <Col  style={{ textAlign: 'center', margin: "5px" }}>
                {showNextButton ? (
                  <Button variant="primary" style={{textAlign:"center",margin:"5px"}} onClick={handleNextQuestion}>
                    Próxima Questão
                  </Button>
                ) : (
                  <Button variant="success" style={{textAlign:"center",margin:"5px"}} onClick={handleAnswerSubmit}>
                    Enviar Resposta
                  </Button>
                )}
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
