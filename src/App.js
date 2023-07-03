
import './App.css';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import { CartProvider } from './components/ContextReducer';
 //import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import '../node_modules/boostrap/dist/js/bootstrap.bundle'
//  import '../node_modules/boostrap/dist/js/bootstrap.min.js';

function App() {
  return (
    <CartProvider>
    <Router>
    <div>
     <Routes>
      <Route eaxct path="/" element={<Home/>}/> 
      <Route eaxct path="/loginuser" element={<Login/>}/>
      <Route eaxct path="/createUser" element={<Signup/>}/>
      <Route eaxct path="/myOrder" element={<MyOrder/>}/>
     </Routes>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
