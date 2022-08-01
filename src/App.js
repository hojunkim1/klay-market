import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Detail from "./routes/Detail";
import Home from "./routes/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
