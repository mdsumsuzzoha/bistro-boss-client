import { Link } from "react-router-dom";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import PropTypes from 'prop-types';


const MenuCategory = ({ items, title }) => {
    // console.log(items);
    return (
        <div>
            <div className="w-[1320px] mx-auto space-y-12 mb-24 mt-10">
                <div className="grid md:grid-cols-2 gap-4">
                    {items.map(item => <MenuItem key={item._id} item={item}></MenuItem>)}
                </div>
                <div className="text-center">
                    <Link to={`/order/${title}`}><button className="btn btn-outline border-0 border-b-4 uppercase w-max">ORDER YOUR FAVOURITe {title} FOOD</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
MenuCategory.propTypes = {
    // bgImg: PropTypes.string,
    title: PropTypes.string,
    items: PropTypes.array,
};
export default MenuCategory;