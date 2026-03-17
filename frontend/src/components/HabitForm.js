import { useState } from "react";
import API from "../services/api";

function HabitForm({ loadHabits }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Create habit form submitted with:", { title, description });
    try {
      const token = localStorage.getItem("token");
      console.log("Token exists:", !!token);
      console.log("Sending POST to /habits...");
      const res = await API.post("/habits", { title, description });
      console.log("Habit created:", res.data);
      setTitle("");
      setDescription("");
      loadHabits();
    } catch (err) {
      console.error("Create habit error:", err.response?.data || err.message);
      alert(`Failed to add habit: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Habit title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  );
}

export default HabitForm;