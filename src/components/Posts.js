import React, { useEffect, useState } from "react"
import { useQuery } from "react-query";
import Post from "./Post"

export default function Posts() {

    const fetchPosts = async () => {
        const response = await fetch("http://localhost:3001/api/Posts") //http://localhost:3000/api/Posts - https://apiinstacloneray.herokuapp.com/api/Posts
        return response.json();
    };

    const { data, status } = useQuery("Posts", fetchPosts)
    console.log(data)

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "error") {
        return <div>Error...</div>
    }

    return (
        <div>
            {data.map((post) => (
                <Post post={post} />
            ))}
        </div>
    )
}

















// import React, { useEffect, useState } from "react"
// import { useQuery } from "react-query";
// import Character from "./Character"

// export default function Characters() {

//     const fetchCharacters = async () => {
//         const response = await fetch("https://apiinstacloneray.herokuapp.com/api/characters")
//         return response.json();
//     };

//     const { data, status } = useQuery("characters", fetchCharacters)
//     console.log(data)

//     if (status === "loading") {
//         return <div>Loading...</div>
//     }

//     if (status === "error") {
//         return <div>Error...</div>
//     }

//     return (
//         <div>
//             {data.map((character) => (
//                 <Character character={character} />
//             ))}
//         </div>
//     )
// }