import React, { useState, useEffect } from "react";
import { Drawer, Button, Typography } from "antd";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import NestedDrawer from "./Drawer";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import {
  FormControl,
  Grid,
  Slider,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
function AllProducts() {
  const history = useHistory();
  const location = useLocation();
  const params = location.search && location.search;
  console.log(params);
  const [visible, setvisible] = useState(false);
  const [childDrawerPrice, setChildDrawerPrice] = useState("");
  const [ChildDrawerNewest, setChildDrawerNewest] = useState("");
  const [SearchFiled, setSearchFiled] = useState("");
  const [Products, setProducts] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  //realted to slider
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(100);
  const [filter, setfilter] = useState("");
  //relatedToRadio
  const [PriceOrder, setPriceOrder] = useState("price");
  const [sorting, setsorting] = useState("");
  //if pages = 5 then the result of below array is [1,2,3,4,5]
  const pages = new Array(totalPages).fill(null).map((item, index) => index);
  // state = { visible: false, childrenDrawer: false };
  async function fetchProducts(pageNumber) {
    let query;
    if (params && !filter) {
      query = params;
    } else {
      query = filter;
    }
    if (sorting) {
      if (sorting.length === 0) {
        query = `?sort=${sorting}`;
      }
      query = `${query}&sort=${sorting}`;
    }

    if (SearchFiled) {
      if (!query) {
        const { data } = await axios.get(
          `http://localhost:8000/?name[regex]=${SearchFiled}&name[options]=i`
        );
        setProducts(data);
        setTotalPages(data.totalPages);
      } else {
        const { data } = await axios.get(
          `http://localhost:8000/${query}&name[regex]=${SearchFiled}&name[options]=i`
        );
        setProducts(data);
        setTotalPages(data.totalPages);
      }
    } else {
      if (!query) {
        const { data } = await axios.get(
          `http://localhost:8000/?page=${pageNumber}&limit=10`
        );
        setProducts(data);
        setTotalPages(data.totalPages);
      } else {
        const { data } = await axios.get(`http://localhost:8000/${query}`);
        setProducts(data);
        setTotalPages(data.totalPages);
      }
    }
  }
  useEffect(() => {
    //create an axios fetch request to get the
    fetchProducts(pageNumber);
  }, [SearchFiled, pageNumber, filter, sorting]);
  function gotoNext() {
    setPageNumber(Math.min(totalPages, pageNumber + 1));
  }
  function gotoPrevious() {
    setPageNumber(Math.max(1, pageNumber - 1));
  }
  function showDrawer() {
    setvisible(true);
  }
  function onClose() {
    setvisible(false);
  }
  function showChildDrawerPrice() {
    setChildDrawerPrice(true);
  }
  function closeChildDrawerPrice() {
    setChildDrawerPrice(false);
  }
  function showChildDrawerNewest() {
    setChildDrawerNewest(true);
  }
  function closeChildDrawerNewest() {
    setChildDrawerNewest(false);
  }
  function getMinMaxPrice() {
    let url = `?price[gte]=${minPrice}&price[lte]=${maxPrice}&page=${pageNumber}&limit=10`;
    setfilter(url);
    history.push(url);
  }
  function handleSortChange(e) {
    setPriceOrder(e.target.value);
    if (e.target.value === "price") {
      setsorting("price");
    } else if (e.target.value === "-price") {
      setsorting("-price");
    }
  }
  return (
    <div className="all_product container">
      <div className="Searchbarwrapper row">
        <div className="searchBar col-xs-8 col-lg-8 col-md-8">
          <form action="">
            <SearchIcon className="icons" />
            <input
              type="text"
              name="name"
              id="searchProduct"
              placeholder="Search for Product"
              value={SearchFiled}
              autoFocus="true"
              onChange={(e) => setSearchFiled(e.target.value)}
            />
          </form>
          <div className="filterArea">
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
              <div
                className="filter_price f_common"
                onClick={showChildDrawerPrice}
              >
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

              <div
                className="filter_color f_common"
                onClick={showChildDrawerNewest}
              >
                <p type="primary">Sort</p>
                <CallReceivedIcon />
              </div>
              <Drawer
                title="Two-level Drawer"
                width={320}
                closable={false}
                onClose={closeChildDrawerNewest}
                visible={ChildDrawerNewest}
              >
                <Grid item xs={12} sm={6}>
                  <Typography gutterBottom>Sort By</Typography>
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
                    </RadioGroup>
                  </FormControl>
                </Grid>
              </Drawer>
              <div className="filter_sort  f_common">
                <p type="primary">Color</p>
                <CallReceivedIcon />
              </div>
            </Drawer>
          </div>
        </div>
      </div>
      <div className="row Products">
        {Products.length === 0 ? (
          <h1>Sorry no product available</h1>
        ) : (
          Products.user.map((prod, index) => (
            <div className="col-md-12 singleProd">
              <div key={index} className={`product${index + 1} commonProduct`}>
                <div className="imgBox">
                  <img src={prod.imgUrl} alt={prod.name} />
                </div>
                <div className="infoBoxWrapper">
                  <div className="infoBox">
                    <div className="Prodname">
                      <p>{prod.name}</p>
                      <span>Count In Stock: {prod.countInStock}</span>
                    </div>
                    <div className="price">
                      <span className="price-after">{prod.price}</span>
                      <span className="price-before"> Rs.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {SearchFiled === "" && (
        <div className="pagesCountBar">
          <Button type="primary" className="pagination" onClick={gotoPrevious}>
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
          <Button type="primary" className="pagination" onClick={gotoNext}>
            Next Page
          </Button>
        </div>
      )}
    </div>
  );
}

export default AllProducts;
