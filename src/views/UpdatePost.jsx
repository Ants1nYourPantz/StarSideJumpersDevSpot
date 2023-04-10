import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdatePost({ loggedIn, flashMessage, post }) {
    const navigate = useNavigate();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const params = useParams();


    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to edit a post', 'danger');
            navigate('/login');
        }
    }, [loggedIn, flashMessage, navigate, params.postID])


    const handleDelete = async () => {
        let token = localStorage.getItem('token');
        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Bearer ${token}`);

        let response = await fetch(`https://kekambas-blog-api.onrender.com/api/posts/${params.postId}`, {
            method: 'DELETE',
            headers: myHeaders,
        });

        let data = await response.json();
        
        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            flashMessage(`${data.title} has been deleted`, 'primary');
            navigate('/');
        };
    };


    async function handleSubmit(e){
        e.preventDefault();


        let title = e.target.title.value;
        let content = e.target.content.value;
        

        let token = localStorage.getItem('token');

        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);

        let requestContent = JSON.stringify({ title, content })

        // Make the fetch request
        let response = await fetch(`https://kekambas-blog-api.onrender.com/api/posts/${params.postId}`, {
            method: 'PUT',
            headers: myHeaders,
            body: requestContent
        });

        let data = await response.json();

        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            flashMessage(`${data.title} has been updated`, 'primary');
            navigate('/');
        };
    };

    const updatePostTitle = (e) => {
        setTitle(e.target.value);
    };

    const updatePostContent = (e) => {
        setContent(e.target.value);
    };

    return (
        <>
            <h3 className="text-center  text-white">Edit a Post</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" className="form-control my-3" placeholder='Enter Title' value={title} onChange={updatePostTitle} />
                    <textarea name="content" className="form-control my-3" placeholder='Enter content' value={content} onChange={updatePostContent} />
                    <input type="submit" value="Edit Post" className='btn btn-success w-50' />
                    <input type="submit" value="Delete Post" className='btn btn-danger w-50' onClick={handleDelete} />
                </div>
            </form>
        </>
    )
}