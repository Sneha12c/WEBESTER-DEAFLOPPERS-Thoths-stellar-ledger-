import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {updateIncome , addIncome, fetchIncome} from "../redux/Slice/Incomeslice.js";

const IncomeForm = ({ onClose , editingRecord }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState( editingRecord?.title || '');
  const [amount, setAmount] = useState( editingRecord?.amount || '');
  const [date, setDate] = useState( editingRecord?.date || '');
  const [category, setCategory] = useState( editingRecord?.category || '');
  const [description, setDescription] = useState( editingRecord?.description || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(editingRecord ){
      try{
        dispatch(updateIncome({incomeId : editingRecord._id , updatedData : {title , amount , date , category , description}})).unwrap();
        dispatch(fetchIncome()); 
      }
      catch (error) {
        alert("Failed to update income!");
      }
    }
    else{
      try{
        dispatch(addIncome({title , amount , date , category , description}));
      }
      catch (error) {
        alert("Failed to add income!");
      }
    }
    onClose();
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md mt-4 md:w-3/4">
      <h2 className="text-xl font-semibold mb-4 text-black ">Add Income</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 text-black rounded-md p-2 mb-4 w-full"
          placeholder="Enter income title..."
          required
        />

        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-md text-black p-2 mb-4 w-full"
          placeholder="Enter income amount..."
          required
        />

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md text-black p-2 mb-4 w-full"
          required
        />

        <label>Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-md p-2 text-black mb-4 w-full"
          placeholder="Enter income category..."
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded-md text-black p-2 mb-4 w-full"
          placeholder="Enter income description..."
        />

        <button
          type="submit"
          className="bg-green-500 text-white hover:bg-dark-grey py-2 rounded-md w-full"
        >
         { editingRecord ? "Edit Income" : "Add Income"}
        </button>
      </form>
    </div>
  );
};

export default IncomeForm;
