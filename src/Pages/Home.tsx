 
import {Helmet} from "react-helmet";
import Banner from '../Components/Banner/Banner';
import InfoCards from '../Components/InfoCards/InfoCards';
import FeaturedBicycles from '../Components/FeaturedBicycles/FeaturedBicycles';
import Testimonials from '../Components/Testimonials/Testimonials';
import Faq from '../Components/Faq/Faq';
  
const Home = () => {
    return (
        <>
          <Helmet>
                 <title>GearUp-Home</title>
             </Helmet>
            <div className='mb-10'>
                <Banner />
            </div>
            <div className=' md:px-0 px-5 max-w-7xl min-h-[100vh] mx-auto flex flex-col gap-10 '>
                <InfoCards />
                <FeaturedBicycles />
                <Testimonials />
                <Faq />
            </div>
        </>
    );
};

export default Home;