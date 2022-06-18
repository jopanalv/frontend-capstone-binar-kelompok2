import React from "react";
import { Container } from "react-bootstrap";

const Product = ({ item }) => {
  return (
    <>
    <Container>
      <div className="container-fluid">
        <div className="row justify-content-center category">
          {item.map((Val) => {
            return (
              <div
                className="col-md-3 col-sm-6 py-3 my-3 card border-1"
                key={Val.id}
              >
                <div className="card-img-top text-center">
                  <img src={Val.image} className="photo w-75 pb-2" />
                </div>
                  <div className="card-title name mb-2">
                    {Val.name}
                  </div>
                  <div className="card-text type mb-3">{Val.category}</div>
                  <div className="card-title price mb-4">
                    Rp. {Val.price}
                  </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
    </>
  );
};


export default Product;