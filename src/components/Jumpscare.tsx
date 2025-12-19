import { useState, useEffect, useRef } from 'react';

const FREDDY_GIF = "/CV_Website/foxy-jumpscare.gif";
const SCREAM_AUDIO = "/CV_Website/scream.mp3";
const MI_BOMBO = "/CV_Website/mi_bombo.mp3";
const XIXA_EDIT_VIDEO = "/CV_Website/xixa-edit.mp4";

const Jumpscare = () => {
  const [isActive, setIsActive] = useState(false);
  const inputBuffer = useRef(""); 

  const triggerFnafJumpscare = () => {
    setIsActive(true);
    
    const audio = new Audio(SCREAM_AUDIO);
    audio.volume = 1.0;
    audio.play().catch(e => console.error("Audio blocked:", e));

    setTimeout(() => {
      setIsActive(false);
      inputBuffer.current = ""; 
    }, 900);
  };

  const triggerBomboJumpscare = () => {
    const audio = new Audio(MI_BOMBO);
    audio.volume = 1.0;
    audio.play().catch(e => console.error("Audio blocked:", e));

    setTimeout(() => {
      inputBuffer.current = ""; 
    }, 2000);
  };

  const triggerXixaEdit = () => {
    const video = document.createElement('video');
    video.src = XIXA_EDIT_VIDEO;
    video.style.cssText = "position: fixed; inset: 0; width: 100%; height: 100%; z-index: 9999; object-fit: contain; background: black;";
    video.autoplay = true;

    video.muted = false; 
    
    document.body.appendChild(video);

    // Play explicitly to catch errors
    video.play().catch(e => console.error("Video play error:", e));

    video.addEventListener('ended', () => {
      if (document.body.contains(video)) {
        document.body.removeChild(video);
      }
    });

    inputBuffer.current = "";
  };

  const CHEAT_CODES: { [key: string]: () => void } = {
    "fnaf": triggerFnafJumpscare,
    "bombo": triggerBomboJumpscare,
    "xixaedit": triggerXixaEdit,
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add new key to buffer
      inputBuffer.current += e.key.toLowerCase();

      if (inputBuffer.current.length > 20) {
        inputBuffer.current = inputBuffer.current.slice(-20);
      }

      // Check if buffer ends with any of the "cheat" codes
      Object.keys(CHEAT_CODES).forEach((code) => {
        if (inputBuffer.current.endsWith(code)) {
          CHEAT_CODES[code]();
          inputBuffer.current = "";
        }
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black">
      <img 
        src={FREDDY_GIF} 
        alt="Jumpscare" 
        className="w-full h-full object-cover animate-pulse"
      />
    </div>
  );
};

export default Jumpscare;