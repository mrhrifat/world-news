import React, { Component } from 'react'
import PropTypes from 'prop-types'
import serverNews, { newsCategory, newsCountry } from './Main/Main'
import Header from './Components/Header'
import Result from './Components/Result'
import NewsList from './Components/NewsList'
import Paggination from './Components/Paggination'
import Loading from './Components/Loading'
import Country from './Components/Country'

// For make card if server is down or missing
// const fakenews = [
//     {
//         "source": {
//             "id": "bbc-news",
//             "name": "BBC News"
//         },
//         "author": "BBC News",
//         "title": "US lawmakers approve $1tn in infrastructure spending",
//         "description": "The long-delayed bipartisan legislation is a major plank of President Biden's domestic agenda.",
//         "url": "http://www.bbc.co.uk/news/world-us-canada-59180745",
//         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/50CD/production/_121458602_hi070823987.jpg",
//         "publishedAt": "2021-11-06T04:07:26.0503964Z",
//         "content": "Image caption, The bill provides funding to upgrade highways, roads and bridges, among other key projects\r\nThe US Congress has passed a landmark $1tn (£741bn) infrastructure spending package, deliver… [+1997 chars]"
//     },
//     {
//         "source": {
//             "id": "bbc-news",
//             "name": "BBC News"
//         },
//         "author": "BBC News",
//         "title": "Chinese man convicted for stealing aviation trade secrets",
//         "description": "US authorities say Xu Yanjun sought to steal trade secrets from US aviation companies.",
//         "url": "http://www.bbc.co.uk/news/world-us-canada-59186980",
//         "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/14109/production/_121458128_hi070510093.jpg",
//         "publishedAt": "2021-11-06T02:37:25.4490042Z",
//         "content": "Image caption, LEAP engines for jetliners at a GE Aviation factory - the firm was one of those targeted by Xu Yanjun for trade secrets\r\nA Chinese intelligence officer has been convicted by a US jury … [+2254 chars]"
//     }
// ]

// Create new news object instance and send 2 default value to server through main
const news = new serverNews(newsCountry.us, newsCategory.technology,)

// News Class Component
class News extends Component {

    // componentDidMount() {
    //     news.getNews()
    // }

    // componentDidMount() {
    //     news.getNews()
    //         .then(data => {
    //             console.log(data)
    //         })
    // }

    // State to keep returned data and control Loading comonents
    state = {
        data: {},
        isLoading: true
    }

    // Handle with server and render for asynchronous behaviours 
    componentDidMount() {

        //First request on server 
        news.getNews()
            .then(data => {
                this.setState({
                    data,
                    isLoading: false
                })
            })
            .catch(err => {
                throw new Error(err)
            })
    }

    // Reset all condition and go to homepage
    startPoint = () => {
        this.setState({ isLoading: true })
        news.homepage()
            .then(data => {
                this.setState({
                    data,
                    isLoading: false
                })
            })
            .catch(err => {
                throw new Error(err)
            })
    }

    // Change category one to another
    handleChangeCategory = category => {
        this.setState({ isLoading: true })
        news.changeCategory(category)
            .then(data => {
                this.setState({
                    data,
                    isLoading: false
                })
            })
            .catch(err => {
                throw new Error(err)
            })
    }

    // Get value from country event change and set it to this state
    handleCountry = value => {
        this.setState(
            {
                data: {
                    ...this.state.data,
                    country: value
                }
            })
    }

    // Send to server with state country onClick
    handleChangeCountry = () => {
        this.setState({ isLoading: true })
        news.changeCountry(this.state.data.country)
            .then(data => {
                this.setState({
                    data,
                    isLoading: false
                })
            })
            .catch(err => {
                throw new Error(err)
            })
    }
    

    // Search query on server
    handleSearch = initialText => {
        this.setState({ isLoading: true })
        news.search(initialText)
            .then(data => {
                this.setState({
                    data,
                    isLoading: false
                })
            })
            .catch(err => {
                throw new Error(err)
            })
    }

