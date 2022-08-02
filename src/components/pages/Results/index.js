import React, {useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import categories from '../../../data/categories';
import ResultBar from '../../app-components/result-bar';

const Results = () => {
  const navigate = useNavigate();
  const [filteredQuestions, setFilteredQuestions] = useState(JSON.parse(localStorage.getItem('filtered_questions')) ?? [])
  const [activeQuestion, setActiveQuestion] = useState(JSON.parse(localStorage.getItem('active_question')) ?? 0)
  const [responses, setResponses] = useState(JSON.parse(localStorage.getItem('responses')) ?? [])
  const getPercent = (category) => {
    let selCat = categories.filter(item => item.name === category)[0]
    let firstPart = selCat.parts[0]
    let oppositePart = selCat.parts[1]
    let partsPercent = {
      [firstPart]: 0,
      [oppositePart]: 0,
      'neutral': 0
    }
    let total = filteredQuestions.filter(item => item.category === category).length * 10
    responses.forEach((value, index) => {
      if (value < 0)
        partsPercent[filteredQuestions[index].part === firstPart ? oppositePart : firstPart] += value * -1
      else
        partsPercent[filteredQuestions[index].part] += value
    })
    partsPercent[firstPart] = Math.floor(partsPercent[firstPart] / total * 100)
    partsPercent[oppositePart] = Math.floor(partsPercent[oppositePart] / total * 100)
    partsPercent.neutral = 100 - partsPercent[firstPart] - partsPercent[oppositePart]
    return partsPercent
  }
  useEffect(() => {
    if (activeQuestion === 0 || responses.length === 0 || filteredQuestions.length === 0) {
      navigate('/questions')
    }
  }, [])
  return (
    <div>
      <h2>Résultats</h2>
      {categories.map(category => {
        let percents = getPercent(category.name)
        return (
          <div key={category.name}>
            <div>{category.name}</div>
            <ResultBar percents={[
              percents[category.parts[0]],
              percents.neutral,
              percents[category.parts[1]],
            ]}/>
          </div>
        )
      })}
    </div>
  );
}

export default Results;
