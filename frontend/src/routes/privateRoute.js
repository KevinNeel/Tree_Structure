import { Navigate } from 'react-router-dom';

import Login from '../Pages/Auth/Login/Login';
import Register from '../Pages/Auth/Register/Register';

const privateRoute = [
    { path: '*', element: <Navigate to='/login' replace /> },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <Register /> }
]

export default privateRoute