import Cover from "../../Shared/Cover/Cover";
import Navbar from "../../Shared/Navbar/Navbar";
import { Helmet } from 'react-helmet-async';
import bgImg from '../../../assets/menu/banner3.jpg'
import PopularMenu from "../../Home/PopularMenu/PopularMenu";


const Menu = () => {
    return (
        <>
            <Helmet>
                <title>Bostro Boss Menu</title>
                <link rel="canonical" href="https://www.tacobell.com/" />
            </Helmet>
            <Navbar></Navbar>
            <Cover bgImg={bgImg} title={'Our Menu'} details={'Would you like to try a dish?'}></Cover>
            <PopularMenu></PopularMenu>
            <Cover bgImg={bgImg} title={'Our Menu'} details={'Would you like to try a dish?'}></Cover>
            <PopularMenu></PopularMenu>
            <Cover bgImg={bgImg} title={'Our Menu'} details={'Would you like to try a dish?'}></Cover>
            <PopularMenu></PopularMenu>
        </>
    );
};
 
export default Menu;