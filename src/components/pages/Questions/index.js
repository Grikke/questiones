import React, {useState, useEffect} from 'react';
import { Link, useNavigate } from "react-router-dom";
import './styles.scss';
import questions from '../../../data/questions';
import categories from '../../../data/categories';
import ResponseContainer from '../../app-components/response-container';

const Questions = () => {
  const navigate = useNavigate();
  const arrayShuffle = arr => {
    arr.sort(() => Math.random() - 0.5);
  }
  const filterQuestion = () => {
    let arrQuestions = []
    categories.forEach(({name, parts}) => {
      parts.forEach(part => {
        let selName = `${name} - ${part}`
        let selQuestions = questions[selName]
        arrayShuffle(selQuestions)
        selQuestions = selQuestions.slice(0, 16)
        arrQuestions = [...arrQuestions, ...selQuestions.map(question => {return {name: question, category: name, part}})]
      })
    })
    arrayShuffle(arrQuestions)
    return arrQuestions
  }
  const resetQuestion = () => {
    setFilteredQuestions(filterQuestion())
    setActiveQuestion(0)
    setResponses([])
  }
  const nextQuestion = point => {
    if (responses.length !== filteredQuestions.length) {
      setResponses([...responses, point])
      localStorage.setItem('responses', JSON.stringify([...responses, point]))
    }
    if (activeQuestion + 1 === filteredQuestions.length) {
      navigate('/results')
      resetQuestion()
    }
    else {
      setActiveQuestion(activeQuestion + 1)
    }
  }
  const [filteredQuestions, setFilteredQuestions] = useState(JSON.parse(localStorage.getItem('filtered_questions')) ?? filterQuestion())
  const [activeQuestion, setActiveQuestion] = useState(JSON.parse(localStorage.getItem('active_question')) ?? 0)
  const [responses, setResponses] = useState(JSON.parse(localStorage.getItem('responses')) ?? [])
  useEffect(() => {
    localStorage.setItem('filtered_questions', JSON.stringify(filteredQuestions))
  }, [])
  useEffect(() => {
    localStorage.setItem('active_question', JSON.stringify(activeQuestion))
    localStorage.setItem('responses', JSON.stringify(responses))
  }, [activeQuestion, responses])
  return (
    <div className="question-container">
      <div className="question-position">{activeQuestion + 1} sur {filteredQuestions.length}</div>
      <div className="question-name">{filteredQuestions[activeQuestion].name}</div>
      <button onClick={resetQuestion}>Reset</button>
      <ResponseContainer action={nextQuestion}/>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}

export default Questions;
