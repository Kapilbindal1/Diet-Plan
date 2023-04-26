import { Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  const recipeData = useSelector((state) => state.user.userData);

  useEffect(() => {
    if (Object.keys(recipeData).length === 0) {
      navigate("/");
    }
    console.log("check");
  }, []);

  return (
    <div>
      <Outlet />
    </div>
  );
}

export default App;
