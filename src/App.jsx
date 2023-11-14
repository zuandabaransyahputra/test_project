import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isStart, setIsStart] = useState(false);
  const handleStart = async () => {
    setIsStart(true);
  };

  async function getImages() {
    const value = await axios.get("http://localhost:8000/detect");
    setData((prevData) => [...prevData, value.data.frame]);
  }

  useEffect(() => {
    if (isStart) {
      getImages();
      const interval = setInterval(() => getImages(), 100);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isStart]);

  return (
    <div className="flex flex-col gap-20 w-full py-20">
      <div className="flex justify-between items-center">
        <button
          className="bg-white rounded-lg text-black py-4 px-20"
          onClick={handleStart}
        >
          Start
        </button>
        <button
          className="bg-white rounded-lg text-black py-4 px-20"
          onClick={() => setIsStart(false)}
        >
          Stop
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {data.map((item, index) => (
          <img
            src={`data:image/jpeg;base64,${item}`}
            alt="images"
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
