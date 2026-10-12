const PROJECTS = [{"id": "three", "category": "3d", "title": ["3D", "3D"], "tag": ["3D", "3D"], "cover": "environment-02", "subtitle": ["Scenes, objects and experiments in form.", "Mekânlar, objeler ve form denemeleri."], "description": ["Studies in atmosphere, light and form.", "Atmosfer, ışık ve form üzerine çalışmalar."], "images": ["environment-01", "environment-02", "environment-03", "environment-04", "environment-05", "environment-06", "props-01", "props-02", "props-03", "props-04", "materials-01", "materials-02", "materials-03", "character-01", "character-02"], "captions": [["Cabin in the trees", "Ağaçların arasındaki ev"], ["House by the water", "Su kenarındaki ev"], ["Neon alley", "Neon sokak"], ["Rock and terrain study", "Kaya ve arazi çalışması"], ["Coffee and light", "Kahve ve ışık"], ["Light and contrast study", "Işık ve kontrast çalışması"], ["Textured weapon study", "Dokulu silah çalışması"], ["Building kit", "Yapı koleksiyonu"], ["Motorcycle form study", "Motosiklet form çalışması"], ["Weapon modeling study", "Silah modelleme çalışması"], ["Blade material study", "Kılıç materyal çalışması"], ["Wood and metal study", "Ahşap ve metal çalışması"], ["Sword presentation", "Kılıç sunumu"], ["Stylized character study", "Stilize karakter çalışması"], ["Character sculpt study", "Karakter heykel çalışması"]], "themes": ["woodland", "forest", "neon", "terrain", "ember", "mono", "plum", "ember", "mono", "plum", "mono", "ember", "red", "sage", "sage"], "models": {"environment-06": {"src": "assets/models/contrast-katana.glb", "theta": 90, "phi": 75, "bytes": 1238752}, "environment-05": {"src": "assets/models/coffee-lamp.glb", "theta": 0, "phi": 75, "bytes": 247828}, "props-01": {"src": "assets/models/textured-revolver.glb", "theta": 180, "phi": 75, "bytes": 2556112}, "materials-01": {"src": "assets/models/katana-original.glb", "theta": 90, "phi": 75, "bytes": 9072184}}, "renders": {"materials-01": {"render": "assets/images/materials-01.webp", "fullRender": "images/renders/materials-01-render.png", "renderBackdrop": ["#31353a", "#32373b"], "clay": "assets/images/materials-01-clay.webp", "fullClay": "images/renders/materials-01-clay.png", "clayBackdrop": ["#32363b", "#32373b"], "presentation": "studio"}, "props-01": {"render": "assets/images/props-01.webp", "fullRender": "images/renders/props-01-render.png", "renderBackdrop": ["#26282c", "#bbbcbd"], "clay": "assets/images/props-01-clay.webp", "fullClay": "images/renders/props-01-clay.png", "clayBackdrop": ["#5d5e63", "#e4e5e5"], "presentation": "studio"}, "environment-05": {"render": "assets/images/environment-05.webp", "fullRender": "images/renders/environment-05-render.png", "renderBackdrop": ["#000000", "#2a1c1a"], "clay": "assets/images/environment-05-clay.webp", "fullClay": "images/renders/environment-05-clay.png", "clayBackdrop": ["#abafb0", "#a9acaf"], "presentation": "scene"}, "environment-06": {"render": "assets/images/environment-06.webp", "fullRender": "images/renders/environment-06-render.png", "renderBackdrop": ["#000000", "#000000"], "clay": "assets/images/environment-06-clay.webp", "fullClay": "images/renders/environment-06-clay.png", "clayBackdrop": ["#97979d", "#aaabad"], "presentation": "scene"}, "environment-01": {"render": "assets/images/environment-01.webp", "fullRender": "images/renders/environment-01-render.png", "renderBackdrop": ["#191c19", "#4e4729"], "clay": "assets/images/environment-01-clay.webp", "fullClay": "images/renders/environment-01-clay.png", "clayBackdrop": ["#44484c", "#adafb1"], "presentation": "scene"}, "props-02": {"render": "assets/images/props-02.webp", "fullRender": "images/renders/props-02-render.png", "renderBackdrop": ["#5e6368", "#a2a6a8"], "clay": "assets/images/props-02-clay.webp", "fullClay": "images/renders/props-02-clay.png", "clayBackdrop": ["#b4b6b8", "#d7d8d9"], "presentation": "studio"}}}, {"id": "twod", "category": "2d", "title": ["2D", "2D"], "subtitle": ["Posters, collages and visual compositions.", "Afişler, kolajlar ve görsel kompozisyonlar."], "tag": ["2D", "2D"], "cover": "2d-01", "images": ["2d-01", "2d-02", "2d-03", "2d-04"], "captions": [["Spider-Man poster study", "Spider-Man afiş çalışması"], ["Character collage", "Karakter kolajı"], ["Zero Two poster study", "Zero Two afiş çalışması"], ["Monster visual study", "Monster görsel çalışması"]], "description": ["Posters, collages and visual compositions.", "Afişler, kolajlar ve görsel kompozisyonlar."], "themes": ["red", "red", "rose", "sage"]}];
(() => {
  'use strict';
  const root = document.documentElement;
  const dialog = document.getElementById('project-dialog');
  const image = document.getElementById('viewer-image');
  const renderVariants = document.getElementById('render-variants');
  const variantButtons = [...renderVariants.querySelectorAll('button')];
  let viewVariant = 'render';
  let renderedVariant = '';
  let studioBackdrop = null;
  const collectionPanel = document.getElementById('collection-panel');
  const collectionStage = document.getElementById('collection-stage');
  const collectionBack = document.getElementById('collection-back');
  let collectionMode = false;
  let collectionEntry = false;
  let collectionDrag = null;
  let suppressCollectionClick = false;
  let collectionWheel = null;
  let collectionWheelTimer = 0;
  const modelViewer = document.getElementById('artwork-model');
  const modelStatus = document.getElementById('model-status');
  let modelModule;
  let modelRevision = 0;
  let modelMode = false;
  let activeModel = null;
  const modelButton = document.getElementById('view-model');
  let modelLoaded = false;
  let modelHome = null;
  let wheelFocus = null;
  let cameraReset = 0;
  const languageButtons = [...document.querySelectorAll('.languages button')];
  const filterButtons = [...document.querySelectorAll('.filters [data-filter]')];
  const projects = [...document.querySelectorAll('.project')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hero = document.querySelector('.hero-canvas');
  const heroFrame = document.querySelector('.hero-image-frame');
  const heroImage = document.querySelector('.hero-image');
  const sceneButtons = [...document.querySelectorAll('[data-scene]')];
  const featuredIndex = stem => PROJECTS.find(project => project.id === 'three').images.indexOf(stem);
  const heroScenes = [
    {project:'three',index:featuredIndex('environment-02'),title:['House by the water','Su kenarındaki ev'],kind:'environment'},
    {project:'three',index:featuredIndex('environment-03'),title:['Into the night','Geceye doğru'],kind:'environment'},
    {project:'three',index:featuredIndex('props-01'),title:['A study in detail','Bir detay çalışması'],kind:'object'}
  ];
  const palettes = {
    forest:{bg:'#162b30',surface:'#213b40',raised:'#35545a',text:'#eef3ed',muted:'#aebfbe',line:'#3e575b',accent:'#c6aa86'},
    woodland:{bg:'#172b2c',surface:'#263d39',raised:'#416253',text:'#eef3ed',muted:'#bcc9bc',line:'#5e7569',accent:'#c6b18f'},
    neon:{bg:'#211d35',surface:'#302841',raised:'#493a61',text:'#eef3ed',muted:'#beb0cd',line:'#5b4869',accent:'#c6abc6'},
    terrain:{bg:'#292e21',surface:'#3c422e',raised:'#505940',text:'#eef3ed',muted:'#c1c5aa',line:'#5e654b',accent:'#c2c6a5'},
    ember:{bg:'#352624',surface:'#4a3330',raised:'#70483d',text:'#eef3ed',muted:'#d2b8a5',line:'#76534a',accent:'#c6ad95'},
    mono:{bg:'#22292e',surface:'#354048',raised:'#4a5860',text:'#eef3ed',muted:'#bbcbd0',line:'#607178',accent:'#bac7cd'},
    plum:{bg:'#2e232d',surface:'#45303f',raised:'#604259',text:'#eef3ed',muted:'#cbb7c4',line:'#755367',accent:'#c6a8bd'},
    red:{bg:'#341d24',surface:'#4d2b34',raised:'#74434a',text:'#eef3ed',muted:'#d9b5b6',line:'#88535f',accent:'#c6a49c'},
    rose:{bg:'#30232b',surface:'#45303f',raised:'#624456',text:'#eef3ed',muted:'#cbb7c4',line:'#755367',accent:'#c6a6b3'},
    sage:{bg:'#1e302b',surface:'#2c4239',raised:'#456353',text:'#eef3ed',muted:'#bdcdc5',line:'#59756a',accent:'#aac3b5'}
  };
  let homeScene = 0;
  let heroRevision = 0;
  let heroEntrance;
  const visitedHeroScenes = new Set();
  let language = 'en';
  let currentProject = null;
  let currentIndex = 0;
  let activeFilter = 'all';
  let opener = null;
  let renderedStem = '';
  let imageRevision = 0;
  let closing = false;
  let filterRunning = false;
  let requestedFilter = 'all';
  const effects = new WeakMap();
  const ease = 'cubic-bezier(.22,1,.36,1)';
  const blendEase = 'cubic-bezier(.4,0,.2,1)';
  const fontsReady = document.fonts?.ready || Promise.resolve();
  root.classList.add('has-js');
  const text = pair => pair[language === 'tr' ? 1 : 0];

  function sceneProject() { return PROJECTS.find(project => project.id === heroScenes[homeScene].project); }
  function homeTheme() { return 'forest'; }
  function applyTheme(name) {
    const palette = palettes[name] || palettes.forest;
    root.dataset.theme = name;
    root.style.colorScheme = palette.scheme || 'dark';
    Object.entries(palette).forEach(([key,value]) => { if (key !== 'scheme') root.style.setProperty(`--${key}`,value); });
    document.querySelector('meta[name="theme-color"]').content = palette.bg;
  }
  function updateHeroText() {
    const scene = heroScenes[homeScene];
    const project = sceneProject();
    heroImage.alt = text(project.captions[scene.index]);
    document.getElementById('hero-scene-title').textContent = text(scene.title);
    document.getElementById('hero-counter').textContent = `${String(homeScene+1).padStart(2,'0')} / 03`;
    document.querySelector('.hero-scenes').setAttribute('aria-label', text(['Featured projects','Öne çıkan projeler']));
    const link = document.querySelector('.hero-feature');
    link.href = `images/${project.images[scene.index]}.jpg`;
    link.dataset.project = project.id;
    link.dataset.index = String(scene.index);
  }
  async function loadArtwork(src) {
    const candidate = new Image();
    candidate.src = src;
    try { await candidate.decode(); return candidate; } catch (_) { return null; }
  }
  async function setHeroScene(index) {
    if (!heroScenes[index]) return;
    const revision = ++heroRevision;
    const scene = heroScenes[index];
    const project = PROJECTS.find(entry => entry.id === scene.project);
    const candidate = await loadArtwork(`assets/images/${project.images[scene.index]}.webp`);
    if (!candidate || revision !== heroRevision || index === homeScene) return;
    const outgoing = freezeFrame(heroImage);
    heroEntrance?.cancel();
    heroImage.style.transform = '';
    homeScene = index;
    root.dataset.heroKind = scene.kind;
    sceneButtons.forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.scene) === index)));
    heroImage.src = candidate.src;
    updateHeroText();
    transitionScene(heroImage,outgoing);
    fontsReady.then(() => { if (revision === heroRevision) reveal(document.querySelector('.hero-selection')); });
  }

  // Native animations share the durations and curves from the personal brand kit.
  function play(element, frames, options = {}) {
    effects.get(element)?.cancel();
    if (reducedMotion.matches) frames = frames.map(frame => ({opacity:frame.opacity ?? 1}));
    const settings = {duration:360, easing:ease, fill:'both', ...options};
    if (reducedMotion.matches) { settings.duration = Math.min(settings.duration,100); settings.delay = 0; }
    const effect = element.animate(frames, settings);
    effects.set(element, effect);
    return effect.finished.catch(() => {}).then(() => {
      if (effects.get(element) === effect) { effects.delete(element); effect.cancel(); }
    });
  }
  function reveal(element, delay = 0) {
    return play(element,[{opacity:0,transform:'translateY(12px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,delay});
  }

  function positionFilter() {
    const selected = filterButtons.find(button => button.getAttribute('aria-pressed') === 'true');
    if (!selected) return;
    const group = document.querySelector('.filters');
    group.style.setProperty('--filter-x', `${selected.offsetLeft}px`);
    group.style.setProperty('--filter-width', `${selected.offsetWidth}px`);
  }

  function updateCount() {
    const count = projects.filter(project => !project.hidden).length;
    document.querySelector('.collection-count').textContent = language === 'tr' ? `${count} koleksiyon` : `${count} ${count === 1 ? 'collection' : 'collections'}`;
  }

  function setLanguage(next) {
    language = next === 'tr' ? 'tr' : 'en';
    root.dataset.language = language;
    root.lang = language;
    languageButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    updateHeroText();
    document.querySelector('.about-portrait img').alt = text(['A house among trees with warm interior lighting', 'Ağaçlar arasında, sıcak iç aydınlatmalı bir ev']);
    renderVariants.setAttribute('aria-label',text(['Artwork view','Çalışma görünümü']));
    PROJECTS.forEach(project => {
      const coverImage = document.querySelector(`.${project.id}-card .project-art img`);
      if (coverImage) coverImage.alt = text(project.captions[project.images.indexOf(project.cover)]);
    });
    const labels = { 'dialog-close': ['Close project','Projeyi kapat'], 'image-prev': ['Previous image','Önceki görsel'], 'image-next': ['Next image','Sonraki görsel'], 'collection-prev':['Previous artwork','Önceki çalışma'], 'collection-next':['Next artwork','Sonraki çalışma'] };
    Object.entries(labels).forEach(([id, pair]) => document.getElementById(id).setAttribute('aria-label', text(pair)));
    document.querySelector('.filters').setAttribute('aria-label', language === 'tr' ? 'Projeleri filtrele' : 'Filter projects');
    document.querySelector('nav').setAttribute('aria-label', language === 'tr' ? 'Ana gezinme' : 'Main navigation');
    document.querySelector('.brand').setAttribute('aria-label', language === 'tr' ? 'Yavuzhan Önder — ana sayfa' : 'Yavuzhan Önder — home');
    if (currentProject) { updateProjectText(); if (collectionMode) updateCollection(); else renderImage(false); }
    updateCount();
    positionFilter();
    try { localStorage.setItem('portfolio-language', language); } catch (_) { /* Local storage may be unavailable when opened from disk. */ }
  }

  function updateProjectText() {
    document.getElementById('dialog-title').textContent = text(currentProject.captions[currentIndex]);
    document.getElementById('dialog-description').textContent = text(currentProject.description);
    document.getElementById('dialog-category').textContent = text(currentProject.tag);
  }

  function collectionStep() {
    const selected = collectionStage.children[currentIndex];
    return (selected?.offsetWidth || 240) * .94 + 24;
  }
  function collectionOffset() {
    const selected = collectionStage.children[currentIndex];
    if (!selected || reducedMotion.matches) return 0;
    const transform = getComputedStyle(selected).transform;
    return transform === 'none' ? 0 : new DOMMatrixReadOnly(transform).m41 + selected.offsetWidth / 2;
  }
  function positionCollection(drag = 0) {
    const step = collectionStep();
    const cardHeight = collectionStage.children[currentIndex]?.offsetHeight || 0;
    // Finish the reflection's fade before the stage clips, including on short screens.
    const reflectionFade = Math.max(0, Math.min(cardHeight * .62, (collectionStage.clientHeight - cardHeight) / 2 - 8));
    collectionStage.style.setProperty('--reflection-fade', `${reflectionFade}px`);
    const shift = reducedMotion.matches ? 0 : drag / step;
    [...collectionStage.children].forEach((card, index) => {
      const distance = index - currentIndex + shift;
      const side = Math.max(-1, Math.min(1, distance));
      const scale = 1 - Math.min(1, Math.abs(distance)) * .14;
      const angle = reducedMotion.matches ? 0 : -side * 14;
      card.style.transform = `translate3d(calc(-50% + ${distance * step}px), -50%, 0) rotateY(${angle}deg) scale(${reducedMotion.matches ? 1 : scale})`;
      card.style.zIndex = String(10 - Math.min(9, Math.round(Math.abs(distance))));
      card.style.opacity = String(1 - Math.min(1, Math.abs(distance)) * .25);
      card.style.visibility = Math.abs(distance) <= 3 ? 'visible' : 'hidden';
      card.style.pointerEvents = Math.abs(distance) <= 2 ? '' : 'none';
      card.setAttribute('aria-hidden', String(Math.abs(distance) > 2));
      card.tabIndex = index === currentIndex ? 0 : -1;
      card.setAttribute('aria-pressed', String(index === currentIndex));
    });
  }
  function updateCollection() {
    if (!currentProject) return;
    document.getElementById('collection-title').textContent = text(currentProject.title);
    document.getElementById('collection-description').textContent = text(currentProject.description);
    document.getElementById('collection-name').textContent = text(currentProject.captions[currentIndex]);
    document.getElementById('collection-counter').textContent = `${String(currentIndex + 1).padStart(2,'0')} / ${String(currentProject.images.length).padStart(2,'0')}`;
    collectionStage.setAttribute('aria-label', text(['Artwork collection','Çalışma koleksiyonu']));
    document.getElementById('collection-prev').disabled = currentIndex === 0;
    document.getElementById('collection-next').disabled = currentIndex === currentProject.images.length - 1;
    [...collectionStage.children].forEach((card, index) => {
      card.setAttribute('aria-label', `${text(currentProject.captions[index])} — ${index === currentIndex ? text(['Explore artwork','Çalışmayı incele']) : text(['Select artwork','Çalışmayı seç'])}`);
      card.querySelector('.collection-card-name').textContent = text(currentProject.captions[index]);
      // Only the selected artwork and its immediate neighbours need the larger images.
      if (Math.abs(index - currentIndex) <= 3) card.querySelectorAll('img').forEach(artwork => { artwork.src = `assets/images/${currentProject.images[index]}.webp`; });
    });
    applyTheme(currentProject.themes[currentIndex]);
    positionCollection();
  }
  function buildCollection() {
    collectionStage.replaceChildren();
    currentProject.images.forEach((stem, index) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'collection-card';
      const label = document.createElement('span');
      label.className = 'collection-card-name';
      label.setAttribute('aria-hidden','true');
      card.append(label);
      const artworkFrame = document.createElement('span');
      artworkFrame.className = 'collection-artwork';
      const artwork = document.createElement('img');
      artwork.src = `assets/images/${stem}-thumb.webp`;
      artwork.alt = '';
      artwork.draggable = false;
      artwork.width = 600;
      artwork.height = 400;
      artwork.decoding = 'async';
      artworkFrame.append(artwork);
      card.append(artworkFrame);
      const reflection = artwork.cloneNode();
      reflection.className = 'collection-reflection';
      reflection.setAttribute('aria-hidden','true');
      card.append(reflection);
      if (currentProject.models?.[stem]) {
        const badge = document.createElement('span');
        badge.className = 'model-badge';
        badge.textContent = '3D';
        artworkFrame.append(badge);
      }
      card.addEventListener('click', () => {
        if (closing || !collectionMode) return;
        if (index === currentIndex) inspectCollection();
        else selectCollection(index);
      });
      collectionStage.append(card);
    });
  }
  function selectCollection(index, velocity = 0) {
    if (!collectionMode || closing) return;
    cancelCollectionWheel();
    const duration = Math.round(550 - 370 * Math.min(1, Math.abs(velocity) / 2.5));
    [...collectionStage.children].forEach(card => { card.style.transitionDuration = `${duration}ms`; });
    collectionStage.dataset.duration = String(duration);
    const focused = document.activeElement;
    const focusInCollection = collectionStage.contains(focused);
    currentIndex = Math.max(0, Math.min(index, currentProject.images.length - 1));
    updateCollection();
    // Keep keyboard focus on the selected artwork when it moves out of the centre.
    if (focusInCollection || focused.disabled) collectionStage.children[currentIndex]?.focus({preventScroll:true});
  }
  function showCollection(animate = true) {
    cancelCollectionWheel();
    imageRevision++;
    leaveModel();
    collectionMode = true;
    collectionPanel.hidden = false;
    collectionBack.hidden = true;
    dialog.classList.add('is-collection');
    dialog.setAttribute('aria-labelledby','collection-title');
    dialog.setAttribute('aria-describedby','collection-description');
    delete root.dataset.artwork;
    effects.get(image)?.cancel();
    image.parentElement.querySelectorAll(':scope > .scene-layer,:scope > .scene-backing').forEach(node => { effects.get(node)?.cancel(); node.remove(); });
    collectionDrag = null;
    collectionStage.classList.remove('is-dragging');
    updateCollection();
    collectionStage.children[currentIndex]?.focus({preventScroll:true});
    if (animate) play(collectionPanel,[{opacity:0},{opacity:1}],{duration:480});
  }
  function inspectCollection() {
    if (!collectionMode || closing) return;
    finishCollectionWheel();
    collectionMode = false;
    collectionPanel.hidden = true;
    dialog.classList.remove('is-collection');
    collectionBack.hidden = false;
    dialog.setAttribute('aria-labelledby','dialog-title');
    dialog.setAttribute('aria-describedby','dialog-description');
    updateProjectText();
    renderImage(false);
    collectionBack.focus({preventScroll:true});
    play(image.parentElement,[{opacity:0},{opacity:1}],{duration:480});
    fontsReady.then(() => { if (!collectionMode && dialog.open && !closing) reveal(document.querySelector('.dialog-heading')); });
  }

  document.getElementById('collection-prev').addEventListener('click', () => selectCollection(currentIndex - 1));
  document.getElementById('collection-next').addEventListener('click', () => selectCollection(currentIndex + 1));
  document.getElementById('collection-inspect').addEventListener('click', inspectCollection);
  collectionBack.addEventListener('click', () => showCollection());
  collectionStage.addEventListener('pointerdown', event => {
    if (!collectionMode || closing || (event.pointerType === 'mouse' && event.button !== 0)) return;
    finishCollectionWheel();
    suppressCollectionClick = false;
    const offset = collectionOffset();
    collectionDrag = {id:event.pointerId,x:event.clientX,y:event.clientY,lastX:event.clientX,time:event.timeStamp,velocity:0,offset,dx:offset,active:false};
  });
  collectionStage.addEventListener('pointermove', event => {
    if (!collectionDrag || collectionDrag.id !== event.pointerId) return;
    const dx = event.clientX - collectionDrag.x;
    const dy = event.clientY - collectionDrag.y;
    const elapsed = Math.max(1,event.timeStamp - collectionDrag.time);
    collectionDrag.velocity = collectionDrag.velocity * .4 + Math.abs(event.clientX - collectionDrag.lastX) / elapsed * .6;
    collectionDrag.lastX = event.clientX;
    collectionDrag.time = event.timeStamp;
    if (!collectionDrag.active && Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy)) {
      collectionDrag.active = true;
      collectionStage.setPointerCapture(event.pointerId);
      collectionStage.classList.add('is-dragging');
    }
    if (!collectionDrag.active) return;
    event.preventDefault();
    const minimum = -(currentProject.images.length - 1 - currentIndex) * collectionStep();
    const maximum = currentIndex * collectionStep();
    collectionDrag.dx = Math.max(minimum, Math.min(dx + collectionDrag.offset, maximum));
    positionCollection(collectionDrag.dx);
  });
  function endCollectionDrag(event) {
    if (!collectionDrag || collectionDrag.id !== event.pointerId) return;
    const drag = collectionDrag;
    collectionDrag = null;
    collectionStage.classList.remove('is-dragging');
    if (collectionStage.hasPointerCapture(event.pointerId)) collectionStage.releasePointerCapture(event.pointerId);
    if (!drag.active) return;
    suppressCollectionClick = true;
    const velocity = event.type === 'pointercancel' ? 0 : drag.velocity * Math.exp(-Math.max(0,event.timeStamp - drag.time) / 100);
    const projected = drag.dx + Math.sign(drag.dx) * Math.min(collectionStep() * .9,velocity * 90);
    let delta = event.type === 'pointercancel' ? 0 : Math.round(-projected / collectionStep());
    if (!delta && Math.abs(drag.dx) > 45 && event.type !== 'pointercancel') delta = drag.dx < 0 ? 1 : -1;
    selectCollection(currentIndex + delta,velocity);
  }
  collectionStage.addEventListener('pointerup', endCollectionDrag);
  collectionStage.addEventListener('pointercancel', endCollectionDrag);
  collectionStage.addEventListener('click', event => {
    if (suppressCollectionClick && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); suppressCollectionClick = false; }
  }, true);
  function cancelCollectionWheel() {
    clearTimeout(collectionWheelTimer);
    collectionWheelTimer = 0;
    collectionWheel = null;
    collectionStage.classList.remove('is-scrolling');
  }
  function finishCollectionWheel() {
    if (!collectionWheel) return;
    const gesture = collectionWheel;
    cancelCollectionWheel();
    if (!collectionMode || closing) return;
    let delta = Math.round(-gesture.dx / collectionStep());
    if (!delta && Math.abs(gesture.dx) > 44) delta = gesture.dx < 0 ? 1 : -1;
    selectCollection(currentIndex + delta,gesture.velocity);
  }
  dialog.addEventListener('wheel', event => {
    if (!collectionMode || closing || event.ctrlKey || collectionDrag?.active) return;
    const raw = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (!raw) return;
    event.preventDefault();
    const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? collectionStage.clientHeight : 1;
    const delta = raw * unit;
    const now = event.timeStamp;
    if (!collectionWheel) collectionWheel = {dx:collectionOffset(),velocity:0,time:now - 32};
    const elapsed = Math.max(8,Math.min(80,now - collectionWheel.time));
    collectionWheel.velocity = collectionWheel.velocity * .4 + Math.abs(delta) / elapsed * .6;
    collectionWheel.time = now;
    const step = collectionStep();
    collectionWheel.dx = Math.max(-(currentProject.images.length - 1 - currentIndex) * step,Math.min(currentIndex * step,collectionWheel.dx - delta * .9));
    collectionStage.classList.add('is-scrolling');
    positionCollection(collectionWheel.dx);
    clearTimeout(collectionWheelTimer);
    collectionWheelTimer = setTimeout(finishCollectionWheel,100);
  },{passive:false});
  window.addEventListener('resize', () => { if (collectionMode) positionCollection(); });
  reducedMotion.addEventListener('change', () => { if (collectionMode) positionCollection(); });

  function updateStudioBackdrop() {
    if (!studioBackdrop || !dialog.open || collectionMode || modelMode || !dialog.classList.contains('is-studio-render')) return;
    const stage = image.parentElement.getBoundingClientRect();
    const artwork = image.getBoundingClientRect();
    if (!stage.height || !artwork.height) return;
    // Extend the render's actual edge colours at the artwork's displayed height.
    // A full-height two-colour gradient cannot line up with a smaller image.
    const stops = studioBackdrop.map((color,index) => {
      const y = (artwork.top-stage.top + artwork.height*index/(studioBackdrop.length-1))/stage.height;
      return `${color} ${(Math.max(0,Math.min(1,y))*100).toFixed(3)}%`;
    });
    dialog.style.setProperty('--artwork-background',`linear-gradient(180deg,${studioBackdrop[0]} 0%,${stops.join(',')},${studioBackdrop.at(-1)} 100%)`);
  }
  function prepareStudioBackdrop(candidate) {
    const canvas = document.createElement('canvas');
    canvas.width = 64; canvas.height = 64;
    const context = canvas.getContext('2d',{willReadFrequently:true});
    context.drawImage(candidate,0,0,64,64);
    const pixels = context.getImageData(0,0,64,64).data;
    studioBackdrop = Array.from({length:64},(_,y) => {
      const channels = [0,1,2].map(channel => {
        const left = pixels[(y*64)*4+channel];
        const right = pixels[(y*64+63)*4+channel];
        return Math.round((left+right)/2);
      });
      return `rgb(${channels.join(',')})`;
    });
    updateStudioBackdrop();
  }
  const studioResize = new ResizeObserver(updateStudioBackdrop);
  studioResize.observe(image.parentElement);
  studioResize.observe(image);

  // Capture the currently visible blend before interrupting a transition.
  function freezeFrame(element) {
    const stage = element.parentElement;
    const layer = document.createElement('div');
    layer.style.background = getComputedStyle(stage).background;
    layer.className = 'scene-layer';
    layer.setAttribute('aria-hidden','true');
    [...stage.children].filter(node => node === element || node.classList.contains('scene-layer') || node.classList.contains('scene-backing')).forEach(node => {
      const copy = node.cloneNode(true);
      const presentation = getComputedStyle(node);
      copy.removeAttribute('id');
      copy.style.opacity = presentation.opacity;
      copy.style.transform = presentation.transform;
      if (node === element) {
        copy.alt = '';
        copy.style.objectFit = presentation.objectFit;
        copy.style.objectPosition = presentation.objectPosition;
        copy.style.zIndex = '1';
        ['left','right','top','bottom','width','height','maskImage','maskComposite'].forEach(property => { copy.style[property] = presentation[property]; });
      }
      layer.append(copy);
      effects.get(node)?.cancel();
      if (node !== element) node.remove();
    });
    stage.append(layer);
    return layer;
  }
  function transitionScene(incoming, outgoing) {
    // Composite the artwork with its canvas before fading. Stacking masked
    // images directly makes translucent edges change when the backing is removed.
    const backing = document.createElement('div');
    backing.className = 'scene-backing';
    backing.setAttribute('aria-hidden','true');
    backing.style.background = getComputedStyle(incoming.parentElement).background;
    const copy = incoming.cloneNode();
    copy.removeAttribute('id');
    copy.alt = '';
    copy.style.opacity = '1';
    const presentation = getComputedStyle(incoming);
    ['left','right','top','bottom','width','height','objectFit','objectPosition','maskImage','maskComposite','transform'].forEach(property => { copy.style[property] = presentation[property]; });
    backing.append(copy);
    incoming.parentElement.prepend(backing);
    play(backing,[{opacity:0},{opacity:1}],{duration:550,easing:blendEase});
    if (outgoing) play(outgoing,[{opacity:1},{opacity:0}],{duration:550,easing:blendEase}).then(() => { outgoing.remove(); backing.remove(); });
    else backing.remove();
  }

  function currentModel() { return currentProject?.models?.[renderedStem]; }
  function leaveModel() {
    cancelAnimationFrame(cameraReset);
    cameraReset = 0;
    modelRevision++;
    modelMode = false;
    modelLoaded = false;
    activeModel = null;
    modelHome = null;
    wheelFocus = null;
    modelViewer.hidden = true;
    modelViewer.removeAttribute('src');
    modelViewer.removeAttribute('aria-busy');
    delete modelViewer.dataset.interacted;
    modelStatus.hidden = true;
    image.hidden = false;
    dialog.classList.remove('is-model');
  }
  function updateModelControls() {
    modelButton.hidden = !currentModel();
    modelButton.textContent = text(modelMode ? ['Back to artwork','Görsele dön'] : ['View in 3D','3D görüntüle']);
    modelButton.setAttribute('aria-pressed',String(modelMode));
    modelButton.setAttribute('aria-controls','artwork-model');
    updateVariantControls();
  }
  function updateVariantControls() {
    renderVariants.hidden = !currentProject?.renders?.[renderedStem];
    variantButtons.forEach(button => {
      button.setAttribute('aria-pressed',String(!modelMode && button.dataset.renderVariant === viewVariant));
      button.setAttribute('aria-controls','viewer-image');
    });
  }
  variantButtons.forEach(button => button.addEventListener('click', () => {
    if (!currentProject || collectionMode || closing || currentProject.images[currentIndex] !== renderedStem) return;
    const next = button.dataset.renderVariant;
    if (!currentProject.renders?.[renderedStem]?.[next] || (next === viewVariant && !modelMode)) return;
    viewVariant = next;
    if (modelMode) leaveModel();
    renderImage(true);
  }));
  function resetModel() {
    if (!modelLoaded || !activeModel) return;
    cancelAnimationFrame(cameraReset);
    const theta = activeModel.theta || 0;
    const phi = activeModel.phi || 75;
    const orbit = modelViewer.getCameraOrbit();
    const radius = orbit.radius;
    const normal = `${theta}deg ${phi}deg ${radius}m`;
    if (reducedMotion.matches) { modelViewer.cameraOrbit = normal; modelViewer.jumpCameraToGoal?.(); return; }
    const start = performance.now();
    const startTheta = orbit.theta*180/Math.PI, startPhi = orbit.phi*180/Math.PI;
    function frame(now) {
      if (!modelLoaded || !modelMode) return;
      const progress = Math.min(1,(now-start)/420);
      // Solve the brand's cubic-bezier(.22,1,.36,1) without another library.
      let low=0, high=1, t=progress;
      for (let i=0;i<12;i++) {
        t=(low+high)/2;
        const x=3*(1-t)*(1-t)*t*.22+3*(1-t)*t*t*.36+t*t*t;
        if (x<progress) low=t; else high=t;
      }
      const eased=progress===1 ? 1 : 1-Math.pow(1-t,3);
      modelViewer.cameraOrbit = `${startTheta+(theta-startTheta)*eased}deg ${startPhi+(phi-startPhi)*eased}deg ${radius}m`;
      modelViewer.jumpCameraToGoal?.();
      cameraReset = progress<1 ? requestAnimationFrame(frame) : 0;
    }
    cameraReset = requestAnimationFrame(frame);
  }
  function cursorPlanePoint(orbit, target, fov, bounds, clientX, clientY) {
    const {theta,phi,radius} = orbit;
    const halfHeight = radius*Math.tan(fov*Math.PI/360);
    const x = ((clientX-bounds.left)/bounds.width*2-1)*halfHeight*bounds.width/bounds.height;
    const y = (1-(clientY-bounds.top)/bounds.height*2)*halfHeight;
    const right = [Math.cos(theta),0,-Math.sin(theta)];
    const up = [-Math.cos(phi)*Math.sin(theta),Math.sin(phi),-Math.cos(phi)*Math.cos(theta)];
    return Object.fromEntries(['x','y','z'].map((axis,i) => [axis,target[axis]+right[i]*x+up[i]*y]));
  }
  function zoomAtCursor(event) {
    if (!modelLoaded || !modelMode || !modelHome || !event.deltaY) return;
    cancelAnimationFrame(cameraReset);
    cameraReset = 0;
    event.preventDefault();
    event.stopPropagation();
    const now = performance.now();
    const bounds = modelViewer.getBoundingClientRect();
    if (!wheelFocus || now-wheelFocus.time>180 || Math.hypot(event.clientX-wheelFocus.x,event.clientY-wheelFocus.y)>5) {
      const orbit = modelViewer.getCameraOrbit();
      const target = modelViewer.getCameraTarget();
      const hit = modelViewer.positionAndNormalFromPoint(event.clientX,event.clientY);
      const anchor = hit?.position || cursorPlanePoint(orbit,target,modelViewer.getFieldOfView(),bounds,event.clientX,event.clientY);
      // Empty background still focuses the nearest part of the model, rather than empty space.
      const dimensions = modelViewer.getDimensions();
      const bounded = Object.fromEntries(['x','y','z'].map(axis => [axis,Math.max(modelHome.target[axis]-dimensions[axis]/2,Math.min(modelHome.target[axis]+dimensions[axis]/2,anchor[axis]))]));
      wheelFocus = {orbit,target,anchor:bounded,x:event.clientX,y:event.clientY,time:now};
    }
    const pixels = event.deltaY*(event.deltaMode===1 ? 16 : event.deltaMode===2 ? bounds.height : 1);
    const oldRadius = wheelFocus.orbit.radius;
    const radius = Math.max(modelHome.radius*35/95,Math.min(modelHome.radius*160/95,oldRadius*Math.exp(Math.max(-180,Math.min(180,pixels))*.0018)));
    const ratio = radius/oldRadius;
    const target = Object.fromEntries(['x','y','z'].map(axis => [axis,wheelFocus.anchor[axis]+(wheelFocus.target[axis]-wheelFocus.anchor[axis])*ratio]));
    // Zooming back to the overview restores the whole model to the middle of the frame.
    if (pixels>0) {
      const restore = oldRadius>=modelHome.radius ? 1 : Math.min(1,(radius-oldRadius)/(modelHome.radius-oldRadius));
      for (const axis of ['x','y','z']) target[axis] += (modelHome.target[axis]-target[axis])*restore;
    }
    wheelFocus.orbit.radius = radius;
    wheelFocus.target = target;
    wheelFocus.time = now;
    modelViewer.cameraTarget = `${target.x}m ${target.y}m ${target.z}m`;
    modelViewer.cameraOrbit = `${wheelFocus.orbit.theta}rad ${wheelFocus.orbit.phi}rad ${radius}m`;
    modelViewer.dataset.interacted = 'true';
    if (reducedMotion.matches) modelViewer.jumpCameraToGoal();
  }
  function showModelStatus(message) { modelStatus.textContent = text(message); }
  function modelReadyMessage() {
    showModelStatus(activeModel?.note || ['Drag to rotate · Scroll to zoom at the cursor','Sürükle: döndür · İmlecin olduğu yere yakınlaş: scroll']);
  }
  function loadModelModule() {
    if (!modelModule) modelModule = new Promise((resolve,reject) => {
      if (customElements.get('model-viewer')) { resolve(); return; }
      const script = document.createElement('script');
      script.type = 'module'; script.src = 'assets/vendor/model-viewer.min.js';
      script.onload = () => customElements.whenDefined('model-viewer').then(resolve);
      script.onerror = () => { script.remove(); modelModule = null; reject(new Error('Model viewer unavailable')); };
      document.head.append(script);
    });
    return modelModule;
  }
  async function prepareModel() {
    if (renderedStem) currentIndex = currentProject.images.indexOf(renderedStem);
    const asset = currentModel();
    if (!asset) return;
    imageRevision++;
    effects.get(image)?.cancel();
    image.style.opacity = '';
    image.parentElement.querySelectorAll(':scope > .scene-layer,:scope > .scene-backing').forEach(node => { effects.get(node)?.cancel(); node.remove(); });
    const revision = ++modelRevision;
    activeModel = asset;
    modelMode = true;
    modelLoaded = false;
    modelHome = null;
    wheelFocus = null;
    modelViewer.hidden = false;
    image.hidden = false;
    modelStatus.hidden = false;
    modelViewer.setAttribute('aria-busy','true');
    dialog.classList.add('is-model');
    updateModelControls();
    showModelStatus(['Preparing the 3D model…','3D model hazırlanıyor…']);
    try {
      await loadModelModule();
      if (revision !== modelRevision || !dialog.open || closing || !modelMode) return;
      // Keep only the active asset in the GPU cache; HTTP caching still avoids repeat downloads.
      customElements.get('model-viewer').modelCacheSize = 0;
      const theta=asset.theta || 0, phi=asset.phi || 75;
      modelViewer.setAttribute('camera-target','auto auto auto');
      modelViewer.setAttribute('field-of-view','30deg');
      modelViewer.setAttribute('min-field-of-view','30deg');
      modelViewer.setAttribute('max-field-of-view','30deg');
      modelViewer.setAttribute('camera-orbit',`${theta}deg ${phi}deg 95%`);
      modelViewer.setAttribute('min-camera-orbit',`${theta-30}deg ${Math.max(20,phi-20)}deg 35%`);
      modelViewer.setAttribute('max-camera-orbit',`${theta+30}deg ${Math.min(110,phi+20)}deg 160%`);
      modelViewer.setAttribute('alt',`${text(currentProject.captions[currentIndex])}. ${text(['Drag to rotate; scroll or pinch to zoom','Sürükleyerek döndür; kaydırarak veya iki parmakla yakınlaştır'])}`);
      modelViewer.setAttribute('src',asset.src);
    } catch (_) {
      if (revision !== modelRevision || !modelMode) return;
      showModelStatus(['3D preview unavailable. The artwork is still available.','3D önizleme açılamadı. Görseli inceleyebilirsin.']);
      modelViewer.hidden = true;
      modelViewer.removeAttribute('aria-busy');
    }
  }
  modelViewer.addEventListener('load', () => {
    if (!modelMode || !dialog.open || closing || modelViewer.getAttribute('src') !== activeModel?.src) return;
    modelLoaded = true;
    modelHome = {radius:modelViewer.getCameraOrbit().radius,target:modelViewer.getCameraTarget()};
    modelViewer.removeAttribute('aria-busy');
    image.hidden = true;
    modelReadyMessage();
    resetModel();
  });
  modelViewer.addEventListener('error', () => {
    if (!modelMode) return;
    modelLoaded = false;
    modelViewer.hidden = true;
    modelViewer.removeAttribute('aria-busy');
    showModelStatus(['The 3D model could not be loaded. The image is still available.','3D model yüklenemedi. Görseli inceleyebilirsin.']);
    image.hidden = false;
  });
  modelViewer.addEventListener('pointerup',resetModel);
  modelViewer.addEventListener('pointerdown',() => { wheelFocus = null; cancelAnimationFrame(cameraReset); cameraReset = 0; });
  modelViewer.addEventListener('wheel',zoomAtCursor,{capture:true,passive:false});
  modelViewer.addEventListener('pointercancel',resetModel);
  modelViewer.addEventListener('keyup', event => { if (event.key.startsWith('Arrow')) resetModel(); });
  modelViewer.addEventListener('camera-change', event => {
    const orbit = modelViewer.getCameraOrbit();
    modelViewer.dataset.yaw = String(orbit.theta*180/Math.PI);
    modelViewer.dataset.pitch = String(orbit.phi*180/Math.PI);
    modelViewer.dataset.radius = String(orbit.radius);
    const target = modelViewer.getCameraTarget();
    modelViewer.dataset.targetX = String(target.x);
    modelViewer.dataset.targetY = String(target.y);
    modelViewer.dataset.targetZ = String(target.z);
    if (event.detail.source === 'user-interaction') modelViewer.dataset.interacted = 'true';
  });
  modelButton.addEventListener('click', () => {
    if (!currentProject || closing || !currentModel()) return;
    if (modelMode) { leaveModel(); updateModelControls(); return; }
    prepareModel();
  });

  async function renderImage(animateChange = true) {
    if (!currentProject || collectionMode) return;
    const project = currentProject;
    const index = currentIndex;
    const stem = project.images[index];
    const variants = project.renders?.[stem];
    const variant = stem !== renderedStem || !variants ? 'render' : viewVariant;
    viewVariant = variant;
    const revision = ++imageRevision;
    const candidate = await loadArtwork(variants?.[variant] || `assets/images/${stem}.webp`);
    if (revision !== imageRevision || currentProject !== project || !dialog.open || closing) return;
    if (!candidate) {
      modelStatus.hidden = false;
      showModelStatus(['Image unavailable. Try another image.','Görsel yüklenemedi. Başka bir görsel seçebilirsin.']);
      return;
    }
    const caption = text(project.captions[index]) + (variant === 'clay' ? ' · Clay' : '');
    const changing = animateChange && (stem !== renderedStem || variant !== renderedVariant) && image.complete && image.naturalWidth && !image.hidden;
    const outgoing = changing ? freezeFrame(image) : null;
    if (stem !== renderedStem) leaveModel();
    renderedStem = stem;
    renderedVariant = variant;
    root.dataset.renderVariant = variant;
    dialog.classList.toggle('is-studio-render',variants?.presentation === 'studio');
    image.classList.toggle('studio-artwork',variants?.presentation === 'studio');
    image.style.setProperty('--studio-edge-y',stem === 'props-02' ? '12%' : '4%');
    const backdrop = variants?.[variant+'Backdrop'];
    if (backdrop) {
      dialog.style.setProperty('--artwork-top',backdrop[0]);
      dialog.style.setProperty('--artwork-bottom',backdrop[1]);
    }
    root.dataset.artwork = stem;
    updateModelControls();
    updateProjectText();
    if (modelMode && modelLoaded) modelReadyMessage();
    document.getElementById('original-label').textContent = text(['View full artwork','Görselin tamamını gör']);
    applyTheme(project.themes[index]);
    image.src = candidate.src;
    const focalPoints = {'environment-01':'50% 43%','2d-01':'50% 42%','2d-03':'50% 34%','materials-01':'50% 45%','character-02':'50% 38%'};
    image.style.objectPosition = variants?.presentation === 'studio' ? '50% 50%' : focalPoints[stem] || '50% 50%';
    image.alt = caption;
    document.getElementById('image-caption').textContent = caption;
    document.getElementById('image-counter').textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(currentProject.images.length).padStart(2, '0')}`;
    document.getElementById('original-image').href = variants?.[variant === 'clay' ? 'fullClay' : 'fullRender'] || `images/${stem}.jpg`;
    image.hidden = modelMode && modelLoaded;
    image.style.opacity = '';
    if (variants?.presentation === 'studio') prepareStudioBackdrop(candidate);
    else { studioBackdrop = null; dialog.style.removeProperty('--artwork-background'); }
    if (changing) transitionScene(image,outgoing);
    // Load only the next image instead of eagerly loading every gallery.
    if (currentProject.images.length > 1) {
      const preload = new Image();
      preload.src = `assets/images/${currentProject.images[(currentIndex + 1) % currentProject.images.length]}.webp`;
    }
  }

  function openProject(id, index, trigger) {
    const project = PROJECTS.find(entry => entry.id === id);
    if (!project || !dialog.showModal) return false;
    leaveModel();
    currentProject = project;
    root.dataset.project = project.id;
    closing = false;
    dialog.classList.remove('is-closing');
    currentIndex = Math.max(0, Math.min(Number(index) || 0, project.images.length - 1));
    opener = trigger;
    collectionEntry = trigger?.classList.contains('project-open') || false;
    collectionMode = false;
    collectionPanel.hidden = true;
    collectionBack.hidden = true;
    dialog.classList.remove('is-collection');
    dialog.setAttribute('aria-labelledby','dialog-title');
    dialog.setAttribute('aria-describedby','dialog-description');
    renderedStem = '';
    renderedVariant = '';
    viewVariant = 'render';
    image.hidden = true;
    image.parentElement.querySelectorAll(':scope > .scene-layer,:scope > .scene-backing').forEach(node => { effects.get(node)?.cancel(); node.remove(); });
    updateProjectText();
    dialog.showModal();
    if (collectionEntry) { buildCollection(); showCollection(false); }
    else renderImage(false);
    document.body.classList.add('dialog-open');
    if (!collectionEntry) document.getElementById('dialog-close').focus({ preventScroll: true });
    // A full-screen modal has a different crop from its collection card; use the kit's opacity fallback.
    play(dialog,[{opacity:0},{opacity:1}],{duration:480});
    fontsReady.then(() => { if (dialog.open && !closing && !collectionMode) reveal(document.querySelector('.dialog-heading')); });
    return true;
  }

  async function closeProject() {
    if (!dialog.open || closing) return;
    closing = true;
    cancelCollectionWheel();
    modelRevision++;
    imageRevision++;
    dialog.classList.add('is-closing');
    applyTheme(homeTheme());
    await play(dialog,[{opacity:Number(getComputedStyle(dialog).opacity)},{opacity:0}],{duration:320,easing:'cubic-bezier(.4,0,1,1)'});
    dialog.close();
  }

  function moveImage(direction) {
    if (!currentProject || closing) return;
    currentIndex = (currentIndex + direction + currentProject.images.length) % currentProject.images.length;
    renderImage(true, direction);
  }

  document.querySelectorAll('[data-project]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      if (openProject(link.dataset.project, link.dataset.index, link)) event.preventDefault();
    });
  });
  document.getElementById('dialog-close').addEventListener('click', closeProject);
  dialog.addEventListener('cancel', event => { event.preventDefault(); if (collectionEntry && !collectionMode) showCollection(); else closeProject(); });
  document.getElementById('image-prev').addEventListener('click', () => moveImage(-1));
  document.getElementById('image-next').addEventListener('click', () => moveImage(1));
  let swipeStart = null;
  image.parentElement.addEventListener('pointerdown', event => {
    if (event.pointerType === 'mouse' || dialog.classList.contains('is-model')) return;
    swipeStart = {x:event.clientX,y:event.clientY};
  });
  image.parentElement.addEventListener('pointerup', event => {
    if (!swipeStart) return;
    const dx = event.clientX - swipeStart.x;
    const dy = event.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)*1.4) moveImage(dx < 0 ? 1 : -1);
  });
  image.parentElement.addEventListener('pointercancel', () => { swipeStart = null; });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeProject();
  });
  dialog.addEventListener('close', () => {
    cancelCollectionWheel();
    document.body.classList.remove('dialog-open');
    imageRevision++;
    effects.get(image)?.cancel();
    image.style.opacity = '';
    image.parentElement.querySelectorAll(':scope > .scene-layer,:scope > .scene-backing').forEach(node => { effects.get(node)?.cancel(); node.remove(); });
    leaveModel();
    collectionMode = false;
    collectionEntry = false;
    collectionPanel.hidden = true;
    collectionBack.hidden = true;
    collectionStage.replaceChildren();
    dialog.classList.remove('is-collection');
    currentProject = null;
    delete root.dataset.project;
    delete root.dataset.artwork;
    delete root.dataset.renderVariant;
    dialog.classList.remove('is-studio-render');
    applyTheme(homeTheme());
    renderedStem = '';
    closing = false;
    dialog.classList.remove('is-closing');
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.composedPath().includes(modelViewer)) return;
    if (collectionMode && (event.key === 'Home' || event.key === 'End')) {
      event.preventDefault();
      selectCollection(event.key === 'Home' ? 0 : currentProject.images.length - 1);
      return;
    }
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      const direction = event.key === 'ArrowRight' ? 1 : -1;
      if (collectionMode) selectCollection(currentIndex + direction);
      else moveImage(direction);
    }
  });

  languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  async function filterProjects() {
    if (filterRunning) return;
    filterRunning = true;
    try {
      while (activeFilter !== requestedFilter) {
        let next = requestedFilter;
        const visible = projects.filter(project => !project.hidden);
        visible.forEach(project => effects.get(project)?.cancel());
        const before = new Set(visible);
        const leaving = visible.filter(project => next !== 'all' && project.dataset.category !== next);
        filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === next)));
        positionFilter();
        await Promise.all(leaving.map(project => play(project, [{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-6px)'}], {duration:180,easing:'cubic-bezier(.4,0,1,1)'})));
        next = requestedFilter;
        filterButtons.forEach(button => button.setAttribute('aria-pressed',String(button.dataset.filter === next)));
        positionFilter();
        activeFilter = next;
        document.querySelector('.project-grid').dataset.filter = next;
        projects.forEach(project => { project.hidden = next !== 'all' && project.dataset.category !== next; });
        updateCount();
        const arriving = projects.filter(project => !project.hidden);
        await Promise.all(arriving.map((project,index) => {
          if (before.has(project)) {
            return play(project,[{opacity:0},{opacity:1}],{duration:360});
          }
          return reveal(project,Math.min(index,2)*60);
        }));
      }
    } finally { filterRunning = false; }
  }
  filterButtons.forEach(button => button.addEventListener('click', () => {
    requestedFilter = button.dataset.filter;
    projects.forEach(project => effects.get(project)?.cancel());
    filterProjects();
  }));
  applyTheme(homeTheme());
  root.dataset.heroKind = 'environment';
  sceneButtons.forEach(button => button.addEventListener('click', () => setHeroScene(Number(button.dataset.scene))));
  try { setLanguage(localStorage.getItem('portfolio-language') || 'en'); } catch (_) { setLanguage('en'); }

  const header = document.querySelector('.site-header');
  const portrait = document.querySelector('.about-portrait');
  const portraitImage = portrait.querySelector('img');
  let headerQueued = false;
  function updateScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    headerQueued = false;
  }
  window.addEventListener('scroll', () => {
    if (headerQueued) return;
    headerQueued = true;
    requestAnimationFrame(updateScroll);
  }, { passive: true });
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current','location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  ['top','work','about','contact'].forEach(id => sectionObserver.observe(document.getElementById(id)));

  // Wait for real font metrics, then reveal at most three text groups.
  fontsReady.then(() => {
    if (heroRevision || dialog.open) return;
    [document.querySelector('.hero-content h1'),document.querySelector('.hero-content>p'),document.querySelector('.hero-selection')].forEach((element,index) => reveal(element,index*60));
  });
  heroImage.decode().catch(() => {}).then(() => {
    if (reducedMotion.matches || heroRevision || visitedHeroScenes.has(homeScene)) return;
    visitedHeroScenes.add(homeScene);
    heroEntrance = heroImage.animate([{transform:'scale(1)'},{transform:'scale(1.03)'}],{duration:8000,easing:'cubic-bezier(.45,0,.55,1)',fill:'forwards'});
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealObserver.unobserve(entry.target);
      fontsReady.then(() => reveal(entry.target));
    });
  }, {threshold:.12});
  document.querySelectorAll('.project-art,.section-intro h2,.about-content h2,.contact-section h2,.about-details,.contact-bottom').forEach(element => revealObserver.observe(element));

  window.addEventListener('resize', () => { positionFilter(); updateScroll(); }, {passive:true});
  document.fonts?.ready.then(positionFilter);
  reducedMotion.addEventListener('change', () => {
    heroFrame.style.transform = '';
    portraitImage.style.transform = '';
    document.getAnimations().forEach(effect => effect.cancel());
    updateScroll();
  });
  updateScroll();
})();
