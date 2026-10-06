const PROJECTS = [{"id": "three", "category": "3d", "title": ["3D", "3D"], "tag": ["3D", "3D"], "cover": "environment-02", "subtitle": ["Scenes, objects and experiments in form.", "Mekânlar, objeler ve form denemeleri."], "description": ["Selected 3D work. Explore the artwork, then rotate available models.", "Seçili 3D çalışmalar. Görselleri incele; modeli olan çalışmaları 3D görüntüle."], "images": ["environment-01", "environment-02", "environment-03", "environment-04", "environment-05", "environment-06", "props-01", "props-02", "props-03", "props-04", "materials-01", "materials-02", "materials-03", "character-01", "character-02"], "captions": [["Cabin in the trees", "Ağaçların arasındaki ev"], ["House by the water", "Su kenarındaki ev"], ["Neon alley", "Neon sokak"], ["Rock and terrain study", "Kaya ve arazi çalışması"], ["Coffee and light", "Kahve ve ışık"], ["Light and contrast study", "Işık ve kontrast çalışması"], ["Textured weapon study", "Dokulu silah çalışması"], ["Building kit", "Yapı koleksiyonu"], ["Motorcycle form study", "Motosiklet form çalışması"], ["Weapon modeling study", "Silah modelleme çalışması"], ["Blade material study", "Kılıç materyal çalışması"], ["Wood and metal study", "Ahşap ve metal çalışması"], ["Sword presentation", "Kılıç sunumu"], ["Stylized character study", "Stilize karakter çalışması"], ["Character sculpt study", "Karakter heykel çalışması"]], "themes": ["woodland", "forest", "neon", "terrain", "ember", "mono", "plum", "ember", "mono", "plum", "mono", "ember", "red", "sage", "sage"], "models": {"environment-06": {"src": "assets/models/contrast-katana.glb", "theta": 90, "phi": 75, "bytes": 1238752}, "environment-05": {"src": "assets/models/coffee-lamp.glb", "theta": 0, "phi": 75, "bytes": 247828}, "props-01": {"src": "assets/models/textured-revolver.glb", "theta": 180, "phi": 75, "bytes": 2556112}, "materials-01": {"src": "assets/models/katana-original.glb", "theta": 90, "phi": 75, "bytes": 9072184}}}, {"id": "twod", "category": "2d", "title": ["2D", "2D"], "subtitle": ["Posters, collages and visual compositions.", "Afişler, kolajlar ve görsel kompozisyonlar."], "tag": ["2D", "2D"], "cover": "2d-01", "images": ["2d-01", "2d-02", "2d-03", "2d-04"], "captions": [["Spider-Man poster study", "Spider-Man afiş çalışması"], ["Character collage", "Karakter kolajı"], ["Zero Two poster study", "Zero Two afiş çalışması"], ["Monster visual study", "Monster görsel çalışması"]], "description": ["Personal poster, collage and graphic composition studies. Typography, texture and image-making through a different lens.", "Kişisel afiş, kolaj ve grafik kompozisyon çalışmaları. Tipografi, doku ve görsel üretimine farklı bir bakış."], "themes": ["red", "red", "rose", "sage"]}];
(() => {
  'use strict';
  const root = document.documentElement;
  const dialog = document.getElementById('project-dialog');
  const image = document.getElementById('viewer-image');
  const thumbs = document.getElementById('viewer-thumbnails');
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
  const languageButtons = [...document.querySelectorAll('.languages button')];
  const filterButtons = [...document.querySelectorAll('.filters [data-filter]')];
  const projects = [...document.querySelectorAll('.project')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const animation = window.Motion;
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
    forest:{bg:'#162b30',surface:'#213b40',raised:'#35545a',text:'#eef3ed',muted:'#aebfbe',line:'#3e575b',accent:'#ccd2aa'},
    woodland:{bg:'#172b2c',surface:'#263d39',raised:'#416253',text:'#f0f1e7',muted:'#bcc9bc',line:'#5e7569',accent:'#d9bb83'},
    neon:{bg:'#211d35',surface:'#302841',raised:'#493a61',text:'#f5eef8',muted:'#beb0cd',line:'#5b4869',accent:'#edb0ef'},
    terrain:{bg:'#292e21',surface:'#3c422e',raised:'#505940',text:'#f0f0dc',muted:'#c1c5aa',line:'#5e654b',accent:'#d4d69e'},
    ember:{bg:'#352624',surface:'#4a3330',raised:'#70483d',text:'#f6eee5',muted:'#d2b8a5',line:'#76534a',accent:'#edbb8d'},
    mono:{bg:'#22292e',surface:'#354048',raised:'#4a5860',text:'#f1f4f5',muted:'#bbcbd0',line:'#607178',accent:'#cfdee4'},
    plum:{bg:'#2e232d',surface:'#45303f',raised:'#604259',text:'#f5eef2',muted:'#cbb7c4',line:'#755367',accent:'#e4b3cf'},
    red:{bg:'#341d24',surface:'#4d2b34',raised:'#74434a',text:'#faf0e8',muted:'#d9b5b6',line:'#88535f',accent:'#f0c0b0'},
    rose:{bg:'#d3bdc6',surface:'#e4ced7',raised:'#f2e0e7',text:'#3d2430',muted:'#694b5c',line:'#b08b9d',accent:'#87314f',scheme:'light'},
    sage:{bg:'#adbfba',surface:'#c4d3cb',raised:'#d8e4dc',text:'#1c332c',muted:'#425e53',line:'#8aa699',accent:'#25473c',scheme:'light'}
  };
  let homeScene = 0;
  let heroRevision = 0;
  let heroEntrance;
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
  root.classList.add('has-js');
  const text = pair => pair[language === 'tr' ? 1 : 0];

  function sceneProject() { return PROJECTS.find(project => project.id === heroScenes[homeScene].project); }
  function homeTheme() { return sceneProject().themes[heroScenes[homeScene].index]; }
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
  function setHeroScene(index) {
    if (homeScene === index) return;
    const direction = index >= homeScene ? 1 : -1;
    const revision = ++heroRevision;
    heroEntrance?.stop();
    effects.get(heroImage)?.cancel();
    heroImage.style.transform = '';
    heroFrame.querySelectorAll('.hero-outgoing').forEach(node => { effects.get(node)?.cancel(); node.remove(); });
    let outgoing;
    if (!reducedMotion.matches) {
      outgoing = heroImage.cloneNode();
      outgoing.className = 'hero-image hero-outgoing';
      outgoing.alt = '';
      outgoing.setAttribute('aria-hidden','true');
      const presentation = getComputedStyle(heroImage);
      outgoing.style.width = presentation.width;
      outgoing.style.height = presentation.height;
      outgoing.style.marginLeft = presentation.marginLeft;
      outgoing.style.objectFit = presentation.objectFit;
      outgoing.style.objectPosition = presentation.objectPosition;
      heroFrame.append(outgoing);
    }
    homeScene = index;
    root.dataset.heroKind = heroScenes[index].kind;
    sceneButtons.forEach(button => button.setAttribute('aria-pressed',String(Number(button.dataset.scene) === index)));
    updateHeroText();
    const project = sceneProject();
    heroImage.src = `assets/images/${project.images[heroScenes[index].index]}.webp`;
    applyTheme(homeTheme());
    heroImage.style.opacity = reducedMotion.matches ? '' : '0';
    heroImage.decode().catch(() => {}).then(() => {
      if (revision !== heroRevision) { outgoing?.remove(); return; }
      heroImage.style.opacity = '';
      transitionScene(heroImage,outgoing);
      play(document.querySelector('.hero-selection'),[{opacity:0,transform:'translateY(15px)'},{opacity:1,transform:'translateY(0)'}],{duration:650});
    });
  }

  // Native FLIP and image layers complement the Motion entrance choreography.
  function play(element, frames, options = {}) {
    effects.get(element)?.cancel();
    if (reducedMotion.matches) return Promise.resolve();
    const effect = element.animate(frames, {duration:600, easing:ease, fill:'both', ...options});
    effects.set(element, effect);
    return effect.finished.catch(() => {}).then(() => {
      if (effects.get(element) === effect) { effects.delete(element); effect.cancel(); }
    });
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
    document.querySelector('.about-portrait img').alt = text(['A wooden cabin with warm window lights in a dark forest', 'Karanlık bir ormanda, pencerelerinden sıcak ışık yayılan ahşap bir ev']);
    PROJECTS.forEach(project => {
      const coverImage = document.querySelector(`.${project.id}-card .project-art img`);
      if (coverImage) coverImage.alt = text(project.captions[project.images.indexOf(project.cover)]);
    });
    const labels = { 'dialog-close': ['Close project','Projeyi kapat'], 'image-prev': ['Previous image','Önceki görsel'], 'image-next': ['Next image','Sonraki görsel'] };
    Object.entries(labels).forEach(([id, pair]) => document.getElementById(id).setAttribute('aria-label', text(pair)));
    document.querySelector('.filters').setAttribute('aria-label', language === 'tr' ? 'Projeleri filtrele' : 'Filter projects');
    document.querySelector('nav').setAttribute('aria-label', language === 'tr' ? 'Ana gezinme' : 'Main navigation');
    document.querySelector('.brand').setAttribute('aria-label', language === 'tr' ? 'Yavuzhan Önder — ana sayfa' : 'Yavuzhan Önder — home');
    if (currentProject) { updateProjectText(); renderImage(false); }
    updateCount();
    positionFilter();
    try { localStorage.setItem('portfolio-language', language); } catch (_) { /* Local storage may be unavailable when opened from disk. */ }
  }

  function updateProjectText() {
    document.getElementById('dialog-title').textContent = text(currentProject.title);
    document.getElementById('dialog-description').textContent = text(currentProject.description);
    document.getElementById('dialog-category').textContent = text(currentProject.tag);
    document.getElementById('dialog-tools').textContent = currentProject.category === '2d' ? 'Photoshop' : 'Blender';
    document.getElementById('dialog-size').textContent = language === 'tr' ? `${currentProject.images.length} çalışma` : `${currentProject.images.length} works`;
    thumbs.setAttribute('aria-label', language === 'tr' ? 'Proje görselleri' : 'Project images');
    [...thumbs.children].forEach((button, index) => button.setAttribute('aria-label', text(currentProject.captions[index])));
  }

  // A short dissolve keeps both scenes readable, without masks or fog.
  function transitionScene(incoming, outgoing) {
    play(incoming, [
      {opacity:.7,transform:'scale(1.018)'},
      {opacity:1,transform:'scale(1)'}
    ], {duration:480});
    if (outgoing) play(outgoing, [
      {opacity:1,transform:'scale(1)'},
      {opacity:0,transform:'scale(1.008)'}
    ], {duration:420}).then(() => outgoing.remove());
  }

  function currentModel() { return currentProject?.models?.[currentProject.images[currentIndex]]; }
  function leaveModel() {
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
  }
  function resetModel() {
    if (!modelLoaded || !activeModel) return;
    const theta = activeModel.theta || 0;
    const phi = activeModel.phi || 75;
    // Return the angle after a drag while retaining the user's zoom distance.
    const radius = modelViewer.getCameraOrbit().radius;
    const normal = `${theta}deg ${phi}deg ${radius}m`;
    modelViewer.cameraOrbit = modelViewer.cameraOrbit === normal ? `${theta+.001}deg ${phi}deg ${radius}m` : normal;
    if (reducedMotion.matches) modelViewer.jumpCameraToGoal?.();
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
    const asset = currentModel();
    if (!asset) return;
    imageRevision++;
    effects.get(image)?.cancel();
    image.style.opacity = '';
    image.parentElement.querySelectorAll('.viewer-outgoing').forEach(node => { effects.get(node)?.cancel(); node.remove(); });
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
  modelViewer.addEventListener('pointerdown',() => { wheelFocus = null; });
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

  function renderImage(animateChange = true, direction = 1) {
    if (!currentProject) return;
    const stem = currentProject.images[currentIndex];
    const caption = text(currentProject.captions[currentIndex]);
    if (stem !== renderedStem) leaveModel();
    const isModel = modelMode;
    updateModelControls();
    if (modelMode && modelLoaded) modelReadyMessage();
    document.getElementById('original-label').textContent = text(['View full artwork','Görselin tamamını gör']);
    applyTheme(currentProject.themes[currentIndex]);
    const revision = ++imageRevision;
    const stage = image.parentElement;
    effects.get(image)?.cancel();
    stage.querySelectorAll('.viewer-outgoing').forEach(node => { effects.get(node)?.cancel(); node.remove(); });
    let outgoing;
    const changing = animateChange && stem !== renderedStem && !reducedMotion.matches && !isModel;
    if (changing && image.complete && image.naturalWidth) {
      outgoing = image.cloneNode();
      outgoing.removeAttribute('id');
      outgoing.alt = '';
      outgoing.setAttribute('aria-hidden','true');
      outgoing.className = 'viewer-outgoing';
      outgoing.style.opacity = '1';
      stage.append(outgoing);
    }
    renderedStem = stem;
    image.src = `assets/images/${stem}.webp`;
    const focalPoints = {'environment-01':'50% 43%','2d-01':'50% 42%','2d-03':'50% 34%','materials-01':'50% 45%','character-02':'50% 38%'};
    image.style.objectPosition = focalPoints[stem] || '50% 50%';
    image.alt = caption;
    document.getElementById('image-caption').textContent = caption;
    document.getElementById('image-counter').textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(currentProject.images.length).padStart(2, '0')}`;
    document.getElementById('original-image').href = `images/${stem}.jpg`;
    [...thumbs.children].forEach((button, index) => button.setAttribute('aria-pressed', String(index === currentIndex)));
    const selectedThumb = thumbs.children[currentIndex];
    if (selectedThumb) {
      // Keep the selected thumbnail in view without scrolling the page or dialog.
      const vertical = window.matchMedia('(min-width:761px)').matches;
      thumbs.scrollTo({
        left:vertical ? 0 : Math.max(0,selectedThumb.offsetLeft-thumbs.offsetLeft-thumbs.clientWidth/2+selectedThumb.clientWidth/2),
        top:vertical ? Math.max(0,selectedThumb.offsetTop-thumbs.offsetTop-thumbs.clientHeight/2+selectedThumb.clientHeight/2) : 0,
        behavior:reducedMotion.matches ? 'instant' : 'smooth'
      });
    }
    if (changing) {
      image.style.opacity = '0';
      image.decode().catch(() => {}).then(() => {
        if (revision !== imageRevision || !dialog.open || closing) { outgoing?.remove(); return; }
        image.style.opacity = '';
        transitionScene(image, outgoing);
        play(document.querySelector('.viewer-caption'), [{opacity:.25,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}], {duration:420});
      });
    } else {
      image.style.opacity = '';
    }
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
    thumbs.replaceChildren();
    project.images.forEach((stem, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', text(project.captions[index]));
      const thumbnail = document.createElement('img');
      thumbnail.src = `assets/images/${stem}-thumb.webp`;
      thumbnail.alt = '';
      thumbnail.width = 72;
      thumbnail.height = 48;
      button.append(thumbnail);
      if (project.models?.[stem]) { const badge=document.createElement('span'); badge.className='model-badge'; badge.textContent='3D'; button.append(badge); }
      button.addEventListener('click', () => { if (closing) return; const direction = index >= currentIndex ? 1 : -1; currentIndex = index; renderImage(true, direction); });
      thumbs.append(button);
    });
    updateProjectText();
    renderImage(false);
    dialog.showModal();
    renderImage(false);
    document.body.classList.add('dialog-open');
    document.getElementById('dialog-close').focus({ preventScroll: true });
    play(dialog, [{opacity:0,transform:'scale(.985)'},{opacity:1,transform:'scale(1)'}], {duration:420});
    play(image, [{opacity:0,transform:'scale(1.018)'},{opacity:1,transform:'scale(1)'}], {duration:480,delay:50});
    play(document.querySelector('.dialog-heading'), [{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}], {duration:600,delay:100});
    return true;
  }

  async function closeProject() {
    if (!dialog.open || closing) return;
    closing = true;
    modelRevision++;
    imageRevision++;
    dialog.classList.add('is-closing');
    await play(dialog, [{opacity:1,transform:'translateY(0) scale(1)'},{opacity:0,transform:'translateY(20px) scale(.975)'}], {duration:250,easing:'cubic-bezier(.4,0,1,1)'});
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
  dialog.addEventListener('cancel', event => { event.preventDefault(); closeProject(); });
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
    document.body.classList.remove('dialog-open');
    imageRevision++;
    effects.get(image)?.cancel();
    image.style.opacity = '';
    image.parentElement.querySelectorAll('.viewer-outgoing').forEach(node => node.remove());
    leaveModel();
    currentProject = null;
    delete root.dataset.project;
    applyTheme(homeTheme());
    renderedStem = '';
    closing = false;
    dialog.classList.remove('is-closing');
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  });
  dialog.addEventListener('keydown', event => {
    if (event.composedPath().includes(modelViewer)) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      moveImage(event.key === 'ArrowRight' ? 1 : -1);
    }
  });

  languageButtons.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  async function filterProjects() {
    if (filterRunning) return;
    filterRunning = true;
    try {
      while (activeFilter !== requestedFilter) {
        const next = requestedFilter;
        const visible = projects.filter(project => !project.hidden);
        visible.forEach(project => effects.get(project)?.cancel());
        const before = new Map(visible.map(project => [project, project.getBoundingClientRect()]));
        const leaving = visible.filter(project => next !== 'all' && project.dataset.category !== next);
        filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === next)));
        positionFilter();
        await Promise.all(leaving.map(project => play(project, [{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(.955) translateY(-15px)'}], {duration:200,easing:'cubic-bezier(.4,0,1,1)'})));
        activeFilter = next;
        document.querySelector('.project-grid').dataset.filter = next;
        projects.forEach(project => { project.hidden = next !== 'all' && project.dataset.category !== next; });
        updateCount();
        const arriving = projects.filter(project => !project.hidden);
        await Promise.all(arriving.map((project,index) => {
          const old = before.get(project);
          const end = project.getBoundingClientRect();
          if (old) {
            return play(project, [{opacity:1,transform:`translate(${old.left-end.left}px,${old.top-end.top}px) scale(${old.width/end.width},${old.height/end.height})`,transformOrigin:'0 0'},{opacity:1,transform:'translate(0,0) scale(1)',transformOrigin:'0 0'}], {duration:650});
          }
          return play(project, [{opacity:0,transform:'translateY(35px) scale(.98)'},{opacity:1,transform:'translateY(0) scale(1)'}], {duration:600,delay:index*45});
        }));
      }
    } finally { filterRunning = false; }
  }
  filterButtons.forEach(button => button.addEventListener('click', () => { requestedFilter = button.dataset.filter; filterProjects(); }));
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
    if (!reducedMotion.matches) {
      const bounds = hero.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < innerHeight) heroFrame.style.transform = `translateY(${Math.max(-30,Math.min(65,-bounds.top*.12))}px)`;
      const aboutBounds = portrait.getBoundingClientRect();
      if (aboutBounds.bottom > 0 && aboutBounds.top < innerHeight) portraitImage.style.transform = `translateY(${Math.max(-22,Math.min(22,(innerHeight/2-aboutBounds.top-aboutBounds.height/2)*.06))}px) scale(1.065)`;
    }
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

  // Artwork is visible by default; no hidden content depends on a library load.
  if (animation && !reducedMotion.matches) {
    animation.animate('.hero-curtain', {scaleX:[1,0]}, {duration:1.2,ease:[.76,0,.24,1]});
    animation.animate('.hero .name-word', {y:['115%','0%'],rotate:[3,0]}, {duration:1.1,ease:[.22,1,.36,1],delay:animation.stagger(.14,{startDelay:.28})});
    animation.animate('.hero-content > p, .hero-feature', {opacity:[0,1],y:[18,0]}, {duration:.8,delay:.75,ease:[.16,1,.3,1]});
    animation.animate('.hero-top', {opacity:[0,1]}, {duration:.8,delay:.3});
    heroEntrance = animation.animate('.hero-image', {scale:[1.13,1]}, {duration:2.2,ease:[.16,1,.3,1]});
    animation.animate('.coffee-logo', {opacity:[0,1],y:[-8,0]}, {duration:.8,ease:[.16,1,.3,1]});
    animation.animate('.coffee-steam', {pathLength:[0,1]}, {duration:1.2,delay:.25,ease:[.16,1,.3,1]});
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      revealObserver.unobserve(entry.target);
      if (entry.target.classList.contains('project-art')) {
        play(entry.target, [{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0% 0)'}], {duration:1000});
        play(entry.target.querySelector('img'), [{transform:'scale(1.1)'},{transform:'scale(1)'}], {duration:1300});
      } else if (entry.target.tagName === 'H2') {
        play(entry.target, [{clipPath:'inset(0 0 100% 0)',transform:'translateY(24px)'},{clipPath:'inset(-10% 0 -10% 0)',transform:'translateY(0)'}], {duration:900});
      } else {
        play(entry.target, [{opacity:.25,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}], {duration:850});
      }
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
