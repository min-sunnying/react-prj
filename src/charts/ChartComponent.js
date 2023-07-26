import React from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';


export default class Plot_S extends React.Component {
  render() {
    const { x, y } = this.props; // Retrieve x and y values from props

    return (
      <Plot
        data={[
          {
            x: x,
            y: y,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
          { type: 'bar', x: x, y: y },
        ]}
        layout={{ width: 320, height: 240, title: 'A Fancy Plot' }}
      />
    );
  }
}


