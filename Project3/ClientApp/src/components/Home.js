import React, { Component, useEffect } from "react";
import "../CSS/Home.css";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout } from "./Layout";
import { Message, MessageWithData } from "./Message";
import { FaBeer } from "react-icons/fa";
import { encode, decode } from "uint8-to-base64";
import { Contact } from "./Contact";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      connection: new HubConnectionBuilder().withUrl("/NexusChat").build(),
      connectionId: "",
      messages: [],
      contacts: [],
      activeReceiverId: '',
      data: '',
    };
    this.state.connection.on(
      "broadcastMessage",
      async (UserId, message) => {
        console.log(message);

          const options = {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              }
          };

          const response = await fetch("auth/GetCurrentUserId", options);

          const data = await response.json();
        

        console.log("ID = " + data);

        console.log(this.state.connection.connection.connectionId);
        // document.getElementById('x-img').src = list;
        var array = this.state.messages;
        array.push(
          new Object({
            id: array.length,
            textcontent: message,
            Date: new Date().getHours() + ":" + new Date().getMinutes(),
            SenderId: UserId,
            ReceiverId: data.Id,
            CurrentUserId: data.Id,
          })
        );
        this.setState({ messages: array });
        console.log(this.state.messages);
      }
    );
    this.state.connection.on("Echo", async (name, message) => {
      /*window.location = '/login';*/
      console.log(this.state.connection.connection.connectionId);
    });

    this.sendMessage = this.sendMessage.bind(this);
  }

  handleMessage = (event) => {
    console.log(event.data);
  };

  timer;
    componentDidMount = async () => {
        document.body.style.backgroundColor = "rgb(26,26,26)";

        clearInterval(this.timer);

        const options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch("auth/GetCurrentUserId", options);

        const data = await response.json();

        document.getElementById('nav-img-x').src = "data:image/png;base64," + data.userAvatar;
        document.querySelector('.users-interface-img-x').src = "data:image/png;base64," + data.userAvatar;
        document.querySelector('.user-interface-username-x').innerHTML = data.userName;

    this.timer = setInterval(() => {
      try{
        if (document.getElementById("background-video").paused) {
          document.getElementById("background-video").play();
        } else {
        }
      }
      catch{clearInterval(this.timer);}
     
    }, 1000);
    window.oncontextmenu = () => {
      return false;
    };

    document.addEventListener("keydown", (key) => {
      if (key.key === "Enter") {
        var u = document.querySelector(".send-x-btn");

        u.click();
      }
    });

    if (document.getElementById("background-video").paused) {
      document.getElementById("background-video").play();
    } else {
    }
    //const response = await fetch('values', { method: "GET" });
    //const data = await response.json();

    //this.IsAuthorized = data === "/nexus" ? true : false;

    //window.location = data;
    document.getElementById("background-video").disablePictureInPicture = true;

    await this.state.connection
      .start()
      .then(() => {
        console.log("Connected");
        this.setState({
          connectionId: this.state.connection.connection.connectionId,
        });
        console.log("Id: " + this.state.connectionId);
      })
      .catch((error) => console.error(error.message));
  };

  componentWillUnmount = () => clearInterval(this.timer);

  sendMessage = async () => {


    if (document.getElementById("i-s").value != "") {

      const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    const response = await fetch("auth/GetCurrentUserId", options);

    const data = await response.json();

      this.state.connection.send(
        "broadcastMessage",
        document.getElementById("i-s").value, data.id
      );
    }
  };

  getBuffer(fileData) {
    return function (resolve) {
      var reader = new FileReader();
      reader.readAsArrayBuffer(fileData);
      reader.onload = function () {
        var arrayBuffer = reader.result;
        var bytes = new Uint8Array(arrayBuffer);
        resolve(bytes);
      };
    };
  }

  render() {
    const contacts = this.state.contacts.map((val) => {});
    return (
      <>
        <div className="div-main-x">
          <div className="contacts-div-x">
            <div className="contact-list-x">
              <Contact></Contact>
            </div>
            <button className="add-contact-btn">Add Contact</button>
            <button className="join-server-btn">Join Server</button>
            <div className="user-interface-x">
              <img
                className="users-interface-img-x"
                src="https://scarletnexusstorage.blob.core.windows.net/images/Avatar.png"
              ></img>
              <p className="user-interface-username-x">Azure</p>
              <svg
                id="settings-svg-btn"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"></path>
              </svg>
            </div>
          </div>
          <div className="chat-area-div-x">
            <video
              id="background-video"
              loop
              autoPlay
              controls={false}
              preload="true"
              muted
            >
              <source
                src="https://scarletnexusstorage.blob.core.windows.net/images/elaina-moonlight-flower-moewalls-com.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {this.state.messages.map((val) => (
      <MessageWithData
        key={val.id}
        CurrentUserId={val.CurrentUserId}
        Date={val.Date}
        textcontent={val.textcontent}
        ReceiverId={val.ReceiverId}
        SenderId={val.SenderId}
      ></MessageWithData>
    ))}
            </div>

            {/*<button*/}
            {/*  onClick={async () => {*/}
            {/*    await fetch("auth/logout", { method: "POST" }).then(*/}
            {/*      () => (window.location = "/")*/}
            {/*    );*/}
            {/*  }}*/}
            {/*>*/}
            {/*  SignOut*/}
            {/*</button>*/}

            {/*<input*/}
            {/*  id="x-o-x"*/}
            {/*  type="file"*/}
            {/*  onChange={async (evt) => {*/}

            {/*  }}*/}
            {/*></input>*/}
          </div>
          <div className="chat-ixput-div-x">
            <input id="i-s" placeholder="Enter message..."></input>
            <button
              className="send-x-btn"
              onClick={async () => {
                await this.sendMessage();
                document.getElementById("i-s").value = "";
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32">
                <path d="M21.7264 2.95706L16.2732 22.0433C16.1222 22.5718 15.7976 22.5958 15.5561 22.1127L10.9998 13.0002L1.92266 9.36931C1.41298 9.16544 1.41929 8.86034 1.9567 8.6812L21.0429 2.31913C21.5714 2.14297 21.8745 2.43878 21.7264 2.95706ZM19.0351 5.0966L6.81197 9.17097L12.4486 11.4256L15.4893 17.507L19.0351 5.0966Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </>
    );
  }
}

export function HomeIsAuth() {
  const navigate = useNavigate();

  const location = useLocation();

  console.log(location.state);

  if (location.state.IsAuthorized)
    return (
      <Layout>
        <Home></Home>
      </Layout>
    );
  else navigate("/");
}
