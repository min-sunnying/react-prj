import React from 'react';

function PeopleList({ people, selectedPerson, onSelectPerson }) {
    return (
      <ul>
        {people.map(person => (
          <li key={person.id} className={selectedPerson === person ? 'selected' : ''} onClick={() => onSelectPerson(person)}>
            {person.name}
          </li>
        ))}
      </ul>
    );
  }
  
  function ChatHistory({ messages, selectedPerson }) {
    const chatMessages = messages.filter(message => message.from === selectedPerson.id || message.to === selectedPerson.id);
  
    return (
      <div>
        {chatMessages.map(message => (
          <div key={message.id}>
            <p>{message.content}</p>
            <small>{message.timestamp}</small>
          </div>
        ))}
      </div>
    );
  }

  export {PeopleList, ChatHistory};