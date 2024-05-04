import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Link } from 'react-router-dom'


const PlacesList = () => {
    const [loading, setLoading] = useState(true)
    const [loadedPlaces, setLoadedPlaces] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (event) =>{
        console.log(event.target.value)
        setSearchTerm(event.target.value)
    }

    useEffect(() => {

        const apiEndpoint = `/api/places?search_term=${searchTerm}`
        fetch(apiEndpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setLoadedPlaces(data["places"])
                setLoading(false)
            })
    }, [searchTerm])

    if (loading) {
        return (
            <div> Loading...</div>
        )
    }

    else {
        return (
            <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="p-4">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"></path>
                                </svg>
                            </div>
                          <div className="flex">
                            <input type="text" id="table-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search htmlFor items" onChange={handleSearch}/>
                                <button
                                    className="middle none center mr-3 rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-10 "
                                    data-ripple-light="true"
                                >
                                    New Report
                                </button>
                                <Link to="/new-internet-speed"><button
                                    className="middle none center mr-3 rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    data-ripple-light="true"
                                >Create</button></Link>
                          </div>
                        </div>
                    </div>

                    <table className="items-center bg-transparent w-full border-collapse ">
                        <thead className="thead-light ">
                            <tr>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Name</th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">City</th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Recent Upload Speed</th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Recent Download Speed</th>
                                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">Number of Measurements</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadedPlaces.map((place, index) => (
                                <tr key={place.id}>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{place.name}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{place.city}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{place.most_recent_download_speed}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{place.most_recent_download_speed}</td>
                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">{place.number_of_measurements}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                </div>
            </div>
        )
    }
}

export default PlacesList