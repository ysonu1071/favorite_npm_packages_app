import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import loadingImg from "../photos/loadinggif.gif"
import bgImage2 from "../photos/background-image-4.png"
import Navbar from './Navbar'
import Footer from './Footer'



function AddFavorite() {
    const [searchValue, setSearchValue] = useState('reactjs');
    const [whyFav, setWhyFav] = useState("");
    const [selectedPackage, setSelectedPackage] = useState('');
    const [searchedData, setSearchedData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isPackageSelected, setIsPackageSelected] = useState(true);
    const [isWhyWritten, setIsWhyWritten] = useState(true);

    const navigate = useNavigate();


    const handleSelectPackage = (packageName) => {
        setSelectedPackage(packageName);
    }

    const handleSubmit = () => {
        if (selectedPackage === "") {
            setIsPackageSelected(false);
            return;
        } else {
            setIsPackageSelected(true);
        }

        if (whyFav === "") {
            setIsWhyWritten(false);
            return;
        } else {
            setIsWhyWritten(true);
        }

        if (localStorage.getItem("favPackages")) {
            let favPackages = JSON.parse(localStorage.getItem("favPackages"));
            let check = favPackages.some((item) => item.name === selectedPackage)
            if (check) {
                toast("This package allready exist in your fav list")
                return;
            } else {
                let obj = { name: selectedPackage, reason: whyFav };
                favPackages.push(obj);
                localStorage.setItem("favPackages", JSON.stringify(favPackages));
                navigate("/")
            }
        } else {
            let obj = { name: selectedPackage, reason: whyFav };
            let favPackages = [];
            favPackages.push(obj);
            localStorage.setItem("favPackages", JSON.stringify(favPackages));
            navigate("/");
        }
    }

    useEffect(() => {
        setIsLoading(true)
        if (searchValue === '') {
            setIsEmpty(true);
            return;
        } else {
            setIsEmpty(false);
        }
        fetch(`https://api.npms.io/v2/search?q=${searchValue}`)
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                console.log(result.results)
                setSearchedData(result.results);
                setIsLoading(false)
            })
            .catch((error) => {
                console.log(error.message);
            })
    }, [searchValue]);

    return (
        <div style={{ "backgroundImage": `url(${bgImage2})` }} className='w-screen h-screen bg-cover bg-center bg-opacity-20'>
            <div><Toaster /></div>
            <Navbar />
            <main className='w-full h-[87.7vh] px-3 md:px-20 flex justify-center flex-col items-center bg-teal-500 bg-opacity-80'>
                <div className='w-full md:w-[700px] mt-8'>
                    <p className='font-bold text-gray-900'>Search for NPM Package</p>
                    <input type="text" value={searchValue} className='w-full px-3 py-1 border-2 border-gray-300 focus:border-gray-400 outline-none rounded' placeholder='angular' onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                <p className='w-full md:w-[700px] text-sm my-4 font-bold text-gray-800'>Results</p>
                <div className='w-full md:w-[700px] h-[200px] px-3 border-2 border-gray-300 overflow-auto rounded'>
                    {!isEmpty ? !isLoading ? searchedData !== undefined ? <ul>
                        {searchedData.map((data, index) => <li key={index}><input type="radio" name='npm package' onClick={() => handleSelectPackage(data.package.name)} /> <span>{data.package.name}</span></li>)}
                    </ul> : <p className='w-full text-center mt-[50px] md:leading-[190px] md:mt-0'>Could not fetch data due to internal server error!. Try again after some time.</p> : <img src={loadingImg} alt="loading" className='w-[240px] h-[150px] md:w-[300px] md:h-[195px] m-auto' /> : <p className='w-full text-center leading-[190px]'>Type something in search box to search.</p>}
                </div>
                {!isPackageSelected && <div className='text-red-600 font-bold w-[700px] text-left'>Please select Package Name</div>}
                <div className='w-full md:w-[700px] h-[180px] mt-4 flex flex-col relative'>
                    <p className='text-sm font-bold text-gray-900'>Why this is your fav?</p>
                    <textarea value={whyFav} className='w-full h-[100px] px-3 border-2 border-gray-300 rounded outline-none focus:border-gray-400' onChange={(e) => setWhyFav(e.target.value)}></textarea>
                    {!isWhyWritten && <div className='text-red-600 font-bold w-[700px] text-left'>Please write, why this is your favorite?</div>}

                    <button className='w-[80px] px-2 py-1 bg-blue-700 text-white absolute right-0 bottom-0 rounded hover:bg-blue-800' onClick={handleSubmit}>Submit</button>
                </div>
            </main>
            <Footer/>
        </div>
    )
}

export default AddFavorite