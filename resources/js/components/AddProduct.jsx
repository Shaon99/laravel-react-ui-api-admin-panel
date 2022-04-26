import React, { useState } from 'react'
import Nav from './Nav';
import { Link,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
export default function AddProduct() {

    const [name, setName] = useState('');
    const [sku, setSku] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    let navigate = useNavigate();
    const submitData = async (e)=>{
        e.preventDefault();
        var formData = new FormData();
        formData.append('name',name);
        formData.append('sku',sku);
        formData.append('quantity',quantity);
        formData.append('price',price);
        formData.append('image',image);


        await axios.post("/api/product", formData, {
            headers: {
                "Accept": 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        }).then((result) => {
            document.getElementById("formsubmit").reset();                 
            toast.success(result.data.message,{autoClose: 2000,theme: 'dark'});   
             navigate('/product');

        }).catch((error) => {
            if (error.response.data.errors.name) {
                toast.error(error.response.data.errors.name[0], { autoClose: 2000, theme: 'dark' });
            }
            if (error.response.data.errors.sku) {
                toast.error(error.response.data.errors.sku[0], { autoClose: 2000, theme: 'dark' });
            }
            if (error.response.data.errors.quantity) {
                toast.error(error.response.data.errors.quantity[0], { autoClose: 2000, theme: 'dark' });
            }
            if (error.response.data.errors.price) {
                toast.error(error.response.data.errors.price[0], { autoClose: 2000, theme: 'dark' });
            }
            if (error.response.data.errors.image) {
                toast.error(error.response.data.errors.image[0], { autoClose: 2000, theme: 'dark' });
            }
        });

    }



    return (
        <>
            <Nav />
            <div className='px-4'>
                <div className='card shadow p-3'>
                    <div className='d-flex justify-content-between'>
                        <h2>Add Product</h2>
                        <p><Link to="/product" className='text-decoration-none'>All Product</Link></p>

                    </div>
                </div>
                <div className='mt-3 card shadow p-4'>
                <form onSubmit={submitData} id="formsubmit">
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <input type="text" name="name" className="form-control" onChange={(e)=>setName(e.target.value)} placeholder="Product Name" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="sku" className="form-control" onChange={(e)=>setSku(e.target.value)} placeholder="Product SKU" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="quantity" className="form-control" onChange={(e)=>setQuantity(e.target.value)} placeholder="Product Stock Quantity" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" name="unit-price" className="form-control" onChange={(e)=>setPrice(e.target.value)} placeholder="Product Unit Price" />
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="file" name="imgae" onChange={(e)=>setImage(e.target.files[0])} className="form-control" />
                            </div>


                        </div>
                        <button type="submit" className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}
