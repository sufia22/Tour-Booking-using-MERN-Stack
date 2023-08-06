import { ToastContainer } from "react-toastify";
import "./App.css";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <Layout />
    </>
  );
}

export default App;
