import React, { Component } from 'react'
import { newsCountry } from '../Main/Main'
import PropTypes from 'prop-types'

//Get country code to country name ES6 API
let regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
// console.log(regionNames.of('ae'))

// console.log((new Intl.DisplayNames(['en'], {type: 'region'})).of('United States'))

class Country extends Component {


    render() {
        // Props from parent
        const { country, handleChangeCountry, handleCountry } = this.props
        return (
            <div>
                <form>
                    <div className="form-row">
                        <div
                            className="form-group col-md-3" // 
                            style={{
                                marginLeft: 'auto'
                            }}
                        >
                            <select
                                id="country"
                                name='country'
                                className='form-control form-control-sm border-success'
                                value={country}

                                //Change select option
                                onChange={e => {
                                    handleCountry(e.target.value)
                                    // handleChangeCountry()
                                }}

                                //Send request on parent to get update
                                onClick={
                                    () => {
                                        handleChangeCountry()
                                    }
                                }
                            >
                                <option>Change Country</option>
                                <option value=''>All Country</option>
                                {/* {console.log(newsCountry)} */}
                                {
                                    newsCountry && Object.keys(newsCountry).map(item => {
                                        return (
                                            <option
                                                key={newsCountry[item]}
                                                // selected={country === newsCountry[item]}
                                                value={newsCountry[item]}
                                            >

                                                {
                                                    //Change country code to country name
                                                    regionNames.of(newsCountry[item].toUpperCase())
                                                    // newsCountry[item]
                                                    // regionNames.of(item.toUpperCase())
                                                }
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </form >
            </div >
        )
    }
}

Country.propTypes = {
    country: PropTypes.string,
    handleChangeCountry: PropTypes.func.isRequired,
    handleCountry: PropTypes.func.isRequired
}

export default Country




    // const newsCountry = {
    //     us: 'us',
    //     ae: 'ar',
    // };
    // let a;
    // a = Object.values(newsCountry).map(i => {
    //     return i.toUpperCase()
    // })
    // console.log(a)
    // let value = 'AR'
    // for (let item in a) {
    //     if (a[item] === value) {
    //         value = item;
    //     }
    //     if (value == 1) {
    //         for (let j in newsCountry) {
    //             value = j
    //         }
    //     }
    // }
    // console.log(value);

            // <div>
            //     {
            //         // console.log(newsCountry)
            //         //Map through the category and display them
            //         newsCountry && Object.keys(newsCountry).map(item => {
            //             return (
            //                 <button
            //                     className={country === newsCountry[item] ?
            //                         'btn btn-outline-success btn-sm btn-active m-1' :
            //                         'btn btn-outline-secondary btn-sm m-1'}
            //                     key={newsCountry[item]}
            //                     onClick={
            //                         // Change category
            //                         () => handleChangeCountry(newsCountry[item])
            //                     }

            //                 >
            //                     {/* Show category name */}
            //                     {newsCountry[item]}
            //                 </button>
            //             )
            //         })
            //     }
            // </div>

    // < select name = "" id = "" >
    //                 < option value='ar' > Argentina</ >
    //                 <option value='at'> Austria</option>
    //                 <option value='au'> Australia</option>
    //                 <option value='be'> Belgium</option>
    //                 <option value='bg'> Bulgaria</option>
    //                 <option value='br'> Brazil</option>
    //                 <option value='ca'> Canada</option>
    //                 <option value='ch'> Switzerland</option>
    //                 <option value='cn'> China</option>
    //                 <option value='co'> Colombia</option>
    //                 <option value='cu'> Cuba</option>
    //                 <option value='cz'> Czech Republic</option>
    //                 <option value='de'> Germany</option>
    //                 <option value='eg'> Egypt</option>
    //                 <option value='fr'> France</option>
    //                 <option value='gb'> United Kingdom</option>
    //                 <option value='ae'> United Arab Emirates</option>
    //                 <option value='gr'> Greece</option>
    //                 <option value='hk'> Hong Kong</option>
    //                 <option value='hu'> Hungary</option>
    //                 <option value='id'> Indonesia</option>
    //                 <option value='ie'> Ireland</option>
    //                 <option value='il'> Israel</option>
    //                 <option value='in'> India</option>
    //                 <option value='it'> Italy</option>
    //                 <option value='jp'> Japan</option>
    //                 <option value='kr'> Korea</option>
    //                 <option value='lt'> Lithuania</option>
    //                 <option value='lv'> Latvia</option>
    //                 <option value='ma'> Morocco</option>
    //                 <option value='mx'> Mexico</option>
    //                 <option value='my'> Malaysia</option>
    //                 <option value='ng'> Nigeria</option>
    //                 <option value='nl'> Netherlands</option>
    //                 <option value='no'> Norway</option>
    //                 <option value='nz'> New Zealand</option>
    //                 <option value='ph'> Philippines</option>
    //                 <option value='pl'> Poland</option>
    //                 <option value='pt'> Portugal</option>
    //                 <option value='ro'> Romania</option>
    //                 <option value='rs'> Serbia</option>
    //                 <option value='ru'> Russia</option>
    //                 <option value='sa'> Saudi Arabia</option>
    //                 <option value='se'> Sweden</option>
    //                 <option value='sg'> Singapore</option>
    //                 <option value='si'> Slovenia</option>
    //                 <option value='sk'> Slovakia</option>
    //                 <option value='th'> Thailand</option>
    //                 <option value='tr'> Turkey</option>
    //                 <option value='tw'> Taiwan</option>
    //                 <option value='ua'> Ukraine</option>
    //                 <option value='us'> United States</option>
    //                 <option value='ve'> Venezuela</option>
    //                 <option value='za'> South Africa</option>
    //                 <option > World Wide</option>
    //             </select >