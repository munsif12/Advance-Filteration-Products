import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactImageMagnify from "react-image-magnify";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import NumberFormat from "react-number-format";
import { Button } from "@material-ui/core";
import RealtedProducts from "../../components/ProductDetail/RealtedProducts";
import axios from "axios";
function ProductDetail() {
  const [prodDetails, setProdDetails] = useState({});
  const [RelatedProducts, setRelatedProducts] = useState([]);
  console.log(RelatedProducts);
  const params = useParams();
  const [Qty, setQty] = useState(1);
  const [favIcon, setFavIcon] = useState(false);

  async function fetchProductDetail() {
    const { data } = await axios.get(
      `http://localhost:8001/product/${params.id}`
    );
    setProdDetails(data);
    const fetchRelatedTypes = await fetch(
      `http://localhost:8001/product/?type[regex]=${data.type}&type[options]=i`
    );
    const relatedProducts = await fetchRelatedTypes.json();
    console.log(relatedProducts);
    setRelatedProducts(relatedProducts.user);
  }
  useEffect(() => {
    fetchProductDetail();
  }, [params]);
  function numberFormater(number, type) {
    return (
      <NumberFormat
        value={number}
        displayType={"text"}
        // thousandsGroupStyle={true}
        thousandSeparator={true}
        thousandsGroupStyle="lakh"
        decimalScale={2}
        fixedDecimalScale={type === "curr" ? true : false}
      />
    );
  }

  return (
    <div className="ProductDetail">
      <div className="PdetailsWrapper container">
        <div className="row gap-4 rowHeight">
          <div className="col col-md-5 col-lg-5  p-3 productImage">
            <div className="pImageWrapper">
              {/* <img src={prodDetails.imgUrl} alt={prodDetails.name} /> */}
              <ReactImageMagnify
                className="smallImg"
                style={{ height: "350px" }}
                {...{
                  smallImage: {
                    alt: prodDetails.name,
                    isFluidWidth: true,
                    src: prodDetails.imgUrl,
                  },
                  largeImage: {
                    src: prodDetails.imgUrl,
                    width: 1700,
                    height: 2200,
                  },
                  enlargedImageContainerDimensions: {
                    width: "150%",
                    height: "150%",
                  },
                  enlargedImageContainerStyle: {
                    backgroundColor: "white",
                    borderRadius: "5px",
                    boxShadow: "0 0px 15px 8px #49494992",
                    zIndex: "1001",
                  },
                  fadeDurationInMs: 400,
                  // enlargedImagePosition: "over"
                }}
              />
            </div>
          </div>
          <div className="col col-md-4 col-lg-4 productDetails">
            <div className="prodName">
              <h1>{prodDetails.name}</h1>
            </div>
            <div className="prodRating">
              <p>rating comming soon</p>
            </div>
            <div className="prodDesc">
              <p>{prodDetails.description}</p>
            </div>
            <div className="prodPrice">
              <h5>Price: {numberFormater(prodDetails.price, "curr")} Rs.</h5>
            </div>
            <div className="prodPrice">
              <h5>
                Status :
                {prodDetails.countInStock > 0
                  ? "Stock is available"
                  : "Out of stock"}
              </h5>
            </div>
          </div>
          <div className="col col-md-2 col-lg-2 addtoCart">
            <div className="prodQuantity">
              <p>
                Quantity :
                <select value={Qty} onChange={(e) => setQty(e.target.value)}>
                  {/* //bit confued loking forward to implement */}
                  {[...Array(prodDetails.countInStock).keys()].map((val) => (
                    <option key={val + 1} value={val + 1}>
                      {val + 1}
                    </option>
                  ))}
                </select>
              </p>
            </div>
            <div className="addToCartWrapper">
              <Button color="primary">Add to Cart</Button>
              <Button color="primary" onClick={() => setFavIcon(!favIcon)}>
                {favIcon ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <RealtedProducts realtedProducts={RelatedProducts} />
    </div>
  );
}

export default ProductDetail;
