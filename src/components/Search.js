import React from "react";

function Search({ searchTerm, inputEl, searchKeyWord }) {
  const handleChange = () => {
    searchKeyWord(inputEl.current.value);
  };
  return (
    <div className="text-center" id="search" style={{ marginLeft: "auto" }}>
      <div className="d-flex justify-content-center">
        <form className="ui search">
          <div className="ui icon input">
            <input
              ref={inputEl}
              type="text"
              className="form-control rounded prompt"
              placeholder="Search..."
              aria-label="Search"
              aria-describedby="search-addon"
              name="search"
              value={searchTerm}
              autoComplete="on"
              onChange={() => {
                handleChange();
              }}
            />
            <i className="search icon"></i>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Search;
