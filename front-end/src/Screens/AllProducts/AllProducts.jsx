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
  const [Products, setProducts] = useState([]);

  // state = { visible: false, childrenDrawer: false };
  async function fetchProducts() {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    const limit = params.get("limit");
    console.log(page + " " + limit);
    if (SearchFiled) {
      console.log(SearchFiled);
      const { data } = await axios.get(
        `http://localhost:8000/?name[regex]=${SearchFiled}&name[options]=i&page=${params.get(
          "page"
        )}&limit=${params.get("limit")}`
      );
      console.log(data);
      setProducts(data);
    } else {
      const { data } = await axios.get(`http://localhost:8000/`);
      setProducts(data);
    }
  }

  useEffect(() => {
    //create an axios fetch request to get the
    fetchProducts();
  }, [SearchFiled]);
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
        {console.log(Products)}
        {Products.length === 0 ? (
          <h1>Soory no product available</h1>
        ) : (
          Products.map((prod, index) => (
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
