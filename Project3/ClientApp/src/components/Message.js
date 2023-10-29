import { React, Component, useEffect } from "react";
import "../CSS/Message.css";

export class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textcontent: props.textcontent,
      // BlobUrlContent: props.BlobUrlContent,
      // ImgGifTypes: ["image/png", "image/jpeg", "image/gif"],
      SenderName: '',
      Date: props.Date,
      SenderId: props.SenderId,
      ReceiverId: props.ReceiverId,
      ImageSrc: '',
    };
  }

  componentDidMount = async () => {
    const options2 = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `auth/GetUserById/${this.state.SenderId}`,
      options2
    );

      await response.json().then((response) => {
          document.querySelectorAll('.img-avatar-x-sender').forEach((e) => e.src = "data:image/png;base64," + response.userAvatar);
          this.setState({ SenderName: response.userName });
          this.setState({ ImageSrc: response.userAvatar });
          console.log("HDGYIWGFYIWG EYFUGWYFG(W GF&(WG&(F GW&(FG " + response.userAvatar);
    });

    

    // console.log(data.userName);
    // console.log(data.userAvatar);
    

   

      this.state.ReceiverId != this.state.SenderId
        ? document
            .getElementById("m-x-s")
            .classList.add("msg-x-main-container-receiver")
        : document
            .getElementById("m-x-s")
            .classList.remove("msg-x-main-container-sender");
    this.state.ReceiverId == this.state.SenderId
      ? document
          .getElementById("m-x-s")
          .classList.remove("msg-x-main-container-receiver")
      : document
          .getElementById("m-x-s")
          .classList.add("msg-x-main-container-sender");

  
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
    return (
      <>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div id="m-x-s">
            <div className="message-text-section-x">
              <img id="avatar-border-img"
                src="https://scarletnexusstorage.blob.core.windows.net/images/Avatar.png"
                className="img-avatar-x-sender"
              
              ></img>
              <div className="x-user-name">{this.state.SenderName}</div>
              <p>
                {this.state.textcontent}
              </p>
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
      CurrentUserId={props.CurrentUserId}
      textcontent={props.textcontent}
      Date={props.Date}
      SenderId={props.SenderId}
      ReceiverId={props.ReceiverId}
    ></Message>
  );
}
