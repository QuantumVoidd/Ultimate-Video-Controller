// --- 0. CLEANUP ---
document.querySelectorAll('#vcc-menu, #vcc-svg-engine, .vcc-overlay-box').forEach(el => el.remove());

// --- 1. INJECT SVG ENGINE ---
const svgEngine = `
<svg id="vcc-svg-engine" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="vcc-sharpness-filter">
      <feConvolveMatrix id="vcc-convolve" order="3" kernelMatrix="0 -1 0 -1 5 -1 0 -1 0" preserveAlpha="true"/>
    </filter>
    <filter id="vcc-grade-filter">
      <feComponentTransfer>
        <feFuncR id="vcc-gamma-r" type="gamma" amplitude="1" exponent="1"/>
        <feFuncG id="vcc-gamma-g" type="gamma" amplitude="1" exponent="1"/>
        <feFuncB id="vcc-gamma-b" type="gamma" amplitude="1" exponent="1"/>
      </feComponentTransfer>
      <feColorMatrix id="vcc-colormatrix" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0"/>
    </filter>
  </defs>
</svg>
`;
document.body.insertAdjacentHTML('beforeend', svgEngine);

// --- 2. INJECT DASHBOARD ---
const dashboardHTML = `
<div id="vcc-menu">
  
  <div class="vcc-section">
    <div class="vcc-header">Color Master</div>
    <div class="vcc-grid">
      <div class="vcc-control full-width">
         <div class="vcc-info"><span class="vcc-label">Quick Looks</span></div>
         <div class="vcc-toggle-row fourths">
           <button class="vcc-toggle" id="btn-pre-cinema">Cinema</button>
           <button class="vcc-toggle" id="btn-pre-night">Night</button>
           <button class="vcc-toggle" id="btn-pre-retro">Retro</button>
           <button class="vcc-toggle" id="btn-pre-matrix">Matrix</button>
         </div>
      </div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Brightness</span><span class="vcc-val" id="val-brightness">100%</span></div><input type="range" class="vcc-slider" id="inp-brightness" min="0" max="200" value="100"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Contrast</span><span class="vcc-val" id="val-contrast">100%</span></div><input type="range" class="vcc-slider" id="inp-contrast" min="0" max="200" value="100"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Saturation</span><span class="vcc-val" id="val-saturate">100%</span></div><input type="range" class="vcc-slider" id="inp-saturate" min="0" max="200" value="100"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Gamma</span><span class="vcc-val" id="val-gamma">1.0</span></div><input type="range" class="vcc-slider" id="inp-gamma" min="0.5" max="2.0" step="0.05" value="1.0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Temp</span><span class="vcc-val" id="val-temp">0</span></div><input type="range" class="vcc-slider" id="inp-temp" min="-50" max="50" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Tint</span><span class="vcc-val" id="val-tint">0</span></div><input type="range" class="vcc-slider" id="inp-tint" min="-50" max="50" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Grayscale</span><span class="vcc-val" id="val-grayscale">0%</span></div><input type="range" class="vcc-slider" id="inp-grayscale" min="0" max="100" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Invert</span><span class="vcc-val" id="val-invert">0%</span></div><input type="range" class="vcc-slider" id="inp-invert" min="0" max="100" value="0"></div>
    </div>
  </div>

  <div class="vcc-section">
    <div class="vcc-header">Audio Studio</div>
    <div class="vcc-grid">
      <div class="vcc-control full-width"><div class="vcc-info"><span class="vcc-label">Volume Boost</span><span class="vcc-val" id="val-volume">100%</span></div><input type="range" class="vcc-slider" id="inp-volume" min="100" max="600" step="10" value="100"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Bass</span><span class="vcc-val" id="val-bass">0dB</span></div><input type="range" class="vcc-slider" id="inp-bass" min="-10" max="15" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Treble</span><span class="vcc-val" id="val-treble">0dB</span></div><input type="range" class="vcc-slider" id="inp-treble" min="-10" max="15" value="0"></div>
      <div class="vcc-control full-width"><div class="vcc-info"><span class="vcc-label">Sync Delay</span><span class="vcc-val" id="val-delay">0s</span></div><input type="range" class="vcc-slider" id="inp-delay" min="0" max="5.0" step="0.1" value="0"></div>
      <div class="vcc-control full-width">
        <div class="vcc-info"><span class="vcc-label">Process</span></div>
        <div class="vcc-toggle-row">
            <button class="vcc-toggle" id="btn-mono">Mono Audio</button>
            <button class="vcc-toggle" id="btn-norm">Normalizer</button>
        </div>
      </div>
    </div>
  </div>

  <div class="vcc-section">
    <div class="vcc-header">Navigation</div>
    <div class="vcc-grid">
       <div class="vcc-control full-width">
         <div class="vcc-timecode-display" id="vcc-timecode">00:00:00.000</div>
         <div class="vcc-toggle-row thirds">
           <button class="vcc-toggle" id="btn-seek-start">Start</button>
           <button class="vcc-toggle" id="btn-seek-mid">50%</button>
           <button class="vcc-toggle" id="btn-seek-end">End</button>
         </div>
         <div class="vcc-info" style="margin-top:5px;"><span class="vcc-label">Jump</span></div>
         <div class="vcc-toggle-row fourths">
           <button class="vcc-toggle" id="btn-seek-n30">-30s</button>
           <button class="vcc-toggle" id="btn-seek-n10">-10s</button>
           <button class="vcc-toggle" id="btn-seek-p10">+10s</button>
           <button class="vcc-toggle" id="btn-seek-p30">+30s</button>
         </div>
         <input type="text" class="vcc-goto-input" id="inp-goto" placeholder="Go To (e.g. 1:30) & Enter">
       </div>
       <div class="vcc-control full-width">
         <div class="vcc-info"><span class="vcc-label">Bookmarks</span><button class="vcc-toggle" style="width: auto; padding: 2px 8px;" id="btn-bm-add">+ Add Bookmark</button></div>
         <div class="vcc-bookmark-list" id="vcc-bm-list"></div>
       </div>
    </div>
  </div>

  <div class="vcc-section">
    <div class="vcc-header">Geometry & Pan</div>
    <div class="vcc-grid">
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Zoom</span><span class="vcc-val" id="val-zoom">1.0x</span></div><input type="range" class="vcc-slider" id="inp-zoom" min="1.0" max="5.0" step="0.1" value="1.0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Rotate Z</span><span class="vcc-val" id="val-rotate">0°</span></div><input type="range" class="vcc-slider" id="inp-rotate" min="0" max="360" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Tilt X</span><span class="vcc-val" id="val-rotateX">0°</span></div><input type="range" class="vcc-slider" id="inp-rotateX" min="-60" max="60" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Tilt Y</span><span class="vcc-val" id="val-rotateY">0°</span></div><input type="range" class="vcc-slider" id="inp-rotateY" min="-60" max="60" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Skew X</span><span class="vcc-val" id="val-skewX">0°</span></div><input type="range" class="vcc-slider" id="inp-skewX" min="-45" max="45" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Skew Y</span><span class="vcc-val" id="val-skewY">0°</span></div><input type="range" class="vcc-slider" id="inp-skewY" min="-45" max="45" value="0"></div>
      <div class="vcc-control">
         <div class="vcc-info"><span class="vcc-label">Move</span></div>
         <div class="vcc-dpad">
            <div class="vcc-dpad-empty"></div><button class="vcc-dpad-btn" id="btn-pan-up">▲</button><div class="vcc-dpad-empty"></div>
            <button class="vcc-dpad-btn" id="btn-pan-left">◀</button><button class="vcc-dpad-btn center" id="btn-pan-reset">●</button><button class="vcc-dpad-btn" id="btn-pan-right">▶</button>
            <div class="vcc-dpad-empty"></div><button class="vcc-dpad-btn" id="btn-pan-down">▼</button><div class="vcc-dpad-empty"></div>
         </div>
      </div>
      <div class="vcc-control">
         <div class="vcc-info"><span class="vcc-label">Transform</span></div>
         <div class="vcc-toggle-col">
           <div class="vcc-toggle-row">
              <button class="vcc-toggle" id="btn-flip-x">Flip X</button>
              <button class="vcc-toggle" id="btn-flip-y">Flip Y</button>
           </div>
           <button class="vcc-toggle danger" id="btn-geo-reset">Reset Geo</button>
        </div>
      </div>
    </div>
  </div>

  <div class="vcc-section">
    <div class="vcc-header">Effects</div>
    <div class="vcc-grid">
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Vignette</span><span class="vcc-val" id="val-vignette">0%</span></div><input type="range" class="vcc-slider" id="inp-vignette" min="0" max="100" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Opacity</span><span class="vcc-val" id="val-opacity">100%</span></div><input type="range" class="vcc-slider" id="inp-opacity" min="10" max="100" value="100"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Sharpness</span><span class="vcc-val" id="val-sharpness">0</span></div><input type="range" class="vcc-slider" id="inp-sharpness" min="0" max="5" step="0.5" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Blur</span><span class="vcc-val" id="val-blur">0px</span></div><input type="range" class="vcc-slider" id="inp-blur" min="0" max="10" step="0.5" value="0"></div>
    </div>
  </div>

  <div class="vcc-section">
    <div class="vcc-header">Stream Tools</div>
    <div class="vcc-grid">
       <div class="vcc-control full-width">
         <div class="vcc-info"><span class="vcc-label">Actions</span></div>
         <div class="vcc-toggle-row fifths">
           <button class="vcc-toggle" id="btn-screenshot">Snap</button>
           <button class="vcc-toggle" id="btn-pip">PiP</button>
           <button class="vcc-toggle" id="btn-focus">Cinema</button>
           <button class="vcc-toggle" id="btn-aspect">Fit</button>
           <button class="vcc-toggle" id="btn-thumbnail">Thumb</button>
         </div>
       </div>
       <div class="vcc-control full-width">
         <div class="vcc-info"><span class="vcc-label">Overlays</span></div>
         <div class="vcc-toggle-row">
           <button class="vcc-toggle" id="btn-crosshair">Crosshair</button>
           <button class="vcc-toggle" id="btn-grid">Grid</button>
           <button class="vcc-toggle" id="btn-ultrawide">21:9 Crop</button>
         </div>
       </div>
    </div>
  </div>

  <div class="vcc-section">
    <div class="vcc-header">Playback & Loop</div>
    <div class="vcc-grid">
      <div class="vcc-control full-width">
        <div class="vcc-info"><span class="vcc-label">Speed</span><span class="vcc-val" id="val-speed">1.0x</span></div>
        <input type="range" class="vcc-slider" id="inp-speed" min="0.1" max="16.0" step="0.1" value="1.0">
      </div>
      <div class="vcc-control full-width">
         <div class="vcc-info"><span class="vcc-label">A-B Repeat</span><span class="vcc-val" id="val-ab-status">Off</span></div>
         <div class="vcc-toggle-row thirds">
           <button class="vcc-toggle" id="btn-loop-a">Set Start</button>
           <button class="vcc-toggle" id="btn-loop-b">Set End</button>
           <button class="vcc-toggle danger" id="btn-loop-clear">Clear</button>
         </div>
      </div>
    </div>
  </div>

  <div class="vcc-actions">
    <button class="vcc-btn reset" id="btn-reset">Reset All</button>
    <button class="vcc-btn" id="btn-close">Close</button>
  </div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', dashboardHTML);

// --- 3. STATE ---
const defaults = {
  brightness: 100, contrast: 100, saturate: 100, gamma: 1.0, temp: 0, tint: 0,
  vignette: 0, sharpness: 0, speed: 1.0, 
  rotate: 0, rotateX: 0, rotateY: 0, zoom: 1.0, 
  skewX: 0, skewY: 0, flipX: false, flipY: false, panX: 0, panY: 0,
  fitMode: 0, crosshair: false, focus: false, grid: false, ultrawide: false,
  volume: 100, bass: 0, treble: 0, delay: 0, mono: false, norm: false,
  grayscale: 0, invert: 0, opacity: 100, sepia: 0, blur: 0,
  loopA: null, loopB: null,
  bookmarks: [] 
};
let state = { ...defaults };

try {
  const saved = localStorage.getItem('vcc_pro_settings');
  if (saved) state = { ...state, ...JSON.parse(saved) };
  if (!state.bookmarks) state.bookmarks = [];
} catch(e) {}

// --- 4. INPUTS ---
const inputs = {};
['brightness', 'contrast', 'saturate', 'gamma', 'temp', 'tint', 'vignette', 'sharpness', 'speed', 'rotate', 'rotateX', 'rotateY', 'zoom', 'volume', 'bass', 'treble', 'delay', 'skewX', 'skewY', 'grayscale', 'invert', 'opacity', 'sepia', 'blur'].forEach(key => {
  const el = document.getElementById(`inp-${key}`);
  if(el) {
    inputs[key] = el;
    el.addEventListener('input', (e) => {
      state[key] = parseFloat(e.target.value);
      updateUI(); applyEffects(); saveSettings();
    });
  }
});

const btnFlipX = document.getElementById('btn-flip-x');
const btnFlipY = document.getElementById('btn-flip-y');
const btnMono = document.getElementById('btn-mono');
const btnNorm = document.getElementById('btn-norm'); 

btnFlipX.addEventListener('click', () => { state.flipX = !state.flipX; updateUI(); applyEffects(); saveSettings(); });
btnFlipY.addEventListener('click', () => { state.flipY = !state.flipY; updateUI(); applyEffects(); saveSettings(); });
btnMono.addEventListener('click', () => { state.mono = !state.mono; updateUI(); applyEffects(); saveSettings(); });
btnNorm.addEventListener('click', () => { state.norm = !state.norm; updateUI(); applyEffects(); saveSettings(); });

// PRESETS
const presets = {
  cinema: { brightness: 110, contrast: 120, saturate: 115, gamma: 1.1, vignette: 20, temp: -5 },
  night: { brightness: 90, contrast: 100, saturate: 100, gamma: 1.0, temp: 25, tint: 0 },
  retro: { brightness: 100, contrast: 90, saturate: 70, sepia: 30, vignette: 30, temp: 10 },
  matrix: { brightness: 100, contrast: 120, saturate: 80, tint: -30 }
};
const applyPreset = (p) => { Object.assign(state, presets[p]); updateUI(); applyEffects(); saveSettings(); };
document.getElementById('btn-pre-cinema').addEventListener('click', () => applyPreset('cinema'));
document.getElementById('btn-pre-night').addEventListener('click', () => applyPreset('night'));
document.getElementById('btn-pre-retro').addEventListener('click', () => applyPreset('retro'));
document.getElementById('btn-pre-matrix').addEventListener('click', () => applyPreset('matrix'));

// SEEK
const seek = (sec) => { document.querySelectorAll('video').forEach(v => v.currentTime += sec); };
const seekTo = (percent) => { document.querySelectorAll('video').forEach(v => { if(v.duration) v.currentTime = v.duration * (percent/100); }); };
document.getElementById('btn-seek-n30').addEventListener('click', () => seek(-30));
document.getElementById('btn-seek-n10').addEventListener('click', () => seek(-10));
document.getElementById('btn-seek-p10').addEventListener('click', () => seek(10));
document.getElementById('btn-seek-p30').addEventListener('click', () => seek(30));
document.getElementById('btn-seek-start').addEventListener('click', () => seekTo(0));
document.getElementById('btn-seek-mid').addEventListener('click', () => seekTo(50));
document.getElementById('btn-seek-end').addEventListener('click', () => seekTo(99));

// GOTO
document.getElementById('inp-goto').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const val = e.target.value.trim();
    const parts = val.split(':').map(Number).reverse();
    if(parts.length > 0) {
      let sec = parts[0] || 0;
      if(parts[1]) sec += parts[1] * 60;
      if(parts[2]) sec += parts[2] * 3600;
      document.querySelectorAll('video').forEach(v => v.currentTime = sec);
    }
  }
});

// BOOKMARKS
const renderBookmarks = () => {
  const list = document.getElementById('vcc-bm-list');
  list.innerHTML = '';
  if(state.bookmarks.length === 0) { list.innerHTML = '<div style="padding:8px; font-size:10px; color:#666; text-align:center;">No bookmarks saved.</div>'; return; }
  state.bookmarks.forEach((bm, idx) => {
    const item = document.createElement('div');
    item.className = 'vcc-bookmark-item';
    const h = Math.floor(bm.time / 3600);
    const m = Math.floor((bm.time % 3600) / 60);
    const s = Math.floor(bm.time % 60).toString().padStart(2, '0');
    const timeStr = h > 0 ? `${h}:${m.toString().padStart(2,'0')}:${s}` : `${m}:${s}`;
    item.innerHTML = `<span class="vcc-bm-time">📌 ${timeStr}</span> <span class="vcc-bm-del">×</span>`;
    item.onclick = () => document.querySelectorAll('video').forEach(v => v.currentTime = bm.time);
    item.querySelector('.vcc-bm-del').onclick = (e) => { e.stopPropagation(); state.bookmarks.splice(idx, 1); renderBookmarks(); saveSettings(); };
    list.appendChild(item);
  });
};
document.getElementById('btn-bm-add').addEventListener('click', () => {
  const v = document.querySelector('video'); if(v) { state.bookmarks.push({ time: v.currentTime }); renderBookmarks(); saveSettings(); }
});

// Geo/Pan/Tools
document.getElementById('btn-geo-reset').addEventListener('click', () => { state.zoom = 1; state.rotate = 0; state.rotateX = 0; state.rotateY = 0; state.skewX = 0; state.skewY = 0; state.panX = 0; state.panY = 0; state.flipX = false; state.flipY = false; updateUI(); applyEffects(); saveSettings(); });
const PAN_STEP = 50;
document.getElementById('btn-pan-up').addEventListener('click', () => { state.panY += PAN_STEP; applyEffects(); saveSettings(); });
document.getElementById('btn-pan-down').addEventListener('click', () => { state.panY -= PAN_STEP; applyEffects(); saveSettings(); });
document.getElementById('btn-pan-left').addEventListener('click', () => { state.panX += PAN_STEP; applyEffects(); saveSettings(); });
document.getElementById('btn-pan-right').addEventListener('click', () => { state.panX -= PAN_STEP; applyEffects(); saveSettings(); });
document.getElementById('btn-pan-reset').addEventListener('click', () => { state.panX = 0; state.panY = 0; applyEffects(); saveSettings(); });

document.getElementById('btn-close').addEventListener('click', () => document.getElementById('vcc-menu').classList.remove('visible'));
document.getElementById('btn-reset').addEventListener('click', () => { state = { ...defaults }; updateUI(); applyEffects(); saveSettings(); });

document.getElementById('btn-screenshot').addEventListener('click', () => {
  const video = document.querySelector('video'); if(!video) return;
  const canvas = document.createElement('canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d'); ctx.filter = video.style.filter; 
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const link = document.createElement('a'); link.download = `snapshot_${Date.now()}.png`; link.href = canvas.toDataURL(); link.click();
});
document.getElementById('btn-pip').addEventListener('click', async () => { const video = document.querySelector('video'); if(video) { document.pictureInPictureElement ? document.exitPictureInPicture() : video.requestPictureInPicture(); } });
const fitModes = ['contain', 'cover', 'fill']; const fitNames = ['Default', 'Zoom to Fill', 'Stretch'];
document.getElementById('btn-aspect').addEventListener('click', () => { state.fitMode = (state.fitMode + 1) % 3; updateUI(); applyEffects(); saveSettings(); });
document.getElementById('btn-crosshair').addEventListener('click', () => { state.crosshair = !state.crosshair; updateUI(); applyEffects(); saveSettings(); });
document.getElementById('btn-focus').addEventListener('click', () => { state.focus = !state.focus; updateUI(); applyEffects(); saveSettings(); });
document.getElementById('btn-grid').addEventListener('click', () => { state.grid = !state.grid; updateUI(); applyEffects(); saveSettings(); });
document.getElementById('btn-ultrawide').addEventListener('click', () => { state.ultrawide = !state.ultrawide; updateUI(); applyEffects(); saveSettings(); });

// THUMBNAIL LOGIC (NEW)
document.getElementById('btn-thumbnail').addEventListener('click', () => {
  const video = document.querySelector('video');
  let thumbUrl = '';
  // Try YouTube Max Res
  if (window.location.hostname.includes('youtube.com')) {
    const v = new URLSearchParams(window.location.search).get('v');
    if (v) thumbUrl = `https://img.youtube.com/vi/${v}/maxresdefault.jpg`;
  }
  // Fallback to video poster
  if (!thumbUrl && video && video.poster) thumbUrl = video.poster;
  
  if (thumbUrl) window.open(thumbUrl, '_blank');
  else alert("Could not find a high-res thumbnail.");
});

