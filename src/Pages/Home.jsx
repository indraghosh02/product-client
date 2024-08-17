
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

//ph
// import React, { useEffect, useState } from 'react';
// import Card from './Components/Card';
// import { useLoaderData } from 'react-router-dom';
// import './Home.css'

// const Home = () => {
//     const [allProducts, setAllProducts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [sortOption, setSortOption] = useState('');
//     const [brandFilter, setBrandFilter] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');

//     //new
//     const [ itemsPerPage, setItemsPerPage ] =  useState([10]);
//     const [ currentPage, setCurrentPage ] = useState(0);
//     const { count } = useLoaderData();
//     //const itemsPerPage = 10;
//     const numberOfPages = Math.ceil(count / itemsPerPage);

//     const pages = []
//     for(let i = 0; i< numberOfPages; i++){
//         pages.push(i)
//     }
//     console.log(pages);

//     // const pages = [...Array(numberOfPages.keys())];




//     useEffect(() => {
//         const fetchProducts = async () => {
//             // let url = `https://product-server-kappa.vercel.app/allProducts?`;
//             let url = `https://product-server-kappa.vercel.app/allProducts?page=${currentPage}&size=${itemsPerPage}`;

//             if (sortOption) {
//                 url += `sort=${sortOption}&`;
//             }
//             if (brandFilter) {
//                 url += `brandname=${brandFilter}&`;
//             }
//             if (categoryFilter) {
//                 url += `category=${categoryFilter}&`;
//             }
//             if (minPrice) {
//                 url += `minPrice=${minPrice}&`;
//             }
//             if (maxPrice) {
//                 url += `maxPrice=${maxPrice}&`;
//             }

//             const res = await fetch(url);
//             const data = await res.json();
//             setAllProducts(data);
//             setFilteredProducts(data);
//         };

//         fetchProducts();
//     }, [sortOption, brandFilter, categoryFilter, minPrice, maxPrice, currentPage]);

//     useEffect(() => {
//         const filtered = allProducts.filter(product =>
//             product.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setFilteredProducts(filtered);
//     }, [searchQuery, allProducts]);



//     //new
//     const handleItemsPerPage = e =>{
       
//         const val = parseInt(e.target.value);
//         console.log(val);
//         setItemsPerPage(val);
//         setCurrentPage(0);

//     }
//     const handlePreviousPage = () =>{
//         if(currentPage > 0 ){
//             setCurrentPage(currentPage - 1);
//         }
//     }
//     const handleNextPage = () =>{
//         if(currentPage < pages.length-1 ){
//             setCurrentPage(currentPage + 1);
//         }
//     }

//     return (
//         <div>
//             <div>
//                 <h3 className="md:text-5xl text-3xl mt-10 font-bold text-center font-serif mb-10">Our Products</h3>
//             </div>

//             <div className="flex flex-col md:flex-row justify-center mb-6 items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">

//                 {/* Search */}
//                 <input
//                     type="text"
//                     placeholder="Search products by product name"
//                     className="input input-bordered w-full max-w-md"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />

//                 {/* Sort */}
//                 <select
//                     className="select select-bordered w-full max-w-xs"
//                     value={sortOption}
//                     onChange={(e) => setSortOption(e.target.value)}
//                 >
//                     <option value="">Sort by</option>
//                     <option value="priceLowToHigh">Low to High price</option>
//                     <option value="priceHighToLow">High to Low price</option>
//                     <option value="newestFirst">Newest Added products to oldest added products</option>
//                 </select>
//             </div>

//             {/* Filter options */}
//             <div className="flex flex-col md:flex-row justify-center mb-6 items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
//                 <h2 className='font-bold font-serif text-slate-600'>Categorize products:</h2>
//                 {/* Brand Filter */}
//                 <input
//                     type="text"
//                     placeholder="Filter by brand"
//                     className="input input-bordered w-full max-w-xs"
//                     value={brandFilter}
//                     onChange={(e) => setBrandFilter(e.target.value)}
//                 />

//                 {/* Category Filter */}
//                 <input
//                     type="text"
//                     placeholder="Filter by category"
//                     className="input input-bordered w-full max-w-xs"
//                     value={categoryFilter}
//                     onChange={(e) => setCategoryFilter(e.target.value)}
//                 />

//                 {/* Price Range Filter */}
//                 <div className="flex space-x-4">
//                     <input
//                         type="number"
//                         placeholder="Min Price"
//                         className="input input-bordered w-full max-w-xs"
//                         value={minPrice}
//                         onChange={(e) => setMinPrice(e.target.value)}
//                     />
//                     <input
//                         type="number"
//                         placeholder="Max Price"
//                         className="input input-bordered w-full max-w-xs"
//                         value={maxPrice}
//                         onChange={(e) => setMaxPrice(e.target.value)}
//                     />
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:ml-20 ml-10 mb-10">
//                 {filteredProducts.map(product => (
//                     <Card key={product._id} product={product}></Card>
//                 ))}
//             </div>


