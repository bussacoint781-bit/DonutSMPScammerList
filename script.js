function fmtDate(d) {
  const dt = new Date(d + "T00:00:00");
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function caseCard(entry) {
  const statusLabel = entry.status === "confirmed" ? "Confirmed scammer" : "Reported — unverified";
  const stampClass = entry.status === "confirmed" ? "stamp" : "stamp reported";
  return `
    <div class="case-card" data-status="${entry.status}">
      <div class="case-top">
        <div>
          <div class="case-id">CASE № ${entry.id}</div>
          <div class="case-ign">${escapeHtml(entry.ign)}</div>
          ${entry.discord ? `<div class="case-discord">${escapeHtml(entry.discord)}</div>` : ""}
        </div>
        <div class="${stampClass}">${statusLabel}</div>
      </div>
      <div class="case-body">
        <div class="case-field">
          <div class="k">Reason</div>
          <div class="v">${escapeHtml(entry.reason)}</div>
        </div>
        <div class="case-field">
          <div class="k">Evidence on file</div>
          <div class="v">${escapeHtml(entry.evidence || "—")}</div>
        </div>
      </div>
      <div class="case-date">Reported ${fmtDate(entry.dateAdded)}</div>
    </div>
  `;
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str ?? "";
  return d.innerHTML;
}

function render(list) {
  const container = document.getElementById("caseList");
  const meta = document.getElementById("searchMeta");

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="big">No matches</div>
        No entries match that search. If you believe someone should be listed,
        message <strong>jz.siep</strong> on Discord with proof.
      </div>`;
    meta.textContent = "0 results";
    return;
  }

  container.innerHTML = list.map(caseCard).join("");
  meta.textContent = `${list.length} ${list.length === 1 ? "entry" : "entries"} on file`;
}

function updateStats(all) {
  const confirmed = all.filter(e => e.status === "confirmed").length;
  const reported = all.filter(e => e.status === "reported").length;
  document.getElementById("statTotal").textContent = all.length;
  document.getElementById("statConfirmed").textContent = confirmed;
  document.getElementById("statReported").textContent = reported;
}

document.addEventListener("DOMContentLoaded", () => {
  const all = [...SCAMMERS].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
  updateStats(all);
  render(all);

  const input = document.getElementById("searchInput");
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) { render(all); return; }
    const filtered = all.filter(e =>
      e.ign.toLowerCase().includes(q) ||
      (e.discord && e.discord.toLowerCase().includes(q))
    );
    render(filtered);
  });
});
