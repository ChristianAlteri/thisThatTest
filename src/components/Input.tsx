import axios from "axios";
import sha256 from 'crypto-js/sha256';

import { useEffect, useState } from "react";

const publicAPI = process.env.PUBLIC_API;
const privateAPI = process.env.PRIVATE_API;
const api = 'eadd21a9c03e4f31830e6422ad60d1371e99368a'

const timestamp = Date.now()
//@ts-ignore
const message = timestamp + privateAPI + publicAPI;
const hash = sha256(message);
const url = `http://gateway.marvel.com/v1/public/characters?ts=${timestamp}&hash=${hash}&apikey=${api}`;


const Input = () => {
    const [options, setOptions] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                // Update state based on the response
                // setOptions(response.data.results);
                console.log(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function if needed
        };
    }, []);

    // const handleSubmit = async (event: any) => {
    //     event.preventDefault();
    //     try {
    //         const response = await axios.get(url);
    //         // Update state based on the response
    //         // setOptions(response.data.results);
    //         console.log(response);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // };

    return (
        // <form onSubmit={handleSubmit}>
        <form >
            <input
                className="input"
                type="text"
                placeholder="Type your favorite marvel character"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default Input;
