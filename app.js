(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const icon = (name) => `<i data-lucide="${name}" aria-hidden="true"></i>`;
  const renderIcons = () => window.lucide?.createIcons();
  const records = window.ARCHIVE_DATA || [];
  // 合并附录深读章节（content-expansion-g/h/i/j.js 等）：按记录 ID 追加到 expandedSections
  for (const key of Object.keys(window).filter((k) => k.indexOf("ARCHIVE_APPENDIX") === 0).sort()) {
    const appendix = window[key];
    if (!appendix) continue;
    records.forEach((record) => {
      const extra = appendix[record.id];
      if (Array.isArray(extra) && extra.length) {
        record.expandedSections = [...(record.expandedSections || []), ...extra];
      }
    });
  }
  const findRecord = (id) => records.find((record) => record.id === id);
  const hallList = [
    {
      id: "ancient",
      name: "史前超文明",
      english: "PREHISTORIC CIVILIZATIONS",
      image: "ancient",
      subtitle: "从遗迹与物证中，重访文明的起点。",
      icon: "landmark",
    },
    {
      id: "theories",
      name: "地外文明探索",
      english: "EXTRATERRESTRIAL EXPLORATION",
      image: "galaxy",
      subtitle: "从深空探测、射电搜寻到实景观测，追踪寻找地外生命的真实进程。",
      icon: "orbit",
    },
    {
      id: "beings",
      name: "外星种族档案",
      english: "EXTRATERRESTRIAL LIFE",
      image: "earth",
      subtitle: "从接触叙述到生命搜索，追溯每一条线索。",
      icon: "fingerprint",
    },
    {
      id: "uap",
      name: "UFO/UAP异象",
      english: "UNIDENTIFIED PHENOMENA",
      image: "gofast",
      subtitle: "保留原始记录，让未解之问接受求证。",
      icon: "radar",
    },
    {
      id: "circles",
      name: "麦田怪圈",
      english: "CROP CIRCLE ARCHIVES",
      image: "crop",
      subtitle: "阅读大地上的几何，也追问图案的来源。",
      icon: "aperture",
    },
    {
      id: "latitude30",
      name: "北纬三十度",
      english: "THE 30TH PARALLEL NORTH",
      image: "pyramid",
      subtitle: "沿着北纬三十度及其邻近地区，在遗迹、山水与文明之间展开探索。",
      icon: "globe-2",
    },
    {
      id: "symbols",
      name: "远古符号档案",
      english: "ANCIENT SYMBOL ARCHIVES",
      image: "rosetta",
      subtitle: "从文字、器物与古老星图出发，追溯符号的来历、释读与文明语境。",
      icon: "scan-text",
    },
  ];
  const libraryInfo = {
    id: "resources",
    name: "文献资源",
    english: "DOCUMENTS & RESEARCH LIBRARY",
  };
  const hall = (id) => hallList.find((item) => item.id === id) || libraryInfo;
  const categoryHref = (id) =>
    id === "resources" ? "#/library" : `#/hall/${id}`;
  const libraryRecords = () =>
    records.filter((record) => record.category === "resources" || record.resourceType || record.pdfUrl);
  const baseImageSources = {
    rosetta: {
      name: "罗塞塔石碑实物 · 大英博物馆", author: "Hans Hillewaert",
      source: "https://commons.wikimedia.org/wiki/File:Rosetta_Stone.JPG",
      license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    cuneiform: {
      name: "楔形文字私人信函泥板 · The Met 66.245.1", author: "The Metropolitan Museum of Art",
      source: "https://www.metmuseum.org/art/collection/search/325842",
      license: "CC0 / 公共领域", licenseUrl: "https://www.metmuseum.org/about-the-met/policies-and-documents/open-access",
    },
    antikythera: {
      name: "安提基特拉机械 A 残片正面", author: "Logg Tandy",
      source: "https://commons.wikimedia.org/wiki/File:Antikythera_Fragment_A_(Front).webp",
      license: "CC BY 4.0", licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
    nebra: {
      name: "内布拉天盘实物", author: "Dbachmann, Theway",
      source: "https://commons.wikimedia.org/wiki/File:Nebra_sky_disk.png",
      license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    oracle: {
      name: "王令众人曰协田刻辞卜骨 · 中国国家博物馆", author: "Windmemories",
      source: "https://commons.wikimedia.org/wiki/File:20251026_Oracle_Bone_with_Inscription.jpg",
      license: "CC BY-SA 4.0", licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    voyager: {
      name: "旅行者号飞行概念图（非飞行实拍）", author: "NASA/JPL",
      source: "https://commons.wikimedia.org/wiki/File:Voyager_spacecraft.jpg",
      license: "公共领域", licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    },
    mars: {
      name: "毅力号与 Cheyava Falls 岩石 · 2024 年自拍拼接图", author: "NASA/JPL-Caltech/MSSS",
      source: "https://science.nasa.gov/resource/perseverances-selfie-with-cheyava-falls/",
      license: "NASA/JPL 图像使用说明", licenseUrl: "https://www.jpl.nasa.gov/jpl-image-use-policy/",
    },
    nebula: {
      name: "船底座星云 NGC 3324 · 韦伯近红外观测",
      author: "NASA, ESA, CSA, STScI",
      source: "https://science.nasa.gov/universe/decoding-nebulae/",
      license: "NASA 图像使用说明",
      licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    },
    galaxy: {
      name: "仙女座星系 M31 · 哈勃观测局部拼接图",
      author:
        "NASA, ESA, J. Dalcanton, B. F. Williams, L. C. Johnson, the PHAT team, R. Gendler",
      source: "https://esahubble.org/images/heic1502a/",
      license: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
    ancient: {
      name: "英国巨石阵 · 2007 年实景",
      author: "garethwiscombe",
      source:
        "https://commons.wikimedia.org/wiki/File:Stonehenge2007_07_30.jpg",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    telescope: {
      name: "美国新墨西哥州 VLA 射电望远镜",
      author: "CGP Grey",
      source:
        "https://commons.wikimedia.org/wiki/File:New_Mexico_-_North_America_-_Radio_Telescopes_-_Radio_(4893508200).jpg",
      license: "CC BY 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
    },
    earth: {
      name: "蓝色弹珠 · 地球东半球卫星观测合成图",
      author: "NASA",
      source:
        "https://commons.wikimedia.org/wiki/File:Earth_Eastern_Hemisphere.jpg",
      license: "公共领域",
      licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    },
    crop: {
      name: "瑞士洛桑麦田图案实景",
      author: "Jabberocky",
      source: "https://commons.wikimedia.org/wiki/File:CropCircleW.jpg",
      license: "公共领域",
      licenseUrl:
        "https://commons.wikimedia.org/wiki/File:CropCircleW.jpg#Licensing",
    },
    pyramid: {
      name: "埃及吉萨金字塔群实景",
      author: "KennyOMG",
      source:
        "https://commons.wikimedia.org/wiki/File:Pyramids_of_the_Giza_Necropolis.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
    gobekli: {
      name: "土耳其哥贝克力石阵发掘现场",
      author: "Teomancimit",
      source:
        "https://commons.wikimedia.org/wiki/File:G%C3%B6bekli_Tepe,_Urfa.jpg",
      license: "CC BY-SA 3.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
    },
    earthrise: {
      name: "阿波罗 8 号「地出」 · AS08-14-2383",
      author: "NASA / Bill Anders",
      source: "https://science.nasa.gov/resource/apollo-8s-iconic-earthrise/",
      license: "公共领域",
      licenseUrl: "https://www.nasa.gov/nasa-brand-center/images-and-media/",
    },
    gofast: {
      name: "GOFAST · 美国海军 2015 年红外影像",
      author: "United States Navy / Department of Defense",
      source:
        "https://commons.wikimedia.org/wiki/File:Go_Fast_Official_USG_Footage_of_UAP_for_Public_Release.webm",
      license: "公共领域",
      licenseUrl: "https://creativecommons.org/publicdomain/mark/1.0/",
    },
    sanxingdui: {
      name: "三星堆博物馆 · 青铜兽面",
      author: "Gary Todd",
      source:
        "https://commons.wikimedia.org/wiki/File:Bronze_Animal_Mask_from_Sanxingdui_8.jpg",
      license: "CC0 1.0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
    },
    westlake: {
      name: "杭州西湖 · 雷峰夕照",
      author: "Yinweichen",
      source:
        "https://commons.wikimedia.org/wiki/File:West_Lake_Panorama_at_Dusk.jpg",
      license: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  };
  // 合并外部图片注册表：新增档案可通过 IMAGE_SOURCES_EXTRA 为每条记录登记独立图片（assets/<key>.jpg）
  const imageSources = Object.assign({}, baseImageSources, window.IMAGE_SOURCES_EXTRA || {});
  const imageKey = (record) => {
    // 专属图片优先：content-images-registry.js 中登记的记录专属图（assets/img/<id>.jpg）
    if (imageSources[record.id]) return record.id;
    if (record.id === "stonehenge-landscape") return "ancient";
    if (record.id === "giza-necropolis") return "pyramid";
    if (record.id === "gobekli-tepe") return "gobekli";
    if (record.id === "earthrise-original") return "earthrise";
    if (record.id === "gofast-analysis") return "gofast";
    if (record.category === "circles") return "crop";
    if (imageSources[record.imageKey]) return record.imageKey;
    return (
      {
        space: "galaxy",
        signal: "telescope",
        earth: "earth",
        moon: "earth",
        pyramid: "pyramid",
        sanxingdui: "sanxingdui",
        westlake: "westlake",
        nebula: "nebula",
        galaxy: "galaxy",
        telescope: "telescope",
        circle: "crop",
      }[record.imageKey] || "nebula"
    );
  };
  const photo = (key, className = "", loading = "lazy") =>
    `<img class="${className}" src="assets/${key}.jpg" alt="${esc(imageSources[key]?.name || "星际档案配图")}" width="800" height="500" loading="${loading}" decoding="async">`;
  let storageAvailable = true;
  function readStore(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(`guangti-${key}`));
      return Array.isArray(value) ? value : fallback;
    } catch {
      storageAvailable = false;
      return fallback;
    }
  }
  let saved = new Set(readStore("saved", []).filter((id) => findRecord(id)));
  let history = readStore("history", []).filter((id) => findRecord(id));
  let downloads = readStore("downloads", []).filter((id) => findRecord(id));
  let searches = readStore("searches", [])
    .filter((item) => typeof item === "string")
    .slice(0, 6);
  function persist(key, value) {
    try {
      localStorage.setItem(`guangti-${key}`, JSON.stringify(value));
      return true;
    } catch {
      storageAvailable = false;
      return false;
    }
  }
  let toastTimer;
  function toast(message) {
    clearTimeout(toastTimer);
    $("#toast").textContent = message;
    $("#toast").classList.add("show");
    toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2800);
  }
  function updateSavedUI() {
    $("#bookmark-count").hidden = !saved.size;
    $("#bookmark-count").textContent = saved.size;
    $$('[data-action="bookmark"]').forEach((button) => {
      const active = saved.has(button.dataset.id);
      button.classList.toggle("saved", active);
      button.setAttribute("aria-pressed", String(active));
      button.title = active ? "取消收藏" : "收藏档案";
      button.setAttribute(
        "aria-label",
        `${active ? "取消收藏" : "收藏"}：${findRecord(button.dataset.id)?.title || "档案"}`,
      );
      if (button.classList.contains("button"))
        button.innerHTML = `${icon("bookmark")}${active ? "已加入收藏" : "收藏此档案"}`;
    });
    renderIcons();
  }
  function bookmarkButton(record, full = false) {
    const active = saved.has(record.id);
    return `<button class="${full ? "button ghost" : "icon-button bookmark-button"} ${active ? "saved" : ""}" data-action="bookmark" data-id="${record.id}" title="${active ? "取消收藏" : "收藏档案"}" aria-label="${active ? "取消收藏" : "收藏"}：${esc(record.title)}" aria-pressed="${active}">${icon("bookmark")}${full ? (active ? "已加入收藏" : "收藏此档案") : ""}</button>`;
  }
  const statusClass = (record) =>
    record.status.includes("假说")
      ? "theory"
      : record.status.includes("叙述")
        ? "claim"
        : "";
  const statusBadge = (record) =>
    `<span class="evidence ${statusClass(record)}">${esc(record.status)}</span>`;
  function archiveCard(record) {
    return `<article class="archive-card"><a class="archive-image-link" href="#/archive/${record.id}">${photo(imageKey(record))}<span class="image-type">${icon(record.type === "文献" ? "file-text" : record.type === "影像" || record.type === "图集" ? "image" : "book-open")}${esc(record.type)}</span></a>${bookmarkButton(record)}<div class="meta"><span>${hall(record.category).name}</span><span class="separator"></span><span>${record.year}</span></div><h3><a href="#/archive/${record.id}">${esc(record.title)}</a></h3><p class="summary">${esc(record.summary)}</p><div class="archive-bottom">${statusBadge(record)}<span>${esc(record.source.split(" · ")[0].replace(" 世界遗产中心", ""))}</span></div></article>`;
  }
  function hallCard(item, index) {
    const count = records.filter(
      (record) => record.category === item.id,
    ).length;
    return `<a href="#/hall/${item.id}" class="hall-card"><div class="hall-photo"><span class="hall-number">ARCHIVE / 0${index + 1}</span>${photo(item.image)}${item.id === "beings" ? `<span class="hall-symbol">${icon("fingerprint")}</span>` : item.id === "latitude30" ? `<span class="hall-latitude" aria-hidden="true">30°<small>N</small></span>` : ""}</div><div class="hall-body"><h3>${item.name}</h3><p>${item.english}</p><div class="hall-footer"><span>${String(count).padStart(2, "0")} 份公开资料</span>${icon("arrow-up-right")}</div></div></a>`;
  }
  function libraryCard(record, compact = false) {
    const isPaper = record.type === "文献";
    return `<article class="document-card ${compact ? "compact" : ""}"><span class="document-symbol">${icon(isPaper ? "file-text" : "book-open")}</span><div class="document-content"><div class="document-meta"><span>${esc(libraryGroup(record))}</span><span>${esc(record.publishedAt)} · ${esc(record.sourceDateLabel || "资料日期")}</span></div><h3><a href="#/archive/${record.id}?from=library">${esc(record.title)}</a></h3><p class="document-source">${esc(record.source)}</p>${compact ? "" : `<p class="document-summary">${esc(record.summary)}</p>`}<div class="document-actions"><a href="#/archive/${record.id}?from=library">阅读导览 ${icon("arrow-right")}</a><a href="${esc(record.sourceUrl)}" target="_blank" rel="noopener noreferrer">原始资料 ${icon("arrow-up-right")}</a>${record.pdfUrl && !compact ? `<a href="${esc(record.pdfUrl)}" target="_blank" rel="noopener noreferrer">${icon("file-down")}原文 PDF</a>` : ""}</div></div>${bookmarkButton(record)}</article>`;
  }
  function librarySection() {
    const entries = [...libraryRecords()].sort(
      (a, b) =>
        Number(b.type === "文献") - Number(a.type === "文献") ||
        b.publishedAt.localeCompare(a.publishedAt),
    );
    return `<section class="section section-rule wrap home-library" aria-labelledby="home-library-title"><div class="section-heading"><div><h2 id="home-library-title">文献资源 <small>DOCUMENTS & RESEARCH</small></h2><p>在探索之外，建立自己的阅读与研究书架。</p></div><a class="text-link" href="#/library">进入文献资源 ${icon("arrow-up-right")}</a></div><div class="library-overview"><div class="library-editorial"><span class="eyebrow">THE READING ROOM</span><h3>让每一次探索，<br>都有迹可循。</h3><p>原始论文、机构报告与影像档案。<br>从一份导读出发，回到知识的出处。</p><div class="library-total"><strong>${String(entries.length).padStart(2, "0")}</strong><span>份文献与原始资料索引</span></div><a class="text-link" href="#/library">打开阅读室 ${icon("arrow-right")}</a></div><div class="library-featured">${entries
      .slice(0, 3)
      .map((record) => libraryCard(record, true))
      .join("")}</div></div></section>`;
  }
  function latitudeIntroduction() {
    const stops = records.filter(
      (record) =>
        record.category === "latitude30" && record.imageKey !== "earth",
    );
    return `<section class="wrap latitude-introduction" aria-label="北纬三十度探索路径"><div class="latitude-coordinate"><span>PARALLEL / 06</span><strong>30°<small>N</small></strong><span>从一条纬线，走入多种文明</span></div><div class="latitude-context"><span class="eyebrow">A JOURNEY ALONG THE PARALLEL</span><h2>让坐标，连接大地上的故事。</h2><p>以北纬三十度为线索，探访邻近地区的文明与景观。每一站保留实际坐标与来源，记录各自的历史。</p><div class="latitude-stops">${stops.map((record) => `<a href="#/archive/${record.id}">${icon("map-pin")}<span>${esc(record.region)}</span>${icon("arrow-up-right")}</a>`).join("")}</div></div></section>`;
  }
  function symbolsIntroduction() {
    return `<section class="wrap symbol-introduction" aria-label="远古符号专题导读">${photo("nebra", "symbol-object")}<div><span class="eyebrow">SIGNS ACROSS CIVILIZATIONS</span><h2>在刻痕里，读懂古人的世界。</h2><p>泥板上的账目、甲骨上的卜辞、石碑上的多种文字，与青铜上的日月星辰。回到文物本身，辨认符号的形态，也理解它们各自的时代。</p><div class="symbol-paths"><a href="#/archive/rosetta-stone">${icon("scan-text")}文字与释读 ${icon("arrow-up-right")}</a><a href="#/archive/nebra-sky-disc">${icon("orbit")}天文与历法 ${icon("arrow-up-right")}</a><a href="#/topic/symbol-journey">${icon("git-compare-arrows")}跨文明阅读 ${icon("arrow-up-right")}</a></div></div></section>`;
  }
  const topics = [
    {
      id: "civilization",
      group: "研学系列",
      eyebrow: "FEATURED DOSSIER / 01",
      title: "文明，是否只有一种答案？",
      summary: "从卡尔达肖夫指数到技术信号，在星空中重新审视文明的尺度。",
      image: "galaxy",
      ids: [
        "kardashev-scale",
        "fermi-paradox",
        "drake-equation",
        "technosignatures-report",
      ],
    },
    {
      id: "deep-time",
      group: "跨文明联动",
      eyebrow: "FEATURED DOSSIER / 02",
      title: "在时间深处，寻找文明回声",
      summary: "巨石、遗迹与万年前的天空。循着物证，重访人类文明的起点。",
      image: "ancient",
      ids: ["stonehenge-landscape", "gobekli-tepe", "giza-necropolis"],
    },
    {
      id: "uap-files",
      group: "重大事件专题",
      eyebrow: "FEATURED DOSSIER / 03",
      title: "未识别，不止于想象",
      summary: "沿着 NASA 与 AARO 的原始报告，追踪 UAP 研究的方法与边界。",
      image: "telescope",
      ids: ["nasa-uap-report", "aaro-historical-report", "gofast-analysis"],
    },
    {
      id: "geometry",
      group: "研学系列",
      eyebrow: "FEATURED DOSSIER / 04",
      title: "当大地成为几何的纸张",
      summary: "从航拍图案走入创作现场，记录几何之美，检视起源之说。",
      image: "crop",
      ids: ["crop-circle-geometry", "circlemakers-records"],
    },
    {
      id: "symbol-journey", group: "跨文明联动",
      eyebrow: "CIVILIZATION IN SIGNS / 05",
      title: "刻在时间里的文字与星空",
      summary: "从楔形文字、甲骨到罗塞塔石碑与内布拉天盘，阅读器物上的文明记忆。",
      image: "rosetta",
      ids: ["cuneiform-tablets", "oracle-bones", "rosetta-stone", "nebra-sky-disc"],
    },
    {
      id: "deep-space", group: "资源合集",
      eyebrow: "MISSIONS BEYOND EARTH / 06",
      title: "向更远处，寻找生命的线索",
      summary: "旅行者、毅力号、韦伯与 SETI：沿着真实任务，走近探测器传回的数据。",
      image: "mars",
      ids: ["voyager-mission", "perseverance-mission", "webb-observations", "seti-breakthrough"],
    },
    {
      id: "parallel-civilizations", group: "跨文明联动",
      eyebrow: "LANDSCAPES & CIVILIZATIONS / 07",
      title: "北纬三十度，文明与大地",
      summary: "以真实地理坐标连接吉萨、三星堆与西湖，在不同文明之间展开对照阅读。",
      image: "sanxingdui",
      ids: ["latitude30-reading-earth", "latitude30-giza", "latitude30-sanxingdui", "latitude30-westlake"],
    },
    {
      id: "uap-2023", group: "年度盘点",
      eyebrow: "YEAR IN REVIEW / 2023",
      title: "2023：UAP 研究的方法转向",
      summary: "以 NASA 独立研究报告为年度坐标，关联后续历史审查与影像分析。",
      image: "gofast",
      ids: ["nasa-uap-report", "aaro-historical-report", "gofast-analysis"],
    },
    {
      id: "uap-global-files", group: "重大事件专题",
      eyebrow: "CASE FILES / OFFICIAL RECORDS",
      title: "从目击叙述到官方卷宗",
      summary: "把 Rendlesham、德黑兰与 Aguadilla 放回各自的记录制度，比较证词、传感器与调查结论。",
      image: "gofast",
      ids: ["uap-rendlesham", "uap-tehran-1976", "uap-aguadilla", "uap-aaro-historical-record-2024"],
    },
    {
      id: "latitude30-atlas", group: "跨文明联动",
      eyebrow: "ATLAS / 30° NORTH",
      title: "一条纬线，几种文明尺度",
      summary: "沿北纬三十度及其邻近纬度，对照城市、水利、石窟与地质记录，区分地点事实与后来的神秘化叙述。",
      image: "sanxingdui",
      ids: ["ancient-liangzhu", "latitude30-petra-water-city", "latitude30-dazu-three-traditions", "latitude30-shahdad-aseismic-deformation"],
    },
    {
      id: "symbol-decipherment", group: "跨文明联动",
      eyebrow: "SYMBOLS / READING THE UNDECIPHERED",
      title: "当符号还没有唯一答案",
      summary: "从法斯托斯圆盘、线形文字 A 到 Rongorongo 数字模型，比较材料、语料和释读边界。",
      image: "rosetta",
      ids: ["symbols-phaistos-disc-241-signs", "symbols-linear-a-minoan-accounts", "symbols-rongorongo-digital-model", "nebra-sky-disc"],
    },
    {
      id: "research-reading-room", group: "资源合集",
      eyebrow: "READING ROOM / PRIMARY SOURCES",
      title: "从摘要回到原始资料",
      summary: "用 NASA 技术报告、ADS 书目和英国国家档案馆指南建立可复核的检索路径，适合研究者继续追踪。",
      image: "telescope",
      ids: ["resources-nasa-technical-reports-server", "resources-nasa-ads-bibliographic-library", "resources-uk-national-archives-ufo-guide", "earthrise-original"],
    },
    {
      id: "prehistoric-engineering", group: "研学系列",
      eyebrow: "MATERIAL CULTURES / DEEP TIME",
      title: "城市、石构与早期技术",
      summary: "从恰塔霍裕克、提瓦纳库到马耳他巨石神庙，追问复杂组织如何在不同环境中留下可测量的物证。",
      image: "ancient",
      ids: ["catalhoyuk-neolithic-settlement", "tiwanaku-stone-city", "mohenjo-daro-urban-plan", "malta-megalithic-temples"],
    },
    ...(window.ARCHIVE_TOPICS_EXTRA || []),
  ];
  function topicCard(topic) {
    return `<a class="topic-card" href="#/topic/${topic.id}">${photo(topic.image)}<div class="topic-content"><span class="eyebrow">${topic.eyebrow}</span><h3>${topic.title}</h3><p>${topic.summary}</p><span class="text-link">${String(topic.ids.length).padStart(2, "0")} 份档案 · 开始阅读 ${icon("arrow-right")}</span></div>${icon("arrow-up-right").replace("<i ", '<i class="topic-arrow" ')}</a>`;
  }
  function breadcrumbs(items) {
    return `<div class="breadcrumbs"><a href="#/">首页</a>${items.map((item) => `${icon("chevron-right")}${item.href ? `<a href="${item.href}">${esc(item.label)}</a>` : `<span>${esc(item.label)}</span>`}`).join("")}</div>`;
  }
  const slides = [
    {
      title: "光体·星际档案馆",
      slogan: "归档文明碎片，溯源宇宙真相",
      description:
        "在已知与未知的交界，收藏人类仰望的每一道光。<br>一座面向宇宙的数字文明档案馆。",
      eyebrow: "A LIVING ARCHIVE OF COSMIC CURIOSITY",
      image: "nebula",
      href: "#/halls",
      action: "开启探索",
      caption: "NGC 3324 · 韦伯望远镜近红外观测",
      coord: "R.A. 10h 36m 54s / DEC. −58° 37′",
      meta: "船底座星云 / COSMIC CLIFFS",
    },
    {
      title: "史前文明档案",
      slogan: "循着石与时间，回到文明的起点",
      description:
        "从巨石阵到早期聚落，在遗址与物证之中，<br>阅读跨越千年的文明记忆。",
      eyebrow: "TRACING THE ORIGINS OF CIVILIZATION",
      image: "ancient",
      href: "#/topic/deep-time",
      action: "进入专题",
      caption: "巨石阵 · 英国威尔特郡 · garethwiscombe",
      coord: "51° 10′ 44″ N / 01° 49′ 34″ W",
      meta: "巨石阵 / STONEHENGE",
    },
    {
      title: "地外文明探索",
      slogan: "在浩瀚的沉默里，寻找可能的回应",
      description:
        "从火星地表到星际空间，追踪深空任务与射电观测，<br>寻找生命可能留下的痕迹。",
      eyebrow: "LISTENING BEYOND OUR PALE BLUE DOT",
      image: "galaxy",
      href: "#/hall/theories",
      action: "进入探索",
      caption: "M31 · 仙女座星系局部 · NASA / ESA Hubble",
      coord: "R.A. 00h 42m 44s / DEC. +41° 16′",
      meta: "仙女座星系 / ANDROMEDA",
    },
  ];
  let slideIndex = 0,
    carouselTimer,
    carouselPaused = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  function heroContent() {
    const s = slides[slideIndex];
    return `${photo(s.image, "hero-photo", "eager")}<div class="wrap hero-content"><span class="eyebrow">${s.eyebrow}</span><h1>${s.title}</h1><p class="hero-slogan">${s.slogan}</p><p class="hero-description">${s.description}</p><div class="hero-actions"><a href="${s.href}" class="button primary">${s.action}${icon("arrow-right")}</a><button class="button ghost" data-action="search">${icon("search")}检索档案</button></div><div class="hero-meta">${s.meta}<span>${s.coord}</span></div><div class="hero-bottom"><button class="hero-caption" data-action="sources" title="查看图像来源">${icon("scan-line")}<span>${s.caption}</span></button><div class="slide-controls" aria-label="精选内容轮播">${slides.map((item, index) => `<button class="slide-button ${index === slideIndex ? "active" : ""}" data-action="slide" data-index="${index}" aria-label="第 ${index + 1} 项：${item.title}" aria-current="${index === slideIndex ? "true" : "false"}">0${index + 1}</button>`).join("")}<button class="icon-button pause-slide" data-action="pause-slide" aria-label="${carouselPaused ? "播放" : "暂停"}轮播" title="${carouselPaused ? "播放" : "暂停"}轮播">${icon(carouselPaused ? "play" : "pause")}</button></div></div></div>`;
  }
  function startCarousel() {
    clearInterval(carouselTimer);
    if (!carouselPaused)
      carouselTimer = setInterval(() => {
        if (
          document.visibilityState === "visible" &&
          !document.querySelector("dialog[open]") &&
          !$("#hero")?.matches(":focus-within")
        )
          changeSlide((slideIndex + 1) % slides.length);
      }, 12000);
  }
  function changeSlide(index) {
    slideIndex = index;
    const target = $("#hero");
    if (target) {
      target.innerHTML = heroContent();
      renderIcons();
    }
  }
  const timelineItems = [
    {
      year: "公元前 9600",
      label: "文明的早期聚落",
      name: "哥贝克力石阵",
      id: "gobekli-tepe",
    },
    {
      year: "1950",
      label: "我们在宇宙中孤独吗",
      name: "费米悖论",
      id: "fermi-paradox",
    },
    {
      year: "1961",
      label: "把未知写入方程",
      name: "德雷克方程",
      id: "drake-equation",
    },
    {
      year: "1964",
      label: "文明的能量尺度",
      name: "卡尔达肖夫指数",
      id: "kardashev-scale",
    },
    {
      year: "1968",
      label: "从月球回望地球",
      name: "阿波罗 8 号「地出」",
      id: "earthrise-original",
    },
    {
      year: "2023",
      label: "让观测回到科学",
      name: "NASA UAP 报告",
      id: "nasa-uap-report",
    },
    {
      year: "2025",
      label: "重审镜头中的运动",
      name: "GOFAST 分析",
      id: "gofast-analysis",
    },
  ];
  function timeline() {
    return `<section class="timeline-band"><div class="wrap"><div class="timeline-top"><div><span class="eyebrow">THE ARCHIVE THROUGH TIME</span><h2 style="margin-top:9px">时间的另一种刻度</h2><p>穿过文明的来路，抵达探索宇宙的此刻。</p></div><div class="timeline-controls"><button class="icon-button" data-action="timeline" data-direction="-1" aria-label="查看更早的事件" title="更早的事件">${icon("arrow-left")}</button><button class="icon-button" data-action="timeline" data-direction="1" aria-label="查看更晚的事件" title="更晚的事件">${icon("arrow-right")}</button></div></div><div class="timeline-track" tabindex="0" aria-label="文明与探索时间线">${timelineItems.map((item) => `<article class="time-point"><span class="year">${item.year}</span><p>${item.label}</p><a href="#/archive/${item.id}">${item.name}</a></article>`).join("")}</div></div></section>`;
  }
  let feedMode = "curated";
  function feedRecords() {
    if (feedMode === "recent")
      return [...records]
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .slice(0, 3);
    if (feedMode === "research")
      return records.filter((r) => r.type === "研究").slice(0, 3);
    return ["voyager-mission", "rosetta-stone", "gofast-analysis"]
      .map(findRecord)
      .filter(Boolean);
  }
  function archiveOverview() {
    const overviewEntries = [
      ...hallList.map((item) => ({
        ...item,
        href: `#/hall/${item.id}`,
        count: records.filter((record) => record.category === item.id).length,
        sections: hallSections[item.id] || [],
      })),
      {
        id: "topics",
        name: "专题探索",
        english: "CURATED EXPLORATIONS",
        href: "#/topics",
        count: topics.length,
        sections: ["事件闭环", "跨馆联动", "研学路径"],
      },
      {
        id: "library",
        name: "文献资源",
        english: "DOCUMENTS & RESEARCH LIBRARY",
        href: "#/library",
        count: libraryRecords().length,
        sections: ["官方文档", "学术论文", "专著书籍"],
      },
    ];
    const maxCount = Math.max(...overviewEntries.map((item) => item.count), 1);
    return `<section class="section section-rule wrap archive-overview" aria-labelledby="archive-overview-title"><div class="overview-intro"><span class="eyebrow">A MAP OF THE UNKNOWN</span><h2 id="archive-overview-title">先看内容地图，再进入档案。</h2><p>九个栏目分别处理遗迹、探测、目击、图案、地域、符号、专题与文献。每条路径都把素材、来源和研究边界放在同一张桌面上，方便从一份记录继续追踪。</p><a class="text-link" href="#/halls">查看主题馆总览 ${icon("arrow-up-right")}</a></div><div class="overview-list">${overviewEntries.map((item, index) => `<a class="overview-row" href="${item.href}"><span class="overview-index">${String(index + 1).padStart(2, "0")}</span><span class="overview-name"><strong>${item.name}</strong><small>${esc(item.english)}</small></span><span class="overview-sections">${item.sections.slice(0, 3).map((section) => `<em>${esc(section)}</em>`).join("")}</span><span class="overview-bar"><i style="width:${Math.max(14, Math.round((item.count / maxCount) * 100))}%"></i></span><span class="overview-count">${String(item.count).padStart(2, "0")} 份</span>${icon("arrow-up-right")}</a>`).join("")}</div></section>`;
  }
  function renderHome() {
    $("#main").innerHTML =
      `<section class="hero" id="hero" aria-roledescription="轮播">${heroContent()}</section><div class="index-strip"><div class="wrap index-inner"><div class="index-stats"><span><b>${String(hallList.length + 2).padStart(2, "0")}</b>内容栏目</span><span><b>${String(records.length).padStart(2, "0")}</b>公开档案</span><span><b>${String(topics.length).padStart(2, "0")}</b>探索专题</span></div><span class="archive-status"><span class="status-dot"></span>开放探索 · 保持求证</span></div></div><section class="section wrap"><div class="section-heading"><div><h2>主题档案 <small>EXPLORE THE ARCHIVES</small></h2><p>七个主题馆，加上专题探索与文献资源，连接远古文明与深空探索。</p></div><a class="text-link" href="#/halls">全部主题档案 ${icon("arrow-up-right")}</a></div><div class="hall-grid">${hallList.map(hallCard).join("")}</div></section>${archiveOverview()}<section class="section section-rule wrap"><div class="home-columns"><div class="home-feed"><div class="section-heading"><div class="feed-title"><h2>新近入馆</h2><div class="feed-tabs" role="tablist" aria-label="档案推荐"><button role="tab" class="${feedMode === "curated" ? "active" : ""}" aria-selected="${feedMode === "curated"}" data-action="feed" data-mode="curated">馆长精选</button><button role="tab" class="${feedMode === "recent" ? "active" : ""}" aria-selected="${feedMode === "recent"}" data-action="feed" data-mode="recent">近期资料</button><button role="tab" class="${feedMode === "research" ? "active" : ""}" aria-selected="${feedMode === "research"}" data-action="feed" data-mode="research">研究发现</button></div></div><a class="text-link" href="#/archives">全部档案 ${icon("arrow-up-right")}</a></div><div id="home-feed" class="card-grid">${feedRecords().map(archiveCard).join("")}</div></div><aside class="research-aside"><div class="section-heading"><h2>研究速递 <small>RESEARCH NOTES</small></h2>${icon("radio")}</div>${[
        "life-beyond-earth",
        "gofast-analysis",
        "technosignatures-report",
      ]
        .map((id) => {
          const r = findRecord(id);
          return `<a class="research-item" href="#/archive/${id}"><div class="source"><span>${esc(r.source.split(" · ")[0])}</span>${icon("arrow-up-right")}</div><h3>${esc(r.title)}</h3><div class="research-date">${r.publishedAt} · 资料日期</div></a>`;
        })
        .join(
          "",
        )}</aside></div></section>${librarySection()}<section class="section section-rule wrap"><div class="section-heading"><div><h2>深度专题 <small>CURATED COLLECTIONS</small></h2><p>让散落的线索，连接成理解的路径。</p></div><a class="text-link" href="#/topics">所有专题 ${icon("arrow-up-right")}</a></div><div class="topic-grid">${topics.slice(0, 2).map(topicCard).join("")}</div></section>${timeline()}`;
    startCarousel();
    setupTimeline();
  }
  function setupTimeline() {
    const track = $(".timeline-track");
    if (!track) return;
    let start = 0,
      left = 0,
      drag = false,
      moved = false;
    track.addEventListener("pointerdown", (e) => {
      if (e.pointerType === "touch") return;
      start = e.clientX;
      left = track.scrollLeft;
      drag = true;
      moved = false;
    });
    track.addEventListener("pointermove", (e) => {
      if (!drag) return;
      const delta = e.clientX - start;
      if (Math.abs(delta) > 5) {
        moved = true;
        track.scrollLeft = left - delta;
      }
    });
    track.addEventListener("pointerup", () => (drag = false));
    track.addEventListener("pointerleave", () => (drag = false));
    track.addEventListener(
      "click",
      (e) => {
        if (moved) {
          e.preventDefault();
          moved = false;
        }
      },
      true,
    );
  }
  function pageHead(title, english, description, crumbs = [], extra = "") {
    return `<section class="page-head"><div class="wrap">${breadcrumbs(crumbs)}<span class="eyebrow">${english}</span><h1>${title}</h1>${description ? `<p>${description}</p>` : ""}${extra}</div></section>`;
  }
  function renderHalls() {
    $("#main").innerHTML =
      pageHead(
        "七个坐标，一片宇宙",
        "EXPLORE THE ARCHIVES",
        "从遥远的过去，到未知的星际。选择一个分馆，开启你的探索。",
        [{ label: "主题档案" }],
      ) +
      `<section class="section wrap halls-page"><div class="hall-grid">${hallList.map(hallCard).join("")}</div></section>${timeline()}`;
    setupTimeline();
  }
  function renderTopics(params = new URLSearchParams()) {
    const groups = ["重大事件专题", "跨文明联动", "年度盘点", "研学系列", "资源合集"];
    const group = groups.includes(params.get("group")) ? params.get("group") : "";
    $("#main").innerHTML =
      pageHead(
        "专题探索",
        "CURATED COLLECTIONS",
        "让事件、图像与研究彼此关联，沿着一条线索，走得更深。",
        [{ label: "专题探索" }],
      ) +
      `<section class="section wrap topics-page"><nav class="section-tabs" aria-label="专题类别">${["", ...groups].map(value => `<a href="#/topics${value ? "?group=" + encodeURIComponent(value) : ""}" class="${value === group ? "active" : ""}" ${value === group ? 'aria-current="page"' : ""}>${value || "全部专题"}<span>${topics.filter(t => !value || t.group === value).length}</span></a>`).join("")}</nav>${guideSection({ kicker:"ARCHIVE VIII / CURATED EXPLORATIONS", title:"把零散条目串成事件闭环与跨馆阅读。", body:"专题探索面向高阶阅读：从事件起源、时间演变、证词和物证，到官方档案、学界争议与未解疑点，提供入口明确的系列路径。专题中的每一条资料仍可回到所属版块核对来源。", groups:[{name:"重磅事件完整专题",items:"事件起源、历年演变、多方证词、物证与争议"},{name:"跨文明联动专题",items:"史前文明、远古符号与北纬三十度的跨馆对照"},{name:"年度盘点专题",items:"UAP、宇宙异象、秘境与考古年度索引"},{name:"硬核科普研学专题",items:"深空探索、外星种族与史前物证的入门至进阶阅读"},{name:"稀缺资源合集专题",items:"公开授权的纪录片、书目、解密档案与科考报告"}]})}<div class="topic-grid">${topics.filter(t => !group || t.group === group).map(topicCard).join("")}</div></section>`;
  }
  const hallSections = {
    ancient: ["史前遗迹卷宗", "史前黑科技物证", "史前文明时间线", "素材库"],
    theories: ["深空探测工程卷宗", "地外文明搜寻实践", "宇宙实景与探测数据", "探索纪实素材库", "文明等级体系", "地外生命假说", "星系宜居研究", "深空探索文献库"],
    beings: ["经典外星种族图鉴", "外星接触事件", "人体实验与绑架事件", "素材库"],
    uap: ["年度事件卷宗", "官方解密资料", "异象分类归档", "高清素材库"],
    circles: ["年度图案全集", "图案密码解析", "真伪论证卷宗", "素材库"],
    latitude30: ["沿线超级古文明遗址", "世界级未解秘境卷宗", "超自然诡异事件实录", "科考探秘素材库"],
    symbols: ["全球古文明神秘符号库", "史前天文符号与星图", "跨文明同源符号破译", "符号文物素材卷宗"],
  };
  const sectionAliases = {
    "文明遗址": "史前遗迹卷宗", "古代技术物证": "史前黑科技物证", "文明时间线": "史前文明时间线",
    "深空探测工程": "深空探测工程卷宗", "SETI搜寻实践": "地外文明搜寻实践", "宇宙实景与数据": "宇宙实景与探测数据", "文明理论": "文明等级体系",
    "种族叙述图鉴": "经典外星种族图鉴", "接触事件": "外星接触事件", "生命研究": "人体实验与绑架事件",
    "官方解密": "官方解密资料", "事件复盘": "年度事件卷宗", "图案解析": "图案密码解析", "真伪论证": "真伪论证卷宗",
    "纬线地理": "沿线超级古文明遗址", "地域景观": "世界级未解秘境卷宗", "秘境与自然奇观": "世界级未解秘境卷宗", "沿线古文明遗址": "沿线超级古文明遗址",
    "文明符号图鉴": "全球古文明神秘符号库", "天文星图": "史前天文符号与星图",
  };
  const recordSection = (r) => sectionAliases[r.section] || r.section || ({ ancient: "史前遗迹卷宗", theories: "文明等级体系", beings: "经典外星种族图鉴", uap: "官方解密资料", circles: "图案密码解析", latitude30: "沿线超级古文明遗址", symbols: "全球古文明神秘符号库" }[r.category] || "文献索引");
  const libraryGroup = (r) => {
    const value = r.resourceType || r.section;
    const mapped = ({
      "官方档案": "官方文档",
      "官方解密档案": "官方文档",
      "官方解密档案库": "官方文档",
      "影像文献": "历史影像",
      "绝版影像文献": "历史影像",
      "绝版影像文献库": "历史影像",
      "学术论文研究库": "学术论文",
      "学术论文": "学术论文",
      "中外专著书籍库": "专著书籍",
      "专著书籍": "专著书籍",
      "考古与考察资料": "考古与考察资料",
      "科考与考古报告库": "考古与考察资料",
    }[value]);
    if (mapped) return mapped;
    if (r.type === "影像" || r.type === "图集") return "历史影像";
    if (r.category === "theories" && String(r.section || "").includes("深空探测")) return "官方文档";
    if (r.pdfUrl || r.type === "研究") return "学术论文";
    if (r.category === "ancient" || r.category === "latitude30" || r.category === "symbols") return "考古与考察资料";
    return "官方文档";
  };
  const sourceOrg = (r) => r.sourceOrg || r.source.split(" · ")[0];
  const resourceDomain = (r) => r.domain || hall(r.category).name;
  const hallGuides = {
    ancient: { kicker: "ARCHIVE I / BEFORE RECORDED HISTORY", title: "在遗迹、物证与争议之间，重建文明的起点。", body: "聚焦史前未知高级文明与未解考古遗迹。页面将事实遗址、考古假说和文化叙述分层呈现；亚特兰蒂斯、姆大陆、雷姆利亚等名称作为历史文本与现代假说检索，不作为已证实文明。", groups: [{name:"史前遗迹卷宗", items:"亚特兰蒂斯、姆大陆、雷姆利亚、古埃及异常遗迹、玛雅历法、苏美尔泥板、巨石阵、复活节岛石像"}, {name:"史前黑科技物证", items:"史前电池、远古合金、超时代雕刻、天文测绘遗迹、建筑工艺"}, {name:"史前文明时间线", items:"万年文明断层、文明更迭疑点、考古争议复盘"}, {name:"素材库", items:"遗址实拍、考古现场视频、测绘图纸、学术报告与可合法访问的书目"}] },
    theories: { kicker: "ARCHIVE II / EXPLORATION IN PRACTICE", title: "把地外文明探索放回真实任务与观测现场。", body: "以深空工程、信号搜寻、宇宙实景和科研实践为主线，纯理论内容单独标注为理论框架。NASA、ESA、中国航天及各国任务按任务阶段、探测对象、数据类型和原始出处组织。", groups: [{name:"深空探测工程卷宗", items:"旅行者、先驱者、火星探测、系外行星与深空任务流程"}, {name:"地外文明搜寻实践", items:"SETI、宇宙信号监听、异常电波、信号破译与生命探测"}, {name:"宇宙实景与探测数据", items:"星云、星系、黑洞、系外行星影像与官方原始数据"}, {name:"探索纪实素材库", items:"任务纪录、探测器原片、项目书籍与科研文献"}, {name:"理论索引", items:"卡尔达肖夫指数、费米悖论、黑暗森林、宇宙播种与宜居性研究"}] },
    beings: { kicker: "ARCHIVE III / NARRATIVES & SOURCES", title: "记录外星种族叙述，也记录它们从哪里来。", body: "将小灰人、蜥蜴人、昴宿星人等作为文化图像、目击报告和接触叙述研究；不会把未经证实的种族描述写成生物学事实。每条档案标明当事人、时间、地点、资料形态和证据缺口。", groups: [{name:"经典外星种族图鉴", items:"小灰人、蜥蜴人、昴宿星人、猎户座、仙女座与天狼星叙述"}, {name:"外星接触事件", items:"第三类与第四类接触的时间、地点、人物、物证与后续"}, {name:"人体实验与绑架事件", items:"口述、医学异常记录与官方公开资料"}, {name:"素材库", items:"形象图、访谈影像、研究书目与解密档案"}] },
    uap: { kicker: "ARCHIVE IV / UNIDENTIFIED PHENOMENA", title: "让未识别现象接受时间、证据与方法的检验。", body: "按年份、来源机构、形状分类和事件阶段组织 UFO/UAP 资料。官方解密视频、军方录像、民间目击和研究报告分开标记，‘未识别’不等于‘地外来源’。", groups: [{name:"年度事件卷宗", items:"1900—2026 年事件索引与可复核的公开档案"}, {name:"官方解密资料", items:"五角大楼视频、FBI、NASA、AARO 及各国军方公开资料"}, {name:"异象分类归档", items:"光球、三角、雪茄形、隐形、瞬移与编队飞行叙述"}, {name:"高清素材库", items:"官方原片、公开授权图片、修复版本与纪录影像"}] },
    circles: { kicker: "ARCHIVE V / PATTERNS IN THE FIELD", title: "从图案几何走到现场痕迹与来源争议。", body: "收录麦田怪圈的图案、时间、地点、测量与论证。几何对应、星际符号和能量说法作为待检验解释，与人为制作记录、植物变化研究和现场证据并列呈现。", groups: [{name:"年度图案全集", items:"1970 年至今的公开原图、航拍图与时间线"}, {name:"图案密码解析", items:"几何逻辑、天文对应、二进制与符号解读"}, {name:"真伪论证卷宗", items:"人为制作、自然异象、地外信号三类论据及检测"}, {name:"素材库", items:"航拍、延时、现场检测视频、专著与图鉴"}] },
    latitude30: { kicker: "ARCHIVE VI / THE 30TH PARALLEL NORTH", title: "沿一条纬线，把遗址、秘境与自然记录放在同一张地图上。", body: "北纬三十度是地域索引，不是超自然结论。条目保留真实坐标和来源；古文明遗址、自然奇观、天气和地磁事件需分别查证，跨纬度地点也会明确标注其实际位置。", groups: [{name:"沿线超级古文明遗址", items:"吉萨、三星堆、两河文明与可定位的相关遗址"}, {name:"世界级未解秘境卷宗", items:"百慕大、死亡谷、神农架、鄱阳湖与洞穴、地磁区域"}, {name:"超自然诡异事件实录", items:"时空错位、生物异变、天气异象与失踪叙述"}, {name:"科考探秘素材库", items:"科考视频、遗址航拍、地质检测、民俗纪实和专题研究"}] },
    symbols: { kicker: "ARCHIVE VII / SIGNS ACROSS CIVILIZATIONS", title: "把符号还给它的器物、年代与文明语境。", body: "远古符号档案连接文字、星图、器物纹饰和刻痕。符号相似不自动等于同源；页面优先展示实物来源、释读方法、不同解释与不确定性。", groups: [{name:"全球古文明神秘符号库", items:"楔形文字、古埃及图腾、玛雅铭文、华夏纹饰与两河刻痕"}, {name:"史前天文符号与星图", items:"星图、行星符号、节气刻痕与疑似坐标图案"}, {name:"跨文明同源符号破译", items:"跨地域对照、溯源推演与地外关联猜想"}, {name:"符号文物素材卷宗", items:"石刻、壁画、器物、拓片、考古文献与研究专著"}] },
  };
  const resourceGuide = { kicker: "ARCHIVE IX / RESEARCH LIBRARY", title: "把猎奇内容之外的正规资料，放回可追溯的阅读路径。", body: "文献资源是全站唯一的学术、档案和史料聚合区。每条资料显示来源机构、日期、类型、证据属性和原始链接；版权不明或未获授权的完整书籍、视频不会被伪装成本站下载。", groups: [{name:"官方解密档案库", items:"军方、航天局、情报机构与考古官方文件"}, {name:"学术论文研究库", items:"天文物理、考古、UAP 与异常现象研究"}, {name:"中外专著书籍库", items:"公开可访问的专著书目与数字化版本入口"}, {name:"科考与考古报告库", items:"实测数据、遗址勘探、地质地磁与观测日志"}, {name:"绝版影像文献库", items:"公开授权的纪录片、访谈与早期探索影像"}, {name:"专题合集", items:"按事件、人物、地域和年代整合的系列阅读"}] };
  function guideSection(guide) {
    if (!guide) return "";
    const resourceTypes = [
      ["图片", "遗址、文物、目击、图案与天文观测原图", "image"],
      ["视频", "纪录片、官方解密、考古纪实与探测任务影像", "video"],
      ["书籍", "专著、科普读物与合法可访问的研究书目", "book-open"],
      ["文献档案", "论文、考古报告、官方调研与解密文件", "file-text"],
      ["专题合集", "按事件、人物、地域和年代串联的阅读路径", "layers-3"],
    ];
    return `<section class="catalog-guide wrap" aria-label="栏目导读"><div class="guide-copy"><span class="eyebrow">${esc(guide.kicker)}</span><h2>${esc(guide.title)}</h2><p>${esc(guide.body)}</p><div class="guide-principle">${icon("shield-check")}<span>来源优先 · 事实、假说与叙述分层标注</span></div></div><div><div class="guide-groups">${guide.groups.map((group, index) => `<article class="guide-group"><span>0${index + 1}</span><div><h3>${esc(group.name)}</h3><p>${esc(group.items)}</p></div></article>`).join("")}</div><div class="resource-index" aria-label="资源类型索引"><span class="eyebrow">RESOURCE TYPES</span>${resourceTypes.map(([label, description, iconName]) => `<span title="${esc(description)}">${icon(iconName)}<b>${label}</b><small>${description}</small></span>`).join("")}</div></div></section>`;
  }
  const catalogFilterKeys = ["type", "year", "region", "sort", "section", "evidence", "source", "domain"];
  let catalogContext = {};
  function syncCatalogFilters() {
    updateCatalog();
    const route = location.hash.split("?")[0];
    const next = new URLSearchParams(location.hash.split("?")[1] || "");
    catalogFilterKeys.forEach(key => {
      const value = $(`#filter-${key}`)?.value;
      value && value !== "curated" ? next.set(key, value) : next.delete(key);
    });
    window.history.replaceState(null, "", route + (next.size ? "?" + next.toString() : ""));
  }
  function searchRecords(query) {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return records.filter((r) =>
      terms.every((term) =>
        [
          r.title,
          r.subtitle,
          r.summary,
          r.source,
          r.region,
          r.year,
          recordSection(r),
          ...Object.values(r.facts || {}),
          hall(r.category).name,
          ...r.tags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(term),
      ),
    );
  }
  function catalogNav(selected) {
    return `<aside class="catalog-sidebar"><h2>馆藏目录</h2><nav class="catalog-nav" aria-label="馆藏栏目"><a href="#/archives" class="${selected === "all" ? "active" : ""}"><span>ALL</span>全部档案</a>${hallList.map((item, i) => `<a href="#/hall/${item.id}" class="${selected === item.id ? "active" : ""}"><span>0${i + 1}</span>${item.name}</a>`).join("")}<a href="#/library" class="catalog-library-link ${selected === "resources" ? "active" : ""}">${icon("book-open")}文献资源</a></nav><div class="sidebar-note">${icon("scan-eye")}探索未知，始于清晰的来源。<br>区分事实、假说与叙述。</div></aside>`;
  }
  function renderCatalog(type, id, params) {
    let base = records,
      title = "全部档案",
      english = "THE COMPLETE ARCHIVE",
      description =
        "汇集公开图像、文献与研究。每一份资料，保留通往原始出处的路径。",
      selected = "all",
      crumbs = [{ label: "全部档案" }];
    if (type === "library") {
      base = libraryRecords();
      title = "文献资源";
      english = libraryInfo.english;
      description =
        "独立收录原始论文、研究报告与官方资料入口。从中文导览开始，深入完整文献。";
      selected = "resources";
      crumbs = [{ label: "文献资源" }];
    }
    if (type === "hall") {
      const current = hallList.find((h) => h.id === id);
      if (!current) return renderNotFound();
      selected = id;
      title = current.name;
      english = current.english;
      description = current.subtitle;
      base = records.filter((r) => r.category === id);
      crumbs = [{ label: "主题档案", href: "#/halls" }, { label: title }];
    }
    if (type === "topic") {
      const current = topics.find((t) => t.id === id);
      if (!current) return renderNotFound();
      title = current.title;
      english = current.eyebrow;
      description = current.summary;
      base = current.ids.map(findRecord).filter(Boolean);
      crumbs = [{ label: "专题探索", href: "#/topics" }, { label: title }];
    }
    if (type === "search") {
      const query = params.get("q") || "";
      base = searchRecords(query);
      title = `搜索：${esc(query) || "全部档案"}`;
      english = "ARCHIVE SEARCH";
      description = `找到 ${base.length} 份相关档案。`;
      crumbs = [{ label: "搜索结果" }];
    }
    catalogContext = { base, selected, type, id };
    const options = (list, value) =>
      list
        .map(
          (x) =>
            `<option value="${esc(x)}" ${x === value ? "selected" : ""}>${esc(x)}</option>`,
        )
        .join("");
    const types = [...new Set(base.map((r) => r.type))],
      regions = [...new Set(base.map((r) => r.region))];
    $("#main").innerHTML =
      pageHead(title, english, description, crumbs) +
      (type === "library" ? guideSection(resourceGuide) : type === "hall" ? guideSection(hallGuides[id]) : "") +
      (type === "hall" && id === "latitude30" ? latitudeIntroduction() : "") +
      (type === "hall" && id === "symbols" ? symbolsIntroduction() : "") +
      `<div class="wrap catalog-shell">${catalogNav(selected)}<div class="catalog-main"><div class="catalog-toolbar"><div class="catalog-filters"><label><span>类型</span><select id="filter-type" aria-label="资料类型"><option value="">全部类型</option>${options(types, params.get("type"))}</select></label><label><span>年份</span><select id="filter-year" aria-label="资料年份"><option value="">全部年份</option><option value="recent" ${params.get("year") === "recent" ? "selected" : ""}>2020 年至今</option><option value="modern" ${params.get("year") === "modern" ? "selected" : ""}>2000—2019</option><option value="history" ${params.get("year") === "history" ? "selected" : ""}>2000 年以前</option></select></label><label><span>地区</span><select id="filter-region" aria-label="资料地区"><option value="">全部地区</option>${options(regions, params.get("region"))}</select></label></div><label class="catalog-sort"><span>排序</span><select id="filter-sort" aria-label="排列顺序"><option value="curated">精选优先</option><option value="newest" ${params.get("sort") === "newest" ? "selected" : ""}>资料年份从新到旧</option><option value="oldest" ${params.get("sort") === "oldest" ? "selected" : ""}>资料年份从旧到新</option></select></label></div><div class="catalog-result" id="catalog-count"></div><div id="catalog-results" class="card-grid"></div></div></div>`;
    if (type === "library") {
      $("#catalog-results").className = "document-list";
      $(".catalog-shell").classList.add("library-catalog");
    }
    if (type === "hall" && id === "symbols") $(".catalog-main").classList.add("symbols-catalog");
    const sections = type === "library"
      ? ["官方文档", "学术论文", "专著书籍", "考古与考察资料", "历史影像"]
      : type === "hall" ? [...new Set([...(hallSections[id] || []), ...base.map(recordSection)])] : [];
    if (sections.length) {
      const sectionValue = sections.includes(params.get("section")) ? params.get("section") : "";
      $(".catalog-main").insertAdjacentHTML("afterbegin", `<nav class="section-tabs" aria-label="栏目细分">${["", ...sections].map(section => {
        const query = new URLSearchParams(params);
        section ? query.set("section", section) : query.delete("section");
        const count = base.filter(r => !section || (type === "library" ? libraryGroup(r) : recordSection(r)) === section).length;
        return `<a class="${section === sectionValue ? "active" : ""}" ${section === sectionValue ? 'aria-current="page"' : ""} href="${location.hash.split("?")[0]}${query.size ? "?" + esc(query.toString()) : ""}">${section || "全部内容"}<span>${count}</span></a>`;
      }).join("")}</nav><input type="hidden" id="filter-section" value="${esc(sectionValue)}">`);
    }
    const extraFilter = (key, label, values) => `<label><span>${label}</span><select id="filter-${key}" aria-label="${label}"><option value="">全部${label}</option>${options(values, params.get(key))}</select></label>`;
    $(".catalog-filters").insertAdjacentHTML("beforeend", extraFilter("evidence", "资料属性", [...new Set(base.map(r => r.status))]));
    if (type === "library") {
      $(".catalog-filters").insertAdjacentHTML("beforeend", extraFilter("source", "来源", [...new Set(base.map(sourceOrg))]) + extraFilter("domain", "领域", [...new Set(base.map(resourceDomain))]));
      $("#filter-region").closest("label").remove();
    }
    catalogFilterKeys.forEach(key => $(`#filter-${key}`)?.addEventListener("change", syncCatalogFilters));
    updateCatalog();
  }
  function updateCatalog() {
    let filtered = [...catalogContext.base];
    const type = $("#filter-type").value,
      year = $("#filter-year").value,
      region = $("#filter-region")?.value,
      sort = $("#filter-sort").value;
    const section = $("#filter-section")?.value,
      evidence = $("#filter-evidence")?.value,
      source = $("#filter-source")?.value,
      domain = $("#filter-domain")?.value;
    if (section) filtered = filtered.filter(r => (catalogContext.type === "library" ? libraryGroup(r) : recordSection(r)) === section);
    if (evidence) filtered = filtered.filter(r => r.status === evidence);
    if (source) filtered = filtered.filter(r => sourceOrg(r) === source);
    if (domain) filtered = filtered.filter(r => resourceDomain(r) === domain);
    if (type) filtered = filtered.filter((r) => r.type === type);
    if (region) filtered = filtered.filter((r) => r.region === region);
    if (year)
      filtered = filtered.filter((r) =>
        year === "recent"
          ? r.year >= 2020
          : year === "modern"
            ? r.year >= 2000 && r.year < 2020
            : r.year < 2000,
      );
    if (sort === "newest")
      filtered.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    else if (sort === "oldest")
      filtered.sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
    else if (catalogContext.type === "library")
      filtered.sort(
        (a, b) =>
          Number(b.type === "文献") - Number(a.type === "文献") ||
          b.publishedAt.localeCompare(a.publishedAt),
      );
    else filtered.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    $("#catalog-count").innerHTML =
      `${filtered.length} 份档案${type || year || region || section || evidence || source || domain ? ` <span class="muted">/ ${catalogContext.base.length} 份</span> · <button class="reset-filter" data-action="reset-filters">重置筛选</button>` : ""}`;
    catalogContext.list = filtered;
    catalogContext.shown = 0;
    $("#catalog-results").innerHTML = "";
    appendCatalogPage();
  }
  const CATALOG_PAGE_SIZE = 24;
  function appendCatalogPage() {
    const list = catalogContext.list || [];
    if (!list.length) {
      $("#catalog-results").innerHTML = `<div class="empty-state">${icon("search-x")}<h2>暂未找到相关档案</h2><p>当前条件下还没有匹配的资料。</p><button class="button ghost" data-action="reset-filters">重置筛选 ${icon("rotate-ccw")}</button></div>`;
      renderIcons();
      return;
    }
    const next = list.slice(catalogContext.shown, catalogContext.shown + CATALOG_PAGE_SIZE);
    $("#catalog-results").insertAdjacentHTML(
      "beforeend",
      next
        .map((record) =>
          catalogContext.type === "library"
            ? libraryCard(record)
            : archiveCard(record),
        )
        .join(""),
    );
    catalogContext.shown += next.length;
    $("#catalog-more-wrap")?.remove();
    if (catalogContext.shown < list.length) {
      $("#catalog-results").insertAdjacentHTML(
        "afterend",
        `<div class="catalog-more-wrap" id="catalog-more-wrap"><button class="button ghost" id="catalog-more">继续展开 <span class="muted">已显示 ${catalogContext.shown} / 共 ${list.length} 份</span></button></div>`,
      );
      $("#catalog-more").addEventListener("click", appendCatalogPage);
    }
    renderIcons();
  }
  function renderCollection(tab = "saved") {
    const list =
      tab === "history"
        ? history
        : tab === "downloads"
          ? downloads
          : [...saved];
    const active = ["saved", "history", "downloads"].includes(tab)
      ? tab
      : "saved";
    const titles = {
      saved: "我的收藏",
      history: "浏览足迹",
      downloads: "导出记录",
    };
    $("#main").innerHTML =
      pageHead(
        "我的星际坐标",
        "MY PERSONAL ARCHIVE",
        "那些引起好奇的线索，值得被再次遇见。",
        [{ label: "我的档案" }],
        `<nav class="collection-tabs" aria-label="个人档案">${Object.entries(
          titles,
        )
          .map(
            ([key, label]) =>
              `<a class="${key === active ? "active" : ""}" href="#/collection/${key}">${label} <span class="muted">${key === "saved" ? saved.size : key === "history" ? history.length : downloads.length}</span></a>`,
          )
          .join("")}</nav>`,
      ) +
      `<section class="wrap collection-main">${list.length ? `<div class="section-heading"><p>${titles[active]} · ${list.length} 份档案</p><span class="muted" style="font-size:10px">${storageAvailable ? "保存在此浏览器" : "当前浏览会话"}</span></div><div class="card-grid">${list.map(findRecord).filter(Boolean).map(archiveCard).join("")}</div>` : `<div class="empty-state">${icon(active === "saved" ? "bookmark" : active === "history" ? "history" : "download")}<h2>${active === "saved" ? "你的探索，尚待留下坐标" : active === "history" ? "还没有浏览足迹" : "还没有导出记录"}</h2><p>${active === "saved" ? "值得再次阅读的档案，会在这里汇合。" : active === "history" ? "翻开一份档案，开始你的探索旅程。" : "已导出的档案摘要，将在这里留存索引。"}</p><a href="#/archives" class="button primary">探索馆藏 ${icon("arrow-right")}</a></div>`}</section>`;
  }
  function renderArticleContent(record) {
    const paragraphs = Array.isArray(record.body) ? record.body : [];
    const headings = ["档案概览", "证据与方法", "语境与争议", "研究意义", "继续溯源"];
    const summary = paragraphs
      .map(
        (paragraph, index) =>
          `<h2>${headings[index] || `研究记录 ${index + 1}`}</h2><p>${esc(paragraph)}</p>`,
      )
      .join("");
    const chapters = Array.isArray(record.expandedSections)
      ? record.expandedSections.filter((chapter) => chapter && (chapter.h || chapter.p?.length))
      : [];
    if (chapters.length) {
      return `${summary}<div class="article-deep-reading"><div class="eyebrow">DEEP READING / 证据与语境</div>${chapters
        .map(
          (chapter, index) =>
            `<section class="article-chapter"><h2>${esc(chapter.h || `研究记录 ${index + 1}`)}</h2>${(Array.isArray(chapter.p) ? chapter.p : [chapter.p]).filter(Boolean).map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}</section>`,
        )
        .join("")}</div>`;
    }
    return summary;
  }
  function renderDetail(id, params = new URLSearchParams()) {
    const record = findRecord(id);
    if (!record) return renderNotFound();
    history = [id, ...history.filter((item) => item !== id)].slice(0, 50);
    persist("history", history);
    const key = imageKey(record),
      image = imageSources[key];
    const related = records
      .filter((r) => r.id !== id && r.category === record.category)
      .concat(
        records.filter(
          (r) =>
            r.id !== id &&
            r.category !== record.category &&
            r.tags.some((t) => record.tags.includes(t)),
        ),
      )
      .slice(0, 3);
    const evidence =
      record.status === "理论假说"
        ? "本条收录理论框架与研究问题。模型或假设本身不等同于已经观测到的地外文明。"
        : record.status === "文化叙述"
          ? "本条保留历史叙述或创作者记录。叙述的存在与叙述所指事件的真实性，需要分别考察。"
          : "本条依据已列明的公开资料整理。具体结论须结合原始资料的研究范围、方法与日期阅读。";
    $("#main").innerHTML =
      `<div class="wrap detail-page">${breadcrumbs([{ label: hall(record.category).name, href: categoryHref(record.category) }, { label: record.title }])}<div class="detail-layout"><article class="detail-main"><span class="eyebrow">${esc(record.subtitle)}</span><h1 class="detail-title">${esc(record.title)}</h1><div class="detail-meta">${statusBadge(record)}<span>${esc(record.publishedAt)} · 资料日期</span><span>${esc(record.type)}</span><span>阅读时长可按内容深度调整</span></div><button class="detail-media" data-action="preview" data-key="${key}" title="查看完整图像">${photo(key, "", "eager")}<span class="icon-button">${icon("expand")}</span></button><p class="image-credit">配图：${esc(image.name)}。${esc(image.author)} · ${esc(image.license)}。配图不构成该事件的观测证据。<button class="text-link" style="font-size:9px" data-action="sources">图像来源 ${icon("arrow-up-right")}</button></p><p class="article-intro">${esc(record.summary)}</p><div class="article-body">${renderArticleContent(record)}<div class="article-evidence"><h2>资料属性 · ${esc(record.status)}</h2><p>${evidence}</p></div><h2>原始资料</h2><a class="source-link" href="${esc(record.sourceUrl)}" target="_blank" rel="noopener noreferrer"><span>01</span><div>${esc(record.source)}<small>${esc(new URL(record.sourceUrl).hostname)} · ${esc(record.publishedAt)}</small></div>${icon("arrow-up-right")}</a>${record.videoUrl ? `<a class="source-link" href="${esc(record.videoUrl)}" target="_blank" rel="noopener noreferrer"><span>02</span><div>${esc(record.videoLabel || "影像资料 · 视频")}<small>${esc(new URL(record.videoUrl).hostname)} · 官方或授权影像入口</small></div>${icon("clapperboard")}</a>` : ""}${record.fileUrl ? `<a class="source-link" href="${esc(record.fileUrl)}" target="_blank" rel="noopener noreferrer"><span>${record.videoUrl ? "03" : "02"}</span><div>${esc(record.fileLabel || "原始文件 · 下载")}<small>${esc(new URL(record.fileUrl).hostname)} · 档案原件或授权副本</small></div>${icon("file-down")}</a>` : ""}<div class="article-tags">${record.tags.map((tag) => `<a href="#/search?q=${encodeURIComponent(tag)}"># ${esc(tag)}</a>`).join("")}</div></div></article><aside class="detail-aside"><div class="aside-sticky"><div class="detail-id">GT-${record.category.toUpperCase().slice(0, 3)}-${String(records.indexOf(record) + 1).padStart(4, "0")}</div><dl class="detail-facts"><div><dt>${record.category === "resources" ? "归属栏目" : "归属分馆"}</dt><dd>${hall(record.category).name}</dd></div><div><dt>资料类型</dt><dd>${esc(record.type)}</dd></div><div><dt>资料年份</dt><dd>${record.year}</dd></div><div><dt>涉及地区</dt><dd>${esc(record.region)}</dd></div><div><dt>证据属性</dt><dd>${esc(record.status)}</dd></div></dl><div class="detail-actions">${bookmarkButton(record, true)}<button class="button primary" data-action="download" data-id="${id}">${icon("download")}导出档案摘要</button><button class="button ghost" data-action="copy-source" data-id="${id}">${icon("link")}复制来源链接</button><button class="button ghost" data-action="correction" data-id="${id}">${icon("file-pen-line")}记录补充线索</button></div><div class="aside-related"><h2>关联档案</h2>${related.map((r) => `<a href="#/archive/${r.id}">${photo(imageKey(r))}<span>${esc(r.title)}</span></a>`).join("") || '<p class="muted">暂无关联档案</p>'}</div></div></aside></div><div class="detail-back"><a class="text-link" href="${categoryHref(record.category)}">${icon("arrow-left")}返回${hall(record.category).name}</a><a class="text-link" href="#/archives">全部馆藏${icon("arrow-right")}</a></div></div>`;
    if (params.get("from") === "library" && libraryRecords().some(r => r.id === id)) {
      const crumb = $(".detail-page .breadcrumbs a:nth-of-type(2)");
      crumb.href = "#/library";
      crumb.textContent = "文献资源";
      $(".detail-back a").href = "#/library";
      $(".detail-back a").innerHTML = `${icon("arrow-left")}返回文献资源`;
    }
    if (record.category === "symbols") $(".detail-main").classList.add("symbol-detail");
    if (record.facts) {
      $(".detail-facts").insertAdjacentHTML("beforeend", Object.entries(record.facts).map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join(""));
    }
    if (record.evidenceLabel) $(".article-evidence h2").textContent = `资料属性 · ${record.evidenceLabel}`;
    if (record.evidenceNote) $(".article-evidence p").textContent = record.evidenceNote;
    if (record.sourceDateLabel) $(".detail-meta > span:nth-child(2)").textContent = `${record.publishedAt} · ${record.sourceDateLabel}`;
    if (record.pdfUrl) $(".article-body .source-link").insertAdjacentHTML("afterend", `<a class="button ghost source-pdf" href="${esc(record.pdfUrl)}" target="_blank" rel="noopener noreferrer">${icon("file-down")}打开原文 PDF ${icon("arrow-up-right")}</a>`);
    if (record.category === "symbols") {
      $$(".article-body h2").slice(0, 3).forEach((heading, index) => heading.textContent = ["文物与时代", "符号形态与释读", "语境与研究边界"][index]);
    }
    if (id === "gofast-analysis") {
      const video = document.createElement("video");
      video.className = "detail-video";
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.poster = "assets/gofast.jpg";
      video.src = "assets/gofast.mp4";
      video.setAttribute("aria-label", "GOFAST 官方影像静音预览");
      $(".detail-media").replaceWith(video);
      const credit = $(".image-credit");
      credit.replaceChildren(
        document.createTextNode(
          "GOFAST 官方影像 · 静音预览，34 秒。United States Navy / Department of Defense · 公共领域。",
        ),
      );
      const sourceButton = document.createElement("button");
      sourceButton.className = "text-link";
      sourceButton.dataset.action = "sources";
      sourceButton.textContent = "原始影像来源";
      credit.append(sourceButton);
    }
  }
  function renderNotFound() {
    $("#main").innerHTML =
      `<div class="wrap empty-state">${icon("orbit")}<h1>这个坐标，暂未归档</h1><p>该档案或专题不存在，继续探索已收录的资料。</p><a href="#/archives" class="button primary">返回馆藏 ${icon("arrow-right")}</a></div>`;
  }
  function route(event) {
    clearInterval(carouselTimer);
    clearTimeout(toastTimer);
    $("#toast").classList.remove("show");
    $$("dialog[open]").forEach((dialog) => dialog.close());
    const hash = (location.hash || "#/").slice(1);
    const [path, query] = hash.split("?");
    const parts = path.split("/").filter(Boolean);
    let [page, id] = parts;
    const params = new URLSearchParams(query || "");
    if (page === "hall" && id === "resources") {
      page = "library";
      id = undefined;
      window.history.replaceState(
        null,
        "",
        "#/library" + (params.size ? "?" + params.toString() : ""),
      );
    }
    $$(".mobile-nav").forEach((nav) => (nav.hidden = true));
    $(".mobile-menu").setAttribute("aria-expanded", "false");
    const activeNav =
      page === "archive"
        ? findRecord(id)?.category === "resources" || (params.get("from") === "library" && libraryRecords().some(r => r.id === id))
          ? "library"
          : findRecord(id)?.category
        : page === "hall"
          ? id
          : ["topic", "topics"].includes(page)
            ? "topics"
            : page === "library"
              ? "library"
              : !page
                ? "home"
                : "";
    $$("[data-nav]").forEach((a) => {
      a.classList.toggle("active", a.dataset.nav === activeNav);
      if (a.dataset.nav === activeNav) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    if (!page) renderHome();
    else if (page === "halls") renderHalls();
    else if (page === "topics") renderTopics(params);
    else if (["hall", "topic", "library", "archives", "search"].includes(page))
      renderCatalog(page, id, params);
    else if (page === "archive") renderDetail(id, params);
    else if (page === "collection") renderCollection(id);
    else renderNotFound();
    renderIcons();
    updateSavedUI();
    document.title = `${$("#main h1")?.textContent || "首页"} | 光体·星际档案馆`;
    window.scrollTo({ top: 0, behavior: "instant" });
    if (event?.type === "hashchange") $("#main").focus({ preventScroll: true });
  }
  function showSearch() {
    const dialog = $("#search-dialog");
    $("#search-input").value = "";
    renderSearchSuggestions();
    dialog.showModal();
    $("#search-input").focus();
  }
  function renderSearchSuggestions() {
    const query = $("#search-input").value.trim();
    if (!query) {
      $("#search-content").innerHTML =
        `${searches.length ? `<div class="search-hint">最近检索</div><div class="search-chips">${searches.map((s) => `<button data-action="search-query" data-query="${esc(s)}">${esc(s)}</button>`).join("")}</div>` : ""}<div class="search-hint">探索关键词</div><div class="search-chips">${["UAP", "北纬三十度", "三星堆", "地外生命", "麦田怪圈", "NASA"].map((s) => `<button data-action="search-query" data-query="${s}">${s}</button>`).join("")}</div><div class="search-hint">馆长推荐</div><div class="search-results">${["nasa-uap-report", "kardashev-scale", "stonehenge-landscape"].map(findRecord).map(searchResult).join("")}</div>`;
    } else {
      const matches = searchRecords(query);
      $("#search-content").innerHTML =
        `<div class="search-hint">${matches.length} 份相关档案</div>${matches.length ? `<div class="search-results">${matches.slice(0, 5).map(searchResult).join("")}</div><button class="search-all" data-action="submit-search">查看全部结果 ${icon("arrow-right")}</button>` : '<div class="search-no-result">暂未找到相关档案，试试文明、事件或机构名称。</div>'}`;
    }
    renderIcons();
  }
  function searchResult(record) {
    return `<a class="search-result" href="#/archive/${record.id}">${photo(imageKey(record))}<div><h3>${esc(record.title)}</h3><p>${hall(record.category).name} · ${record.year} · ${record.status}</p></div>${icon("arrow-up-right")}</a>`;
  }
  function submitSearch(query = $("#search-input").value.trim()) {
    query = query.trim().slice(0, 120);
    if (!query) return;
    searches = [query, ...searches.filter((s) => s !== query)].slice(0, 6);
    persist("searches", searches);
    $("#search-dialog").close();
    const next = "#/search?q=" + encodeURIComponent(query);
    if (location.hash === next) route();
    else location.hash = next;
  }
  function showInfo(title, content) {
    $("#info-title").textContent = title;
    $("#info-content").innerHTML = content;
    $("#info-dialog").showModal();
    renderIcons();
  }
  function showSources() {
    showInfo(
      "资料与图像来源",
      `<p>档案正文为公开资料的中文摘要。原始报告、论文、图像与视频以详情页链接所指向的机构资料为准。导出文件仅包含本站摘要与来源索引。</p><h3>图像署名</h3>${Object.entries(
        imageSources,
      )
        .map(
          ([key, item], i) =>
            `<div class="source-link"><span>${String(i + 1).padStart(2, "0")}</span><div><a href="${esc(item.source)}" target="_blank" rel="noopener noreferrer">${esc(item.name)}</a><small>${esc(item.author)}<br><a href="${esc(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(item.license)}</a> · 已进行缩放、压缩；展示区按版面裁切。</small></div></div>`,
        )
        .join(
          "",
        )}<h3>品牌素材</h3><p>光体金色几何徽记由项目创建者提供，保留原图。馆内图像均为主题配图，具体研究的原始证据请查阅对应来源。</p>`,
    );
  }
  function downloadText(name, text) {
    const blob = new Blob(["\ufeff" + text], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = name;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  function downloadRecord(id) {
    const r = findRecord(id);
    if (!r) return;
    const text = [
      `光体·星际档案馆`,
      r.title,
      r.subtitle,
      "",
      `资料属性：${r.status}`,
      `来源日期：${r.publishedAt}`,
      `${r.category === "resources" ? "栏目" : "分馆"}：${hall(r.category).name}`,
      `地区：${r.region}`,
      "",
      r.summary,
      "",
      ...(Array.isArray(r.body) ? r.body.map((p) => p + "\n") : []),
      ...(Array.isArray(r.expandedSections)
        ? r.expandedSections.flatMap((chapter) => [
            `【${chapter.h || "研究记录"}】`,
            ...(Array.isArray(chapter.p) ? chapter.p : [chapter.p]).filter(Boolean),
            "",
          ])
        : []),
      ...Object.entries(r.facts || {}).map(([key, value]) => `${key}：${value}`),
      "",
      `原始来源：${r.source}`,
      r.sourceUrl,
      "",
      `关键词：${r.tags.join("、")}`,
      "",
      "此文件为公开资料的中文摘要与来源索引，不包含原始论文、视频或第三方图像。",
    ].join("\n");
    downloadText(`光体档案-${r.id}.txt`, text);
    downloads = [id, ...downloads.filter((x) => x !== id)].slice(0, 50);
    persist("downloads", downloads);
    toast("档案摘要已导出");
  }
  async function copySource(id) {
    const r = findRecord(id);
    if (!r) return;
    try {
      await navigator.clipboard.writeText(r.sourceUrl);
      toast("原始来源链接已复制");
    } catch {
      showInfo(
        "原始来源链接",
        `<p>${esc(r.title)}</p><input id="copy-fallback" aria-label="原始来源链接" readonly value="${esc(r.sourceUrl)}" style="width:100%;padding:12px;background:#080e10;color:#ddd;border:1px solid #45534b"><p><a href="${esc(r.sourceUrl)}" target="_blank" rel="noopener noreferrer">打开原始来源</a></p>`,
      );
      $("#copy-fallback").select();
    }
  }
  function showCorrection(id) {
    const r = findRecord(id);
    showInfo(
      "记录补充线索",
      `<p>${esc(r.title)}</p><form id="correction-form" class="correction-form" data-id="${id}"><label for="correction-note">补充内容</label><textarea id="correction-note" required maxlength="3000" placeholder="记录需要更正的内容，或值得继续查证的线索。"></textarea><label for="correction-source">参考来源</label><input id="correction-source" type="url" placeholder="https://"><button class="button primary" type="submit">${icon("download")}导出线索记录</button></form>`,
    );
    $("#correction-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const note = $("#correction-note").value.trim();
      if (!note) {
        $("#correction-note").focus();
        return;
      }
      downloadText(
        `光体线索-${id}.txt`,
        `${r.title}\n原始来源：${r.sourceUrl}\n\n补充线索：\n${note}\n\n参考来源：${$("#correction-source").value.trim() || "未填写"}\n\n此记录保存在本地，未发送至外部服务。`,
      );
      $("#info-dialog").close();
      toast("线索记录已导出至本地");
    });
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const { action, id } = button.dataset;
    if (action === "search") showSearch();
    if (action === "close-dialog") button.closest("dialog").close();
    if (action === "menu") {
      const nav = $(".mobile-nav");
      nav.hidden = !nav.hidden;
      button.setAttribute("aria-expanded", String(!nav.hidden));
    }
    if (action === "bookmark") {
      saved.has(id) ? saved.delete(id) : saved.add(id);
      const stored = persist("saved", [...saved]);
      toast(
        saved.has(id)
          ? stored
            ? "已加入我的收藏"
            : "已收藏，仅保留在当前会话"
          : "已取消收藏",
      );
      updateSavedUI();
      if (
        location.hash === "#/collection" ||
        location.hash === "#/collection/saved"
      ) {
        renderCollection("saved");
        renderIcons();
      }
    }
    if (action === "slide") {
      changeSlide(Number(button.dataset.index));
      startCarousel();
    }
    if (action === "pause-slide") {
      carouselPaused = !carouselPaused;
      changeSlide(slideIndex);
      startCarousel();
    }
    if (action === "feed") {
      feedMode = button.dataset.mode;
      $$('[data-action="feed"]').forEach((el) => {
        el.classList.toggle("active", el.dataset.mode === feedMode);
        el.setAttribute("aria-selected", String(el.dataset.mode === feedMode));
      });
      $("#home-feed").innerHTML = feedRecords().map(archiveCard).join("");
      renderIcons();
    }
    if (action === "timeline")
      $(".timeline-track").scrollBy({
        left: Number(button.dataset.direction) * 450,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    if (action === "reset-filters") {
      catalogFilterKeys.filter(key => key !== "sort").forEach(key => {
        const input = $(`#filter-${key}`);
        if (input) input.value = "";
      });
      syncCatalogFilters();
      route();
    }
    if (action === "search-query") submitSearch(button.dataset.query);
    if (action === "submit-search") submitSearch();
    if (action === "sources") showSources();
    if (action === "about")
      showInfo(
        "关于光体",
        `<div class="brand"><img src="assets/logo.jpg" alt="光体徽记"><span><strong>光体·星际档案馆</strong><small>LUMINARY INTERSTELLAR ARCHIVE</small></span></div><p>归档文明碎片，溯源宇宙真相。</p><p>光体·星际档案馆以数字文明档案馆的形式，连接史前遗迹、地外生命研究、未知现象与公开文献。我们保留好奇，也保留每条资料的来源与边界。</p><h3>光体愿景</h3><p>点亮自己，照亮他人。光体师以探索与创造为起点，希望连接个人觉知与更广阔的宇宙视野。光体理念作为创作者的世界观与愿景呈现。</p><h3>首批馆藏</h3><p>目前收录 ${records.length} 份公开资料摘要、${hallList.length + 2} 个内容栏目、${topics.length} 条专题阅读路径与独立的文献资源栏目。收藏、浏览足迹和导出记录保存在当前浏览器中。</p>`,
      );
    if (action === "preview") {
      const key = button.dataset.key;
      $("#media-image").src = `assets/${key}.jpg`;
      $("#media-image").alt = imageSources[key].name;
      $("#media-caption").textContent =
        `${imageSources[key].name} · ${imageSources[key].author}`;
      $("#media-dialog").showModal();
    }
    if (action === "download") downloadRecord(id);
    if (action === "copy-source") copySource(id);
    if (action === "correction") showCorrection(id);
  });
  $("#search-input").addEventListener("input", renderSearchSuggestions);
  $("#search-form").addEventListener("submit", (e) => {
    e.preventDefault();
    submitSearch();
  });
  $$("dialog").forEach((dialog) =>
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        )
          dialog.close();
      }
    }),
  );
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (!document.querySelector("dialog[open]")) showSearch();
    }
  });
  document.addEventListener("click", (e) => {
    if (e.target.closest('dialog a[href^="#/"]')) {
      const href = e.target.closest("a").getAttribute("href");
      $$("dialog[open]").forEach((d) => d.close());
      if (href === location.hash) route();
    }
  });
  window.addEventListener("hashchange", route);
  route();
})();

