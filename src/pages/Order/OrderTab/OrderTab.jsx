import FoodCard from "../../../components/FoodCard/FoodCard";
import PropTypes from 'prop-types';


const OrderTab = ({ items }) => {
    // console.log(items);
    return (
        <div className="grid md:grid-cols-3 gap-10 w-[1320px] mx-auto">
            {items.map(item => <FoodCard
                key={item._id}
                item={item}></FoodCard>)
            }
        </div>
    );
};
OrderTab.propTypes = {
    items: PropTypes.array
};
export default OrderTab;