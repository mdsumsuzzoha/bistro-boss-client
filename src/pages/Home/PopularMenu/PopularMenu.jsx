import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";

const PopularMenu = () => {
    const [menu] = useMenu(); // use custom hook to load menu data
    const popularItems = menu.filter(item => item.category == 'popular'); //show it with filtered items..

    return (
        <section className="mb-20">
            <SectionTitle subHeading={'---Check it out---'} Heading={'FROM OUR MENU'}
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-4">
                {popularItems.map(item => <MenuItem key={item._id} item={item}></MenuItem>)}
            </div>

        </section>
    );
};

export default PopularMenu;