import React from 'react';
import Banner from '../Components/Banner/Banner';
import InfoCards from '../Components/InfoCards/InfoCards';

const Home = () => {
    return (
        <>
            <div className='mb-10'>
                <Banner />
            </div>
            <div className='max-w-7xl min-h-[100vh] mx-auto flex flex-col gap-10 '>
                <InfoCards />
            </div>
        </>
    );
};

export default Home;