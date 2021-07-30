import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Drawer } from "antd";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import { TextField } from "@material-ui/core";
function Price({ pageNumber, setfilter }) {
  const history = useHistory();
  const [childDrawerPrice, setChildDrawerPrice] = useState("");
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(100);

  function getMinMaxPrice() {
    let url = `?price[gte]=${minPrice}&price[lte]=${maxPrice}&page=${pageNumber}&limit=10`;
    setfilter(url);
    history.push(url);
  }

  function showChildDrawerPrice() {
    setChildDrawerPrice(true);
  }
  function closeChildDrawerPrice() {
    setChildDrawerPrice(false);
  }
  return (
    <>
      <div className="filter_price f_common" onClick={showChildDrawerPrice}>
        <p type="primary">Price</p>
        <CallReceivedIcon />
      </div>
      <Drawer
        title="Set your price range"
        width={420}
        closable={false}
        onClose={closeChildDrawerPrice}
        visible={childDrawerPrice}
      >
        {/* material ui row */}
        <div className="minMaxPriceFiels">
          <div className="minMaxWrapper">
            <div className="minVal">
              <TextField
                type="number"
                size="small"
                label="Min Price"
                id="price"
                name="price"
                value={minPrice}
                onChange={(e) => setminPrice(e.target.value)}
                onBlur={getMinMaxPrice}
              />
            </div>
            <div className="maxPrice">
              <TextField
                type="number"
                size="small"
                label="Max Price"
                id="price"
                name="price"
                value={maxPrice}
                onChange={(e) => setmaxPrice(e.target.value)}
                onBlur={getMinMaxPrice}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
}

export default Price;
