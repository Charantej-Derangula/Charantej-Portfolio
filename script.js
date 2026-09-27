/**
 * CHARAN TEJ DERANGULA — EDITORIAL DATA SCIENCE PORTFOLIO
 * Vanilla JavaScript • High Performance • Accessibility Compliant
 * 
 * CONTINUOUS COMPUTATIONAL DATA ENVIRONMENT:
 * - 3 Depth Layers: Technical Grid (bg), Data-Flow Curves (mid), Nodes & Edges (fg)
 * - Continuous ambient evolution without user interaction
 * - Subtle localized elastic reaction to cursor (Standard OS cursor completely unchanged)
 * - Section-aware state modulation (Hero, Auto Pulse, About, Stack, Credentials, Contact)
 * - Respects prefers-reduced-motion & lightweight mobile optimizations
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initEditorialBackground();
  initNavigation();
  initCommandPalette();
  initScrollSpy();
  initBackToTop();
  initHeroScrollIndicator();
  initHeroParallax();
  initInteractiveCards();
  initContactReveal();
  initStackInteraction();
});

/* --------------------------------------------------------------------------
   1. THEME MANAGEMENT (Dark / Light)
   -------------------------------------------------------------------------- */
function initTheme() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const moonIcon = document.getElementById('themeMoonIcon');
  const sunIcon = document.getElementById('themeSunIcon');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const initialTheme = savedTheme ? savedTheme : (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  themeToggleBtn?.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    if (theme === 'light') {
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunIcon) sunIcon.style.display = 'block';
    } else {
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunIcon) sunIcon.style.display = 'none';
    }
    // Notify canvas of theme change
    window.redrawStaticCanvas?.();
  }

  // Expose toggle for Command Palette
  window.toggleTheme = function () {
    const currentTheme = html.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  };
}

/* --------------------------------------------------------------------------
   2. FLOWING STRING / FILAMENT FIELD BACKGROUND MOTION SYSTEM
   - Atmospheric field of elegant, continuously deforming flowing strings
   - Multi-harmonic procedural curves (silk threads / mathematical filaments)
   - 3 Depth Planes: Far (whisper faint), Mid (subtle), Near (slightly emphasized)
   - Continuous organic wave motion without loop boundaries (active immediately on load)
   - Bidirectional scroll reactivity (moves forward/upward on scroll down, returns on scroll up)
   - Velocity tracking: stretches and responds dynamically, gently settling to idle drift
   - Section-aware flow & density modulation across all 7 portfolio milestones
   - Occasional traveling luminous signal pulses along filaments (Rule 18)
   - Subtle supporting architectural drafting grid & ambient airborne micro-points
   - Full dark/light mode parity, zero custom cursor interference
   - 60+ FPS high-performance Canvas 2D, visibility-aware, prefers-reduced-motion compliant
   -------------------------------------------------------------------------- */
