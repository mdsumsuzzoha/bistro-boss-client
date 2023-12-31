import PropTypes from 'prop-types';

const SectionTitle = ({ Heading, subHeading, }) => {
    return (
        <div className='text-center w-3/12 mx-auto my-6 space-y-4'>
            <p className='text-lg text-yellow-400'>{subHeading}</p>
            <h2 className='text-4xl uppercase border-y-4 py-4'>{Heading}</h2>
        </div>
    );
};
SectionTitle.propTypes = {
    Heading: PropTypes.string,
    subHeading: PropTypes.string
};

export default SectionTitle;