// import  { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import sliderImg1 from '../../../assets/home/01.jpg'
import sliderImg2 from '../../../assets/home/02.jpg'
import sliderImg3 from '../../../assets/home/03.jpg'
import sliderImg4 from '../../../assets/home/04.jpg'
import sliderImg5 from '../../../assets/home/05.jpg'
import sliderImg6 from '../../../assets/home/06.jpg'

const Banner = () => {
    return (
        <Carousel className="text-center">
            <div>
                <img src={sliderImg1} />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src={sliderImg2} />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src={sliderImg3} />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src={sliderImg4} />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src={sliderImg5} />
                <p className="legend">Legend 3</p>
            </div>
            <div>
                <img src={sliderImg6} />
                <p className="legend">Legend 3</p>
            </div>
        </Carousel>
    );
};

export default Banner;