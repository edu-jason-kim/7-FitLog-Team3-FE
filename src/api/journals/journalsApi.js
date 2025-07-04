const BASE_URL = `https://fitlog-server-o04e.onrender.com/journals`;

export const getJournalsList = async (params = {}) => {
  const { page = 1, pageSize = 6, orderBy = "newest", keyword = "" } = params;

  const url = new URL(BASE_URL);
  url.searchParams.append("page", page);
  url.searchParams.append("pageSize", pageSize);
  url.searchParams.append("orderBy", orderBy);
  if (keyword) {
    url.searchParams.append("keyword", keyword);
  }
  try {
    const res = await fetch(url.toString(), {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`HTTP 상태 ${res.status}`);
    }

    const data = await res.json();
    // data 객체는 journals, totalCount 프로퍼티
    return data;
  } catch (err) {
    console.error("저널 조회 실패 : ", err.message);
    throw err;
  }
};

export const getJournalByJournalId = async (journalId) => {
  const url = new URL(`${BASE_URL}/${journalId}`);
  try {
    const res = await fetch(url.toString(), {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`HTTP 상태 ${res.status}`);
    }
    const data = await res.json();
    const { data: journal } = data;
    return journal;
  } catch (err) {
    console.error("저널 조회 실패 : ", err.message);
    throw err;
  }
};

export const postEmojiByJournalId = async (journalId, emojiType) => {
  const url = new URL(`${BASE_URL}/${journalId}/emojis`);
  try {
    const res = await fetch(url.toString(), {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emojiType: emojiType }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP 상태 ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("이모지 등록 실패 : ", err.message);
    throw err;
  }
};

export const deleteJournal = async (journalId) => {
  const url = new URL(`${BASE_URL}/${journalId}`);
  try {
    const res = await fetch(url.toString(), {
      method: "DELETE",
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP 상태 ${res.status}`);
    }
    const contentType = res.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const data = await res.json();
      return data;
    } else if (res.status === 204) {
      return;
    } else {
      return await res.text();
    }
  } catch (err) {
    console.error("저널 삭제 실패 : ", err.message);
    throw err;
  }
};

export const verifyJournalPassword = async ({ journalId, password }) => {
  // 객체 형태로 journalId와 password를 받습니다.
  const url = new URL(`${BASE_URL}/${journalId}/verifyJournalPassword`);
  try {
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }), // ✅ 실제 입력된 비밀번호 전송
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP 상태 ${res.status}`);
    }

    const data = await res.json();
    return data.success; // ✅ true 또는 false를 반환한다고 가정
  } catch (err) {
    console.error("비밀번호 검증 실패: ", err.message);
    throw err;
  }
};
