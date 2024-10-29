
import { Link } from 'react-router-dom'; 
import './Checkout.css';
import { useEffect, useState } from 'react';


const Checkout = () => {
    const [cartItems, setCartItems] = useState([]); // Cart items   
    const [formData, setFormData] = useState({
        name: '',
        cardNumber: '',
        ccv: '',
        expiryDate: '',
        email: '',
        phone: '',
    });

    // Function to retrieve cart items from localStorage
    const getCartItems = () => {
        const items = localStorage.getItem('cartItems');
        return items ? JSON.parse(items) : [];
    };

    useEffect(() => {
        const items = getCartItems();
        setCartItems(items);
    }, []);

    // Function to handle form changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Function to handle "Checkout" button
    const handleCheckout = () => {
        alert("Thank you for your puurrrchase! Click Home to return to the homepage! ");
       
    };


    // Function to handle "Home" button click (clear cart and form)
    const handleHomeClick = () => {
        localStorage.removeItem('cartItems'); // Clear cart items from localStorage
        setCartItems([]); // Clear cart 
        setFormData({ // Reset 
            name: '',
            cardNumber: '',
            ccv: '',
            expiryDate: '',
            email: '',
            phone: '',
        });
    };

     // Function to remove an item from the cart
    const handleRemoveItem = (indexToRemove) => {
        const updatedCartItems = cartItems.filter((_, index) => index !== indexToRemove);
        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    //Home button sends you back to main page and clears cart and form
    return (
        <div class="checkout-page"> {/* Added a wrapper class */}
            <div class="header">
                <Link to="/" onClick={handleHomeClick}> {/* Links Home button to the main App.jsx page. */}
                    <button class="home-button Text-style">Home</button>
                </Link>
            </div>

            <h2 class="Text-style">Checkout</h2>
            <div class="cart">
                {cartItems.length > 0 ? (
                    cartItems.map((cat, index) => (
                        <div key={index} class="cart-item">

                            <img src={cat.url} alt={cat.CatName} />
                            <div>
                                <h3>{cat.CatName}</h3>
                                <p>Price: ${cat.CatPrice}</p>

                                <button class="button-style Text-style" onClick={() => handleRemoveItem(index)}>Remove From Cart</button>

                            </div>
                        </div>
                    ))
                ) : (

                    <p class="Text-style">Your cart is empty!</p>
                )}
            </div>
            {/* Form For user details to be filled in to complete purchase */}
            <div class="total">
                <h3 class="Text-style">Total: ${cartItems.reduce((total, cat) => total + parseFloat(cat.CatPrice), 0).toFixed(2)}</h3>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }}>
                <div class="form-group">
                    <label class="Text-style">Full Name:</label>
                    <input class="form-labels" type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div class="form-group">
                    <label class="Text-style">Long Card Number:</label>
                    <input class="form-labels" type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                </div>
                <div class="form-group">
                    <label class="Text-style">CCV:</label>
                    <input class="form-labels" type="text" name="ccv" value={formData.ccv} onChange={handleChange} required />
                </div>
                <div class="form-group">
                    <label class="Text-style">Expiry Date (MM/YY):</label>
                    <input class="form-labels" type="text" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
                </div>
                <div class="form-group">
                    <label class="Text-style">Email:</label>
                    <input class="form-labels" type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div class="form-group">
                    <label class="Text-style">Phone Number:</label>
                    <input class="form-labels" type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <button class="button-style2 Text-style" submit>Checkout</button>
            </form>
        </div>
        
    );
};

export default Checkout;