document.getElementById('btn-loop-a').addEventListener('click', () => { const v = document.querySelector('video'); if(v) state.loopA = v.currentTime; updateUI(); saveSettings(); });
document.getElementById('btn-loop-b').addEventListener('click', () => { const v = document.querySelector('video'); if(v) state.loopB = v.currentTime; updateUI(); saveSettings(); });
document.getElementById('btn-loop-clear').addEventListener('click', () => { state.loopA = null; state.loopB = null; updateUI(); saveSettings(); });

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.code === 'KeyQ') document.getElementById('vcc-menu').classList.toggle('visible');
  if (e.altKey && e.code === 'KeyR') { state = { ...defaults }; updateUI(); applyEffects(); saveSettings(); }
});

function updateUI() {
  Object.keys(inputs).forEach(key => {
    inputs[key].value = state[key];
    const label = document.getElementById(`val-${key}`);
    if(label) {
      let suffix = '%';
      if(key === 'speed' || key === 'zoom') suffix = 'x';
      else if(key.includes('rotate') || key.includes('skew') || key === 'temp' || key === 'tint') suffix = '°';
      else if(key === 'gamma' || key === 'sharpness') suffix = '';
      else if(key === 'delay') suffix = 's';
      else if(key === 'bass' || key === 'treble') suffix = 'dB';
      else if(key === 'blur') suffix = 'px';
      label.textContent = state[key] + suffix;
    }
  });
  btnFlipX.classList.toggle('active', state.flipX);
  btnFlipY.classList.toggle('active', state.flipY);
  btnMono.classList.toggle('active', state.mono);
  btnNorm.classList.toggle('active', state.norm);
  document.getElementById('btn-aspect').textContent = `Fit: ${fitNames[state.fitMode]}`;
  document.getElementById('btn-crosshair').classList.toggle('active', state.crosshair);
  document.getElementById('btn-focus').classList.toggle('active', state.focus);
  document.getElementById('btn-grid').classList.toggle('active', state.grid);
  document.getElementById('btn-ultrawide').classList.toggle('active', state.ultrawide);
  
  const loopStatus = document.getElementById('val-ab-status');
  document.getElementById('btn-loop-a').classList.toggle('active', state.loopA !== null);
  document.getElementById('btn-loop-b').classList.toggle('active', state.loopB !== null);
  loopStatus.textContent = (state.loopA !== null && state.loopB !== null) ? "ACTIVE" : (state.loopA !== null ? "Start Set" : "Off");
  renderBookmarks();
}

