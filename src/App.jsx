import './App.css';
import { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';

import Checkout from './Checkout'; 
import { Link } from 'react-router-dom';

function App() {
    const [cat, setCats] = useState([]); // Cats list init
    const [cartItems, setCartItems] = useState([]); // Cart items


    // Fetching Data (Cat)
    async function fetchCat() {
        const res = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');
        const CatData = await res.json();
        const UpCat = CatData.map((Cat) => {
          const CatSex = faker.person.sex();
            return {
                ...Cat,
                CatBreed: faker.animal.cat(),
                CatPrice: faker.commerce.price({ min: 100, max: 1200 }),
                CatSex: CatSex,
                CatName: faker.person.firstName(CatSex),
            };
        });
        setCats(UpCat);
    }

    useEffect(() => {
        fetchCat();
        const items = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(items); // Load cart items from localStorage on mount
    }, []);


    const toggleCartItem = (cat) => {
        setCartItems((prev) => {
            const isInCart = prev.find(item => item.id === cat.id);

            const newCart = isInCart
                ? prev.filter(item => item.id !== cat.id) // Remove cat from cart
                : [...prev, cat]; // Add cat to cart


            localStorage.setItem('cartItems', JSON.stringify(newCart));
            return newCart; // Return the updated cart array
        });
    };

    const total = cartItems.reduce((total, cat) => total + parseFloat(cat.CatPrice), 0).toFixed(2);

    return (
        <div className='wrapper'>
            <div className='top' >

                <h1>Purrrrveyor of fine Cats</h1>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className="cart-total">Total: ${total}</span>
                    <Link to="/checkout">
                        <button>Checkout</button>
                    </Link>
                </div>
            </div>

            <div id="catcards">
            {cat.map((cat, index) => (
              <div id="wrapcat" key={index}>
                <img src={cat.url} alt={cat.CatName} style={{ width: '100%', height: '200px', objectFit: `cover`}} />

                <h3>{cat.CatName}</h3>
                <div id="catcard">
                <div>
                <p>Breed: {cat.CatBreed}</p>
                <p>Sex: {cat.CatSex}</p>
                <p>Price: ${cat.CatPrice}</p>
                </div>
                <button onClick={() => toggleCartItem(cat)}>
                {cartItems.find(item => item.id === cat.id) ? 'Remove from cart' : 'Add to cart!'}
                </button>
                </div>
                </div>
                ))}
            </div>
      </div>
    );
}

export default App;