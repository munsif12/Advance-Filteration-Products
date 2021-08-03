import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import Product from "../../components/Homepage/Product";
import Pagination from "../../components/Homepage/Pagination";
import MainFilterDrawer from "../../components/Homepage/MainFilterDrawer";
import SearchProduct from "../../components/Homepage/SearchProduct";
import { Button } from "antd";

function AllProducts() {
  const history = useHistory();
  const location = useLocation();
  let params = location.search && location.search;
  const [SearchFiled, setSearchFiled] = useState("");
  const [Products, setProducts] = useState("");
  console.log(Products);
  console.log(Products);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setfilter] = useState("");
  const [sorting, setsorting] = useState("");
  //if pages = 5 then the result of below array is [1,2,3,4,5]
  const pages = new Array(totalPages).fill(null).map((item, index) => index);
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
          `http://localhost:8001/?name[regex]=${SearchFiled}&name[options]=i`
        );
        setProducts(data.user);
        setTotalPages(data.totalPages);
      } else {
        const { data } = await axios.get(
          `http://localhost:8001/${query}&name[regex]=${SearchFiled}&name[options]=i`
        );
        setProducts(data.user);
        setTotalPages(data.totalPages);
      }
    } else {
      if (!query) {
        const { data } = await axios.get(
          `http://localhost:8001/?page=${pageNumber}&limit=10`
        );
        setProducts(data.user);
        setTotalPages(data.totalPages);
      } else {
        const { data } = await axios.get(`http://localhost:8001/${query}`);
        setProducts(data.user);
        setTotalPages(data.totalPages);
      }
    }
  }
  useEffect(() => {
    //create an axios fetch request to get the
    fetchProducts(pageNumber);
  }, [SearchFiled, pageNumber, filter, sorting]);

  //pagination
  function gotoNext() {
    setPageNumber(Math.min(totalPages, pageNumber + 1));
  }
  function gotoPrevious() {
    setPageNumber(Math.max(1, pageNumber - 1));
  }

  return (
    <div className="all_product container">
      <div className="Searchbarwrapper row">
        <div className="searchBar col-xs-8 col-lg-8 col-md-8">
          <SearchProduct SFiled={SearchFiled} setSearchFiled={setSearchFiled} />
          <div className="filterArea">
            <MainFilterDrawer setsorting={setsorting} setfilter={setfilter} />
          </div>
          {params !== "" && (
            <Button onClick={() => history.push(`/${params}`)}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>
      <div className="row Products">
        <Product Products={Products} />
      </div>
      <Pagination
        SearchFiled={SearchFiled}
        gotoPrevious={gotoPrevious}
        gotoNext={gotoNext}
        pages={pages}
        setPageNumber={setPageNumber}
      />
    </div>
  );
}

export default AllProducts;
