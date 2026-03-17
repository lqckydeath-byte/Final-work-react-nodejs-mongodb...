import { useState, useEffect } from "react";
import API from "../services/api";
import HabitForm from "../components/HabitForm";
import HabitList from "../components/HabitList";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [habits, setHabits] = useState([]);

  const loadHabits = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Loading habits, token exists:", !!token);
      const res = await API.get("/habits");
      console.log("Habits loaded:", res.data);
      setHabits(res.data);
    } catch (err) {
      console.error("ошибка при загрузки привычек:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadHabits();
  }, []);

  const deleteHabit = async (id) => {
    try {
      await API.delete(`/habits/${id}`);
      loadHabits();
    } catch (err) {
      alert("ошибка удаления привычки");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <h2>мои привычки</h2>
        <HabitForm loadHabits={loadHabits} />
        <HabitList habits={habits} deleteHabit={deleteHabit} />
      </div>
    </div>
  );
}

export default Dashboard;