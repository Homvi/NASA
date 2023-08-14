const Modal = ({ src, title, closeModal }) => {
  return (
    <div className="w-screen h-screen fixed top-0 left-0 bg-black flex justify-center items-center">
      <div className="pt-5  flex justify-center items-center">
        <div
          onClick={closeModal}
          className="fixed right-5 top-8 bg-white/50 text-black pt-2 pb-3 px-5 rounded-lg text-2xl cursor-pointer"
        >
          x
        </div>
        <img className="max-w-[95%] max-h-screen" src={src} alt={title} />
      </div>
    </div>
  );
};

export default Modal;
