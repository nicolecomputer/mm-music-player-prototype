import { useState } from 'react'
import './App.css'
import KeyboardEventHandler from '@infinium/react-keyboard-event-handler';

function App() {
  const [selectedRow, setSelectedRow] = useState(0)
  const [playing, setPlaying] = useState(false)

  const title = "Home"

  const rows = ["Songs", "Artists", "Albums", "Genres", "Settings"]

  return (
    <>
      <KeyboardEventHandler
        handleKeys={['down', 'up', 'space']}
        onKeyEvent={(key) => {
          switch (key) {
            case "down":
              if (selectedRow < rows.length - 1) {
                setSelectedRow(selectedRow + 1)
              }
              break;
            case "up":
              if (selectedRow > 0) {
                setSelectedRow(selectedRow - 1)
              }
              break;
            case "space":
              setPlaying(!playing)
              break;
            default:
              console.log("?????")
              break
          }
        }} />


      <div id="music">
        <header>
          <div className="left">
            <div id="logo">
              <p>Music <span>Player</span></p>
            </div>
          </div>
          <div className="center">{title}</div>
          <div className="right">{playing ? "⏸" : "⏵"}</div>
        </header>
        <main>
          {rows.map((row, index) => {
            const isSelected = index == selectedRow;
            const selectedClass = isSelected ? "selected" : ''
            return <div key={index} className={`row ${selectedClass}`} >{row}</div>
          })}
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

      <div id="keymap">
        <ol>
          <li><strong>Arrow keys: </strong> d-pad</li>
          <li><strong>Space: </strong> start</li>
        </ol>
      </div>
    </>
  )
}

export default App
