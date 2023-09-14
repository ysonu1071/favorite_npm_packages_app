import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';

function EditModel({ data, handleCloeEditModel, handleRefresh }) {
    const [whyFav, setWhyFav] = useState(data.reason);
    const [showError, setShowError] = useState(false);


    const handleUpdate = () => {
        if (whyFav === "") {
            setShowError(true);
            return;
        } else {
            setShowError(false)
        }

        if (localStorage.getItem("favPackages")) {
            const favPackages = JSON.parse(localStorage.getItem("favPackages"));

            let temp = [];
            for (let obj of favPackages) {
                if (obj.name === data.name) {
                    obj.reason = whyFav;
                }
                temp.push(obj);
            }

            localStorage.setItem("favPackages", JSON.stringify(temp));
            handleRefresh();
            toast.success("Updated successfully")
        }
    }

    return (
        <div className='w-screen h-screen bg-[#04101e] absolute top-0 left-0 bg-opacity-80 flex justify-center items-center'>
            <div><Toaster /></div>
            <div className='w-[90vw] md:w-[500px] h-[300px] bg-gray-200 rounded p-3 overflow-hidden relative'>
                <p className='font-bold'>Package Name:</p>
                <p>{data.name}</p>
                <p className='font-bold'>Reason of Favorite:</p>
                <textarea className='w-full h-[100px] px-3 rounded outline-none focus:border-2 focus:border-gray-300' value={whyFav} onChange={(e) => setWhyFav(e.target.value)}></textarea>
                <button className='w-[80px] px-2 py-1 bg-blue-700 text-white absolute right-3 bottom-4 rounded hover:bg-blue-800' onClick={handleUpdate}>Update</button>
                {showError && <div className='text-red-600 font-bold w-[700px] text-left'>Please write, why this is your favorite?</div>}
                <CloseIcon className="absolute top-1 right-1 cursor-pointer hover:bg-gray-300 rounded" onClick={handleCloeEditModel} />
            </div>
        </div>
    )
}

export default EditModel