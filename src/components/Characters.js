import React, { useEffect, useState } from "react"
import { useQuery } from "react-query";
import Character from "./Character"

export default function Characters() {

    const fetchCharacters = async () => {
        const response = await fetch("https://apiinstacloneray.herokuapp.com/api/characters")
        return response.json();
    };

    const { data, status } = useQuery("characters", fetchCharacters)
    console.log(data)

    if (status === "loading") {
        return <div>Loading...</div>
    }

    if (status === "error") {
        return <div>Error...</div>
    }

    return (
        <div>
            {data.map((character) => (
                <Character character={character} />
            ))}
        </div>
    )
}