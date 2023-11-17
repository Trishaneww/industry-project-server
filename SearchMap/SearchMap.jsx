import './SearchMap.scss';
import { useState, useEffect } from 'react';
import { IoMdSearch } from "react-icons/io";
import axios from 'axios';
import Header from '../Header/Header'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'


const SearchMap = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearch(e.target.search.value)
    }

    const [data, setData] = useState([''])
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(`http://localhost:2323/`);
                setData(res.data)
            } catch(err) {
                console.log("Cannot fetch data", err);
            }
        }
        getData();
    }, []);

    const [search, setSearch] = useState('')

    const findRentals = () => {
        let apartmentCount = 0;
        let townhouseCount = 0;
        let condoCount = 0;
        let count = 0;
        let newArr = [];
        if (!data) {
            return 
        } else {
            for (let rental of data) {
                if (rental.postal_code === search.slice(0,3).toUpperCase()) {
                    count++
                    newArr.push(rental.address)

                    if (rental.property_type === 'Condominium') {
                        condoCount++
                    } else if (rental.property_type === 'Townhouse/ Row House') {
                        townhouseCount ++
                    } else if (rental.property_type === 'Apartment') {
                        apartmentCount++
                    }
                }
            }
            
            return {
                a:count,
                b:[...new Set(newArr)],
                c:condoCount,
                d:townhouseCount,
                e:apartmentCount
            }
        }
    }

return (
    <div>
         <Header />
        <Breadcrumbs />
        <div>
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
            </form>
        </div>

          {/* {data.slice(7930).map((rental) => (
                <div className="rental-card">
                    <p>{rental.postal_code}</p>
                    <p>{rental.ward_name}</p>
                    <p>{rental.address}</p>
                </div>
                ))} */}

        <div className="address-list">
            <h1>There are {findRentals().a} registered short term rentals in {search.slice(0,7).toUpperCase()}</h1>
            <p>There are {findRentals().c} Condos</p>
            <p>There are {findRentals().d} Townhouse/ Row Houses</p>
            <p>There are {findRentals().e} Apartments</p>
            
            <h2>ADDRESS</h2>
            {findRentals().b.map((rental) => (
                <div>
                    <p>{rental}</p>
                </div>
            ))}
        </div>
    </div>    
)};

export default SearchMap;