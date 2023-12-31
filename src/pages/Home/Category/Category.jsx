import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Category.css'

import categoryImg1 from '../../../assets/home/slide1.jpg'
import categoryImg2 from '../../../assets/home/slide2.jpg'
import categoryImg3 from '../../../assets/home/slide3.jpg'
import categoryImg4 from '../../../assets/home/slide4.jpg'
import categoryImg5 from '../../../assets/home/slide5.jpg'
import SectionTitle from '../../../components/SectionTitle/SectionTitle';


const Category = () => {

    return (
        <section>
            <SectionTitle
                subHeading={'---From 11:00am to 10:00pm---'} Heading={'ORDER ONLINE'}
            ></SectionTitle>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper mb-14"
            >
                <SwiperSlide>
                    <img src={categoryImg1} alt="" className='' />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Salad</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={categoryImg2} alt="" />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Pizza</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={categoryImg3} alt="" />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Soup</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={categoryImg4} alt="" />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Desart</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img src={categoryImg5} alt="" />
                    <h3 className='text-3xl uppercase text-center -mt-16 text-white'>Salad</h3>
                </SwiperSlide>

            </Swiper>
        </section>
    );
};

export default Category;