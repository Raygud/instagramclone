import React, { useState, useRef } from "react"
import './Post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons'


export default function Post({ post }) {
    const ReadMoreText = useRef(null);
    const Liked = useRef(null);
    const [count, ReadMore] = useState(post.description.substr(0, 36) + "...");
    function RemoveMe() {

        ReadMoreText.current.style.display = "none"
        console.log(ReadMoreText.current)
    }
    function Like() {
        if (post.LikedBy != "Raygud") {
            console.log(Liked.current)
            Liked.current.style.color = "red"
        }
        else {
            console.log("Allready liked")
        }
    }
    return (
        <div id="Post" className="Post">
            <div>
                <img src={post.profilePicture}></img>
                <h2>{post.name}</h2>
                <div>...</div>
            </div>
            <img src={post.image}></img>
            <div id="LCS">
                {post.LikedBy == "Raygud" ? (
                    <span ref={Liked}><FontAwesomeIcon style={{ color: 'red' }} className="Fa" onClick={() => Like()} icon={faHeart} /></span>
                ) : (
                    <span ref={Liked}><FontAwesomeIcon className="Fa" onClick={() => Like()} icon={faHeart} /></span>

                )}

                <FontAwesomeIcon className="Fa" id="Comment" icon={faComment} />
                <FontAwesomeIcon className="Fa" id="Send" icon={faPaperPlane} />
                <span id="BookMark">BM</span>
            </div>
            <div id="Likes" className="Likes">{post.likes} likes</div>
            <div id="Description">
                <h5>{post.name}</h5>
                <p>{post.description.length > 27 ? (
                    <> <span>{count}</span> <span ref={ReadMoreText} onClick={() => ReadMore(post.description) + RemoveMe()}>more</span></>
                ) : (
                    post.description

                )}</p>

            </div>
            <div id="CommentPw">View all {post.comments} comments</div>
            <div id="Time">{post.timeStamp} HOURS AGO</div>
        </div>
    )
}