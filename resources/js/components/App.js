import React from 'react';
import ReactDOM from 'react-dom';
import Contact from './Contact';
import AddContact from './AddContact';
import EditContact from './EditContact';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from './Dashboard';
import Product from './Product';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';

function App() {
   
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={ <Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/add-contact" element={<AddContact />} />
                        <Route path="/edit-contact/:id" element={<EditContact />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route path="/edit-product/:id" element={<EditProduct />} />                    </Route>

                </Routes>
            </Router>

        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
