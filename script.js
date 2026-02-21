/* ===== PROJECT STACK (EDIT ONLY THIS PART) ===== */
const projects = [
  {
    title: "BYJU’S | “Champions” New Batch Launch – Promo Video",
    projectType: "Video Editing, Typography Design, and Motion Graphics & Transitions",
    desc: "Promotional video created for BYJU’S to announce the launch of the “Champions” batch. The video was designed to build excitement, highlight key program strengths, and maintain brand consistency while delivering high-energy visual storytelling. A visually engaging promo video that effectively communicates the value of the new batch and captures learner attention across digital platforms.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    video: "Projects/P1/P1.mp4",
    thumb: "Projects/P1/P1.jpg",
    gifs: [
      "Projects/P1/P1-gif-1.gif",
      "Projects/P1/P1-gif-2.gif",
      "Projects/P1/P1-gif-3.gif",
      "Projects/P1/P1-gif-4.gif",
      "Projects/P1/P1-gif-5.gif"
    ]
  },
  {
    title: "AI Video Generator",
    projectType: "Editing, Typography & Motion Graphics",
    desc: "Automated corporate & marketing videos.",
    tools: ["After Effects", "Premiere Pro", "Audition"],
    video: "Projects/P2/P2.mp4",
    thumb: "Projects/P1/P1.jpg",
    gifs: [ "Projects/P1/P1-gif-1.gif",
      "Projects/P1/P1-gif-2.gif",
      "Projects/P1/P1-gif-3.gif",
      "Projects/P1/P1-gif-4.gif",
      "Projects/P1/P1-gif-5.gif"]
  },
  {
    title: "Product Demo Platform",
    projectType: "Editing, Typography & Motion Graphics",
    desc: "Interactive demo for hardware & software.",
    tools: ["Premiere Pro", "Illustrator", "Photoshop"],
    video: "Projects/P3.mp4",
    thumb: "Projects/P3/P3.jpg",
    gifs: []
  }
];

const toolIcons = {
  "Premiere Pro": "Assets/Adobe_Premiere_Pro_CC_icon.svg",
  "After Effects": "Assets/Adobe_After_Effects_CC_icon.svg",
  "Photoshop": "Assets/Adobe_Photoshop_CC_icon.svg",
  "Illustrator": "Assets/Adobe_Illustrator_CC_icon.svg",
  "Audition": "Assets/Adobe_Audition_CC_icon.svg",
  "MS Office": "Assets/office.svg",
  "Microsoft Office": "Assets/office.svg",
  "Unreal Engine": "Assets/unreal.svg",
  "Blender": "Assets/Blender_logo_no_text.svg"
};

