import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
function App() {
  return (
  <Router>
    <div className='App'>
      <Routes>
        <Route path='/' element={<Form/>}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
