import React, {useState, useEffect} from 'react';
import Plot from 'react-plotly.js';

import axios from 'axios';
import { dateToweek, countCharacters } from '../charts/TimeCalculate';

const ChartComponent = (props) =>{
    const [filterMode, setfilterMode] = useState('all');
    const [filterID, setfilterID] = useState('');
    const onChangeA = (e) => {
      setfilterMode(e.target.value);
    };
    const onChangeB = (e) => {
      setfilterID(e.target.value);
    };

  
    //const {filterMode, filterID} = props;
        // mode: 'all'(defailt), 'class', 'individual'
        // ID: 'sw' or 'studentID'
        // # get Data from sever
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
        

    // # Data Processing
    let chatLogWeek = chatLog.map((e)=>{
        let singleUserChat = e["dialog_history_user_system"].map((userCall, idx) =>{
            if (userCall["who"] == "user"){
                return {"response": userCall["response"] ,
                        "week": dateToweek(userCall["created_at"]), 
                        "rating" : e["dialog_history_user_system"][idx+1]["rating"]}
            }
            //return {"rating": userCall["rating"]}        
            }).filter((element) => element !== undefined);
        
        return {
            "studentID" : e["studentID"],
            "className": e["class_name"], 
            "chatLog" : singleUserChat
        }
        }
    )
   
    //Get all class name and studentID
    const classNames = [];
    const studentIDs = [];

    // Iterate through chatLogWeek to extract class names and student IDs
    chatLogWeek.forEach(userLog => {
      const className = userLog.className;
      const studentID = userLog.studentID;
      
      // Add class name and student ID to the respective arrays if they're not already added
      if (!classNames.includes(className)) {
        classNames.push(className);
      }
      if (!studentIDs.includes(studentID)) {
        studentIDs.push(studentID);
      }
    });
    // * Filter
    switch (filterMode){
        case 'all':
            //console.log(filterMode)
            break;
        case 'class':
            chatLogWeek = chatLogWeek.filter((e)=> e["className"] == filterID);
            
            break;
        case 'individual':
            chatLogWeek = chatLogWeek.filter((e)=> e["studentID"] == filterID);
            //console.log(chatLogWeek);
            break;
        default:
            console.log(filterMode + ' is wrong input')
        
    }

    // * data to chart
    let chartData = {
        "week": [0,1,2,3,4,5,6,7,8,9], // 4.5 ~ 4.11 week 1 ~~ week 8 6/1~6/7
        "callNum" : [0,0,0,0,0,0,0,0,0,0],
        "length" : [[],[],[],[],[],[],[],[],[],[]],
        "satisfaction" : [[],[],[],[],[],[],[],[],[],[]],
    }
    
    for (let userLog of chatLogWeek){
        for (let message of userLog["chatLog"]){
        chartData["callNum"][message["week"]] ++;
        chartData["length"][message["week"]].push(countCharacters(message["response"]));
        if (message["rating"] != undefined){
            //console.log(message["rating"])
            chartData["satisfaction"][message["week"]].push(message["rating"]);
        }
        }
    }

    let satisfactionData = []
    for (let i = 0; i<5;i++){
        let satisfactionTemp = [0,0,0,0,0,0,0,0];
        for (let week = 0 ; week<8; week ++){
          for (let e of chartData["satisfaction"].slice(1,9)[week]){
              if (e==i){
                if (i<2){
                  satisfactionTemp[week] -=1
                }else{
                  satisfactionTemp[week]++
                }
                
              }
          }
        }

        satisfactionData.push({
        y: satisfactionTemp,
        x: chartData["week"].slice(1,9),
        type: 'bar',
        name: "rating:"+ (i+1),
       // orientation : 'h',
        //text:satisfactionTemp.map((value) => `${value}`),
        hovertemplate: satisfactionTemp.map((value) => `${Math.abs(value)}`)
        })
    }

       

    return (
      <div>
          <select onChange={onChangeA} value={filterMode}>
            <option value="all">All</option>
            <option value="class">Class</option>
            <option value="individual">Individual</option>
            {/* Add more options as needed */}
          </select>
            <select onChange={onChangeB} value={filterID} disabled = {filterMode == "all"}>
              <option value="">Select an option...</option>
              {filterMode === 'class'
                ? classNames.map((className, index) => (
                    <option key={index} value={className}>
                      {className}
                    </option>
                  ))
                : studentIDs.map((studentID, index) => (
                    <option key={index} value={studentID}>
                      {studentID}
                    </option>
               ))}
            {/* Add more options as needed */}
          </select>
          <div className= "plot-container">
          <div className="plot-wrapper">
            <Plot
              data={[
                {
                  x: chartData["week"].slice(1,9),
                  y: chartData["callNum"].slice(1,9),
                  type: 'scatter',
                  mode: 'lines+markers',
                  marker: { color: 'red' },
                  name: '',
                  hovertemplate: 'callCount: %{y}'
                },
              ]}
              layout={{ width: '100%', height: 480, title: 'System usage pattern(call number)' ,
                      xaxis : {title: "week",tickvals: chartData["week"].slice(1,9)}, yaxis:{title: "call",range:[0, Math.max(...chartData.callNum)+20]}}
                    }
            />
          </div>
          <div className="plot-wrapper">
            <Plot
              data={chartData["length"].map((e,idx)=>{
                return{
                  y: e,
                  type: 'box',
                  name: `week ${idx}`,
                 }
              }).slice(1,9)
                
              }
              layout={{  width: '100%', height: 480, title: 'Length of each prompt',
                      xaxis : {title: "week"}, yaxis:{title: "Length (avg)",type:'log',range:[0,Math.log10(Math.max(...chartData.length.flat()))+0.1]}}
                    }
            />
          </div>

          <div className="plot-wrapper">
            <Plot
              data = {satisfactionData}
              layout={{ width: '100%', height: 480, title: 'Ratings' ,
                      barmode:'relative',boxgap:0.2,
                      xaxis : {title: "week",tickvals: chartData["week"].slice(1,9)},
                      // yaxis: { title: "Count", tickvals: [0, 1, 2, 3, 4, 5], ticktext: ['1', '2', '3', '4', '5', '3 (Center)'] }
                      yaxis:{title: "rating"}
                      }
            }
            />
          </div>
          </div>
      </div>
        
      );
}

export default ChartComponent;
