import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Paggination extends Component {

    //Stop editing the input section until the user double click on paragraph
    state = {
        isEditable: false
    }
    render() {
        //Get from this component state 
        const { isEditable } = this.state

        //Get from props
        const { isPrev, prev, isNext, next, totalPages, currentPage, handlePageChange, goToPage } = this.props

        return (
            <div className='d-flex align-item-center justify-content-between my-4'>

                {/* Previous Button */}
                <button
                    className="btn btn-outline-success btn-sm"
                    disabled={!isPrev}
                    onClick={() => {
                        prev()
                    }}
                    style={{
                        fontFamily: 'Ubuntu', 'sans-serif': true,
                    }}
                >
                    Prev
                </button>

                {/* Show Page and Input section if double click on paragraph */}
                <div>
                    {isEditable
                        ?
                        (<input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Enter page number"
                            value={currentPage}
                            //Set the current page in Parent News component state > data > currentPage
                            onChange={e => {
                                handlePageChange(e.target.value)
                            }}

                            //Change the current page with gotoPage() function and make isEditable false
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    goToPage()
                                    this.setState({ isEditable: !isEditable })
                                }
                            }}
                        />)
                        :
                        (<small

                            //Make isEditable true when double click on paragraph
                            onDoubleClick={() => {
                                this.setState({
                                    isEditable: !isEditable
                                })
                            }
                            }
                        >
                            {/* Page {currentPage} of {totalPages} */}
                            {currentPage} of {totalPages}
                        </small>
                        )
                    }
                </div>

                {/* Next Button */}
                <button
                    className="btn btn-outline-success btn-sm"
                    disabled={!isNext}
                    onClick={() => { next() }}
                    style={{
                        fontFamily: 'Ubuntu', 'sans-serif': true,
                    }}
                >
                    Next
                </button>
            </div>
        )
    }
}

//PropTypes
Paggination.propTypes = {
    isPrev: PropTypes.bool.isRequired,
    isNext: PropTypes.bool.isRequired,
    prev: PropTypes.func.isRequired,
    next: PropTypes.func.isRequired,
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    goToPage: PropTypes.func.isRequired,
}

export default Paggination
