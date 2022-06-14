import React, { useRef, useState } from "react"
import './Createpost.scss';
import ImgPlaceHolder from '../../Imgs/upload.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faPaperPlane, faPlus, faCompass, faHeart } from '@fortawesome/free-solid-svg-icons'
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from "react-router-dom";

export default function CreatePost(props) {
    const navigate = useNavigate();
    const [isToggled, setisToggled] = useState(false)
    const UrlValue = useRef(null);
    const Description = useRef(null);
    const ImagePreview = useRef(null);
    const PostLoading = useRef(null);
    let GeneratedImageUrl = sessionStorage.getItem('ImageToPost')

    const fileSelectedHandler = event => {
        const formdata = new FormData()
        formdata.append("image", event.target.files[0])
        fetch("https://api.imgur.com/3/upload/", {
            method: "post",
            headers: {
                Authorization: "Client-ID 1b600c51c02423d"
            },
            body: formdata
        }).then(data => data.json()).then(data => {
            sessionStorage.setItem('ImageToPost', data.data.link);
            GeneratedImageUrl = data.data.link
            console.log(GeneratedImageUrl)
            ImagePreview.current.src = GeneratedImageUrl
        })


    }
    function setData() {
        console.log("Description", Description.current.value)

        SendPost(Description.current.value)

        setTimeout(() => {
            ImagePreview.current.style.display = "none"
            PostLoading.current.style.display = "block"
        }, 500);
        setTimeout(() => {
            navigate("/");
        }, 3000);

    }

    const SendPost = async (description) => {
        let Name = "Raygud"
        let ProfilePicture = "https://i.imgur.com/rNUAUlk.jpeg"
        let Likes = 0
        let Time = 1
        let Description = description
        let Comments = 0
        let image = sessionStorage.getItem('ImageToPost')
        let Liked = null

        const data = { Name, ProfilePicture, Likes, Time, Description, Comments, image, Liked };
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        const response = await fetch('http://localhost:3001/api/Post', options);
        const json = await response.json(setData);
        console.log(json);


    }
    return (
        <>
            <Navbar ProfileImg={sessionStorage.getItem('key')} />

            <div id="Form"> {/*Dogshit Refresh on form now its a div */}
                <svg ref={PostLoading} id="Loading" width="390" height="390" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="1" y="1" rx="1" width="10" height="10"><animate id="a" begin="0;l.end" attributeName="x" dur="0.35s" values="1;13" fill="freeze" /><animate id="d" begin="c.end" attributeName="y" dur="0.35s" values="1;13" fill="freeze" /><animate id="g" begin="f.end" attributeName="x" dur="0.35s" values="13;1" fill="freeze" /><animate id="j" begin="i.end" attributeName="y" dur="0.35s" values="13;1" fill="freeze" /></rect><rect x="1" y="13" rx="1" width="10" height="10"><animate id="b" begin="a.end" attributeName="y" dur="0.35s" values="13;1" fill="freeze" /><animate id="e" begin="d.end" attributeName="x" dur="0.35s" values="1;13" fill="freeze" /><animate id="h" begin="g.end" attributeName="y" dur="0.35s" values="1;13" fill="freeze" /><animate id="k" begin="j.end" attributeName="x" dur="0.35s" values="13;1" fill="freeze" /></rect><rect x="13" y="13" rx="1" width="10" height="10"><animate id="c" begin="b.end" attributeName="x" dur="0.35s" values="13;1" fill="freeze" /><animate id="f" begin="e.end" attributeName="y" dur="0.35s" values="13;1" fill="freeze" /><animate id="i" begin="h.end" attributeName="x" dur="0.35s" values="1;13" fill="freeze" /><animate id="l" begin="k.end" attributeName="y" dur="0.35s" values="1;13" fill="freeze" /></rect></svg>

                {!isToggled ? (
                    <>
                        <button onClick={() => setisToggled(!isToggled)}>Next</button>
                        {GeneratedImageUrl != null ? (<img ref={ImagePreview} src={GeneratedImageUrl} id="img" height="390px" />) : (<><img ref={ImagePreview} src={ImgPlaceHolder} id="img" height="390px" /></>)}
                        <br />
                        <input type="file" onChange={fileSelectedHandler} />
                        <br />
                        <strong>
                            <p id="url"></p>
                        </strong>
                    </>
                ) : (
                    <>
                        {GeneratedImageUrl != null ? (<img ref={ImagePreview} src={GeneratedImageUrl} id="img" height="390px" />) : (<><img ref={ImagePreview} src={ImgPlaceHolder} id="img" height="390px" /></>)}
                        <button onClick={() => setisToggled(!isToggled)}>Back</button>
                        <button onClick={() => setData()}>Submit</button>
                        <label htmlFor="">Description</label>
                        <input type="text" ref={Description} />


                    </>
                )}
            </div>
        </>
    );
}