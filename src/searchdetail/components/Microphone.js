import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import {useState} from "react";
import { FaMicrophoneAlt } from "react-icons/fa";
import styles from '../css/Microphone.module.css';

function Microphone({setKeyword, keywordState}) {
    const [activeState, setActiveState] = useState(false);
    const {
        transcript,
        resetTranscript,
        listening,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    
    const onClick = () =>{
        if(activeState === false){
            setActiveState(true);
            SpeechRecognition.startListening();
        }else{
            SpeechRecognition.stopListening();
            setKeyword(transcript);
            setActiveState(false);
            console.log(transcript);
            resetTranscript();
        }
    };
    return (
        <div id={listening? styles.microphone : styles.inactiveMicrophone}>
                <FaMicrophoneAlt onClick={browserSupportsSpeechRecognition? onClick : ()=>{alert('음성 인식을 지원하지 않는 브라우저입니다.')}} />
        </div>
    );
}

export default Microphone;