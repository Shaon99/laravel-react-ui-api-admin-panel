import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    const logout = async () => {
        await axios.get("api/logout", {
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((result) => {
            localStorage.clear();
            navigate('/');
        }).catch((err) => {
            console.log(err);
        });

    };

    const user= JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <Link to="#" onClick={logout} className="nav-link text-light">Logout</Link>               
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link text-light">Contact </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add-contact" className="nav-link text-light">Add Contact</Link>
                        </li>
                    </ul>
                    
                </div>
                <h3 className='text-light p-2'>Welcome {user.fname+' '+user.lname} </h3>
            </nav>

        </div>
    );
};

export default Nav;