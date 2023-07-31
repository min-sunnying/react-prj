import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

import axios from 'axios';
import { dateToweek, countCharacters } from '../charts/TimeCalculate';
import ChartComponent from '../charts/ChartComponent';



const Contact = () => {
  const [textA, setTextA] = useState('');

  const onChangeA = (e) => {
    setTextA(e.target.value);
  };

  const onResetA = () => {
    setTextA('');
  };
  const [textB, setTextB] = useState('');

  const onChangeB = (e) => {
    setTextB(e.target.value);
  };

  const onResetB = () => {
    setTextB('');
  };

    return (
        <div>
          <h1>Overview</h1>
          <input onChange={onChangeA} value={textA}  />
          <input onChange={onChangeB} value={textB}  />
          <ChartComponent 
            filterMode={textA} 
            filterID={textB}/>
        </div>
      );
};

export default Contact;

// #gpt 콜 개수

// #prompt 길이

// #answer satisfaction distribution

// #weekly 나누는 기준?

