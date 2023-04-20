import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function CreatePost({ loggedIn, flashMessage }) {

    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to create a new post', 'danger');
            navigate('/login');
        }
    })

    async function handleSubmit(e){
        console.log(handleSubmit(e));
        e.preventDefault();


        let title = e.target.title.value;
        let content = e.target.content.value;

  
        let token = localStorage.getItem('token');

 
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);


        let requestContent = JSON.stringify({ title, content })

        let response = await fetch('http://127.0.0.1:5000/api/posts', {
            method: 'POST',
            headers: myHeaders,
            body: requestContent
        });

        let data = await response.json();

        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            flashMessage(`${data.title} has been created`, 'primary');
            navigate('/');
        };
    };

    return (
        <>
            <h4 className="text-center text-white my-5">Submit your level designs or suggestions here...</h4>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group text-center">
                    <input type="text" name="title" className="form-control my-3" placeholder='Please use either "LEVEL DESIGN" or "SUGGESTION"' />
                    <textarea name="content" className="form-control my-3" placeholder="Level Design or comment here..." />
                    <input type="submit" value="Submit" className='btn btn-warning w-50' />
                </div>
            </form>
        </>
    )
}