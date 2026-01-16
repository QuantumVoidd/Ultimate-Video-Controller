// --- 0. CLEANUP ---
document.querySelectorAll('#vcc-menu, #vcc-svg-engine, .vcc-overlay-box, #vcc-styles').forEach(el => el.remove());

// --- 1. INJECT STYLES ---
function injectStyles() {
  const css = `
    /* FIX: Force the 2-button row to be 95% width so it CANNOT overflow */
    .vcc-toggle-row.halves {
      display: flex !important;
      justify-content: space-between !important;
      gap: 5px !important;
      width: 95% !important;
      margin: 0 auto 5px auto !important;
      box-sizing: border-box !important;
    }
    
    .vcc-toggle-row.halves .vcc-toggle {
      flex: 1 !important;
    }
    
    /* 5-Button Row (Fifth) */
    .vcc-toggle-row.fifths {
      display: grid !important;
      grid-template-columns: repeat(5, 1fr) !important;
      gap: 4px !important;
      width: 95% !important;
      margin: 0 auto 5px auto !important;
      box-sizing: border-box !important;
    }
    .vcc-toggle-row.fifths .vcc-toggle {
      font-size: 10px !important;
      padding: 4px 0 !important;
      white-space: nowrap !important;
    }

    /* 6-Button Row for Quick Looks (Sixths) */
    .vcc-toggle-row.sixths {
      display: grid !important;
      grid-template-columns: repeat(6, 1fr) !important;
      gap: 4px !important;
      width: 95% !important;
      margin: 0 auto 5px auto !important;
      box-sizing: border-box !important;
    }
    .vcc-toggle-row.sixths .vcc-toggle {
      font-size: 10px !important;
      padding: 4px 0 !important;
      white-space: nowrap !important;
    }

    /* FIX: Constrain Timecode Display and Input Fields */
    .vcc-timecode-display,
    .vcc-goto-input {
      width: 96% !important;
      margin: 4px auto !important;
      box-sizing: border-box !important;
      display: block !important;
    }

    /* Golden Ratio Overlay */
    .vcc-golden-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 95;
      opacity: 0.8;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 618' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1000 0H0v618h1000V0z' fill='none' stroke='none'/%3E%3Cpath d='M0 0h618v618H0z' fill='none' stroke='rgba(255, 215, 0, 0.5)' stroke-width='2'/%3E%3Cpath d='M618 0h382v382H618z' fill='none' stroke='rgba(255, 215, 0, 0.5)' stroke-width='2'/%3E%3Cpath d='M618 382h236v236H618z' fill='none' stroke='rgba(255, 215, 0, 0.5)' stroke-width='2'/%3E%3Cpath d='M854 382h146v146H854z' fill='none' stroke='rgba(255, 215, 0, 0.5)' stroke-width='2'/%3E%3Cpath d='M0 618 A 618 618 0 0 1 618 0' fill='none' stroke='gold' stroke-width='2'/%3E%3Cpath d='M618 0 A 382 382 0 0 1 1000 382' fill='none' stroke='gold' stroke-width='2'/%3E%3Cpath d='M1000 382 A 236 236 0 0 1 764 618' fill='none' stroke='gold' stroke-width='2'/%3E%3C/svg%3E");
      background-size: 100% 100%;
      display: none;
    }

    /* Visualizer Overlay */
    .vcc-visualizer-layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 94;
      opacity: 0.9;
      display: none;
    }

    /* OSD Timecode */
    .vcc-osd-layer {
      position: absolute;
      top: 5%;
      right: 5%;
      font-family: monospace;
      font-size: 24px;
      color: #0f0;
      background: rgba(0,0,0,0.5);
      padding: 5px 10px;
      border-radius: 4px;
      pointer-events: none;
      z-index: 96;
      display: none;
    }
  `;
  const style = document.createElement('style');
  style.id = 'vcc-styles';
  style.textContent = css;
  document.head.appendChild(style);
}
injectStyles();

// --- 2. INJECT SVG ENGINE ---
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

