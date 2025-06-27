// RoutineTable.jsx
import React, { useState } from "react";

const weekDays = ['월', '화', '수', '목', '금', '토', '일'];

function RoutineTable() {
  const [habitList, setHabitList] = useState(initialHabits);

  const toggleCheck = (habitId, day) => {
    setHabitList((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              records: {
                ...habit.records,
                [day]: !habit.records[day],
              },
            }
          : habit
      )
    );
  };

  return (
    <section className="habit-table">
      <h2>습관 기록표</h2>
      <ul>
        {habitList.map((habit) => (
          <li key={habit.id} style={{ marginBottom: "16px" }}>
            <div style={{ fontWeight: "bold", marginBottom: "8px" }}>
              {habit.name}
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              {weekDays.map((day) => {
                const checked = habit.records[day];
                return (
                  <img
                    key={day}
                    src={checked ? "/stampFilled.png" : "/stampEmpty.png"}
                    alt={day}
                    style={{ width: 32, height: 32, cursor: "pointer" }}
                    onClick={() => toggleCheck(habit.id, day)}
                  />
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RoutineTable;