function initEditorialBackground() {
  const canvas = document.getElementById('editorialCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Accessibility: prefers-reduced-motion check
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isReducedMotion = motionQuery.matches;
  motionQuery.addEventListener('change', (e) => {
    isReducedMotion = e.matches;
    if (isReducedMotion) {
      drawStatic();
    } else {
      lastTimestamp = performance.now();
      animFrameId = requestAnimationFrame(renderLoop);
    }
  });

  // Device & viewport setup with High-DPI support
  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let isMobile = window.innerWidth < 768;

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    isMobile = window.innerWidth < 768;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initStrings();
    initParticles();
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });

  // Section-aware modulation configurations (Rule 12)
  const sectionProfiles = {
    hero:        { stringAlpha: 0.70, gridAlpha: 0.014, speedMult: 0.88 },
    about:       { stringAlpha: 0.85, gridAlpha: 0.016, speedMult: 0.95 },
    work:        { stringAlpha: 1.00, gridAlpha: 0.020, speedMult: 1.05 },
    hackathon:   { stringAlpha: 0.88, gridAlpha: 0.016, speedMult: 0.95 },
    approach:    { stringAlpha: 1.02, gridAlpha: 0.018, speedMult: 1.02 },
    strengths:   { stringAlpha: 1.02, gridAlpha: 0.018, speedMult: 1.02 },
    stack:       { stringAlpha: 0.92, gridAlpha: 0.022, speedMult: 0.88 },
    credentials: { stringAlpha: 0.72, gridAlpha: 0.014, speedMult: 0.82 },
    contact:     { stringAlpha: 0.58, gridAlpha: 0.010, speedMult: 0.75 }
  };

  const currentParams = { ...sectionProfiles.hero };
  let targetParams = { ...sectionProfiles.hero };

  window.updateCanvasSection = function (sectionId) {
    if (sectionProfiles[sectionId]) {
      targetParams = sectionProfiles[sectionId];
    }
  };

  // Continuous bidirectional scroll tracking with velocity & smooth interpolation
  let smoothScrollY = window.scrollY;
  let targetScrollY = window.scrollY;
  let lastCanvasScrollY = window.scrollY;
  let canvasVelocity = 0;
  let targetCanvasVelocity = 0;

  const onScroll = () => {
    targetScrollY = window.scrollY;
    const delta = Math.abs(window.scrollY - lastCanvasScrollY);
    targetCanvasVelocity = Math.min(delta, 35);
    lastCanvasScrollY = window.scrollY;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  // -------------------------------------------------------------------------
  // 1. FLOWING STRINGS / FILAMENT FIELD GENERATOR (Refined 18-Strand Architecture)
  // -------------------------------------------------------------------------
  let strings = [];

  function initStrings() {
    strings = [];
    // Density reduced by ~32%: 18 filaments on desktop, 8 on mobile (Rules 4, 51, 54)
    const count = isMobile ? 8 : 18;

    // Diverse, organic trajectories across composition avoiding direct center crowding
    const baseTrajectories = [
      // Upper diagonal flows (framing header and top metadata)
      { x1: -0.15, y1: 0.08, x2: 1.15, y2: 0.20 },
      { x1: -0.10, y1: 0.15, x2: 1.10, y2: 0.28 },
      { x1: -0.12, y1: 0.02, x2: 0.80, y2: 0.32 },

      // Left-margin swooping curves
      { x1: -0.10, y1: 0.25, x2: 0.60, y2: 0.82 },
      { x1: -0.06, y1: 0.40, x2: 0.70, y2: 0.96 },
      { x1: -0.12, y1: 0.52, x2: 0.50, y2: 1.10 },

      // Mid-transversal currents (passing below hero title, around CTA band)
      { x1: -0.15, y1: 0.60, x2: 1.15, y2: 0.68 },
      { x1: -0.10, y1: 0.70, x2: 1.12, y2: 0.78 },
      { x1: -0.08, y1: 0.50, x2: 1.15, y2: 0.54 },

      // Right-hand sweeping strands
      { x1: 0.40, y1: -0.05, x2: 1.15, y2: 0.62 },
      { x1: 0.50, y1: 0.16, x2: 1.18, y2: 0.82 },
      { x1: 0.30, y1: 0.32, x2: 1.15, y2: 0.98 },

      // Lower foundation strands (ambient depth in bottom regions)
      { x1: -0.12, y1: 0.84, x2: 1.15, y2: 0.88 },
      { x1: -0.15, y1: 0.94, x2: 1.12, y2: 0.96 },
      { x1: -0.10, y1: 0.76, x2: 0.88, y2: 1.10 },

      // Soft ascending counter-curves
      { x1: -0.08, y1: 0.86, x2: 0.82, y2: 0.44 },
      { x1: 0.18, y1: 1.05, x2: 1.15, y2: 0.52 },
      { x1: -0.12, y1: 0.64, x2: 0.92, y2: 0.26 }
    ];

    for (let i = 0; i < count; i++) {
      const traj = baseTrajectories[i % baseTrajectories.length];

      // 3 Depth Planes (Rule 8):
      // 60% Far (i < 11): very faint, slow, large broad curves
      // 30% Mid (11 <= i <= 15): subtle, medium speed, detailed curves
      // 10% Near (i >= 16): slightly emphasized, responsive
      let depth = 1;
      let baseAlpha = 0.038 + (i % 3) * 0.007; // ~0.038 - 0.052
      let lineWidth = 0.65;
      let parallax = 0.026;
      let amp1 = 36 + (i % 4) * 8;
      let amp2 = 14 + (i % 3) * 4;
      let amp3 = 5 + (i % 2) * 3;
      let speed1 = 0.00045 + (i % 4) * 0.00010; // 25 - 40s
      let speed2 = 0.00085 + (i % 3) * 0.00015;
      let speed3 = 0.0014 + (i % 2) * 0.0002;

      if (i >= 11 && i <= 15) {
        depth = 2;
        baseAlpha = 0.095 + (i % 3) * 0.015; // ~0.095 - 0.125
        lineWidth = 0.85;
        parallax = 0.065;
        amp1 = 46 + (i % 4) * 10;
        amp2 = 18 + (i % 3) * 5;
        amp3 = 7 + (i % 2) * 3;
        speed1 = 0.00095 + (i % 4) * 0.00018; // 14 - 22s
        speed2 = 0.0015 + (i % 3) * 0.00025;
        speed3 = 0.0024 + (i % 2) * 0.0003;
      } else if (i >= 16) {
        depth = 3;
        baseAlpha = 0.19 + (i % 2) * 0.025; // ~0.19 - 0.215
        lineWidth = 1.15;
        parallax = 0.125;
        amp1 = 56 + (i % 2) * 12;
        amp2 = 24 + (i % 2) * 6;
        amp3 = 9 + (i % 2) * 3.5;
        speed1 = 0.0014 + (i % 2) * 0.0003; // 9 - 15s
        speed2 = 0.0022 + (i % 2) * 0.0004;
        speed3 = 0.0034 + (i % 2) * 0.0005;
      }

      // Small jitter so duplicates on trajectory loop are offset
      const jitterY = ((i * 17) % 23 - 11) * 0.012;
      const jitterX = ((i * 13) % 19 - 9) * 0.015;

      // Restrained signature terracotta accent on exactly ~11% of strings (e.g. index 3 and 12)
      const isTerracotta = (i === 3 || i === 12);

      // Deterministic golden-ratio phase distribution for diverse initial forms on refresh
      const phase1 = (i * 1.6180339887) % (Math.PI * 2);
      const phase2 = (i * 2.7182818284) % (Math.PI * 2);
      const phase3 = (i * 3.1415926535) % (Math.PI * 2);

      strings.push({
        id: i,
        depth,
        x1Ratio: traj.x1 + jitterX,
        y1Ratio: traj.y1 + jitterY,
        x2Ratio: traj.x2 + jitterX,
        y2Ratio: traj.y2 + jitterY,
        amp1, amp2, amp3,
        freq1: 1.35 + (i % 4) * 0.30,
        freq2: 2.70 + (i % 3) * 0.50,
        freq3: 4.90 + (i % 3) * 0.75,
        speed1, speed2, speed3,
        phase1, phase2, phase3,
        baseAlpha,
        lineWidth: isMobile ? lineWidth * 0.85 : lineWidth,
        isTerracotta,
        parallaxFactor: parallax,
        segments: isMobile ? 40 : 56,
        currentPoints: []
      });
    }
  }

  // -------------------------------------------------------------------------
  // 2. OCCASIONAL SIGNAL EVENTS (Traveling luminous micro-pulses, Rule 14)
  // -------------------------------------------------------------------------
  let activePulses = [];
  let nextPulseTimer = 2200; // Spawns first pulse shortly after load

  function updatePulses(dt, velFactor) {
    nextPulseTimer -= dt;
    if (nextPulseTimer <= 0 && activePulses.length < 2 && strings.length > 0) {
      const eligible = strings.filter(s => s.depth >= 2);
      if (eligible.length > 0) {
        const targetStr = eligible[Math.floor(Math.random() * eligible.length)];
        activePulses.push({
          string: targetStr,
          u: 0,
          speed: (0.00028 + Math.random() * 0.00020), // 3.0 - 5.0s traversal
          isTerracotta: targetStr.isTerracotta || Math.random() < 0.25,
          size: 1.25 + Math.random() * 0.50
        });
      }
      nextPulseTimer = 7000 + Math.random() * 7500; // Calm interval: every 7 - 14.5s
    }

    // Advance pulses
    for (let i = activePulses.length - 1; i >= 0; i--) {
      const p = activePulses[i];
      p.u += p.speed * dt * velFactor;
      if (p.u >= 1) {
        activePulses.splice(i, 1);
      }
    }
  }

  // -------------------------------------------------------------------------
  // 3. AMBIENT PARTICLES (Subtle airborne atmospheric dust, Layer 4)
  // -------------------------------------------------------------------------
  let particles = [];

  function initParticles() {
    const count = isMobile ? 8 : 14;
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.06,
        radius: 0.85 + Math.random() * 0.65,
        baseAlpha: 0.12 + Math.random() * 0.20,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.0005 + Math.random() * 0.001,
        depth: 0.035 + Math.random() * 0.05,
        isTerracotta: Math.random() < 0.15
      });
    }
  }

  resizeCanvas();

  // -------------------------------------------------------------------------
  // RENDER PIPELINE
  // -------------------------------------------------------------------------
  let animFrameId = null;
  let lastTimestamp = performance.now();

  function render(time) {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const dt = Math.min(time - lastTimestamp, 50); // Clamped delta time (ms)
    lastTimestamp = time;

    // Smoothly interpolate scroll position (Bidirectional: scrolling up or down)
    smoothScrollY += (targetScrollY - smoothScrollY) * 0.075;
    canvasVelocity += (targetCanvasVelocity - canvasVelocity) * 0.08;
    targetCanvasVelocity *= 0.93; // Gently settles to 0 when scroll stops
    const velInfluence = 1 + canvasVelocity * 0.012;

    // Smoothly interpolate section modulation parameters
    currentParams.stringAlpha += (targetParams.stringAlpha - currentParams.stringAlpha) * 0.04;
    currentParams.gridAlpha += (targetParams.gridAlpha - currentParams.gridAlpha) * 0.04;
    currentParams.speedMult += (targetParams.speedMult - currentParams.speedMult) * 0.04;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Color definitions based on active theme
    const gridRgb = isDark ? '255, 255, 255' : '80, 70, 60';
    const stringNeutralRgb = isDark ? '220, 222, 230' : '85, 75, 68';
    const stringAccentRgb = isDark ? '217, 119, 6' : '194, 95, 18';

    // Ambient time shifts for continuous organic motion even when stationary
    const timeShiftX = Math.sin(time * 0.00012) * 6;
    const timeShiftY = Math.cos(time * 0.00009) * 6;

    // -----------------------------------------------------------------------
    // LAYER A: FINE EDITORIAL GRID (Subtle Background Architecture)
    // -----------------------------------------------------------------------
    const cellSize = isMobile ? 54 : 64;
    const scrollOffsetY = (smoothScrollY * 0.018 * velInfluence) % cellSize;
    const gridOffsetX = (timeShiftX % cellSize + cellSize) % cellSize;
    const gridOffsetY = ((timeShiftY - scrollOffsetY) % cellSize + cellSize) % cellSize;

    ctx.lineWidth = 0.5;
    ctx.strokeStyle = 'rgba(' + gridRgb + ', ' + currentParams.gridAlpha + ')';

    ctx.beginPath();
    for (let x = gridOffsetX; x <= width; x += cellSize) {
      ctx.moveTo(Math.floor(x) + 0.5, 0);
      ctx.lineTo(Math.floor(x) + 0.5, height);
    }
    for (let y = gridOffsetY; y <= height; y += cellSize) {
      ctx.moveTo(0, Math.floor(y) + 0.5);
      ctx.lineTo(width, Math.floor(y) + 0.5);
    }
    ctx.stroke();

    // Occasional subtle micro intersection ticks
    const tickStep = cellSize * (isMobile ? 3 : 4);
    const tickAlpha = currentParams.gridAlpha * 1.5;
    ctx.lineWidth = 0.75;
    ctx.strokeStyle = 'rgba(' + (isDark ? '255, 255, 255' : '70, 60, 52') + ', ' + tickAlpha + ')';
    ctx.beginPath();
    for (let tx = (gridOffsetX % tickStep); tx <= width; tx += tickStep) {
      for (let ty = (gridOffsetY % tickStep); ty <= height; ty += tickStep) {
        const cx = Math.floor(tx) + 0.5;
        const cy = Math.floor(ty) + 0.5;
        ctx.moveTo(cx - 3, cy);
        ctx.lineTo(cx + 3, cy);
        ctx.moveTo(cx, cy - 3);
        ctx.lineTo(cx, cy + 3);
      }
    }
    ctx.stroke();

    // -----------------------------------------------------------------------
    // LAYER B: PRIMARY VISUAL — FLOWING STRING / FILAMENT FIELD
    // -----------------------------------------------------------------------
    for (let i = 0; i < strings.length; i++) {
      const s = strings[i];
      const points = [];
      const x1 = s.x1Ratio * width;
      const y1 = s.y1Ratio * height;
      const x2 = s.x2Ratio * width;
      const y2 = s.y2Ratio * height;

      const dx = x2 - x1;
      const dy = y2 - y1;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;

      const parallaxShift = smoothScrollY * s.parallaxFactor * velInfluence;

      for (let j = 0; j <= s.segments; j++) {
        const u = j / s.segments;
        const bx = x1 + dx * u;
        const by = y1 + dy * u;

        // Multi-harmonic wave deformation (organic silk fluid motion)
        const w1 = Math.sin(u * s.freq1 + time * s.speed1 * currentParams.speedMult + s.phase1) * s.amp1;
        const w2 = Math.cos(u * s.freq2 - time * s.speed2 * currentParams.speedMult + s.phase2) * s.amp2;
        const w3 = Math.sin(u * s.freq3 + time * s.speed3 * currentParams.speedMult + s.phase3) * s.amp3;

        // Envelope: soft natural taper at endpoints
        const env = Math.sin(Math.PI * u) ** 0.65;
        const totalDisp = (w1 + w2 + w3) * env * velInfluence;

        points.push({
          x: bx + nx * totalDisp,
          y: by + ny * totalDisp - parallaxShift
        });
      }

      s.currentPoints = points;

      // Draw continuous silky spline
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let j = 1; j < points.length - 1; j++) {
        const mx = (points[j].x + points[j + 1].x) * 0.5;
        const my = (points[j].y + points[j + 1].y) * 0.5;
        ctx.quadraticCurveTo(points[j].x, points[j].y, mx, my);
      }
      ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

      // Tapered opacity gradient along strand
      const pStart = points[0];
      const pEnd = points[points.length - 1];
      const grad = ctx.createLinearGradient(pStart.x, pStart.y, pEnd.x, pEnd.y);

      // Quiet zone suppression behind hero text (Rule 52 & 53)
      const midPoint = points[Math.floor(points.length / 2)];
      const inHeroCenter = (smoothScrollY < height * 0.45) &&
                           (midPoint.x > width * 0.22 && midPoint.x < width * 0.78) &&
                           (midPoint.y > height * 0.18 && midPoint.y < height * 0.58);
      const quietMultiplier = inHeroCenter ? 0.65 : 1.0;

      const alpha = s.baseAlpha * currentParams.stringAlpha * quietMultiplier;
      const rgb = s.isTerracotta ? stringAccentRgb : stringNeutralRgb;

      grad.addColorStop(0, 'rgba(' + rgb + ', 0)');
      grad.addColorStop(0.12, 'rgba(' + rgb + ', ' + (alpha * 0.75).toFixed(3) + ')');
      grad.addColorStop(0.50, 'rgba(' + rgb + ', ' + alpha.toFixed(3) + ')');
      grad.addColorStop(0.88, 'rgba(' + rgb + ', ' + (alpha * 0.75).toFixed(3) + ')');
      grad.addColorStop(1, 'rgba(' + rgb + ', 0)');

      ctx.strokeStyle = grad;
      ctx.lineWidth = s.lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    // -----------------------------------------------------------------------
    // LAYER C: OCCASIONAL SIGNAL PULSES (Rule 18)
    // -----------------------------------------------------------------------
    updatePulses(dt, velInfluence);

    for (let i = 0; i < activePulses.length; i++) {
      const pulse = activePulses[i];
      const pts = pulse.string.currentPoints;
      if (!pts || pts.length < 2) continue;

      const exactIdx = pulse.u * (pts.length - 1);
      const idx0 = Math.floor(exactIdx);
      const idx1 = Math.min(idx0 + 1, pts.length - 1);
      const f = exactIdx - idx0;

      const px = pts[idx0].x + (pts[idx1].x - pts[idx0].x) * f;
      const py = pts[idx0].y + (pts[idx1].y - pts[idx0].y) * f;

      const env = Math.sin(Math.PI * pulse.u);
      const pulseAlpha = Math.min(0.70, env * 0.85 * currentParams.stringAlpha);
      if (pulseAlpha <= 0.01) continue;

      const rgb = pulse.isTerracotta ? stringAccentRgb : (isDark ? '245, 245, 255' : '65, 55, 48');

      // Soft glow aura
      ctx.beginPath();
      ctx.arc(px, py, pulse.size * 2.2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + rgb + ', ' + (pulseAlpha * 0.22).toFixed(3) + ')';
      ctx.fill();

      // Core bead
      ctx.beginPath();
      ctx.arc(px, py, pulse.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + rgb + ', ' + pulseAlpha.toFixed(3) + ')';
      ctx.fill();

      // Trailing micro tail (3 subtle points)
      for (let t = 1; t <= 3; t++) {
        const trailU = Math.max(0, pulse.u - t * 0.016);
        const tExact = trailU * (pts.length - 1);
        const t0 = Math.floor(tExact);
        const t1 = Math.min(t0 + 1, pts.length - 1);
        const tf = tExact - t0;
        const tx = pts[t0].x + (pts[t1].x - pts[t0].x) * tf;
        const ty = pts[t0].y + (pts[t1].y - pts[t0].y) * tf;
        const tAlpha = pulseAlpha * (1 - t * 0.28);

        ctx.beginPath();
        ctx.arc(tx, ty, Math.max(0.6, pulse.size * (1 - t * 0.22)), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + rgb + ', ' + tAlpha.toFixed(3) + ')';
        ctx.fill();
      }
    }

    // -----------------------------------------------------------------------
    // LAYER D: SUBTLE AIRBORNE MICRO-DUST (Layer 4)
    // -----------------------------------------------------------------------
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x += width;
      if (p.x > width) p.x -= width;
      if (p.y < 0) p.y += height * 2;
      if (p.y > height * 2) p.y -= height * 2;

      const scrollShift = smoothScrollY * p.depth * velInfluence;
      const screenY = ((p.y - scrollShift + timeShiftY * 0.5) % height + height) % height;
      const screenX = ((p.x + timeShiftX * 0.4) % width + width) % width;

      const breathing = 0.75 + 0.25 * Math.sin(time * p.pulseSpeed + p.pulsePhase);
      const dotAlpha = p.baseAlpha * breathing * (currentParams.stringAlpha / 0.85);
      const color = p.isTerracotta ? stringAccentRgb : (isDark ? '240, 240, 245' : '65, 55, 50');

      ctx.beginPath();
      ctx.arc(screenX, screenY, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + color + ', ' + dotAlpha.toFixed(3) + ')';
      ctx.fill();
    }
  }

  // Animation frame loop
  function renderLoop(time) {
    if (isReducedMotion) return;
    render(time);
    animFrameId = requestAnimationFrame(renderLoop);
  }

  function drawStatic() {
    render(16000);
  }

  // Redraw hook for instant theme change
  window.redrawStaticCanvas = function () {
    if (isReducedMotion) {
      drawStatic();
    }
  };

  // Pause when tab is hidden, resume when tab is active (High Performance)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animFrameId) cancelAnimationFrame(animFrameId);
    } else {
      if (!isReducedMotion) {
        lastTimestamp = performance.now();
        animFrameId = requestAnimationFrame(renderLoop);
      }
    }
  });

  if (!isReducedMotion) {
    animFrameId = requestAnimationFrame(renderLoop);
  } else {
    drawStatic();
  }
}

