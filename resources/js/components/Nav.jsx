import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../components/style.css';

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

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-nav">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <Link className="nav-link active text-white" to="/dashboard">Dashboard</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Contact
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item text-primary" to="/contact">Contact</Link></li>
                                    <li><Link className="dropdown-item text-primary" to="/add-contact">Add Contact</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Product
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link className="dropdown-item text-primary" to="/product">Product</Link></li>
                                    <li><Link className="dropdown-item text-primary" to="/add-product">Add Product</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-flex">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                            <li className="nav-item dropdown">
                                <Link className="nav-link dropdown-toggle text-white text-capitalize" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.fname + ' ' + user.lname}
                                </Link>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li className='text-center'><button className="btn btn-danger text-white" onClick={logout} type="submit">Logout</button>
                                    </li>

                                </ul>
                            </li>
                        </ul>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default Nav;