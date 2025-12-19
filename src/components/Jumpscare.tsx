import { useState, useEffect, useRef } from 'react';

const FREDDY_GIF = "/CV_Website/foxy-jumpscare.gif";
const SCREAM_AUDIO = "/CV_Website/scream.mp3";

const Jumpscare = () => {
  const [isActive, setIsActive] = useState(false);
  const inputBuffer = useRef(""); 

  const triggerJumpscare = () => {
    setIsActive(true);
    
    // Play Audio
    const audio = new Audio(SCREAM_AUDIO);
    audio.volume = 1.0;
    audio.play().catch(e => console.error("Audio blocked:", e));

    // Hide after 2 seconds (length of the jumpscare)
    setTimeout(() => {
      setIsActive(false);
      inputBuffer.current = ""; // Reset buffer
    }, 800);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add new key to buffer
      inputBuffer.current += e.key.toLowerCase();

      // Keep only the last 4 characters
      if (inputBuffer.current.length > 4) {
        inputBuffer.current = inputBuffer.current.slice(-4);
      }

      // Check for match
      if (inputBuffer.current === "fnaf") {
        triggerJumpscare();
      }
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