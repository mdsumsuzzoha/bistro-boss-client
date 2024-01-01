import PropTypes from 'prop-types';
import { Parallax, } from 'react-parallax';



const Cover = ({ bgImg, title, details }) => {
    return (
        <Parallax
            blur={{ min: -30, max: 30 }}
            bgImage={bgImg}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="hero h-[700px] " >
                <div className=""></div>
                <div className="hero-content text-center text-neutral-content bg-black bg-opacity-50 w-[1320px] h-[450px]">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold uppercase">{title}</h1>
                        <p className="mb-5 text-lg font-bold">{details}</p>
                    </div>
                </div>
            </div>
            <div style={{ height: '200px' }} />
        </Parallax>

    );
};
Cover.propTypes = {
    bgImg: PropTypes.string,
    title: PropTypes.string,
    details: PropTypes.string,
}
export default Cover;