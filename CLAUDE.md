# Versioning and changelog

Every time we make a change, no matter how minor, update the version number in `package.json`, as well as in `src/pages/Settings.tsx`. Use your best judgement on whether it's a major, minor, or patch change, abiding by semver. Also, add the change to `changelog.md`.

# Deployments

Cloudflare will automatically deploy every time we push to `main`. There is no need to locally build or run wrangler.
