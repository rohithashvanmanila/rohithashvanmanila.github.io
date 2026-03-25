/* ===== PROJECT STACK (EDIT ONLY THIS PART) ===== */
const projectDefs = [
  {
    folder: "P1",
    title: "BYJU'S | 'Champions' New Batch Launch - Promo Video",
    orientation: "landscape", // or "portrait"
    projectType: "Video Editing, Typography Design, and Motion Graphics & Transitions",
    desc: "Promotional video created for BYJU'S to announce the launch of the 'Champions' batch. The video was designed to build excitement, highlight key program strengths, and maintain brand consistency while delivering high-energy visual storytelling. A visually engaging promo video that effectively communicates the value of the new batch and captures learner attention across digital platforms.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
  {
    folder: "P2",
    title: "BYJU'S | Content Marketing | Fizz - Cold vs Hot Drink",
    orientation: "portrait", // or "landscape"
    projectType: "Editing, Typography & Motion Graphics",
    desc: "Automated corporate & marketing videos.",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
{
    folder: "P3",
    title: "BYJU'S | Experiment Shorts | Hot vs Cold Water ",
    orientation: "landscape", // or "landscape"
    projectType: "Editing, Typography & Motion Graphics",
    desc: "lor",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    youtubeEmbed: "https://www.youtube.com/embed/Q02vqnFtLsQ",
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
  /*{
    folder: "P4",
    title: "lor",
    projectType: "Editing, Typography & Motion Graphics",
    desc: "lor",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
  {
    folder: "P5",
    title: "BYJU'S | Content Marketing | Why do Our Knuckles Pop and Crack ",
    projectType: "Editing, Typography & Motion Graphics",
    desc: "lor",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },
  {
    folder: "P6",
    title: "lor",
    projectType: "Editing, Typography & Motion Graphics",
    desc: "lor",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    videoName: "Vid.webm",
    thumbName: "Thumb.webp",
    gifCount: 4
  },*/
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
    video: `${base}/${videoName}`,
    thumb: `${base}/${thumbName}`,
    gifs: Array.from({ length: gifCount }, (_, i) => `${base}/${gifPrefix}${i + 1}.${gifExt}`)
  };
}

function getYouTubeEmbedUrl(input) {
  const raw = String(input || "").trim();
  if (!raw) return "";

  try {
    const url = new URL(raw);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const videoId = url.pathname.split("/").filter(Boolean)[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
    }

    if (host === "youtube.com" || host === "m.youtube.com") {
      if (url.pathname === "/watch") {
        const videoId = url.searchParams.get("v");
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }

      if (url.pathname.startsWith("/embed/")) {
        return raw;
      }

      if (url.pathname.startsWith("/shorts/")) {
        const videoId = url.pathname.split("/")[2];
        return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
      }
    }
  } catch (error) {
    return raw.includes("youtube.com/embed/") ? raw : "";
  }

  return "";
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
  const gridThumb = card.querySelector("img");
  const thumbSrc = gridThumb?.getAttribute("src") || project.thumb;
  const thumbHasSize = Boolean(gridThumb?.naturalWidth && gridThumb?.naturalHeight);
  const projectOrientation = (project.orientation || "").toLowerCase();
  const prefersPortrait = projectOrientation === "portrait";
  const youtubeEmbedUrl = getYouTubeEmbedUrl(project.youtubeEmbed);

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

  const thumb = document.createElement("img");
  thumb.className = "main-thumb";
  thumb.src = thumbSrc;
  thumb.alt = project.title;
  thumb.loading = "lazy";
  thumb.setAttribute("draggable", "false");
  thumb.addEventListener("dragstart", (e) => e.preventDefault());
  thumb.addEventListener("contextmenu", (e) => e.preventDefault());
  primaryMedia.appendChild(thumb);

  let video = null;
  let youtubeFrame = null;

  if (youtubeEmbedUrl) {
    youtubeFrame = document.createElement("iframe");
    youtubeFrame.className = "main-video main-youtube-embed";
    youtubeFrame.src = youtubeEmbedUrl;
    youtubeFrame.title = `${project.title} YouTube video`;
    youtubeFrame.loading = "lazy";
    youtubeFrame.referrerPolicy = "strict-origin-when-cross-origin";
    youtubeFrame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    youtubeFrame.allowFullscreen = true;
    youtubeFrame.style.opacity = "0";
    primaryMedia.appendChild(youtubeFrame);
  } else {
    video = document.createElement("video");
    video.className = "main-video";
    video.src = "";
    video.muted = true;
    video.autoplay = true;
    video.playsInline = true;
    video.controls = true;
    video.preload = "auto";
    video.setAttribute("controlsList", "nodownload");
    video.setAttribute("disablePictureInPicture", "true");
    video.addEventListener("contextmenu", (e) => e.preventDefault());
    video.style.opacity = "0";
    primaryMedia.appendChild(video);
  }
  mediaWrapper.appendChild(primaryMedia);
  if (video) {
    applyBlobUrl(video, project.video).then((ok) => {
      if (!ok) {
        video.remove();
        thumb.style.opacity = "1";
      }
    });
  }

  updatePortraitLayout = () => {};

  const setMediaOrientationClass = () => {
    if (video && video.videoWidth && video.videoHeight) {
      mediaWrapper.style.setProperty("--media-aspect", `${video.videoWidth} / ${video.videoHeight}`);
    }

    if (video && video.videoHeight > video.videoWidth) {
      mediaWrapper.classList.add("portrait-media");
      expandedCard?.classList.add("portrait-project");
    } else {
      mediaWrapper.classList.remove("portrait-media");
      expandedCard?.classList.remove("portrait-project");
    }
  };

  if (video) {
    video.addEventListener("loadedmetadata", setMediaOrientationClass, { once: true });
  }

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
    const stripPaths = [...gifPaths, ...secondPass];

    stripPaths.forEach((gifPath, gifIndex) => {
      const gifItem = document.createElement("div");
      gifItem.className = "gif-item";

      const gifMedia = createStripMediaElement(gifPath, `${project.title} gif ${gifIndex + 1}`);
      gifMedia.src = "";

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
    startThumbFade();
    if (video) {
      video.style.opacity = "1";
      video.play().catch(() => {});
      return;
    }
    if (youtubeFrame) {
      youtubeFrame.style.opacity = "1";
    }
  };

  if (video) {
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
      video.pause();
      video.style.opacity = "0";
      thumb.style.opacity = "1";
    });
  } else if (youtubeFrame) {
    queueDeferredAction(() => {
      if (!expandedCard) return;
      revealVideo();
    }, 120);
  }
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
  document.addEventListener("keydown", (e) => {
    const key = (e.key || "").toLowerCase();
    const hasPrimaryModifier = e.ctrlKey || e.metaKey;
    if (!hasPrimaryModifier) return;

    if (key === "s") {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

});
