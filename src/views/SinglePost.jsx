import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from '../components/PostCard';

export default function SinglePost() {
    const params = useParams();
    
    const [post, setPost] = useState({});
    
    useEffect(() => {
        fetch(`https://kekambas-blog-api.onrender.com/api/posts/${params.postId}`)
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