import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import DeleteBook from './Pages/DeleteBook';
import CreateBook from './Pages/CreateBook';
import ShowBook from './Pages/ShowBook';
import UpdateBook from './Pages/UpdateBook';

const ALLRouter = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path='/' element = {<Home/>}/>
            <Route path='/create' element = {<CreateBook/>}/>
            <Route path='/deletebook/:id' element = {<DeleteBook/>}/>
            <Route path='/showbook/:id' element = {<ShowBook/>}/>
            <Route path='/updatebook/:id' element = {<UpdateBook/>}/>
        </Routes>
    </Router>
    </>
  )
}

export default ALLRouter