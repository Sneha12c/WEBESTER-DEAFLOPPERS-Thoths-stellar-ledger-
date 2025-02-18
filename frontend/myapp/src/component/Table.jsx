import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

const Table = ({ data, type, handleDelete }) => {
    return (
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            {type === "customers" && (
              <>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Phone Number</th>
                <th className="px-4 py-2">Amount</th>
              </>
            )}
            {type === "products" && (
              <>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Unit Price</th>
                <th className="px-4 py-2">Tax</th>
                <th className="px-4 py-2">Pricewithtax</th>
              </>
            )}
            {type === "invoices" && (
              <>
                <th className="px-4 py-2">Serial Number</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Product name</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Tax</th>
                <th className="px-4 py-2">Total Amount</th>
              </>
            )}
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="border-b">
                {type === "customers" && (
                  <>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.phoneNumber}</td>
                    <td className="px-4 py-2">{item.totalPurchaseAmount}</td>
                  </>
                )}
                {type === "products" && (
                  <>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.unitPrice}</td>
                    <td className="px-4 py-2">{item.tax}</td>
                    <td className="px-4 py-2">{item.priceWithTax}</td>
                  </>
                )}
                {type === "invoices" && (
                  <>
                    <td className="px-4 py-2">{item.serialNumber}</td>
                    <td className="px-4 py-2">{item.customerName}</td>
                    <td className="px-4 py-2">{item.productName}</td>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">{item.tax}</td>
                    <td className="px-4 py-2">{item.totalAmount}</td>
                  </>
                )}
                <td className="px-4 py-2 flex items-center space-x-4">
                  <button onClick={() => handleDelete(item.id, type)} className="text-red-500 hover:text-red-700">
                    <FontAwesomeIcon icon={faTrash} className="mr-2" /> Delete
                  </button>
                  <button className="text-blue-500 hover:text-blue-700">
                    <FontAwesomeIcon icon={faPen} className="mr-2" /> Update
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No {type} data available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  };
  
export default Table;
