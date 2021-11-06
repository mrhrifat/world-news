import React from 'react'

const Result = props => {
    const { totalResults, currentPage, totalPages } = props
    return (
        <div className='d-flex align-items-center justify-content-between my-3'>
            <p className='text-black-50'>About {totalResults} result found</p>
            <p className='text-black-50'>{currentPage} of {totalPages} page</p>
        </div>
    )
}

export default Result
