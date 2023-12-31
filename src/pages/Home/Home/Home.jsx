import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testionials from "../Testimonials/Testionials";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <Category></Category>
            <PopularMenu></PopularMenu>
            <Featured></Featured>
            <Testionials></Testionials>
        </div>
    );
};

export default Home;