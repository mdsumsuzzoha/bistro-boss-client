import PropTypes from 'prop-types';

const FoodCard = ({ item }) => {
    const { name, image, recipe, price } = item;

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <p className='text-sm bg-gray-700 text-white absolute right-0 mr-14 rounded-lg px-2 mt-14'>$ {price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button className="btn btn-primary">Add to cart</button>
                </div>
            </div>
        </div>
    );
};
FoodCard.propTypes = {
    item: PropTypes.object
};
export default FoodCard;