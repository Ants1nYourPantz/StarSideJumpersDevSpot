import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
    return (
        <div className="card mt-3 bg-dark">
            <div className="row g-0 bg-dark">
                <div className="col-md-4 bg-dark">
                    <img className="card-img-top bg-dark" src="https://picsum.photos/500?random" alt="random" />
                </div>
                <div className="col-md-8 bg-dark">
                    <div className="card-body bg-dark">
                        <h6 className="card-subtitle text-white">{ post.date_created }</h6>
                        &nbsp
                        <h5 className="card-title text-white">{ post.title }</h5>
                        &nbsp
                        <h6 className="card-subtitle text-white">By: { post.user_id }</h6>
                        <p className="card-text text-white">{ post.content }</p>
                        <div className="d-flex justify-content-end">
                            <Link className='btn btn-secondary' to={`/posts/${post.id}`}>See More</Link>
                            <Link className='btn btn-secondary mx-2' to={`/posts/${post.id}/edit`}>Edit Post</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}