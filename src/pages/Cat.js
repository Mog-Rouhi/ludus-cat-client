import axios from "axios";
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import Pagination from "../components/Pagination";
import Search from "../components/Search";

const url = "http://localhost:5005";

function Cat() {
  const [cats, setCats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const searchedCats = () => {
    if (searchTerm == "") {
      setCats([...cats]);
    } else if (searchTerm !== "") {
      const catsMatch = cats.filter((item) => {
        return item.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setCats(catsMatch);
    }
    // else {
    //   setCats([...cats]);
    // }
  };

  useEffect(() => {
    searchedCats();
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
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
        <Search handleChange={handleChange} />
        <Pagination cats={[...cats]} />
      </div>
    </div>
  );
}

export default Cat;
