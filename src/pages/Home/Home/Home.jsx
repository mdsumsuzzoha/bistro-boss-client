import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testionials from "../Testimonials/Testionials";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const Home = () => {
    return (
        <div className="">
            <Helmet>
                <title>Bostro Boss Home</title>
                <link rel="canonical" href="" />
            </Helmet>
            <Navbar></Navbar>
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testionials></Testionials>
            <Footer></Footer>
        </div>
    );
};

export default Home;