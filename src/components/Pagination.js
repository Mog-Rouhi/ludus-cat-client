import React from "react";
import { useState } from "react";

function Pagination({ cats }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [catsPerPage, setCatsPerpage] = useState(10);

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
    <div>
      <ul className="pagination d-flex justify-content-center">
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
            <span class="sr-only">Next Page </span>
            <span aria-hidden="true">  &raquo; </span>
          </a>
        </li>
      </ul>
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
  );
}

export default Pagination;
