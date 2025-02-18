import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncome , deleteIncome } from "../redux/Slice/Incomeslice.js";
import IncomeForm from './Addincomeform.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const IncomeRecords = () => {
  const dispatch = useDispatch();
  const { data : incomeRecords , loading , error } = useSelector((state)=> state.incomes);
  const [editingRecord , setEditingrecord] = useState(null);
  const [showForm , setShowForm] = useState(false);

  useEffect(()=>{
    dispatch(fetchIncome());
  }, [dispatch]);

  const handleDelete = (incomeId)=>{
    if(window.confirm("Are you sure you want to delete expense ? ")){
    dispatch(deleteIncome(incomeId));
    dispatch(fetchIncome());
    }
  }

  const handleUpdate = (record)=>{
    setEditingrecord(record);
    setShowForm(true);
    dispatch(fetchIncome());
  }

  if (loading) {
    return <p >Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 ">Income Records</h2>
      {showForm && <IncomeForm onClose={() => setShowForm(false)} editingRecord={editingRecord} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        { incomeRecords && incomeRecords.length>0 ? 
        ( incomeRecords.map((record) => (
          <div key={record._id} className=" rounded-md p-4 shadow-md border-4 border-sky">
            <h3 className="text-lg font-playfair font-semibold mb-2">{record.title}</h3>
            <p className="text-dark-grey mb-2">{`Amount: ${record.amount}`}</p>
            <p className="text-dark-grey mb-2">{`Date: ${new Date(record.date).toLocaleDateString()}`}</p>
            <p className="text-dark-grey mb-2">{`Category: ${record.category}`}</p>
            <p className="text-dark-grey">{`Description: ${record.description}`}</p>
            <div className="flex justify-between items-center my-4 space-x-4">
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(record._id)}
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleUpdate(record)}
                >
                  <FontAwesomeIcon icon={faPen} className="mr-2" /> Update
                </button>
              </div>
          </div>
        ))) : (
            <p>No income records available.</p>
          )}
      </div>
    </div>
  );
};

export default IncomeRecords;