function saveSettings() { localStorage.setItem('vcc_pro_settings', JSON.stringify(state)); }

let audioCtx, sourceNode, gainNode, bassNode, trebleNode, delayNode, compressorNode;
function initAudio(video) {
  if(audioCtx || !video) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    sourceNode = audioCtx.createMediaElementSource(video);
    gainNode = audioCtx.createGain();
    bassNode = audioCtx.createBiquadFilter(); bassNode.type = 'lowshelf'; bassNode.frequency.value = 200;
    trebleNode = audioCtx.createBiquadFilter(); trebleNode.type = 'highshelf'; trebleNode.frequency.value = 2000;
    delayNode = audioCtx.createDelay(5.0);
    compressorNode = audioCtx.createDynamicsCompressor(); 
    sourceNode.connect(delayNode); delayNode.connect(bassNode); bassNode.connect(trebleNode);
    trebleNode.connect(compressorNode); compressorNode.connect(gainNode); gainNode.connect(audioCtx.destination);
  } catch(e) { console.log("Audio API blocked (CORS)."); }
}

function applyEffects() {
  const gammaVal = 1 / state.gamma; 
  document.getElementById('vcc-gamma-r').setAttribute('exponent', gammaVal);
  document.getElementById('vcc-gamma-g').setAttribute('exponent', gammaVal);
  document.getElementById('vcc-gamma-b').setAttribute('exponent', gammaVal);

  const r = 1 + (state.temp / 100); const b = 1 - (state.temp / 100); const g = 1 + (state.tint / 100);
  const matrix = `${r} 0 0 0 0  0 ${g} 0 0 0  0 0 ${b} 0 0  0 0 0 1 0`;
  document.getElementById('vcc-colormatrix').setAttribute('values', matrix);

  const s = state.sharpness;
  if(s > 0) {
    const edge = -s; const center = 1 + (4 * s);
    document.getElementById('vcc-convolve').setAttribute('kernelMatrix', `0 ${edge} 0 ${edge} ${center} ${edge} 0 ${edge} 0`);
  }

  const videos = document.querySelectorAll('video');
  let filterString = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturate}%) grayscale(${state.grayscale}%) invert(${state.invert}%) opacity(${state.opacity}%) sepia(${state.sepia}%) blur(${state.blur}px) url(#vcc-grade-filter)`;
  if (state.sharpness > 0) filterString += ` url(#vcc-sharpness-filter)`;

  const scaleX = state.flipX ? -state.zoom : state.zoom;
  const scaleY = state.flipY ? -state.zoom : state.zoom;
  const transformString = `perspective(800px) translate(${state.panX}px, ${state.panY}px) rotate(${state.rotate}deg) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) skewX(${state.skewX}deg) skewY(${state.skewY}deg) scale(${scaleX}, ${scaleY})`;

  document.querySelectorAll('.vcc-overlay-box').forEach(box => {
      box.classList.toggle('vcc-focus-active', state.focus);
      let vig = box.querySelector('.vcc-vignette-layer');
      if(!vig) { vig = document.createElement('div'); vig.className = 'vcc-vignette-layer'; box.appendChild(vig); }
      vig.style.background = state.vignette > 0 ? `radial-gradient(circle, transparent ${100 - state.vignette}%, black 140%)` : 'none';
      let cross = box.querySelector('.vcc-crosshair');
      if(!cross) { cross = document.createElement('div'); cross.className = 'vcc-crosshair'; box.appendChild(cross); }
      cross.style.display = state.crosshair ? 'block' : 'none';
      let grid = box.querySelector('.vcc-grid-layer');
      if(!grid) { grid = document.createElement('div'); grid.className = 'vcc-grid-layer'; box.appendChild(grid); }
      grid.style.display = state.grid ? 'block' : 'none';
  });

  videos.forEach(v => {
    if (Math.abs(v.playbackRate - state.speed) > 0.1) v.playbackRate = state.speed;
    v.style.filter = filterString; v.style.transform = transformString; v.style.objectFit = fitModes[state.fitMode];
    if(state.ultrawide) v.style.clipPath = "inset(12% 0 12% 0)"; else v.style.clipPath = "none";

    if(state.volume > 100 || state.bass !== 0 || state.treble !== 0 || state.delay !== 0 || state.norm || state.mono) {
        if(!audioCtx) initAudio(v);
        if(audioCtx) {
           if(gainNode) gainNode.gain.value = state.volume / 100;
           if(bassNode) bassNode.gain.value = state.bass;
           if(trebleNode) trebleNode.gain.value = state.treble;
           if(delayNode) delayNode.delayTime.value = state.delay;
           if(compressorNode) {
               if(state.norm) { compressorNode.threshold.value = -50; compressorNode.knee.value = 40; compressorNode.ratio.value = 12; compressorNode.attack.value = 0; compressorNode.release.value = 0.25; } 
               else { compressorNode.threshold.value = 0; }
           }
           if(gainNode) { gainNode.channelCount = state.mono ? 1 : 2; gainNode.channelCountMode = state.mono ? 'explicit' : 'max'; }
        }
    }
    if(state.loopA !== null && state.loopB !== null) { if(v.currentTime >= state.loopB) v.currentTime = state.loopA; }
  });
}

