import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css';

const Featured = () => {
    return (
        <section className="mb-20 h-[848px] my-auto text-white  featured-item bg-fixed w-[1920px] pt-10 ">
            <div className="bg-black bg-opacity-50 ">
                <SectionTitle subHeading={'---Check it out---'} Heading={'FROM OUR MENU'} ></SectionTitle>
                <div className="md:flex justify-center gap-10 items-center mt-20 ">
                    <div>
                        <img src={featuredImg} className="w-[648px] h-[400px]" alt="" />
                    </div>
                    <div className="w-[604px]">
                        <p>March 20, 2023</p>
                        <p className="text-lg">WHERE CAN I GET SOME?</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt sit numquam quae optio accusantium id non ipsum suscipit quod adipisci!</p>
                        <button className="btn btn-outline border-0 border-b-4">Read More</button>
                    </div>
                </div>
            </div>

        </section >
    );
};

export default Featured;