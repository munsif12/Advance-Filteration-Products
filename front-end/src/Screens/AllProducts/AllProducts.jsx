import React, { useState, useEffect } from "react";
import { Drawer, Button } from "antd";
import CallReceivedIcon from "@material-ui/icons/CallReceived";
import NestedDrawer from "./Drawer";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import { useParams } from "react-router-dom";
function AllProducts() {
  const [visible, setvisible] = useState(false);
  const [childDrawer, setChildDrawer] = useState();
  const [SearchFiled, setSearchFiled] = useState("");
  const [Products, setProducts] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pages = new Array(totalPages).fill(null).map((item, index) => index);
  // state = { visible: false, childrenDrawer: false };
  async function fetchProducts(pageNumber) {
    if (SearchFiled) {
      const { data } = await axios.get(
        `http://localhost:8000/?name[regex]=${SearchFiled}&name[options]=i&page=${pageNumber}&limit=4`
      );
      setProducts(data);
      setTotalPages(data.totalPages);
    } else {
      const { data } = await axios.get(
        `http://localhost:8000/?page=${pageNumber}&limit=4`
      );
      setProducts(data);
      setTotalPages(data.totalPages);
    }
  }
  useEffect(() => {
    //create an axios fetch request to get the
    fetchProducts(pageNumber);
  }, [SearchFiled, pageNumber]);
  function gotoNext() {
    setPageNumber(Math.min(totalPages, pageNumber + 1));
  }
  function gotoPrevious() {
    setPageNumber(Math.max(1, pageNumber - 1));
  }
  return (
    <div className="all_product container">
      <div className="Searchbarwrapper row">
        <div className="searchBar col-xs-12 col-lg-12 col-md-12">
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

/* 

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
      </div> 
  */
