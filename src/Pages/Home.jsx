import React, { useEffect, useState } from 'react';
import Card from './Components/Card';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    useEffect (() =>{
        fetch('allProducts.json')
        .then(res => res.json())
        .then(data => setAllProducts(data));
    })
    return (
        <div>
            <div>
                <h3 className="md:text-5xl text-3xl mt-10  font-bold text-center  font-serif mb-10">Our Products </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  lg:ml-20 ml-10 mb-10">
                {
                    allProducts.map(product => <Card 
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