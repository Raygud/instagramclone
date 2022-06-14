import React, { useState, useRef } from "react"
import './Post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons'


export default function Post({ post }) {
    const ReadMoreText = useRef(null);
    const Liked = useRef(null);
    const Likes = useRef(null);
    const [count, ReadMore] = useState(post.description.substr(0, 30) + "...");
    let DisplayedLikes = parseInt(post.likes)
    function RemoveMe() {

        ReadMoreText.current.style.display = "none"
        console.log(ReadMoreText.current)
    }
    function Like(Postid) {
        const SendPost = async (Action) => {
            let PostId = Postid
            const data = { PostId, Action };
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };
            const response = await fetch('http://localhost:3001/api/Like', options);


        }

        if (post.LikedBy != "Raygud") {
            console.log("Liked")
            post.LikedBy = "Raygud"
            Liked.current.style.color = "red"
            DisplayedLikes = DisplayedLikes + 1
            Likes.current.innerHTML = (DisplayedLikes) + " Likes"
            console.log(DisplayedLikes)
            console.log(Liked.current.style.color)
            SendPost("Like")
        }
        else {
            console.log("Unliked")
            Liked.current.style.color = "inherit"
            console.log(Liked.current.style.color)
            if (DisplayedLikes > 0) { DisplayedLikes = DisplayedLikes - 1 }
            else { DisplayedLikes = DisplayedLikes }
            console.log(DisplayedLikes)
            Likes.current.innerHTML = (DisplayedLikes) + " Likes"
            post.LikedBy = ""
            SendPost("Unlike")
        }
    }

    function setColor() {
        setTimeout(function () {
            if (post.LikedBy == "Raygud") {
                Liked.current.style.color = "red"
            }
            else {
                Liked.current.style.color = "black"
            }
        }, 1);
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
                    <span ref={Liked}><FontAwesomeIcon className="Fa" onLoad={setColor()} onClick={() => Like(post.PostId)} icon={faHeart} /></span>
                ) : (
                    <span ref={Liked}><FontAwesomeIcon className="Fa" onLoad={setColor()} onClick={() => Like(post.PostId)} icon={faHeart} /></span>

                )}

                <FontAwesomeIcon className="Fa" id="Comment" icon={faComment} />
                <FontAwesomeIcon className="Fa" id="Send" icon={faPaperPlane} />
                <span id="BookMark">BM</span>
            </div>
            <div ref={Likes} id="Likes" className="Likes">{post.likes} likes</div>
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