import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <div>
        <NavLink to={"/"}>login</NavLink>
        <NavLink to={"/signup"}>SignUp</NavLink>
      </div>
      <Outlet />
    </div>
  );
}

export default App;
