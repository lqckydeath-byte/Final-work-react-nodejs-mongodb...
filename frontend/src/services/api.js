const API_URL = "https://final-work-react-nodejs-mongodb.onrender.com/api";

export const login = async (data) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

// пример GET для привычки
export const getHabits = async () => {
  const res = await fetch(`${API_URL}/habits`);
  return res.json();
};