// DONUTSMP SCAMMER LIST — data file
// Each entry is one case. Edit this file by hand, or use admin.html to
// add/remove entries and download a fresh copy of this file.
//
// status: "confirmed"  -> evidence reviewed, scam confirmed
//         "reported"   -> claim received, not yet independently verified
//
// Replace the two sample entries below with real cases, or delete them.

const SCAMMERS = [
  {
    id: "0001",
    ign: "SampleUser123",
    discord: "sample#0001",
    status: "confirmed",
    dateAdded: "2026-08-01",
    reason: "Took payment for an enchanted netherite set in a middleman-free trade and never delivered.",
    evidence: "Chat log + transaction screenshots on file with jz.siep."
  },
  {
    id: "0002",
    ign: "PlaceholderPlayer",
    discord: "placeholder#0002",
    status: "reported",
    dateAdded: "2026-08-15",
    reason: "Reported for an alleged duped-item sale. Awaiting corroborating evidence.",
    evidence: "Screenshots submitted, pending review."
  }
];

// Keep this line — both index.html and admin.html expect a global SCAMMERS array.
if (typeof module !== "undefined") module.exports = SCAMMERS;
