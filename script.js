/* ===== PROJECT STACK (EDIT ONLY THIS PART) ===== */
const projectDefs = [
  {
    folder: "P1",
    title: "Champions Launch",
    orientation: "landscape", // or "portrait"
    disclaimer: "© Created as part of professional work. For portfolio use only. All rights belong to respective owners.",
    projectType: "Video Editing • Motion Graphics • Typography",
    focus: "Built as a high-energy launch piece with clear hierarchy, quick pacing, and a strong sense of build-up.\nThe aim was to make the announcement feel immediate, polished, and easy to follow.",
    contribution: [
      "Structured the edit to create momentum across the launch message.",
      "Designed and animated typography for key callouts.",
      "Integrated motion graphics to support the promo tone.",
      "Refined transitions and timing for a sharper overall flow."
    ],
    desc: "A promo video created to introduce a new batch in a way that felt fast, clear, and visually driven.\n\nThe edit focused on momentum, strong text hierarchy, and motion-led transitions to hold attention while keeping the message clean.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
  {
    folder: "P2",
    title: "Fizz: Cold vs Hot",
    orientation: "portrait", // or "landscape"
    disclaimer: "© Created as part of professional work. For portfolio use only. All rights belong to respective owners.",
    projectType: "Motion Graphics • Animation",
    focus: "The visual approach was playful, bright, and motion-first, with attention on making static artwork feel lively on screen.\nI focused on readability, rhythm, and small visual details that added energy without overcrowding the frame.",
    contribution: [
      "Animated supplied design frames for a short-form marketing piece.",
      "Adjusted layouts and elements to improve motion clarity.",
      "Added particle details and secondary movement for depth.",
      "Built transitions that kept the piece smooth and connected."
    ],
    desc: "A short-form content piece built to make a simple comparison feel visually engaging and easy to watch on mobile.\n\nThe process centered on turning static frames into fluid animation, refining elements for motion, and adding texture through transitions and particle details.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
  {
    folder: "P3",
    title: "Hot vs Cold Water",
    orientation: "portrait", // or "landscape"
    disclaimer: "© Created as part of professional work. For portfolio use only. All rights belong to respective owners.",
    projectType: "Editing • Typography • Motion Effects",
    focus: "Approached as a compact experiment-led short where clarity mattered more than complexity.\nThe goal was to make the story quick to understand while still feeling paced and polished.",
    contribution: [
      "Structured the footage into a concise short-form edit.",
      "Balanced pacing for clarity within a tight runtime.",
      "Added typography and motion accents to improve engagement.",
      "Refined transitions and timing for a smoother viewing flow."
    ],
    desc: "A short-form experiment video designed to communicate a simple idea quickly and clearly.\n\nThe edit focused on structure, pacing, and supporting motion so the content stayed easy to follow while still feeling dynamic enough for short-form platforms.",
    tools: ["After Effects", "Premiere Pro"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
  {
    folder: "P5",
    title: "Why Knuckles Crack",
    orientation: "portrait", // or "landscape"
    disclaimer: "© Created as part of professional work. For portfolio use only. All rights belong to respective owners.",
    projectType: "Editing • Typography • Motion Graphics",
    focus: "The piece was shaped to make an educational topic feel light, clear, and visually polished.\nI focused on motion precision and clean visual communication so the content stayed informative without feeling heavy.",
    contribution: [
      "Animated supplied artwork into a short-form explainer.",
      "Adjusted design elements for better legibility in motion.",
      "Handled pacing and composition for social-first delivery.",
      "Polished the final edit with clean, precise motion details."
    ],
    desc: "A short educational explainer designed to make a familiar question feel engaging in a quick, mobile-friendly format.\n\nThe process focused on translating supplied visuals into clear motion, tightening readability, and using polished animation to keep the information approachable.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
  {
    folder: "P4",
    title: "Project Title",
    disclaimer: "© Created as part of professional work. For portfolio use only. All rights belong to respective owners.",
    focus: "Add 1-2 lines about the creative intent or approach behind this project.",
    contribution: [
      "Add contribution point 1.",
      "Add contribution point 2.",
      "Add contribution point 3."
    ],
    projectType: "Editing • Typography • Motion Graphics",
    desc: "Add a short 2-3 paragraph description explaining what the project was made for and what you focused on during execution.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
  {
    folder: "P6",
    title: "Project Title",
    disclaimer: "© Created as part of professional work. For portfolio use only. All rights belong to respective owners.",
    focus: "Add 1-2 lines about the creative intent or approach behind this project.",
    contribution: [
      "Add contribution point 1.",
      "Add contribution point 2.",
      "Add contribution point 3."
    ],
    projectType: "Editing • Typography • Motion Graphics",
    desc: "Add a short 2-3 paragraph description explaining what the project was made for and what you focused on during execution.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
];

const DEFAULT_MEDIA_NAMES = {
  video: "Video.webm",
  thumb: "Thumb.webp",
  gifPrefix: "G",
  gifExt: "webm"
};

function buildProjectAssets(def) {
  const base = `Projects/${def.folder}`;
  const videoName = def.videoName || DEFAULT_MEDIA_NAMES.video;
  const thumbName = def.thumbName || DEFAULT_MEDIA_NAMES.thumb;
  const gifPrefix = def.gifPrefix || DEFAULT_MEDIA_NAMES.gifPrefix;
  const gifExt = def.gifExt || DEFAULT_MEDIA_NAMES.gifExt;
  const gifCount = Number.isInteger(def.gifCount) ? def.gifCount : 0;

  return {
    ...def,
    orientation: def.orientation || "",
    disclaimer: def.disclaimer || "",
    focus: def.focus || "",
    contribution: Array.isArray(def.contribution) ? def.contribution : [],
    video: `${base}/${videoName}`,
    thumb: `${base}/${thumbName}`,
    gifs: Array.from({ length: gifCount }, (_, i) => `${base}/${gifPrefix}${i + 1}.${gifExt}`)
  };
}

const projects = projectDefs.map(buildProjectAssets);

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
  const SCRIPT_BASE_URL = (() => {
    const scriptEl = [...document.scripts].find((s) => (s.src || "").includes("script.js"));
    if (scriptEl && scriptEl.src) {
      return new URL(".", scriptEl.src).href;
    }
    return new URL(".", window.location.href).href;
  })();

  const grid = document.getElementById("projectGrid");
  const backdrop = document.querySelector(".project-backdrop");

  let activeCard = null;
  let expandedCard = null;
  let isClosing = false;
  let updatePortraitLayout = () => {};
  let currentAnim = null;
  let activeObjectUrls = [];
  let deferredLoadTimers = [];

  function lockMediaInteractions(root = document) {
    const mediaNodes = root.querySelectorAll("img, video");
    mediaNodes.forEach((node) => {
      node.setAttribute("draggable", "false");
      node.setAttribute("oncontextmenu", "return false;");
      node.addEventListener("dragstart", (e) => e.preventDefault());
      node.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }

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
    if (!activeObjectUrls.length) return;

    const usedBlobUrls = new Set(
      [...document.querySelectorAll("img, video, source")]
        .map((el) => el.currentSrc || el.src || "")
        .filter((src) => src.startsWith("blob:"))
    );

    const revokeQueue = activeObjectUrls.filter((url) => !usedBlobUrls.has(url));
    activeObjectUrls = activeObjectUrls.filter((url) => usedBlobUrls.has(url));

    // Delay revoke slightly so browsers finish pending decode/load tasks.
    window.setTimeout(() => {
      revokeQueue.forEach((url) => URL.revokeObjectURL(url));
    }, 1500);
  }

  function clearDeferredLoadTimers() {
    deferredLoadTimers.forEach((timerId) => window.clearTimeout(timerId));
    deferredLoadTimers = [];
  }

  function queueDeferredAction(callback, delay) {
    const timerId = window.setTimeout(() => {
      deferredLoadTimers = deferredLoadTimers.filter((id) => id !== timerId);
      callback();
    }, delay);
    deferredLoadTimers.push(timerId);
    return timerId;
  }

  function releaseMediaSources(root) {
    if (!root) return;
    root.querySelectorAll("video").forEach((v) => {
      v.pause();
      v.removeAttribute("src");
      v.load();
    });
    root.querySelectorAll("img").forEach((img) => {
      if ((img.src || "").startsWith("blob:")) {
        img.removeAttribute("src");
      }
    });
  }

  function inferMimeFromPath(path, tagName) {
    const lower = (path || "").toLowerCase();
    if (tagName === "VIDEO") {
      if (lower.endsWith(".webm")) return "video/webm";
      if (lower.endsWith(".mp4")) return "video/mp4";
      return "video/webm";
    }
    if (lower.endsWith(".svg")) return "image/svg+xml";
    if (lower.endsWith(".webp")) return "image/webp";
    if (lower.endsWith(".png")) return "image/png";
    if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
    return "image/*";
  }

  function normalizeMediaPath(mediaPath) {
    return String(mediaPath || "")
      .trim()
      .replace(/\\/g, "/")
      .replace(/^\.\//, "")
      .replace(/^\/+/, "");
  }

  function applyDirectUrl(element, mediaUrl) {
    const relativePath = normalizeMediaPath(mediaUrl);
    const directUrl = new URL(relativePath, SCRIPT_BASE_URL).href;
    element.src = directUrl;
    if (element.tagName === "VIDEO") {
      element.load();
    }
    return Promise.resolve(true);
  }

  function isMainVideoFile(relativePath) {
    return /(^|\/)Vid\.webm$/i.test(relativePath);
  }

  async function applyBlobUrl(element, mediaUrl, trackForRevoke = true) {
    const relativePath = normalizeMediaPath(mediaUrl);
    const directUrl = new URL(relativePath, SCRIPT_BASE_URL).href;

    // Blob URL is only for the main project video (Vid.webm).
    if (element.tagName !== "VIDEO" || !isMainVideoFile(relativePath)) {
      return applyDirectUrl(element, mediaUrl);
    }

    const fallbackToDirect = () => {
      element.src = directUrl;
      if (element.tagName === "VIDEO") {
        element.load();
      }
    };
    try {
      const res = await fetch(directUrl, { cache: "default" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const rawBlob = await res.blob();
      const headerMime = (res.headers.get("content-type") || "").toLowerCase();
      const receivedMime = (rawBlob.type || headerMime || "").toLowerCase();

      if (receivedMime.startsWith("text/html")) {
        throw new Error("Received HTML instead of media");
      }

      let finalBlob = rawBlob;
      if (!receivedMime || receivedMime === "application/octet-stream") {
        const expectedMime = inferMimeFromPath(directUrl, element.tagName);
        finalBlob = rawBlob.slice(0, rawBlob.size, expectedMime);
      }

      const blobUrl = URL.createObjectURL(finalBlob);
      if (trackForRevoke) {
        activeObjectUrls.push(blobUrl);
      }

      // Some hosts/browsers fail to decode blob URLs for certain media types.
      element.addEventListener("error", fallbackToDirect, { once: true });
      element.src = blobUrl;
      if (element.tagName === "VIDEO") {
        element.load();
      }
      return true;
    } catch (error) {
      fallbackToDirect();
      return true;
    }
  }

  function createStripMediaElement(mediaPath, altText) {
    const lower = mediaPath.toLowerCase();
    const isVideo = lower.endsWith(".webm") || lower.endsWith(".mp4");

    if (isVideo) {
      const media = document.createElement("video");
      media.className = "gif-thumb";
      media.muted = true;
      media.loop = true;
      media.autoplay = true;
      media.playsInline = true;
      media.preload = "metadata";
      media.setAttribute("aria-label", altText);
      media.addEventListener("loadeddata", () => {
        media.play().catch(() => {});
      });
      media.addEventListener("contextmenu", (e) => e.preventDefault());
      return media;
    }

    const media = document.createElement("img");
    media.className = "gif-thumb";
    media.alt = altText;
    media.loading = "lazy";
    media.decoding = "async";
    return media;
  }

  function syncGifItemAspect(gifItem, gifMedia, prefersPortrait) {
    if (prefersPortrait || !gifItem || !gifMedia) return;

    const applyAspect = (width, height) => {
      if (!width || !height) return;
      gifItem.style.aspectRatio = `${width} / ${height}`;
    };

    if (gifMedia.tagName === "VIDEO") {
      gifMedia.addEventListener("loadedmetadata", () => {
        applyAspect(gifMedia.videoWidth, gifMedia.videoHeight);
      }, { once: true });
      return;
    }

    gifMedia.addEventListener("load", () => {
      applyAspect(gifMedia.naturalWidth, gifMedia.naturalHeight);
    }, { once: true });
  }

  function buildSecondPassOrder(paths) {
    // Required order for 4 items: G2, G1, G4, G3
    if (paths.length === 4) {
      return [paths[1], paths[0], paths[3], paths[2]];
    }

    // Fallback: pairwise swap to keep a deterministic different order.
    const reordered = [...paths];
    for (let i = 0; i < reordered.length - 1; i += 2) {
      const tmp = reordered[i];
      reordered[i] = reordered[i + 1];
      reordered[i + 1] = tmp;
    }
    return reordered;
  }

  /* ===== RENDER PROJECTS ===== */
  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <img src="" alt="${project.title}" loading="lazy">
      <h3>${project.title}</h3>
    `;
    const cardImg = card.querySelector("img");
    cardImg.decoding = "async";
    cardImg.setAttribute("draggable", "false");
    cardImg.addEventListener("dragstart", (e) => e.preventDefault());
    cardImg.addEventListener("contextmenu", (e) => e.preventDefault());
    applyDirectUrl(cardImg, project.thumb).then((ok) => {
      if (!ok) {
        card.classList.add("media-missing");
      }
    });
    cardImg.addEventListener("error", () => {
      card.classList.add("media-missing");
    });
    grid.appendChild(card);
  });

  const cards = [...grid.querySelectorAll(".project-card")];
  cards.forEach((card, index) => {
    card.style.setProperty("--reveal-delay", `${Math.min(index * 70, 420)}ms`);
  });

  let centerCardFrame = null;

  function usesCenteredProjectPreview() {
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  }

  function updateCenteredProjectCard() {
    centerCardFrame = null;

    if (!usesCenteredProjectPreview() || expandedCard) {
      cards.forEach((card) => card.classList.remove("is-centered"));
      return;
    }

    const viewportCenterY = window.innerHeight * 0.5;
    let centeredCard = null;
    let closestDistance = Infinity;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();

      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        card.classList.remove("is-centered");
        return;
      }

      const cardCenterY = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenterY - viewportCenterY);

      if (distance < closestDistance) {
        closestDistance = distance;
        centeredCard = card;
      }
    });

    cards.forEach((card) => {
      card.classList.toggle("is-centered", card === centeredCard);
    });
  }

  function scheduleCenteredProjectCardUpdate() {
    if (centerCardFrame !== null) return;
    centerCardFrame = window.requestAnimationFrame(updateCenteredProjectCard);
  }

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

  window.addEventListener("scroll", scheduleCenteredProjectCardUpdate, { passive: true });
  window.addEventListener("resize", scheduleCenteredProjectCardUpdate);
  window.addEventListener("orientationchange", scheduleCenteredProjectCardUpdate);
  scheduleCenteredProjectCardUpdate();

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
  const gridThumb = card.querySelector("img");
  const thumbSrc = gridThumb?.getAttribute("src") || project.thumb;
  const thumbHasSize = Boolean(gridThumb?.naturalWidth && gridThumb?.naturalHeight);
  const projectOrientation = (project.orientation || "").toLowerCase();
  const prefersPortrait = projectOrientation === "portrait";

  const mediaWrapper = document.createElement("div");
  mediaWrapper.className = "media-wrapper";
  if (thumbHasSize) {
    mediaWrapper.style.setProperty("--media-aspect", `${gridThumb.naturalWidth} / ${gridThumb.naturalHeight}`);
  }
  if (prefersPortrait) {
    mediaWrapper.classList.add("portrait-media");
  }

  const primaryMedia = document.createElement("div");
  primaryMedia.className = "primary-media";
  primaryMedia.classList.add("is-loading");

  const thumb = document.createElement("img");
  thumb.className = "main-thumb";
  thumb.src = thumbSrc;
  thumb.alt = project.title;
  thumb.loading = "lazy";
  thumb.setAttribute("draggable", "false");
  thumb.addEventListener("dragstart", (e) => e.preventDefault());
  thumb.addEventListener("contextmenu", (e) => e.preventDefault());
  primaryMedia.appendChild(thumb);

  const video = document.createElement("video");
  video.className = "main-video";
  video.src = "";
  video.muted = false;
  video.autoplay = true;
  video.playsInline = true;
  video.controls = true;
  video.preload = "auto";
  video.setAttribute("controlsList", "nodownload");
  video.setAttribute("disablePictureInPicture", "true");
  video.addEventListener("contextmenu", (e) => e.preventDefault());
  video.style.opacity = "0";
  primaryMedia.appendChild(video);

  const videoLoader = document.createElement("div");
  videoLoader.className = "video-loader";
  videoLoader.setAttribute("aria-hidden", "true");
  primaryMedia.appendChild(videoLoader);

  mediaWrapper.appendChild(primaryMedia);
  applyBlobUrl(video, project.video).then((ok) => {
    if (!ok) {
      primaryMedia.classList.remove("is-loading");
      video.remove();
      thumb.style.opacity = "1";
    }
  });

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

    const secondPass = buildSecondPassOrder(gifPaths);
    const stripPaths = prefersPortrait ? [...gifPaths, ...secondPass] : gifPaths;

    stripPaths.forEach((gifPath, gifIndex) => {
      const gifItem = document.createElement("div");
      gifItem.className = "gif-item";

      const gifMedia = createStripMediaElement(gifPath, `${project.title} gif ${gifIndex + 1}`);
      gifMedia.src = "";
      syncGifItemAspect(gifItem, gifMedia, prefersPortrait);

      if (gifMedia.tagName === "VIDEO" && gifIndex >= gifPaths.length) {
        const secondPassIndex = gifIndex - gifPaths.length;
        const offsetSeconds = 1.5 + (0.12 * secondPassIndex);
        gifMedia.addEventListener("loadedmetadata", () => {
          if (!Number.isFinite(gifMedia.duration) || gifMedia.duration <= 0.2) return;
          gifMedia.currentTime = Math.min(offsetSeconds, Math.max(0, gifMedia.duration - 0.1));
        }, { once: true });
      }

      const loadGifMedia = () => {
        applyDirectUrl(gifMedia, gifPath).then((ok) => {
          if (!ok) {
            gifItem.remove();
            if (!gifStrip.children.length) {
              gifStrip.remove();
            }
          }
        });
      };

      if (gifIndex < gifPaths.length) {
        loadGifMedia();
      } else {
        if (gifMedia.tagName === "VIDEO") {
          gifMedia.preload = "none";
        }
        const deferredDelay = 220 + ((gifIndex - gifPaths.length) * 120);
        queueDeferredAction(() => {
          if (!expandedCard) return;
          loadGifMedia();
        }, deferredDelay);
      }
      gifMedia.addEventListener("error", () => {
        gifItem.remove();
        if (!gifStrip.children.length) {
          gifStrip.remove();
        }
      });

      gifItem.appendChild(gifMedia);
      gifStrip.appendChild(gifItem);
    });

    mediaWrapper.appendChild(gifStrip);
  }

  const content = document.createElement("div");
  content.className = "content-side";
  const focusMarkup = project.focus
    ? `
      <div class="project-focus">
        <h3>Creative Focus</h3>
        <p>${project.focus.replace(/\n/g, "<br>")}</p>
      </div>
    `
    : "";
  const contributionItems = Array.isArray(project.contribution) ? project.contribution.filter(Boolean) : [];
  const contributionMarkup = contributionItems.length
    ? `
      <div class="project-contribution">
        <h3>Contribution</h3>
        <ul>
          ${contributionItems.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </div>
    `
    : "";
  const creditMarkup = project.disclaimer
    ? `<p class="project-credit">${project.disclaimer}</p>`
    : "";
  const descriptionMarkup = String(project.desc || "")
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
  const tools = Array.isArray(project.tools) ? project.tools : [];
  const toolsMarkup = tools.length
    ? `
      <div class="tools-used-wrap">
        <h3>Tools Used</h3>
        <div class="tools-used-list">
          ${tools.map((tool) => {
            const iconPath = toolIcons[tool];
            if (iconPath) {
              return `<span class="tool-icon-chip" title="${tool}" aria-label="${tool}"><img src="" data-src="${iconPath}" alt="${tool}"></span>`;
            }
            return `<span class="tool-text-fallback">${tool}</span>`;
          }).join("")}
        </div>
      </div>
    `
    : "";
  content.innerHTML = `
    <h2>${project.title}</h2>
    <p class="project-type"><span class="role-label">My Role</span><span class="role-value">${project.projectType || "Editing • Typography • Motion Graphics"}</span></p>
    <div class="project-description">${descriptionMarkup}</div>
    ${focusMarkup}
    ${contributionMarkup}
    ${creditMarkup}
    ${toolsMarkup}
  `;

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "close-btn";
  closeBtn.setAttribute("aria-label", "Close project");
  closeBtn.textContent = "";

  expandedCard = document.createElement("article");
  expandedCard.className = "expanded-project";
  if (prefersPortrait) {
    expandedCard.classList.add("portrait-project");
  }
  expandedCard.style.top = `${rect.top}px`;
  expandedCard.style.left = `${rect.left}px`;
  expandedCard.style.width = `${rect.width}px`;
  expandedCard.style.height = `${rect.height}px`;
  expandedCard.appendChild(mediaWrapper);
  expandedCard.appendChild(content);
  expandedCard.appendChild(closeBtn);

  const toolIconNodes = content.querySelectorAll(".tool-icon-chip img[data-src]");
  toolIconNodes.forEach((iconImg) => {
    const iconPath = iconImg.getAttribute("data-src");
    if (!iconPath) return;
    iconImg.setAttribute("draggable", "false");
    iconImg.addEventListener("dragstart", (e) => e.preventDefault());
    iconImg.addEventListener("contextmenu", (e) => e.preventDefault());
    applyDirectUrl(iconImg, iconPath).then((ok) => {
      if (!ok) {
        iconImg.closest(".tool-icon-chip")?.remove();
      }
    });
  });

  lockMediaInteractions(expandedCard);

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

  const openStateDelay = prefersPortrait ? morphDuration + 40 : Math.max(140, morphDuration - 40);
  setTimeout(() => {
    if (!expandedCard) return;
    expandedCard.classList.add("expanded-open");
    if (prefersPortrait) {
      queueDeferredAction(() => {
        expandedCard?.classList.add("portrait-detail-ready");
      }, 110);
    }
  }, openStateDelay);

  let hasRevealedVideo = false;
  let hasStartedThumbFade = false;
  const startThumbFade = () => {
    if (hasStartedThumbFade || !expandedCard) return;
    hasStartedThumbFade = true;
    thumb.style.opacity = "0";
  };
  const revealVideo = () => {
    if (hasRevealedVideo || !expandedCard) return;
    hasRevealedVideo = true;
    primaryMedia.classList.remove("is-loading");
    startThumbFade();
    video.style.opacity = "1";
    video.play().catch(() => {});
  };

  video.addEventListener("loadeddata", startThumbFade, { once: true });
  video.addEventListener("loadeddata", revealVideo, { once: true });
  video.addEventListener("canplay", revealVideo, { once: true });

  video.addEventListener("error", () => {
    const current = video.currentSrc || video.src || "";
    if (current.startsWith("blob:")) {
      // Mirror gif behavior: if blob decode fails, continue with direct URL.
      applyDirectUrl(video, project.video);
      return;
    }
    primaryMedia.classList.remove("is-loading");
    video.pause();
    video.style.opacity = "0";
    thumb.style.opacity = "1";
  });
}



  /* ===== CLOSE FUNCTION ===== */

function closeActiveCard() {
  if (!expandedCard || !activeCard || isClosing) return;
  isClosing = true;
  const { morphDuration, panelDuration } = currentAnim || getAnimationConfig();
  clearDeferredLoadTimers();

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
      releaseMediaSources(localExpandedCard);
      localExpandedCard.remove();
      backdrop.style.display = "none";
      document.body.style.overflow = "auto";
      activeCard.style.visibility = "";
      revokeActiveObjectUrls();
      clearDeferredLoadTimers();
      expandedCard = null;
      activeCard = null;
      isClosing = false;
      currentAnim = null;
      updatePortraitLayout = () => {};
      scheduleCenteredProjectCardUpdate();
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
  lockMediaInteractions(document);
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);
  document.addEventListener("copy", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);
  document.addEventListener("cut", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);
  document.addEventListener("selectstart", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);
  document.addEventListener("dragstart", (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);
  document.addEventListener("keydown", (e) => {
    const key = (e.key || "").toLowerCase();
    const hasPrimaryModifier = e.ctrlKey || e.metaKey;
    const isShiftPressed = e.shiftKey;
    const shouldBlock =
      key === "f12" ||
      (hasPrimaryModifier && key === "s") ||
      (hasPrimaryModifier && key === "u") ||
      (hasPrimaryModifier && key === "p") ||
      (hasPrimaryModifier && isShiftPressed && ["i", "j", "c"].includes(key));

    if (!shouldBlock) return;

    e.preventDefault();
    e.stopPropagation();
  }, true);

});
