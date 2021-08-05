import React from 'react'
import Spectrogram from "spectrogram";
import chroma from "chroma-js"
import PropTypes from "prop-types";

/**
 * Component displaying the Spectrogram
 * This is a functional component because we need canvas in React with useRef
 */
function SpectrogramCanvas(props) {
    const {analyser, audioContext} = props;
    const canvasRef = React.useRef(null);
    const canvas = canvasRef.current;

    if (canvas) {
        let spectro = Spectrogram(canvas, {
            audio: {
                enable: false
            },
            colors: function (steps) {
                var baseColors = ['black', "#81b29a", [0, 255, 0, 1], [255, 255, 0, 1], [255, 0, 0, 1]];
                var positions = [0, 0.15, 0.30, 0.50, 0.75];

                var scale = new chroma.scale(baseColors, positions).domain([0, steps]);

                var colors = [];
                for (var i = 0; i < steps; ++i) {
                    var color = scale(i);
                    colors.push(color.hex());
                }

                return colors;
            }
        });

        spectro.connectSource(analyser, audioContext);
        spectro.start();
    }

    return (
        <canvas
            ref={canvasRef}
            onClick={() => {
                /*const canvas = canvasRef.current;
                //const ctx = canvas.getContext('2d')
                //draw(ctx, { x: e.clientX, y: e.clientY })
                drawSpectrogram(canvas, analyser, audioContext);*/
            }}
        />
    );
}

SpectrogramCanvas.propTypes = {
    playbackEnabled: PropTypes.bool,
    analyser: PropTypes.object,
    audioContext: PropTypes.object
};

export default SpectrogramCanvas;