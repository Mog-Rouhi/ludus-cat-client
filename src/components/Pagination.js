import React from "react";
import { useState } from "react";

function Pagination({ cats, searchTerm, searchHandler }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [catsPerPage, setCatsPerpage] = useState(10);

  const [pageNumberLimit, setPageNumberLimit] = useState(10);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(10);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  // Get current cats
  const indexOfLastCat = currentPage * catsPerPage;
  const indexOfFirstCat = indexOfLastCat - catsPerPage;
  const currentCats = cats.slice(indexOfFirstCat, indexOfLastCat);

  // Page numbers
  const pageNumbers = [];
  const totalCats = cats.length;

  for (let i = 1; i <= Math.ceil(totalCats / catsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage == number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Previous page
  const isCurrentPageFirst = currentPage === 1;
  const isCurrentPageLast = currentPage === pageNumbers.length;

  const onPreviousPageClick = () => {
    paginate((currentPage) => currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit == 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // Next page
  const onNextPageClick = () => {
    paginate((currentPage) => currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // Create ... in page numbers display
  let pageIncrementBtn = null;
  if (pageNumbers.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={onNextPageClick}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={onPreviousPageClick}> &hellip; </li>;
  }

  // Load more button
  const handleLoadMore = () => {
    setCatsPerpage(catsPerPage + 10);
  };

  return (
    <div>
      <ul className="page-numbers pagination d-flex justify-content-center">
        <li>
          <button
            className="btn-page"
            onClick={onPreviousPageClick}
            disabled={currentPage == pageNumbers[0] ? true : false}
          >
            Previous
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button
            className="btn-page"
            onClick={onNextPageClick}
            disabled={
              currentPage == pageNumbers[pageNumbers.length] ? true : false
            }
          >
            Next
          </button>
        </li>
      </ul>

      <div className="fixed">
        <button onClick={handleLoadMore} className="load-more">
          Load More
        </button>
      </div>
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
