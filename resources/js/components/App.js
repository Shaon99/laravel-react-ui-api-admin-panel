import React from 'react';
import ReactDOM from 'react-dom';
import Contact from '../components/Contact';
import AddContact from '../components/AddContact';
import EditContact from '../components/EditContact';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

function App() {
    const isLoggedIn = localStorage.getItem("token");
   
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={isLoggedIn ?  <Navigate to="/contact" /> : <Login />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/add-contact" element={<AddContact />} />
                        <Route path="/edit-contact/:id" element={<EditContact />} />
                    </Route>

                </Routes>
            </Router>

        </>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
