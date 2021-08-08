import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import { Button } from "antd";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
function WishlistedProducts() {
  const history = useHistory();
  const [wishlistItems, setwishlistItems] = useState([]);
  const [filteredWishliastedItems, setfilteredWishliastedItems] = useState([]);
  function getItemFromLocalSotrageAndMakeAnArray() {
    // console.log(localStorage.getItem("Wislisted-Product").split(","));
    const getlikedItemsFromLocalStorage = localStorage
      .getItem("removedDublicatedWislistedProducts")
      .split(",");
    // .filter((item, index, self) => self.indexOf(item) === index); //to remove duplicate
    getlikedItemsFromLocalStorage.splice(0, 1); //to remove the first comma [",","ids","ids"]
    return getlikedItemsFromLocalStorage;
  }
  async function fetchProductDetail() {
    const getlikedItemsFromLocalStorage =
      getItemFromLocalSotrageAndMakeAnArray();
    const { data } = await axios.get(
      `http://localhost:8000/products/wishlisted`
    );
    setwishlistItems(data.user);
    // eslint-disable-next-line array-callback-return
    const matchIds = wishlistItems.filter((item) => {
      if (getlikedItemsFromLocalStorage.includes(item._id)) {
        return item._id;
      }
    });
    setfilteredWishliastedItems(matchIds);
  }
  function numberFormater(number, type) {
    return (
      <NumberFormat
        value={number}
        displayType={"text"}
        thousandSeparator={true}
        thousandsGroupStyle="lakh"
        decimalScale={2}
        fixedDecimalScale={type === "curr" ? true : false}
      />
    );
  }
  useEffect(() => {
    fetchProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function removeItemFromWishlist(pId) {
    const wishlistedProducts = getItemFromLocalSotrageAndMakeAnArray();
    console.log(wishlistedProducts);
    const removeTheIdFromArray = wishlistedProducts.filter(
      (item) => item !== pId
    );
    localStorage.setItem(
      "removedDublicatedWislistedProducts",
      `,${removeTheIdFromArray.join(",")}`
    );
  }
  return (
    <div className="container">
      <div className="titleWishlistedProducts row">
        <h1>Wishlisted Products</h1>
      </div>
      <div className="w_Products itemsWrapperWishlist">
        {filteredWishliastedItems.length === 0 ? (
          <div className="noLikedProducts">
            <h1>You Have No Liked Product</h1>
            <Button onClick={() => history.push("/")}>Go Shopping</Button>
          </div>
        ) : (
          filteredWishliastedItems.map((prod, index) => (
            <div
              className="row w_singleProd w_prod"
              key={index}
              // onClick={() => history.push(`/product/${prod._id}`)}
            >
              <div
                key={index}
                className={`W_product${index + 1} w_commonProduct`}
              >
                <div className="w_imgBox">
                  <img src={prod.imgUrl} alt={prod.name} />
                </div>
                <div className="nameAndDesc">
                  <div className="w_productName">
                    <h4>{prod.name}</h4>
                  </div>
                  <div className="w_productDesc">
                    <p>{prod.description.slice(0, 96)} ... </p>
                  </div>
                </div>
                <div className="priceCIS">
                  <div className="w_price">
                    <p className="w_price-after">
                      Price :{numberFormater(prod.price, "curr")} Rs
                    </p>
                  </div>
                  <div className="w_CIS">
                    <span>Count In Stock: {prod.countInStock}</span>
                  </div>
                </div>
                <div
                  className="removeForLike"
                  onClick={() => removeItemFromWishlist(prod._id)}
                >
                  <abbr title="Remove from Wishlist">
                    <RemoveCircleOutlineIcon />
                  </abbr>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    /* just to refr */
  );
}
export default WishlistedProducts;
