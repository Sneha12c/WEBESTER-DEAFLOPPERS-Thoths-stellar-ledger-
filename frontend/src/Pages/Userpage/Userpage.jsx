// import { Link } from "react-router-dom";
// import { API_URL } from '../../config';
// import React, { useState } from 'react';
// import AddIncomeForm from '../../component/Addincomeform'; 
// import AddExpenseForm from '../../component/Addexpenseform'; 
// import IncomeRecords from '../../component/showincome'; 
// import ExpenseRecords from '../../component/showexpense'; 
// import HorizontalChart from '../../component/charthorizontal.jsx';

// export default function Userpage() {
//   const userEmail = localStorage.getItem('userEmail');
//   const [showIncomeForm, setShowIncomeForm] = useState(false);
//   const [showExpenseForm, setShowExpenseForm] = useState(false);
//   const [showIncomeRecords, setShowIncomeRecords] = useState(false);
//   const [showExpenseRecords, setShowExpenseRecords] = useState(false);
//   const [showchart , setshowchart ] = useState(false);

//   const handleShowIncomeForm = () => {
//     setShowIncomeForm(true);
//     setShowExpenseForm(false);
//     setShowIncomeRecords(false);
//     setShowExpenseRecords(false);
//     setshowchart(false);
//   };

//   const handleShowExpenseForm = () => {
//     setShowIncomeForm(false);
//     setShowExpenseForm(true);
//     setShowIncomeRecords(false);
//     setShowExpenseRecords(false);
//     setshowchart(false);
//   };

//   const handleShowIncomeRecords = () => {
//     setShowIncomeForm(false);
//     setShowExpenseForm(false);
//     setShowIncomeRecords(true);
//     setShowExpenseRecords(false);
//     setshowchart(false);
//   };

//   const handleShowExpenseRecords = () => {
//     setShowIncomeForm(false);
//     setShowExpenseForm(false);
//     setShowIncomeRecords(false);
//     setShowExpenseRecords(true);
//     setshowchart(false);
//   };

//   const handlechart = () => {
//     setShowIncomeForm(false);
//     setShowExpenseForm(false);
//     setShowIncomeRecords(false);
//     setShowExpenseRecords(false);
//     setshowchart(true);
//   };

//   return (
//     <>
//       {userEmail ? (
//         <div className="mt-32 flex flex-col items-center justify-center space-y-4 "  >
//             <div className='md:w-3/5 m-4 md:h-full mb-4' style={{ backgroundSize: 'cover',backgroundposition: 'center' }}  >
//                 <div className='m-4'>
//           <h3 className="text-deep-blue font-playfair text-700 text-2xl text-white italic mb-4">
//             'Every penny saved is a step towards financial freedom.'
//           </h3>
//           <h2 className="text-2xl font-bold mb-4 text-white">Add Transaction</h2>
//           <div className="grid items-center justify-between space-x-4">
//             <button
//               className="bg-red text-white px-4 py-2 mb-4 rounded hover:bg-yellow"
//               onClick={handleShowIncomeForm}
//             > Add Income
//             </button>
//             <button
//               className="bg-red text-white px-4 py-2 mb-4 rounded hover:bg-yellow"
//               onClick={handleShowIncomeRecords}
//             > Show Record of Income
//             </button>
//           </div>
//           <div className="grid items-center justify-between space-x-4">
//             <button
//               className="bg-red text-white px-4 py-2 mb-4 rounded hover:bg-yellow"
//               onClick={handleShowExpenseForm}
//             >
//               Add Expense
//             </button>
//             <button
//               className="bg-red text-white px-4 py-2 mb-4 rounded hover:bg-yellow"
//               onClick={handleShowExpenseRecords}
//             >
//               Show Record of Expenses
//             </button>
//             <button
//               className="bg-red text-white px-4 py-2 mb-4 rounded hover:bg-yellow"
//               onClick={handlechart}
//             >
//               Show chart
//             </button>
//           </div>
//           </div>
//           </div>

//           {showIncomeForm && <AddIncomeForm onClose={() => setShowIncomeForm(false)} />}
//           {showExpenseForm && <AddExpenseForm onClose={() => setShowExpenseForm(false)} />}
//           {showIncomeRecords && <IncomeRecords />} {/* Create an IncomeRecords component */}
//           {showExpenseRecords && <ExpenseRecords />} {/* Create an ExpenseRecords component */}
//           {showchart && <HorizontalChart/>}
//         </div>
//       ) : (
//         <></>
//       )}
//     </>
//   );
// }
import React, { useState } from 'react';
import IncomeForm from '../../component/Addincomeform.jsx'; 
import ExpenseForm from '../../component/Addexpenseform.jsx'; 
import IncomeRecords from '../../component/showincome.jsx'; 
import ExpenseRecords from '../../component/showexpense.jsx'; 
import HorizontalChart from '../../component/charthorizontal.jsx';

export default function Userpage() {
  const userEmail = localStorage.getItem('userEmail');
  const [activeTab, setActiveTab] = useState(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'incomeForm': return <IncomeForm onClose={() => setActiveTab(null)} />;
      case 'expenseForm': return <ExpenseForm onClose={() => setActiveTab(null)} />;
      case 'incomeRecords': return <IncomeRecords />;
      case 'expenseRecords': return <ExpenseRecords />;
      case 'chart': return <HorizontalChart />;
      default: return null;
    }
  };

  if (!userEmail) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">User not found. Please log in.</p>
      </div>
    );
  }

  return (
    <div className="mt-32 flex flex-col items-center space-y-6">
      <div className="md:w-3/5 m-4 bg-sky p-6 rounded-md shadow-md">
        <h3 className=" italic text-lg mb-4">
          "Every penny saved is a step towards financial freedom."
        </h3>
        <h2 className="text-2xl font-bold mb-4 ">Manage Transactions</h2>
        
        {/* Buttons Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className=" px-4 py-2 rounded hover:bg-red-700"
            onClick={() => setActiveTab('incomeForm')}>
            Add Income
          </button>
          <button className=" px-4 py-2 rounded hover:bg-red-700"
            onClick={() => setActiveTab('incomeRecords')}>
            Show Income Records
          </button>
          <button className=" px-4 py-2 rounded hover:bg-red-700"
            onClick={() => setActiveTab('expenseForm')}>
            Add Expense
          </button>
          <button className=" px-4 py-2 rounded hover:bg-red-700"
            onClick={() => setActiveTab('expenseRecords')}>
            Show Expense Records
          </button>
        </div>
      </div>

      {/* Render Selected Content */}
      {renderContent()}
    </div>
  );
}
