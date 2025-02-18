import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateExpense , addExpense, fetchExpense } from '../redux/Slice/ExpenseSlice.js';

const ExpenseForm = ({ onClose , editingRecord }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState( editingRecord?.title || '' );
  const [amount, setAmount] = useState( editingRecord?.amount || '');
  const [date, setDate] = useState(editingRecord?.date || '');
  const [category, setCategory] = useState( editingRecord?.category || '');
  const [description, setDescription] = useState( editingRecord?.description || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(editingRecord){
    try{
      dispatch(updateExpense({expenseId : editingRecord._id , updatedData : {title , amount , date , category , description}}));
      dispatch(fetchExpense());
    }
    catch(err){
      alert("Failed to update expense!"); 
    }
    }
    else{
     try{
       dispatch(addExpense({title , amount , date , category , description}));
     }
     catch(err){
      alert("Failed to add expense!"); 
    }
    }
    onClose();
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-4  md:w-3/4">
      <h2 className="text-xl font-semibold mb-4 text-black">Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md text-black p-2 mb-4 w-full"
          placeholder="Enter expense title..."
          required
        />

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-md text-black p-2 mb-4 w-full"
          placeholder="Enter expense amount..."
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-grey text-black rounded-md p-2 mb-4 w-full"
          required
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-grey rounded-md p-2 text-black mb-4 w-full"
          placeholder="Enter expense category..."
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-black mb-4 w-full"
          placeholder="Enter expense description..."
        />

        <button
          type="submit"
          className="bg-deep-red text-white hover:bg-red py-2 rounded-md w-full"
        >
          {editingRecord ? "Edit Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
