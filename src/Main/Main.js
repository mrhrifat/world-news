// Import Axios Instance from AxiosInstance.js
import axios from './AxiosInstance';


// News category based from Server
export const newsCategory = {
    technology: 'technology',
    general: 'general',
    business: 'business',
    entertainment: 'entertainment',
    science: 'science',
    health: 'health',
    sports: 'sports',

}

// News from country based from server
export const newsCountry = {
    ar: 'ar',
    at: 'at',
    au: 'au',
    be: 'be',
    bg: 'bg',
    br: 'br',
    ca: 'ca',
    ch: 'ch',
    cn: 'cn',
    co: 'co',
    cu: 'cu',
    cz: 'cz',
    de: 'de',
    eg: 'eg',
    fr: 'fr',
    gb: 'gb',
    ae: 'ae',
    gr: 'gr',
    hk: 'hk',
    hu: 'hu',
    id: 'id',
    ie: 'ie',
    il: 'il',
    in: 'in',
    it: 'it',
    jp: 'ip',
    kr: 'kr',
    lt: 'li',
    lv: 'lv',
    ma: 'ma',
    mx: 'mx',
    my: 'my',
    ng: 'ng',
    nl: 'nl',
    no: 'no',
    nz: 'nz',
    ph: 'ph',
    pl: 'pl',
    pt: 'pt',
    ro: 'ro',
    rs: 'rs',
    ru: 'ru',
    sa: 'sa',
    se: 'se',
    sg: 'sg',
    si: 'si',
    sk: 'sk',
    th: 'th',
    tr: 'tr',
    tw: 'tw',
    ua: 'ua',
    us: 'us',
    ve: 've',
    za: 'za',
}

// Make most item can visible in one page
const MAX_ITEM_PER_PAGE = 3


// Get news from server by make a class and other functionalities 
export default class serverNews {

    // Constructor of class
    constructor(country, category) {
        this._country = country; //This value have to be send from Front End of Main App
        this._category = category; //This value have to be send from Front End of Main App
        this._search = '';
        this._pageSize = MAX_ITEM_PER_PAGE;
        this._totalPages = 1;
        this._currentPage = 1
    }


    // Private function visble for only this class
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
        if (this._currentPage) {
            url += `&page=${this._currentPage}`
        }
        return url
    }

    // Send request on server with Async Await Function
    async getNews() {
        // const response = await axios.get(this._getURL())
        // console.log(response.data)

        try {
            const {
                data
            } = await axios.get(this._getURL()) //Get news with this._getURL() function
            this._totalPages = Math.ceil(data.totalResults / this._pageSize)
            // console.log(totalPages)

            // Return value to Front End
            return {
                articles: data.articles,
                totalResults: data.totalResults,
                totalPages: this._totalPages,
                currentPage: this._currentPage,
                country: this._country,
                category: this._category,
                isNext: this._isNext(),
                isPrev: this._isPrev()
            }


        } catch (err) {
            throw new Error(err)
        }

    }

    // Category Change
    changeCategory(category) {
        this._category = category
        this._currentPage = 1
        return this.getNews()
    }

    // Country Change
    changeCountry(country) {
        this._country = country
        this._currentPage = 1
        return this.getNews()
    }

    // Search Query on Server
    search(initialText) {
        this._search = initialText
        return this.getNews()
    }

    // Reset all value and go to homepage
    homepage() {
        this._currentPage = 1
        this._category = newsCategory.technology
        this._search = ''
        this._country = newsCountry.us
        return this.getNews()
    }

    // Check is there prev page
    _isPrev() {
        return this._currentPage > 1
    }

    // Check is there next page
    _isNext() {
        return this._currentPage < this._totalPages
    }

    // Go to next page
    nextPage() {
        if (this._isNext()) {
            this._currentPage++
            return this.getNews()
        }
        return null
    }

    // Go to prev page
    prevPage() {
        if (this._isPrev) {
            this._currentPage--
            return this.getNews()
        }
        return null
    }

    // Set current page
    setCurrentPage(page) {
        if (page > 0 && page < this._totalPages) {
            this._currentPage = page
            return this.getNews()
        }
        return null
    }

}
// console.log(`${process.env.REACT_APP_URL}${process.env.REACT_APP_API_KEY}`)

// ae: 'United Arab Emirates',
// ar: 'Argentina',
// at: 'Austria',
// au: 'Australia',
// be: 'Belgium',
// bg: 'Bulgaria',
// br: 'Brazil',
// ca: 'Canada',
// ch: 'Switzerland',
// cn: 'China',
// co: 'Colombia',
// cu: 'Cuba',
// cz: 'Czech Republic',
// de: 'Germany',
// eg: 'Egypt',
// fr: 'France',
// gb: 'United Kingdom',
// gr: 'Greece',
// hk: 'Hong Kong',
// hu: 'Hungary',
// id: 'Indonesia',
// ie: 'Ireland',
// il: 'Israel',
// in: 'India',
// it: 'Italy',
// jp: 'Japan',
// kr: 'Korea',
// lt: 'Lithuania',
// lv: 'Latvia',
// ma: 'Morocco',
// mx: 'Mexico',
// my: 'Malaysia',
// ng: 'Nigeria',
// nl: 'Netherlands',
// no: 'Norway',
// nz: 'New Zealand',
// ph: 'Philippines',
// pl: 'Poland',
// pt: 'Portugal',
// ro: 'Romania',
// rs: 'Serbia',
// ru: 'Russia',
// sa: 'Saudi Arabia',
// se: 'Sweden',
// sg: 'Singapore',
// si: 'Slovenia',
// sk: 'Slovakia',
// th: 'Thailand',
// tr: 'Turkey',
// tw: 'Taiwan',
// ua: 'Ukraine',
// us: 'United States',
// ve: 'Venezuela',
// za: 'South Africa',