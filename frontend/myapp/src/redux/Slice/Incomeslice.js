import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchIncome = createAsyncThunk("fetchincome" , async( _, {rejectWithValue})=>{
    try {
     const userEmail = localStorage.getItem("userEmail");
     if(!userEmail){
      throw new Error("User not found");
     }
     const {data : user} = await axios.get(`${API_URL}/api/user/fetchuser` , {
         params : {email : userEmail},
     })
     const response = await axios.get(`${API_URL}/api/track/get-income/${user._id}`);
     return response.data;
    } catch (error) {
      rejectWithValue(Error.response?.data || "Error while fetching data");
    }
});

export const addIncome = createAsyncThunk("addincome" , async(incomeData ,{rejectWithValue} )=>{
   try {
    const userEmail = localStorage.getItem("userEmail");
     if(!userEmail){
      throw new Error("User not found");
     }
     const {data : user} = await axios.get(`${API_URL}/api/user/fetchuser` , {
         params : {email : userEmail},
     })
     const userid = user._id;
     const incomedatawithuser = {...incomeData , userid };
    const income = await axios.post(`${API_URL}/api/track/add-income` , incomedatawithuser );
    return income.data;
   } catch (error) {
    console.log(error);
    rejectWithValue(Error.response?.data || "Error while adding ");
   }
});

export const deleteIncome = createAsyncThunk("deleteincome" , async(incomeId , {rejectWithValue})=>{
    try {
     const response = await axios.delete(`${API_URL}/api/track/delete-income/${incomeId}`);
     return response.data;   
    } catch (error) {
     rejectWithValue(Error.response?.data || "Error while deleting ")
    }
});

export const updateIncome = createAsyncThunk("updateincome" , async({incomeId , updatedData }, {rejectWithValue})=>{
    try {
    const userEmail = localStorage.getItem("userEmail");
    if(!userEmail){
      throw new Error("User not found");
    }
    const {data : user} = await axios.get(`${API_URL}/api/user/fetchuser` , {
        params : {email : userEmail},
    })
    const userid = user._id;
    const incomedatawithuser = {...updatedData , userid };
     const response = await axios.put(`${API_URL}/api/track/update-income/${incomeId}` , incomedatawithuser);
     return response.data;   
    } catch (error) {
     rejectWithValue(Error.response?.data || "Error while updating ");
    }
});

const IncomeSlice = createSlice({
    name : "Income",
    initialState : {
     data : [],
     isloading : false,
     isError : false,
    },
    reducers : {},
    extraReducers : (builder)=>{
      builder.addCase(fetchIncome.pending , (state , )=>{
          state.isloading = true; 
      })
      .addCase(fetchIncome.fulfilled , (state , action)=>{
        state.isloading = false;
        state.data = action.payload;
      })
      .addCase(fetchIncome.rejected , (state , action)=>{
       state.isloading = false;
       state.isError = action.payload;
      })
      .addCase(addIncome.fulfilled , (state , action)=>{
       state.data.push(action.payload);
       toast.success("Income added successfully!");
      })
      .addCase(deleteIncome.fulfilled , (state , action)=>{
       state.data = state.data.filter((income)=>{
        return ( income._id !== action.payload.incomeId )
       })
       toast.success("Income deleted successfully!");
      })
      .addCase(updateIncome.fulfilled , (state , action)=>{
       state.data = state.data.map((income)=>{
        return (income._id === action.payload.incomeId) ? {...income , ...action.payload.updatedData} : {income}
       })
       toast.success("Income updated successfully!");
      });
    }    
})

export default IncomeSlice.reducer;
