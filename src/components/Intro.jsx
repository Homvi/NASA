import nasaLogo from "../assets/nasa.svg";
const Intro = ({ close }) => {
  return (
    <div className="hero min-h-screen bg-base-200 fixed top-0 left-0">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src={nasaLogo} className="w-72 rounded-lg " />
        <div>
          <h1 className=" text-2xl md:text-5xl font-bold">
            NASA&lsquo;s Astronomy Picture of the Day
          </h1>
          <p className="py-6">
            Discover the cosmos with a daily visual treat! Each day, NASA
            showcases an awe-inspiring image or video of our fascinating
            universe. With this app, you not only get to view today&apos;s celestial
            wonder but can also journey back to explore past images. Delve into
            the stars, planets, nebulae, and beyond — all from the comfort of
            your device.
          </p>
          <button onClick={close} className="btn btn-primary">
            🚀 Start Your Cosmic Journey!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Intro;
