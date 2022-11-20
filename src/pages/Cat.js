import axios from "axios";
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";


const url = "http://localhost:5005";

function Cat() {
  const [cats, setCats] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [catsPerPage, setCatsPerpage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const getAllCats = () => {
    axios
      .get(`${url}/api/cats/tags`)
      .then((response) => {
        const allTags = [];
        response.data.forEach((tag)=>{
            allTags.push(tag.toLowerCase())
        })
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



  console.log(searchTerm);

  const searchedCats = () => {
    if(searchTerm == ""){
        setCats([...cats])
    }
    else if (searchTerm !== "") {
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


  // Get current cats
  const indexOfLastCat = currentPage * catsPerPage;
  const indexOfFirstCat = indexOfLastCat - catsPerPage;
  const currentCats = cats.slice(indexOfFirstCat, indexOfLastCat);

  // Pagination
  const pageNumbers = [];
  const totalCats = cats.length;

  for (let i = 1; i <= Math.ceil(totalCats / catsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pageNumbers.length;

  const onPreviousPageClick = () => {
    paginate((currentPage) => currentPage - 1);
  };

  const onNextPageClick = () => {
    paginate((currentPage) => currentPage + 1);
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
      <nav>
        <ul className="pagination">
          <li class="page-item">
            <a
              class="page-link"
              onClick={() => onPreviousPageClick()}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo; </span>
              <span class="sr-only">Previous Page</span>
            </a>
          </li>
          {pageNumbers.map((number) => {
            <li key={number} className="page-item">
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>;
          })}
          <li class="page-item">
            <a
              class="page-link"
              style={{
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
              onClick={() => onNextPageClick()}
              aria-label="Next"
            >
              <span class="sr-only">Next Page</span>
              <span aria-hidden="true"> &raquo;</span>
            </a>
          </li>

          {/* Search */}
          <section class="heads" id="search">
            <form>
              <div class="input-group">
                <input
                  type="text"
                  class="form-control rounded"
                  placeholder="Search..."
                  aria-label="Search"
                  aria-describedby="search-addon"
                  name="search"
                  autoComplete="on"
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                  }}
                />
              </div>
            </form>
          </section>
        </ul>
      </nav>

      <ul className="">
        <div className="cats-per-page container ">
          {currentCats.map((tag, index) => {
            return (
              <div>
                {tag !== "" && (
                  <div className="cat-frame card">
                    <li key={index} className="list-group-item">
                      <img
                        className="cat-img"
                        src={`https://cataas.com/cat/${tag}`}
                        onerror="this.style.display='none'"
                        alt="No Cat Picture"
                      />
                      <h6>#{tag}</h6>
                    </li>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </ul>
    </div>
    </div>
  );
}

export default Cat;