    // Go to next page
    next = () => {
        if (this.state.data.isNext) {
            this.setState({ isLoading: true })
        }

        news.nextPage()
            .then(data => {
                this.setState({
                    data,
                    isLoading: false
                })
            })
            .catch(err => {
                throw new Error(err)
            })
    }

    // Return to previous page
    prev = () => {
        if (this.state.data.isPrev) {
            this.setState({ isLoading: true })
        }


        news.prevPage()
            .then(data => {
                this.setState({
                    data,
                    isLoading: false
                })
            }).catch(err => {
                throw new Error(err)
            })
    }

    // Get value on event change and set it to this state
    handlePageChange = value => {
        this.setState({
            data: {
                ...this.state.data,
                currentPage: Number.parseInt(value)
            }
        })
    }

    // Send to server with jump to any page onClick
    goToPage = () => {
        this.setState({
            isLoading: true
        })
        news.setCurrentPage(this.state.data.currentPage)
            .then(data => {
                this.setState({
                    data,
                    isLoading: false
                })
            })
            .catch(err => {
                throw new Error(err)
            })

    }


    render() {
        // Distruct this state data
        const { data: { articles, totalResults, totalPages, currentPage, country, category, isPrev, isNext }, isLoading } = this.state
        // console.log(this.state.data.country)

        return (
            <div className='container w-50'>
                {/* {console.log(this.state.data)} */}

                {/* Header Component */}
                <Header
                    startPoint={this.startPoint}
                    category={category}
                    handleChangeCategory={this.handleChangeCategory}
                    handleSearch={this.handleSearch}
                />

                {/* Country Component */}
                <Country
                    country={country}
                    handleChangeCountry={this.handleChangeCountry}
                    handleCountry={this.handleCountry}
                />

                {/* Visible only if request is done and isLoading is false */}
                {(isLoading)
                    ?

                    // Loading Component 
                    <Loading/>
                    :
                    <div>

                        {/* Result Component */}
                        <Result
                            totalResults={totalResults}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />

                        {/* NewsList Component */}
                        <NewsList news={articles} />

                        {/* Paggination Component */}
                        <Paggination
                            isPrev={isPrev}
                            prev={this.prev}
                            isNext={isNext}
                            next={this.next}
                            totalPages={totalPages}
                            currentPage={currentPage}
                            handlePageChange={this.handlePageChange}
                            goToPage={this.goToPage}
                        />
                    </div>
                }




                {/* <NewsList news={fakenews} /> */}
                {/* <Loading /> */}

            </div>
        )
    }
}

//Props Validation
News.propTypes={
    news: PropTypes.object,
    isLoading: PropTypes.bool,
    data: PropTypes.object,
    handleCountry: PropTypes.func,
    handleChangeCountry: PropTypes.func,
    handleChangeCategory: PropTypes.func,
    handleSearch: PropTypes.func,
    handlePageChange: PropTypes.func,
    goToPage: PropTypes.func,
    startPoint: PropTypes.func,
    next: PropTypes.func,
    prev: PropTypes.func,
}

Header.propTypes={
    startPoint: PropTypes.func,
    category: PropTypes.string,
    handleChangeCategory: PropTypes.func,
    handleSearch: PropTypes.func,
}

Country.propTypes={
    country: PropTypes.string,
    handleCountry: PropTypes.func,
    handleChangeCountry: PropTypes.func,
}

Result.propTypes={
    totalResults: PropTypes.number,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
}

NewsList.propTypes={
    news: PropTypes.array,
}

Paggination.propTypes={
    isPrev: PropTypes.bool,
    prev: PropTypes.func,
    isNext: PropTypes.bool,
    next: PropTypes.func,
    totalPages: PropTypes.number,
    currentPage: PropTypes.number,
    handlePageChange: PropTypes.func,
    goToPage: PropTypes.func,
}



export default News
