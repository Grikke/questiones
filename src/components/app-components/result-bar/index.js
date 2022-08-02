import React from 'react';
import './styles.scss';

const ResultBar = ({
  percents,
  colors
}) => {
  return (
    <div className={"result-bar"}>
      <div style={{backgroundColor: colors && colors[0] ? colors[0] : 'blue', width: `${percents[0]}%`}}></div>
      <div style={{backgroundColor: colors && colors[1] ? colors[1] : 'grey', width: `${percents[1]}%`}}></div>
      <div style={{backgroundColor: colors && colors[2] ? colors[2] : 'red', width: `${percents[2]}%`}}></div>
    </div>
  );
}

export default ResultBar;