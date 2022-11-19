import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import CatSection from "../components/CatSection";

const url = "http://localhost:5005";
function Cat() {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [catsPerPage, setCatsPerpage] = useState(10);
  const [pageRange, setPageRange] = useState(20);

  const getAllCats = () => {
    axios
      .get(`${url}/api/cats/tags`)
      .then((response) => {
        setCats(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error getting cats", err);
      });
  };

  useEffect(() => {
    getAllCats();
  }, []);

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

  const setLastPageAsCurrent = () => {
    if (currentPage > pageNumbers.length) {
      setCurrentPage(pageNumbers.length);
    }
  };

  const displayPage = () => {};

  //////////////

  let isPageNumberOutOfRange;

  // const pageNumbers = [...new Array(pagesCount)].map((_, index) => {
  //   const pageNumber = index + 1;
  //   const isPageNumberFirst = pageNumber === 1;
  //   const isPageNumberLast = pageNumber === pagesCount;
  //   const isCurrentPageWithinTwoPageNumbers =
  //     Math.abs(pageNumber - currentPage) <= 2;

  //   if (
  //     isPageNumberFirst ||
  //     isPageNumberLast ||
  //     isCurrentPageWithinTwoPageNumbers
  //   ) {
  //     isPageNumberOutOfRange = false;
  //     return (
  //       <Pagination.Item
  //         key={pageNumber}
  //         onClick={() => onPageNumberClick(pageNumber)}
  //         active={pageNumber === currentPage}
  //       >
  //         {pageNumber}
  //       </Pagination.Item>
  //     );
  //   }

  //   if (!isPageNumberOutOfRange) {
  //     isPageNumberOutOfRange = true;
  //     return <Pagination.Ellipsis key={pageNumber} className="muted" />;
  //   }

  //   return null;
  // });

  //////////////

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">CATS</h1>
      <nav>
        <ul className="pagination">
          <li class="page-item">
            <a
              class="page-link"
              onClick={() => onPreviousPageClick()}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
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
              onClick={() => onNextPageClick()}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next Page</span>
            </a>
          </li>
        </ul>
      </nav>

      <ul className="">
        <div className="cats-per-page container">
          {/* list-group mb-4 */}
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
  );
}

export default Cat;
