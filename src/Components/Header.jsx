import React, { Component } from 'react'
import { newsCategory } from '../Main/Main'
import PropTypes from 'prop-types'

class Header extends Component {
    state = {
        initialText: ''
    }

    //Handle change in search bar
    handleChange = e => {
        this.setState({
            initialText: e.target.value
        })
    }

    //Handle key press in search bar
    handleKeyPress = e => {
        if (e.key === 'Enter') {
            // console.log(this.state.initialText)
            // Send value and get from server
            this.props.handleSearch(this.state.initialText)
        }
    }

    render() {
        // Distruct props from parent
        const { startPoint, category, handleChangeCategory } = this.props
        return (
            <div className='my-3'>

                {/* Header and Search */}
                <div className="d-flex align-items-cetner justify-content-between">
                    <h3
                        style={{
                            cursor: 'pointer',
                            fontFamily: 'Quicksand', 'sans-serif': true,
                            fontWeight: 'bold',
                        }}
                        onClick={startPoint}
                    >
                        <span
                            className='text-success mx-1'>
                            World
                        </span>
                        News
                    </h3>

                    {/* Search */}
                    <input
                        type="search" name=""
                        className='form-control w-50'
                        placeholder='Search'
                        //Handle type change in search bar and send value to state
                        onChange={this.handleChange}
                        // Handle key press in search bar and send value to main component
                        onKeyPress={this.handleKeyPress}
                        value={this.state.initialText}
                        style={{
                            fontFamily: 'Ubuntu', 'sans-serif': true,
                        }}
                    />
                    {/* {console.log(this.state.initialText)} */}
                </div>

                {/* Category */}
                <div className='my-3'>

                    {
                        // console.log(newsCategory)

                        //Map through the category and display them
                        newsCategory && Object.keys(newsCategory).map(item => {
                            return (
                                <button
                                    className={category === newsCategory[item] ?
                                        'btn btn-success btn-sm btn-active m-1' :
                                        'btn btn-secondary btn-sm m-1'
                                    }
                                    style={{
                                        fontFamily: 'Ubuntu', 'sans-serif': true,
                                    }}
                                    key={newsCategory[item]}
                                    onClick={
                                        // Change category 
                                        () => handleChangeCategory(newsCategory[item])
                                    }

                                >
                                    {/* Show category name */}
                                    {newsCategory[item]}
                                </button>
                            )
                        })
                    }
                </div>
            </div >
        )
    }
}

//PropTypes
Header.propTypes = {
    startPoint: PropTypes.func.isRequired,
    category: PropTypes.string, // It's not required beacuse it will be change oncategory button change
    handleChangeCategory: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired
}


export default Header
