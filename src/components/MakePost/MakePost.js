import React from "react"
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPaperPlane, faPlus, faCompass, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export default function MakePost(props) {

    function SendPost() {

        const data = { lat, lon, mood, image64 };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('/api', options);
        const json = await response.json();
    }
    return (
        <>
            <button>Click</button>
        </>
    )
}