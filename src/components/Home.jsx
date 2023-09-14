import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import bgImage1 from "../photos/background-image-2.jpg";
import Navbar from './Navbar'
import Footer from './Footer';
import ViewModel from './ViewModel';
import EditModel from './EditModel';
import DeleteModel from './DeleteModel';

function Home() {
    const [favItems, setFavItems] = useState([]);
    const [showViewModel, setShowViewModel] = useState(false);
    const [showEditModel, setShowEditModel] = useState(false);
    const [showDeleteModel, setShowDeleteModel] = useState(false);
    const [currentItem, setCurrentItem] = useState({})
    const [refresh, setRefresh] = useState(Date.now());

    const navigate = useNavigate();

    const handleViewModel = (data) => {
        setCurrentItem(data)
        setShowViewModel(true);
    }

    const handleCloseViewModel = () => {
        setShowViewModel(false);
    }

    const handleEditModel = (data) => {
        setCurrentItem(data);
        setShowEditModel(true);
    }

    const handleCloeEditModel = () => {
        setShowEditModel(false);
    }

    const handleDeleteModel = (data) => {
        setCurrentItem(data);
        setShowDeleteModel(true);
    }

    const handleCloseDeleteModel = () => {
        setShowDeleteModel(false);
    }

    const handleDeletePackage = (name) => {
        if (localStorage.getItem("favPackages")) {
            let favPackages = JSON.parse(localStorage.getItem("favPackages"));
            let temp = favPackages.filter((obj) => obj.name !== name);

            localStorage.setItem("favPackages", JSON.stringify(temp));
            handleRefresh();
            setShowDeleteModel(false);
            toast.success("Deleted Successfully");
        }
    }

    const handleRefresh = () => {
        setRefresh(Date.now())
    }

    useEffect(() => {
        if (localStorage.getItem("favPackages")) {
            let favPackages = JSON.parse(localStorage.getItem("favPackages"));
            console.log(favPackages)
            setFavItems(favPackages);
        }
    }, [refresh]);

    return (
        <div style={{ "backgroundImage": `url(${bgImage1})` }} className='w-screen h-screen bg-cover bg-center'>
            <div><Toaster /></div>
            <Navbar />

            <main className='w-full h-[87.7vh] px-4 md:px-20 flex justify-center items-center'>
                {favItems.length === 0 && <div className='w-[700px] '>
                    <h1 className='text-3xl mb-16 text-center text-gray-100'>Welcome to Favorite NPM Packages</h1>
                    <div className='h-[200px] md:h-[300px] border-2 border-gray-300 flex justify-center items-center flex-col rounded'>
                        <p className='text-gray-200 text-center w-[200px] md:w-full'>You don't have any favs yet. Please add.</p>
                        <button className='px-3 py-1 bg-blue-700 text-white rounded-md mt-6 hover:bg-blue-800' onClick={() => navigate("/add-favorite")}>Add Fav</button>
                    </div>
                </div>}

                {favItems.length > 0 ? <div className='w-[800px] h-[70vh]'>
                    <div className='w-full flex flex-col gap-4 md:flex-row md:gap-0 items-center justify-between'>
                        <h1 className='text-xl md:text-3xl text-center text-gray-100'>Welcome to Favorite NPM Packages</h1>
                        <button className='px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-800' onClick={() => navigate("/add-favorite")}>Add Fav</button>
                    </div>
                    <div className='w-full border-2 h-[250px] md:h-[300px] overflow-auto border-gray-300 mt-12 bg-[#04101e]'>
                        <div className='flex justify-between font-bold text-gray-200  border-b-2 border-gray-300'>
                            <p className='pl-3'>Package Name</p>
                            <p className='w-[150px] text-right md:text-center pr-3'>Action</p>
                        </div>
                        <ul className='px-3'>
                            {favItems.map((data, index) => <li className='flex justify-between py-2 text-gray-200'>
                                <p>{data.name}</p>
                                <div className='w-[100px] flex gap-3 justify-end md:gap-7  md:w-[150px] md:justify-center text-gray-200'>
                                    <Tooltip title="View" arrow>
                                        <VisibilityIcon fontSize='22px' className='cursor-pointer hover:text-white' onClick={() => handleViewModel(data)} />
                                    </Tooltip>
                                    <Tooltip title="Edit" arrow>
                                        <EditIcon fontSize='22px' className='cursor-pointer hover:text-white' onClick={() => handleEditModel(data)} />
                                    </Tooltip>
                                    <Tooltip title="Delete" arrow>
                                        <DeleteIcon fontSize='22px' className='cursor-pointer hover:text-white' onClick={() => handleDeleteModel(data)} />
                                    </Tooltip>
                                </div>
                            </li>)}
                        </ul>
                    </div>
                </div> : ""}
            </main>

            <Footer/>
            {showViewModel && <ViewModel data={currentItem} handleCloseViewModel={handleCloseViewModel} />}

            {showEditModel && <EditModel data={currentItem} handleCloeEditModel={handleCloeEditModel} handleRefresh={handleRefresh} />}

            {showDeleteModel && <DeleteModel data={currentItem} handleCloseDeleteModel={handleCloseDeleteModel} handleDeletePackage={handleDeletePackage} />}
        </div>
    )
}

export default Home