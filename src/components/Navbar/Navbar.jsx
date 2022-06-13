import React from "react"
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPaperPlane, faPlus, faCompass, faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

export default function Welcome(props) {
    return (
        <>
            <div id="Top"></div>
            <nav>
                <h1><a href="#Top">Instagram</a></h1>
                <ol>
                    <li><Link to="/"><FontAwesomeIcon icon={faHouse} /></Link></li>
                    <li><FontAwesomeIcon icon={faPaperPlane} /></li>
                    <li><Link to="/CreatePost"><FontAwesomeIcon icon={faPlus} /></Link></li>
                    <li><FontAwesomeIcon icon={faCompass} /></li>
                    <li><FontAwesomeIcon icon={faHeart} /></li>
                    <li><img src={props.ProfileImg} alt="" /></li>
                </ol>
            </nav>
        </>
    )
}