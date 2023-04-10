import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {

    const randomNumber = Math.floor(Math.random() * 1000) + 1;
    const imageURL = `https://picsum.photos/500?random=${randomNumber}`


    return (
        <div className="card mt-3 bg-dark">
            <div className="row g-0 bg-dark">
                <div className="col-md-4 bg-dark">
                    <img className="card-img-top bg-dark" src={imageURL} alt="random" />
                </div>
                <div className="col-md-8 bg-dark">
                    <div className="card-body bg-dark">
                        <div className='position-absolute bottom end-0 mx-2 my-1'>
                            <h6 className="card-subtitle text-white"><small>{ post.date_created }</small></h6>
                        </div>
                        &nbsp
                        <h4 className="card-title text-white" style={{ textDecoration: 'underline'}}><strong>{ post.title }</strong></h4>
                        &nbsp
                        {/* <h6 className="card-subtitle text-white">By: { post.user_id }</h6> */}
                        <p className="card-text text-white"><small><i class="fa fa-italic" aria-hidden="true">{ post.content }</i></small></p>
                        <div className="position-absolute bottom-0 end-0 my-3">
                            <Link className='btn btn-secondary' to={`/posts/${post.id}`}>See More</Link>
                            <Link className='btn btn-secondary mx-2' to={`/posts/${post.id}/edit`}>Edit Post</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}