import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  signUpStatus: "idle",
  loading: false,
  customer: null,
  customerPending:{email:'dariozongogarcinzita@gmail.com'},
  errorSignUp: null,
  errorLogIn: null,

};

// Sign Up
export const customerSignup = createAsyncThunk(
  "customer/customerSignup",
  async (dataObj, thunkAPI) => {
    // let base_url = "http://localhost:7001/api/customer/signup"

    let base_url = "https://goodal-mern.onrender.com/api/customer/signup";

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
        // save the user to local storage
        localStorage.setItem("customerPending", JSON.stringify(data));

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
export const customerConfirm = createAsyncThunk(
  "customer/customerConfirm",
  async (dataObj, thunkAPI) => {
    // let base_url = "http://localhost:7001/api/customer/signup"

    let base_url = "https://goodal-mern.onrender.com/api/customer/signup";

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
        // save the user to local storage
        localStorage.removeItem("customerPending")
        localStorage.setItem("customer", JSON.stringify(data));

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
export const customerLogin = createAsyncThunk(
  "customer/customerLogin",
  async (dataObj, thunkAPI) => {
    // let base_url = "http://localhost:7001/api/customer/login"

    let base_url = "https://goodal-mern.onrender.com/api/customer/login";

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
        // save the customer to local storage
        localStorage.setItem("customer", JSON.stringify(data));

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
export const customerLogOut = () => (dispatch) => {
  // remove the customer from local storage
  localStorage.removeItem("customer");
  dispatch(customerLogOutAction());
};
export const cancelConfirm = () => (dispatch) => {
  localStorage.removeItem('customerPending')  
  
  dispatch(customerCancelSignUp())
};
// Check if there is a customer in local storage when the app first loads
export const checkCustomer = () => (dispatch) => {
  const customer = JSON.parse(localStorage.getItem("customer"));
  const customerPending= JSON.parse(localStorage.getItem("customerPending"));
  if (customer) {
    dispatch(setCustomer(customer));
  }
  if(customerPending){
    dispatch(setCustomerPending(customer));
  }
};
const customerAuthSlice = createSlice({
  initialState,
  name: "customer",
  reducers: {
    customerLogOutAction: (state) => {
      state.customer = null;
    },
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setCustomerPending: (state, action) => {
      state.customerPending = action.payload;
    },
    customerCancelSignUp: (state) => {
      state.customerPending = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(customerSignup.pending, (state) => {
        state.signUpStatus = "loading";
        state.loading = true;
        state.customerPending = null;
        state.errorSignUp = null;
      })
      .addCase(customerSignup.fulfilled, (state, action) => {
        state.signUpStatus = "succeeded";
        state.loading = false;
        state.customerPending = action.payload;
        state.errorSignUp = null;
      })
      .addCase(customerSignup.rejected, (state, action) => {
        state.signUpStatus = "failed";
        state.loading = false;
        state.customerPending = null;
        state.errorSignUp = action.payload.error;
      })
      //confirm
      .addCase(customerConfirm.pending, (state) => {
        state.signUpStatus = "loading";
        state.loading = true;
        state.customer = null;
        state.errorSignUp = null;
      })
      .addCase(customerConfirm.fulfilled, (state, action) => {
        state.signUpStatus = "succeeded";
        state.loading = false;
        state.customer = action.payload;
        state.errorSignUp = null;
      })
      .addCase(customerConfirm.rejected, (state, action) => {
        state.signUpStatus = "failed";
        state.loading = false;
        state.customer = null;
        state.errorSignUp = action.payload.error;
      })
      // Log In
      .addCase(customerLogin.pending, (state) => {
        state.signUpStatus = "loading";
        state.loading = true;
        state.customer = null;
        state.errorLogIn = null;
      })
      .addCase(customerLogin.fulfilled, (state, action) => {
        state.signUpStatus = "succeeded";
        state.loading = false;
        state.customer = action.payload;
        state.errorLogIn = null;
      })
      .addCase(customerLogin.rejected, (state, action) => {
        state.signUpStatus = "failed";
        state.loading = false;
        state.customer = null;
        state.errorLogIn = action.payload.error;
      });
  },
});


export const { customerLogOutAction, setCustomer,setCustomerPending ,customerCancelSignUp,} = customerAuthSlice.actions;
export default customerAuthSlice.reducer;
