import React from 'react'
import PropTypes from 'prop-types'

const Result = props => {
    //Get props from Parent
    const { totalResults, currentPage, totalPages } = props
    return (
        <div className='d-flex align-items-center justify-content-between my-3'>
            {/* Show value from server  */}
            <p className='text-black-50'>About {totalResults} result found</p>
            <p className='text-black-50'>{currentPage} of {totalPages} page</p>
        </div>
    )
}

//PropTypes
Result.propTypes = {
    totalResults: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired
}

export default Result
