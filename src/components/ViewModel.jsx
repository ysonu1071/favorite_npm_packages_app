import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

function ViewModel({data, handleCloseViewModel}) {
  return (
    <div className='w-screen h-screen bg-[#04101e] absolute top-0 left-0 bg-opacity-80 flex justify-center items-center'>
        <div className='w-[90vw] md:w-[500px] h-[200px] bg-gray-200 rounded p-3 overflow-auto relative'>
            <p className='font-bold'>Package Name:</p>
            <p>{data.name}</p>
            <p className='font-bold'>Reason of Favorite:</p>
            <p>{data.reason}</p>

            <CloseIcon className="absolute top-1 right-1 cursor-pointer hover:bg-gray-300 rounded" onClick={handleCloseViewModel}/>
        </div>
    </div>
  )
}

export default ViewModel