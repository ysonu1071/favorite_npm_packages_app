import React from 'react'

function DeleteModel({ data, handleCloseDeleteModel, handleDeletePackage }) {

    return (
        <div className='w-screen h-screen bg-[#04101e] absolute top-0 left-0 bg-opacity-80 flex justify-center items-center'>
            <div className='w-[90vw] md:w-[500px] h-[200px] bg-gray-200 flex flex-col justify-center rounded p-3 overflow-auto relative'>
                <p className='font-bold text-center'>Are you sure you want to delete?</p>
                <p className='text-center'>{data.name}</p>
                <div className='flex justify-center gap-20 mt-8'>
                    <button className='px-3 py-1 bg-red-700 text-white rounded-md hover:bg-red-800' onClick={handleCloseDeleteModel}>Cancel</button>
                    <button className='px-3 py-1 bg-blue-700 text-white rounded-md hover:bg-blue-800' onClick={() => handleDeletePackage(data.name)}>Yes</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModel