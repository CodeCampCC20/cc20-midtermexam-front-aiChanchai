import React, { useState } from "react";
import { useNavigate } from "react-router";
import { schemaLogin } from "../validator/schemaLogin";
import * as Yup from "yup";
import { toast } from "react-toastify";
import authApi from "../api/todoApi";
import InputRegister from "../components/form/InputRegister";

const initialInput = {
  username: "",
  password: "",
};

function LoginPage() {
  const [input, setInput] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState(initialInput);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      //validate
      schemaLogin.validate(input, { abortEarly: false });

      //api
      const res = await authApi.login(input);
      console.log("res", res.data);

      setInput(initialInput);
      navigate("/todo");

      //alert
      toast.success("Login success!!");
    } catch (error) {
      console.log(error);
      toast.error("Login invalid!!");

      if (error instanceof Yup.ValidationError) {
        const err = error.inner.reduce((acc, cur) => {
          acc[cur.path] = cur.message;
          return acc;
        }, {});
        setInputError(err);
      }
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <div className="flex justify-center h-screen pb-40 items-center  ">
      <div>
        <form className="flex flex-col bg-gray-600  justify-between border border-white rounded-2xl h-100 w-120 p-12">
          <h1 onSubmit={handleSubmit} className="text-4xl font-bold">
            Welcome
          </h1>
          <InputRegister
            className="bg-gray-700 text-grey-400 h-10 pl-2 rounded-md"
            name="username"
            placeholder="Enter your username"
            handleChange={handleChange}
            error={inputError.username}
            value={input.username}
            text="text"
          />
          <InputRegister
            className="bg-gray-700 text-grey-400 h-10 pl-2 rounded-md"
            name="password"
            placeholder="Enter your password"
            handleChange={handleChange}
            error={inputError.password}
            value={input.password}
            text="text"
            type="password"
          />
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/register")}
              className="w-1/2 b bg-gray-700 h-10 rounded-md"
            >
              Register
            </button>
            <button
              onClick={() => navigate("/todo")}
              className="w-1/2 bg-gray-700 h-10 rounded-md"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
