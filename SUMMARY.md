Maison Notle 301 — i18n Conversion Summary

Scope
- Implemented 6-language internationalization (English, Japanese, Simplified Chinese, Korean, French, Spanish) across the entire manual site without changing page URLs and keeping a single HTML per page.
- Added a shared language switcher with persistence via localStorage and defaulting to the visitor’s browser language if supported (fallback: English).
- Centralized switching logic and basic styling in shared assets: assets/i18n.js and assets/i18n.css.

Branches
- Created and pushed: feat/i18n-6lang (do not push to main, no PR created).

Pages Converted
- /index.html (Home)
- /access/index.html (Access)
- /how-to-open/index.html (How to Open)
- /house-rules/index.html (House Rules)
- /nearby-shops/index.html (Nearby Shops)
- /taxi/index.html (For Taxi)
- /emergency/index.html (Emergency)
- /trash/index.html (Trash)
- /equipment/index.html (Equipment)
- /parking/index.html (Parking)

Implementation Details
- assets/i18n.js
  - Provides I18N.init({ strings, onChange }) with:
    - Supported: en, ja, zh, ko, fr, es
    - Language selection persistence in localStorage
    - Default language detection from navigator.language
    - [data-i18n] application and .lang-btn wiring via data-lang attributes
  - Exposes I18N.getLang() and I18N.setLang().

- assets/i18n.css
  - Provides shared styles for .lang-switcher / .lang-bar and .lang-btn (including .active state).

- Per-page changes
  - Replaced inline onclick language handlers with data-lang driven buttons handled by I18N.
  - Kept existing per-page translation dictionaries and now call I18N.init({ strings: ... }) on DOMContentLoaded.
  - Index page integrates extra translations (“hostContact”, “passNote”) layered via I18N.onChange without adding secrets.
  - Equipment page uses I18N.onChange to re-render multi-lingual content blocks.
  - Parking page did not previously have translations; added minimal keys for title and back-link.

Security And Sensitive Data
- Confirmed recent local change on main removed the chat/remote worker integration — treated as a security cleanup; kept that state.
- Removed all exposure of Wi‑Fi password from the home page:
  - Deleted visible password row and the QR feature (which would encode the password).
  - Removed the hardcoded password constant.
  - Replaced with a neutral note: “Sent via your booking messages.”
- Verified that other pages do not reveal lock codes, keybox codes, access codes, or Wi‑Fi passwords.

Flags (sensitive data removed)
- Wi‑Fi password previously in index.html was removed and replaced with a neutral note. No other sensitive codes were found in the content.

Behavior
- Language persists across pages due to shared localStorage key.
- First visit: defaults to browser language if in the supported 6; otherwise English.
- URLs remain unchanged.

Notes
- No pull request was created; work is available on feat/i18n-6lang.
