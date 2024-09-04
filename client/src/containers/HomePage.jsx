import React, { useEffect, useState } from 'react';
import axios from 'axios';





const HomePage = () => {
    const apiRoute = "localhost"
    const [info, setInfo] = useState("");

    useEffect (() => {
        axios.get(`http://${apiRoute}:8080/`)
        .then((response) => {
            console.log(response.data);
            setInfo(response.data.message); //needs the access key "message" from the response in json being sent.
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    return(
        <div>
            {info &&
            <table>
                <thead>
                    <tr>
                        <th>
                            Data
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                        <td>{info}</td>
                    
                </tbody>
            </table>}
        </div>
    )

}

export default HomePage;