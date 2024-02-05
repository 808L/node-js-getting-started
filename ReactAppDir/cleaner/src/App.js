import logo from './logo.svg';
import './App.css';
import ChatUI from './ChatUI';  // Importing the ChatUI component

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        <ChatUI />  {/* Using the ChatUI component */}
      </div>
  );
}

export default App;