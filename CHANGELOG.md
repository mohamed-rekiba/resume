# Changelog

## [1.5.1](https://github.com/mohamed-rekiba/resume/compare/v1.5.0...v1.5.1) (2026-02-26)


### Bug Fixes

* **ci:** derive --base-href from repository name instead of hardcoding ([d9a712f](https://github.com/mohamed-rekiba/resume/commit/d9a712f56d1c6db20215a1c750766554bc89e5c0))
* derive canonical URL from GITHUB_REPOSITORY and remove duplicate Playwright run ([fbbf7d2](https://github.com/mohamed-rekiba/resume/commit/fbbf7d29fcfdbc2d928991ab577d7ebab9de3ba8))
* **e2e:** replace __dirname with import.meta.url for ESM compatibility ([16be0d4](https://github.com/mohamed-rekiba/resume/commit/16be0d49bc0e33181dfaf43f394bf0400b16c01d))

## [1.5.0](https://github.com/mohamed-rekiba/resume/compare/v1.4.2...v1.5.0) (2026-02-26)


### Features

* derive hardcoded values from resume.md dynamically ([aefd650](https://github.com/mohamed-rekiba/resume/commit/aefd6509da449b3399094b704d47f7a6d6207909))

## [1.4.2](https://github.com/mohamed-rekiba/resume/compare/v1.4.1...v1.4.2) (2026-02-26)


### Bug Fixes

* **toolbar:** serve PDF from Pages to fix CORS and download filename ([d6ee097](https://github.com/mohamed-rekiba/resume/commit/d6ee0977bc66ff7b65713c5846d504a06583a488))

## [1.4.1](https://github.com/mohamed-rekiba/resume/compare/v1.4.0...v1.4.1) (2026-02-26)


### Bug Fixes

* **toolbar:** use blob fetch to bypass cross-origin download attribute restriction ([e8f09dd](https://github.com/mohamed-rekiba/resume/commit/e8f09dd1ddf739c6cf880615246d898fc6eb2d3e))

## [1.4.0](https://github.com/mohamed-rekiba/resume/compare/v1.3.0...v1.4.0) (2026-02-26)


### Features

* **toolbar:** derive download filename from resume.md name field ([3a71b78](https://github.com/mohamed-rekiba/resume/commit/3a71b78300d3dc568e148badec5e63bc17667eda))

## [1.3.0](https://github.com/mohamed-rekiba/resume/compare/v1.2.2...v1.3.0) (2026-02-26)


### Features

* **resume:** render markdown links and make contact items clickable ([acef460](https://github.com/mohamed-rekiba/resume/commit/acef4605c8aa0f8bbd1b5676bb870a59fa320bec))

## [1.2.2](https://github.com/mohamed-rekiba/resume/compare/v1.2.1...v1.2.2) (2026-02-25)


### Bug Fixes

* **mobile:** use JS to compute scale and margin-bottom for page gaps ([ff2de9b](https://github.com/mohamed-rekiba/resume/commit/ff2de9bc4142ec0040c6335d43f4abfc8df2eea7))

## [1.2.1](https://github.com/mohamed-rekiba/resume/compare/v1.2.0...v1.2.1) (2026-02-25)


### Bug Fixes

* **mobile:** correct page gap formula for transform-based scaling ([6c956a6](https://github.com/mohamed-rekiba/resume/commit/6c956a61195ad84995fba1df238b9390a9f35f1f))

## [1.2.0](https://github.com/mohamed-rekiba/resume/compare/v1.1.0...v1.2.0) (2026-02-25)


### Features

* **toolbar:** add fixed PDF download URL via GitHub Releases ([a1722d1](https://github.com/mohamed-rekiba/resume/commit/a1722d133cc1ac7b2f070e42cbe2be7e92278a6b))

## [1.1.0](https://github.com/mohamed-rekiba/resume/compare/v1.0.1...v1.1.0) (2026-02-25)


### Features

* **resume:** add custom favicon and refine resume content ([7e193d3](https://github.com/mohamed-rekiba/resume/commit/7e193d39444f40e45a0af6ac2e7c6ea011f4c7c5))

## [1.0.1](https://github.com/mohamed-rekiba/resume/compare/v1.0.0...v1.0.1) (2026-02-25)


### Bug Fixes

* **mobile:** replace zoom with CSS transform for correct viewport scaling ([92e1f77](https://github.com/mohamed-rekiba/resume/commit/92e1f77e3099914a8aebafbc604c4d2d3f5fa6b5))

## 1.0.0 (2026-02-25)


### Features

* **resume:** rebuild as ATS-compatible Angular 21 resume builder ([561f30c](https://github.com/mohamed-rekiba/resume/commit/561f30c4500bdd53b5844571c5e99cf5779272c6))
* **scripts:** add npm run pdf command for local PDF export ([e6019c1](https://github.com/mohamed-rekiba/resume/commit/e6019c151b57ea423627d76f59c2f5844dd00281))
