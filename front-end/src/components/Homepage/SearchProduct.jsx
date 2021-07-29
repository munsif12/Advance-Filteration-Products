import React from "react";
import SearchIcon from "@material-ui/icons/Search";
function SearchProduct({ SFiled: SearchFiled, setSearchFiled }) {
  return (
    <>
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
    </>
  );
}

export default SearchProduct;
