import React, { useRef } from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const url = process.env.REACT_APP_URL || "http://localhost:5005";

function Cat() {
  const inputEl = useRef("");
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [loading, setLoading] = useState(true);

  const getAllCats = () => {
    axios
      .get(`${url}/api/cats/tags`)
      .then((response) => {
        const allTags = [];
        response.data.forEach((tag) => {
          allTags.push(tag.toLowerCase());
        });
        setCats(allTags);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error getting cats", err);
      });
  };

  useEffect(() => {
    getAllCats();
  }, []);

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newCatList = cats.filter((cat) => {
        return cat.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newCatList);
    } else {
      setSearchResults(cats);
    }
  };

  return (
    <div className="">
      <RiseLoader
        color="gray"
        loading={loading}
        size={10}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <div className="container mt-5">
        <h1 className="text-dark mb-3">CATS</h1>
        <Search
          searchTerm={searchTerm}
          inputEl={inputEl}
          searchKeyWord={searchHandler}
        />
        <Pagination
          cats={searchTerm.length < 1 ? cats : searchResults}
          searchTerm={searchTerm}
          searchKeyWord={searchHandler}
        />
      </div>
    </div>
  );
}

export default Cat;
