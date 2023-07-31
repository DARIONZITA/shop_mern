import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  signUpStatus: "idle",
  ordersStatus: "idle",
  markStatus:"idle",
  loading: false,
  customer:null,
  customerPending: null,
  dataMarks:null,
  orderPending: null,
  errorSignUp: null,
  errorLogIn: null,
  customerExpired:false
}



export const CreateMarks = createAsyncThunk(
  "customer/CreateMarks",
  async (datap, thunkAPI) => {
     const { admin } = thunkAPI.getState().admin
     let base_url = "https://shop-backend-zejv.onrender.com/api/marks/add";

    //let base_url ="https://goodal-mern.onrender.com/api/orders/cancel";

    try {
      
      console.log(base_url);

      const response = await fetch(base_url, {
        method: "POST",
        body: JSON.stringify(datap),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      });
      let data = await response.json();

      if (response.ok) {
        return true;
      } else {
        return thunkAPI.rejectWithValue({
          error: data.error,
        });}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)
export const getAllMarks = createAsyncThunk(
  "customer/getAllMarks",
  async (data, thunkAPI) => { 
    let search= data ? `?search=${data.search}` : ''


     let base_url = "https://shop-backend-zejv.onrender.com/api/marks/getAll";

    //let base_url ="https://goodal-mern.onrender.com/api/orders/cancel";

    try {
      
      base_url=`${base_url}${search}`
      
  

      const response = await fetch(base_url);
      const data = await response.json();

      if (response.ok) {
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
export const RemoveMark = createAsyncThunk(
  "customer/RemoveMark",
  async (markId, thunkAPI) => {
    const { admin } = thunkAPI.getState().admin
    let base_url = "https://shop-backend-zejv.onrender.com/api/marks/cancel";

    //let base_url ="https://goodal-mern.onrender.com/api/orders/cancel";
    
    try {
      base_url=`${base_url}/${markId}`
      
      console.log(base_url);

      const response = await fetch(base_url, {
        method: "DELETE",
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
        });}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)
export const CancelOrder = createAsyncThunk(
  "customer/CancelOrder",
  async (orderId, thunkAPI) => {
    const {admin}=thunkAPI.getState().admin
    const {customer}=thunkAPI.getState().customer
    let user = admin ? admin : customer 
    // let base_url = "http://localhost:7001/api/products";

    let base_url ="https://shop-backend-zejv.onrender.com/api/orders/cancel/"+ orderId;

    try {
      
      console.log(base_url);

      const response= await fetch(base_url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${user?.token}`
          
        },
      });  
      
      const data = await response.json();
   
      if (response.ok) {
      
        return true;
      } else {
        return thunkAPI.rejectWithValue({
          error: data.error,
        });}
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
)
export const UpadateOrderPending =  createAsyncThunk(
  "customer/UpdateOrderPending",
  async (_, thunkAPI) => {
    const {customer}= thunkAPI.getState().customer
    
    // let base_url = "http://localhost:7001/api/products";

    let base_url ="https://shop-backend-zejv.onrender.com/api/customer/myOrders";

    try {
      
      console.log(base_url);

      const response = await fetch(base_url,{
        method: "GET",
        headers:{
          
          Authorization: `Bearer ${customer.token}`
        }
      });
      const data = await response.json();

      if(response.status==401){
        localStorage.removeItem('customer')
        
        thunkAPI.dispatch(customerLogOutAction())

      }else{

        if (response.ok) {
          return data;
        } else {
          return thunkAPI.rejectWithValue({
            error: data.error,
          });}
      }
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);
export const changeData = createAsyncThunk(
  "customer/changeData",
  async (dataObj, thunkAPI) => {
    const {customer}= thunkAPI.getState().customer
    // let base_url = "http://localhost:7001/api/customer/signup"
   
    let base_url ="https://shop-backend-zejv.onrender.com/api/customer/update";

    try {
      const response = await fetch(base_url, {
        method: "PATCH",
        body: JSON.stringify(dataObj),
      
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customer.token}`
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
);

// Sign Up
export const customerSignup = createAsyncThunk(
  "customer/customerSignup",
  async (dataObj, thunkAPI) => {
    // let base_url = "http://localhost:7001/api/customer/signup"

    let base_url = "https://shop-backend-zejv.onrender.com/api/customer/signup";
    console.log(dataObj)
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

    let base_url = "https://shop-backend-zejv.onrender.com/api/customer/signup/verifyEmail";

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

    let base_url = "https://shop-backend-zejv.onrender.com/api/customer/login";

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
    dispatch(setCustomerPending(customerPending));
  } 
  
};


const customerAuthSlice = createSlice({
  initialState,
  name: "customer",
  reducers: {
    customerLogOutAction: (state) => {
      state.customer = null;
    },
    setPendingOrders: (state,action) =>{
      state.customer= action.payload
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
    .addCase(CancelOrder.fulfilled, (state) => {
      state.ordersStatus='idle'  
    })
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
      //remove marks
      .addCase(RemoveMark.fulfilled, (state, action) => {
        state.dataMarks = action.payload;

      })
      //created marks
      .addCase(CreateMarks.fulfilled, (state, action)=>{
        state.markStatus='idle'
      })
      //get marks
      .addCase(getAllMarks.pending, (state) => {
        state.markStatus="loading"
        state.loading = true;
        state.dataMarks = null;
      })
      .addCase(getAllMarks.fulfilled, (state, action) => {
        state.markStatus="succeeded"
        state.loading = false;
        state.dataMarks = action.payload;
      })
      .addCase(getAllMarks.rejected, (state, action) => {
        state.markStatus="failed"
        state.loading = false;
        state.dataMarks = null;
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
        state.customerPending=null
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
      })
      // update
      .addCase(changeData.pending, (state) => {
        state.loading = true;
        //state.customer = null;
      })
      .addCase(changeData.fulfilled, (state, action) => {
          // save the user to local storage
          let data = action.payload
          let customerOld=JSON.parse(localStorage.getItem("customer"))
          customerOld.numberPhone=data.numberPhone
          customerOld.firstName=data.firstName
          customerOld.lastName=data.lastName
          customerOld.email=data.email
  
          localStorage.setItem("customer", JSON.stringify(customerOld));
  
          state.loading = false;
          state.customer = customerOld
        })
      .addCase(changeData.rejected, (state, action) => {
        state.loading = false;
        state.customer = null;
      })
      //news orders
      .addCase(UpadateOrderPending.pending, (state) => {
        state.ordersStatus = "loading";
        state.loading = true;
        state.orderPending = null;
      })
      .addCase(UpadateOrderPending.fulfilled, (state, action) => {
        //token user expired
      
   
        //update token user
       
        if(action.payload.token){
          let customerOld=JSON.parse(localStorage.getItem("customer"))
          customerOld.token=action.payload.token
          localStorage.setItem("customer", JSON.stringify(customerOld));
          state.customer=customerOld 
  

        }
        state.ordersStatus='succeeded'
        state.loading = false;
        state.orderPending = action.payload.myOrders.pendingOrders;
      })
      .addCase(UpadateOrderPending.rejected, (state, action) => {
        state.ordersStatus='failed'
        state.loading = false;
        state.orderPending = null;
        //state.errorSignUp = action.payload.error;
      })
      
  }
});


export const { 
  customerLogOutAction,
  setPendingOrders,
  setCustomer,
  setCustomerPending,
  customerCancelSignUp
} = customerAuthSlice.actions;
export default customerAuthSlice.reducer;
