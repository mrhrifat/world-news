import React, { Component } from 'react'
import { newsCategory } from '../Main/Main'
import PropTypes from 'prop-types'

class Header extends Component {
    state = {
        initialText: ''
    }

    handleChange = e => {
        this.setState({
            initialText: e.target.value
        })
    }

    handleKeyPress = e => {
        if (e.key === 'Enter') {
            this.props.handleSearch(this.state.initialText)
        }
    }

    render() {
        const { startPoint, category, handleChangeCategory } = this.props
        return (
            <div className='my-3'>

                {/* Header and Search */}
                <div className="d-flex align-items-cetner justify-content-between">
                    <h3
                        style={{
                            cursor: 'pointer'
                        }}
                        onClick={startPoint}
                    >
                        <span className='text-success'>
                            World
                        </span>
                        News
                    </h3>

                    {/* Search */}
                    <input
                        type="search" name=""
                        className='form-control w-50'
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                        value={this.state.initialText}
                    />
                    {/* {console.log(this.state.initialText)} */}
                </div>

                {/* Category */}
                <div className='my-3'>
                    {
                        // console.log(newsCategory)
                        newsCategory && Object.keys(newsCategory).map(item => {
                            return (
                                <button
                                    className={category === newsCategory[item] ?
                                        'btn btn-outline-success btn-sm btn-active m-1' :
                                        'btn btn-outline-secondary btn-sm m-1'}
                                    key={newsCategory[item]}
                                    onClick={
                                        () => handleChangeCategory(newsCategory[item])
                                    }

                                >
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


export default Header
