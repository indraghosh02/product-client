
//old
import React, { useEffect, useState } from 'react';
import Card from './Components/Card';

const Home = () => {
    const [allProducts, setAllProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [sortOption, setSortOption] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            let url = `https://product-server-kappa.vercel.app/allProducts?`;

            if (sortOption) {
                url += `sort=${sortOption}&`;
            }
            if (brandFilter) {
                url += `brandname=${brandFilter}&`;
            }
            if (categoryFilter) {
                url += `category=${categoryFilter}&`;
            }
            if (minPrice) {
                url += `minPrice=${minPrice}&`;
            }
            if (maxPrice) {
                url += `maxPrice=${maxPrice}&`;
            }

            const res = await fetch(url);
            const data = await res.json();
            setAllProducts(data);
            setFilteredProducts(data);
        };

        fetchProducts();
    }, [sortOption, brandFilter, categoryFilter, minPrice, maxPrice]);

    useEffect(() => {
        const filtered = allProducts.filter(product =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, allProducts]);

    return (
        <div>
            <div>
                <h3 className="md:text-5xl text-3xl mt-10 font-bold text-center font-serif mb-10">Our Products</h3>
            </div>

            <div className="flex flex-col md:flex-row justify-center mb-6 items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">

                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products by product name"
                    className="input input-bordered w-full max-w-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                {/* Sort */}
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="">Sort by</option>
                    <option value="priceLowToHigh">Low to High price</option>
                    <option value="priceHighToLow">High to Low price</option>
                    <option value="newestFirst">Newest Added products to oldest added products</option>
                </select>
            </div>

            {/* Filter options */}
            <div className="flex flex-col md:flex-row justify-center mb-6 items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <h2 className='font-bold font-serif text-slate-600'>Categorize products:</h2>
                {/* Brand Filter */}
                <input
                    type="text"
                    placeholder="Filter by brand"
                    className="input input-bordered w-full max-w-xs"
                    value={brandFilter}
                    onChange={(e) => setBrandFilter(e.target.value)}
                />

                {/* Category Filter */}
                <input
                    type="text"
                    placeholder="Filter by category"
                    className="input input-bordered w-full max-w-xs"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                />

                {/* Price Range Filter */}
                <div className="flex space-x-4">
                    <input
                        type="number"
                        placeholder="Min Price"
                        className="input input-bordered w-full max-w-xs"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        className="input input-bordered w-full max-w-xs"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:ml-20 ml-10 mb-10">
                {filteredProducts.map(product => (
                    <Card key={product._id} product={product}></Card>
                ))}
            </div>
        </div>
    );
};

export default Home;
