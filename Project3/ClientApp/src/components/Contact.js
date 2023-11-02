
import { React, Component } from 'react'
import "../CSS/Contact.css"
import { useNavigate } from 'react-router-dom';

export class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            CurrentUserId: props.CurrentUserId,
            ReceiverId: props.ReceiverId,
            SenderId: props.SenderId,
            SenderName: '',
            SenderAvatar: '',
            contactId: props.contactId,
            contactReturnId: props.CurrentUserId == props.SenderId ? props.ReceiverId : props.SenderId
        }
    }

    componentDidMount = async () => {
        const options = {
            method: "GET",
            headers: {
                "Content" : "application/json",
            },
        }
        const response = await fetch(`message/GetContactInfo/${this.props.SenderId}/${this.props.ReceiverId}/${this.props.CurrentUserId}`, options);

        const data = response.json();

        await data.then((res) =>{
            document.getElementById('p-x'+this.state.contactId).innerText = res.userName;
            document.getElementById('img-contact-'+this.state.contactId).src = "data:image/png;base64," + res.userAvatar;
        })
    }

    render(){
        return(
            <> 
                <div className='contact-x-main-container' onClick={() => {
                    this.props.navigate(`/nexus/${this.state.contactId}`, { state: {IsAuthorized: true} });
                    this.props.setReceiverId(this.state.contactReturnId);
                }}>
                    <img id={'img-contact-'+this.state.contactId} className='contact-avatar-x' ></img>
                    <div className='contact-info-x'>
                        <p id={'p-x'+this.state.contactId}></p>
                        {/* <p>Last msg</p> */}
                    </div>
                </div>
            </>
        )
    }
}

export function ContactWithData(props) {

    const navigate = useNavigate();
    return (
      <Contact
        navigate={navigate}
        setReceiverId={props.setReceiverId}
        CurrentUserId={props.CurrentUserId}
        ReceiverId={props.ReceiverId}
        SenderId={props.SenderId}
        contactId={props.contactId}
      ></Contact>
    );
  }
  