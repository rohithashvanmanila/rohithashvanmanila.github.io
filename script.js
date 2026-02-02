/* ===== PROJECT STACK (EDIT ONLY THIS PART) ===== */
const projects = [
  {
    title: "Immersive Learning App",
    desc: "AR/VR based educational experience.",
    video: "Projects/P1.mp4",
    thumb: "Projects/P1.jpg"
  },
  {
    title: "AI Video Generator",
    desc: "Automated corporate & marketing videos.",
    video: "Projects/P1.mp4",
    thumb: "Projects/P1.jpg"
  },
  {
    title: "Product Demo Platform",
    desc: "Interactive demo for hardware & software.",
    video: "Projects/P1.mp4",
    thumb: "Projects/P1.jpg"
  }
];

/* ===== REST OF YOUR CODE BELOW ===== */
const grid = document.getElementById("projectGrid");

projects.forEach(p => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `
    <img src="${p.thumb}">
    <div class="title">${p.title}</div>

    <video src="${p.video}" controls></video>
    <div class="desc">${p.desc}</div>
    <button class="close">×</button>
  `;

  card.onclick = () => openCard(card);
  card.querySelector(".close").onclick = e => closeCard(e, card);

  grid.appendChild(card);
});

let activeCard = null;

function openCard(card){
  if (activeCard && activeCard !== card) {
    closeActiveCard(); // ALWAYS close old one first
  }

  activeCard = card;
  card.classList.add("expanded");
  document.querySelector(".project-backdrop").classList.add("active");

  const video = card.querySelector("video");
  video.currentTime = 0;
  video.play();
}

function closeCard(e, card){
  if (e) e.stopPropagation(); // safe check

  const video = card.querySelector("video");
  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  card.classList.remove("expanded");
  activeCard = null;

  // REMOVE BLUR BACKDROP
  document.querySelector(".project-backdrop").classList.remove("active");
}


function closeActiveCard(){
  if (!activeCard) return;

  const v = activeCard.querySelector("video");
  v.pause();
  v.currentTime = 0;

  activeCard.classList.remove("expanded");
  document.querySelector(".project-backdrop").classList.remove("active");
  activeCard = null;
}


