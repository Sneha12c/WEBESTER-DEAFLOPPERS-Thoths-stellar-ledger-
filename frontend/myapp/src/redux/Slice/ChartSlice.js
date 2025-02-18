import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";

export const fetchData = createAsyncThunk("fetchData" , async( {startDate , endDate } , {rejectWithValue})=>{
  
  try {
    const userEmail = localStorage.getItem("userEmail");
    if(!userEmail){
         throw new Error("User is not login" )
    }
    const { data : user} = await axios.get(`${API_URL}/api/user/fetchuser` , {
        params : {email : userEmail},
    })
    const userid = user._id;
      const [expenseResponse, incomeResponse] = await Promise.all([
        axios.get(`${API_URL}/api/track/get-expenses`,{ params: { startDate, endDate, userid } }),
        axios.get(`${API_URL}/api/track/get-incomes` , { params: { startDate, endDate, userid } })
      ]);
      console.log(expenseResponse , incomeResponse);
      return {
        expense: expenseResponse.data,
        income: incomeResponse.data,
      }  
    
  } catch (error) {
    return rejectWithValue(error.response?.data || "Error fetching financial data");
  }
})

const ChartSlice = createSlice({
    name : "Chart",
    initialState : {
     income : [],
     expense : [],
     isloading : false,
     isError : null,
    },
    extraReducers : (builder)=>{
     builder.addCase( fetchData.pending , (state , action)=>{
       state.isError = null;
       state.isloading = true;
     })
     builder.addCase(fetchData.fulfilled , (state , action)=>{
        state.isError = null;
        state.isloading = false;
        state.expense = action.payload.expense;
        state.income = action.payload.income;
     })
     builder.addCase(fetchData.rejected , (state , action)=>{
        state.isError = action.payload;
        state.isloading = false;
     })
    }
})

export default ChartSlice.reducer;

