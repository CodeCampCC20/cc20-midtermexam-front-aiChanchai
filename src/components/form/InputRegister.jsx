import React from "react";

function InputRegister(props) {
  const {
    handleChange,
    value,
    name,
    placeholder,
    error,
    type = "text",
  } = props;

  return (
    <div>
      <div className="space-y-2">
        <input
          onChange={handleChange}
          value={value}
          name={name}
          className={`bg-gray-700 text-grey-400 h-10 pl-2 rounded-md px-4 py-2 ${
            error ? " outline-1 outline-red-500" : "outline-0"
          } placeholder:text-sm w-full `}
          type={type}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

export default InputRegister;
