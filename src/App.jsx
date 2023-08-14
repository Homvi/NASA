import axios from "axios";

import { useEffect, useState } from "react";
import Modal from "./components/Modal";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Intro from "./components/Intro";
import { incrDate, decrDate } from "./functions";
import NavigationButton from "./components/NavigationButton";

function App() {
  const showNext = () => {
    let formattedDate = getFormattedDate();
    if (actualDate !== formattedDate) {
      let newDate = incrDate(actualDate);
      setActualDate(newDate);
    } else {
      alert(
        "We don't have YET the picture of tomorrow, try to go the other direction"
      );
    }
  };

  const showPrev = () => {
    let newDate = decrDate(actualDate);
    setActualDate(newDate);
  };

  const [data, setData] = useState([]);
  const [actualDate, setActualDate] = useState(getFormattedDate());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(true);

  function getFormattedDate() {
    const date = new Date();
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = import.meta.env.VITE_API_KEY;
      try {
        const result = await axios.get(
          `https://api.nasa.gov/planetary/apod?date=${actualDate}&api_key=${apiKey}`
        );
        setData(result.data);
      } catch (error) {
        console.log(error);
        alert("Server error! Could'nt fetch the data");
      }
    };

    fetchData();
  }, [actualDate]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseIntro = () => {
    setIsIntroOpen(false);
  };

  return (
    <>
      <Navbar />
      <div className="p-3 lg:py-11 min-h-screen bg-base-200 flex flex-col items-center lg:justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-xl lg:text-5xl py-5 px-3 lg:hidden font-bold text-center">
            {data.title}
          </h1>
          <p className=" text-center lg:hidden py-3 max-w-xl">{data.date}</p>
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-screen flex justify-center bg-white lg:max-w-lg xl:max-w-xl ">
              <NavigationButton onClick={showPrev} direction="left" />
              <img
                onClick={() => setIsModalOpen(true)}
                src={data.url}
                className="cursor-pointer lg:max-w-lg xl:max-w-xl max-h-sm shadow-2xl"
              />
              <NavigationButton onClick={showNext} direction="right" />
            </div>
            <div className="flex flex-col px-3  items-center lg:items-start">
              <h1 className="text-5xl py-5 hidden lg:block font-bold">
                {data.title}
              </h1>
              <p className=" hidden lg:block py-1 text-left max-w-xl">
                {data.date}
              </p>
              <p className="py-8 lg:py-3 max-w-xl">{data.explanation}</p>
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
      {isIntroOpen && (
        <Intro background={data.hdurl} close={handleCloseIntro} />
      )}
      <Footer />
    </>
  );
}

export default App;
