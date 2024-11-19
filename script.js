// 비밀번호 확인 함수
function submitPassword() {
  const password = document.getElementById("password").value;
  const correctPassword = "1234"; // 원하는 비밀번호 설정

  if (password === correctPassword) {
    const body = document.body;

    setTimeout(() => {
      window.location.href = "success.html"; // 성공 페이지로 이동
    }, 1000); // 애니메이션 1초 후 이동
  } else {
    alert("Incorrect password. Try again.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 페이드인 효과
  document.body.style.opacity = 1;

  // 비디오 요소 가져오기
  // const introVideo = document.getElementById("intro-video");
  const loopVideo = document.getElementById("loop-video");

  // // 첫 번째 비디오가 끝나면 두 번째 비디오 시작
  // introVideo.addEventListener("ended", () => {
  //   introVideo.style.display = "none";
  //   loopVideo.style.display = "block";
  //   loopVideo.play();
  // });
});
