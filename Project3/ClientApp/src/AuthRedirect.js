import React from "react";
import { useNavigate, useLocation } from "react-router-dom";


export default class AuthRedirect extends React.Component{



    componentDidMount = async () =>{
        const response = await fetch('values', { method: "GET" });
        const data = await response.json();

        var IsAuthorized = data === "/nexus" ? true : false;

        this.props.navigate(data, { state: {IsAuthorized: IsAuthorized} });

    }


    render(){
        return(
            <div></div>
        )
    }
}

export function AuthRedirectWithNavigate(){
    const navigate = useNavigate();

    const location = useLocation();

    return <AuthRedirect location={location} navigate={navigate}></AuthRedirect>
}