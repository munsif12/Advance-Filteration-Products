import React from "react";
import { Button } from "antd";
function Pagination({
  SearchFiled,
  gotoPrevious,
  gotoNext,
  pages,
  setPageNumber,
}) {
  return (
    <>
      {SearchFiled === "" && (
        <div className="pagesCountBar">
          <Button
            type="primary"
            className="pagination"
            disabled={pages.length >= 2 ? false : true}
            onClick={gotoPrevious}
          >
            Previous Page
          </Button>
          {pages.map((page, index) => (
            <Button
              key={index}
              type="primary"
              className="pagination"
              onClick={() => setPageNumber(page + 1)}
            >
              {page + 1}
            </Button>
          ))}
          <Button
            type="primary"
            className="pagination"
            disabled={pages.length >= 2 ? false : true}
            onClick={gotoNext}
          >
            Next Page
          </Button>
        </div>
      )}
    </>
  );
}

export default Pagination;
