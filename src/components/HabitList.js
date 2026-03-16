function HabitList({ habits, deleteHabit }) {
  return (
    <ul>
      {habits.map((habit) => (
        <li key={habit._id}>
          <strong>{habit.title}</strong>
          {habit.description && <p>{habit.description}</p>}
          <button onClick={() => deleteHabit(habit._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default HabitList;