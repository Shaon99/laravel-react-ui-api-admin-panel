import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Nav from './Nav';
import DeleteConfirmation from './Modal';

export default function Product() {

  const [products, setproducts] = useState([]);
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

  //get products
  useEffect(() => {
    getProduct();
  }, [])

  const getProduct = async () => {
    await axios.get("api/product", {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then((result) => {
      setproducts(result.data.products);
    }).catch((err) => {
      console.log(err);
    });
  }
  //end get product

  // Handle the displaying of the modal based on type and id
  const showDeleteModal = (id) => {
    setId(id);
    setDeleteMessage('Are you sure you want to delete this item?');
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item logic
  const submitDelete = async (id) => {
    await axios.delete("/api/product/" + id, {
      headers: {
        "Accept": 'application/json',
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      }
    }).then((result) => {
      getProduct();
      toast.success(result.data.message, { autoClose: 2000, theme: 'dark' });
      setDisplayConfirmationModal(false);
    }).catch((err) => {
    });
  };


  return (
    <>
      <Nav />
      <div className='px-4'>
        <div className='card shadow p-3'>
          <div className='d-flex justify-content-between'>
            <h2>All Product</h2>
            <p><Link to="/add-product" className='text-decoration-none'>Add Product</Link></p>
          </div>
        </div>
        <div className='table-responsive mt-3'>
          <table className="table  table-border">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Picture</th>
                <th scope="col">Product Name</th>
                <th scope="col">Product SKU</th>
                <th scope="col">Available Stock Quantity</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td><img className="rounded img-fluid" src={"uploads/user/" + product.image} width="50px" alt="img" /></td>
                    <td>{product.name}</td>
                    <td>{product.sku}</td>
                    <td>{product.qty}</td>
                    <td>{product.price}</td>
                    <td>
                      <Link to={"/edit-product/" + product.id} className='btn btn-primary mx-3'>Edit</Link>
                      <Link to="#" onClick={() => showDeleteModal(product.id)} className='btn btn-danger '>Delete</Link>
                    </td>

                  </tr>
                )
              })}

            </tbody>
          </table>
        </div>     
        <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal} id={id} message={deleteMessage} />
      </div>
    </>
  )
}
