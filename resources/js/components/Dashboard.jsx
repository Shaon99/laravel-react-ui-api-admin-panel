import React, { useEffect, useState } from 'react'
import Nav from "../components/Nav"


export default function Dashboard() {

    const [contact, getContact] = useState('')
    const [product, getProduct] = useState('')


    const getData = async () => {
        await axios.get("/api/dashboard", {
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((result) => {
            getContact(result.data.contact);
            getProduct(result.data.product);
        }).catch((err) => {
            console.log(err);
        });
    }
    useEffect(() => {        
        getData()        
    }, [])

    return (
        <>
            <Nav />
            <div className='px-4'>
                <div className='card shadow p-3'>
                    <div className='d-flex justify-content-between'>
                        <h2>Dashboard</h2>
                    </div>
                </div>

                <div className='row p-4'>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card  p-4 bg-primary">
                            <h4 className='text-light'>Total Contact</h4>
                            <h3 className='text-light'>{contact}</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card  p-4 bg-success">
                            <h4 className='text-light'>Total Product</h4>
                            <h3 className='text-light'>{product}</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card  p-4 bg-danger">
                            <h4 className='text-light'>Total Contact</h4>
                            <h3 className='text-light'>50</h3>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <div className="card  p-4 bg-warning">
                            <h4 className='text-light'>Total Contact</h4>
                            <h3 className='text-light'>50</h3>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
