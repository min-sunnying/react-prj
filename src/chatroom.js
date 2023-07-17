import React from 'react';
import './App.css'
import { DataGrid } from '@mui/x-data-grid';

function PeopleList({ people, selectedPerson, onSelectPerson }) {
  const columns = [
    { field: 'studentID', headerName: 'ID', width: 200 },
    { field: 'class_name', headerName: 'Class', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  const rows = people.map((person) => ({ id: person._id, ...person }));

    return (
      <div>
        <ul className='clickable-list'>
        <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          // initialState={{
          //   filter: {
          //     filterModel: {
          //       items: [],
          //       quickFilterValues: ['quick', 'filter'],
          //     },
          //   },
          // }}
          rows={rows}
          columns={columns}
          pageSize={20}
          onRowClick={(row) => onSelectPerson(row.row)}
          rowClassName={(params) => (selectedPerson === params.row ? 'selected' : '')}
        />
      </div>
      </ul>
      </div>
    );
  }


  function Chatlog({messages, selectedPerson}) {
    let chatMessages = messages.filter(message=>message._id===selectedPerson._id);
    try{chatMessages=chatMessages[0].dialog_history_user_system}
    catch{return;}
    return(
      <div className='chat-container'>
        {chatMessages.map(message =>(
          <div className={`message ${message.who}`}>
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