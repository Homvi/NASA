import axios from "axios";

import { useEffect, useState } from "react";
import Modal from "./components/Modal";

function App() {
  var date = new Date();

  const formattedDate =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();

  function incrDate(date_str) {
    var parts = date_str.split("-");
    var dt = new Date(
      parseInt(parts[0], 10), // year
      parseInt(parts[1], 10) - 1, // month (starts with 0)
      parseInt(parts[2], 10) // date
    );
    dt.setDate(dt.getDate() + 1);
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
      parts[1] = "" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
      parts[2] = "0" + parts[2];
    }
    return parts.join("-");
  }

  function decrementDate(date_str) {
    var parts = date_str.split("-");
    var dt = new Date(
      parseInt(parts[0], 10), // year
      parseInt(parts[1], 10) - 1, // month (starts with 0)
      parseInt(parts[2], 10) // date
    );
    dt.setDate(dt.getDate() - 1);
    parts[0] = "" + dt.getFullYear();
    parts[1] = "" + (dt.getMonth() + 1);
    if (parts[1].length < 2) {
      parts[1] = "0" + parts[1];
    }
    parts[2] = "" + dt.getDate();
    if (parts[2].length < 2) {
      parts[2] = "0" + parts[2];
    }
    return parts.join("-");
  }

  const showNext = () => {
    if (formattedDate !== actualDate) {
      let newDate = incrDate(actualDate);
      setActualDate(newDate);
    } else {
      alert("We dont have the picture of tomorow 😁😅");
    }
  };

  const showPrev = () => {
    let newDate = decrementDate(actualDate);
    setActualDate(newDate);
  };

  const [data, setData] = useState([]);
  const [actualDate, setActualDate] = useState(formattedDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "0CTcMeo3FK7vONBi9NLIflpcxRcbGqdk2iBWfHj3";

      const result = await axios.get(
        `https://api.nasa.gov/planetary/apod?date=${actualDate}&api_key=${apiKey}`
      );
      console.log(result.data);
      setData(result.data);
    };

    fetchData();
  }, [actualDate]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="">
      <div className="p-3 min-h-screen bg-base-200 flex flex-col items-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl md:text-5xl py-5 px-3 font-bold text-center">
            {data.title}
          </h1>
          <p className=" text-center py-3 max-w-xl">{data.date}</p>
          <div className="flex flex-col md:flex">
            <div className="relative w-screen flex justify-center bg-white md:max-w-lg xl:max-w-xl">
              <div
                onClick={showPrev}
                className="h-full bg-black/70 flex justify-center items-center text-white absolute left-0 top-0 w-11 cursor-pointer  rotate-180"
              >
                <span className="text-xl text-center leading-[0px]">&gt;</span>
              </div>
              <img
                onClick={() => setIsModalOpen(true)}
                src={data.url}
                className=" md:max-w-lg xl:max-w-xl max-h-sm shadow-2xl"
              />
              <div
                onClick={showNext}
                className="h-full bg-black/70 flex justify-center items-center text-white absolute right-0 top-0 w-11 cursor-pointer "
              >
                <span className="text-xl text-center leading-[0px]">&gt;</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <p className="py-3 px-3 max-w-xl">{data.explanation}</p>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          src={data.hdurl}
          title={data.title}
          closeModal={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;
