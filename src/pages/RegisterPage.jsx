import React, { useState } from "react";
import InputRegister from "../components/form/InputRegister";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";
import { schemaRegister } from "../validator/schemaRegister";
import * as Yup from "yup";
import yupValidate from "../validator/yupValidate";

const initiaInput = {
  username: "",
  passwords: "",
  confirmPassword: "",
};

function RegisterPage() {
  const [input, setInput] = useState(initiaInput);
  const [inputError, setInputError] = useState(initiaInput);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  console.log("input", input);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await schemaRegister.validate(input, { abortEarly: false });

      navigate("/");
      setInput(initiaInput);
      setInputError(initiaInput);
      toast.success("Register Success");
    } catch (err) {
      console.log(err);
      toast.error("Register invalid");

      if (err instanceof Yup.ValidationError) {
        const errorYup = yupValidate(err);
        setInputError(errorYup);
      }
    } finally {
      setIsLoading(true);
    }
  };

  console.log("inputError", inputError);

  return (
    <div className="flex justify-center h-screen pb-40 items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-gray-600  justify-between border border-white rounded-2xl h-100 w-120 p-12"
      >
        <h1 className="text-3xl font-bold ">Register</h1>
        <InputRegister
          handleChange={handleChange}
          value={input.username}
          name="username"
          placeholder="Enter your username"
          error={inputError.username}
          type="text"
        />

        <InputRegister
          handleChange={handleChange}
          value={input.password}
          name="password"
          placeholder="Enter your Password"
          error={inputError.password}
          type="password"
        />

        <InputRegister
          handleChange={handleChange}
          value={input.confirmPasswrd}
          name="confirmPassword"
          placeholder="Enter your Password"
          error={inputError.confirmPassword}
          type="password"
        />

        <button
          disabled={isLoading}
          className=" bg-gray-700 h-10 rounded-md"
          type="submit"
        >
          {/* {isLoading && <Loader className="animate-spin" />} */}
          {isLoading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