document.addEventListener("DOMContentLoaded", function () {

  const grid = document.getElementById("projectGrid");
  const backdrop = document.querySelector(".project-backdrop");

  let activeCard = null;
  let expandedCard = null;
  let isClosing = false;
  let updatePortraitLayout = () => {};
  let currentAnim = null;
  let activeObjectUrls = [];

  function getAnimationConfig() {
    const isMobile = window.innerWidth <= 700;
    if (isMobile) {
      return {
        curve: "cubic-bezier(0.16, 1, 0.3, 1)",
        morphDuration: 560,
        panelDuration: 320,
        backdropDuration: 360
      };
    }

    return {
      curve: "cubic-bezier(0.22, 1, 0.36, 1)",
      morphDuration: 420,
      panelDuration: 280,
      backdropDuration: 280
    };
  }

  function revokeActiveObjectUrls() {
    activeObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    activeObjectUrls = [];
  }

  async function applyBlobUrl(element, mediaUrl) {
    try {
      const res = await fetch(mediaUrl, { cache: "force-cache" });
      if (!res.ok) throw new Error(`Failed to fetch media: ${res.status}`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      activeObjectUrls.push(blobUrl);
      element.src = blobUrl;
    } catch (_) {
      element.src = mediaUrl;
    }
  }

  /* ===== RENDER PROJECTS ===== */
  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <img src="${project.thumb}" alt="${project.title}" loading="lazy">
      <h3>${project.title}</h3>
    `;
    const cardImg = card.querySelector("img");
    cardImg.addEventListener("error", () => {
      card.classList.add("media-missing");
    });
    grid.appendChild(card);
  });

  const cards = [...grid.querySelectorAll(".project-card")];
  cards.forEach((card, index) => {
    card.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16 });

    cards.forEach((card) => observer.observe(card));
  } else {
    cards.forEach((card) => card.classList.add("is-visible"));
  }

  /* ===== OPEN CARD ===== */
  grid.addEventListener("click", function (e) {
    const card = e.target.closest(".project-card");
    if (!card || expandedCard || isClosing) return;
    openCard(card);
  });

  function getExpandedTargetRect() {
    const isMobile = window.innerWidth <= 900;
    const inset = isMobile ? 14 : 20;
    const width = Math.min(window.innerWidth - inset * 2, 1180);
    const height = Math.min(window.innerHeight - inset * 2, 720);
    return {
      top: (window.innerHeight - height) / 2,
      left: (window.innerWidth - width) / 2,
      width,
      height
    };
  }

function openCard(card) {
  if (expandedCard || isClosing) return;
  currentAnim = getAnimationConfig();
  const { curve, morphDuration, backdropDuration } = currentAnim;
  activeCard = card;
  document.body.style.overflow = "hidden";

  const rect = card.getBoundingClientRect();
  const index = [...grid.children].indexOf(card);
  const project = projects[index];
  const thumbSrc = card.querySelector("img")?.getAttribute("src") || project.thumb;

  const mediaWrapper = document.createElement("div");
  mediaWrapper.className = "media-wrapper";

  const primaryMedia = document.createElement("div");
  primaryMedia.className = "primary-media";

  const thumb = document.createElement("img");
  thumb.className = "main-thumb";
  thumb.src = thumbSrc;
  thumb.alt = project.title;
  thumb.loading = "lazy";
  primaryMedia.appendChild(thumb);

  const video = document.createElement("video");
  video.className = "main-video";
  video.src = "";
  video.muted = true;
  video.autoplay = true;
  video.playsInline = true;
  video.controls = true;
  video.preload = "metadata";
  video.setAttribute("controlsList", "nodownload");
  video.addEventListener("contextmenu", (e) => e.preventDefault());
  video.style.opacity = "0";
  primaryMedia.appendChild(video);
  mediaWrapper.appendChild(primaryMedia);
  applyBlobUrl(video, project.video);

  updatePortraitLayout = () => {};

  const setMediaOrientationClass = () => {
    if (video.videoWidth && video.videoHeight) {
      mediaWrapper.style.setProperty("--media-aspect", `${video.videoWidth} / ${video.videoHeight}`);
    }

    if (video.videoHeight > video.videoWidth) {
      mediaWrapper.classList.add("portrait-media");
      expandedCard?.classList.add("portrait-project");
    } else {
      mediaWrapper.classList.remove("portrait-media");
      expandedCard?.classList.remove("portrait-project");
    }
  };

  video.addEventListener("loadedmetadata", setMediaOrientationClass, { once: true });

  const gifPaths = Array.isArray(project.gifs) ? project.gifs : [];
  if (gifPaths.length) {
    const gifStrip = document.createElement("div");
    gifStrip.className = "gif-strip";
    const isMobile = window.innerWidth <= 900;
    const stripHeight = isMobile
      ? (gifPaths.length <= 2 ? 82 : gifPaths.length <= 5 ? 96 : 110)
      : (gifPaths.length <= 2 ? 96 : gifPaths.length <= 5 ? 122 : 146);
    mediaWrapper.style.setProperty("--gif-strip-height", `${stripHeight}px`);
    const portraitCols = gifPaths.length <= 2 ? 1 : gifPaths.length <= 8 ? 2 : 3;
    mediaWrapper.style.setProperty("--portrait-gif-cols", `${portraitCols}`);

    gifPaths.forEach((gifPath, gifIndex) => {
      const gifItem = document.createElement("div");
      gifItem.className = "gif-item";

      const gifImg = document.createElement("img");
      gifImg.className = "gif-thumb";
      gifImg.src = "";
      gifImg.alt = `${project.title} gif ${gifIndex + 1}`;
      gifImg.loading = "lazy";
      gifImg.decoding = "async";
      applyBlobUrl(gifImg, gifPath);
      gifImg.addEventListener("error", () => {
        gifItem.remove();
        if (!gifStrip.children.length) {
          gifStrip.remove();
        }
      });

      gifItem.appendChild(gifImg);
      gifStrip.appendChild(gifItem);
    });

    mediaWrapper.appendChild(gifStrip);
  }

  const content = document.createElement("div");
  content.className = "content-side";
  const tools = Array.isArray(project.tools) ? project.tools : [];
  const toolsMarkup = tools.length
    ? `
      <div class="tools-used-wrap">
        <h3>Tools Used</h3>
        <div class="tools-used-list">
          ${tools.map((tool) => {
            const iconPath = toolIcons[tool];
            if (iconPath) {
              return `<span class="tool-icon-chip" title="${tool}" aria-label="${tool}"><img src="${iconPath}" alt="${tool}"></span>`;
            }
            return `<span class="tool-text-fallback">${tool}</span>`;
          }).join("")}
        </div>
      </div>
    `
    : "";
  content.innerHTML = `
    <h2>${project.title}</h2>
    <p class="project-type"><strong> My Role: </strong> ${project.projectType || "Editing, Typography & Motion Graphics"}</p>
    <p>${project.desc}</p>
    ${toolsMarkup}
  `;

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "close-btn";
  closeBtn.setAttribute("aria-label", "Close project");
  closeBtn.textContent = "";

  expandedCard = document.createElement("article");
  expandedCard.className = "expanded-project";
  expandedCard.style.top = `${rect.top}px`;
  expandedCard.style.left = `${rect.left}px`;
  expandedCard.style.width = `${rect.width}px`;
  expandedCard.style.height = `${rect.height}px`;
  expandedCard.appendChild(mediaWrapper);
  expandedCard.appendChild(content);
  expandedCard.appendChild(closeBtn);

  activeCard.style.visibility = "hidden";
  document.body.appendChild(expandedCard);
  closeBtn.addEventListener("click", closeActiveCard);

  backdrop.style.display = "block";
  backdrop.style.transition = `opacity ${backdropDuration}ms ease`;
  requestAnimationFrame(() => {
    backdrop.style.opacity = "1";
  });

  const target = getExpandedTargetRect();
  expandedCard.style.transition = [
    `top ${morphDuration}ms ${curve}`,
    `left ${morphDuration}ms ${curve}`,
    `width ${morphDuration}ms ${curve}`,
    `height ${morphDuration}ms ${curve}`,
    `border-radius ${morphDuration}ms ease`
  ].join(", ");

  requestAnimationFrame(() => {
    expandedCard.style.top = `${target.top}px`;
    expandedCard.style.left = `${target.left}px`;
    expandedCard.style.width = `${target.width}px`;
    expandedCard.style.height = `${target.height}px`;
  });

  setTimeout(() => {
    if (!expandedCard) return;
    expandedCard.classList.add("expanded-open");
  }, morphDuration - 40);

  video.addEventListener("loadeddata", () => {
    thumb.style.opacity = "0";
    video.style.opacity = "1";
    video.play().catch(() => {});
  }, { once: true });

  video.addEventListener("error", () => {
    video.remove();
  }, { once: true });
}



  /* ===== CLOSE FUNCTION ===== */

function closeActiveCard() {
  if (!expandedCard || !activeCard || isClosing) return;
  isClosing = true;
  const { morphDuration, panelDuration } = currentAnim || getAnimationConfig();

  const localExpandedCard = expandedCard;
  const rect = activeCard.getBoundingClientRect();

  const video = localExpandedCard.querySelector(".main-video");
  const thumb = localExpandedCard.querySelector(".main-thumb");

  if (video && thumb) {
    video.pause();
    video.style.opacity = "0";
    thumb.style.opacity = "1";
  }

  localExpandedCard.classList.remove("expanded-open");
  backdrop.style.opacity = "0";

  setTimeout(() => {
    localExpandedCard.style.top = `${rect.top}px`;
    localExpandedCard.style.left = `${rect.left}px`;
    localExpandedCard.style.width = `${rect.width}px`;
    localExpandedCard.style.height = `${rect.height}px`;

    setTimeout(() => {
      localExpandedCard.remove();
      backdrop.style.display = "none";
      document.body.style.overflow = "auto";
      activeCard.style.visibility = "";
      revokeActiveObjectUrls();
      expandedCard = null;
      activeCard = null;
      isClosing = false;
      currentAnim = null;
      updatePortraitLayout = () => {};
    }, morphDuration);
  }, panelDuration);
}



  /* ===== BACKDROP CLICK ===== */
  backdrop.addEventListener("click", closeActiveCard);

  /* ===== ESC KEY CLOSE ===== */
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeActiveCard();
    }
  });

  window.addEventListener("resize", () => {
    if (!expandedCard || !activeCard) return;
    const target = getExpandedTargetRect();
    expandedCard.style.top = `${target.top}px`;
    expandedCard.style.left = `${target.left}px`;
    expandedCard.style.width = `${target.width}px`;
    expandedCard.style.height = `${target.height}px`;
    requestAnimationFrame(updatePortraitLayout);
  });

  window.closeActiveCard = closeActiveCard;

});
