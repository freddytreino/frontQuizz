import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Container, Card, Button, Form } from 'react-bootstrap';
import backgroundImage from '/home/freddy/Área de Trabalho/EngSoft/ProgWeb/frontQuizz/src/views/background.jpg'
export function Linguagens() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [userPontos, setUserPontos] = useState(0);
  const [userQuestoes, setUserQuestoes] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await axios.get("https://backquizz.onrender.com/quest/linguagens");
        setQuestions(response.data);
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
      if (currentQuestion.level === 'fácil') {
        setUserPontos(prevScore => prevScore + 1);
      } else if (currentQuestion.level === 'médio') {
        setUserPontos(prevScore => prevScore + 2);
      } else if (currentQuestion.level === 'difícil') {
        setUserPontos(prevScore => prevScore + 3);
      }
    } else {
      setIsAnswerCorrect(false);
      if (currentQuestion.level === 'fácil') {
        setUserPontos(prevScore => prevScore - 3);
      } else if (currentQuestion.level === 'médio') {
        setUserPontos(prevScore => prevScore - 2);
      } else if (currentQuestion.level === 'difícil') {
        setUserPontos(prevScore => prevScore - 1);
      }
    }

    setShowNextButton(true);
    setUserQuestoes(prevCount => prevCount + 1);
    if (currentQuestionIndex === 4) {
      setShowFinishButton(true);
    }
  };

  const irParaPontucao = () => {
    navigate("/pontuacao",{state:{userPontos,userQuestoes}});
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setIsAnswerCorrect(null);
    setShowNextButton(false);
    setErrorMessage('');
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
  };

  const handleFinishQuiz = () => {
    irParaPontucao();
  };

  if (questions.length === 0) {
    return <div style={{ textAlign: "center", marginTop: "10%" }}>Carregando...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Container className="mt-5">
      <Card>
        <Card.Body style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: "5px" }}>
          <Card.Title style={{ color: "white", textAlign: 'justify' }}>{currentQuestion.question}</Card.Title>
          <Form.Group style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {currentQuestion.alternatives.map((alt, index) => (
              <div key={index} style={{ marginBottom: '5px', width: '80%'}}>
                <Button
                  variant={(selectedAnswer === alt.text) ? 'warning' : 'light'}
                  style={{ width: '100%', whiteSpace: 'normal', color: ((isAnswerCorrect !== null && selectedAnswer === alt.text) ? (isAnswerCorrect ? 'green' : 'red') : 'black') }}
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
            {showNextButton || showFinishButton ? (
              <Button variant="danger" style={{ textAlign: "center", margin: "5px" }} onClick={showFinishButton ? handleFinishQuiz : handleNextQuestion}>
                {showFinishButton ? 'Finalizar' : 'Próxima Questão'}
              </Button>
            ) : (
              <Button variant="primary" style={{ textAlign: "center", margin: "5px" }} onClick={handleAnswerSubmit}>
                Enviar Resposta
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
      {}
    </Container>
  );
}
