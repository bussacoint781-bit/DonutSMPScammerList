# DonutSMP Scammer List

A static site for tracking reported scammers on DonutSMP. Public search page +
a private admin page for editing the list.

## Files

- `index.html` — the public page (search + case list)
- `admin.html` — private page for adding/removing cases
- `data.js` — the actual list of entries, loaded by both pages
- `style.css`, `script.js`, `admin.js` — styling and logic

## Hosting on GitHub Pages

1. Create a new GitHub repo (e.g. `donutsmp-scammers`).
2. Push all these files to the repo's root (or a `/docs` folder — just match
   whatever you pick in the next step).
3. In the repo, go to **Settings → Pages**, set the source branch and folder,
   and save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

## Before you launch

1. **Set a real admin password.** Open `admin.js` and change:
   ```js
   const ADMIN_PASSWORD = "change-me";
   ```
   to something only you know.
2. **Read this carefully: the admin password is not real security.** This is
   a static site — there's no server to check the password against. Anyone
   who opens `admin.html` and views page source can read the password
   directly out of `admin.js`. The password only stops casual snooping, not
   someone who knows to look.
   - **Don't link `admin.html` from anywhere public** (not from `index.html`,
     not from Discord, nowhere). Only share the direct URL with yourself.
   - If you ever want real security — so the list can be edited without you
     manually pushing to GitHub each time — you'd need an actual backend
     (e.g. Firebase Auth + Firestore, or a small serverless function). Happy
     to help you build that version if you decide you want it later.
3. **Replace the two sample entries in `data.js`** with real cases, or
   delete them.

## Day-to-day workflow

1. Someone messages **jz.siep** on Discord to report a scammer (or dispute
   an existing listing), with proof attached.
2. You review the proof.
3. Go to `admin.html`, unlock it, add (or remove) the case.
4. Click **Download updated data.js**, which saves a new `data.js` to your
   computer.
5. Replace the old `data.js` in your repo with the new one and push:
   ```
   git add data.js
   git commit -m "Update scammer list"
   git push
   ```
6. GitHub Pages will redeploy automatically — usually live within a minute.

## Editing entries by hand

You can also just open `data.js` in a text editor and edit the array
directly — it's plain JavaScript, no build step required. Each entry looks
like:

```js
{
  id: "0003",
  ign: "PlayerName",
  discord: "user#0000",
  status: "confirmed",       // or "reported"
  dateAdded: "2026-08-19",
  reason: "Short summary of what happened.",
  evidence: "What evidence is on file, and with whom."
}
```

## A note on fairness

Since this list publicly names real people, a couple of things are built in
to keep it defensible:

- Every entry requires a **reason** and a note on what **evidence** exists —
  there's no way to add a bare name with no context.
- Entries are split into **"Confirmed"** (evidence reviewed) and
  **"Reported — unverified"** (claim received, not yet corroborated), so the
  page doesn't imply more certainty than you actually have.
- The public page tells people how to dispute a listing, not just how to
  add one.

Worth keeping evidence (screenshots, logs) archived somewhere off-site in
case a listing is ever challenged.
