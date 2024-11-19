import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// Supabase 설정
const SUPABASE_URL = "https://fkrzvnusqciasbtydenw.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrcnp2bnVzcWNpYXNidHlkZW53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE1NDE4NjYsImV4cCI6MjA0NzExNzg2Nn0.VPlaPvBK6PiYa-ZlLi8ZO6z1TXFc8--o5HHmK-7Ayuk";

// Supabase 클라이언트 생성
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// // 데이터베이스 로그 확인
// (async () => {
//   const { data, error } = await supabase.from("users").select("*");
//   if (error) {
//     console.error("데이터 가져오기 에러:", error);
//   } else {
//     console.log("사용자 데이터:", data);
//   }
// })();

// HTML 요소 가져오기
const searchInput = document.getElementById("search-input");
const dataTable = document.getElementById("data-table").querySelector("tbody");
const paginationContainer = document.createElement("div"); // 페이지 버튼 컨테이너
paginationContainer.className = "pagination-container";
document.querySelector(".table-container").appendChild(paginationContainer);

// 메시지 박스와 입력 필드 참조
const messageBox = document.getElementById("message-box");

// 버튼 참조
const searchButton = document.getElementById("search-button");
const reloadButton = document.getElementById("reload-button");

let currentPage = 1; // 현재 페이지 번호
const rowsPerPage = 12; // 한 페이지에 표시할 데이터 수

// 데이터를 가져와 테이블에 표시하는 함수
async function loadData(page = 1) {
  try {
    const offset = (page - 1) * rowsPerPage; // 시작 데이터 계산
    const { data, count, error } = await supabase
      .from("users")
      .select("*", { count: "exact" }) // 총 데이터 개수 반환
      .order("name", { ascending: true }) // 이름 기준 오름차순 정렬
      .range(offset, offset + rowsPerPage - 1); // 현재 페이지에 해당하는 데이터 범위

    if (error) {
      console.error("데이터 로드 중 에러:", error);
      return;
    }

    // 테이블 초기화
    dataTable.innerHTML = "";

    // 데이터를 테이블에 추가
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${item.name}</td>
          <td>${item.age}</td>
          <td>${item.address}</td>
          <td>${item.balance}</td>
        `;
      dataTable.appendChild(row);
    });

    // 페이지네이션 업데이트
    updatePagination(Math.ceil(count / rowsPerPage), page);
  } catch (err) {
    console.error("데이터 로드 실패:", err);
  }
}

// 검색 함수
async function searchData(page = 1) {
  const searchInput = document.getElementById("search-input");
  const messageBox = document.getElementById("message-box");
  const dataTable = document
    .getElementById("data-table")
    .querySelector("tbody");

  const searchValue = searchInput.value.trim();

  if (!searchValue) {
    showMessage("입력란이 비어있습니다.", "red");
    return;
  }

  try {
    const offset = (page - 1) * rowsPerPage;

    const { data, count, error } = await supabase
      .from("users")
      .select("*", { count: "exact" })

      .order("name", { ascending: true })
      .range(offset, offset + rowsPerPage - 1);

    if (error) {
      console.error("검색 중 에러:", error);
      showMessage("검색 중 오류가 발생했습니다.", "red");
      return;
    }

    if (!data || data.length === 0) {
      showMessage("데이터를 찾을 수 없습니다.", "orange");
      dataTable.innerHTML = ""; // 테이블 초기화
      return;
    }

    // 테이블 초기화
    dataTable.innerHTML = "";

    // 검색 결과를 테이블에 추가
    data.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${item.name || "-"}</td>
          <td>${item.age || "-"}</td>
          <td>${item.address || "-"}</td>
          <td>${item.balance || "-"}</td>
        `;
      dataTable.appendChild(row);
    });

    showMessage("데이터를 찾았습니다.", "green");
  } catch (err) {
    console.error("검색 실패:", err);
    showMessage("검색 실패: 서버 오류", "red");
  }
}

// 페이지네이션 버튼 업데이트
function updatePagination(totalPages, currentPage) {
  paginationContainer.innerHTML = ""; // 기존 버튼 제거

  // 이전 페이지 버튼
  const prevButton = document.createElement("button");
  prevButton.className = "pagination-button";
  prevButton.innerText = "<";
  prevButton.disabled = currentPage === 1; // 첫 페이지에서 비활성화
  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      if (searchInput.value.trim()) {
        searchData(currentPage - 1); // 검색 중 이전 페이지
      } else {
        loadData(currentPage - 1); // 일반 데이터 이전 페이지
      }
    }
  });
  paginationContainer.appendChild(prevButton);

  // 숫자 버튼 생성
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.className = "pagination-button";
    button.innerText = i;

    // 현재 페이지 강조
    if (i === currentPage) {
      button.classList.add("active");
    }

    // 페이지 변경 이벤트
    button.addEventListener("click", () => {
      if (searchInput.value.trim()) {
        searchData(i); // 검색 중이면 검색 데이터 페이지네이션
      } else {
        loadData(i); // 일반 데이터 페이지네이션
      }
    });

    paginationContainer.appendChild(button);
  }

  // 다음 페이지 버튼
  const nextButton = document.createElement("button");
  nextButton.className = "pagination-button";
  nextButton.innerText = ">";
  nextButton.disabled = currentPage === totalPages; // 마지막 페이지에서 비활성화
  nextButton.addEventListener("click", () => {
    if (currentPage < totalPages) {
      if (searchInput.value.trim()) {
        searchData(currentPage + 1); // 검색 중 다음 페이지
      } else {
        loadData(currentPage + 1); // 일반 데이터 다음 페이지
      }
    }
  });
  paginationContainer.appendChild(nextButton);
}

// 새로고침 함수
function reloadData() {
  searchInput.value = ""; // 검색창 초기화
  loadData(1); // 첫 페이지 데이터 로드
}

// 페이지 로드 시 데이터 로드
document.addEventListener("DOMContentLoaded", () => {
  loadData();
});

// 데이터 찾기 버튼 동작
searchButton.addEventListener("click", () => {
  const searchValue = searchInput.value.trim();

  if (!searchValue) {
    // 입력란이 비어있을 때
    showMessage("입력란이 비어있습니다.", "black");
  } else {
    // 검색 수행 (여기서 간단히 성공 여부를 랜덤으로 판단)
    const found = Math.random() > 0.5; // 50% 확률로 찾음
    if (found) {
      showMessage("데이터를 찾았습니다.", "black");
    } else {
      showMessage("못찾았습니다.", "black");
    }
  }
});

// 새로고침 버튼 동작
reloadButton.addEventListener("click", () => {
  showMessage("테이블이 새로 고침되었습니다.", "black");
  reloadData();
  // 추가적인 새로고침 작업 수행 (예: 테이블 데이터 다시 로드)
  // loadData(); // 필요시 구현
  // 5초 후 메시지 숨기기
  setTimeout(() => {
    messageBox.classList.remove("show");
  }, 5000);
});

// 메시지 표시 함수
function showMessage(message, color) {
  const messageBox = document.getElementById("message-box");

  messageBox.textContent = message; // 메시지 설정
  messageBox.style.color = color; // 색상 설정
  messageBox.classList.add("show"); // 보이게 설정

  // 5초 후 메시지 숨기기
  setTimeout(() => {
    messageBox.classList.remove("show");
  }, 5000);
}
