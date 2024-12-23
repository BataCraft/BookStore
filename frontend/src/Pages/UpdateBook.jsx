import { useEffect, useState } from "react";
import Backbutton from "../Components/Backbutton";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";

const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchOldBook = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`https://bookstorebackend-ulcg.onrender.com/books/${id}`);
        setTitle(res.data.book.title);
        setAuthor(res.data.book.author);
        setPublishDate(res.data.book.publishDate);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching book:", error);
        alert("Something went wrong!");
        setIsLoading(false);
      }
    };
    fetchOldBook();
  }, [id]);

  const handleSaveBook = async (e) => {
    e.preventDefault();

    const data = { title, author, publishDate };
    setIsLoading(true);

    try {
      await axios.put(`https://bookstorebackend-ulcg.onrender.com/books/${id}`, data); // Updated to PUT
      setIsLoading(false);
      navigate("/"); // Navigate after update
    } catch (error) {
      console.error("Error updating book:", error);
      setIsLoading(false);
    }
  };

  return (
    <div className="p-20">
      {isLoading && <Spinner />}
      <Backbutton />
      <div className="pt-10">
        <h1 className="text-3xl font-bold">Update Book</h1>
        <div className="mt-10">
          <form onSubmit={handleSaveBook}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="title"
              >
                Title
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="author"
              >
                Author
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="publishDate"
              >
                Publish Year
              </label>
              <input
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                type="text"
                id="publishDate"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-green-600 py-3 px-6 text-white font-semibold rounded-lg"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
