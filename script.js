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
  initDataCanvas();
  initNavigation();
  initCommandPalette();
  initScrollSpy();
  initBackToTop();
  initHeroScrollIndicator();
  initInteractiveCards();
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
   2. CONTINUOUS COMPUTATIONAL DATA ENVIRONMENT
   -------------------------------------------------------------------------- */
function initDataCanvas() {
  const canvas = document.getElementById('dataCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Accessibility: prefers-reduced-motion check
  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isReducedMotion = mediaQuery.matches;
  mediaQuery.addEventListener('change', (e) => {
    isReducedMotion = e.matches;
    if (isReducedMotion) {
      drawStatic();
    } else {
      requestAnimationFrame(renderLoop);
    }
  });

  // Device & viewport setup with High-DPI support
  let width = window.innerWidth;
  let height = window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Re-seed anchors proportionally
    reseedNodeAnchors();
  }

  window.addEventListener('resize', resizeCanvas);

  const isMobile = window.innerWidth < 768;
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Section-aware modulation configurations
  const sectionProfiles = {
    hero: {
      curveAlpha: 0.065,
      curveCount: 3,
      networkAlpha: 0.045,
      nodeSpeed: 1.0,
      connectDistance: 135,
      gridAlpha: 0.03,
      pulseSpeed: 1.0,
      telemetrySignalActive: false
    },
    about: { // Calm, contemplative
      curveAlpha: 0.045,
      curveCount: 2,
      networkAlpha: 0.035,
      nodeSpeed: 0.7,
      connectDistance: 115,
      gridAlpha: 0.025,
      pulseSpeed: 0.65,
      telemetrySignalActive: false
    },
    work: { // Auto Pulse Case Study: heightened network/telemetry activity
      curveAlpha: 0.085,
      curveCount: 3,
      networkAlpha: 0.07,
      nodeSpeed: 1.2,
      connectDistance: 160,
      gridAlpha: 0.042,
      pulseSpeed: 1.35,
      telemetrySignalActive: true
    },
    hackathon: { // Focused, energetic technical pulse
      curveAlpha: 0.075,
      curveCount: 3,
      networkAlpha: 0.06,
      nodeSpeed: 1.15,
      connectDistance: 150,
      gridAlpha: 0.045,
      pulseSpeed: 1.2,
      telemetrySignalActive: false
    },
    strengths: { // Structured, steady engineering rhythm
      curveAlpha: 0.05,
      curveCount: 2,
      networkAlpha: 0.04,
      nodeSpeed: 0.8,
      connectDistance: 125,
      gridAlpha: 0.04,
      pulseSpeed: 0.85,
      telemetrySignalActive: false
    },
    stack: { // Structured, technical grid motion
      curveAlpha: 0.055,
      curveCount: 2,
      networkAlpha: 0.04,
      nodeSpeed: 0.8,
      connectDistance: 125,
      gridAlpha: 0.058, // More visible technical grid
      pulseSpeed: 0.75,
      telemetrySignalActive: false
    },
    credentials: { // Algorithmic clarity
      curveAlpha: 0.05,
      curveCount: 2,
      networkAlpha: 0.045,
      nodeSpeed: 0.85,
      connectDistance: 130,
      gridAlpha: 0.035,
      pulseSpeed: 0.9,
      telemetrySignalActive: false
    },
    contact: { // Quiet, minimal ambient drift
      curveAlpha: 0.035,
      curveCount: 2,
      networkAlpha: 0.025,
      nodeSpeed: 0.5,
      connectDistance: 105,
      gridAlpha: 0.02,
      pulseSpeed: 0.45,
      telemetrySignalActive: false
    }
  };

  const currentParams = { ...sectionProfiles.hero };
  let targetParams = { ...sectionProfiles.hero };

  window.updateCanvasSection = function (sectionId) {
    if (sectionProfiles[sectionId]) {
      targetParams = sectionProfiles[sectionId];
    }
  };

  // -------------------------------------------------------------------------
  // MOUSE INFLUENCE & FIELD ELASTICITY
  // Standard OS cursor is untouched; field reacts with slight delay and easing.
  // -------------------------------------------------------------------------
  let mouseRawX = width * 0.5;
  let mouseRawY = height * 0.5;
  let mouseSmoothX = width * 0.5;
  let mouseSmoothY = height * 0.5;
  let isMousePresent = false;
  let mouseActivity = 0; // Decays when cursor remains stationary

  if (!isTouchDevice && !isReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;
      mouseRawX = e.clientX;
      mouseRawY = e.clientY;
      isMousePresent = true;
      mouseActivity = 1.0;
    }, { passive: true });

    window.addEventListener('mouseleave', () => {
      isMousePresent = false;
    });
  }

  // -------------------------------------------------------------------------
  // LAYER 2 DATA: CONTINUOUS DATA-FLOW CURVES & STREAM SIGNALS
  // -------------------------------------------------------------------------
  const flowCurves = [
    {
      baseYRel: 0.32,
      freq1: 0.0022,
      freq2: 0.0011,
      speed1: 0.00032,
      speed2: 0.00018,
      amp1: 34,
      amp2: 18,
      depth: 0.45,
      pulses: [
        { progress: 0.18, speed: 0.00045, size: 2.2, accent: true },
        { progress: 0.68, speed: 0.00035, size: 1.8, accent: false }
      ]
    },
    {
      baseYRel: 0.54,
      freq1: 0.0018,
      freq2: 0.0031,
      speed1: 0.00028,
      speed2: 0.00042,
      amp1: 42,
      amp2: 24,
      depth: 0.55,
      pulses: [
        { progress: 0.38, speed: 0.00052, size: 2.4, accent: true },
        { progress: 0.88, speed: 0.00038, size: 1.8, accent: false }
      ]
    },
    {
      baseYRel: 0.76,
      freq1: 0.0015,
      freq2: 0.0026,
      speed1: 0.00022,
      speed2: 0.00034,
      amp1: 36,
      amp2: 20,
      depth: 0.4,
      pulses: [
        { progress: 0.52, speed: 0.00042, size: 2.0, accent: false }
      ]
    }
  ];

  // Evaluate curve Y at a given X with harmonics and cursor deflection
  function getCurveY(x, curve, time, parallaxY) {
    const baseY = height * curve.baseYRel + parallaxY * curve.depth;
    let y = baseY +
      Math.sin(x * curve.freq1 + time * curve.speed1) * curve.amp1 +
      Math.cos(x * curve.freq2 - time * curve.speed2) * curve.amp2;

    // Smooth Gaussian cursor deflection if within range
    if (!isTouchDevice && mouseActivity > 0.05) {
      const dx = x - mouseSmoothX;
      const range = 180;
      if (Math.abs(dx) < range) {
        const factor = Math.cos((dx / range) * (Math.PI / 2)) * mouseActivity;
        const dy = (mouseSmoothY - baseY) * 0.08 * factor;
        y += dy;
      }
    }
    return y;
  }

  // -------------------------------------------------------------------------
  // LAYER 3 DATA: STRUCTURED COMPUTATIONAL NODES & DYNAMIC EDGES
  // -------------------------------------------------------------------------
  const nodeCount = isMobile ? 12 : 30;
  const nodes = [];

  function createNode(index) {
    const radius = Math.random() * 1.4 + 1.2;
    // Typology: 60% point, 20% cross (+), 20% micro-ring (o)
    let type = 'point';
    if (index % 5 === 0) type = 'cross';
    else if (index % 5 === 1) type = 'ring';

    return {
      normX: Math.random(),
      normY: Math.random(),
      anchorX: 0,
      anchorY: 0,
      currX: 0,
      currY: 0,
      orbitRx: Math.random() * 22 + 8,
      orbitRy: Math.random() * 22 + 8,
      freqX: (Math.random() * 0.0004 + 0.0002) * (Math.random() < 0.5 ? 1 : -1),
      freqY: (Math.random() * 0.0004 + 0.0002) * (Math.random() < 0.5 ? 1 : -1),
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
      radius: radius,
      depth: 0.7 + (radius / 2.6) * 0.3,
      type: type,
      isAccent: index % 6 === 0,
      displaceX: 0,
      displaceY: 0
    };
  }

  function reseedNodeAnchors() {
    for (let i = 0; i < nodeCount; i++) {
      if (!nodes[i]) {
        nodes.push(createNode(i));
      }
      nodes[i].anchorX = nodes[i].normX * width;
      nodes[i].anchorY = nodes[i].normY * height;
    }
  }

  reseedNodeAnchors();
  resizeCanvas();

  // Active packet gliding along network edges
  const edgePulses = [
    { sourceIdx: 0, targetIdx: 1, progress: 0.1, speed: 0.006, active: true },
    { sourceIdx: 4, targetIdx: 5, progress: 0.6, speed: 0.005, active: true }
  ];

  // -------------------------------------------------------------------------
  // MAIN DRAW ROUTINE
  // -------------------------------------------------------------------------
  let globalTime = 0;

  function render(time) {
    globalTime = time;
    ctx.clearRect(0, 0, width, height);

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    // Restrained Theme Palette
    const accentColor = isDark ? '#d97706' : '#b45309';
    const accentRgb = isDark ? '217, 119, 6' : '180, 83, 9';
    const neutralRgb = isDark ? '255, 255, 255' : '36, 30, 24'; // Warm charcoal ink in light theme
    const alphaMult = isDark ? 1.0 : 1.45; // Enhanced visibility for light theme while maintaining subtlety

    // Interpolate section parameters smoothly
    currentParams.curveAlpha += (targetParams.curveAlpha - currentParams.curveAlpha) * 0.025;
    currentParams.networkAlpha += (targetParams.networkAlpha - currentParams.networkAlpha) * 0.025;
    currentParams.nodeSpeed += (targetParams.nodeSpeed - currentParams.nodeSpeed) * 0.025;
    currentParams.connectDistance += (targetParams.connectDistance - currentParams.connectDistance) * 0.025;
    currentParams.gridAlpha += (targetParams.gridAlpha - currentParams.gridAlpha) * 0.025;
    currentParams.pulseSpeed += (targetParams.pulseSpeed - currentParams.pulseSpeed) * 0.025;

    // Smooth cursor interpolation & activity decay
    if (!isTouchDevice && !isReducedMotion) {
      mouseSmoothX += (mouseRawX - mouseSmoothX) * 0.04;
      mouseSmoothY += (mouseRawY - mouseSmoothY) * 0.04;
      if (!isMousePresent) {
        mouseActivity = Math.max(0, mouseActivity - 0.025);
      } else {
        mouseActivity = Math.max(0.08, mouseActivity - 0.002);
      }
    } else {
      mouseActivity = 0;
    }

    const parallaxX = isTouchDevice ? 0 : ((mouseSmoothX / width) - 0.5) * 16 * mouseActivity;
    const parallaxY = isTouchDevice ? 0 : ((mouseSmoothY / height) - 0.5) * 16 * mouseActivity;

    // -----------------------------------------------------------------------
    // LAYER 1: FINE TECHNICAL GRID & COORDINATE TICKS (Background Depth ~0.2)
    // -----------------------------------------------------------------------
    const gridStep = isMobile ? 120 : 96;
    const gridShiftX = ((time * 0.015) + parallaxX * 0.2) % gridStep;
    const gridShiftY = ((time * 0.008) + parallaxY * 0.2) % gridStep;

    ctx.save();
    ctx.strokeStyle = `rgba(${neutralRgb}, ${currentParams.gridAlpha * alphaMult})`;
    ctx.fillStyle = `rgba(${neutralRgb}, ${currentParams.gridAlpha * 0.8 * alphaMult})`;
    ctx.lineWidth = 0.75;

    const crossArm = 2.5;
    const startX = -gridStep + gridShiftX;
    const startY = -gridStep + gridShiftY;

    for (let x = startX; x < width + gridStep; x += gridStep) {
      for (let y = startY; y < height + gridStep; y += gridStep) {
        // Draw coordinate tick cross (+)
        ctx.beginPath();
        ctx.moveTo(x - crossArm, y);
        ctx.lineTo(x + crossArm, y);
        ctx.moveTo(x, y - crossArm);
        ctx.lineTo(x, y + crossArm);
        ctx.stroke();

        // Sparse structural micro-points at 3x3 intervals
        const cIdx = Math.round(x / gridStep);
        const rIdx = Math.round(y / gridStep);
        if (cIdx % 3 === 0 && rIdx % 3 === 0) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();

    // -----------------------------------------------------------------------
    // LAYER 2: CONTINUOUS DATA-FLOW CURVES & STREAM SIGNALS (Middle Depth ~0.5)
    // -----------------------------------------------------------------------
    const activeCurveCount = isMobile ? 1 : (targetParams.curveCount || 2);

    for (let c = 0; c < activeCurveCount; c++) {
      const curve = flowCurves[c];

      // Draw continuous stream curve
      ctx.beginPath();
      ctx.strokeStyle = `rgba(${neutralRgb}, ${currentParams.curveAlpha * alphaMult})`;
      ctx.lineWidth = 1;

      const sampleStep = isMobile ? 24 : 16;
      for (let x = 0; x <= width + sampleStep; x += sampleStep) {
        const y = getCurveY(x, curve, time, parallaxY);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Flowing data signal pulses traveling along this curve
      for (let p = 0; p < curve.pulses.length; p++) {
        const pulse = curve.pulses[p];
        if (!isReducedMotion) {
          pulse.progress = (pulse.progress + pulse.speed * currentParams.pulseSpeed) % 1;
        }

        const headX = pulse.progress * width;
        const headY = getCurveY(headX, curve, time, parallaxY);

        // Draw pulse head
        ctx.beginPath();
        ctx.arc(headX, headY, pulse.size, 0, Math.PI * 2);
        if (pulse.accent || currentParams.telemetrySignalActive) {
          ctx.fillStyle = `rgba(${accentRgb}, ${isDark ? 0.75 : 0.85})`;
        } else {
          ctx.fillStyle = `rgba(${neutralRgb}, ${isDark ? 0.5 : 0.65})`;
        }
        ctx.fill();

        // Subtle fading tail (3 points back along the curve)
        for (let t = 1; t <= 3; t++) {
          const tailProgress = pulse.progress - (t * 0.008);
          if (tailProgress > 0) {
            const tailX = tailProgress * width;
            const tailY = getCurveY(tailX, curve, time, parallaxY);
            const tailAlpha = (1 - (t / 4)) * (isDark ? 0.35 : 0.45);
            ctx.beginPath();
            ctx.arc(tailX, tailY, pulse.size * (1 - t * 0.2), 0, Math.PI * 2);
            ctx.fillStyle = pulse.accent
              ? `rgba(${accentRgb}, ${tailAlpha})`
              : `rgba(${neutralRgb}, ${tailAlpha})`;
            ctx.fill();
          }
        }
      }
    }

    // -----------------------------------------------------------------------
    // LAYER 3: COMPUTATIONAL NODES & DYNAMIC EDGES (Foreground Depth ~0.8-1.0)
    // -----------------------------------------------------------------------
    const renderedNodes = [];

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];

      // Ambient parametric orbital motion
      if (!isReducedMotion) {
        node.currX = node.anchorX +
          Math.sin(time * node.freqX * currentParams.nodeSpeed + node.phaseX) * node.orbitRx;
        node.currY = node.anchorY +
          Math.cos(time * node.freqY * currentParams.nodeSpeed + node.phaseY) * node.orbitRy;
      } else {
        node.currX = node.anchorX;
        node.currY = node.anchorY;
      }

      // Localized elastic cursor displacement
      if (!isTouchDevice && mouseActivity > 0.05) {
        const dx = node.currX - mouseSmoothX;
        const dy = node.currY - mouseSmoothY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 170;

        if (dist < radius && dist > 1) {
          const force = (1 - dist / radius) * mouseActivity;
          const targetDisplaceX = (dx / dist) * force * 20;
          const targetDisplaceY = (dy / dist) * force * 20;
          node.displaceX += (targetDisplaceX - node.displaceX) * 0.08;
          node.displaceY += (targetDisplaceY - node.displaceY) * 0.08;
        } else {
          node.displaceX += (0 - node.displaceX) * 0.04;
          node.displaceY += (0 - node.displaceY) * 0.04;
        }
      } else {
        node.displaceX += (0 - node.displaceX) * 0.04;
        node.displaceY += (0 - node.displaceY) * 0.04;
      }

      const drawX = node.currX + node.displaceX + parallaxX * node.depth;
      const drawY = node.currY + node.displaceY + parallaxY * node.depth;

      renderedNodes.push({ x: drawX, y: drawY, node, index: i });

      // Render node based on typology
      const isAccentNode = node.isAccent && currentParams.telemetrySignalActive;
      const nodeColor = isAccentNode
        ? `rgba(${accentRgb}, ${isDark ? 0.7 : 0.85})`
        : `rgba(${neutralRgb}, ${isDark ? 0.45 : 0.62})`;

      if (node.type === 'cross') {
        ctx.beginPath();
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 0.8;
        const arm = 3;
        ctx.moveTo(drawX - arm, drawY);
        ctx.lineTo(drawX + arm, drawY);
        ctx.moveTo(drawX, drawY - arm);
        ctx.lineTo(drawX, drawY + arm);
        ctx.stroke();
      } else if (node.type === 'ring') {
        ctx.beginPath();
        ctx.arc(drawX, drawY, node.radius * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = nodeColor;
        ctx.lineWidth = 0.75;
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(drawX, drawY, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
      }
    }

    // Dynamic Connection Lines (Bonds that form and dissolve with proximity)
    const activeEdges = [];
    const maxConnectDist = currentParams.connectDistance;

    for (let i = 0; i < renderedNodes.length; i++) {
      for (let j = i + 1; j < renderedNodes.length; j++) {
        const p1 = renderedNodes[i];
        const p2 = renderedNodes[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxConnectDist) {
          // Subtle breathing alpha as distance changes
          const proximityFactor = 1 - (dist / maxConnectDist);
          const breathing = 0.7 + 0.3 * Math.sin(time * 0.001 + p1.node.phaseX);
          const lineAlpha = currentParams.networkAlpha * proximityFactor * breathing * alphaMult;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${neutralRgb}, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();

          activeEdges.push({ p1, p2, dist });
        }
      }
    }

    // Edge Pulses (Packets traveling across network connections)
    if (activeEdges.length > 0 && !isReducedMotion) {
      for (let ep = 0; ep < edgePulses.length; ep++) {
        const pulse = edgePulses[ep];
        pulse.progress += pulse.speed * currentParams.pulseSpeed;

        if (pulse.progress >= 1) {
          // Select a random active edge
          const randomEdge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
          if (randomEdge) {
            pulse.source = randomEdge.p1;
            pulse.target = randomEdge.p2;
            pulse.progress = 0;
          }
        }

        if (pulse.source && pulse.target) {
          const px = pulse.source.x + (pulse.target.x - pulse.source.x) * pulse.progress;
          const py = pulse.source.y + (pulse.target.y - pulse.source.y) * pulse.progress;

          ctx.beginPath();
          ctx.arc(px, py, 1.4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accentRgb}, ${isDark ? 0.65 : 0.8})`;
          ctx.fill();
        }
      }
    }
  }

  // Animation frame loop
  function renderLoop(time) {
    if (isReducedMotion) return;
    render(time);
    requestAnimationFrame(renderLoop);
  }

  function drawStatic() {
    render(12000);
  }

  window.redrawStaticCanvas = function () {
    if (isReducedMotion) {
      drawStatic();
    }
  };

  if (!isReducedMotion) {
    requestAnimationFrame(renderLoop);
  } else {
    drawStatic();
  }
}

/* --------------------------------------------------------------------------
   3. NAVIGATION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const mobileNavToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

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
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  const observer = new IntersectionObserver(
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

  sections.forEach((sec) => observer.observe(sec));
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
