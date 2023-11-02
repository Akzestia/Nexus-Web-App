import { React, Component, useEffect } from "react";
import "../CSS/Message.css";

export class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textcontent: props.textcontent,
      // BlobUrlContent: props.BlobUrlContent,
      // ImgGifTypes: ["image/png", "image/jpeg", "image/gif"],
      Date: props.Date,
      SenderId: props.SenderId,
      CurrentUserId: props.CurrentUserId,
      SenderName: props.SenderName,
      SenderAvatar: props.SenderAvatar,
      ReceiverId: props.ReceiverId,
      MessageId: props.MessageId,
    };
  }

  componentDidMount = async () => {

      if(this.state.CurrentUserId != this.state.ReceiverId){
        document.getElementById("m-x-s" + this.state.MessageId).classList.add("msg-x-main-container-receiver");
      }
      else{
        document.getElementById("m-x-s" + this.state.MessageId).classList.add("msg-x-main-container-sender");
      }

    //   this.state.CurrentUserId != this.state.ReceiverId
    //     ? document
    //         .getElementById("m-x-s")
    //         .classList.add("msg-x-main-container-receiver")
    //     : document
    //         .getElementById("m-x-s")
    //         .classList.remove("msg-x-main-container-sender");
    // this.state.CurrentUserId == this.state.ReceiverId
    //   ? document
    //       .getElementById("m-x-s")
    //       .classList.remove("msg-x-main-container-receiver")
    //   : document
    //       .getElementById("m-x-s")
    //       .classList.add("msg-x-main-container-sender");

  
  };

  render() {
    return (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div id={"m-x-s" + this.state.MessageId}>
            <div className="message-text-section-x">
              <img id="avatar-border-img"
                src={"data:image/png;base64," + this.state.SenderAvatar}
                className="img-avatar-x-sender"
              
              ></img>
              <div className="x-user-name">{this.state.SenderName}</div>
              <p>
                {this.state.textcontent}
              </p>
              {/* <p><img src={"data:image/png;base64," + this.state.BlobContent}></img></p> */}
              <div className="date-content-section-x">{this.state.Date}</div>
            </div>
            <div className="blob-content-section-x"></div>
          </div>
        </div>
      </>
    );
  }
}

export function MessageWithData(props) {

  return (
    <Message
      MessageId={props.MessageId}
      CurrentUserId={props.CurrentUserId}
      Date={props.Date}
      textcontent={props.textcontent}
      ReceiverId={props.ReceiverId}
      SenderId={props.SenderId}
      SenderName={props.SenderName}
      SenderAvatar={props.SenderAvatar}
    ></Message>
  );
}
