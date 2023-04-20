import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ flashMessage, logUserIn }) {

    const navigate = useNavigate();

    async function handleLogin(event){
        event.preventDefault();
    

        let username = event.target.username.value;
        let password = event.target.password.value;
        let stringToEncode = `${username}:${password}`

        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`);

        let response = await fetch('http://127.0.0.1:5000/api/token', {
            method: 'POST',
            headers: myHeaders
        });

        let data = await response.json();

        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
  
            console.log(data);
            let token = data.token;
            let expiration = data.token_exp;

   
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration);

         
            logUserIn(true);

            flashMessage('You have successully logged in', 'success');
            navigate('/');
        };

    };

    return (
        <>
            <h3 className="text-center text-white my-5">Log In Here!</h3>
            <form action="" onSubmit={handleLogin}>
            <div class="form-group text-center d-flex flex-column justify-content-center align-items-center">
                    <input type="text" name="username" className="form-control my-1 w-50" placeholder='Enter Username...' />
                    <input type="password" name="password" className="form-control my-1 w-50" placeholder='Enter Password...' />
                    <input type="submit" value="Log In" className='btn btn-warning w-50 my-3' />
                </div>
            </form>
        </>
    )
}