// --- 3. INJECT DASHBOARD ---
const dashboardHTML = `
<div id="vcc-menu">
  
  <div class="vcc-section">
    <div class="vcc-header">Color Master</div>
    <div class="vcc-grid">
      <div class="vcc-control full-width">
         <div class="vcc-info"><span class="vcc-label">Quick Looks</span></div>
         <div class="vcc-toggle-row sixths">
           <button class="vcc-toggle" id="btn-pre-cinema">Cinema</button>
           <button class="vcc-toggle" id="btn-pre-night">Night</button>
           <button class="vcc-toggle" id="btn-pre-retro">Retro</button>
           <button class="vcc-toggle" id="btn-pre-matrix">Matrix</button>
           <button class="vcc-toggle" id="btn-ambient">Ambiance</button>
           <button class="vcc-toggle" id="btn-rainbow">Rainbow</button>
         </div>
      </div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Brightness</span><span class="vcc-val" id="val-brightness">100%</span></div><input type="range" class="vcc-slider" id="inp-brightness" min="0" max="200" value="100"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Contrast</span><span class="vcc-val" id="val-contrast">100%</span></div><input type="range" class="vcc-slider" id="inp-contrast" min="0" max="200" value="100"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Saturation</span><span class="vcc-val" id="val-saturate">100%</span></div><input type="range" class="vcc-slider" id="inp-saturate" min="0" max="200" value="100"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Gamma</span><span class="vcc-val" id="val-gamma">1.0</span></div><input type="range" class="vcc-slider" id="inp-gamma" min="0.5" max="2.0" step="0.05" value="1.0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Temp</span><span class="vcc-val" id="val-temp">0</span></div><input type="range" class="vcc-slider" id="inp-temp" min="-50" max="50" value="0"></div>
      <div class="vcc-control"><div class="vcc-info"><span class="vcc-label">Tint</span><span class="vcc-val" id="val-tint">0</span></div><input type="range" class="vcc-slider" id="inp-tint" min="-100" max="100" value="0"></div>
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
        <div class="vcc-toggle-row thirds">
            <button class="vcc-toggle" id="btn-mono">Mono</button>
            <button class="vcc-toggle" id="btn-norm">Norm</button>
            <button class="vcc-toggle" id="btn-visualizer">Audio Vis</button>
        </div>
      </div>
    </div>
  </div>

  <div class="vcc-section">
    <div class="vcc-header">Navigation</div>
    <div class="vcc-grid">
       <div class="vcc-control full-width">
         <div class="vcc-timecode-display" id="vcc-timecode">00:00:00.000</div>
         
         <div class="vcc-toggle-row halves">
            <button class="vcc-toggle" id="btn-frame-prev">Previous Frame</button>
            <button class="vcc-toggle" id="btn-frame-next">Next Frame</button>
         </div>

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
         <div class="vcc-toggle-row" style="grid-template-columns: repeat(3, 1fr); gap: 4px;">
           <button class="vcc-toggle" id="btn-screenshot">Snap</button>
           <button class="vcc-toggle" id="btn-pip">PiP</button>
           <button class="vcc-toggle" id="btn-record">Record</button>
           <button class="vcc-toggle" id="btn-focus">Cinema</button>
           <button class="vcc-toggle" id="btn-aspect">Fit</button>
           <button class="vcc-toggle" id="btn-thumbnail">Thumb</button>
         </div>
       </div>
       <div class="vcc-control full-width">
         <div class="vcc-info"><span class="vcc-label">Overlays</span></div>
         <div class="vcc-toggle-row" style="grid-template-columns: repeat(3, 1fr); gap: 4px;">
           <button class="vcc-toggle" id="btn-crosshair">Crosshair</button>
           <button class="vcc-toggle" id="btn-grid">Grid</button>
           <button class="vcc-toggle" id="btn-ultrawide">21:9</button>
           <button class="vcc-toggle" id="btn-golden">Golden Ratio</button>
           <button class="vcc-toggle" id="btn-osd-time">OSD Time</button>
           <button class="vcc-toggle" style="visibility:hidden">Empty</button>
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

// --- 4. STATE ---
const defaults = {
  brightness: 100, contrast: 100, saturate: 100, gamma: 1.0, temp: 0, tint: 0,
  vignette: 0, sharpness: 0, speed: 1.0, 
  rotate: 0, rotateX: 0, rotateY: 0, zoom: 1.0, 
  skewX: 0, skewY: 0, flipX: false, flipY: false, panX: 0, panY: 0,
  fitMode: 0, 
  crosshair: false, focus: false, grid: false, ultrawide: false, golden: false, osdTime: false,
  volume: 100, bass: 0, treble: 0, delay: 0, mono: false, norm: false, visualizer: false, ambient: false, rainbow: false,
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

// --- 5. SAFE LISTENER HELPER ---
function safeListen(id, event, callback) {
  const el = document.getElementById(id);
  if(el) {
    el.addEventListener(event, callback);
  }
}

// --- 6. INPUTS ---
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

safeListen('btn-flip-x', 'click', () => { state.flipX = !state.flipX; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-flip-y', 'click', () => { state.flipY = !state.flipY; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-mono', 'click', () => { state.mono = !state.mono; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-norm', 'click', () => { state.norm = !state.norm; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-visualizer', 'click', () => { state.visualizer = !state.visualizer; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-ambient', 'click', () => { state.ambient = !state.ambient; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-rainbow', 'click', () => { state.rainbow = !state.rainbow; updateUI(); applyEffects(); saveSettings(); });

// PRESETS
const presets = {
  cinema: { brightness: 110, contrast: 120, saturate: 115, gamma: 1.1, vignette: 20, temp: -5 },
  night: { brightness: 90, contrast: 100, saturate: 100, gamma: 1.0, temp: 25, tint: 0 },
  retro: { brightness: 100, contrast: 90, saturate: 70, sepia: 30, vignette: 30, temp: 10 },
  matrix: { brightness: 100, contrast: 120, saturate: 120, tint: 100, temp: -10 }
};
const applyPreset = (p) => { Object.assign(state, presets[p]); updateUI(); applyEffects(); saveSettings(); };

safeListen('btn-pre-cinema', 'click', () => applyPreset('cinema'));
safeListen('btn-pre-night', 'click', () => applyPreset('night'));
safeListen('btn-pre-retro', 'click', () => applyPreset('retro'));
safeListen('btn-pre-matrix', 'click', () => applyPreset('matrix'));

// SEEK
const seek = (sec) => { document.querySelectorAll('video').forEach(v => v.currentTime += sec); };
const seekTo = (percent) => { document.querySelectorAll('video').forEach(v => { if(v.duration) v.currentTime = v.duration * (percent/100); }); };

safeListen('btn-seek-n30', 'click', () => seek(-30));
safeListen('btn-seek-n10', 'click', () => seek(-10));
safeListen('btn-seek-p10', 'click', () => seek(10));
safeListen('btn-seek-p30', 'click', () => seek(30));
safeListen('btn-seek-start', 'click', () => seekTo(0));
safeListen('btn-seek-mid', 'click', () => seekTo(50));
safeListen('btn-seek-end', 'click', () => seekTo(99));

// FRAME STEPPING
const stepFrame = (dir) => { 
  const videos = document.querySelectorAll('video');
  videos.forEach(v => {
    if(v.paused) v.currentTime += (dir * 0.04); 
    else { v.pause(); v.currentTime += (dir * 0.04); }
  });
};
safeListen('btn-frame-prev', 'click', () => stepFrame(-1));
safeListen('btn-frame-next', 'click', () => stepFrame(1));

// GOTO
const inpGoto = document.getElementById('inp-goto');
if(inpGoto) {
    inpGoto.addEventListener('keydown', (e) => {
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
}

// BOOKMARKS
const renderBookmarks = () => {
  const list = document.getElementById('vcc-bm-list');
  if(!list) return;
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
safeListen('btn-bm-add', 'click', () => {
  const v = document.querySelector('video'); if(v) { state.bookmarks.push({ time: v.currentTime }); renderBookmarks(); saveSettings(); }
});

// Geo/Pan/Tools
safeListen('btn-geo-reset', 'click', () => { state.zoom = 1; state.rotate = 0; state.rotateX = 0; state.rotateY = 0; state.skewX = 0; state.skewY = 0; state.panX = 0; state.panY = 0; state.flipX = false; state.flipY = false; updateUI(); applyEffects(); saveSettings(); });
const PAN_STEP = 50;
safeListen('btn-pan-up', 'click', () => { state.panY += PAN_STEP; applyEffects(); saveSettings(); });
safeListen('btn-pan-down', 'click', () => { state.panY -= PAN_STEP; applyEffects(); saveSettings(); });
safeListen('btn-pan-left', 'click', () => { state.panX += PAN_STEP; applyEffects(); saveSettings(); });
safeListen('btn-pan-right', 'click', () => { state.panX -= PAN_STEP; applyEffects(); saveSettings(); });
safeListen('btn-pan-reset', 'click', () => { state.panX = 0; state.panY = 0; applyEffects(); saveSettings(); });

safeListen('btn-close', 'click', () => { const el = document.getElementById('vcc-menu'); if(el) el.classList.remove('visible'); });
safeListen('btn-reset', 'click', () => { state = { ...defaults }; updateUI(); applyEffects(); saveSettings(); });

safeListen('btn-screenshot', 'click', () => {
  const video = document.querySelector('video'); if(!video) return;
  const canvas = document.createElement('canvas'); canvas.width = video.videoWidth; canvas.height = video.videoHeight;
  const ctx = canvas.getContext('2d'); ctx.filter = video.style.filter; 
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  const link = document.createElement('a'); link.download = `snapshot_${Date.now()}.png`; link.href = canvas.toDataURL(); link.click();
});
safeListen('btn-pip', 'click', async () => { const video = document.querySelector('video'); if(video) { document.pictureInPictureElement ? document.exitPictureInPicture() : video.requestPictureInPicture(); } });

// RECORDING
let mediaRecorder = null;
let recordedChunks = [];
safeListen('btn-record', 'click', () => {
    const video = document.querySelector('video');
    const btn = document.getElementById('btn-record');
    if(!video || !btn) return;

    if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        btn.textContent = 'Record';
        btn.classList.remove('danger', 'active');
    } else {
        try {
            const stream = video.captureStream();
            mediaRecorder = new MediaRecorder(stream);
            recordedChunks = [];
            
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) recordedChunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(recordedChunks, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `recording_${Date.now()}.webm`;
                a.click();
                URL.revokeObjectURL(url);
            };

            mediaRecorder.start();
            btn.textContent = 'Stop';
            btn.classList.add('danger', 'active');
        } catch (err) {
            console.error(err);
            alert("Recording failed. This video may be DRM protected or restricted.");
        }
    }
});


const fitModes = ['contain', 'cover', 'fill']; const fitNames = ['Default', 'Zoom to Fill', 'Stretch'];
safeListen('btn-aspect', 'click', () => { state.fitMode = (state.fitMode + 1) % 3; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-crosshair', 'click', () => { state.crosshair = !state.crosshair; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-focus', 'click', () => { state.focus = !state.focus; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-grid', 'click', () => { state.grid = !state.grid; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-ultrawide', 'click', () => { state.ultrawide = !state.ultrawide; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-golden', 'click', () => { state.golden = !state.golden; updateUI(); applyEffects(); saveSettings(); });
safeListen('btn-osd-time', 'click', () => { state.osdTime = !state.osdTime; updateUI(); applyEffects(); saveSettings(); });

// THUMBNAIL LOGIC
safeListen('btn-thumbnail', 'click', () => {
  const video = document.querySelector('video');
  let thumbUrl = '';
  if (window.location.hostname.includes('youtube.com')) {
    const v = new URLSearchParams(window.location.search).get('v');
    if (v) thumbUrl = `https://img.youtube.com/vi/${v}/maxresdefault.jpg`;
  }
  if (!thumbUrl && video && video.poster) thumbUrl = video.poster;
  
  if (thumbUrl) window.open(thumbUrl, '_blank');
  else alert("Could not find a high-res thumbnail.");
});

