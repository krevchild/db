// 비밀번호 확인 함수
function submitPassword() {
  const password = document.getElementById("password").value;
  // const password = "1234";
  const correctPassword = "1234"; // 원하는 비밀번호 설정

  if (password === correctPassword) {
    // 페이지 이동 또는 다른 작업 수행
    window.location.href = "success.html"; // 예: 성공 페이지로 이동
  } else {
    alert("Incorrect password. Try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 페이드인 효과
  document.body.style.opacity = 1;

  const passwordInput = document.getElementById("password");
  passwordInput.focus(); // 입력 창에 포커스 설정
  const loadingOverlay = document.querySelector(".loading-overlay");
  setTimeout(() => {
    loadingOverlay.style.display = "none"; // 로딩 오버레이 완전히 제거
  }, 500); // 0.5초 후 제거
});
