import { Drawer, Button } from "antd";
import React, { useState } from "react";
import Sort from "../../components/Homepage/Sort";
import Price from "../../components/Homepage/Price";
function MainFilterDrawer({ setsorting, setfilter, pageNumber }) {
  const [visible, setvisible] = useState(false);

  //sorting
  const [PriceOrder, setPriceOrder] = useState("price");

  function showDrawer() {
    setvisible(true);
  }
  function onClose() {
    setvisible(false);
  }
  function handleSortChange(e) {
    setPriceOrder(e.target.value);
    if (e.target.value === "price") {
      setsorting("price");
    } else if (e.target.value === "-price") {
      setsorting("-price");
    } else if (e.target.value === "-createdAt") {
      setsorting("-createdAt");
    }
  }
  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        className="filterAndSortButton "
      >
        Filter & Sort
      </Button>
      <Drawer
        title="Filter & Sort"
        width={520}
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <Price pageNumber={pageNumber} setfilter={setfilter} />
        <Sort POrder={PriceOrder} handleSortChange={handleSortChange} />
      </Drawer>
    </>
  );
}

export default MainFilterDrawer;
