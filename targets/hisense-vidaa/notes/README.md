# Hisense VIDAA target

This folder mirrors the built web app output into `app/`.

VIDAA distribution and packaging are often partner/SDK specific.
Use this target as:
- a place to keep VIDAA-specific config/assets
- a place to keep validation scripts and runtime notes

Next step (optional):
- add a `scripts/validate.sh` that checks required files exist (index.html, assets/)
- capture real device UA + any VIDAA global objects you detect
