import React from "react";

function Search({ handleChange }) {
  return (
    <div className="text-center" id="search" style={{ marginLeft: "auto" }}>
      <div className="d-flex justify-content-center">
        <form>
          <input
            type="text"
            className="form-control rounded"
            placeholder="Search..."
            aria-label="Search"
            aria-describedby="search-addon"
            name="search"
            autoComplete="on"
            onChange={(event) => {
              handleChange(event);
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default Search;
