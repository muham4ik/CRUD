import Users from "./components/pages/users/index";
import SingleUser from "./components/pages/single_user/index";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/single_user" element={<SingleUser />} />
    </Routes>
  );
}

export default App;
