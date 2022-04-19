import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from "../components/Nav"

toast.configure();

class EditContact extends Component {
    state = {
        fname: "",
        lname: "",
        email: "",
        phone: "",
        image: "",
    }

    notify = () => toast.success("User Updated Successfully", {
        autoClose: 2000,
        theme: 'dark',
    })

    updateContact = async (e) => {
        e.preventDefault();
        const id = this.props.params.id;
        const res = await axios.put(`/api/contact/${id}`, this.state,{
            headers: {
                "Accept":'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('token')}`             
              }
        }).then((result) => {
            this.notify();
            this.props.navigate('/contact');

        }).catch((error) => {
            if (error.response.data.errors.email) {
                toast.error(error.response.data.errors.email[0],{autoClose: 2000,theme: 'dark'});
            }
            if (error.response.data.errors.fname) {
                toast.error(error.response.data.errors.fname[0],{autoClose: 2000,theme: 'dark'});
            }
            if (error.response.data.errors.lname) {
                toast.error(error.response.data.errors.lname[0],{autoClose: 2000,theme: 'dark'});
            }
            if (error.response.data.errors.phone) {
                toast.error(error.response.data.errors.phone[0],{autoClose: 2000,theme: 'dark'});
            }
            if (error.response.data.errors.password) {
                toast.error(error.response.data.errors.password[0],{autoClose: 2000,theme: 'dark'});
            }
        });

    }

    componentDidMount = () => {
        const id = this.props.params.id
        axios.get(`/api/contact/${id}/edit`,{
            headers: {
                "Accept":'application/json',
                "Authorization" : `Bearer ${localStorage.getItem('token')}`             
              }
        }).then((result) => {
            this.setState({
                fname: result.data.users.fname,
                lname: result.data.users.lname,
                email: result.data.users.email,
                phone: result.data.users.phone,
            });

        });

    };


    render() {
        return (
            <>
                <Nav />

                <div className='container mt-5'>
                    <h1 className='text-center mb-4'>Edit Information</h1>
                    <form onSubmit={this.updateContact} id="formsubmit">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <input type="text" name="fname" value={this.state.fname}
                                    onChange={(e) => { this.setState({ fname: e.target.value }) }} className="form-control" placeholder="First name" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="lname" value={this.state.lname}
                                    className="form-control" onChange={(e) => { this.setState({ lname: e.target.value }) }} placeholder="Last name" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="file" name="image" className="form-control" onChange={(e) => { this.setState({ image: e.target.files[0] }) }} />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="email" value={this.state.email} className="form-control" onChange={(e) => { this.setState({ email: e.target.value }) }} placeholder="Email" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="phone" value={this.state.phone} className="form-control" onChange={(e) => { this.setState({ phone: e.target.value }) }} placeholder="Phone" />
                            </div>

                        </div>
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </>
        )
    }
}



const Navigate = (props) => {
    let navigate = useNavigate();
    let params = useParams();

    return (
        <div>
            <EditContact {...props} navigate={navigate} params={params} />
        </div>
    );
};

export default Navigate;