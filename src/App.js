import logo from './logo.svg';
import './App.css'; 
import UploadPDF from './Component/UploadPDF';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF Uploader</h1>
        <UploadPDF />
      </header>
    </div>
  );
}

export default App;
