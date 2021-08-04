import React, { useState, useRef } from "react";
import { Button } from "@material-ui/core";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Product from "../Homepage/Product";
function RealtedProducts({ realtedProducts }) {
  const ref = useRef(0);
  const [showScroolButtons, setshowScroolButtons] = useState(false);
  const scroll = (scrollOffset = 200) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <div className="relatedProducts container mt-5">
      <div className="relatedProdHeading">
        <h1>Related Products</h1>
      </div>
      <div
        className="wrapperSuggestedProduct"
        onMouseEnter={() => setshowScroolButtons(true)}
        onMouseLeave={() => setshowScroolButtons(false)}
      >
        <Button
          primary
          className="scrollLeftOnClick btnScrool"
          style={{
            display: showScroolButtons ? "inline" : "none",
          }}
          onClick={() => scroll(-200)}
          disabled={ref.current.scrollLeft === 0 ? true : false}
        >
          <ArrowBackIosIcon />
        </Button>
        <div className="relatedProductsList scrollbar" ref={ref} id="style-7">
          <Product Products={realtedProducts} />
        </div>

        <Button
          className="scrollRightOnClick btnScrool"
          style={{ display: showScroolButtons ? "inline" : "none" }}
          onClick={() => scroll(200)}
          disabled={ref.current.scrollLeft >= 1394 ? true : false}
        >
          <ArrowForwardIosIcon />
        </Button>
      </div>
    </div>
  );
}

export default RealtedProducts;
