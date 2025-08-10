import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoutes';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateBlog from './pages/Create';
import EditBlog from './pages/Edit';
import MyBlogs from './pages/MyBlogs';
import './App.css'

function App() {
  return (
    <Router>
        <Navbar />
        <Routes>
            <Route path='/' element={ <Home /> }></Route>
            <Route path='/register' element={ <Register /> }></Route>
            <Route path='/login' element={ <Login /> }></Route>
            <Route element={<PrivateRoute />}>
                <Route path='/myBlogs' element={ <MyBlogs /> }></Route>
                <Route path='/create' element={ <CreateBlog />}></Route>
                <Route path='/:id' element={ <EditBlog />}></Route>
            </Route>
        </Routes>
    </Router>
  )

}

export default App
