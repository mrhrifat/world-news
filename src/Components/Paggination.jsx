import React, { Component } from 'react'

class Paggination extends Component {
    state = {
        isEditable: false
    }
    render() {
        const { isEditable } = this.state
        const { isPrev, prev, isNext, next, totalPages, currentPage, handlePageChange, goToPage } = this.props
        return (
            <div className='d-flex align-item-center justify-content-between my-4'>

                {/* Previous */}
                <button
                    className="btn btn-outline-success btn-sm"
                    disabled={!isPrev}
                    onClick={() => {
                        prev()
                    }}
                >
                    Prev
                </button>

                <div>
                    {isEditable
                        ?
                        (<input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Enter page number"
                            value={currentPage}
                            onChange={e => {
                                handlePageChange(e.target.value)
                            }}
                            onKeyPress={e => {
                                if (e.key === 'Enter') {
                                    goToPage()
                                    this.setState({ isEditable: !isEditable })
                                }
                            }}
                        />)
                        :
                        (<small
                            onDoubleClick={() => {
                                this.setState({
                                    isEditable: !isEditable
                                })
                            }
                            }
                        >
                            {currentPage} of {totalPages}
                        </small>
                        )
                    }
                </div>

                {/* Next */}
                <button
                    className="btn btn-outline-success btn-sm"
                    disabled={!isNext}
                    onClick={() => { next() }}
                >
                    Next
                </button>
            </div>
        )
    }
}

export default Paggination
