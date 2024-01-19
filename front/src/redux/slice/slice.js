import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getData = createAsyncThunk("users/fetchByIdStatus", async () => {
  const response = await axios.get("http://localhost:3003/users");
  return response.data;
});

export const postData = createAsyncThunk(
  "users/post",
  async (newprod) => {
    const response = await axios.post(`http://localhost:3003/users`, newprod);
    return response.data;
  }
);

export const DeleteData = createAsyncThunk(
  "users/delete",
  async (id) => {
    const response = await axios.delete(`http://localhost:3003/users/${id}`);
    return response.data;
  }
);

const initialState = {
  products: [],
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  basket: JSON.parse(localStorage.getItem("cart")) || [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    Addtocart: (state, action) => {
      const { _id, prodname, imagecard, detail } = action.payload;
      let cartprodIndex = state.basket.findIndex((prod) => prod._id === _id);
      if (cartprodIndex !== -1) {
        state.basket[cartprodIndex].count += 1;
      } else {
        state.basket = [
          ...state.basket,
          { _id, prodname, imagecard, detail, count: 1 },
        ];
      }
      localStorage.setItem("cart", JSON.stringify(state.basket));
    },
    remvcart: (state, action) => {
      const { _id } = action.payload;
      let index = state.basket.findIndex((p) => p._id === _id);
      if (index !== -1) {
        if (state.basket[index].count > 1) {
          state.basket[index].count -= 1;
        } else {
          state.basket = state.basket.filter((p) => p._id !== _id);
        }
        localStorage.setItem("cart", JSON.stringify(state.basket));
      }
    },
    deletecart: (state, action) => {
      const { _id } = action.payload;
      state.basket = state.basket.filter((p) => p._id !== _id);
      localStorage.setItem("cart", JSON.stringify(state.basket));
    },

    addWish: (state, action) => {
      const { _id, prodname, detail, imagecard } = action.payload;
      let index = state.wishlist.findIndex((p) => p._id === _id);

      if (index !== -1) {
        state.wishlist = state.wishlist.filter((p) => p._id !== _id);
      } else {
        state.wishlist.push({ _id, prodname, detail, imagecard });
      }
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getData.fulfilled, (state, action) => {
      state.products = [...action.payload];
    });
    builder.addCase(postData.fulfilled, (state, action) => {
      state.products.push(action.payload);
    });
    builder.addCase(DeleteData.fulfilled, (state, action) => {
      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
    });
  },
});

export const { Addtocart, remvcart, deletecart, addWish } =
  counterSlice.actions;

export default counterSlice.reducer;
