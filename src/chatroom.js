import React from 'react';
import './App.css'

function PeopleList({ people, selectedPerson, onSelectPerson }) {
    return (
      <ul className='clickable-list'>
        {people.map(person => (
          <li key={person._id} className={selectedPerson === person ? 'selected' : ''} onClick={() => onSelectPerson(person)}>
            {person.studentID} | {person.class_name} | {person.email}
          </li>
        ))}
      </ul>
    );
  }


  function Chatlog({messages, selectedPerson}) {
    let chatMessages = messages.filter(message=>message._id===selectedPerson._id);
    try{chatMessages=chatMessages[0].dialog_history_user_system}
    catch{return;}
    return(
      <div>
        {chatMessages.map(message =>(
          <div>
            <p>
              {message.response}
            </p>
            <small>
              {message.created_at}
            </small>
          </div>
        ))}
      </div>
    );
  }

  export {PeopleList, Chatlog};