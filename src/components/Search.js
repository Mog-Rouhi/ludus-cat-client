import React from 'react';
import axios from "axios";
import { useState, useEffect, useContext } from "react";
const url = "http://localhost:5005";

function Search() {
    const [cats, setCats] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const getAllCats = () => {
        axios
          .get(`${url}/api/cats/tags`)
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
        {/* Search */}
        <section class="heads" id="search">
            <form>
              <div class="input-group">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="search-addon"
                  name="search"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
                {
                  cats.filter((val) => {
                    if (searchTerm !== "") {
                      if (
                        val.toLowerCase().includes(searchTerm.toLowerCase())
                      ) {
                        return val;
                      }
                }
                  })
                  //   .map((val, key) => {
                  //     return (
                  //       <div className="" key={key}>

                  // {val !== "" && (
                  //   <div className="cat-frame card">
                  //     <li key={key} className="list-group-item">
                  //       <img
                  //         className="cat-img"
                  //         src={`https://cataas.com/cat/${val}`}
                  //         onerror="this.style.display='none'"
                  //         alt="No Cat Picture"
                  //       />
                  //       <h6>#{val}</h6>
                  //     </li>
                  //   </div>
                  // )}

                  //       </div>
                  //     );
                  //   })
                }
              </div>
            </form>
          </section>
    </div>
  )
}

export default Search;

