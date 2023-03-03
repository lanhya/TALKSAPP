const url = "http://192.168.56.1:3000/addmessageuser";

function display_message(response) {

    let value_message = response.data;
    let contain_message = document.querySelector('.message');

    //if the messange is not null and object of messages of array has amount of index................//

    if (contain_message !== null && value_message.length !== 0) {
        contain_message.remove()
        console.log(contain_message);
    };
    //create div to store message and name under the message........................................//

    let NewMessage = document.createElement('div');
    NewMessage.className = "message";

    for (let text of value_message) {
        if (text.message !== "") {
            console.log('It works')

            //create div to contain paragraph of messages...........................................//

            let para = document.createElement("div")
            para.className = "pragraph";

            //create p to store message that will be sent...........................................//

            let p = document.createElement('p');
            p.className = "text";
            p.textContent = text.message;

            //create Username to show the name of replier...........................................//

            let Username = document.createElement("p");

            if (text.userName == user_Login) { //if user logged in equal to name in the localstorage//
                p.style.background = "blue";
                p.style.color = "white";
                p.style.borderRadius = "25px";
                p.style.padding = "5px";
                p.style.marginRight = "1%";
                
                //after we click on bold button and enter to be sent...............................//

                if (text.bold == "bold") {
                    p.style.fontWeight = "bold";
                }
                if (text.italic == "italic") {
                    p.style.fontStyle = "italic";
                }

            } else {
                
                if (text.bold == "bold") {
                    p.style.fontWeight = "bold";
                }
                if (text.italic == "italic") {
                    p.style.fontStyle = "italic";
                }

                p.style.background = "gray";
                p.style.color = "white";
                p.style.borderRadius = "25px";
                p.style.padding = "5px";
                p.style.marginLeft = "1%";
                p.style.marginBottom = "0%";
                para.style.justifyContent = "flex-start";
                para.style.alignItems = "flex-end";
                //style of the username under the messages...........................................//

                Username.textContent = text.userName;
                Username.style.marginLeft = "2%";
                Username.style.marginTop = "0%";
                Username.style.fontSize = "13px";
                Username.style.color = "#fff";
            }

            para.appendChild(p);
            NewMessage.appendChild(para);
            NewMessage.appendChild(Username);
            containMessage.appendChild(NewMessage);
        }
    }
}

function add_mesage(event) {
    event.preventDefault();

    //if we input message, the message feature will be shown in message.json.....................//

    if (textArea.value !== "") {
        let message_data = {
            userName: user_Login,
            message: textArea.value,
            bold: styleBold,
            italic: styleItalic,
        }
        axios.post(url, message_data).then(loadData);
    }
    textArea.value = "";
}

function loadData() {
    axios.get(url).then(display_message);
}

let textArea = document.querySelector('#text_entered');
let btnsend = document.querySelector('#send');
let containMessage = document.querySelector('.containMessage');

let user_Login = JSON.parse(localStorage.getItem("username"));
// let user_h1 = document.querySelector('#user');
// user_h1.textContent = user_Login;

btnsend.addEventListener('click', add_mesage)

setInterval(loadData, 1000);

//italic.......................................................................................//

function changeToitalic() {
    if (textArea.value !== "") {
        textArea.style.fontStyle = "italic";
        styleItalic = "italic";
    } else {
        styleItalic = "";
    }
}

//Bold........................................................................................//

function changeTobold() {
    if (textArea.value !== "") {
        textArea.style.fontWeight = "bold";
        styleBold = "bold";
    } else {
        styleBold = "";
    }
}

let styleBold = "";
let styleItalic = "";


function isNotchange() {
    if (textArea.value == "") {
        textArea.style.fontStyle = "normal";
        textArea.style.fontWeight = "normal";
        styleBold = "";
        styleItalic = "";
    }
}


let italic = document.querySelector("#italic");
let bold = document.querySelector("#bold");

italic.addEventListener("click", changeToitalic);
bold.addEventListener("click", changeTobold);