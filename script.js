function submitPassword() {
  const password = document.getElementById("password").value;
  const correctPassword = "1234"; // 원하는 비밀번호 설정

  if (password === correctPassword) {
    alert("Access Granted!");
    // 페이지 이동 또는 다른 작업 수행
    window.location.href = "success.html"; // 예: 성공 페이지로 이동
  } else {
    alert("Incorrect password. Try again.");
  }
}

function submitPassword() {
  const password = document.getElementById("password").value;
  const correctPassword = "1234";

  if (password === correctPassword) {
    alert("Access Granted!");
    window.location.href = "success.html";
  } else {
    alert("Incorrect password. Try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.querySelector(".loading-overlay");
  setTimeout(() => {
    loadingOverlay.style.display = "none"; // 로딩 오버레이 완전히 제거
  }, 500); // 0.5초 후 제거
});
