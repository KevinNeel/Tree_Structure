import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import privateRoute from './routes/privateRoute';
import DefaultLayout from './Layout/DefaultLayout';

import { useIsAuthenticated } from './hooks/useAuth'

function App() {

  const { isAuthenticated } = useIsAuthenticated();
  console.log(isAuthenticated);
  return (
    <>
      <BrowserRouter>
        {isAuthenticated && <DefaultLayout />}

        <Routes>
          {!isAuthenticated && privateRoute.map((route, index) => (
            <Route key={index} {...route} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
