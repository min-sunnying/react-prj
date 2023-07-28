import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

import axios from 'axios';
import { dateToweek, countCharacters } from '../charts/TimeCalculate';
import ChartComponent from '../charts/ChartComponent';



const Contact = () => {


    return (
        <div>
          <h1>Overview</h1>
          <ChartComponent filterMode='class' filterID="aw"></ChartComponent>

        </div>
      );
};

export default Contact;

// #gpt 콜 개수

// #prompt 길이

// #answer satisfaction distribution

// #weekly 나누는 기준?

