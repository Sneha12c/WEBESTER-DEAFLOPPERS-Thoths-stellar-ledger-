import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "./Slice/ExpenseSlice.js";
import incomeReducer from "./Slice/Incomeslice.js";
import chartReducer from "./Slice/ChartSlice.js";
import themeReducer from "./Slice/ThemeSlice.js";
import InvoiceReducer from "./Slice/InvoiceSlice.js";

export const store = configureStore({
    reducer : {
      expenses : expenseReducer,
      incomes : incomeReducer,
      Chart : chartReducer,
      Theme : themeReducer,
      Invoice : InvoiceReducer
    }
})