//             <div className='pagination'> 
//                 <p>Page No: {currentPage}</p>
//                 <button onClick={handlePreviousPage} className='btn bg-yellow-500'>Previous</button>
//                 {
//                      pages.map(page => <button
//                         className={`btn ${currentPage === page ? 'selected' : ''}`}
//                         onClick={() => setCurrentPage(page)}
//                         key={page}>
//                              {page}</button>)
//                 }
//                  <button onClick={handleNextPage} className='btn bg-green-700 text-white'>Next</button>
//                 <select value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                     <option value="30">30</option>
//                     <option value="40">40</option>
//                 </select>
                   
                
//             </div>
//         </div>
//     );
// };

// export default Home;







//gpt
// import React, { useEffect, useState } from 'react';
// import Card from './Components/Card';

// const Home = () => {
//     const [allProducts, setAllProducts] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     const [sortOption, setSortOption] = useState('');
//     const [brandFilter, setBrandFilter] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('');
//     const [minPrice, setMinPrice] = useState('');
//     const [maxPrice, setMaxPrice] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             let url = `https://product-server-kappa.vercel.app/allProducts?page=${currentPage}&limit=10&`;

//             if (sortOption) {
//                 url += `sort=${sortOption}&`;
//             }
//             if (brandFilter) {
//                 url += `brandname=${brandFilter}&`;
//             }
//             if (categoryFilter) {
//                 url += `category=${categoryFilter}&`;
//             }
//             if (minPrice) {
//                 url += `minPrice=${minPrice}&`;
//             }
//             if (maxPrice) {
//                 url += `maxPrice=${maxPrice}&`;
//             }

//             const res = await fetch(url);
//             const data = await res.json();
//             setAllProducts(data.products);
//             setFilteredProducts(data.products);
//             setTotalPages(data.totalPages);
//         };

//         fetchProducts();
//     }, [sortOption, brandFilter, categoryFilter, minPrice, maxPrice, currentPage]);

//     useEffect(() => {
//         const filtered = allProducts.filter(product =>
//             product.name.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setFilteredProducts(filtered);
//     }, [searchQuery, allProducts]);

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     return (
//         <div>
//             <div>
//                 <h3 className="md:text-5xl text-3xl mt-10 font-bold text-center font-serif mb-10">Our Products</h3>
//             </div>

//             <div className="flex flex-col md:flex-row justify-center mb-6 items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
//                 {/* Search */}
//                 <input
//                     type="text"
//                     placeholder="Search products by product name"
//                     className="input input-bordered w-full max-w-md"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />

//                 {/* Sort */}
//                 <select
//                     className="select select-bordered w-full max-w-xs"
//                     value={sortOption}
//                     onChange={(e) => setSortOption(e.target.value)}
//                 >
//                     <option value="">Sort by</option>
//                     <option value="priceLowToHigh">Low to High price</option>
//                     <option value="priceHighToLow">High to Low price</option>
//                     <option value="newestFirst">Newest Added products to oldest added products</option>
//                 </select>
//             </div>

//             {/* Filter options */}
//             <div className="flex flex-col md:flex-row justify-center mb-6 items-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
//                 <h2 className='font-bold font-serif text-slate-600'>Categorize products:</h2>
//                 {/* Brand Filter */}
//                 <input
//                     type="text"
//                     placeholder="Filter by brand"
//                     className="input input-bordered w-full max-w-xs"
//                     value={brandFilter}
//                     onChange={(e) => setBrandFilter(e.target.value)}
//                 />

//                 {/* Category Filter */}
//                 <input
//                     type="text"
//                     placeholder="Filter by category"
//                     className="input input-bordered w-full max-w-xs"
//                     value={categoryFilter}
//                     onChange={(e) => setCategoryFilter(e.target.value)}
//                 />

//                 {/* Price Range Filter */}
//                 <div className="flex space-x-4">
//                     <input
//                         type="number"
//                         placeholder="Min Price"
//                         className="input input-bordered w-full max-w-xs"
//                         value={minPrice}
//                         onChange={(e) => setMinPrice(e.target.value)}
//                     />
//                     <input
//                         type="number"
//                         placeholder="Max Price"
//                         className="input input-bordered w-full max-w-xs"
//                         value={maxPrice}
//                         onChange={(e) => setMaxPrice(e.target.value)}
//                     />
//                 </div>
//             </div>

//             {/* Product Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:ml-20 ml-10 mb-10">
//                 {filteredProducts.map(product => (
//                     <Card key={product._id} product={product}></Card>
//                 ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex justify-center mb-10">
//                 <button
//                     className="btn btn-outline"
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </button>
//                 <div className="mx-4">
//                     Page {currentPage} of {totalPages}
//                 </div>
//                 <button
//                     className="btn btn-outline"
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default Home;
