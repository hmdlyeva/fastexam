import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Addtocart, getData, remvcart, deletecart } from "../../redux/slice/slice";
const Basket = () => {
  const products = useSelector((state) => state.products.basket);
  const dispatch = useDispatch();
  return (
    <div>
      {products &&
        products.map((p) => {
          return (
            <div key={p._id} className="card">
              <h1>{p.prodname}</h1>
              <button
                onClick={() => {
                  dispatch(Addtocart(p));
                }}
              >
                +
              </button>
              <p>{p.count}</p>
              <button
              onClick={() => {
                dispatch(remvcart(p));
              }}
              >
                -
              </button>
              <button
              onClick={() => {
                dispatch(deletecart(p));
              }}
              >
                delete
              </button>
            </div>
          );
        })}
    </div>
  );
};

export default Basket;
