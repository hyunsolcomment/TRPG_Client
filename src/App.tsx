import { HashRouter,Routes, Route } from 'react-router-dom';
import Connecting from './comp/Connecting';
import Home from './comp/Home';
import InGame from './comp/InGame';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/connecting" element={<Connecting />}/>
        <Route path="/inGame" element={<InGame />}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
