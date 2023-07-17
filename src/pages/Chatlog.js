import React, {useState, useEffect} from 'react';
import '../App.css';
import axios from 'axios';
import { PeopleList, Chatlog } from '../chatroom';

const Home = () => {
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
  
  
    const [filterClassName, setFilterClassName] = useState(null);
    const handleFilterChange = (event) => {
      setFilterClassName(event.target.value);
    };
    
    const filteredPeople = filterClassName
    ? data.filter(person => person.class_name === filterClassName)
    : data;
  
    return(
      <div className='container'>
        {/* <h1>Raw Data</h1> */}
        <div className='left-panel'>
          <h2>Student List</h2>
          {/* <select value={filterClassName} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="sw">SW</option>
              <option value="irw">IRW</option>
          </select> */}
          <div className='container scrollable-section'>
          <PeopleList people={filteredPeople} selectedPerson={selectedPerson} onSelectPerson={handleSelectPerson} />
          </div>
        </div>
        
        <div className='right-panel scrollable-section'>
        <h2>Chatlog</h2>
        <Chatlog messages={data} selectedPerson={selectedPerson} />
        </div>
      </div>
    );
  }

export default Home;