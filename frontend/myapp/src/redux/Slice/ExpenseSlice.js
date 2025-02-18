import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../config";
import { toast } from "react-toastify";

export const fetchExpense = createAsyncThunk("fetchexpense", async(_ , {rejectWithValue})=>{
    try{
    const userEmail = localStorage.getItem("userEmail");
    if(!userEmail){
     throw new Error("User is not login" )
    }
    const { data : user} = await axios.get(`${API_URL}/api/user/fetchuser` , {
        params : {email : userEmail},
    })
    const expense = await axios.get(`${API_URL}/api/track/get-expense/${user._id}`);
    return expense.data;
    }
    catch(err){
      rejectWithValue(Error.response?.data || "Error while fetching data");
    }
});

export const addExpense = createAsyncThunk("addexpense" , async( expenseData, {rejectWithValue})=>{
   try{
    const userEmail = localStorage.getItem("userEmail");
    if(!userEmail){
     throw new Error("User is not login" )
    }
    const { data : user} = await axios.get(`${API_URL}/api/user/fetchuser` , {
        params : {email : userEmail},
    })
    const userid = user._id;
    const expensedatawithuser = {...expenseData , userid};
    const response = await axios.post(`${API_URL}/api/track/add-expense` , expensedatawithuser );
    return response.data;
   }catch(err){
     rejectWithValue(Error.response?.data || "Error while adding data");
   }
});

export const deleteExpense = createAsyncThunk("deleteexpense" , async( expenseId, {rejectWithValue})=>{
    try {
    const response = await axios.delete(`${API_URL}/api/track/delete-expense/${expenseId}`);
    return response.data;
    } catch (error) {
     rejectWithValue(Error.response?.data || "Error while deleting expenses");
    }
})

export const updateExpense = createAsyncThunk("updateexpense" , async({expenseId , updatedData} , {rejectWithValue})=>{
    try {
    const userEmail = localStorage.getItem("userEmail");
    if(!userEmail){
         throw new Error("User is not login" )
    }
    const { data : user} = await axios.get(`${API_URL}/api/user/fetchuser` , {
        params : {email : userEmail},
    })
    const userid = user._id;
    const expensedatawithuser = {...updatedData , userid};
    const response = await axios.post(`${API_URL}/api/track/update-expense/${expenseId}` , expensedatawithuser);
    return response.data;  
    } catch (error) {
      rejectWithValue(Error.response?.data || "Error while updating expenses");
    }
})

export const fetchExpenses = createAsyncThunk("fetchExpenses",
    async ({ startDate, endDate, userId }, { rejectWithValue }) => {
      try {
        const response = await axios.get(API_URL, {
          params: { startDate, endDate, userId },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || "Error fetching expenses");
      }
    }
  );
  

const expenseSlice = createSlice({
   name : "expenses",
   initialState : {
    data : [],
    isloading : false ,
    isError : false 
   },
   extraReducers : (builder)=>{
     builder.addCase( fetchExpense.pending , (state )=>{
        state.isloading = true;
     })
     builder.addCase( fetchExpense.fulfilled , (state , action)=>{
        state.isloading = false;
        state.data = action.payload;
    })
    builder.addCase( fetchExpense.rejected , (state , action)=>{
        state.isloading = false;
        state.isError = action.payload;
     })
     builder.addCase( addExpense.fulfilled , (state , action)=>{
       state.data.push(action.payload);
       toast.success("Expense added successfully!");
     })
     builder.addCase( updateExpense.fulfilled ,(state , action)=>{
       state.data = state.data.map((expense)=>{
        return (expense._id === action.payload.expenseId ) ? {...expense , ...action.payload.updatedData } : expense
       })
       toast.success("Expense updated successfully!");
     })
     builder.addCase( deleteExpense.fulfilled ,(state , action)=>{
       state.data = state.data.filter((expense)=>{
        return (expense._id !== action.payload.expenseId);
       })
       toast.success("Expense deleted successfully!");
     });
   },
})

export default expenseSlice.reducer;

