import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { schemaTodo } from "../validator/schemaTodo";
import { toast } from "react-toastify";
import yupValidate from "../validator/yupValidate";

const initialInput = {
  taskName: "",
  userID: "",
};

function ToDoPage() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await schemaTodo.validate(input, { abortEarly: false });
      // await authApi.login(input);

      setInput(initialInput);
      setInputError(initialInput);
    } catch (err) {
      toast.error("Todo invalid");
      if (err instanceof Yup.ValidationError) {
        const errorYup = yupValidate(err);
        setInputError(errorYup);
      }
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <div className="flex justify-center flex-col   h-screen pb-40 items-center">
      <div className="flex flex-col justify-between bg-gray-600  border border-white rounded-2xl h-fit  w-120 p-12">
        <div className="flex justify-between mb-12">
          <h1 className="text-3xl">My Todo</h1>
          <p className=" text-2xl text-center rounded-xl content-center  bg-gray-700 w-10 h-10">
            🚀
          </p>
        </div>
        <div className="flex justify-center">
          <input className="bg-gray-400 h-10 w-1/1 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default ToDoPage;
