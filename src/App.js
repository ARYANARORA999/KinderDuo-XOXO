import React from 'react';
import Board from './components/Board';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='heading'>
      <h1>KinderDuo XOXO</h1>
      </div>
      <Board />
      <div className='Footer'>
        With ❤️ from Aryan and Ayush
      </div>
    </div>
  );
}

export default App;
