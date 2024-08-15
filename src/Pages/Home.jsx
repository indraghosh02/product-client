import React, { useEffect, useState } from 'react';
import Card from './Components/Card';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/allProducts')
            .then(res => res.json())
            .then(data => {
                setAllProducts(data);
                setFilteredProducts(data); // Initially show all products
            });
    }, []);

    useEffect(() => {
        // Filter products based on search query
        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, allProducts]);

    return (
        <div>
            <div>
                <h3 className="md:text-5xl text-3xl mt-10  font-bold text-center  font-serif mb-10">Our Products </h3>
            </div>

            {/* Search input */}
            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search products by name"
                    className="input input-bordered w-full max-w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:ml-20 ml-10 mb-10">
                {
                    filteredProducts.map(product => <Card 
                    key={product._id} 
                    product={product}
                    >
                    </Card>)
                }
            </div>
        </div>
    );
};

export default Home;
