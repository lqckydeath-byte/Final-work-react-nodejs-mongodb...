import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <h1>Habit Analytics</h1>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default Navbar;