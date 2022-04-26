import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import Nav from "./Nav"

toast.configure();

class AddContact extends Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        image: "",
        password: ""
    }

    notify = () => toast.success("User Added Successfully", {
        autoClose: 2000,
        theme: 'dark',
    })



    saveContact = async (e) => {
        e.preventDefault();
        const data = new FormData()
        data.append('fname', this.state.fname);

        data.append('lname', this.state.lname);

        data.append('email', this.state.email);

        data.append('phone', this.state.phone);

        data.append('image', this.state.image);

        data.append('password', this.state.password);
        const res = await axios.post("/api/contact", data, {
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((result) => {
            document.getElementById("formsubmit").reset();
            this.notify();
            this.props.navigate('/contact');

        }).catch((error) => {
            if (error.response.data.errors.email) {
                toast.error(error.response.data.errors.email[0], { autoClose: 2000, theme: 'dark' });
            }
            if (error.response.data.errors.fname) {
                toast.error(error.response.data.errors.fname[0], { autoClose: 2000, theme: 'dark' });
            }
            if (error.response.data.errors.lname) {
                toast.error(error.response.data.errors.lname[0], { autoClose: 2000, theme: 'dark' });
            }
            if (error.response.data.errors.phone) {
                toast.error(error.response.data.errors.phone[0], { autoClose: 2000, theme: 'dark' });
            }
            if (error.response.data.errors.password) {
                toast.error(error.response.data.errors.password[0], { autoClose: 2000, theme: 'dark' });
            }
        });

    }

    render() {
        return (
            <>
                <Nav />

                <div className='px-4'>
                    <div className='card shadow p-3'>
                        <div className='d-flex justify-content-between'>
                            <h2>Add Contact</h2>
                            <p><Link to="/contact" className='text-decoration-none'>All Contact</Link></p>

                        </div>
                    </div>
                    <div className='mt-3 card shadow p-4'>
                        <form onSubmit={this.saveContact} id="formsubmit">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="fname" onChange={(e) => { this.setState({ fname: e.target.value }) }} className="form-control" placeholder="First name" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="lname" className="form-control" onChange={(e) => { this.setState({ lname: e.target.value }) }} placeholder="Last name" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="file" name="image" className="form-control" onChange={(e) => { this.setState({ image: e.target.files[0] }) }} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="email" className="form-control" onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="Email" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <input type="text" name="phone" className="form-control" onChange={(e) => { this.setState({ phone: e.target.value }) }} placeholder="Phone" />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input type="password" name="password" className="form-control" onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Password" />
                                </div>

                            </div>
                            <button type="submit" className='btn btn-primary'>Submit</button>
                        </form>
                    </div>
                </div>
            </>
        )
    }
}



const Navigate = (props) => {
    let navigate = useNavigate();
    return (
        <div>
            <AddContact {...props} navigate={navigate} />
        </div>
    );
};

export default Navigate;