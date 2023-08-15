import React, { useState } from "react";

const SearchList = () => {
  const [results, setResults] = useState([]);

  const fetchResults = async () => {
    // Fetching from backend API
    const response = await fetch('http://localhost:8000/api/v1');
    const data = await response.json();
    setResults(data);
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
