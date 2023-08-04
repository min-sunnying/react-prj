const fs = require('fs');
const express = require('express');
const app = express();
const Papa = require('papaparse');

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
  //console.log(jd.dialog_history)
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
          rating: h.rating
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
          rating: h.rating
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


chatlog=JSON.stringify(chatlog, null, 2)

    //Save result as JSON
    // const chatlogJSON=JSON.stringify(chatlog);
    fs.writeFileSync('chatlogJSON.json',chatlog)
    console.log('success')
    chatlog=JSON.parse(chatlog)
    const responses = chatlog.flatMap(item => {
      return item.dialog_history_user_system.map(history => {
        return {
          ...item,
          ...history
        };
      });
    });
    
    // JSON 데이터를 CSV 문자열로 변환합니다.
    const csvData = Papa.unparse(responses);
  
    // CSV 문자열을 파일에 씁니다.
    fs.writeFileSync('chatlogCSV.csv','\ufeff' + csvData, 'utf-8');
    
    console.log('CSV 파일이 생성되었습니다.');

    // try {
    //   // chatlogJSON.json 파일의 내용을 읽어옵니다.
    //   const chatlogJSON = fs.readFileSync('chatlogJSON.json', 'utf-8');
    
    //   // chatlogJSON 파일의 내용을 JSON 형식으로 파싱합니다.
    //   const chatlog = JSON.parse(chatlogJSON);
    
    //   // 유효한 JSON인 경우, 파싱된 데이터를 출력합니다.
    //   console.log('JSON 데이터:', chatlog);
    // } catch (error) {
    //   // JSON 파싱 중 오류가 발생한 경우, 오류 메시지를 출력합니다.
    //   console.error('유효한 JSON이 아닙니다:', error.message);
    // }

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