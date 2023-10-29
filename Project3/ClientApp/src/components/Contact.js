
import { React, Component } from 'react'
import "../CSS/Contact.css"

export class Contact extends Component {

    constructor(props) {
        super(props);

        this.state = {
            contactUser: props.contactUser,
        }
    }

    componentDidMount = async () => {
        
    }

    render(){
        return(
            <> 
                <div className='contact-x-main-container'>
                    <img className='contact-avatar-x' src="https://scarletnexusstorage.blob.core.windows.net/images/Avatar.png"></img>
                    <div className='contact-info-x'>
                        <p>Name</p>
                        <p>Last msg</p>
                    </div>
                </div>
            </>
        )
    }
}