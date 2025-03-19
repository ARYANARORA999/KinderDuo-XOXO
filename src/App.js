import React from 'react';
import Board from './Board';
import './App.css';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <div className='heading'>
      <h1>KinderDuo XOXO</h1>
      </div>
      <Analytics/>
      <Board />
      <div className='Footer'>
        With ❤️ from Aryan and Ayush
      </div>
    </div>
  );
}

export default App;
