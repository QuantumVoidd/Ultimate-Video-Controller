// --- 0. CLEANUP ---
document.querySelectorAll('#vcc-menu, #vcc-svg-engine, .vcc-overlay-box, #vcc-styles').forEach(el => el.remove());

// --- 1. INJECT STYLES ---
function injectStyles() {
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

    /* --- RESET & SCROLLBAR --- */
    #vcc-menu * {
      box-sizing: border-box !important;
      scrollbar-width: thin;
      scrollbar-color: #ff3333 #110505;
    }
    #vcc-menu ::-webkit-scrollbar { width: 6px; }
    #vcc-menu ::-webkit-scrollbar-track { background: #110505; }
    #vcc-menu ::-webkit-scrollbar-thumb { background: #500; border: 1px solid #ff3333; }
    #vcc-menu ::-webkit-scrollbar-thumb:hover { background: #ff3333; box-shadow: 0 0 5px #ff3333; }

    /* --- CORE CONTAINER --- */
    #vcc-menu {
      position: fixed !important;
      top: 50px !important;
      right: 50px !important;
      width: 620px !important;
      height: 500px !important;
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: nowrap !important;
      background: rgba(10, 5, 5, 0.80) !important; /* Transparent Dark Red Glass */
      backdrop-filter: blur(16px) !important;
      -webkit-backdrop-filter: blur(16px) !important;
      border: 1px solid #400 !important;
      border-left: 3px solid #ff3333 !important;
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.9), 0 0 15px rgba(255, 50, 50, 0.15) !important;
      z-index: 2147483647 !important;
      font-family: 'Share Tech Mono', 'Consolas', monospace !important;
      color: #ffcccc !important;
      opacity: 0;
      pointer-events: none;
      transform: translateX(20px);
      transition: opacity 0.2s, transform 0.2s;
      border-radius: 4px;
      overflow: hidden !important;
      line-height: 1.2 !important;
      text-align: left !important;
    }
    
    #vcc-menu.visible {
      opacity: 1;
      pointer-events: auto;
      transform: translateX(0);
    }

    /* --- LEFT SIDEBAR --- */
    .vcc-sidebar {
      width: 140px !important;
      height: 100% !important;
      background: rgba(20, 0, 0, 0.6) !important;
      border-right: 1px solid #400 !important;
      display: flex !important;
      flex-direction: column !important;
      padding-top: 15px !important;
      flex-shrink: 0 !important;
    }

    .vcc-logo {
      text-align: center !important;
      font-size: 18px !important;
      font-weight: bold !important;
      color: #fff !important;
      margin-bottom: 25px !important;
      text-shadow: 0 0 5px #ff3333 !important;
      letter-spacing: 1px !important;
      pointer-events: none;
    }
    
    .vcc-tabs-container {
      display: flex !important;
      flex-direction: column !important;
      gap: 2px !important;
    }

    .vcc-tab {
      padding: 12px 20px !important;
      cursor: pointer !important;
      color: #a66 !important;
      font-size: 12px !important;
      text-transform: uppercase !important;
      transition: all 0.2s !important;
      border-left: 2px solid transparent !important;
      user-select: none !important;
      background: transparent !important;
      text-align: left !important;
    }
    
    .vcc-tab:hover {
      color: #fff !important;
      background: rgba(255, 50, 50, 0.1) !important;
    }
    
    .vcc-tab.active {
      color: #ff3333 !important;
      background: linear-gradient(90deg, rgba(255, 50, 50, 0.2), transparent) !important;
      border-left: 2px solid #ff3333 !important;
      text-shadow: 0 0 8px rgba(255, 50, 50, 0.6) !important;
    }

    /* --- FOOTER BUTTONS --- */
    .vcc-sidebar-footer {
      margin-top: auto !important;
      padding: 15px 10px !important;
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 8px !important;
    }
    .vcc-btn-side {
        background: linear-gradient(180deg, #300, #100) !important;
        border: 1px solid #600 !important;
        color: #eaa !important;
        cursor: pointer !important;
        font-family: inherit !important;
        font-size: 10px !important;
        padding: 8px 0 !important;
        text-transform: uppercase !important;
        transition: 0.2s !important;
        border-radius: 4px !important;
        font-weight: bold !important;
        letter-spacing: 0.5px !important;
    }
    .vcc-btn-side:hover { 
        border-color: #ff3333 !important; 
        color: #fff !important; 
        background: #500 !important; 
        box-shadow: 0 0 8px #ff3333 !important;
    }
    .vcc-btn-side.close:hover { 
        background: #800 !important;
        border-color: #f00 !important;
    }

    /* --- RIGHT CONTENT AREA --- */
    .vcc-content-area {
      flex: 1 !important;
      height: 100% !important;
      overflow-y: auto !important;
      position: relative !important;
      padding: 20px !important;
      display: block !important;
    }

    /* --- SECTIONS --- */
    .vcc-section {
      display: none !important;
      animation: vcc-slide-in 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .vcc-section.active {
      display: block !important;
    }
    @keyframes vcc-slide-in { 
      from { opacity: 0; transform: translateY(10px); } 
      to { opacity: 1; transform: translateY(0); } 
    }

    .vcc-header {
      font-size: 16px !important;
      color: #ff3333 !important;
      text-transform: uppercase !important;
      /* FIX: RESTORED SINGLE UNDERLINE, FORCED REMOVAL OF EXTRA LINES */
      border-bottom: 1px solid #ff3333 !important;
      border-top: none !important;
      border-left: none !important;
      border-right: none !important;
      box-shadow: none !important;
      text-decoration: none !important;
      padding-bottom: 8px !important;
      margin-bottom: 20px !important;
      letter-spacing: 2px !important;
      font-weight: bold !important;
      text-shadow: 0 0 5px rgba(255, 50, 50, 0.4) !important;
    }
    
    /* Ensure no pseudo-elements create extra lines */
    .vcc-header::after, .vcc-header::before {
      display: none !important;
      content: none !important;
    }

    /* --- GRIDS & CONTROLS --- */
    .vcc-grid {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 15px !important;
    }
    
    .vcc-control {
      margin-bottom: 5px !important;
    }
    
    .vcc-control.full-width {
      grid-column: span 2 !important;
    }

    .vcc-info {
      display: flex !important;
      justify-content: space-between !important;
      margin-bottom: 6px !important;
      font-size: 11px !important;
      color: #b88 !important;
      font-weight: bold !important;
      letter-spacing: 0.5px !important;
    }
    .vcc-val { color: #ff3333 !important; text-shadow: 0 0 5px rgba(255, 50, 50, 0.5); }

    /* --- INPUTS (SLIDERS) --- */
    input[type=range].vcc-slider {
      -webkit-appearance: none !important;
      width: 100% !important;
      height: 4px !important;
      background: #400 !important;
      border-radius: 0 !important;
      outline: none !important;
      margin: 0 !important;
      border: 1px solid #600 !important;
      cursor: pointer !important;
    }
    input[type=range].vcc-slider::-webkit-slider-thumb {
      -webkit-appearance: none !important;
      width: 10px !important;
      height: 14px !important;
      background: #000 !important;
      border: 1px solid #ff3333 !important;
      border-radius: 0 !important;
      cursor: pointer !important;
      transition: all 0.1s !important;
      box-shadow: 0 0 5px rgba(255, 50, 50, 0.4) !important;
    }
    input[type=range].vcc-slider::-webkit-slider-thumb:hover {
      background: #ff3333 !important;
      box-shadow: 0 0 10px #ff3333 !important;
    }

    /* --- BUTTONS --- */
    button.vcc-toggle, button.vcc-btn {
      background: rgba(40, 0, 0, 0.5) !important;
      border: 1px solid #600 !important;
      color: #caa !important;
      padding: 8px 10px !important;
      font-family: inherit !important;
      font-size: 10px !important;
      cursor: pointer !important;
      text-transform: uppercase !important;
      transition: all 0.2s !important;
      width: 100% !important;
      letter-spacing: 1px !important;
      border-radius: 2px !important;
    }
    button.vcc-toggle:hover {
      border-color: #900 !important;
      color: #fff !important;
      background: rgba(80, 0, 0, 0.6) !important;
    }
    button.vcc-toggle.active {
      background: rgba(255, 50, 50, 0.2) !important;
      border-color: #ff3333 !important;
      color: #ff3333 !important;
      box-shadow: 0 0 10px rgba(255, 50, 50, 0.3) inset !important;
      font-weight: bold !important;
    }
    button.danger { border-color: #f00 !important; color: #fcc !important; }
    button.danger.active { background: #900 !important; color: #fff !important; border-color: #f00 !important; box-shadow: 0 0 10px #f00 inset !important; }

    /* --- BUTTON ROWS --- */
    .vcc-toggle-row { display: grid !important; gap: 6px !important; width: 100% !important; box-sizing: border-box !important; }
    .vcc-toggle-row.halves { grid-template-columns: 1fr 1fr !important; }
    .vcc-toggle-row.thirds { grid-template-columns: 1fr 1fr 1fr !important; }
    .vcc-toggle-row.fourths { grid-template-columns: repeat(4, 1fr) !important; }
    .vcc-toggle-row.fifths { grid-template-columns: repeat(5, 1fr) !important; }
    .vcc-toggle-row.sixths { grid-template-columns: repeat(6, 1fr) !important; }

    /* --- SPECIAL INPUTS --- */
    .vcc-timecode-display {
        font-size: 20px !important;
        color: #ff3333 !important;
        text-align: center !important;
        background: rgba(20,0,0,0.6) !important;
        border: 1px solid #600 !important;
        padding: 10px !important;
        margin-bottom: 12px !important;
        font-family: monospace !important;
        letter-spacing: 2px !important;
        text-shadow: 0 0 5px rgba(255, 50, 50, 0.4) !important;
    }
    .vcc-goto-input {
        width: 100% !important;
        background: #100505 !important;
        border: 1px solid #600 !important;
        color: #fff !important;
        padding: 8px !important;
        font-family: inherit !important;
        font-size: 12px !important;
        text-align: center !important;
        box-sizing: border-box !important;
        margin-top: 10px !important;
    }
    .vcc-goto-input:focus { border-color: #ff3333 !important; outline: none !important; }

    /* --- DPAD & GEO --- */
    .vcc-dpad { display: grid !important; grid-template-columns: 35px 35px 35px !important; gap: 4px !important; justify-content: center !important; }
    .vcc-dpad-btn { width: 35px !important; height: 35px !important; background: #200 !important; border: 1px solid #500 !important; color: #a55 !important; cursor: pointer !important; display: flex !important; align-items: center !important; justify-content: center !important; font-size: 10px !important; }
    .vcc-dpad-btn:hover { border-color: #ff3333 !important; color: #ff3333 !important; }
    .vcc-toggle-col { display: flex !important; flex-direction: column !important; gap: 5px !important; }

    /* --- OVERLAY BOX --- */
    .vcc-overlay-box {
      position: absolute !important; pointer-events: none !important; z-index: 10000 !important;
    }
    .vcc-golden-layer, .vcc-visualizer-layer {
      position: absolute !important; top: 0 !important; left: 0 !important; width: 100% !important; height: 100% !important; pointer-events: none !important; 
    }
    .vcc-visualizer-layer { opacity: 0.8 !important; z-index: 94 !important; }
    .vcc-golden-layer { 
      z-index: 95 !important; opacity: 0.8 !important; 
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 1000 618' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1000 0H0v618h1000V0z' fill='none' stroke='none'/%3E%3Cpath d='M0 0h618v618H0z' fill='none' stroke='rgba(255, 215, 0, 0.5)' stroke-width='2'/%3E%3Cpath d='M618 0h382v382H618z' fill='none' stroke='rgba(255, 215, 0, 0.5)' stroke-width='2'/%3E%3Cpath d='M618 382h236v236H618z' fill='none' stroke='rgba(255, 215, 0, 0.5)' stroke-width='2'/%3E%3Cpath d='M854 382h146v146H854z' fill='none' stroke='rgba(255, 215, 0, 0.5)' stroke-width='2'/%3E%3Cpath d='M0 618 A 618 618 0 0 1 618 0' fill='none' stroke='gold' stroke-width='2'/%3E%3Cpath d='M618 0 A 382 382 0 0 1 1000 382' fill='none' stroke='gold' stroke-width='2'/%3E%3Cpath d='M1000 382 A 236 236 0 0 1 764 618' fill='none' stroke='gold' stroke-width='2'/%3E%3C/svg%3E") !important;
      background-size: 100% 100% !important;
    }
    .vcc-osd-layer {
      position: absolute !important; top: 5% !important; right: 5% !important; font-family: monospace !important; font-size: 24px !important; color: #0f0 !important; background: rgba(0,0,0,0.5) !important; padding: 5px 10px !important; border-radius: 4px !important; pointer-events: none !important; z-index: 96 !important; 
      display: none; 
    }
    .vcc-icon {
      position: absolute !important; cursor: pointer !important; z-index: 10001 !important; pointer-events: auto !important;
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
<svg id="vcc-svg-engine" xmlns="http://www.w3.org/2000/svg" style="display:none">
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
  
  <div class="vcc-sidebar">
     <div class="vcc-logo">CTRL<span style="color:#ff3333">+NoPay</span></div>
     <div class="vcc-tabs-container">
        <div class="vcc-tab active" data-target="sec-color">Color</div>
        <div class="vcc-tab" data-target="sec-audio">Audio</div>
        <div class="vcc-tab" data-target="sec-nav">Nav</div>
        <div class="vcc-tab" data-target="sec-geo">Geometry</div>
        <div class="vcc-tab" data-target="sec-fx">Effects</div>
        <div class="vcc-tab" data-target="sec-stream">Stream</div>
        <div class="vcc-tab" data-target="sec-loop">Loop</div>
     </div>
     <div class="vcc-sidebar-footer">
        <button class="vcc-btn-side reset" id="btn-reset">Reset</button>
        <button class="vcc-btn-side close" id="btn-close">Close</button>
     </div>
  </div>

  <div class="vcc-content-area">

    <div id="sec-color" class="vcc-section active">
      <div class="vcc-header">Color Master</div>
      <div class="vcc-grid">
        <div class="vcc-control full-width">
           <div class="vcc-info"><span class="vcc-label">Presets</span></div>
           <div class="vcc-toggle-row sixths">
             <button class="vcc-toggle" id="btn-pre-cinema">Cinema</button>
             <button class="vcc-toggle" id="btn-pre-night">Night</button>
             <button class="vcc-toggle" id="btn-pre-retro">Retro</button>
             <button class="vcc-toggle" id="btn-pre-matrix">Matrix</button>
             <button class="vcc-toggle" id="btn-ambient">Amb</button>
             <button class="vcc-toggle" id="btn-rainbow">RGB</button>
           </div>
        </div>
        <div class="vcc-control"><div class="vcc-info"><span>Brightness</span><span class="vcc-val" id="val-brightness">100%</span></div><input type="range" class="vcc-slider" id="inp-brightness" min="0" max="200" value="100"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Contrast</span><span class="vcc-val" id="val-contrast">100%</span></div><input type="range" class="vcc-slider" id="inp-contrast" min="0" max="200" value="100"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Saturation</span><span class="vcc-val" id="val-saturate">100%</span></div><input type="range" class="vcc-slider" id="inp-saturate" min="0" max="200" value="100"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Gamma</span><span class="vcc-val" id="val-gamma">1.0</span></div><input type="range" class="vcc-slider" id="inp-gamma" min="0.5" max="2.0" step="0.05" value="1.0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Temp</span><span class="vcc-val" id="val-temp">0</span></div><input type="range" class="vcc-slider" id="inp-temp" min="-50" max="50" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Tint</span><span class="vcc-val" id="val-tint">0</span></div><input type="range" class="vcc-slider" id="inp-tint" min="-100" max="100" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Grayscale</span><span class="vcc-val" id="val-grayscale">0%</span></div><input type="range" class="vcc-slider" id="inp-grayscale" min="0" max="100" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Invert</span><span class="vcc-val" id="val-invert">0%</span></div><input type="range" class="vcc-slider" id="inp-invert" min="0" max="100" value="0"></div>
      </div>
    </div>

    <div id="sec-audio" class="vcc-section">
      <div class="vcc-header">Audio Studio</div>
      <div class="vcc-grid">
        <div class="vcc-control full-width"><div class="vcc-info"><span>Volume Boost</span><span class="vcc-val" id="val-volume">100%</span></div><input type="range" class="vcc-slider" id="inp-volume" min="100" max="600" step="10" value="100"></div>
        
        <div class="vcc-control full-width">
           <div class="vcc-info"><span>Dialogue Isolator</span><button class="vcc-toggle" id="btn-audio-split" style="width: auto; padding: 2px 8px;">Enable Split</button></div>
           <div class="vcc-toggle-row halves" style="margin-top: 5px !important;">
              <div class="vcc-sub-control" style="width:100%">
                 <div class="vcc-info" style="font-size:9px; color:#aaa;"><span>VOICE</span><span id="val-voiceVol">100%</span></div>
                 <input type="range" class="vcc-slider" id="inp-voiceVol" min="0" max="200" value="100">
              </div>
              <div class="vcc-sub-control" style="width:100%">
                 <div class="vcc-info" style="font-size:9px; color:#aaa;"><span>BG</span><span id="val-bgVol">100%</span></div>
                 <input type="range" class="vcc-slider" id="inp-bgVol" min="0" max="200" value="100">
              </div>
           </div>
           <div class="vcc-control" style="margin-top: 5px !important;">
              <div class="vcc-info"><span>Gate Thresh</span><span class="vcc-val" id="val-gateThreshold">0</span></div>
              <input type="range" class="vcc-slider" id="inp-gateThreshold" min="0" max="50" step="1" value="0">
           </div>
        </div>
  
        <div class="vcc-control"><div class="vcc-info"><span>Bass</span><span class="vcc-val" id="val-bass">0dB</span></div><input type="range" class="vcc-slider" id="inp-bass" min="-10" max="15" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Treble</span><span class="vcc-val" id="val-treble">0dB</span></div><input type="range" class="vcc-slider" id="inp-treble" min="-10" max="15" value="0"></div>
        <div class="vcc-control full-width"><div class="vcc-info"><span>Sync Delay</span><span class="vcc-val" id="val-delay">0s</span></div><input type="range" class="vcc-slider" id="inp-delay" min="0" max="5.0" step="0.1" value="0"></div>
        <div class="vcc-control full-width">
          <div class="vcc-info"><span>Process</span></div>
          <div class="vcc-toggle-row thirds">
              <button class="vcc-toggle" id="btn-mono">Mono</button>
              <button class="vcc-toggle" id="btn-norm">Norm</button>
              <button class="vcc-toggle" id="btn-visualizer">Vis</button>
          </div>
        </div>
      </div>
    </div>

    <div id="sec-nav" class="vcc-section">
      <div class="vcc-header">Navigation</div>
      <div class="vcc-grid">
         <div class="vcc-control full-width">
           <div class="vcc-timecode-display" id="vcc-timecode">00:00:00.000</div>
           
           <div class="vcc-toggle-row halves">
              <button class="vcc-toggle" id="btn-frame-prev">&lt; Frame</button>
              <button class="vcc-toggle" id="btn-frame-next">Frame &gt;</button>
           </div>
  
           <div class="vcc-toggle-row thirds" style="margin-top:5px">
             <button class="vcc-toggle" id="btn-seek-start">Start</button>
             <button class="vcc-toggle" id="btn-seek-mid">50%</button>
             <button class="vcc-toggle" id="btn-seek-end">End</button>
           </div>
           <div class="vcc-info" style="margin-top:5px;"><span>Quick Jump</span></div>
           <div class="vcc-toggle-row fourths">
             <button class="vcc-toggle" id="btn-seek-n30">-30s</button>
             <button class="vcc-toggle" id="btn-seek-n10">-10s</button>
             <button class="vcc-toggle" id="btn-seek-p10">+10s</button>
             <button class="vcc-toggle" id="btn-seek-p30">+30s</button>
           </div>
           <input type="text" class="vcc-goto-input" id="inp-goto" placeholder="Go To (e.g. 1:30) & Enter" style="margin-top:5px">
         </div>
         <div class="vcc-control full-width">
           <div class="vcc-info"><span>Bookmarks</span><button class="vcc-toggle" style="width: auto; padding: 2px 8px;" id="btn-bm-add">+ Add</button></div>
           <div class="vcc-bookmark-list" id="vcc-bm-list"></div>
         </div>
      </div>
    </div>

    <div id="sec-geo" class="vcc-section">
      <div class="vcc-header">Geometry & Pan</div>
      <div class="vcc-grid">
        <div class="vcc-control"><div class="vcc-info"><span>Zoom</span><span class="vcc-val" id="val-zoom">1.0x</span></div><input type="range" class="vcc-slider" id="inp-zoom" min="1.0" max="5.0" step="0.1" value="1.0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Rotate Z</span><span class="vcc-val" id="val-rotate">0°</span></div><input type="range" class="vcc-slider" id="inp-rotate" min="0" max="360" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Tilt X</span><span class="vcc-val" id="val-rotateX">0°</span></div><input type="range" class="vcc-slider" id="inp-rotateX" min="-60" max="60" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Tilt Y</span><span class="vcc-val" id="val-rotateY">0°</span></div><input type="range" class="vcc-slider" id="inp-rotateY" min="-60" max="60" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Skew X</span><span class="vcc-val" id="val-skewX">0°</span></div><input type="range" class="vcc-slider" id="inp-skewX" min="-45" max="45" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Skew Y</span><span class="vcc-val" id="val-skewY">0°</span></div><input type="range" class="vcc-slider" id="inp-skewY" min="-45" max="45" value="0"></div>
        <div class="vcc-control">
           <div class="vcc-info"><span>Move</span></div>
           <div class="vcc-dpad">
              <div class="vcc-dpad-empty"></div><button class="vcc-dpad-btn" id="btn-pan-up">▲</button><div class="vcc-dpad-empty"></div>
              <button class="vcc-dpad-btn" id="btn-pan-left">◀</button><button class="vcc-dpad-btn center" id="btn-pan-reset">●</button><button class="vcc-dpad-btn" id="btn-pan-right">▶</button>
              <div class="vcc-dpad-empty"></div><button class="vcc-dpad-btn" id="btn-pan-down">▼</button><div class="vcc-dpad-empty"></div>
           </div>
        </div>
        <div class="vcc-control">
           <div class="vcc-info"><span>Transform</span></div>
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

    <div id="sec-fx" class="vcc-section">
      <div class="vcc-header">Visual Effects</div>
      <div class="vcc-grid">
        <div class="vcc-control"><div class="vcc-info"><span>Vignette</span><span class="vcc-val" id="val-vignette">0%</span></div><input type="range" class="vcc-slider" id="inp-vignette" min="0" max="100" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Opacity</span><span class="vcc-val" id="val-opacity">100%</span></div><input type="range" class="vcc-slider" id="inp-opacity" min="10" max="100" value="100"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Sharpness</span><span class="vcc-val" id="val-sharpness">0</span></div><input type="range" class="vcc-slider" id="inp-sharpness" min="0" max="5" step="0.5" value="0"></div>
        <div class="vcc-control"><div class="vcc-info"><span>Blur</span><span class="vcc-val" id="val-blur">0px</span></div><input type="range" class="vcc-slider" id="inp-blur" min="0" max="10" step="0.5" value="0"></div>
      </div>
    </div>

    <div id="sec-stream" class="vcc-section">
      <div class="vcc-header">Stream Tools</div>
      <div class="vcc-grid">
         <div class="vcc-control full-width">
           <div class="vcc-info"><span>Actions</span></div>
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
           <div class="vcc-info"><span>Overlays</span></div>
           <div class="vcc-toggle-row" style="grid-template-columns: repeat(3, 1fr); gap: 4px;">
             <button class="vcc-toggle" id="btn-crosshair">Crosshair</button>
             <button class="vcc-toggle" id="btn-grid">Grid</button>
             <button class="vcc-toggle" id="btn-ultrawide">21:9</button>
             <button class="vcc-toggle" id="btn-golden">Golden</button>
             <button class="vcc-toggle" id="btn-osd-time">OSD Time</button>
             <button class="vcc-toggle" style="visibility:hidden">Empty</button>
           </div>
         </div>
      </div>
    </div>

    <div id="sec-loop" class="vcc-section">
      <div class="vcc-header">Playback & Loop</div>
      <div class="vcc-grid">
        <div class="vcc-control full-width">
          <div class="vcc-info"><span>Speed</span><span class="vcc-val" id="val-speed">1.0x</span></div>
          <input type="range" class="vcc-slider" id="inp-speed" min="0.1" max="16.0" step="0.1" value="1.0">
        </div>
        <div class="vcc-control full-width">
           <div class="vcc-info"><span>A-B Repeat</span><span class="vcc-val" id="val-ab-status">Off</span></div>
           <div class="vcc-toggle-row thirds">
             <button class="vcc-toggle" id="btn-loop-a">Set A</button>
             <button class="vcc-toggle" id="btn-loop-b">Set B</button>
             <button class="vcc-toggle danger" id="btn-loop-clear">Clear</button>
           </div>
        </div>
      </div>
    </div>

  </div> </div>
`;
document.body.insertAdjacentHTML('beforeend', dashboardHTML);

// --- 3.5 INITIALIZE TAB LOGIC ---
document.querySelectorAll('.vcc-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all tabs
    document.querySelectorAll('.vcc-tab').forEach(t => t.classList.remove('active'));
    // Remove active from all sections
    document.querySelectorAll('.vcc-section').forEach(s => s.classList.remove('active'));
    
    // Add active to clicked tab
    tab.classList.add('active');
    // Add active to target section
    const target = tab.getAttribute('data-target');
    const sec = document.getElementById(target);
    if(sec) sec.classList.add('active');
  });
});

// --- 4. STATE ---
const defaults = {
  brightness: 100, contrast: 100, saturate: 100, gamma: 1.0, temp: 0, tint: 0,
  vignette: 0, sharpness: 0, speed: 1.0, 
  rotate: 0, rotateX: 0, rotateY: 0, zoom: 1.0, 
  skewX: 0, skewY: 0, flipX: false, flipY: false, panX: 0, panY: 0,
  fitMode: 0, 
  crosshair: false, focus: false, grid: false, ultrawide: false, golden: false, osdTime: false,
  volume: 100, bass: 0, treble: 0, delay: 0, mono: false, norm: false, visualizer: false, ambient: false, rainbow: false,
  // NEW SEPARATOR STATE
  audioSplit: false, voiceVol: 100, bgVol: 100, gateThreshold: 0,
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
['brightness', 'contrast', 'saturate', 'gamma', 'temp', 'tint', 'vignette', 'sharpness', 'speed', 'rotate', 'rotateX', 'rotateY', 'zoom', 'volume', 'bass', 'treble', 'delay', 'skewX', 'skewY', 'grayscale', 'invert', 'opacity', 'sepia', 'blur', 'voiceVol', 'bgVol', 'gateThreshold'].forEach(key => {
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
safeListen('btn-audio-split', 'click', () => { state.audioSplit = !state.audioSplit; updateUI(); applyEffects(); saveSettings(); });

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
  const elSplit = document.getElementById('btn-audio-split'); if(elSplit) elSplit.classList.toggle('active', state.audioSplit);

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

// AUDIO GRAPH VARIABLES
let audioCtx, sourceNode, gainNode;
// Filter/FX Nodes
let bassNode, trebleNode, delayNode, compressorNode, analyserNode;
// Splitter Nodes
let voiceFilterHP1, voiceFilterHP2, voiceFilterHP3, voiceFilterHP4; // QUAD HP FILTER
let voiceFilterLP1, voiceFilterLP2; 
let voiceGain, gateNode; 
let gateAnalyser; // NEW: DEDICATED ANALYSER FOR GATE SIDECHAIN
let bgFilterLP, bgFilterHP, bgGain;

function initAudio(video) {
  if(audioCtx || !video) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();
    sourceNode = audioCtx.createMediaElementSource(video);
    
    // Standard FX Chain
    delayNode = audioCtx.createDelay(5.0);
    bassNode = audioCtx.createBiquadFilter(); bassNode.type = 'lowshelf'; bassNode.frequency.value = 200;
    trebleNode = audioCtx.createBiquadFilter(); trebleNode.type = 'highshelf'; trebleNode.frequency.value = 2000;
    compressorNode = audioCtx.createDynamicsCompressor(); 
    
    // Main Gain (Volume Boost)
    gainNode = audioCtx.createGain();

    // MAIN VISUALIZER (Sees full mix)
    analyserNode = audioCtx.createAnalyser(); 
    analyserNode.fftSize = 256;

    // --- SEPARATOR NODES ---
    // QUAD HPF (350Hz) + DOUBLE LPF (3200Hz)
    voiceFilterHP1 = audioCtx.createBiquadFilter(); voiceFilterHP1.type = 'highpass'; voiceFilterHP1.frequency.value = 350;
    voiceFilterHP2 = audioCtx.createBiquadFilter(); voiceFilterHP2.type = 'highpass'; voiceFilterHP2.frequency.value = 350;
    voiceFilterHP3 = audioCtx.createBiquadFilter(); voiceFilterHP3.type = 'highpass'; voiceFilterHP3.frequency.value = 350;
    voiceFilterHP4 = audioCtx.createBiquadFilter(); voiceFilterHP4.type = 'highpass'; voiceFilterHP4.frequency.value = 350;

    voiceFilterLP1 = audioCtx.createBiquadFilter(); voiceFilterLP1.type = 'lowpass'; voiceFilterLP1.frequency.value = 3200;
    voiceFilterLP2 = audioCtx.createBiquadFilter(); voiceFilterLP2.type = 'lowpass'; voiceFilterLP2.frequency.value = 3200;
    
    // Gate Gain Node (Controls "Open/Shut" state of voice)
    gateNode = audioCtx.createGain();
    voiceGain = audioCtx.createGain();

    // SIDECHAIN ANALYSER: This one only hears the filtered voice
    gateAnalyser = audioCtx.createAnalyser();
    gateAnalyser.fftSize = 256;

    // Background Path
    bgFilterLP = audioCtx.createBiquadFilter(); bgFilterLP.type = 'lowpass'; bgFilterLP.frequency.value = 350;
    bgFilterHP = audioCtx.createBiquadFilter(); bgFilterHP.type = 'highpass'; bgFilterHP.frequency.value = 3200;
    bgGain = audioCtx.createGain();

    // CONNECT BASIC CHAIN
    sourceNode.connect(delayNode);
    delayNode.connect(bassNode);
    bassNode.connect(trebleNode);
    trebleNode.connect(compressorNode);
    compressorNode.connect(gainNode);
    gainNode.connect(analyserNode); // Main Visualizer
    
    // CONNECT SEPARATOR GRAPH
    // Voice Chain: Gain -> HPF(x4) -> LPF(x2) -> GateNode -> VoiceGain -> Dest
    gainNode.connect(voiceFilterHP1);
    voiceFilterHP1.connect(voiceFilterHP2);
    voiceFilterHP2.connect(voiceFilterHP3);
    voiceFilterHP3.connect(voiceFilterHP4);
    voiceFilterHP4.connect(voiceFilterLP1);
    voiceFilterLP1.connect(voiceFilterLP2);
    
    // VITAL: Connect the end of the filter chain to the SIDECHAIN ANALYSER
    voiceFilterLP2.connect(gateAnalyser); 

    voiceFilterLP2.connect(gateNode); // Gate controls volume before final mix
    gateNode.connect(voiceGain);
    voiceGain.connect(audioCtx.destination);

    // Background Chain
    gainNode.connect(bgFilterLP);
    bgFilterLP.connect(bgGain);
    gainNode.connect(bgFilterHP);
    bgFilterHP.connect(bgGain);
    bgGain.connect(audioCtx.destination);

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
      let vig = box.querySelector('.vcc-vignette-layer');
      if(!vig) { vig = document.createElement('div'); vig.className = 'vcc-vignette-layer'; box.appendChild(vig); }
      vig.style.background = state.vignette > 0 ? `radial-gradient(circle, transparent ${100 - state.vignette}%, black 140%)` : 'none';
      let cross = box.querySelector('.vcc-crosshair');
      if(!cross) { cross = document.createElement('div'); cross.className = 'vcc-crosshair'; box.appendChild(cross); }
      cross.style.display = state.crosshair ? 'block' : 'none';
      let grid = box.querySelector('.vcc-grid-layer');
      if(!grid) { grid = document.createElement('div'); grid.className = 'vcc-grid-layer'; box.appendChild(grid); }
      grid.style.display = state.grid ? 'block' : 'none';
      let golden = box.querySelector('.vcc-golden-layer');
      if(!golden) { golden = document.createElement('div'); golden.className = 'vcc-golden-layer'; box.appendChild(golden); }
      golden.style.display = state.golden ? 'block' : 'none';
      let visCanvas = box.querySelector('.vcc-visualizer-layer');
      if(!visCanvas) { visCanvas = document.createElement('canvas'); visCanvas.className = 'vcc-visualizer-layer'; box.appendChild(visCanvas); }
      visCanvas.style.display = state.visualizer ? 'block' : 'none';
      let osd = box.querySelector('.vcc-osd-layer');
      if(!osd) { osd = document.createElement('div'); osd.className = 'vcc-osd-layer'; osd.innerText = "00:00:00"; box.appendChild(osd); }
      osd.style.display = state.osdTime ? 'block' : 'none';
  });

  videos.forEach(v => {
    if (Math.abs(v.playbackRate - state.speed) > 0.1) v.playbackRate = state.speed;
    v.style.filter = filterString; v.style.transform = transformString; v.style.objectFit = fitModes[state.fitMode];
    if(state.ultrawide) v.style.clipPath = "inset(12% 0 12% 0)"; else v.style.clipPath = "none";

    // AUDIO PROCESSING
    if(state.volume > 100 || state.bass !== 0 || state.treble !== 0 || state.delay !== 0 || state.norm || state.mono || state.visualizer || state.audioSplit) {
        if(!audioCtx) initAudio(v);
        if(audioCtx) {
           // 1. Standard Chain
           if(gainNode) gainNode.gain.value = state.volume / 100;
           if(bassNode) bassNode.gain.value = state.bass;
           if(trebleNode) trebleNode.gain.value = state.treble;
           if(delayNode) delayNode.delayTime.value = state.delay;
           if(compressorNode) {
               if(state.norm) { compressorNode.threshold.value = -50; compressorNode.knee.value = 40; compressorNode.ratio.value = 12; compressorNode.attack.value = 0; compressorNode.release.value = 0.25; } 
               else { compressorNode.threshold.value = 0; }
           }
           if(gainNode) { gainNode.channelCount = state.mono ? 1 : 2; gainNode.channelCountMode = state.mono ? 'explicit' : 'max'; }

           // 2. Routing Logic for Splitter
           if (state.audioSplit) {
               try { gainNode.disconnect(audioCtx.destination); } catch(e){}
               
               // Connect Voice Chain
               try {
                  gainNode.connect(voiceFilterHP1); // Enters chain here
                  // Gate logic happens in trackLoop
                  voiceGain.connect(audioCtx.destination);
               } catch(e){}

               // Connect BG Chain
               try {
                  gainNode.connect(bgFilterLP);
                  gainNode.connect(bgFilterHP);
                  bgGain.connect(audioCtx.destination);
               } catch(e){}

               voiceGain.gain.value = state.voiceVol / 100;
               bgGain.gain.value = state.bgVol / 100;

           } else {
               try { gainNode.connect(audioCtx.destination); } catch(e){}
               if(voiceGain) voiceGain.gain.value = 0;
               if(bgGain) bgGain.gain.value = 0;
           }
        }
    }
    if(state.loopA !== null && state.loopB !== null) { if(v.currentTime >= state.loopB) v.currentTime = state.loopA; }
  });
}

// --- ICON LOADER ---
const iconURL = chrome.runtime.getURL('icon128.png'); 
const overlays = new Map();
let tempCanvas = null;

// GATE STATE
let gateSmoothedVol = 0; // For smoothing the volume reading

function trackLoop() {
  const videos = document.querySelectorAll('video');

  // --- NOISE GATE LOGIC (Sidechained from Filtered Audio) ---
  if (state.audioSplit && gateAnalyser && gateNode) {
      const bufferLength = gateAnalyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      // NOTE: Now reading from gateAnalyser (filtered voice), NOT global analyser
      gateAnalyser.getByteTimeDomainData(dataArray);

      // 1. Calculate RMS Volume (Root Mean Square)
      let sum = 0;
      for(let i = 0; i < bufferLength; i++) {
          const x = (dataArray[i] - 128) / 128.0; // Normalize 0..1
          sum += x * x;
      }
      const rms = Math.sqrt(sum / bufferLength);

      // 2. Smooth volume to prevent jitter
      gateSmoothedVol = (gateSmoothedVol * 0.8) + (rms * 0.2);

      // 3. COMPARE TO THRESHOLD (LINEAR SCALE for predictability)
      // Slider 0-50 maps to 0.0 - 0.20 RMS
      const thresh = state.gateThreshold * 0.004; 
      
      const currentTime = audioCtx.currentTime;

      if(state.gateThreshold > 0) {
        if (gateSmoothedVol > thresh) {
           // OPEN GATE (Fast Attack)
           gateNode.gain.cancelScheduledValues(currentTime);
           gateNode.gain.setTargetAtTime(1.0, currentTime, 0.02); // 20ms attack
        } else {
           // CLOSE GATE (Slower Release - 200ms)
           gateNode.gain.cancelScheduledValues(currentTime);
           gateNode.gain.setTargetAtTime(0.0, currentTime, 0.2); // 200ms release
        }
      } else {
          // Gate Disabled
          gateNode.gain.value = 1.0;
      }
  }

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
      icon.style.width = '20px'; 
      icon.style.height = '20px'; 
      icon.style.backgroundSize = 'contain';
      icon.style.backgroundRepeat = 'no-repeat';
      icon.style.backgroundPosition = 'center';
      
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

    // FIX: Calculate Absolute Document Position (Scroll + Viewport)
    // This stops the overlay from "sliding" when you scroll.
    const rect = video.getBoundingClientRect();
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    
    box.style.top = (rect.top + scrollY) + 'px'; 
    box.style.left = (rect.left + scrollX) + 'px';
    box.style.width = rect.width + 'px'; 
    box.style.height = rect.height + 'px';
    
    // Icon pinned to top-left of the box
    const icon = box.querySelector('.vcc-icon');
    if(icon) { 
         icon.style.left = '15px'; 
         icon.style.top = '15px'; 
    }
    
    // VISUALIZER DRAW LOOP
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

    // GLOW EFFECT LOGIC
    if(state.rainbow) {
       const hue = (Date.now() / 10) % 360; 
       const color = `hsla(${hue}, 100%, 50%, 0.6)`;
       const border = `hsla(${hue}, 100%, 50%, 0.3)`;
       box.style.boxShadow = `0 0 100px 30px ${color}`;
       box.style.border = `1px solid ${border}`;
    } else if(state.ambient) {
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