import React from "react";

function Product({ Products }) {
  return (
    <>
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
    </>
  );
}

export default Product;
