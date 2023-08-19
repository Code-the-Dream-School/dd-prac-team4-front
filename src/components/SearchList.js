import React, { useState, useEffect } from "react";

const SearchList = () => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    try {
    // Fetching from backend API
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    // loging results
    console.log("Fetched data:", data); // Log the fetched data
    setResults(data);
  } catch(error) {
    console.error("Error fetching", error);
  }
};

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <ul>
      {results.map((result) => (
        <li key={result.id}>{result.name}</li>
      ))}
    </ul>
  );

};

export default SearchList;
