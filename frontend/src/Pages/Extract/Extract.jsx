import { useState , useMemo } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import Table from "../../component/Table";
import FileUpload from "../../component/Fileupload";

const ExtractManagement = () => {
  const invoices = useSelector((state) => state.Invoice.invoices);
  const products = useSelector((state) => state.Invoice.products);
  const customers = useSelector((state) => state.Invoice.customers);

  // Memoize values to ensure reference consistency
  const memoizedData = useMemo(
    () => ({
      invoices: invoices || [],
      products: products || [],
      customers: customers || [],
    }),
    [invoices, products, customers]
  );

  const [activeTab, setActiveTab] = useState("invoices");

  const handleDelete = (id, type) => {
    if (type === "invoices") {
      toast.success("Invoice deleted successfully!");
    } else if (type === "products") {
      toast.success("Product deleted successfully!");
    } else if (type === "customers") {
      toast.success("Customer deleted successfully!");
    }
  };

  return (
    <div className="min-h-screen transition-all duration-300">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-lg  p-6">
          <h1 className="text-3xl font-bold mb-8">Invoice Manager</h1>

          {/* File Upload Component */}
          <FileUpload />

          {/* Tabs for switching tables */}
          <div className="flex border-b border-sky mb-6">
            {["invoices", "products", "customers"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                  activeTab === tab ? "border-blue-500 text-blue-500" : "hover:border-gray-400"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Conditional Rendering of Tables */}
          <div>
            {activeTab === "invoices" && (
              <Table data={memoizedData.invoices} type="invoices" handleDelete={handleDelete} />
            )}
            {activeTab === "products" && (
              <Table data={memoizedData.products} type="products" handleDelete={handleDelete} />
            )}
            {activeTab === "customers" && (
              <Table data={memoizedData.customers} type="customers" handleDelete={handleDelete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractManagement;
