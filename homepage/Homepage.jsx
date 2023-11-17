import React from 'react'
import Header from '../Header/Header'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Homepage.scss'

const Homepage = () => {

    const [search, setSearch] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(e.target.search.value)
    }

    const [data, setData] = useState([''])

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:2323/mock`);
                setData(res.data)
            } catch(err) {
                console.log("Cannot fetch data", err);
            }
        }
        getData();
    }, []);


    const findDatasets = () => {
        let title = []
        if (!data) {
            return
        } else {
            for (let set of data) {
                if (set.title === search) {
                    title.push(set.title, set.descr, set.refresh, set.lastrefreshed, set.publisher, set.formats, set.type, set.topics)
                } else {
                    console.log("NO MATCH")
                }
            }
        }
        return title
     }

     findDatasets()


  return (
    <div>
        <Header />
        <Breadcrumbs />

        <form className='search-map' onSubmit={handleSubmit}>
            <input 
                type="text"
                name="search"
                className="search-map__input" 
                placeholder='Postal'
            />

            <div className="search-map__dropdown">
                <button className="search-map__button">Find Location</button>
            </div>


            <h1>{findDatasets()[0]}</h1>
            <p>{findDatasets()[1]}</p>
            <p> Refresh rate:{findDatasets()[2]}</p>
            <p> Last refreshed:{findDatasets()[3]}</p>
            <p> Publisher:{findDatasets()[4]}</p>
            <p> Formats:{findDatasets()[5]}</p>
            <p> Type{findDatasets()[6]}</p>
            <p> Topics{findDatasets()[7]}</p>
        </form>
    </div>
  )
}

export default Homepage