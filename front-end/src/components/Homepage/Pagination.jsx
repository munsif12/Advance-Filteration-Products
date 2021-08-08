import React from "react";
import { Button } from "antd";
function Pagination({
  SearchFiled,
  gotoPrevious,
  gotoNext,
  pages,
  setPageNumber,
  pageNumber,
}) {
  console.log(pages);
  return (
    <>
      {SearchFiled === "" && (
        <div className="pagesCountBar">
          <Button
            type="primary"
            className="pagination"
            disabled={pageNumber === 1 ? true : false}
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
            disabled={pageNumber === pages.length - 1 ? false : true}
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
