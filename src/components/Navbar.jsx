import nasaLogo from "../assets/nasa.svg";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300">
      <a className="btn btn-ghost normal-case text-xl">
        <img src={nasaLogo} alt="nasa" className="h-11"/>
      </a>
    </div>
  );
};

export default Navbar;
