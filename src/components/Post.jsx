import React, { useState, useRef } from "react"
import './Post.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from "react-query";


export default function Post({ post }) {
    const ReadMoreText = useRef(null);
    const Liked = useRef(null);
    const Likes = useRef(null);
    const [count, ReadMore] = useState(post.Description.substr(0, 30) + "...");
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

    const fetchComments = async () => {
        const response = await fetch("http://localhost:3001/api/Posts") //http://localhost:3000/api/Posts - https://apiinstacloneray.herokuapp.com/api/Posts
        return response.json();
    };

    const { data, status } = useQuery("Comments", fetchComments)
    console.log(data)

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "error") {
        return <div>Error...</div>
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
                <img src={post.ProfilePicture}></img>
                <h2>{post.Username}</h2>
                <div>...</div>
            </div>
            <img src={post.Image}></img>
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
            <div ref={Likes} id="Likes" className="Likes">5 likes</div>
            <div id="Description">
                <h5>{post.Name}</h5>
                <p>{post.Description.length > 27 ? (
                    <> <span>{count}</span> <span ref={ReadMoreText} onClick={() => ReadMore(post.Description) + RemoveMe()}>more</span></>
                ) : (
                    post.Description

                )}</p>

            </div>
            <div id="CommentPw">{ }</div>
            <div id="Time">5 HOURS AGO</div>
        </div>
    )
}