import AppRouter from "./router/AppRouter";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";

function App() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        transition={Slide}
        autoClose={1500}
      />
      <AppRouter />
    </div>
  );
}

export default App;
