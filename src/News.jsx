import React, { Component } from 'react'
import serverNews, { newsCategory, country } from './Main/Main'
import Header from './Components/Header'
import Result from './Components/Result'
import NewsList from './Components/NewsList'
import Paggination from './Components/Paggination'
import Loading from './Components/Loading'

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

const news = new serverNews(country.us, newsCategory.technology,)

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

    state = {
        data: {},
        isLoading: true
    }

    componentDidMount() {
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



    render() {
        const { data: { articles, totalResults, totalPages, currentPage, country, category }, isLoading } = this.state

        return (
            <div className='container'>
                {/* {console.log(this.state.data)} */}

                <Header
                    startPoint={this.startPoint}
                    category={category}
                    handleChangeCategory={this.handleChangeCategory}
                    handleSearch={this.handleSearch}
                />

                {(isLoading)
                    ?
                    <Loading />
                    :
                    <div>
                        <Result
                            totalResults={totalResults}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />

                        <NewsList news={articles} />
                    </div>
                }


                <Paggination />

                {/* <NewsList news={fakenews} /> */}
                {/* <Loading /> */}

            </div>
        )
    }
}

export default News
