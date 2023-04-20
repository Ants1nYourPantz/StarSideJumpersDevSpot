import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ loggedIn, logUserOut }) {
    return (
        <nav className="navbar navbar-expand-lg bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand text-warning" to="/">StarSide Jumpers</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link text-white" to="/">Home</Link>
                        {loggedIn ?(
                            <>
                            <Link className="nav-link text-white" to="/create">Comments/Suggestions</Link>
                            <Link className="nav-link text-white" to="/ticket">Submit a Ticket</Link>
                            <Link className="nav-link text-white" to="/posts/<int:post_id>" onClick={() => logUserOut()}>Log Out</Link>
                            </>
                        ) : (
                            <>
                            <Link className="nav-link text-white" to="/register">Sign Up</Link>
                            <Link className="nav-link text-white" to="/login">Log In</Link>
                            </>    
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}