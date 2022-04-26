import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from "./Nav"

toast.configure();

export default class Contact extends Component {

  state = {
    users: [],
  };

  notify = () => toast.success("User Deleted Successfully", {
    autoClose: 2000,
    theme: 'dark',
  })

  getAllUsers = async () => {
    await axios.get("api/contact", {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then((result) => {
      this.setState({ users: result.data.users });
    }).catch((err) => {
      console.log(err);
    });

  };

  componentDidMount = () => {
    this.getAllUsers();
  }


  deleteUser = async (id) => {
    await axios.delete("/api/contact/" + id, {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then((result) => {
      this.notify();
      this.getAllUsers();
    }).catch((err) => {
      console.log(err);
    });

  }


  render() {

    return (
      <>
        <Nav />

        <div className='px-4'>

          <div className='card shadow p-3'>
           <div className='d-flex justify-content-between'>
           <h2>All Contacts</h2>      
           <p><Link to="/add-contact" className='text-decoration-none'>Add Contact</Link></p>      
           </div>
          </div>
          <div className='table-responsive mt-3'>
            <table className="table  table-border">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Image</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
              <tbody>
                {this.state.users.map((user, i) => {
                  return (
                    <tr key={i}>
                      <th scope="row">{i + 1}</th>
                      <td>{user.fname}</td>
                      <td>{user.lname}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td><img className="rounded img-fluid" src={"uploads/user/" + user.image} width="50px" alt="img" /></td>
                      <td>
                        <Link to={"/edit-contact/" + user.id} className='btn btn-primary mx-3'>Edit</Link>
                        <Link to="#" onClick={(e) => this.deleteUser(user.id)} className='btn btn-danger '>Delete</Link>
                      </td>

                    </tr>
                  )
                })}


              </tbody>
            </table>
          </div>

        </div>
      </>
    )
  }
}
