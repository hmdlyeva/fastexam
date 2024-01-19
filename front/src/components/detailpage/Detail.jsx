import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addWish, Addtocart } from "../../redux/slice/slice";
import { useParams } from 'react-router-dom';
const Detail = () => {
   const {id} = useParams()
   const products = useSelector((state) => state.products.products);
   const dispatch = useDispatch();
   let p = products.find((p)=>p._id === id)
  return (
    <div>
         <div key={p._id} className="card">
              <h1>{p.prodname}</h1>
              <button
                onClick={() => {
                  dispatch(addWish(p));
                }}
              >
                Wish
              </button>
              <button
                onClick={() => {
                  dispatch(Addtocart(p));
                }}
              >
                Cart
              </button>
             
            </div>
    </div>
  )
}

export default Detail