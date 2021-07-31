import React, { useState, useEffect } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import { useLocation } from "react-router-dom";
import Product from "../../components/Homepage/Product";
import Pagination from "../../components/Homepage/Pagination";
import MainFilterDrawer from "../../components/Homepage/MainFilterDrawer";
import SearchProduct from "../../components/Homepage/SearchProduct";

function AllProducts() {
  const location = useLocation();
  const params = location.search && location.search;
  console.log(params);

  const [SearchFiled, setSearchFiled] = useState("");
  const [Products, setProducts] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  const [filter, setfilter] = useState("");
  const [sorting, setsorting] = useState("");
  //if pages = 5 then the result of below array is [1,2,3,4,5]
  const pages = new Array(totalPages).fill(null).map((item, index) => index);
  console.log(pages.length);
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