/* --------------------------------------------------------------------------
   3. NAVIGATION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const topNav = document.getElementById('topNav');
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Shrink navigation on scroll
  const onNavScroll = () => {
    if (window.scrollY > 40) {
      topNav?.classList.add('is-scrolled');
    } else {
      topNav?.classList.remove('is-scrolled');
    }
  };
  window.addEventListener('scroll', onNavScroll, { passive: true });
  onNavScroll();

  function openDrawer() {
    mobileDrawer?.classList.add('open');
    mobileNavToggle?.setAttribute('aria-expanded', 'true');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer?.classList.remove('open');
    mobileNavToggle?.setAttribute('aria-expanded', 'false');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  mobileNavToggle?.addEventListener('click', () => {
    const isOpen = mobileDrawer?.classList.contains('open');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });
}

/* --------------------------------------------------------------------------
   4. ACTIVE SECTION SCROLL SPY & CANVAS SECTION NOTIFIER
   -------------------------------------------------------------------------- */
/* --------------------------------------------------------------------------
   4. ACTIVE SECTION SCROLL SPY & BIDIRECTIONAL SCROLL ENGINE
   - Bidirectional (top-to-bottom and bottom-to-top) reversible states
   - Normalized section scroll progress (0 -> 1)
   - Interactive large watermark numbers (emerge, strengthen at active, fade on exit)
   - Real-time active row centering for 04 / How I Build
   - Direction detection (data-scroll-direction: down/up)
   - Global reading progress bar
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const scrollElements = document.querySelectorAll('.scroll-reveal, section[data-scroll-section]');
  const readingProgressBar = document.getElementById('scrollReadingProgress');
  const pillarRows = document.querySelectorAll('.pillar-row');

  // 1. Navigation link highlighting and continuous canvas profile sync
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });

          // Inform continuous computational canvas of active section
          window.updateCanvasSection?.(currentId);
        }
      });
    },
    {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    }
  );

  sections.forEach((sec) => navObserver.observe(sec));

  // 2. Reversible Bidirectional Scroll Reveal Observer
  // Downward scroll: elements reveal naturally.
  // Upward scroll: elements reverse naturally.
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          entry.target.classList.add('in-view');
        } else {
          // Leave viewport: remove active state so it reverses when navigating both directions
          if (entry.target.id !== 'hero') {
            entry.target.classList.remove('is-visible');
            entry.target.classList.remove('in-view');
          }
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -6% 0px',
      threshold: 0.08
    }
  );

  scrollElements.forEach((el) => revealObserver.observe(el));

  // 3. Real Bidirectional Scroll Progress Engine
  let lastScrollY = window.scrollY;
  let scrollDirection = 'down';

  // Manual hover interaction on pillar rows
  pillarRows.forEach((row) => {
    row.addEventListener('pointerenter', () => {
      pillarRows.forEach((r) => r.classList.remove('is-active'));
      row.classList.add('is-active');
    });
  });

  function updateScrollProgress() {
    const scrollY = window.scrollY;
    const winH = window.innerHeight;
    const docH = document.documentElement.scrollHeight - winH;

    // Detect bidirectional scroll direction
    if (scrollY > lastScrollY + 2) {
      if (scrollDirection !== 'down') {
        scrollDirection = 'down';
        document.documentElement.setAttribute('data-scroll-direction', 'down');
      }
    } else if (scrollY < lastScrollY - 2) {
      if (scrollDirection !== 'up') {
        scrollDirection = 'up';
        document.documentElement.setAttribute('data-scroll-direction', 'up');
      }
    }
    lastScrollY = scrollY;

    // Global reading progress bar
    if (readingProgressBar && docH > 0) {
      const ratio = Math.min(1, Math.max(0, scrollY / docH));
      readingProgressBar.style.transform = `scaleX(${ratio.toFixed(4)})`;
    }

    // Section-by-section progress & watermark interpolation
    sections.forEach((sec) => {
      const rect = sec.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < winH) {
        // Normalized progress: 0 when top enters bottom of viewport, 1 when bottom exits top
        const totalTravel = winH + rect.height;
        const progress = Math.max(0, Math.min(1, (winH - rect.top) / totalTravel));
        sec.style.setProperty('--scroll-progress', progress.toFixed(3));

        // Subtle watermark response (peaking around 0.45-0.65)
        const watermark = sec.querySelector('.section-bg-watermark');
        if (watermark) {
          const centerDist = Math.abs(progress - 0.52);
          const centerFactor = Math.max(0, 1 - centerDist * 2.2);
          const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
          const baseAlpha = isDark ? 0.020 : 0.035;
          const peakAlpha = isDark ? 0.055 : 0.075;
          const currentAlpha = baseAlpha + centerFactor * (peakAlpha - baseAlpha);
          const subtleShiftY = (progress - 0.5) * 30; // max +/- 15px

          watermark.style.opacity = currentAlpha.toFixed(3);
          watermark.style.transform = `translateY(${subtleShiftY.toFixed(1)}px)`;
        }
      }
    });

    // 04 / HOW I BUILD: Active row focus based on viewport center
    const approachSection = document.getElementById('approach');
    if (approachSection && pillarRows.length) {
      const appRect = approachSection.getBoundingClientRect();
      if (appRect.top < winH * 0.85 && appRect.bottom > winH * 0.15) {
        const centerY = winH * 0.5;
        let closestRow = null;
        let minDistance = Infinity;

        pillarRows.forEach((row) => {
          const r = row.getBoundingClientRect();
          const rowCenter = r.top + r.height / 2;
          const dist = Math.abs(rowCenter - centerY);
          if (dist < minDistance) {
            minDistance = dist;
            closestRow = row;
          }
        });

        if (closestRow) {
          pillarRows.forEach((r) => {
            if (r === closestRow) {
              r.classList.add('is-active');
            } else {
              r.classList.remove('is-active');
            }
          });
        }
      }
    }
  }

  window.addEventListener('scroll', () => {
    requestAnimationFrame(updateScrollProgress);
  }, { passive: true });

  // Initial trigger
  updateScrollProgress();
}

/* --------------------------------------------------------------------------
   5. COMMAND PALETTE (⌘K / Ctrl+K)
   -------------------------------------------------------------------------- */
