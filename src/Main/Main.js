import axios from './AxiosInstance';

export const newsCategory = {
    technology: 'technology',
    general: 'general',
    business: 'business',
    entertainment: 'entertainment',
    science: 'science',
    health: 'health',
    sports: 'sports',

}
export const country = {
    ae: 'ae',
    ar: 'ar',
    au: 'au',
    cn: 'cn',
    ua: 'ua',
    us: 'us',
    be: 'be',
    bg: 'bg',
}

const MAX_ITEM_PER_PAGE = 3

export default class serverNews {
    constructor(country, category) {
        this._country = country;
        this._category = category;
        this._search = '';
        this._pageSize = MAX_ITEM_PER_PAGE;
        this._totalPages = 1;
        this._currentPage = 1
    }

    _getURL() {
        let url = '/?'
        if (this._country) {
            url += `country=${this._country}`
        }
        if (this._category) {
            url += `&category=${this._category}`
        }
        if (this._search) {
            url += `&q=${this._search}`
        }
        if (this._pageSize) {
            url += `&pageSize=${this._pageSize}`
        }
        if (this._page) {
            url += `&page=${this._page}`
        }
        return url
    }

    async getNews() {
        // const response = await axios.get(this._getURL())
        // console.log(response.data)

        try {
            const {
                data
            } = await axios.get(this._getURL())
            this._totalPages = Math.ceil(data.totalResults / this._pageSize)
            // console.log(totalPages)

            return {
                articles: data.articles,
                totalResults: data.totalResults,
                totalPages: this._totalPages,
                currentPage: this._currentPage,
                country: this._country,
                category: this._category
            }


        } catch (err) {
            throw new Error(err)
        }

    }

    changeCategory(category) {
        this._category = category
        this._currentPage = 1
        return this.getNews()
    }

    changeCountry(country) {
        this._country = country
        this._currentPage = 1
        return this.getNews()
    }

    search(initialText) {
        this._search = initialText
        return this.getNews()
    }

    homepage() {
        this._currentPage = 1
        this._category = newsCategory.technology
        this._search = ''
        return this.getNews()
    }
}
// console.log(`${process.env.REACT_APP_URL}${process.env.REACT_APP_API_KEY}`)