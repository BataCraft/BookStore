import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";

const DeleteBook = () => {
  const [isLoading, setIsLoading] = useState(false); // Initial loading state set to false
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDelete = async () => {
    // if (!window.confirm("Are you sure you want to delete this book?")) return;

    setIsLoading(true); // Start loading
    try {
      await axios.delete(`http://localhost:8000/books/${id}`); 
      
      navigate("/"); 
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Something went wrong!");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-10 w-full min-h-screen flex items-center justify-center">
      {isLoading ? (
        <Spinner />
      ) : (
       <div className="border border-red-500 p-20 rounded-lg">
         <h1 className="text-center text-3xl font-bold">Delete Book</h1>
         <p className="mt-10 font-semibold text-xl">Are you sure you want to delete the book ?</p>
        <div className="flex items-center justify-center gap-6 mt-5">
           <button className="py-3 px-6 bg-red-600 font-semibold text-xl text-white" onClick={handleDelete}>Delete</button>
           <button className="py-3 px-6 bg-blue-600 font-semibold text-xl text-white" onClick={() => navigate("/")}>Cancel</button>
        </div>
        </div>
       
      )}
    </div>
  );
};

export default DeleteBook;
