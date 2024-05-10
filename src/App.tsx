import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div id="music">
        <header>
          <div className="left">
            <div id="logo">
              <p>Music <span>Player</span></p>
            </div>
          </div>
          <div className="center">Home</div>
          <div className="right">⏯</div>
        </header>
        <main>
          <div className="row">Songs</div>
          <div className="row selected">Artists</div>
          <div className="row">Albums</div>
          <div className="row">Genres</div>
          <div className="row">Settings</div>
        </main>
        <footer>
          <div className="button-prompt">
            <img src="button_a.png" />
            <p>Select</p>
          </div>
          <div className="button-prompt">
            <img src="button_b.png" />
            <p>Back</p>
          </div>
          <div className="space"></div>
          <div className="button-prompt">
            <img src="button_start.png" />
            <p>Pause</p>
          </div>

        </footer>
      </div>
    </>
  )
}

export default App
