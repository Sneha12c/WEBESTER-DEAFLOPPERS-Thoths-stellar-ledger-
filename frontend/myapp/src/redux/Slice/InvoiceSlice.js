import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../config";
import axios from "axios";
import { toast } from "react-toastify";

export const extractData = createAsyncThunk( "extractData" , async( formData, {rejectWithValue })=>{
   try {
       const file = formData.get("file"); 
       if (!file) 
        throw new Error("No file provided");
        let filetype = file.type;
        let endpoint = "/upload";
        if(filetype.includes("pdf")){
        endpoint = "invoicepdf";
        }
        else if(filetype.includes("png") || filetype.includes("jpeg") || filetype.includes("jpg")){
            endpoint = "invoiceimage";
        }
        else if(filetype.includes("excel") || filetype.includes("spreadsheet") ||
        file.name.endsWith(".xls") || file.name.endsWith(".xlsx")){
            endpoint = "invoiceexcel";
        }
        
       const response = await axios.post(`${API_URL}/api/extract/${endpoint}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
       });
       console.log(response);
       toast.success(`File processed successfully`);
       return response.data;
      }catch (error) {
        console.log("error");
        toast.error(error.response?.data?.message || "Failed to process file");
        return rejectWithValue(error.response?.data || "Error processing file");
      }
})

const InvoiceSlice = createSlice({
  name : "Invoice",
  initialState : {
    invoices : [],
    products : [],
    customers : [],
    isloading : false,
    error : null,
  },
  reducers : {
    deleteInvoice: (state, action) => {
      state.invoices = state.invoices.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.invoices.findIndex((invoice) => invoice.id === action.payload.id);
      if (index !== -1) state.invoices[index] = action.payload;
    },
    deleteProducts : (state , action)=>{
      state.products = state.products.filter((product) =>(product.id !== action.payload));
    },
    updateProducts : (state , action)=>{
      const index = state.products.findIndex((product)=> product.id === action.payload.id);
      if( index !== -1)
      state.products[index] = action.payload;
    },
    deleteCustomers : (state , action)=>{
     state.customers = state.customers.filter((customer)=> customer.id !== action.payload);
    },
    updateCustomers : (state , action)=>{
     const index = state.customers.findIndex((customer)=>(customer.id === action.payload.id));
     if(index !== -1)
     state.customers[index] = action.payload;
    }
  },
  extraReducers : (builder)=>{
   builder.addCase( extractData.pending , (state , action)=>{
     state.isloading = true;
   })
   .addCase(extractData.fulfilled, (state, action) => {
    state.isloading = false;
    if (action.payload) {
    state.invoices.push(...(action.payload.InvoicesTab || []));
    state.products.push(...(action.payload.ProductsTab || []));
    state.customers.push(...(action.payload.CustomersTab || []));
    }
    console.log(action.payload.InvoiceTab);
  })
  .addCase(extractData.rejected, (state, action) => {
    state.isloading = false;
    state.error = action.payload;
  });
  }
})

export const {deleteInvoice ,deleteProducts , deleteCustomers , updateCustomers , updateInvoice , updateProducts} = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
