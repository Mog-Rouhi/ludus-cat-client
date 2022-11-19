import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const url = "http://localhost:5005";
function Cat() {
  const [cats, setCats] = useState([]);

  const getAllCats = () => {
    axios
      .get(`${url}/api/cats`)
      .then((response) => {
        setCats(response.data);
      })
      .catch((err) => {
        console.log("error getting cats", err);
      });
  };

  useEffect(() => {
    getAllCats();
  }, []);

  return (
    <div>
      {cats.map((cat) => {
        return (
          <>
          {cat.tags.map(tag=>{
            return (
            <>
            <h1>{tag}</h1>
            <img src={`https://cataas.com/cat/${tag}`} />
            </>
            )
          })}
            
          </>
        );
      })}
    </div>
  );
}

export default Cat;
