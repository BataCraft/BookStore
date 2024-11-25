import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner";
import axios from 'axios';
import { Link } from "react-router-dom";
import { MdCreate,  MdDelete, MdEdit, MdInfo } from "react-icons/md";

const Home = () => {
    const [book, setBook] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const getAllbooks = async () => {
            try {
                const res = await axios.get('http://localhost:8000/books');
                setBook(res.data.book);  // Set books data to state
                setLoading(false);        // Set loading to false
                
            } catch (error) {
                console.log(error);  // Log any errors
            }
        };
        getAllbooks();
    }, []);

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to='/create'>
                    <MdCreate className="text-sky-800 text-4xl"/>
                </Link>
            </div>

            {isLoading ? (
                <Spinner />
            ) : (
                <table className="w-full border-separate border-spacing-2">
                    <thead>
                        <tr>
                            <th className="border border-slate-600 rounded-md">SN</th>
                            <th className="border border-slate-600 rounded-md">Title</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">Publish Year</th>
                            <th className="border border-slate-600 rounded-md max-md:hidden">Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {book.map((book, index) => (
                            <tr key={book._id} className="h-8">
                                <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
                                <td className="border border-slate-700 rounded-md text-center">{book.title}</td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.author}</td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">{book.publishDate}</td>
                                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                                   <div className="flex items-center justify-center gap-4">
                                    <Link to={`/showbook/${book._id}`}>
                                    <MdInfo className="text-green-600 text-2xl"/>
                                    </Link>
                                    <Link to={`/updatebook/${book._id}`}>
                                    <MdEdit className="text-blue-600 text-2xl"/>
                                    </Link>

                                    <Link to={`/deletebook/${book._id}`}>
                                    <MdDelete className="text-red-600 text-2xl"/>
                                    </Link>

                                   </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Home;
