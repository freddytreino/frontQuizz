import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Button, Form } from 'react-bootstrap';
import backgroundImage from '/home/freddy/Área de Trabalho/Engenharia_de_Software/progWeb/trabalhofront/quiz/src/views/background.jpg';

export function Filo() {
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
        const Questions = response.data
        setQuestions(Questions);
      } catch (error) {
        console.error('Erro ao carregar as questões:', error);
      }
    }
    fetchQuestions();
  }, []);

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

    if (selectedAnswer === correctAnswer.text) {
      setIsAnswerCorrect(true);
    } else {
      setIsAnswerCorrect(false);
    }

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
      <Card>
        <Card.Body style={{backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius:"5px"}}>
          <Card.Title style={{color:"white", textAlign: 'center'}}>{currentQuestion.question}</Card.Title>
          <Form.Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {currentQuestion.alternatives.map((alt, index) => (
              <div key={index} style={{marginBottom: '5px', width: '100%', maxWidth: '300px'}}>
                <Button
                  variant={(selectedAnswer === alt.text) ? 'warning' : 'light'}
                  style={{width: '100%', whiteSpace: 'normal', color: ((isAnswerCorrect !== null && selectedAnswer === alt.text) ? (isAnswerCorrect ? 'green' : 'red') : 'black')}}
                  onClick={() => setSelectedAnswer(alt.text)}
                  disabled={isAnswerCorrect !== null}
                >
                  {(isAnswerCorrect !== null && selectedAnswer === alt.text) ? (isAnswerCorrect ? 'Correto' : 'Incorreto') : alt.text}
                </Button>
              </div>
            ))}
          </Form.Group>
          {errorMessage && (
            <div style={{ textAlign: 'center', color: 'red', fontWeight: 'bold', marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}
          <div style={{ textAlign: 'center', margin: "5px" }}>
            {showNextButton ? (
              <Button variant="primary" style={{textAlign:"center",margin:"5px"}} onClick={handleNextQuestion}>
                Próxima Questão
              </Button>
            ) : (
              <Button variant="primary" style={{textAlign:"center",margin:"5px"}} onClick={handleAnswerSubmit}>
                Enviar Resposta
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
