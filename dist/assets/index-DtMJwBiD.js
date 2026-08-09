(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&o(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();function M(e,t,n,o,a,i){const d=t.width/t.height,l=a/i;let f,u,h,g;d>l?(g=t.height,h=g*l,f=(t.width-h)/2,u=0):(h=t.width,g=h/l,f=0,u=(t.height-g)/2),e.drawImage(t,f,u,h,g,n,o,a,i)}function b(e,t,n,o,a,i){const d=Math.min(i,o/2,a/2);e.beginPath(),e.moveTo(t+d,n),e.arcTo(t+o,n,t+o,n+a,d),e.arcTo(t+o,n+a,t,n+a,d),e.arcTo(t,n+a,t,n,d),e.arcTo(t,n,t+o,n,d),e.closePath()}function S(e,t,n,o,a,i){const d=e.createLinearGradient(t,n,o,a);for(const[l,f]of i)d.addColorStop(l,f);return d}function q(e,t,n,o,a,i){const d=t.split(/\s+/);let l="",f=o;for(const u of d){const h=l?`${l} ${u}`:u;e.measureText(h).width>a&&l?(e.fillText(l,n,f),l=u,f+=i):l=h}return l&&e.fillText(l,n,f),f}function T(e,t="image/png",n=.95){return new Promise((o,a)=>{e.toBlob(i=>i?o(i):a(new Error("Export failed")),t,n)})}function V(e,t){const n=URL.createObjectURL(e),o=document.createElement("a");o.href=n,o.download=t,o.click(),URL.revokeObjectURL(n)}const c={teal:"#0A4D4E",tealLight:"#1B8A6B",coral:"#FF6B4A",gold:"#FFB347",magenta:"#E040FB",cream:"#FFF8F0",night:"#062F30"},p=1080,v=72,C=p-v*2;async function Z(e,t={}){const n=document.createElement("canvas");n.width=p,n.height=p;const o=n.getContext("2d");return J(o),K(o,e),Q(o,t),ee(o,t),n}function J(e){const t=S(e,0,0,p,p,[[0,c.night],[.35,c.teal],[.7,"#0E6364"],[1,c.tealLight]]);e.fillStyle=t,e.fillRect(0,0,p,p),e.globalAlpha=.12;for(let n=0;n<8;n++)e.fillStyle=n%2?c.coral:c.gold,e.beginPath(),e.arc(120+n*110,80+n%3*40,60+n*8,0,Math.PI*2),e.fill();e.globalAlpha=1}function K(e,t){const n=p/2,o=p/2-20,a=C/2-8;e.save(),b(e,n-a,o-a,a*2,a*2,a),e.clip(),M(e,t,n-a,o-a,a*2,a*2),e.restore(),e.strokeStyle=c.cream,e.lineWidth=6,e.beginPath(),e.arc(n,o,a,0,Math.PI*2),e.stroke()}function Q(e,t){const n=S(e,0,0,p,p,[[0,c.coral],[.3,c.gold],[.6,c.magenta],[1,c.coral]]);e.lineWidth=v-12,e.strokeStyle=n,e.beginPath(),e.arc(p/2,p/2-20,C/2+(v-12)/2,0,Math.PI*2),e.stroke(),e.lineWidth=8,e.setLineDash([18,14]),e.strokeStyle="rgba(255,248,240,0.35)",e.beginPath(),e.arc(p/2,p/2-20,C/2+v/2-4,0,Math.PI*2),e.stroke(),e.setLineDash([]),t.palm&&(e.globalAlpha=.85,e.drawImage(t.palm,40,p-280,100,125),e.save(),e.translate(p-40,p-280),e.scale(-1,1),e.drawImage(t.palm,0,0,100,125),e.restore(),e.globalAlpha=1),x(e)}function x(e){const t=[[v+20,v+20],[p-v-20,v+20],[v+20,p-v-20],[p-v-20,p-v-20]];for(const[n,o]of t)e.fillStyle=c.gold,e.beginPath(),e.arc(n,o,10,0,Math.PI*2),e.fill(),e.fillStyle=c.coral,e.beginPath(),e.arc(n,o,5,0,Math.PI*2),e.fill()}function ee(e,t){const n=p-130;e.fillStyle="rgba(6,47,48,0.92)",b(e,48,n,p-96,100,24),e.fill(),e.strokeStyle=c.coral,e.lineWidth=3,b(e,48,n,p-96,100,24),e.stroke(),t.logo&&e.drawImage(t.logo,72,n+18,64,64),e.textAlign="left",e.fillStyle=c.cream,e.font="800 52px Syne, sans-serif",e.fillText("FRAME IN GOA",160,n+52),e.font="600 28px Outfit, sans-serif",e.fillStyle=c.gold,e.fillText("HH GOA 2026",160,n+88),e.textAlign="right",e.font="800 22px Outfit, sans-serif",e.fillStyle=c.magenta,e.fillText("#FrameInGoa",p-72,n+70),t.wave&&(e.globalAlpha=.9,e.drawImage(t.wave,48,n-28,p-96,36),e.globalAlpha=1)}const F=["Sunset Architect","Wave Coder","Palm Tree Pioneer","Goa Grid Guardian","Monsoon Maker","Beach Stack Surfer","Tropical Tech Nomad","Frame Lord","Hackathon Hero","Coastal Creator","Neon Navigator","Sandcastle Engineer","Tide Turner","Coconut Compiler","Shoreline Shipper","Paradise Builder","Reef Wrangler","Banyan Branch Manager","Funky Full-Stacker","Goa Glow Getter"],te={react:"Component Surfer",node:"Backend Beachcomber",python:"Snake Charmer",rust:"Memory Safe Mariner",go:"Goroutine Guru",design:"Pixel Palm Artist",ai:"Neural Nomad",mobile:"Pocket Pioneer",devops:"Pipeline Pirate",fullstack:"Full-Tide Developer"};function ne(e){let t=0;for(let n=0;n<e.length;n++)t=(t<<5)-t+e.charCodeAt(n);return Math.abs(t)}function W(e,t){const n=(t||"").toLowerCase();for(const[a,i]of Object.entries(te))if(n.includes(a))return i;const o=ne(`${e}|${t}`);return F[o%F.length]}const m=1080,w=1350;async function ae(e,{name:t,stack:n,builderTitle:o},a={}){const i=o||W(t,n),d=document.createElement("canvas");d.width=m,d.height=w;const l=d.getContext("2d");return oe(l),re(l),ie(l,e),se(l,{name:t,stack:n,title:i}),le(l,a),de(l,a),d}function oe(e){const t=S(e,0,0,m,w,[[0,"#FF6B4A"],[.25,"#FFB347"],[.5,"#E040FB"],[.75,"#1B8A6B"],[1,"#0A4D4E"]]);e.fillStyle=t,e.fillRect(0,0,m,w),e.fillStyle="rgba(255,248,240,0.08)";for(let n=0;n<12;n++)for(let o=0;o<8;o++)(n+o)%2===0&&(e.beginPath(),e.arc(o*140+70,n*120+60,40,0,Math.PI*2),e.fill());e.fillStyle=c.cream,b(e,40,100,m-80,w-160,48),e.fill(),e.strokeStyle=c.teal,e.lineWidth=6,b(e,40,100,m-80,w-160,48),e.stroke()}function re(e){e.fillStyle=c.teal,b(e,m/2-60,0,120,130,20),e.fill(),e.fillStyle=c.night,b(e,m/2-28,108,56,36,12),e.fill(),e.strokeStyle=c.gold,e.lineWidth=4,e.beginPath(),e.moveTo(m/2-80,0),e.quadraticCurveTo(m/2-120,200,80,280),e.stroke(),e.beginPath(),e.moveTo(m/2+80,0),e.quadraticCurveTo(m/2+120,200,m-80,280),e.stroke()}function ie(e,t){const a=m-240,i=520;e.save(),b(e,120,200,a,i,32),e.clip();const d=S(e,120,200,120+a,200+i,[[0,c.teal],[1,c.tealLight]]);e.fillStyle=d,e.fillRect(120,200,a,i),M(e,t,120,200,a,i),e.restore(),e.strokeStyle=c.coral,e.lineWidth=8,b(e,120,200,a,i,32),e.stroke(),e.fillStyle=c.magenta,e.font="800 20px Outfit, sans-serif",e.textAlign="center",e.fillText("BUILDER",m/2,200+i+36)}function se(e,{name:t,stack:n,title:o}){const a=(t||"Anonymous Builder").toUpperCase(),i=n||"Full-Stack Dreamer";e.textAlign="center",e.fillStyle=c.teal,e.font="800 64px Syne, sans-serif";const d=820;e.measureText(a).width>m-160&&(e.font="800 48px Syne, sans-serif"),q(e,a,m/2,d,m-160,58),e.fillStyle=c.coral,e.font="600 32px Outfit, sans-serif",e.fillText(i,m/2,920);const l=Math.min(m-120,e.measureText(o).width+80),f=(m-l)/2,u=960;e.fillStyle=S(e,f,u,f+l,u+70,[[0,c.gold],[1,c.coral]]),b(e,f,u,l,70,35),e.fill(),e.fillStyle=c.night,e.font="800 28px Outfit, sans-serif",e.fillText(o,m/2,u+46),e.strokeStyle="rgba(10,77,78,0.2)",e.lineWidth=2,e.setLineDash([12,8]),e.beginPath(),e.moveTo(100,1060),e.lineTo(m-100,1060),e.stroke(),e.setLineDash([])}function le(e,t){t.logo&&e.drawImage(t.logo,m/2-40,1100,80,80),e.textAlign="center",e.fillStyle=c.teal,e.font="800 36px Syne, sans-serif",e.fillText("HH GOA 2026",m/2,1220),e.font="600 24px Outfit, sans-serif",e.fillStyle=c.tealLight,e.fillText("Frame in Goa · Official Builder Badge",m/2,1260)}function de(e,t){t.palm&&(e.globalAlpha=.35,e.drawImage(t.palm,50,w-220,70,88),e.save(),e.translate(m-50,w-220),e.scale(-1,1),e.drawImage(t.palm,0,0,70,88),e.restore(),e.globalAlpha=1),e.fillStyle=c.magenta;for(let n=0;n<5;n++)e.beginPath(),e.arc(80+n*230,140+n%2*20,6,0,Math.PI*2),e.fill()}const ce="modulepreload",ue=function(e){return"/"+e},D={},pe=function(t,n,o){let a=Promise.resolve();if(n&&n.length>0){let d=function(u){return Promise.all(u.map(h=>Promise.resolve(h).then(g=>({status:"fulfilled",value:g}),g=>({status:"rejected",reason:g}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),f=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));a=d(n.map(u=>{if(u=ue(u),u in D)return;D[u]=!0;const h=u.endsWith(".css"),g=h?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${g}`))return;const y=document.createElement("link");if(y.rel=h?"stylesheet":ce,h||(y.as="script"),y.crossOrigin="",y.href=u,f&&y.setAttribute("nonce",f),document.head.appendChild(y),h)return new Promise((I,Y)=>{y.addEventListener("load",I),y.addEventListener("error",()=>Y(new Error(`Unable to preload CSS for ${u}`)))})}))}function i(d){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=d,window.dispatchEvent(l),!l.defaultPrevented)throw d}return a.then(d=>{for(const l of d||[])l.status==="rejected"&&i(l.reason);return t().catch(i)})};async function me(e){let t=e;if(fe(e)){const o=(await pe(async()=>{const{default:i}=await import("./heic2any-DQxJzxPi.js").then(d=>d.h);return{default:i}},[])).default,a=await o({blob:e,toType:"image/jpeg",quality:.92});t=Array.isArray(a)?a[0]:a}const n=URL.createObjectURL(t);try{return await z(n)}finally{URL.revokeObjectURL(n)}}function fe(e){var o,a;const t=((o=e.type)==null?void 0:o.toLowerCase())??"",n=((a=e.name)==null?void 0:a.toLowerCase())??"";return t==="image/heic"||t==="image/heif"||n.endsWith(".heic")||n.endsWith(".heif")}function z(e){return new Promise((t,n)=>{const o=new Image;o.crossOrigin="anonymous",o.onload=()=>t(o),o.onerror=()=>n(new Error("Could not load image")),o.src=e})}function L(e){return z(e)}const he="image/jpeg,image/png,image/webp,image/gif,image/heic,image/heif,.heic,.heif",N="I'm framing in Goa! 🌴 Just made my HH Goa 2026 graphic — come build with us. #FrameInGoa";function ge(){return N}async function U(e){const t=new FormData;t.append("image",e,"frame-in-goa.png");const n=await fetch("/api/share",{method:"POST",body:t});if(!n.ok)throw new Error("Share upload failed");return n.json()}function ve(e){const t=new URLSearchParams({text:N,url:e});window.open(`https://twitter.com/intent/tweet?${t}`,"_blank","noopener,noreferrer")}async function ye(e,t){const n=ge();if(navigator.share&&navigator.canShare){const i={files:[new File([e],"frame-in-goa.png",{type:"image/png"})],text:n};if(navigator.canShare(i))try{return await navigator.share(i),{method:"native"}}catch(d){if(d.name==="AbortError")return{method:"cancelled"}}}let o=t==null?void 0:t.url;return o||(o=(await U(e)).url),ve(o),{method:"twitter-intent",url:o}}async function be(e){try{return await U(e)}catch{return null}}const H={rotation:0,zoom:1,brightness:100,contrast:100,saturation:100,blur:0,grayscale:0,hue:0,offsetX:0,offsetY:0};function E(e={}){return{...H,...e}}async function A(e,t=H){const n=E(t),o=2200,a=document.createElement("canvas");a.width=o,a.height=o;const i=a.getContext("2d");i.clearRect(0,0,o,o);const d=n.rotation*Math.PI/180,l=n.zoom,f=e.width,u=e.height,h=f*l,g=u*l,y=n.offsetX*14,I=n.offsetY*14;return i.save(),i.translate(o/2+y,o/2+I),i.rotate(d),i.filter=we(n),i.drawImage(e,-h/2,-g/2,h,g),i.restore(),a}function we(e){return[`brightness(${e.brightness}%)`,`contrast(${e.contrast}%)`,`saturate(${e.saturation}%)`,`grayscale(${e.grayscale}%)`,`hue-rotate(${e.hue}deg)`,`blur(${e.blur}px)`].join(" ")}const Se=document.getElementById("app");let r={mode:"pfp",photo:null,photoFile:null,editedPhoto:null,editorState:E(),mouseControl:"brightness",mouseDragActive:!1,mouseDragStartX:0,mouseDragStartValue:0,name:"",stack:"",canvas:null,shareMeta:null,generating:!1},B={};Se.innerHTML=`
  <div class="page">
    <header class="hero">
      <div class="hero-badge">HH GOA 2026</div>
      <h1>Frame in Goa</h1>
      <p class="hero-sub">Create polished event graphics with a modern editor, smart framing, and instant exports.</p>
    </header>

    <div class="mode-tabs" role="tablist">
      <button type="button" class="mode-tab active" data-mode="pfp" role="tab" aria-selected="true">
        <span class="tab-icon">◉</span>
        PFP Frame
      </button>
      <button type="button" class="mode-tab" data-mode="card" role="tab" aria-selected="false">
        <span class="tab-icon">▣</span>
        Builder ID Card
      </button>
    </div>

    <main class="workspace">
      <section class="panel upload-panel">
        <label class="dropzone" id="dropzone">
          <input type="file" id="file-input" accept="${he}" hidden />
          <div class="dropzone-inner" id="dropzone-inner">
            <div class="drop-icon">📸</div>
            <p class="drop-title">Drop your photo here</p>
            <p class="drop-hint">JPG · PNG · HEIC · tap to browse</p>
          </div>
          <img id="upload-preview" class="upload-preview hidden" alt="Your photo preview" />
        </label>

        <div class="editor-panel hidden" id="editor-panel">
          <div class="editor-head">
            <h3>Photo editor</h3>
            <div class="editor-actions">
              <button type="button" class="btn btn-link" id="btn-reset-editor">Reset</button>
              <span>Crop, rotate, and fine-tune</span>
            </div>
          </div>
          <div class="mouse-controls">
            <div class="mouse-controls-head">
              <span>Mouse drag</span>
              <small>Drag on the preview to change the selected control</small>
            </div>
            <div class="mouse-control-chips">
              <button type="button" class="mouse-control-chip active" data-mouse-control="brightness">Brightness</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="contrast">Contrast</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="saturation">Saturation</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="blur">Blur</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="grayscale">Grayscale</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="hue">Hue</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="rotation">Rotation</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="zoom">Zoom</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="offsetX">Shift X</button>
              <button type="button" class="mouse-control-chip" data-mouse-control="offsetY">Shift Y</button>
            </div>
          </div>
          <div class="control-group">
            <label class="control-row">
              <span>Rotate</span>
              <input type="range" id="range-rotation" min="-180" max="180" value="0" />
            </label>
            <label class="control-row">
              <span>Zoom</span>
              <input type="range" id="range-zoom" min="0.8" max="2.2" step="0.01" value="1" />
            </label>
            <label class="control-row">
              <span>Brightness</span>
              <input type="range" id="range-brightness" min="50" max="150" value="100" />
            </label>
            <label class="control-row">
              <span>Contrast</span>
              <input type="range" id="range-contrast" min="50" max="150" value="100" />
            </label>
            <label class="control-row">
              <span>Saturation</span>
              <input type="range" id="range-saturation" min="0" max="200" value="100" />
            </label>
            <label class="control-row">
              <span>Blur</span>
              <input type="range" id="range-blur" min="0" max="8" step="0.1" value="0" />
            </label>
            <label class="control-row">
              <span>Grayscale</span>
              <input type="range" id="range-grayscale" min="0" max="100" value="0" />
            </label>
            <label class="control-row">
              <span>Hue</span>
              <input type="range" id="range-hue" min="-180" max="180" value="0" />
            </label>
            <label class="control-row">
              <span>Shift X</span>
              <input type="range" id="range-offsetx" min="-10" max="10" value="0" />
            </label>
            <label class="control-row">
              <span>Shift Y</span>
              <input type="range" id="range-offsety" min="-10" max="10" value="0" />
            </label>
          </div>
        </div>

        <div class="fields card-fields hidden" id="card-fields">
          <label class="field">
            <span>Your name</span>
            <input type="text" id="input-name" placeholder="Alex Rivera" maxlength="40" autocomplete="name" />
          </label>
          <label class="field">
            <span>Stack / role</span>
            <input type="text" id="input-stack" placeholder="React · Node · Design" maxlength="50" />
          </label>
          <p class="title-preview">Builder title: <strong id="title-preview">—</strong></p>
        </div>
      </section>

      <section class="panel result-panel">
        <div class="result-header">
          <h2>Your graphic</h2>
          <span class="result-status" id="result-status">Upload a photo to start</span>
        </div>

        <div class="canvas-wrap" id="canvas-wrap">
          <div class="canvas-placeholder" id="canvas-placeholder">
            <div class="placeholder-art"></div>
            <p>Preview appears instantly as you style your image</p>
          </div>
          <canvas id="preview-canvas" class="hidden"></canvas>
        </div>

        <div class="actions hidden" id="actions">
          <button type="button" class="btn btn-primary" id="btn-download">
            <span>↓</span> Download
          </button>
          <button type="button" class="btn btn-x" id="btn-share">
            <span>𝕏</span> Share on X
          </button>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>No login · No wait · <strong>#FrameInGoa</strong></p>
    </footer>
  </div>
`;const s={dropzone:document.getElementById("dropzone"),fileInput:document.getElementById("file-input"),uploadPreview:document.getElementById("upload-preview"),dropzoneInner:document.getElementById("dropzone-inner"),cardFields:document.getElementById("card-fields"),inputName:document.getElementById("input-name"),inputStack:document.getElementById("input-stack"),titlePreview:document.getElementById("title-preview"),editorPanel:document.getElementById("editor-panel"),canvasWrap:document.getElementById("canvas-wrap"),canvasPlaceholder:document.getElementById("canvas-placeholder"),previewCanvas:document.getElementById("preview-canvas"),resultStatus:document.getElementById("result-status"),actions:document.getElementById("actions"),mouseControlButtons:Array.from(document.querySelectorAll(".mouse-control-chip")),btnDownload:document.getElementById("btn-download"),btnShare:document.getElementById("btn-share"),btnResetEditor:document.getElementById("btn-reset-editor"),modeTabs:document.querySelectorAll(".mode-tab"),editorControls:{rotation:document.getElementById("range-rotation"),zoom:document.getElementById("range-zoom"),brightness:document.getElementById("range-brightness"),contrast:document.getElementById("range-contrast"),saturation:document.getElementById("range-saturation"),blur:document.getElementById("range-blur"),grayscale:document.getElementById("range-grayscale"),hue:document.getElementById("range-hue"),offsetX:document.getElementById("range-offsetx"),offsetY:document.getElementById("range-offsety")}};async function Ee(){B=await Pe(),Ie()}async function Pe(){const[e,t,n]=await Promise.all([L("/assets/logo-mark.svg").catch(()=>null),L("/assets/wave-divider.svg").catch(()=>null),L("/assets/palm-accent.svg").catch(()=>null)]);return{logo:e,wave:t,palm:n}}function Ie(){s.modeTabs.forEach(e=>{e.addEventListener("click",()=>Le(e.dataset.mode))}),s.fileInput.addEventListener("change",e=>{var n;const t=(n=e.target.files)==null?void 0:n[0];t&&O(t)}),s.dropzone.addEventListener("dragover",e=>{e.preventDefault(),s.dropzone.classList.add("dragover")}),s.dropzone.addEventListener("dragleave",()=>s.dropzone.classList.remove("dragover")),s.dropzone.addEventListener("drop",e=>{var n;e.preventDefault(),s.dropzone.classList.remove("dragover");const t=(n=e.dataTransfer.files)==null?void 0:n[0];t&&O(t)});for(const e of[s.inputName,s.inputStack])e.addEventListener("input",()=>{r.name=s.inputName.value.trim(),r.stack=s.inputStack.value.trim(),Oe(),r.photo&&P()});s.btnDownload.addEventListener("click",Me),s.btnShare.addEventListener("click",We),s.btnResetEditor.addEventListener("click",De),Object.entries(s.editorControls).forEach(([e,t])=>{t.addEventListener("input",()=>{r.editorState[e]=parseFloat(t.value),r.photo&&_()})}),s.mouseControlButtons.forEach(e=>{e.addEventListener("click",()=>Ce(e.dataset.mouseControl))}),s.canvasWrap.addEventListener("pointerdown",Be),s.canvasWrap.addEventListener("wheel",Ae,{passive:!1}),document.addEventListener("pointermove",Te),document.addEventListener("pointerup",R),document.addEventListener("pointercancel",R)}function Le(e){r.mode=e,s.modeTabs.forEach(t=>{const n=t.dataset.mode===e;t.classList.toggle("active",n),t.setAttribute("aria-selected",String(n))}),s.cardFields.classList.toggle("hidden",e!=="card"),r.photo&&P()}function Ce(e){r.mouseControl=e,s.mouseControlButtons.forEach(t=>{t.classList.toggle("active",t.dataset.mouseControl===e)})}function Be(e){!r.photo||e.button!==0||(r.mouseDragActive=!0,r.mouseDragStartX=e.clientX,r.mouseDragStartValue=$(r.mouseControl),s.canvasWrap.classList.add("dragging"),e.preventDefault())}function Te(e){if(!r.mouseDragActive||!r.photo)return;const t=e.clientX-r.mouseDragStartX,n=ke(r.mouseDragStartValue,t,r.mouseControl,e.shiftKey);j(r.mouseControl,n),e.preventDefault()}function R(e){var t,n;r.mouseDragActive&&(r.mouseDragActive=!1,s.canvasWrap.classList.remove("dragging"),e.pointerId!==void 0&&((n=(t=s.canvasWrap).releasePointerCapture)==null||n.call(t,e.pointerId)))}function Ae(e){if(!r.photo)return;const t=e.deltaY>0?-.05:.05,n=$("zoom");j("zoom",k(n+t,.8,2.2)),e.preventDefault()}function $(e){return r.editorState[e]}function j(e,t){const n=s.editorControls[e];if(!n)return;const o=parseFloat(n.min),a=parseFloat(n.max),i=n.step?parseFloat(n.step):1,d=k(t,o,a),l=i>0?Fe(d,i):d;r.editorState[e]=l,n.value=l,r.photo&&_()}function ke(e,t,n,o){const a=s.editorControls[n];if(!a)return e;const i=parseFloat(a.min),d=parseFloat(a.max),l=d-i,f=o?.35:1,u=t/320*l*f;return k(e+u,i,d)}function Fe(e,t){var a;const n=((a=String(t).split(".")[1])==null?void 0:a.length)||0,o=Math.pow(10,n);return Math.round(e*o)/o}function k(e,t,n){return Math.min(n,Math.max(t,e))}async function De(){r.editorState=E(),Object.entries(s.editorControls).forEach(([e,t])=>{t.value=r.editorState[e]}),r.photo&&(r.editedPhoto=await A(r.photo,r.editorState),P())}async function _(){r.photo&&(r.editedPhoto=await A(r.photo,r.editorState),P())}let G;function P(){clearTimeout(G),G=setTimeout(X,80)}function Re(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height,t.getContext("2d").drawImage(e,0,0),s.uploadPreview.src=t.toDataURL("image/jpeg",.85)}async function O(e){if(!e.type.startsWith("image/")&&!e.name.match(/\.heic$/i)&&!e.name.match(/\.heif$/i)){s.resultStatus.textContent="Please upload an image file";return}s.resultStatus.textContent="Loading photo…";try{r.photo=await me(e),r.photoFile=e,r.shareMeta=null,r.editorState=E(),Object.entries(s.editorControls).forEach(([t,n])=>{n.value=r.editorState[t]}),Re(r.photo),s.uploadPreview.classList.remove("hidden"),s.dropzoneInner.classList.add("hidden"),s.editorPanel.classList.remove("hidden"),r.editedPhoto=await A(r.photo,r.editorState),await X()}catch(t){console.error(t),s.resultStatus.textContent="Could not load that image. Try JPG or PNG."}}async function X(){if(!(!r.photo||r.generating)){r.generating=!0,s.resultStatus.textContent="Generating…";try{const e=r.editedPhoto||r.photo;let t;r.mode==="pfp"?t=await Z(e,B):t=await ae(e,{name:r.name,stack:r.stack},B),r.canvas=t,Ge(t),s.resultStatus.textContent="Ready!",s.actions.classList.remove("hidden");const n=await T(t);be(n).then(o=>{r.shareMeta=o})}catch(e){console.error(e),s.resultStatus.textContent="Generation failed — try another photo"}finally{r.generating=!1}}}function Ge(e){const t=s.previewCanvas;t.width=e.width,t.height=e.height,t.classList.remove("hidden"),s.canvasPlaceholder.classList.add("hidden");const n=t.getContext("2d");n.clearRect(0,0,t.width,t.height),n.drawImage(e,0,0),s.canvasWrap.dataset.aspect=e.width===e.height?"square":"portrait"}function Oe(){if(r.mode!=="card")return;const e=W(r.name||"Builder",r.stack);s.titlePreview.textContent=e}async function Me(){if(!r.canvas)return;const e=await T(r.canvas),t=r.mode==="pfp"?"hh-goa-pfp":"hh-goa-badge";V(e,`${t}-2026.png`)}async function We(){if(r.canvas){s.btnShare.disabled=!0,s.resultStatus.textContent="Opening share…";try{const e=await T(r.canvas),t=await ye(e,r.shareMeta);t.method==="cancelled"?s.resultStatus.textContent="Ready!":t.method==="native"?s.resultStatus.textContent="Shared!":s.resultStatus.textContent="Tweet composer opened — your link has the preview image"}catch(e){console.error(e),s.resultStatus.textContent="Share failed — try downloading instead"}finally{s.btnShare.disabled=!1}}}Ee();