safeListen('btn-loop-a', 'click', () => { const v = document.querySelector('video'); if(v) state.loopA = v.currentTime; updateUI(); saveSettings(); });
safeListen('btn-loop-b', 'click', () => { const v = document.querySelector('video'); if(v) state.loopB = v.currentTime; updateUI(); saveSettings(); });
safeListen('btn-loop-clear', 'click', () => { state.loopA = null; state.loopB = null; updateUI(); saveSettings(); });

document.addEventListener('keydown', (e) => {
  if (e.altKey && e.code === 'KeyQ') {
     const menu = document.getElementById('vcc-menu');
     if(menu) menu.classList.toggle('visible');
  }
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
  
  const elFlipX = document.getElementById('btn-flip-x'); if(elFlipX) elFlipX.classList.toggle('active', state.flipX);
  const elFlipY = document.getElementById('btn-flip-y'); if(elFlipY) elFlipY.classList.toggle('active', state.flipY);
  const elMono = document.getElementById('btn-mono'); if(elMono) elMono.classList.toggle('active', state.mono);
  const elNorm = document.getElementById('btn-norm'); if(elNorm) elNorm.classList.toggle('active', state.norm);
  const elVis = document.getElementById('btn-visualizer'); if(elVis) elVis.classList.toggle('active', state.visualizer);
  const elAmb = document.getElementById('btn-ambient'); if(elAmb) elAmb.classList.toggle('active', state.ambient);
  const elRain = document.getElementById('btn-rainbow'); if(elRain) elRain.classList.toggle('active', state.rainbow);
  const elAspect = document.getElementById('btn-aspect'); if(elAspect) elAspect.textContent = `Fit: ${fitNames[state.fitMode]}`;
  
  // Overlay Buttons Active State
  const elCross = document.getElementById('btn-crosshair'); if(elCross) elCross.classList.toggle('active', state.crosshair);
  const elFocus = document.getElementById('btn-focus'); if(elFocus) elFocus.classList.toggle('active', state.focus);
  const elGrid = document.getElementById('btn-grid'); if(elGrid) elGrid.classList.toggle('active', state.grid);
  const elWide = document.getElementById('btn-ultrawide'); if(elWide) elWide.classList.toggle('active', state.ultrawide);
  const elGold = document.getElementById('btn-golden'); if(elGold) elGold.classList.toggle('active', state.golden); 
  const elOsd = document.getElementById('btn-osd-time'); if(elOsd) elOsd.classList.toggle('active', state.osdTime);
  
  const loopStatus = document.getElementById('val-ab-status');
  const elLoopA = document.getElementById('btn-loop-a'); if(elLoopA) elLoopA.classList.toggle('active', state.loopA !== null);
  const elLoopB = document.getElementById('btn-loop-b'); if(elLoopB) elLoopB.classList.toggle('active', state.loopB !== null);
  if(loopStatus) loopStatus.textContent = (state.loopA !== null && state.loopB !== null) ? "ACTIVE" : (state.loopA !== null ? "Start Set" : "Off");
  renderBookmarks();
}

function saveSettings() { localStorage.setItem('vcc_pro_settings', JSON.stringify(state)); }

let audioCtx, sourceNode, gainNode, bassNode, trebleNode, delayNode, compressorNode, analyserNode;
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
    analyserNode = audioCtx.createAnalyser(); 
    analyserNode.fftSize = 256;

    sourceNode.connect(delayNode); delayNode.connect(bassNode); bassNode.connect(trebleNode);
    trebleNode.connect(compressorNode); compressorNode.connect(gainNode); 
    
    // Connect gain to analyser, then to destination (so visualizer reflects volume/EQ)
    gainNode.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);
  } catch(e) { console.log("Audio API blocked (CORS)."); }
}

