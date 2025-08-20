import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
// import Homes from './Component/Homes'
// import AnotherPage from './Component/AnotherPage'
// import AnotherPage1 from './Component/AnotherPage1'
// import Color from './Component/Color'
// import ColorSwitch from './Component/Interactive/ColorSwitch'
// import LightSwitch from './Component/Interactive/LightSwitch'
// import { FormProvider } from './Component/Interactive/UseContext/FormContext';
// import FormInput from './Component/Interactive/UseContext/FormInput';
// import Todo from './Component/TodoApp/Todo';
import Dashboard from "./Component/Farm_Management/Dashboard";
import AddCrop from "./Component/Farm_Management/AddCrop";
import CropList from "./Component/Farm_Management/CropList";
import Analytics from "./Component/Farm_Management/Analytics";
import Settings from "./Component/Farm_Management/Setting";
import Weather from './Component/Farm_Management/Weather';
import Finance from './Component/Farm_Management/Finance';
import Login from './Component/Farm_Management/Login';
import PrivateRoute from './Component/Farm_Management/PrivateRoute';
import { AuthProvider } from './Component/Farm_Management/AuthContext';
import LiveMarketPrices from './Component/Farm_Management/LiveMarketPrices';
import Register from './Component/Farm_Management/Register';
import Counter from './Component/React+Redux/Counter';
import store from './Component/React+Redux/store';
// import YieldPrediction from './Component/Farm_Management/YieldPrediction';
// import InventoryManager from './Component/Farm_Management/InventoryManager';
import FertilizerLogs from './Component/Farm_Management/FertilizerLogs';

import ErrorBoundary from './Component/Farm_Management/ErrorBoundary'; // Import ErrorBoundary
import GovernmentSchemes from './Component/Farm_Management/GovernmentSchemes';
import PestDetection from "./Component/Farm_Management/PestDetection";


// import 'bootstrap/dist/css/bootstrap.min.css';
// import PhotoCard from './Component/PhotoCard';

// import Web from './Component/Farm_Management/Web'

// Redux Provider
import { Provider } from "react-redux";

function App() {
  const hello = "This Is Out Of The Return Part"
  const PassingProps = "This Is the Passing Props From App Component"

  return (
    <AuthProvider>
      <Provider store={store}>
        <div className="container">
          <nav className="navbar">
            {/* <Link to="/">Home</Link>
            <Link to="/AnotherPage">AnotherPage</Link>
            <Link to="/AnotherPage1">AnotherPage1</Link>
            <Link to="/ColorSwitch">ColorSwitch</Link>
            <Link to="/LightSwitch">LightSwitch</Link>
            <Link to="/Color">Color</Link>
            <Link to="/Todo">Todo</Link> */}
            {/* <Link to="/Web">Web</Link> */}

            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/add-crop">Add Crop</Link></li>
            <li><Link to="/crops">Crop List</Link></li>
            <li><Link to="/analytics">Analytics</Link></li>
            <li><Link to="/settings">Settings</Link></li>
            <li><Link to="/weather">Weather</Link></li>
            <li><Link to="/finance">Finance</Link></li>
            <li><Link to="/market-prices">LiveMarketPrices</Link></li>
            {/* <li><Link to="/inventory">Inventory</Link></li> */}
            <li><Link to="/fertilizer-logs">Fertilizer Logs</Link></li>
            <li><Link to="/counter">Counter (Redux)</Link></li> {/* Redux Counter Link */}
            {/* <li><Link to="/yield-prediction">Yield Prediction</Link></li> */}
            <li><Link to="/GovernmentSchemes">GovernmentSchemes</Link></li>
            <li><Link to="/PestDetection">PestDetection</Link></li>

            {/* <li><Link to="/login">Login</Link></li> */}
            {/* <li><Link to="/photocard">PhotoCard</Link></li> */}
          </nav>

          {/* <FormProvider>
            <h2>Simple Form with Context</h2>
            <FormInput />
          </FormProvider> */}

          {/* <h1>Hello To All</h1>
          <p>{hello}</p> */}

          <Routes>
            {/* Added this so "/" shows Login */}
            <Route 
              path="/" 
              element={
                <ErrorBoundary>
                  <Login />
                </ErrorBoundary>
              } 
            />

            <Route 
              path="/login" 
              element={
                <ErrorBoundary>
                  <Login />
                </ErrorBoundary>
              } 
            />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/add-crop" element={<PrivateRoute><AddCrop /></PrivateRoute>} />
            <Route path="/crops" element={<PrivateRoute><CropList /></PrivateRoute>} />
            <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
            <Route path="/weather" element={<PrivateRoute><Weather /></PrivateRoute>} />
            <Route path="/finance" element={<PrivateRoute><Finance /></PrivateRoute>} />
            <Route path="/market-prices" element={<PrivateRoute><LiveMarketPrices /></PrivateRoute>} />
            {/* <Route path="/inventory" element={<PrivateRoute><InventoryManager /></PrivateRoute>} /> */}
            <Route path="/fertilizer-logs" element={<PrivateRoute><FertilizerLogs /></PrivateRoute>} />
            <Route path="/GovernmentSchemes" element={<PrivateRoute><GovernmentSchemes /></PrivateRoute>} />
            <Route path="/PestDetection" element={<PrivateRoute><PestDetection/></PrivateRoute>} />
             
           
            

            {/* Redux Counter Page */}
            <Route path="/counter" element={<Counter />} />
            {/* <Route path="/yield-prediction" element={<YieldPrediction />} /> */}

            {/* <Route path="/photocard" element={<PhotoCard />} /> */}
           
          </Routes>
        </div>
      </Provider>
    </AuthProvider>
  );
}

export default App;
