import React, {useState} from 'react';
import './App.css';
import { PeopleList, ChatHistory} from './chatroom';

function App() {
  const [people, setPeople] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
    { id: 4, name: 'Dave' },
  ]);
  const [selectedPerson, setSelectedPerson] = useState(people[0]);
  const [messages, setMessages] = useState([
    { id: 1, from: 1, to: 2, content: 'Hi Bob!', timestamp: '2022-05-07 10:00:00' },
    { id: 2, from: 2, to: 1, content: 'Hi Alice!', timestamp: '2022-05-07 10:01:00' },
    { id: 3, from: 3, to: 1, content: 'Hi Alice!', timestamp: '2022-05-07 10:02:00' },
    { id: 4, from: 1, to: 3, content: 'Hi Charlie!', timestamp: '2022-05-07 10:03:00' },
    { id: 5, from: 2, to: 3, content: 'Hi Charlie, how are you?', timestamp: '2022-05-07 10:04:00' },
    { id: 6, from: 3, to: 2, content: 'I am good, thanks!', timestamp: '2022-05-07 10:05:00' },
    { id: 7, from: 2, to: 3, content: 'What are you up to?', timestamp: '2022-05-07 10:06:00' },
    { id: 8, from: 3, to: 2, content: 'Nothing much, just working on a project.', timestamp: '2022-05-07 10:07:00' },
    ]);
    
    const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    }
  return (
    <div className="container">
      <div className="left-panel">
        <h1>Student List</h1>
        <PeopleList people={people} selectedPerson={selectedPerson} onSelectPerson={handleSelectPerson} />
      </div>
      <div className="right-panel">
        <h1>Chatroom</h1>
        <ChatHistory messages={messages} selectedPerson={selectedPerson} />
      </div>
    </div>
  );
}


export default App;

