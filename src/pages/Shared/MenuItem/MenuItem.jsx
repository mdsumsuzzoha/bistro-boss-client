import PropTypes from 'prop-types';

const MenuItem = ({item}) => {
    const {name,image, recipe,price}= item;
    return (
        <div className='flex space-x-4'>
            <img className='w-[120px] h-[100px] border rounded-r-full rounded-b-full'  src={image} alt="" />
            <div>
                <h3 className='uppercase'>{name}------------</h3>
                <p>{recipe}</p>
            </div>
            <p className='text-yellow-400'>${price}</p>
            
        </div>
    );
};
MenuItem.propTypes = {
    item: PropTypes.object
  };
export default MenuItem;