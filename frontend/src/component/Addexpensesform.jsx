import { useState } from "react";

const AddBudgetForm = () => {
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Add your logic to handle form submission, e.g., send a request to the server
    console.log("Submitting form:", { budgetName, budgetAmount });
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <form method="post" className="grid-sm" onSubmit={handleSubmit}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            value={budgetName}
            onChange={(e) => setBudgetName(e.target.value)}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
            value={budgetAmount}
            onChange={(e) => setBudgetAmount(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn--dark" aria-label="Submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBudgetForm;
