import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  signUpStatus: "idle",
  loading: false,
  admin: null,
  errorSignUp: null,
  errorLogIn: null,
};

// Sign Up
export const adminSignup = createAsyncThunk(
  "admin/adminSignup",
  async (dataObj, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:7001/api/admin/signup", {
        method: "POST",
        body: JSON.stringify(dataObj),
        headers: {
          "Content-Type": "application/json",
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
    try {
      const response = await fetch("http://localhost:7001/api/admin/login", {
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
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
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
      });
  },
});

export const { adminLogOutAction, setAdmin } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;
