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
  let dialogHistoryUserSystem = [];
  console.log(jd.dialog_history)
  if (jd.dialog_history==undefined) {
    continue;
  }
  let dialogHistory = jd.dialog_history;
  
  for (const dialog of dialogHistory){
    const allHistory = dialog.all_history;
    for(const h of allHistory){
      try{
        const user = h[0].user;
        const system = h[0].system;

        dialogHistoryUserSystem.push({
          who: "user",
          db_session_key: dialog.db_session_key,
          response: user.user_input,
          created_at: user.created_at,
        });
      
        dialogHistoryUserSystem.push({
          who: "system",
          db_session_key: dialog.db_session_key,
          response: system.response,
          created_at: system.created_at,
        });
      }catch{
        const user = h.user;
        const system = h.system;

        dialogHistoryUserSystem.push({
          who: "user",
          db_session_key: dialog.db_session_key,
          response: user.user_input,
          created_at: user.created_at,
        });
      
        dialogHistoryUserSystem.push({
          who: "system",
          db_session_key: dialog.db_session_key,
          response: system.response,
          created_at: system.created_at,
        });
      };
    }
  }
  const data = {
    _id: jd._id,
    studentID: jd.studentID,
    email:jd.email, 
    class_name:jd.class_name,
    dialog_history_user_system: dialogHistoryUserSystem,
  };
  chatlog.push(data)
}


chatlog=JSON.stringify(chatlog)
console.log(c)
chatlog=JSON.parse(chatlog)

app.get('/api/data', (req, res) => {
  res.json(chatlog);
});

fs.writeFile("chatLog.json", JSON.stringify(chatlog), function(err) {
  if (err) {
      console.log(err);
  }
});

app.listen(8080, () => console.log('Server started on port 8080'));
