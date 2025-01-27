 
import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar/Sidebar';

const DashboardLayout = () => {
    return (
        <>

            <div className="flex ">
                <div className='md:w-[220px]'>
                    <Sidebar />
                </div>
                <main className="flex justify-center w-[100%] md:ml-20"><Outlet /></main>
            </div>

        </>
    );
};

export default DashboardLayout;