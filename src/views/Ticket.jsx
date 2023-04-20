import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Ticket({ loggedIn, flashMessage }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn){
            flashMessage('You must be logged in to submit a ticket for review', 'danger');
            navigate('/login');
        }
    })

    async function handleSubmit(e){
        e.preventDefault();


        let title = e.target.title.value;
        let content = e.target.content.value;
        let contact = e.target.contact.value;

  
        let token = localStorage.getItem('token');

 
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', `Bearer ${token}`);


        let requestContent = JSON.stringify({ title, content, contact })

        let response = await fetch('http://127.0.0.1:5000/api/ticket', {
            method: 'POST',
            headers: myHeaders,
            body: requestContent
        });

        let data = await response.json();

        if (data.error){
            flashMessage(data.error, 'danger');
        } else {
            flashMessage(`${data.title} has been sent to the team`, 'primary');
            navigate('/');
        };
    };
    return (
        <>
        <h1 className="text-center my-5 text-danger">PAGE CURRENTLY UNDER CONSTRUCTION</h1>
        <h3 className="text-center my-5 text-white">Submit a Ticket</h3>
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group text-white">
            <label htmlFor="title">Issue:</label>
            <input type="text" id="title" name="title" className="form-control" placeholder="Name of Issue occuring..." />
          </div>
          <div className="form-group text-white mt-3">
            <label htmlFor="content">Description:</label>
            <textarea id="content" name="content" className="form-control" placeholder="In a few words please descripe the issue you are having..." rows="5"></textarea>
          </div>
          <div className="form-group text-white mt-3">
            <label htmlFor="contact">Contact Information:</label>
            <input type="text" id="contact" name="contact" className="form-control" placeholder="Enter a phone number or a valid e-mail address..." />
          </div>
          <div className="form-group text-white mt-3">
            <label htmlFor="priority">Priority Level:</label>
            <select id="priority" name="priority" className="form-control">
              <option value="">Select priority level...</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <h6 className='text-center my-3 text-white'>Please note that all tickets submitted are final. Once you submit your ticket, the dev team will take action and review your ticket. If a resolution can occur a member of the team will contact you directly.</h6>
          <div class="form-group text-center d-flex flex-column justify-content-center align-items-center">
            <input type="submit" value="Submit" className="btn btn-warning w-50 mt-3" />
          </div>
        </form>
      </>
    )
}