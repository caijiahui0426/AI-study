const { icon } = require("./icons");

function makeComponents(pptx, theme) {
  const U = px => +(px / theme.ppt.pxPerIn).toFixed(3);
  const PT = px => +(px / theme.ppt.pxPerPt).toFixed(1);
  const C = theme.colors;
  const F = theme.fonts;
  const shape = pptx.ShapeType;

  function addText(slide, x, y, w, h, text, opts = {}) {
    slide.addText(text, {
      x: U(x), y: U(y), w: U(w), h: U(h),
      fontFace: opts.fontFace || F.cn,
      fontSize: PT(opts.size || 28),
      color: opts.color || C.text,
      bold: !!opts.bold,
      italic: !!opts.italic,
      align: opts.align || "left",
      valign: opts.valign || "top",
      margin: opts.margin ?? 0,
      fit: opts.fit || "shrink",
      breakLine: false,
      lineSpacingMultiple: opts.lineSpacingMultiple || 1
    });
  }

  function rect(slide, x, y, w, h, opts = {}) {
    slide.addShape(opts.round ? shape.roundRect : shape.rect, {
      x: U(x), y: U(y), w: U(w), h: U(h),
      fill: opts.fill ? { color: opts.fill } : { type: "none" },
      line: opts.line ? { color: opts.line, width: opts.lineWidth || 1 } : { type: "none" },
      rectRadius: opts.round ? U(opts.radius || 8) : undefined,
      shadow: opts.shadow ? { type: "outer", color: "1A2030", opacity: 0.14, blur: 8, offset: 2, angle: 90 } : undefined
    });
  }

  function line(slide, x1, y1, x2, y2, opts = {}) {
    slide.addShape(shape.line, {
      x: U(Math.min(x1, x2)), y: U(Math.min(y1, y2)),
      w: U(Math.abs(x2 - x1) || 0.01), h: U(Math.abs(y2 - y1) || 0.01),
      line: { color: opts.color || C.line, width: opts.width || 1.5, dashType: opts.dash, endArrowType: opts.arrow },
      flipH: x2 < x1,
      flipV: y2 < y1
    });
  }

  function header(slide, title, subtitle) {
    addText(slide, 96, 72, 1500, 58, title, { size: 40, color: C.accent, bold: true });
    rect(slide, 96, 144, 760, 3, { fill: C.accent });
    if (subtitle) addText(slide, 96, 164, 1540, 34, subtitle, { size: 18, color: C.mute });
  }

  function footer(slide) {
    rect(slide, 56, 996, 1808, 4, { fill: C.accent });
  }

  function cover(slide, data) {
    slide.background = { color: C.bg };
    addText(slide, 420, 300, 1300, 112, data.title, { size: 88, color: C.accent, bold: true, align: "right" });
    if (data.subtitle) addText(slide, 420, 430, 1300, 40, data.subtitle, { size: 26, color: C.accent, align: "right", fontFace: F.en });
    if (data.note) addText(slide, 420, 510, 1300, 40, data.note, { size: 26, color: C.mute, align: "right" });
    if (data.date) addText(slide, 104, 876, 660, 42, data.date, { size: 18, color: C.mute });
    footer(slide);
  }

  function metricCards(slide, data) {
    header(slide, data.title, data.subtitle);
    const w = 538, g = 38, y = 270;
    data.items.slice(0, 3).forEach((item, i) => {
      const x = 96 + i * (w + g);
      rect(slide, x, y, w, 270, { fill: C.surface, line: C.line, round: true, shadow: true });
      rect(slide, x, y, w, 6, { fill: i === 0 ? C.accent : C.primary });
      addText(slide, x + 30, y + 42, 260, 70, item.value, { size: 58, color: i === 0 ? C.accent : C.primary, bold: true, fontFace: F.en });
      addText(slide, x + 30, y + 126, w - 60, 34, item.label, { size: 22, color: C.primary, bold: true });
      addText(slide, x + 30, y + 176, w - 60, 62, item.desc, { size: 16, color: C.mute, lineSpacingMultiple: 1.2 });
    });
    if (data.caveat) caveatBand(slide, data.caveat, 646);
    footer(slide);
  }

  function bigWordCardMatrix(slide, data) {
    header(slide, data.title, data.subtitle);
    addText(slide, 108, 286, 460, 140, data.words.join("\n"), { size: 58, color: C.primary, bold: true, lineSpacingMultiple: 0.88 });
    rect(slide, 108, 520, 6, 88, { fill: C.accent });
    addText(slide, 136, 522, 420, 74, data.summary, { size: 18, color: C.text, lineSpacingMultiple: 1.25 });
    rect(slide, 642, 244, 1, 540, { fill: C.line });
    data.cards.slice(0, 4).forEach((card, i) => {
      const x = 724 + (i % 2) * 440;
      const y = 286 + Math.floor(i / 2) * 210;
      const hot = i === 0;
      rect(slide, x, y, 390, 160, { fill: C.surface, line: C.line, round: true, shadow: true });
      rect(slide, x, y, 390, 6, { fill: hot ? C.accent : C.primary });
      addText(slide, x + 26, y + 28, 48, 36, String(i + 1).padStart(2, "0"), { size: 20, color: hot ? C.accent : C.primary, bold: true, fontFace: F.en });
      addText(slide, x + 86, y + 28, 260, 30, card.title, { size: 22, color: hot ? C.accent : C.primary, bold: true });
      addText(slide, x + 86, y + 72, 260, 48, card.desc, { size: 15, color: C.mute, lineSpacingMultiple: 1.15 });
    });
    footer(slide);
  }

  function fourColumnMechanism(slide, data) {
    header(slide, data.title, data.subtitle);
    data.items.slice(0, 4).forEach((item, i) => {
      const x = 96 + i * 432;
      const accent = item.accent || (i % 2 ? C.accent : C.primary);
      if (i > 0) rect(slide, x - 28, 240, 1, 520, { fill: C.line });
      rect(slide, x, 248, 42, 42, { fill: accent });
      addText(slide, x, 258, 42, 20, String(i + 1).padStart(2, "0"), { size: 16, color: "FFFFFF", bold: true, align: "center", fontFace: F.en });
      addText(slide, x + 56, 246, 300, 30, item.title, { size: 22, color: accent, bold: true });
      rect(slide, x + 56, 288, 96, 5, { fill: accent });
      addText(slide, x, 332, 350, 74, item.desc, { size: 17, color: C.text, lineSpacingMultiple: 1.25 });
      icon(pptx, slide, U, x + 174, 514, item.icon || "document", { color: accent, soft: i % 2 ? C.accentSoft : C.surface2 });
      rect(slide, x + 48, 648, 254, 48, { fill: i % 2 ? C.accentSoft : C.surface2, line: i % 2 ? C.accent : C.line, round: true });
      addText(slide, x + 48, 658, 254, 26, item.close, { size: 17, color: accent, bold: true, align: "center" });
    });
    footer(slide);
  }

  function sectionDividerBigNumber(slide, data) {
    slide.background = { color: C.bg };
    addText(slide, 96, 132, 620, 250, String(data.number || "01"), {
      size: 150, color: C.line, bold: true, fontFace: F.en
    });
    rect(slide, 104, 520, 8, 112, { fill: C.accent });
    addText(slide, 144, 500, 1180, 76, data.title, { size: 50, color: C.accent, bold: true });
    if (data.subtitle) addText(slide, 146, 588, 1020, 42, data.subtitle, { size: 24, color: C.mute });
    (data.keywords || []).slice(0, 3).forEach((kw, i) => {
      const x = 144 + i * 260;
      rect(slide, x, 700, 210, 50, { fill: i === 0 ? C.accentSoft : C.surface2, line: i === 0 ? C.accent : C.line, round: true });
      addText(slide, x, 714, 210, 22, kw, { size: 17, color: i === 0 ? C.accent : C.primary, bold: true, align: "center" });
    });
    footer(slide);
  }

  function systemArchitectureCenter(slide, data) {
    header(slide, data.title, data.subtitle);
    const leftX = 110, centerX = 615, rightX = 1325, topY = 272;
    addText(slide, leftX, 222, 330, 28, data.inputTitle || "Inputs", { size: 18, color: C.primary, bold: true });
    addText(slide, rightX, 222, 330, 28, data.outputTitle || "Outputs", { size: 18, color: C.primary, bold: true });
    (data.inputs || []).slice(0, 5).forEach((t, i) => {
      const y = topY + i * 82;
      rect(slide, leftX, y, 330, 54, { fill: C.surface, line: C.line, round: true });
      addText(slide, leftX + 18, y + 15, 294, 22, t, { size: 16, color: C.text, bold: i === 0 });
      line(slide, leftX + 330, y + 27, centerX - 34, y + 27, { color: C.primary, width: 1.2, arrow: "triangle" });
    });
    rect(slide, centerX, 250, 560, 420, { fill: C.primary, line: C.primary, round: true, shadow: true });
    addText(slide, centerX + 42, 284, 476, 42, data.coreTitle || "Core Platform", { size: 30, color: "FFFFFF", bold: true, align: "center" });
    addText(slide, centerX + 70, 334, 420, 42, data.coreSubtitle || "", { size: 15, color: "DDE5FF", align: "center" });
    (data.modules || []).slice(0, 6).forEach((m, i) => {
      const x = centerX + 54 + (i % 2) * 246;
      const y = 412 + Math.floor(i / 2) * 72;
      rect(slide, x, y, 206, 44, { fill: i % 2 ? C.accentSoft : C.surface2, line: i % 2 ? C.accent : C.line, round: true });
      addText(slide, x + 12, y + 12, 182, 20, m, { size: 14, color: i % 2 ? C.accent : C.primary, bold: true, align: "center" });
    });
    (data.outputs || []).slice(0, 5).forEach((t, i) => {
      const y = topY + i * 82;
      line(slide, centerX + 560, y + 27, rightX, y + 27, { color: C.primary, width: 1.2, arrow: "triangle" });
      rect(slide, rightX, y, 330, 54, { fill: C.surface, line: C.line, round: true });
      addText(slide, rightX + 18, y + 15, 294, 22, t, { size: 16, color: C.text, bold: i === 0 });
    });
    footer(slide);
  }

  function hubSpokeCapability(slide, data) {
    header(slide, data.title, data.subtitle);
    const cx = 960, cy = 512;
    rect(slide, cx - 180, cy - 82, 360, 164, { fill: C.primary, line: C.primary, round: true, shadow: true });
    addText(slide, cx - 135, cy - 28, 270, 40, data.center || "Core", { size: 30, color: "FFFFFF", bold: true, align: "center" });
    const points = [
      [490, 310], [960, 250], [1430, 310],
      [490, 705], [960, 775], [1430, 705]
    ];
    (data.modules || []).slice(0, 6).forEach((m, i) => {
      const [x, y] = points[i];
      line(slide, cx, cy, x, y, { color: C.line, width: 1.2 });
      const hot = m.status === "key" || i === 0;
      rect(slide, x - 150, y - 46, 300, 92, { fill: hot ? C.accentSoft : C.surface, line: hot ? C.accent : C.line, round: true, shadow: true });
      icon(pptx, slide, U, x - 108, y, m.icon || "document", { color: hot ? C.accent : C.primary, soft: hot ? C.accentSoft : C.surface2 });
      addText(slide, x - 58, y - 20, 188, 24, m.title, { size: 17, color: hot ? C.accent : C.primary, bold: true });
      if (m.desc) addText(slide, x - 58, y + 12, 188, 20, m.desc, { size: 12, color: C.mute });
    });
    if (data.takeaway) caveatBand(slide, data.takeaway, 888);
    footer(slide);
  }

  function roadmapSwimlane(slide, data) {
    header(slide, data.title, data.subtitle);
    const left = 180, top = 250, laneH = 116, labelW = 170, stageW = 285;
    (data.stages || []).slice(0, 5).forEach((s, i) => {
      const x = left + labelW + i * stageW;
      rect(slide, x, 222, stageW - 24, 48, { fill: i === 0 ? C.accent : C.primary, round: true });
      addText(slide, x, 235, stageW - 24, 20, s, { size: 15, color: "FFFFFF", bold: true, align: "center" });
    });
    (data.lanes || []).slice(0, 4).forEach((lane, r) => {
      const y = top + r * laneH;
      rect(slide, left, y, labelW - 22, 76, { fill: r % 2 ? C.surface2 : C.accentSoft, line: C.line, round: true });
      addText(slide, left + 14, y + 25, labelW - 50, 22, lane.name, { size: 16, color: r % 2 ? C.primary : C.accent, bold: true, align: "center" });
      (lane.items || []).slice(0, 5).forEach((it, i) => {
        const x = left + labelW + i * stageW;
        rect(slide, x, y, stageW - 24, 76, { fill: C.surface, line: C.line, round: true });
        addText(slide, x + 16, y + 14, stageW - 56, 42, it, { size: 13, color: C.text, lineSpacingMultiple: 1.08 });
      });
    });
    if (data.current) {
      const idx = Math.max(0, Math.min((data.stages || []).length - 1, data.current));
      const x = left + labelW + idx * stageW + (stageW - 24) / 2;
      line(slide, x, 206, x, 250 + (data.lanes || []).length * laneH - 32, { color: C.accent, width: 2, dash: "dash" });
    }
    footer(slide);
  }

  function caveatBand(slide, text, y = 760) {
    rect(slide, 96, y, 1728, 66, { fill: C.surface, line: C.line, round: true });
    addText(slide, 128, y + 18, 1664, 28, text, { size: 16, color: C.primary, bold: true, align: "center" });
  }

  return {
    U, PT, addText, rect, line, header, footer, cover,
    metricCards, bigWordCardMatrix, fourColumnMechanism,
    sectionDividerBigNumber, systemArchitectureCenter, hubSpokeCapability, roadmapSwimlane,
    caveatBand
  };
}

module.exports = { makeComponents };
