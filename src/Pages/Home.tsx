import React from 'react';
import Banner from '../Components/Banner/Banner';
import InfoCards from '../Components/InfoCards/InfoCards';
import FeaturedBicycles from '../Components/FeaturedBicycles/FeaturedBicycles';

const Home = () => {
    return (
        <>
            <div className='mb-10'>
                <Banner />
            </div>
            <div className=' md:px-0 px-5 max-w-7xl min-h-[100vh] mx-auto flex flex-col gap-10 '>
                <InfoCards />
                <FeaturedBicycles />
            </div>
        </>
    );
};

export default Home;