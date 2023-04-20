import React, { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import logo from '../components/images/logo-no-background.png';

export default function Home() {
    
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchPostData(){
            let response = await fetch('http://127.0.0.1:5000/api/posts')
            let posts = await response.json()
            setPosts(posts);
        };

        fetchPostData();
    }, []);

    return (
        <div>
            <img src={logo} className='mt-4' alt="StarSide Jumpers" style={{width: '60%', display: 'block', margin: 'auto'}} />
            <h4 className="text-center text-white my-5">StarSide Jumpers Dev Team Blog</h4>
            <p className="text-center text-white my-5">Welcome to the StarSide Jumpers(SSJ) comment and suggestion board! Our game developers frequently interact with our community members, taking comments and suggestions to help improve our game! As you may know SSJ is a new FREE-TO-PLAY and upcoming side scroller that takes place in far off planets. The goal is to make through the rough terrian as fast as possible.</p>
            <p className="text-center text-white my-5">The ultimate end goal for our game is to have missions and goals for each level. Upon level completion a new fun fact will appear on screen teaching you about something coorelating to the level design which we would ultimately like to resemble real space objects. Our target audience is children ages 8-15, giving them a fun interactive way to learn about space and other worldy objects!</p>
            <p className="text-center text-white my-5">We ask that anyone with suggestions or level designs make a post titled wither "LEVEL DESIGN" or "SUGGESTION" to help our dev's quickly navigate and bring your ideas into our working space.</p>
            <h6 className="text-center text-white my-5">Sincerly, The StarSide Team</h6>
            <div className="text-center my-5">
                <a href="https://github.com/Ants1nYourPantz/Platformer_Perfection" className="btn btn-warning" target="_blank" rel="noopener noreferrer">StarSide Jumpers Download</a>
            </div>
            {posts.map( post => <PostCard key={post.id} post={post} />)}
        </div>
    )
}