import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();

document.addEventListener('DOMContentLoaded', ev => {
    const playButton = document.getElementById("play-sound");
    playButton.addEventListener('click', ev => {
        synth.triggerAttackRelease("C4", "8n");
    });
});

