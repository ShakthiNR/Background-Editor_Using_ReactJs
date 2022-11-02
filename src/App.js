import UploadImage from "./Component/UploadImage";

function App() {
  return (
    <div>
      <center className="border border-gray-300 m-1">
        <h1 className=" text-xl md:text-2xl py-2 font-semibold bg-gradient-to-r bg-clip-text  text-transparent from-black via-purple-500 to-neutral-900 animate-text">
          Transparent Background Editor - React Js
        </h1>
      </center>
      <UploadImage />
      <center className="bg-gray-200 p-2 font-mono mt-5">
        <h1>Developed By - Shakthi Naarayanan R</h1>
      </center>
    </div>
  );
}

export default App;
