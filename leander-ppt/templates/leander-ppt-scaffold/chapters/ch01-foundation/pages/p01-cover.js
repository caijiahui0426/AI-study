const pageId = "p01";

function build(slide, { ui, page }) {
  ui.cover(slide, {
    title: "Leander PPT",
    subtitle: "Reusable Presentation Scaffold",
    note: "brief -> outline -> theme -> samples -> deck -> QA",
    date: `${page.pageId} / scaffold sample`
  });
}

module.exports = { pageId, build };
