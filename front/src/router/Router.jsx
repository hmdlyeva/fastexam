import { createBrowserRouter } from "react-router-dom";
import Home from "../components/homepage/Home";
import Navbar from "../components/navbar/Navbar";
import Basket from "../components/basket/Basket";
import Wishlist from "../components/wishlist/Wishlist";
import Add from "../components/addpage/Add";
import Detail from "../components/detailpage/Detail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/navbar",
    element: <Navbar />,
  },
  {
    path: "/basket",
    element: <Basket />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
]);
 export default router