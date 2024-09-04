import React, { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const apiRoute = "localhost"; // Ensure this is the correct API route
  const [info, setInfo] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://${apiRoute}:8080/`)
      .then((response) => {
        console.log(response.data);
        setInfo(response.data.message); // Ensure the response has a 'message' key
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch data. Please try again later.");
      });
  }, [apiRoute]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {error && <p className="text-red-500">{error}</p>}
      {info && (
        <table className="bg-white p-6 rounded-lg shadow-lg">
          <thead>
            <tr>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{info}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HomePage;
