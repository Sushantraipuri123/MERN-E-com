import axios from "axios";
import React, { useEffect, useState } from "react";

function AllProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Define the headers
        const headers = {
            'Content-Type': 'application/json',
        };

        // Fetch products with headers
        axios.get('http://localhost:9001/products/allProducts', { headers })
            .then(response => {
                // Log the fetched data to the console
                console.log(response.data);

                // Store the fetched products in state
                setProducts(response.data.body); // Access the 'body' array
            })
            .catch(error => {
                console.error("There was an error fetching the products!", error);
            });
    }, []);

    return (
        <>
            <div className="container-fluid  mt-5 pt-4 mb-5 pb-3">
                <h1 className="text-center mt-5">All Products</h1>
                {/* Render all products */}
                <div className="row mt-4 mx-4 justify-content-center">
                    {products.map(product => (
                        <div key={product._id} className="col-md-3">
                        <div className="card mb-4">
                            <div style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                                <img src={product.productImage} className="card-img-top" alt={product.productName} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center text-bold">{product.productName}</h5>
                                <p className="card-text text-center">
                                    {product.productDiscountPrice > 0 ? (
                                        <>
                                            <span style={{ textDecoration: 'line-through', marginRight: '8px' }}>
                                                <strong>Rs</strong> {product.productOriginalPrice}
                                            </span>
                                            <span>
                                                <strong>Rs</strong> {product.productDiscountPrice}
                                            </span>
                                        </>
                                    ) : (
                                        <span className=""><strong>Rs</strong> {product.productOriginalPrice}</span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    ))}
                </div>
            </div>
        </>
    );
}

export default AllProducts;
