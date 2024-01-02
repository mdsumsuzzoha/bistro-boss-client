import Cover from "../../Shared/Cover/Cover";
// import Navbar from "../../Shared/Navbar/Navbar";
// import Footer from "../../Shared/Footer/Footer";
import { Helmet } from 'react-helmet-async';
import bgImg from '../../../assets/menu/banner3.jpg'
import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import MenuCategory from "../MenuCategory/MenuCategory";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const Menu = () => {
    const [menu] = useMenu(); // use custom hook to load menu data
    const offerItems = menu.filter(item => item.category == 'offered'); //show it with filtered items by offered Items..
    const dessertItems = menu.filter(item => item.category == 'dessert');
    const pizzaItems = menu.filter(item => item.category == 'pizza');
    const saladItems = menu.filter(item => item.category == 'salad');
    const soupItems = menu.filter(item => item.category == 'soup');
    return (
        <>
            <Helmet>
                <title>Bostro Boss Menu</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            {/* <Navbar></Navbar> */}
            {/* main/offered sections */}
            <section>
                <Cover bgImg={bgImg} title={'Our Menu'} details={'Would you like to try a dish?'}></Cover>
                <div className="w-[1320px] mx-auto space-y-12 mb-24 mt-10">
                    <SectionTitle subHeading={"---Don't miss---"} Heading={"TODAY'S OFFER"}
                    ></SectionTitle>
                    <div className="grid md:grid-cols-2 gap-4">
                        {offerItems.map(item => <MenuItem key={item._id} item={item}></MenuItem>)}
                    </div>
                </div>
            </section>
            {/* dessert sections */}
            <section>
            <Cover bgImg={bgImg} title={'dessert'} ></Cover>
                <MenuCategory
                    bgImg={dessertImg}
                    items={dessertItems}
                    title={'dessert'}
                ></MenuCategory>
            </section>
            {/* pizza sections */}
            <section>
                <MenuCategory
                    bgImg={pizzaImg}
                    items={pizzaItems}
                    title={'pizza'}
                ></MenuCategory>
            </section>
            {/* salad sections */}
            <section>
                <MenuCategory
                    bgImg={saladImg}
                    items={saladItems}
                    title={'salad'}
                ></MenuCategory>
            </section>
            {/* soup sections */}
            <section>
                <MenuCategory
                    bgImg={soupImg}
                    items={soupItems}
                    title={'soup'}
                ></MenuCategory>
            </section>
            {/* <Footer></Footer> */}
        </>
    );
};

export default Menu;