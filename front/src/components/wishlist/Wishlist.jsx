import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { addWish } from "../../redux/slice/slice";
const Wishlist = () => {
    const products = useSelector((state) => state.products.wishlist);
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
                  dispatch(addWish(p));
                }}
              >
                Wish
              </button>
             
            </div>
          );
        })}
    </div>
  )
}

export default Wishlist