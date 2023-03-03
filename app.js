const express = require('express');
const fs = require("fs");
const app = express();
const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server is Runnig...");
});

//to read data json from body.................................................................//

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));
let data_login = [
    {name: "Dyna",password: "123"},
    {name: "Lanh",password: "121"},
    ];

app.get('/user', (req, res) => {
    res.send(data_login);
});

let message_data = [];

//add data message to array to store message from client----------------------------------------------//

app.post('/addmessageuser', (req, res) => {
    let usermessge = req.body;
    message_data.push(usermessge);
    fs.writeFileSync("message.json", JSON.stringify(message_data));
    res.send(message_data);
});

//to reply message to client.........................................................................//

app.get("/addmessageuser", (req, res)=>{

    let message_data = JSON.parse(fs.readFileSync("message.json").toString());
    res.send(message_data)
})

message_data = JSON.parse(fs.readFileSync("message.json").toString());


app.post('/user', (req, res) => {
    let username = req.body;
    console.log(username);
})

