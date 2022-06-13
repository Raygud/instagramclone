import React from "react"
import './Post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons'


export default function Character({ character }) {
    return (
        <div id="Post" className="Post">
            <div>
                <img></img>
                <h2>UserName</h2>
                <div>...</div>
            </div>
            <img src={character.name}></img>
            <div>
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faComment} />
                <FontAwesomeIcon icon={faPaperPlane} />
                <span>BM</span>
            </div>
            <div id="Likes" className="Likes">181 likes</div>
            <h6>UserName</h6>
            <div id="CommentPw">View all 4 comments</div>
            <div id="Time">5 HOURS AGO</div>
        </div>
    )
}