
import './App.css';
import Characters from './components/Characters';
import Navbar from './components/Navbar/Navbar';
import { QueryClientProvider, QueryClient } from "react-query"
sessionStorage.setItem('key', 'https://i.imgur.com/pC7xVnn.png');
const queryClient = new QueryClient()
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Navbar ProfileImg={sessionStorage.getItem('key')} />
        <Characters />
      </QueryClientProvider>
    </div>
  );
}

export default App;