function applyEffects() {
  const gammaVal = 1 / state.gamma; 
  const elGammaR = document.getElementById('vcc-gamma-r'); if(elGammaR) elGammaR.setAttribute('exponent', gammaVal);
  const elGammaG = document.getElementById('vcc-gamma-g'); if(elGammaG) elGammaG.setAttribute('exponent', gammaVal);
  const elGammaB = document.getElementById('vcc-gamma-b'); if(elGammaB) elGammaB.setAttribute('exponent', gammaVal);

  const r = 1 + (state.temp / 100); const b = 1 - (state.temp / 100); const g = 1 + (state.tint / 100);
  const matrix = `${r} 0 0 0 0  0 ${g} 0 0 0  0 0 ${b} 0 0  0 0 0 1 0`;
  const elMatrix = document.getElementById('vcc-colormatrix'); if(elMatrix) elMatrix.setAttribute('values', matrix);

  const s = state.sharpness;
  if(s > 0) {
    const edge = -s; const center = 1 + (4 * s);
    const elConv = document.getElementById('vcc-convolve'); 
    if(elConv) elConv.setAttribute('kernelMatrix', `0 ${edge} 0 ${edge} ${center} ${edge} 0 ${edge} 0`);
  }

  const videos = document.querySelectorAll('video');
  let filterString = `brightness(${state.brightness}%) contrast(${state.contrast}%) saturate(${state.saturate}%) grayscale(${state.grayscale}%) invert(${state.invert}%) opacity(${state.opacity}%) sepia(${state.sepia}%) blur(${state.blur}px) url(#vcc-grade-filter)`;
  if (state.sharpness > 0) filterString += ` url(#vcc-sharpness-filter)`;

  const scaleX = state.flipX ? -state.zoom : state.zoom;
  const scaleY = state.flipY ? -state.zoom : state.zoom;
  const transformString = `perspective(800px) translate(${state.panX}px, ${state.panY}px) rotate(${state.rotate}deg) rotateX(${state.rotateX}deg) rotateY(${state.rotateY}deg) skewX(${state.skewX}deg) skewY(${state.skewY}deg) scale(${scaleX}, ${scaleY})`;

  document.querySelectorAll('.vcc-overlay-box').forEach(box => {
      box.classList.toggle('vcc-focus-active', state.focus);
      
      // Vignette
      let vig = box.querySelector('.vcc-vignette-layer');
      if(!vig) { vig = document.createElement('div'); vig.className = 'vcc-vignette-layer'; box.appendChild(vig); }
      vig.style.background = state.vignette > 0 ? `radial-gradient(circle, transparent ${100 - state.vignette}%, black 140%)` : 'none';
      
      // Crosshair
      let cross = box.querySelector('.vcc-crosshair');
      if(!cross) { cross = document.createElement('div'); cross.className = 'vcc-crosshair'; box.appendChild(cross); }
      cross.style.display = state.crosshair ? 'block' : 'none';
      
      // Grid
      let grid = box.querySelector('.vcc-grid-layer');
      if(!grid) { grid = document.createElement('div'); grid.className = 'vcc-grid-layer'; box.appendChild(grid); }
      grid.style.display = state.grid ? 'block' : 'none';

      // Golden Ratio
      let golden = box.querySelector('.vcc-golden-layer');
      if(!golden) { golden = document.createElement('div'); golden.className = 'vcc-golden-layer'; box.appendChild(golden); }
      golden.style.display = state.golden ? 'block' : 'none';

      // Audio Visualizer Canvas
      let visCanvas = box.querySelector('.vcc-visualizer-layer');
      if(!visCanvas) { 
        visCanvas = document.createElement('canvas'); 
        visCanvas.className = 'vcc-visualizer-layer'; 
        box.appendChild(visCanvas); 
      }
      visCanvas.style.display = state.visualizer ? 'block' : 'none';

      // OSD Time
      let osd = box.querySelector('.vcc-osd-layer');
      if(!osd) { 
        osd = document.createElement('div'); 
        osd.className = 'vcc-osd-layer'; 
        osd.innerText = "00:00:00";
        box.appendChild(osd); 
      }
      osd.style.display = state.osdTime ? 'block' : 'none';
  });

  videos.forEach(v => {
    if (Math.abs(v.playbackRate - state.speed) > 0.1) v.playbackRate = state.speed;
    v.style.filter = filterString; v.style.transform = transformString; v.style.objectFit = fitModes[state.fitMode];
    if(state.ultrawide) v.style.clipPath = "inset(12% 0 12% 0)"; else v.style.clipPath = "none";

    if(state.volume > 100 || state.bass !== 0 || state.treble !== 0 || state.delay !== 0 || state.norm || state.mono || state.visualizer) {
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
const iconURL = chrome.runtime.getURL('icon128.png'); 

const overlays = new Map();
// Temporary canvas for color sampling
let tempCanvas = null;

function trackLoop() {
  const videos = document.querySelectorAll('video');

  // 1. CLEANUP
  overlays.forEach((box, video) => {
    const rect = video.getBoundingClientRect();
    const isHidden = !document.body.contains(video) || rect.width < 50 || rect.height < 50 || window.getComputedStyle(video).display === 'none';
    if (isHidden) { box.remove(); overlays.delete(video); }
  });

  // 2. CREATION & UPDATE
  videos.forEach(video => {
    if (video.offsetWidth < 100 || video.offsetHeight < 100) return;

    if (!overlays.has(video)) {
      const existingOverlay = document.elementFromPoint(video.getBoundingClientRect().left + 10, video.getBoundingClientRect().top + 10);
      if(existingOverlay && existingOverlay.classList.contains('vcc-icon')) return;

      const box = document.createElement('div'); box.className = 'vcc-overlay-box';
      const icon = document.createElement('div'); icon.className = 'vcc-icon'; 
      icon.style.backgroundImage = `url('${iconURL}')`;
      icon.style.width = '20px'; icon.style.height = '20px'; icon.style.backgroundSize = 'contain';
      
      icon.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); 
         const menu = document.getElementById('vcc-menu');
         if(menu) menu.classList.toggle('visible'); 
      });
      box.appendChild(icon); document.body.appendChild(box); overlays.set(video, box);

      // Sync Loop & Timecode Logic
      video.addEventListener('timeupdate', () => { 
          if(state.loopA !== null && state.loopB !== null) { if(video.currentTime >= state.loopB) video.currentTime = state.loopA; }
          const t = video.currentTime;
          const h = Math.floor(t / 3600); 
          const m = Math.floor((t % 3600) / 60); 
          const s = Math.floor(t % 60); 
          const ms = Math.floor((t % 1) * 1000);
          const timeStr = `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}.${ms.toString().padStart(3,'0')}`;
          
          // Update Dashboard Timecode
          const el = document.getElementById('vcc-timecode'); if(el) el.textContent = timeStr;

          // Update OSD Overlay Timecode
          if(state.osdTime) {
             const osd = box.querySelector('.vcc-osd-layer');
             if(osd) osd.textContent = timeStr;
          }
      });
    }

    const box = overlays.get(video); if (!box) return;
    const fsElement = document.fullscreenElement;
    const menu = document.getElementById('vcc-menu');
    
    if (fsElement) { 
        if (box.parentElement !== fsElement) fsElement.appendChild(box); 
        if (menu && menu.parentElement !== fsElement) fsElement.appendChild(menu); 
    } else { 
        if (box.parentElement !== document.body) document.body.appendChild(box); 
        if (menu && menu.parentElement !== document.body) document.body.appendChild(menu); 
    }

    const rect = video.getBoundingClientRect();
    box.style.top = rect.top + 'px'; box.style.left = rect.left + 'px';
    box.style.width = rect.width + 'px'; box.style.height = rect.height + 'px';
    
    const visibleLeft = Math.max(rect.left, 0); 
    const visibleTop = Math.max(rect.top, 0);
    const icon = box.querySelector('.vcc-icon');
    if(icon) { icon.style.left = ((visibleLeft - rect.left) + 15) + 'px'; icon.style.top = ((visibleTop - rect.top) + 15) + 'px'; }
    
    // VISUALIZER DRAW LOOP (Standard Green Only)
    if(state.visualizer && analyserNode) {
       const canvas = box.querySelector('.vcc-visualizer-layer');
       if(canvas) {
          canvas.width = rect.width;
          canvas.height = rect.height;
          const ctx = canvas.getContext('2d');
          const bufferLength = analyserNode.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);
          analyserNode.getByteFrequencyData(dataArray);
          
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const barWidth = (canvas.width / bufferLength) * 2.5;
          let barHeight;
          let x = 0;
          
          for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i] / 2;
            ctx.fillStyle = `rgba(50, 255, 50, ${barHeight / 200})`; 
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth + 1;
          }
       }
    }

    // GLOW EFFECT LOGIC (Rainbow or Ambient)
    if(state.rainbow) {
       // Rainbow Cycle
       const hue = (Date.now() / 10) % 360; 
       const color = `hsla(${hue}, 100%, 50%, 0.6)`;
       const border = `hsla(${hue}, 100%, 50%, 0.3)`;
       box.style.boxShadow = `0 0 100px 30px ${color}`;
       box.style.border = `1px solid ${border}`;
    } else if(state.ambient) {
       // Ambient Sampling
       if(!tempCanvas) { tempCanvas = document.createElement('canvas'); tempCanvas.width = 1; tempCanvas.height = 1; }
       try {
           const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });
           ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, 0, 0, 1, 1);
           const p = ctx.getImageData(0, 0, 1, 1).data;
           box.style.boxShadow = `0 0 100px 30px rgba(${p[0]}, ${p[1]}, ${p[2]}, 0.6)`;
           box.style.border = `1px solid rgba(${p[0]}, ${p[1]}, ${p[2]}, 0.3)`;
       } catch(e) { }
    } else {
        box.style.boxShadow = 'none';
        box.style.border = 'none';
    }

    applyEffects();
  });
  requestAnimationFrame(trackLoop);
}

// Initial Kickoff
updateUI(); 
trackLoop();