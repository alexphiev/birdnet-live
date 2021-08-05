import React from 'react';
import styled from 'styled-components';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SpectrogramCanvas from "../Spectrogram/SpectrogramCanvas";
import PropTypes from "prop-types";

/* component styles */
const StyledDashboard = styled.div`
  padding-top: 20px;

  canvas {
    width: 100%;
    max-height: 200px;
    padding-left: 40px;
    padding-right: 40px;
  }
`;

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            analyser: null,
            audioContext: null
        };

        this.initAudio = this.initAudio.bind(this);
    }

    componentDidMount() {
        this.initAudio();
    }

    componentWillUnmount() {
        console.log("componentWillUnmount: Audio Pause")
        this.audio.pause();
    }

    initAudio() {
        console.log("initAudio")

        let {analyser, audioContext} = this.state;

        if (!analyser && !audioContext) {
            this.audio = new Audio(this.props.url);
            this.audio.crossOrigin = "anonymous";
            this.audio.addEventListener('onended', () => {
                console.log("Ended");
            });

            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const source = audioContext.createMediaElementSource(this.audio);

            analyser = audioContext.createAnalyser();
            analyser.smoothingTimeConstant = 0;
            analyser.fftSize = 512;
            analyser.minDecibels = -95;

            const biquadFilter1 = audioContext.createBiquadFilter();
            biquadFilter1.type = "bandpass";
            biquadFilter1.frequency.value = 12000; // Center of the band
            //biquadFilter1.Q.value = 0.5; // width of the band (the greater Q the smaller width)

            // Connect source to filter1
            source.connect(biquadFilter1);

            // Then connect source filtered to analyser
            biquadFilter1.connect(analyser);

            // Finally connect the analyser to the destination
            analyser.connect(audioContext.destination);

            this.setState({analyser, audioContext});
        }
    }

    render() {
        let spectrogram;
        const {analyser, audioContext} = this.state;

        if (!this.audio) {
            spectrogram = <div>Loading...</div>

        } else {
            const {playbackEnabled} = this.props;

            if (playbackEnabled) {
                console.log("playbackEnabled: " + true)
                this.audio.play();
            } else {
                console.log("playbackEnabled: " + false)
                this.audio.pause();
            }

            spectrogram =
                <SpectrogramCanvas
                    playbackEnabled={playbackEnabled}
                    analyser={analyser}
                    context={audioContext}
                />;
        }

        return (
            <StyledDashboard>
                <Container fluid>
                    <Row>
                        <Col>
                            {spectrogram}
                        </Col>
                    </Row>
                </Container>
            </StyledDashboard>
        );
    }
}

Dashboard.propTypes = {
    playbackEnabled: PropTypes.bool,
    url: PropTypes.string
};

export default Dashboard;