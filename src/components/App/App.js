import './App.css';
import Dashboard from "../Dashboard/Dashboard";
import Header from "../Header/Header";
import {useState} from "react";

function App() {
    const [playbackEnabled, setPlayback] = useState(false)

    const play = (state) => {
        console.log("play(): " + state)
        setPlayback(state);
    };

    return (
        <div className="App">
            <Header play={play}/>
            <Dashboard
                url={"https://kingfisher01.ornith.cornell.edu:4443/clo_mic.ogg"}
                playbackEnabled={playbackEnabled}
            />
        </div>
    );
}

export default App;
