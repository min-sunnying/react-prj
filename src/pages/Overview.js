import React from 'react';
import Plot_S from '../charts/ChartComponent';

const Contact = () => {
  const xValues = [1, 2, 3];
  const yValues = [2, 6, 3];

    return (
        <div>
          <h1>Chart Example</h1>
          <Plot_S x={xValues} y={yValues}/>
        </div>
      );
};

export default Contact;

// #gpt 콜 개수

// #prompt 길이

// #answer satisfaction distribution

// #weekly 나누는 기준?

