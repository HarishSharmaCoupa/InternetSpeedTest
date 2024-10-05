import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { ReactInternetSpeedMeter } from 'react-internet-meter'
// import 'react-internet-speed-meter/dist/index.css'

import { useNavigate } from 'react-router-dom';


const NewInternetSpeed = () => {
    const [testInProgress, setTestInProgress] = useState(false);
    const [downloadSpeeds, setDownloadSpeeds] = useState([]);
    const [latestDownloadSpeed, setLatestDownloadSpeed] = useState(null)
    const [placeName, setPlaceName] = useState("")
    const [placeCity, setPlaceCity] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        if (latestDownloadSpeed) {
            const newDownloadSpeeds = [...downloadSpeeds, latestDownloadSpeed]
            setDownloadSpeeds(newDownloadSpeeds)
            // console.log(downloadSpeeds)
            const sufficeintDataPoints = newDownloadSpeeds.length >= 4
            if (sufficeintDataPoints) {
                const apiEndpoint = `/api/internet_speed`
                const data = {
                    "download_units": "mbps",
                    "download_speed": (downloadSpeeds[0] / downloadSpeeds.length),
                    "place_name": placeName,
                    "place_city": placeCity
                }

                console.log(data)

                fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        if (response.ok) {
                            navigate("/")
                        }
                        else{
                        }

                        setTestInProgress(false)
                        setDownloadSpeeds([])
                        // location.reload()
                    })
                    .catch((error) => {
                    })


            }
        }
    }, [latestDownloadSpeed])


    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
            <div>
                <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">Internet Places<span className="text-sm text-purple-700">Add a New Place</span></h1>
                <div className="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-purple-400">
                    <div className="grid">
                        <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                            <input onChange={e => setPlaceName(e.target.value)} type="text" name="name" id="place-name" className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="Place Name" />
                            <label htmlFor="place-name" className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Place Name</label>
                        </div>
                    </div>
                    <div className="grid">
                        <div className="bg-white first:flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                            <input onChange={e => setPlaceCity(e.target.value)} type="text" name="city" id="city" className="peer block w-full border-0 p-0 text-base text-gray-900 placeholder-gray-400 focus:ring-0" placeholder="City" />
                            <label htmlFor="city" className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0">Last name</label>
                        </div>
                    </div>
                    {testInProgress ? (
                        <div>
                            Testing...
                            <ReactInternetSpeedMeter
                                txtSubHeading="Internet is too slow"
                                outputType="alert"
                                customClassName={null}
                                txtMainHeading="Opps..."
                                pingInterval={1000} // milliseconds 
                                thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte" 
                                threshold={100}
                                imageUrl="https://cdn.speedcheck.org/images/reviews/google-speed-test-mobile.jpg"
                                downloadSize="1781287"  //bytes
                                callbackFunctionOnNetworkDown={(speed) => console.log(`Internet speed is down ${speed}`)}
                                callbackFunctionOnNetworkTest={(speed) => setLatestDownloadSpeed(speed)}
                            />
                        </div>
                    ) : (
                        <button
                            type="submit"
                            className="mt-4 bg-purple-500 text-white py-2 px-6 rounded-md hover:bg-purple-600"
                            onClick={() => setTestInProgress(true)}
                        >
                            Start Speed Test
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewInternetSpeed