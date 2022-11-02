import React, { useState } from "react";

const EditImage = ({ getColor }) => {
  const [bgColor, setBgColor] = useState("");

  //Get color from form
  const handleChange = (e) => {
    setBgColor(e.target.value);
  };
  
  //Check the valid color 
  const checkColor = (bgColor) => {
    let result = CSS.supports("color", bgColor);
    return result;
  };

  //Set color to state and call the callback(parent state)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bgColor) {
      alert("Please Enter the bgcolor in input box");
      return;
    } else {
      let result = checkColor(bgColor);
      if (!result) {
        alert("Please Enter the Valid bgcolor in input box");
        return;
      }
      getColor(bgColor);
      setBgColor("");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={bgColor}
          className=" outline-none bg-gray-50  px-4 py-1 w-[60%]  md:w-[45%] lg:w-[30%] xl:w-[25%] mt-2 border border-b-gray-400 caret-gray-500"
          onChange={(e) => {
            handleChange(e);
          }}
          placeholder="Enter color to change background..."
        />
        <button
          type="submit"
          className="px-2 py-[5px] hover:bg-green-600 hover:shadow-md hover:shadow-neutral-300  transition duration-500 bg-green-500 text-white"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default EditImage;
