import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
	const  [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(()=>{
		fetch('products.json')
		.then(res => res.json())
		.then(data => setProducts(data))
	},[]);

	useEffect( () => {
		const storedCart = getStoredCart();
		// console.log(storedCart);
		const savedCart = [];
		for(const id in storedCart){
			const addedProduct = products.find(product => product.id === id);
			if(addedProduct){
				const quantity = storedCart[id];
				addedProduct.quantity = quantity;
				savedCart.push(addedProduct);
			}
		}

		console.log(savedCart);
		setCart(savedCart);
	}, [products]);

	const handleAddToCart = (product) => {
		// const newCart = [...cart, product];
		// setCart(newCart);
		// addToDb(product.id);
		const carts = [...cart];
		const a = carts.find(p=> p.id === product.id);
		
		let newCart;

		if(a){
			let q = a.quantity;
			q++;
			a.quantity = q;
		
			newCart = [...cart];
		} else{
			product.quantity =1;
			newCart = [...cart, product];
		}

			// console.log("This is repeat", a);
		
		
		setCart(newCart);
		addToDb(product.id);
	}

	return (
		<div className='shop-container'>
			<div className="products-container">
				{
					products.map(product => <Product 
						key={product.id}
						product={product}
						handleAddToCart={handleAddToCart}
						></Product>)
				}
			</div>
			<div className="cart-container">
				<Cart cart={cart}></Cart>
			</div>
		</div>
	);
};

export default Shop;