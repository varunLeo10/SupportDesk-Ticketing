import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ticketService from "./ticketService";
const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
export const createTicket = createAsyncThunk(
  "ticket/create",
  async (ticketData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      console.log(error);
      let message = error.response?.data?.message;
      if (message === null) {
        message = error.message || error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getTickets = createAsyncThunk(
  "ticket/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const data = await ticketService.getTickets(token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      let message = error.response?.data?.message;
      if (message === null) {
        message = error.message || error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getTicket = createAsyncThunk(
  "ticket/getTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const data = await ticketService.getTicket(ticketId, token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      let message = error.response?.data?.message;
      if (message === null) {
        message = error.message || error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const closeTicket = createAsyncThunk(
  "ticket/closeTicket",
  async (ticketId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const data = await ticketService.closeTicket(ticketId, token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      let message = error.response?.data?.message;
      if (message === null) {
        message = error.message || error.toString();
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(createTicket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(createTicket.fulfilled, (state) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(getTickets.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTickets.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getTickets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.tickets = action.payload;
    });
    builder.addCase(getTicket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(getTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.ticket = action.payload;
    });
    builder.addCase(closeTicket.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(closeTicket.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
    builder.addCase(closeTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.ticket = action.payload;
    });
  },
});
export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
