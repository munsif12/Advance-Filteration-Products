import React, { useState } from "react";
import { Drawer } from "antd";
import {
  FormControl,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
function Sort({ POrder: PriceOrder, handleSortChange }) {
  const [ChildDrawerNewest, setChildDrawerNewest] = useState("");
  function showChildDrawerNewest() {
    setChildDrawerNewest(true);
  }
  function closeChildDrawerNewest() {
    setChildDrawerNewest(false);
  }
  return (
    <>
      <div className="filter_color f_common" onClick={showChildDrawerNewest}>
        <p type="primary">Sort</p>
        <CallReceivedIcon />
      </div>
      <Drawer
        title="Sort by "
        width={320}
        closable={false}
        onClose={closeChildDrawerNewest}
        visible={ChildDrawerNewest}
      >
        <Grid item xs={12} sm={12}>
          <FormControl compoent="filedset">
            <RadioGroup
              aria-label="Sort By"
              name="sort"
              value={PriceOrder}
              onChange={handleSortChange}
            >
              <FormControlLabel
                value="-price"
                control={<Radio />}
                label="Price :Highest to Lowest"
              />
              <FormControlLabel
                value="price"
                control={<Radio />}
                label="Price :Lowest to Highest"
              />
              <FormControlLabel
                value="-createdAt"
                control={<Radio />}
                label="Newest"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Drawer>
      <div className="filter_sort  f_common">
        <p type="primary">Color</p>
        <CallReceivedIcon />
      </div>
    </>
  );
}

export default Sort;
