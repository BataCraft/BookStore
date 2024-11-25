import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";


const Backbutton = ({ destination = '/' }) => {
  return (
    <div className="flex">
        <Link to={destination} className="bg-sky-800 text-white p-4 w-fit rounded-full">
        <IoMdArrowRoundBack className="text-2xl"/>
        </Link>
    </div>
  )
}

export default Backbutton