import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const initialState = {  
  whatShow: 'orders',
  signUpStatus: "idle",
  ordersStatus: "idle",
  loading: false,
  admin: null,
  errorSignUp: null,
  orders:null,
  errorLogIn: null,
};
export const orderDone = createAsyncThunk(
  "admin/orderDone",
  async (id, thunkAPI) => {

    let base_url = "https://shop-backend-zejv.onrender.com/api/orders/done"
    let {admin} = thunkAPI.getState().admin
    //let base_url = "https://goodal-mern.onrender.com/api/admin/signup";

    try {
      base_url=`${base_url}/${id}`
      const response = await fetch(base_url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${admin.token}`
        },
      });

      const data = await response.json();

      if (response.ok) {
       
        return data;
      } else {
        return thunkAPI.rejectWithValue({
          error: data.error,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)

export const readOrder = createAsyncThunk(
  "customer/readOrder",
  async (data, thunkAPI) => {
    let page=''
    let done=false
    const { admin } = thunkAPI.getState().admin
    if(data){
      if(data.page){
        page=`&page=${data.page}`
      }
      if(data.done){
        done=true
      }
    }

     let base_url = "https://shop-backend-zejv.onrender.com/api/orders/getAll";

   // let base_url ="https://goodal-mern.onrender.com/api/orders/cancel";

    try {
      base_url=`${base_url}?isDone=${done}${page}`
      console.log(base_url);

      const response = await fetch(base_url,{
        headers : {
          Authorization: `Bearer ${admin.token}`
        } 
           });
      const data = await response.json();
      if(response.status==401){
        
        thunkAPI.dispatch(adminLogOutAction())
      }

      else if (response.ok) { 
    
        return data;
      } else {
        return thunkAPI.rejectWithValue({
          error: data.error,
        });}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)

// Sign Up
export const adminSignup = createAsyncThunk(
  "admin/adminSignup",
  async (dataObj, thunkAPI) => {
     const { admin } = thunkAPI.getState().admin
     let base_url = "https://shop-backend-zejv.onrender.com/api/admin/signup"

    //let base_url = "https://goodal-mern.onrender.com/api/admin/signup";

    try {
      const response = await fetch(base_url, {
        method: "POST",
        body: JSON.stringify(dataObj),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      });

      const data = await response.json();

      if (response.ok) {
        // save the user to local storage
        localStorage.setItem("admin", JSON.stringify(data));

        return data;
      } else {
        return thunkAPI.rejectWithValue({
          error: data.error,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Log In
export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (dataObj, thunkAPI) => {
     let base_url = "https://shop-backend-zejv.onrender.com/api/admin/login"

    // let base_url = "https://goodal-mern.onrender.com/api/admin/login";

    try {
      const response = await fetch(base_url, {
        method: "POST",
        body: JSON.stringify(dataObj),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // save the admin to local storage
        localStorage.setItem("admin", JSON.stringify(data));

        return data;
      } else {
        return thunkAPI.rejectWithValue({
          error: data.error,
        });
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// Log Out
export const adminLogOut = () => (dispatch) => {
  // remove the admin from local storage
  localStorage.removeItem("admin");
  dispatch(adminLogOutAction());
};

// Check if there is a admin in local storage when the app first loads
export const checkAdmin = () => (dispatch) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (admin) {
    dispatch(setAdmin(admin));
  }
};

const adminAuthSlice = createSlice({
  initialState,
  name: "admin",
  reducers: {
    adminLogOutAction: (state) => {
      state.admin = null;
    },
    setOrders: (state, action) =>{
      state.orders=action.payload
    },
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setWhatShow: (state, action) => {
      state.whatShow= action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(adminSignup.pending, (state) => {
        state.signUpStatus = "loading";
        state.loading = true;
        state.admin = null;
        state.errorSignUp = null;
      })
      .addCase(adminSignup.fulfilled, (state, action) => {
        state.signUpStatus = "succeeded";
        state.loading = false;
        state.admin = action.payload;
        state.errorSignUp = null;
      })
      .addCase(adminSignup.rejected, (state, action) => {
        state.signUpStatus = "failed";
        state.loading = false;
        state.admin = null;
        state.errorSignUp = action.payload.error;
      })

      // Log In
      .addCase(adminLogin.pending, (state) => {
        state.signUpStatus = "loading";
        state.loading = true;
        state.admin = null;
        state.errorLogIn = null;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.signUpStatus = "succeeded";
        state.loading = false;
        state.admin = action.payload;
        state.errorLogIn = null;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.signUpStatus = "failed";
        state.loading = false;
        state.admin = null;
        state.errorLogIn = action.payload.error;
      })
      //done order
      .addCase(orderDone.pending, (state) => {
        state.loading = true;
        })
      .addCase(orderDone.fulfilled, (state, action) => {
        state.loading = false;
        })
      .addCase(orderDone.rejected, (state, action) => {
        state.loading = true;
       })
      //get orders
      .addCase(readOrder.pending, (state) => {
        state.ordersStatus = "loading";
        state.loading = true;
        state.orders = null;
        state.errorSignUp = null;
      })
      .addCase(readOrder.fulfilled, (state, action) => {
        if(action.payload.token){
          let adminOld=JSON.parse(localStorage.getItem("admin"))
          adminOld.token=action.payload.token
          localStorage.setItem("admin", JSON.stringify(adminOld));
          state.admin=adminOld 
        }
        state.ordersStatus = "succeeded";
        state.loading = false;
        state.orders = action.payload;
        state.errorSignUp = null;
      })
      .addCase(readOrder.rejected, (state, action) => {
        state.ordersStatus = "failed";
        state.loading = false;
        state.orders = null;
        state.errorSignUp = action.payload.error;
      })
  },
});

export const { adminLogOutAction,setWhatShow, setAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
