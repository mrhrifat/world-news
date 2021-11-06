import React, { Component } from 'react'

const publishedTime = date => {
    const d = new Date(date)
    // return d.toLocaleString()
    return d.toDateString()
}

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
                >
                    <h5>{item.title}</h5>
                </a>

                <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <p>{item.description}</p>
                </a>
            </div>

            <div className="card-footer d-flex align-item-center justify-content-between">

                <small>
                    Published at {publishedTime(item.publishedAt)}
                </small>

                <small>
                    <span>
                        {item.source.name}
                    </span>
                </small>
            </div>

        </div>
    )
}

class NewsList extends Component {
    render() {
        const { news } = this.props
        return (
            <div>
                {/* <NewsCard /> */}

                {/* {console.log(news)} */}

                {news && news.length === 0 && <h6>'There is no news today'</h6>}
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
