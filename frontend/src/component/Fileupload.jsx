import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { extractData } from "../redux/Slice/InvoiceSlice.js";
import { ClipLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

const FileUpload = () => {
  const dispatch = useDispatch();
  const { isloading } = useSelector((state) => state.Invoice);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
      setFiles(event.target.files);
      console.log(event.target.files.length);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error("Please select files to upload.");
      return;
    }
    for (let file of files) {
      const formData = new FormData();
      formData.append( "file" , file);
      dispatch(extractData(formData));
    }

    setFiles([]); 
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <div className="flex flex-col gap-4">
        {/* Hidden File Input */}
        <input
          type="file"
          multiple
          accept=".xlsx,.xls,.pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
          id="fileInput"
          disabled={isloading}
        />

        {/* Add Invoice Button */}
        <label htmlFor="fileInput" className="cursor-pointer">
          <button
            className="flex items-center px-4 py-2 rounded-md mb-4 bg-white text-black border-sky border-2"
            onClick={handleButtonClick}
          >
            <FontAwesomeIcon icon={faCirclePlus} className="mr-2" /> Add Invoice
          </button>
        </label>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          disabled={isloading}
        >
          {isloading ? (
            <div className="flex items-center gap-2">
              <ClipLoader size={16} color="text-sky" />
              <span>Processing...</span>
            </div>
          ) : (
            <div className="text-sky text-md">
                Upload Files
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;
