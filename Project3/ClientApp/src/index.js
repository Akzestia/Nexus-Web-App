
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomeIsAuth } from "./components/Home";
import { LoginWithNavigate } from "./components/Login";
import { AuthRedirectWithNavigate }  from "./AuthRedirect";
import {SignupWithNavigate} from './components/Signup'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <BrowserRouter basename={baseUrl}>
        <Routes>
            <Route path='/' element={<AuthRedirectWithNavigate></AuthRedirectWithNavigate>}>

            </Route>

            <Route path='/login' element={<LoginWithNavigate></LoginWithNavigate>}>

            </Route>

            <Route path='/nexus' element={<HomeIsAuth></HomeIsAuth>} >

            </Route>

            <Route path='/sign-up' element={<SignupWithNavigate></SignupWithNavigate>}>

            </Route>
        </Routes>
  </BrowserRouter>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
