const BASE_URL = "https://fitlog-server-o04e.onrender.com/routines";

//  루틴 목록 가져오기 (journalId 기준)
export const getRoutinesByJournalId = async (journalId) => {
  try {
    const res = await fetch(`${BASE_URL}?journalId=${journalId}`);
    if (!res.ok) {
      throw new Error(`HTTP 상태 ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("루틴 목록 가져오기 실패:", err);
    throw err;
  }
};

//  루틴 추가하기
export const createRoutine = async (journalId, newRoutine) => {
  try {
    const res = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...newRoutine, journalId }),
    });

    if (!res.ok) {
      throw new Error(`HTTP 상태 ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("루틴 생성 실패:", err);
    throw err;
  }
};

//  루틴 삭제하기
export const deleteRoutine = async (routineId) => {
  try {
    const res = await fetch(`${BASE_URL}/${routineId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error(`HTTP 상태 ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("루틴 삭제 실패:", err);
    throw err;
  }
};

// 루틴 체크 기록 가져오기
export const getWeeklyRoutinesStatus = async (journalId, dateString) => {
  const url = new URL(`${BASE_URL}/weeklyStatus`);
  url.searchParams.append("journalId", journalId);
  url.searchParams.append("date", dateString);
  try {
    const res = await fetch(url.toString(), {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`HTTP 상태 ${res.status}`);
    }

    const data = await res.json();

    return data.routines;
  } catch (err) {
    console.error("루틴 체크리스트 조회 실패 : ", err.message);
    throw err;
  }
};
