import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Backbutton from "../Components/Backbutton";
import Spinner from "../Components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState(null); // Use `null` for better initial handling
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getBooks = async () => {
      try {
        const res = await axios.get(`https://bookstorebackend-ulcg.onrender.com/${id}`);
        setBook(res.data.book);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getBooks();
  }, [id]);

  return (
    <div className="p-20">
      <div>
        <Backbutton  />
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        book && (
          <div className="mt-10">
            <h1 className="text-3xl font-bold">{book.title}</h1>
            <p className="text-xl font-semibold">Author: {book.author}</p>
            <p className="text-xl font-semibold text-gray-600">
              Published Date: {book.publishDate}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default ShowBook;
