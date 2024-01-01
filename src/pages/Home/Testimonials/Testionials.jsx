import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { useEffect, useState } from "react";
import { Rating } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const Testionials = () => {
    const [review, setReview] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/review')
            .then(res => res.json())
            .then(data => setReview(data))
    }, [])

    return (
        <section className="pb-20" >
            <SectionTitle subHeading={'---What Our Clients Say---'} Heading={'TESTIMONIALS'}></SectionTitle>
            <div className="w-[678px]  mx-auto">
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper ">
                    {review.map(item => <SwiperSlide
                        key={item._id}
                    >
                        <div className="m-24 flex flex-col items-center space-y-6 ">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={item.rating}
                                readOnly
                            />
                            <p>{item.details}</p>
                            <h3 className="text-4xl text-yellow-400">{item.name}</h3>
                        </div>

                    </SwiperSlide>
                    )}


                </Swiper></div>

        </section>
    );
};

export default Testionials;