import { useState } from 'react'
import './App.css'
import KeyboardEventHandler from '@infinium/react-keyboard-event-handler';

const purpleColor = "#6c49bb";

function Row({ isSelected, children }: { isSelected: boolean, children: React.ReactNode }) {
  return (
    <div className="row" style={{
      height: "30px",
      alignItems: "center",
      justifyContent: 'start',
      padding: "0 6px",
      color: "white",
      fontSize: 14,
      backgroundColor: isSelected ? purpleColor : "",
      flexDirection: 'row',
      gap: 4
    }}>
      {children}
    </div >
  )
}

function CommandRowButton({ label, isSelected, icon }: { label: string, icon: string, isSelected: boolean }) {
  return (
    <div className='command-row-button' style={{
      border: isSelected ? "1px solid white" : "1px solid #909090",
      padding: "0 10px",
      height: 22,
      justifyContent: 'center',
      borderRadius: 15,
      backgroundColor: isSelected ? purpleColor : "",
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2
    }}>
      <span className="material-symbols-outlined" style={{
        fontSize: 14,
        padding: 0,
        margin: 0
      }}>
        {icon}
      </span>
      <p style={{
        fontSize: 12,
        padding: 0,
        margin: 0
      }}>{label}</p>
    </div>
  )
}
function CommandRow({ isSelected }: { isSelected: boolean }) {
  return (
    <div className="row" style={{
      minHeight: 36,
      alignItems: "center",
      justifyContent: 'end',
      padding: "0 6px",
      color: "white",
      fontSize: 14,
      flexDirection: 'row',
      backgroundColor: isSelected ? 'rgba(255,255,255,0.1)' : '',
      gap: 8,
      boxSizing: "border-box"
    }}>
      <CommandRowButton label="Play all" icon="play_arrow" isSelected={false} />
      <CommandRowButton label="Shuffle all" icon="shuffle" isSelected={false} />
    </div >
  )
}

function SongRow({ isSelected, albumArt, title, artist }: { isSelected: boolean, albumArt: string, title: string, artist: string }) {
  return (
    <div className="row" style={{
      minHeight: 36,
      alignItems: "center",
      justifyContent: 'start',
      padding: "0 6px 0 0",
      color: "white",
      fontSize: 14,
      flexDirection: 'row',
      gap: 8,
      overflow: 'hidden',
      backgroundColor: isSelected ? purpleColor : "",
    }}>
      <img src={albumArt} style={{
        height: 36,
        width: 36
      }} />
      <div style={{
        flexDirection: 'column',
        gap: 0
      }}>
        <p style={{
          padding: 0,
          margin: 0,
          fontSize: 14
        }}>{title}</p>
        <p style={{
          padding: 0,
          margin: 0,
          fontSize: 10,
          color: "rgba(255,255,255,0.6)",
          marginTop: -4,

        }}>{artist}</p>
      </div>
    </div >
  )
}
function HomeScreen() {
  const [selectedRow, setSelectedRow] = useState(0)
  const [playing, setPlaying] = useState(false)

  const rows = [{
    label: "Now Playing",
    icon: "play_circle"
  },
  {
    label: "Songs",
    icon: "library_music"
  },
  {
    label: "Artists",
    icon: "artist"
  },
  {
    label: "Albums",
    icon: "album"
  },
  {
    label: "Genres",
    icon: "genres"
  },
  {
    label: "Settings",
    icon: "settings"
  }
  ]

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

      {rows.map((row, index) =>
        <Row key={index} isSelected={index == selectedRow}>
          {row.icon.length > 0 && (<span className="material-symbols-outlined" style={{
            fontSize: 18,
            marginTop: -2
          }}>
            {row.icon}
          </span>)}
          <p>{row.label}</p>
        </Row>
      )}
    </>
  )
}

function SongsScreen() {
  return (
    <>
      <CommandRow isSelected={false} />
      <SongRow albumArt="album_art/1.jpeg" title="Boy in the bubble" artist="alec benjamin" isSelected={false} />
      <SongRow albumArt="album_art/2.jpeg" title="Oblivion" artist="30 Seconds to Mars" isSelected={true} />
      <SongRow albumArt="album_art/3.jpeg" title="The Shark in Your Water" artist="Flower Face" isSelected={false} />
      <SongRow albumArt="album_art/4.jpeg" title="Human" artist="Dodie" isSelected={false} />
    </>
  )
}

function Screen({ title, children }: { title: string, children: React.ReactNode }) {
  const playing = false
  return (
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
        {children}
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
  )
}

function App() {
  const screens = {
    "home": {
      title: "Home",
      component: <HomeScreen />
    },
    "songs": {
      title: "Songs",
      component: <SongsScreen />
    }
  }

  const currentScreen = "home"
  return (
    <>
      <Screen title={screens[currentScreen].title}>
        {screens[currentScreen].component}
      </Screen>
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
