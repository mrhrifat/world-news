import React, { Component } from 'react'

class Loading extends Component {
    render() {
        return (
            <div className='d-flex align-items-center justify-content-between my-3'>
                <h6>Please wait...</h6>
                <div className="spinner-border text-success " role='status'>
                </div>
            </div>
        )
    }
}

export default Loading
