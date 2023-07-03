const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());
const cors = require('cors');
app.use(cors());

//JSON read
const rawData = fs.readFileSync('studentJSON.json');
//const data = JSON.parse(rawData);

const jsonData = JSON.parse(rawData);

//const dialogHistory = jsonData.dialog_history;

let chatlog=[]
let c=0

for (const jd of jsonData){
  //console.log(jd)
  let dialogHistoryUser = [];
  let dialogHistorySystem = [];
  console.log(jd.dialog_history)
  if (jd.dialog_history==undefined) {
    c++;
    continue;
  }
  let dialogHistory = jd.dialog_history;
  
  for (const dialog of dialogHistory){
    const allHistory = dialog.all_history;
    //console.log(allHistory[0])
    //for (const history of allHistory[0]) {
      try{
        const user = allHistory[0][0].user;
        const system = allHistory[0][0].system;
        console.log(user)

        dialogHistoryUser.push({
          db_session_key: dialog.db_session_key,
          user_input: user.user_input,
          created_at: user.created_at,
        });
      
        dialogHistorySystem.push({
          db_session_key: dialog.db_session_key,
          response: system.response,
          created_at: system.created_at,
        });
      }catch{
        const user = allHistory[0].user;
        const system = allHistory[0].system;

        dialogHistoryUser.push({
          db_session_key: dialog.db_session_key,
          user_input: user.user_input,
          created_at: user.created_at,
        });
      
        dialogHistorySystem.push({
          db_session_key: dialog.db_session_key,
          response: system.response,
          created_at: system.created_at,
        });
      };
    //}
  }
  const data = {
    _id: jd._id,
    studentID: jd.studentID,
    email:jd.email, 
    class_name:jd.class_name,
    dialog_history_user: dialogHistoryUser,
    dialog_history_system: dialogHistorySystem,
  };
  chatlog.push(data)
  console.log(data)
}


chatlog=JSON.stringify(chatlog)
console.log(c)
chatlog=JSON.parse(chatlog)
//console.log(dialog_out(data.dialog_history))

//json에서 원하는 데이터만 추출
// const chatlog=data.map(person=>(
//   {
//     studentID:person.studentID, 
//     email:person.email, 
//     class_name:person.class_name,
//     dialog_history_user: person.dialog_history_user,
//     dialog_history_system: person.dialog_history_system,
// }))
//console.log(chatlog)
//data send
app.get('/api/data', (req, res) => {
  res.json(chatlog);
});

app.listen(8080, () => console.log('Server started on port 8080'));
