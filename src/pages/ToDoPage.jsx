import React, { useState } from "react";
import { useNavigate } from "react-router";
import * as Yup from "yup";
import { schemaTodo } from "../validator/schemaTodo";
import { toast } from "react-toastify";
import yupValidate from "../validator/yupValidate";
import useTodoStore from "../store/useToDoStore";
import useAuthStore from "../store/useAuthStore";
import todoApi from "../api/todoApi";
import InputRegister from "../components/form/InputRegister";

const initialInput = {
  taskName: "",
  userID: "4",
};

function ToDoPage() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInput);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const todos = useTodoStore((state) => state.todos);
  const actionFetchTodo = useTodoStore((state) => state.actionFetchTodo);
  const userId = useAuthStore((state) => state.userId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    setInputError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    try {
      await schemaTodo.validate(input, { abortEarly: false });

      //api
      const res = await todoApi.createTodo(input);
      console.log("res", res.data);

      setInput(initialInput);
      navigate("/todo");
      setInputError(initialInput);

      toast.success("Create success!!");
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
    <div className="flex justify-center flex-col   h-screen w-screen  items-center">
      <form
        onSubmit={handleSubmit}
        className="w-2/5 h-3/5 p-4 border rounded-2xl mx-auto space-y-4"
      >
        <h1 className="text-3xl font-bold">My Todo</h1>
        <div className="bg-gray-950 flex rounded-xl w-fit">
          <InputRegister
            name="taskName"
            placeholder="new task"
            handleChange={handleChange}
            error={inputError.taskName}
            value={input.taskName}
            text="Task"
            className="w-"
          />
        </div>
      </form>
    </div>
  );
}

export default ToDoPage;
