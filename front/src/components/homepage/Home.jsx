import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Addtocart, getData, addWish } from "../../redux/slice/slice";
import { Helmet } from "react-helmet";
const Home = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getData());
  }, []);

  const [sortingCriteria, setSortingCriteria] = useState("a");

  const handleSortingChange = (value) => {
    setSortingCriteria(value);
  };

  const getSortedProducts = () => {
    switch (sortingCriteria) {
      case "a":
        return [...products].sort((p, q) =>
          p.prodname.localeCompare(q.prodname)
        );
      case "z":
        return [...products].sort((p, q) =>
          q.prodname.localeCompare(p.prodname)
        );
      case "price":
        return [...products].sort((p, q) => p.price - q.price);
      // break;
      default:
        return products;
    }
  };
  const sortedProducts = getSortedProducts();

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>Home</div>
      <button
        onClick={() => {
          navigate("/navbar");
        }}
      >
        Navbar
      </button>
      <button
        onClick={() => {
          navigate("/basket");
        }}
      >
        Basket
      </button>
      <button
        onClick={() => {
          navigate("/wishlist");
        }}
      >
        Wishlist
      </button>
      <button
        onClick={() => {
          navigate("/add");
        }}
      >
        Add
      </button>

      <select
        name=""
        id=""
        value={sortingCriteria}
        onChange={(e) => handleSortingChange(e.target.value)}
      >
        <option value="a">A-Z</option>
        <option value="z">Z-A</option>
        <option value="price">price</option>
      </select>

      {sortedProducts &&
        sortedProducts.map((p) => {
          return (
            <Link style={{textDecoration:"none"}} to={`/detail/${p._id}`}>
              <div key={p._id} className="card">
                <h1>{p.prodname}</h1>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(Addtocart(p));
                  }}
                >
                  cart
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    dispatch(addWish(p));
                  }}
                >
                  wish
                </button>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default Home;
