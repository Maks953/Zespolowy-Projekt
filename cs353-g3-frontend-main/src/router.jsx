import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'antd/dist/antd.min.css'
import App from './App'
import Login from './pages/user/login'
import Signup from './pages/user/signup'
import Board from './pages/board'


const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/board/:id' element={<Board />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter