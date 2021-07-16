import React, { useState } from "react";
import { Drawer, Button } from "antd";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import NestedDrawer from "./Drawer";
function AllProducts() {
  const [visible, setvisible] = useState(false);
  const [childDrawer, setChildDrawer] = useState();

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
    <div className="all_product">
      <div className="filterArea">
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
          <div className="filter_price f_common" onClick={showChildDrawer}>
            <p type="primary">Price</p>
            <CallReceivedIcon />
            <NestedDrawer
              childDrawer={childDrawer}
              closeChildDrawer={closeChildDrawer}
              calledBy={"Price"}
            />
          </div>
          <div className="filter_color f_common" onClick={showChildDrawer}>
            <p type="primary">Color</p>
            <CallReceivedIcon />
            <NestedDrawer
              childDrawer={childDrawer}
              closeChildDrawer={closeChildDrawer}
              calledBy={"Color"}
            />
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
      </div>
      <div className="mainContent"></div>
    </div>
  );
}

export default AllProducts;
