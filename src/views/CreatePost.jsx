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
        e.preventDefault();


        let title = e.target.title.value;
        let content = e.target.content.value;

  
        let token = localStorage.getItem('token');

 
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);


        let requestContent = JSON.stringify({ title, content })

        let response = await fetch('https://kekambas-blog-api.onrender.com/api/posts', {
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
            <h3 className="text-center text-white my-5">Create A Post!</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" className="form-control my-3" placeholder='Enter Title' />
                    <textarea name="content" className="form-control my-3" placeholder='Enter content' />
                    <input type="submit" value="Create Post" className='btn btn-secondary w-100' />
                </div>
            </form>
        </>
    )
}