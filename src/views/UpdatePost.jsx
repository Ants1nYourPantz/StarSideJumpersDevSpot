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

        let response = await fetch(`http://127.0.0.1:5000/api/posts/${params.postId}`, {
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

        let response = await fetch(`/api/posts/${post.id}`, {
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
            <h4 className="text-center text-white my-5">Make any changes to your post in the boxes below</h4>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" className="form-control my-3" placeholder='Enter Title' value={title} onChange={updatePostTitle} />
                    <textarea name="content" className="form-control my-3" placeholder='Enter content' value={content} onChange={updatePostContent} />
                    <input type="submit" value="Submit Changes" className='btn btn-secondary w-50' />
                    <input type="submit" value="Delete Post" className='btn btn-danger w-50' onClick={handleDelete} />
                </div>
            </form>
        </>
    )
}