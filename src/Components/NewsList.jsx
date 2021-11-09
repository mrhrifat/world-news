import React, { Component } from 'react'
import PropTypes from 'prop-types'


// Get date from Date Constructor
const publishedTime = date => {
    const d = new Date(date)
    // return d.toLocaleString()
    return d.toDateString()
}

//NewsCard Component
// Making card for each news
const NewsCard = ({ item }) => {
    return (
        <div className='card mb-4'>
            {item.urlToImage &&
                <img
                    className='card-img-top'
                    src={item.urlToImage}
                    alt={item.title}
                />
            }

            <div className="card-body">
                <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                        textDecoration: 'none',
                        color: '#111',
                        fontFamily: 'Dosis', 'sans-serif':true,
                    }}
                >
                    <h5>{item.title}</h5>
                </a>

                <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{
                        textDecoration: 'none',
                        color: '#111',
                        fontFamily: 'Quicksand', 'sans-serif': true,
                    }}
                >
                    <p>{item.description}</p>
                </a>
            </div>

            <div className="card-footer d-flex align-item-center justify-content-between">

                <small
                style={{
                    fontFamily: 'Ubuntu', 'sans-serif': true,
                }}
                >
                    Published at {publishedTime(item.publishedAt)}
                </small>

                <small className='bg-success rounded text-light p-1'>
                    <span>
                        {item.source.name}
                    </span>
                </small>
            </div>

        </div>
    )
}

//NewsList Component
// Map through the list of articles and return a NewsCard for each
class NewsList extends Component {
    render() {

        //Distruct the props from parent 
        const { news } = this.props
        return (
            <div>
                {/* <NewsCard /> */}

                {/* {console.log(news)} */}

                {news && news.length === 0 && <h6>'There is no news today'</h6>}

                {/* Map articles array and return a NewsCard for each */}
                {news && news.map(item =>
                    <NewsCard
                        key={item.title}
                        item={item}
                    />
                )}
            </div>
        )
    }
}

//PropTypes for NewsList
NewsList.propTypes = {
    news: PropTypes.array.isRequired
}

//PropTypes for NewsCard
NewsCard.propTypes = {
    item: PropTypes.object.isRequired
}


// Functional Component
// const NewsList = ({ news }) => {
//     return (
//         <div>
//             {/* <NewsCard /> */}

//             {/* {console.log(news)} */}

//             {news && news.length === 0 && <h6>'There is no news today'</h6>}
//             {news && news.map(item =>
//                 <NewsCard
//                     key={item.title}
//                     item={item}
//                 />
//             )}
//         </div>
//     )
// }

export default NewsList
