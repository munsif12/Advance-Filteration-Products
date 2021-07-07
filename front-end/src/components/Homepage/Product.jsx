import React from "react";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
function Product({ Products }) {
  const history = useHistory();
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
    <>
      {Products.length === 0 ? (
        <h1>Sorry no product available</h1>
      ) : (
        Products.map((prod, index) => (
          <div
            className="col-md-12 singleProd prod"
            onClick={() => history.push(`/product/${prod._id}`)}
          >
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
                    <span className="price-after">
                      {numberFormater(prod.price, "curr")} Rs.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default Product;
