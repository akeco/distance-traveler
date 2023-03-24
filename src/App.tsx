import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home-page/home-page";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </>
  );
}

export default App;
