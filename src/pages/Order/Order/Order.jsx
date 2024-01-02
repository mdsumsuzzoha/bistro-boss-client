import Cover from "../../Shared/Cover/Cover";
// import Navbar from "../../Shared/Navbar/Navbar";
// import Footer from "../../Shared/Footer/Footer";
import bgImg from "../../../assets/shop/banner2.jpg";
import { Helmet } from "react-helmet-async";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";

const Order = () => {
    const categories = ['Salad', 'Soup', 'Pizza', 'Dessert', 'Drinks']
    const { category } = useParams();
    const initialIndex = categories.findIndex(item => item.toLowerCase() === category.toLowerCase());
    const [tabIndex, setTabIndex] = useState(initialIndex);
    const [menu] = useMenu(); // use custom hook to load menu data

    // const offerItems = menu.filter(item => item.category == 'offered'); //show it with filtered items by offered Items..
    
    const saladItems = menu.filter(item => item.category == 'salad');
    // console.log(saladItems);
    const dessertItems = menu.filter(item => item.category == 'dessert');
    const pizzaItems = menu.filter(item => item.category == 'pizza');
    const soupItems = menu.filter(item => item.category == 'soup');
    const drinksItems = menu.filter(item => item.category == 'drinks');

    return (
        <>
            <Helmet>
                <title>Bostro Boss Order</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            {/* <Navbar></Navbar> */}
            <Cover bgImg={bgImg} title={"OUR SHOP"} details={'Would you like to try a dish?'}></Cover>

            <section className="w-full mx-auto my-24 text-center text-2xl">
                <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList>
                        <Tab>Salad</Tab>
                        <Tab>Soup</Tab>
                        <Tab>Pizza</Tab>
                        <Tab>Dessert</Tab>
                        <Tab>Drinks</Tab>
                    </TabList>
                    <TabPanel >
                        <OrderTab items={saladItems}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={soupItems}></OrderTab>
                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={pizzaItems}></OrderTab>

                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={dessertItems}></OrderTab>

                    </TabPanel>
                    <TabPanel>
                        <OrderTab items={drinksItems}></OrderTab>

                    </TabPanel>
                </Tabs>
            </section>

            {/* <Footer></Footer> */}

        </>
    );
};

export default Order;