import React from 'react'
import ReactDOM from 'react-dom'

const PlacesList = ()=>{
    return(
        <div>
            Places list 
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('places-container'))
root.render(<PlacesList />)