// --- ICON LOADER ---
const iconURL = chrome.runtime.getURL('icon128.png'); // Back to PNG

const overlays = new Map();
function trackLoop() {
  const videos = document.querySelectorAll('video');
  overlays.forEach((el, video) => { if (!document.body.contains(video)) { el.remove(); overlays.delete(video); } });
  videos.forEach(video => {
    if (video.offsetWidth < 100 || video.offsetHeight < 100) return;
    if (!overlays.has(video)) {
      const existing = document.elementFromPoint(video.getBoundingClientRect().left + 10, video.getBoundingClientRect().top + 10);
      if(existing && existing.classList.contains('vcc-icon')) return;
      const box = document.createElement('div'); box.className = 'vcc-overlay-box';
      
      const icon = document.createElement('div'); 
      icon.className = 'vcc-icon'; 
      icon.style.backgroundImage = `url('${iconURL}')`;
      // --- FORCE SIZE OVERRIDE (Safety) ---
      icon.style.width = '20px'; icon.style.height = '20px'; icon.style.backgroundSize = 'contain';
      
      icon.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); document.getElementById('vcc-menu').classList.toggle('visible'); });
      box.appendChild(icon); document.body.appendChild(box); overlays.set(video, box);
      video.addEventListener('timeupdate', () => { 
          if(state.loopA !== null && state.loopB !== null) { if(video.currentTime >= state.loopB) video.currentTime = state.loopA; }
          const t = video.currentTime;
          const h = Math.floor(t / 3600); const m = Math.floor((t % 3600) / 60); const s = Math.floor(t % 60); const ms = Math.floor((t % 1) * 1000);
          const timeStr = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}.${ms.toString().padStart(3,'0')}`;
          const el = document.getElementById('vcc-timecode'); if(el) el.textContent = timeStr;
      });
    }
    const box = overlays.get(video);
    const fsElement = document.fullscreenElement;
    const menu = document.getElementById('vcc-menu');
    if (fsElement) { if (box.parentElement !== fsElement) fsElement.appendChild(box); if (menu && menu.parentElement !== fsElement) fsElement.appendChild(menu); } 
    else { if (box.parentElement !== document.body) document.body.appendChild(box); if (menu && menu.parentElement !== document.body) document.body.appendChild(menu); }
    const rect = video.getBoundingClientRect();
    box.style.top = rect.top + 'px'; box.style.left = rect.left + 'px';
    box.style.width = rect.width + 'px'; box.style.height = rect.height + 'px';
    const visibleLeft = Math.max(rect.left, 0); const visibleTop = Math.max(rect.top, 0);
    const icon = box.querySelector('.vcc-icon');
    icon.style.left = ((visibleLeft - rect.left) + 5) + 'px'; icon.style.top = ((visibleTop - rect.top) + 5) + 'px';
    applyEffects();
  });
  requestAnimationFrame(trackLoop);
}
updateUI(); trackLoop();