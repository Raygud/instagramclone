import React from "react"
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPaperPlane, faPlus, faCompass, faHeart } from '@fortawesome/free-solid-svg-icons'


export default function Welcome(props) {
    return (
        <nav>
            <h1>Instagram</h1>
            <ol>
                <li><FontAwesomeIcon icon={faHouse} /></li>
                <li><FontAwesomeIcon icon={faPaperPlane} /></li>
                <li><FontAwesomeIcon icon={faPlus} /></li>
                <li><FontAwesomeIcon icon={faCompass} /></li>
                <li><FontAwesomeIcon icon={faHeart} /></li>
                <li><img src={props.ProfileImg} alt="" /></li>
            </ol>
        </nav>
    )
}