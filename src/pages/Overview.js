import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

//import Plot_S from '../charts/ChartComponent';
import axios from 'axios';
import { dateToweek } from '../charts/TimeCalculate';



const Contact = () => {

  const [chatLog, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  //console.log(chatLog)
  
  
  let chatLogWeek = chatLog.map((e)=>{
      let singleUserChat = e["dialog_history_user_system"].map((userCall) =>{
          const createdDate = new Date(userCall["created_at"]);
          if (userCall["who"] == "user"){
            return {"response": userCall["response"], "week": dateToweek(createdDate)}
          }        
        }).filter((element) => element !== undefined);;
      //console.log(e["dialog_history_user_system"])
      //e["dialog_history_user_system"]
      return {
        "stuentID" : e["studentID"], 
        "chatLog" : singleUserChat
      }
    }
  )
//  console.log(chatLogWeek)
  
  

  let chartData = {
    "week": [0,1,2,3,4,5,6,7,8,9], // 4.5 ~ 4.11 week 1 ~~ week 8 6/1~6/7
    "callNum" : [0,0,0,0,0,0,0,0,0,0],
    "length" : [0,0,0,0,0,0,0,0,0,0],
    "satisfaction" : []
  }
  
  for (let userLog of chatLogWeek){
    for (let message of userLog["chatLog"]){
      
      chartData["callNum"][message["week"]] ++;
      chartData["length"][message["week"]] +=  message["response"].length;
    }
  }
  

  for (let i = 0;i++; i<10){
    chartData["length"][i] = chartData["length"][i]/chartData["callNum"][i]
  }
  
  //console.log(chartData);



    return (
        <div>
          <h1>Overview</h1>
          <div className="plot-container">
            <Plot
              data={[
                {
                  x: chartData["week"].slice(1,9),
                  y: chartData["callNum"].slice(1,9),
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' },
                  hovertemplate: 'callCount: %{y}'
                },
              ]}
              layout={{ width: 720, height: 480, title: 'System usage pattern(call number)' ,
                      xaxis : {title: "week",tickvals: chartData["week"]}, yaxis:{title: "call"}}
                    }
            />
          </div>
          <div className="plot-container">
            <Plot
              data={[
                {
                  x: chartData["week"].slice(1,9),
                  y: chartData["length"].slice(1,9),
                  type: 'bar',
                  marker: { color: 'red' },
                  hovertemplate: 'Average Length: %{y}'
                },
              ]}
              layout={{  width: 720, height: 480, title: 'Length of each prompt',
                      xaxis : {title: "week",tickvals: chartData["week"]}, yaxis:{title: "Length (avg)"}}
                    }
            />
          </div>
          <div className="plot-container">
            <Plot
              data={[
                {
                  x: chartData["week"],
                  y: chartData["callNum"],
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' },
                },
              ]}
              layout={{ width: window.width, height: window.height/4, title: 'Answer satisfaction distribution between weeks' }}
            />
          </div>

        </div>
      );
};

export default Contact;

// #gpt 콜 개수

// #prompt 길이

// #answer satisfaction distribution

// #weekly 나누는 기준?

