import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import { PeopleList, Chatlog } from './chatroom';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:8080/api/data')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const [selectedPerson, setSelectedPerson] = useState(data);
    
  const handleSelectPerson = (person) => {
  setSelectedPerson(person);
  }

  return(
    <div className='container'>
      <div className='left-panel scrollable-section'>
      <h2>Student List</h2>
      <PeopleList people={data} selectedPerson={selectedPerson} onSelectPerson={handleSelectPerson} />
      </div>
      
      <div className='right-panel scrollable-section'>
      <h2>Chatlog</h2>
      <Chatlog messages={data} selectedPerson={selectedPerson} />
      </div>
    </div>
  );
}


export default App;

