import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function SinglePost() {
    const params = useParams();
    
    const [post, setPost] = useState({});
    
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/posts/${params.postId}`)
            .then(res => res.json())
            .then(data => {
                setPost(data)
            });
    }, [params.postID])

    return (
        <div>
            <PostCard post={post }/>
        </div>
    )
}