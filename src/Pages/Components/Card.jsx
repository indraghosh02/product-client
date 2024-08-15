

const Card = ({product}) => {

    const {name, image, brandname, description, price, category, rating, product_creation_date} = product;
    return (
        <div className="card bg-base-100 w-96 shadow-xl">
          
        <figure>
          <img
            src={image}
            alt="Shoes" />
        </figure>
        <div className="card-body">
            <h2 className="uppercase text-slate-800 font-serif text-2xl font-bold">{category}</h2>
          <h2 className="card-title">
           {name}
            <div className="badge badge-neutral">{brandname}</div>
           
          </h2>
          
          <p>{description}</p>
          <div className="flex gap-6">
          <h2 className="text-black"> <span className="font-semibold">Created on:</span> {product_creation_date} </h2>
           
            
          </div>
          <div className="card-actions justify-end">
            <div className="badge badge-success h-full  text-xl text-green">${price}</div>
            <div className="badge badge-warning h-full  text-xl">{rating}/5</div>
          </div>
        </div>
      </div>
    );
};

export default Card;