function initCommandPalette() {
  const cmdModal = document.getElementById('cmdModal');
  const cmdPaletteBtn = document.getElementById('cmdPaletteBtn');
  const cmdInput = document.getElementById('cmdInput');
  const cmdOptions = document.querySelectorAll('.cmd-option');

  let selectedIndex = 0;

  function openPalette() {
    cmdModal?.classList.add('open');
    cmdModal?.setAttribute('aria-hidden', 'false');
    cmdInput?.focus();
    if (cmdInput) cmdInput.value = '';
    filterOptions('');
    selectedIndex = 0;
    updateSelection();
  }

  function closePalette() {
    cmdModal?.classList.remove('open');
    cmdModal?.setAttribute('aria-hidden', 'true');
  }

  cmdPaletteBtn?.addEventListener('click', openPalette);

  // Close when clicking outside dialog
  cmdModal?.addEventListener('click', (e) => {
    if (e.target === cmdModal) {
      closePalette();
    }
  });

  // Global Keyboard shortcut: ⌘K or Ctrl+K
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal?.classList.contains('open')) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === 'Escape' && cmdModal?.classList.contains('open')) {
      closePalette();
    }
  });

  // Input filter
  cmdInput?.addEventListener('input', (e) => {
    filterOptions(e.target.value.toLowerCase().trim());
  });

  function filterOptions(query) {
    cmdOptions.forEach((option) => {
      const text = option.textContent?.toLowerCase() || '';
      if (!query || text.includes(query)) {
        option.style.display = 'flex';
      } else {
        option.style.display = 'none';
      }
    });

    selectedIndex = 0;
    updateSelection();
  }

  // Keyboard navigation inside modal
  cmdInput?.addEventListener('keydown', (e) => {
    const visible = Array.from(cmdOptions).filter((opt) => opt.style.display !== 'none');
    if (visible.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % visible.length;
      updateSelection();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + visible.length) % visible.length;
      updateSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (visible[selectedIndex]) {
        executeOption(visible[selectedIndex]);
      }
    }
  });

  function updateSelection() {
    const visible = Array.from(cmdOptions).filter((opt) => opt.style.display !== 'none');
    visible.forEach((opt, idx) => {
      if (idx === selectedIndex) {
        opt.classList.add('selected');
        opt.scrollIntoView({ block: 'nearest' });
      } else {
        opt.classList.remove('selected');
      }
    });
  }

  // Click on option
  cmdOptions.forEach((option) => {
    option.addEventListener('click', () => {
      executeOption(option);
    });
  });

  function executeOption(option) {
    const action = option.getAttribute('data-action');
    closePalette();

    if (action === 'nav') {
      const target = option.getAttribute('data-target');
      if (target) {
        const el = document.querySelector(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action === 'resume') {
      window.open('/Charan-Tej-Derangula-Resume.pdf', '_blank', 'noopener,noreferrer');
    } else if (action === 'theme') {
      if (window.toggleTheme) window.toggleTheme();
    } else if (action === 'link') {
      const url = option.getAttribute('data-url');
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    }
  }
}

/* --------------------------------------------------------------------------
   6. FLOATING ACTION BUTTON (Back to Top)
   -------------------------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTopBtn');
  if (!btn) return;

  const onScroll = () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   7. HERO SCROLL INDICATOR (Editorial Nudge, Auto Fade-out on Scroll)
   -------------------------------------------------------------------------- */
function initHeroScrollIndicator() {
  const scrollWrapper = document.getElementById('heroScrollWrapper');
  const scrollIndicator = document.getElementById('heroScrollIndicator');
  if (!scrollWrapper) return;

  // Smooth scroll to #about when clicked
  scrollIndicator?.addEventListener('click', (e) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Smoothly fade out when scrolling past hero
  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 140) {
      scrollWrapper.style.opacity = '0';
      scrollWrapper.style.pointerEvents = 'none';
      scrollWrapper.style.transform = 'translateY(12px)';
    } else {
      const opacity = Math.max(0, 1 - (scrollY / 110));
      scrollWrapper.style.opacity = opacity.toString();
      scrollWrapper.style.pointerEvents = opacity < 0.2 ? 'none' : 'auto';
      scrollWrapper.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   7b. HERO BIDIRECTIONAL SCROLL RESPONSE (Rule 21)
   - Name subtly recedes, supporting text shifts, metadata recedes
   - Reconstructs naturally when scrolling back up with no sudden reset
   -------------------------------------------------------------------------- */
function initHeroParallax() {
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motionQuery.matches) return;

  const heroName = document.querySelector('.hero-name-mark');
  const heroNarrative = document.querySelector('.hero-narrative-col');
  const heroMeta = document.querySelector('.hero-editorial-meta-bar');
  if (!heroName && !heroNarrative) return;

  const onHeroScroll = () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    if (scrollY > heroHeight * 1.25) return;

    const progress = Math.min(1, Math.max(0, scrollY / (heroHeight * 0.85)));

    if (heroName) {
      heroName.style.transform = `translate3d(0, ${(scrollY * 0.12).toFixed(1)}px, 0)`;
      heroName.style.opacity = Math.max(0, 1 - progress * 0.40).toFixed(3);
    }
    if (heroNarrative) {
      heroNarrative.style.transform = `translate3d(0, ${(scrollY * 0.07).toFixed(1)}px, 0)`;
      heroNarrative.style.opacity = Math.max(0, 1 - progress * 0.50).toFixed(3);
    }
    if (heroMeta) {
      heroMeta.style.transform = `translate3d(0, ${(scrollY * 0.035).toFixed(1)}px, 0)`;
      heroMeta.style.opacity = Math.max(0, 1 - progress * 0.60).toFixed(3);
    }
  };

  window.addEventListener('scroll', onHeroScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   8. INTERACTIVE CARDS & LOCALIZED CURSOR SPOTLIGHT
   - Cursor position tracking within card boundaries (--mouse-x, --mouse-y)
   - Proximity awareness for interactive card groups
   - Zero custom cursor (OS cursor 100% untouched)
   - Touch devices disabled, lightweight & battery friendly
   -------------------------------------------------------------------------- */
function initInteractiveCards() {
  // Respect touch devices and reduced-motion preferences
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasFinePointer) return;

  const cardGroups = document.querySelectorAll('.interactive-card-group');
  const standaloneCards = document.querySelectorAll('.interactive-card:not(.interactive-card-group .interactive-card)');

  // 1. Group-level Proximity & Localized Tracking
  cardGroups.forEach((group) => {
    const cards = Array.from(group.querySelectorAll('.interactive-card'));
    if (!cards.length) return;

    const onGroupPointerMove = (e) => {
      let nearestCard = null;

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const rect = card.getBoundingClientRect();

        // Check if pointer is directly inside the card
        const isInside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (isInside) {
          nearestCard = card;
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
          card.style.setProperty('--card-glow-opacity', '1');
          card.classList.add('is-hovered');
        } else {
          // Calculate distance from pointer to card perimeter
          const dx = Math.max(rect.left - e.clientX, 0, e.clientX - rect.right);
          const dy = Math.max(rect.top - e.clientY, 0, e.clientY - rect.bottom);
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Subtle proximity reaction if cursor is within 60px of the card
          if (dist < 60 && !nearestCard) {
            const proximityFactor = (1 - dist / 60) * 0.35;
            card.style.setProperty('--card-glow-opacity', proximityFactor.toString());
            const clampX = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
            const clampY = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
            card.style.setProperty('--mouse-x', `${clampX}px`);
            card.style.setProperty('--mouse-y', `${clampY}px`);
          } else {
            card.style.setProperty('--card-glow-opacity', '0');
            card.classList.remove('is-hovered');
          }
        }
      }
    };

    const onGroupPointerLeave = () => {
      cards.forEach((card) => {
        card.style.setProperty('--card-glow-opacity', '0');
        card.classList.remove('is-hovered');
      });
    };

    group.addEventListener('pointermove', onGroupPointerMove, { passive: true });
    group.addEventListener('pointerleave', onGroupPointerLeave, { passive: true });
  });

  // 2. Standalone Cards (not in a group)
  standaloneCards.forEach((card) => {
    const onPointerMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.setProperty('--card-glow-opacity', '1');
      card.classList.add('is-hovered');
    };

    const onPointerLeave = () => {
      card.style.setProperty('--card-glow-opacity', '0');
      card.classList.remove('is-hovered');
    };

    card.addEventListener('pointerenter', onPointerMove, { passive: true });
    card.addEventListener('pointermove', onPointerMove, { passive: true });
    card.addEventListener('pointerleave', onPointerLeave, { passive: true });
  });
}



/* --------------------------------------------------------------------------
   10. CONTACT HEADLINE STAGED TYPOGRAPHIC REVEAL
   -------------------------------------------------------------------------- */
function initContactReveal() {
  const headline = document.getElementById('contactHeadline');
  if (!headline) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        headline.classList.add('is-revealed');
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(headline);
}

/* --------------------------------------------------------------------------
   11. TECH STACK TAXONOMY HOVER ILLUMINATION
   -------------------------------------------------------------------------- */
function initStackInteraction() {
  const stackRows = document.querySelectorAll('.stack-editorial-row');
  stackRows.forEach(row => {
    const pills = row.querySelectorAll('.stack-pill');
    pills.forEach(pill => {
      pill.addEventListener('pointerenter', () => {
        row.classList.add('is-highlighted');
      });
      pill.addEventListener('pointerleave', () => {
        row.classList.remove('is-highlighted');
      });
    });
  });
}

