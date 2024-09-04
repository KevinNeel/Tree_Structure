import { Link, Navigate } from 'react-router-dom';

import User from '../Pages/User';
import Main from '../Pages/Main/Main';

const protectedRoute = [
    { path: '*', element: <Navigate to='/' replace /> },
    { path: '/', element: <Main /> },

]

export default protectedRoute