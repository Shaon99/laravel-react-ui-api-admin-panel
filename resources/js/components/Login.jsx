import React, { Component } from 'react';
import '../components/style.css';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

class Login extends Component {

  state={
    email:"",
    password:"",
  }



  formsubmit = (e)=>{

    e.preventDefault(); 

    axios.get('/sanctum/csrf-cookie').then(() => {

      const payload={
        email:this.state.email,
        password:this.state.password
      }   
            axios.post('/api/login', payload, {headers: { 'Accept': 'application/json' } }).then(response => {
              localStorage.setItem('token',response.data.token);            
              localStorage.setItem('user',JSON.stringify(response.data.user));            

              if(localStorage.getItem('token')){
                  toast.success('Login Success',{autoClose: 2000,theme: 'dark'}); 
                  this.props.navigate('/contact');
              }
             
            }).catch(error => {
              if(error.response) {
                if (error.response.data.message) {
                  toast.error(error.response.data.message,{autoClose: 2000,theme: 'dark'}); 
                }

                if (error.response.data.errors) {
                  toast.error(error.response.data.errors,{autoClose: 2000,theme: 'dark'}); 
                }
            }
                   
            });
        });
    };





  render() {
    return (
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                <div className="card-body text-center">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-3">Please enter your email and password!</p>

                  <form onSubmit={this.formsubmit}>
                    <div className="form-outline form-white mb-4">
                      <label className="form-label">Email</label>
                      <input type="email" onChange={(e)=>{this.setState({email:e.target.value})}} className="form-control form-control-lg" placeholder="email" />
                    </div>

                    <div className="form-outline form-white mb-2 ">
                      <label className="form-label">Password</label>
                      <input type="password" onChange={(e)=>{this.setState({password:e.target.value})}} className="form-control form-control-lg" placeholder="password" />
                    </div>

                    <p className="small mb-4 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a>
                    </p>


                    <button className="btn btn-outline-light btn-lg px-5 mb-3" type="submit">Login</button>
                  </form>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

const Navigate = (props) => {
  let navigate = useNavigate();
  return (
      <div>
          <Login {...props} navigate={navigate} />
      </div>
  );
};

export default Navigate;