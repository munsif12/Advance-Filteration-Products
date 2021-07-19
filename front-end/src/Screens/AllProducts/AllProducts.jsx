import React, { useState } from "react";
import { Drawer, Button } from "antd";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import NestedDrawer from "./Drawer";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@material-ui/icons/Search";
function AllProducts() {
  const [visible, setvisible] = useState(false);
  const [childDrawer, setChildDrawer] = useState();
  const [SearchFiled, setSearchFiled] = useState("");

  // state = { visible: false, childrenDrawer: false };

  function showDrawer() {
    setvisible(true);
  }

  function onClose() {
    setvisible(false);
  }
  function showChildDrawer() {
    setChildDrawer(true);
  }

  function closeChildDrawer() {
    setChildDrawer(false);
  }

  return (
    <div className="all_product container">
      {/* <div className="filterArea">
        <Button type="primary" onClick={showDrawer}>
          Filter & Sort
        </Button>
        <Drawer
          title="Filter & Sort"
          width={520}
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <div className="filter_price f_common">
            <p type="primary">Price</p>
            <CallReceivedIcon />
          </div>
          <div className="filter_color f_common">
            <p type="primary">Color</p>
            <CallReceivedIcon />
          </div>
          <div className="filter_newest f_common">
            <p type="primary">Newest</p>
            <CallReceivedIcon />
          </div>
          <div className="filter_sort  f_common">
            <p type="primary">Sort</p>
            <CallReceivedIcon />
          </div>
        </Drawer>
      </div> */}
      <div className="mainContent row">
        <div className="searchBar col">
          <form action="">
            <SearchIcon />
            <input
              type="text"
              name="searchProduct"
              id="searchProduct"
              placeholder="Search"
              value={SearchFiled}
              onChange={(e) => setSearchFiled(e.target.value)}
            />
            <input
              type="submit"
              value="Submit"
              onClick={(e) => {
                e.preventDefault();
              }}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
