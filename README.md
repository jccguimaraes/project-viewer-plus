# Project Viewer Plus

**Community**

[![Code of Conduct][coc-badge]][coc]
[![All Contributors][all-contributors-badge]][all-contributors]

**CI/CD**

[![Travis][travis-badge]][travis]
[![AppVeyor][appveyor-badge]][appveyor]

**Quality**

[![CodeClimateMainability][code-climate-maintainability-badge]][code-climate-maintainability]
[![CodeClimateCoverage][code-climate-coverage-badge]][code-climate-coverage]

[![codecov][codecov-badge]][codecov]

[![Known Vulnerabilities][snyk-badge]][snyk]

**Style**

[![code style: prettier][prettier-badge]][prettier]
[![Inline docs][inch-badge]][inch]

## Introduction

A community package for organizing groups of projects. Enjoy and contribute! 🌍

*Importanct changes*

- Rewritten with [**Babel**][babel] and [**Etch**][etch];
  - **Why?** Etch is maintained by GitHub and Babel to simplify the use of Etch.
- A suite of automation tests for better stability and maintainability;
- Uses dock instead of panel;
  - **Why?** Trying to keep up with how Atom works.
- This package is not a replacement for `project-viewer` but I will only maintain `project-viewer-plus`.
  - **Why?** `project-viewer` got too big too fast. Maintaining it has become hard. `project-viewer-plus` hopefully will not suffer from some mistakes.
- Each instance of Atom has it's own state. This means that any change will not affect other istances, such as adding new groups or projects, collapsing or expanding groups. In order to sync them you need to explicit save a state and load on other instances. Each new instance inherits from the current file state;
  - **Why?** Keeping everything synced is just to much effort.
- Deprecated `devicons` in favour of `file-icons`;
  - **Why?** `devicons` is not maintained and `file-icons` offers more than 600 icons at the moment. The only downside is that you need to install it (`project-viewer-plus` always verifies if it's installed on startup and gives you a click install).
- No more coloring groups / projects.
  - **Why?** it's just too much to add for now (maybe later...)

> Atom changes a lot and, due to this nature, sometimes code breaks, features get outdated or even pointless. Be kind when opening an issue! :fist:

## Configuration

Please check this [section](CONFIGURATION.md)!

## Change Log

Please check this [section](CHANGELOG.md)!

## Contributing

Please check this [section](CONTRIBUTING.md) and this [section](CODE_OF_CONDUCT.md)!

## Screenshots

| File icons verification: ![file-icons][file-icons] |
|---|

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/jccguimaraes"><img src="https://avatars3.githubusercontent.com/u/14871650?v=4" width="50px;" alt="João Guimarães"/><br /><sub><b>João Guimarães</b></sub></a><br /><a href="https://github.com/project-viewer-plus/jccguimaraes/issues?q=author%3Ajccguimaraes" title="Bug reports">🐛</a> <a href="https://github.com/project-viewer-plus/jccguimaraes/commits?author=jccguimaraes" title="Code">💻</a> <a href="#design-jccguimaraes" title="Design">🎨</a> <a href="https://github.com/project-viewer-plus/jccguimaraes/commits?author=jccguimaraes" title="Documentation">📖</a> <a href="#ideas-jccguimaraes" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://hans-koch.me"><img src="https://avatars0.githubusercontent.com/u/1093709?v=4" width="50px;" alt="Hans Koch"/><br /><sub><b>Hans Koch</b></sub></a><br /><a href="https://github.com/project-viewer-plus/jccguimaraes/commits?author=Hammster" title="Code">💻</a> <a href="https://github.com/project-viewer-plus/jccguimaraes/commits?author=Hammster" title="Documentation">📖</a> <a href="#ideas-Hammster" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/cgalvarez"><img src="https://avatars2.githubusercontent.com/u/10707639?v=4" width="50px;" alt="Carlos García"/><br /><sub><b>Carlos García</b></sub></a><br /><a href="#infra-cgalvarez" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/project-viewer-plus/jccguimaraes/commits?author=cgalvarez" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://daniel.sh"><img src="https://avatars0.githubusercontent.com/u/2207980?v=4" width="50px;" alt="Daniel P. Shannon"/><br /><sub><b>Daniel P. Shannon</b></sub></a><br /><a href="https://github.com/project-viewer-plus/jccguimaraes/issues?q=author%3Aphyllisstein" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

[babel]: https://babeljs.io/
[etch]: https://github.com/atom/etch

[travis-badge]: https://img.shields.io/travis/jccguimaraes/project-viewer-plus/master.svg?style=flat-square
[travis]: https://travis-ci.org/jccguimaraes/project-viewer-plus

[appveyor-badge]: https://img.shields.io/appveyor/ci/jccguimaraes/project-viewer-plus/master.svg?style=flat-square
[appveyor]: https://ci.appveyor.com/project/jccguimaraes/project-viewer-plus

[coc-badge]: https://img.shields.io/badge/%E2%9D%A4-code%20of%20conduct-blue.svg?style=flat-square
[coc]: ./CODE_OF_CONDUCT.md

[all-contributors-badge]: https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square
[all-contributors]: #contributors

[code-climate-maintainability-badge]: https://api.codeclimate.com/v1/badges/bd825afe8e71dce52f63/maintainability
[code-climate-maintainability]: https://codeclimate.com/github/jccguimaraes/project-viewer-plus/maintainability
[code-climate-coverage-badge]: https://api.codeclimate.com/v1/badges/bd825afe8e71dce52f63/test_coverage
[code-climate-coverage]: https://codeclimate.com/github/jccguimaraes/project-viewer-plus/test_coverage

[codecov-badge]: https://codecov.io/gh/jccguimaraes/project-viewer-plus/branch/master/graph/badge.svg
[codecov]: https://codecov.io/gh/jccguimaraes/project-viewer-plus

[bithound]: https://www.bithound.io/github/jccguimaraes/project-viewer-plus
[bithound-overall-badge]: https://www.bithound.io/github/jccguimaraes/project-viewer-plus/badges/score.svg
[bithound-code-badge]: https://www.bithound.io/github/jccguimaraes/project-viewer-plus/badges/code.svg
[bithound-dependencies-badge]: https://www.bithound.io/github/jccguimaraes/project-viewer-plus/badges/dependencies.svg

[snyk-badge]: https://snyk.io/test/github/jccguimaraes/project-viewer-plus/badge.svg?targetFile=package.json
[snyk]: https://snyk.io/test/github/jccguimaraes/project-viewer-plus?targetFile=package.json

[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[prettier]: https://github.com/jccguimaraes/project-viewer-plus

[inch-badge]: http://inch-ci.org/github/jccguimaraes/project-viewer-plus.svg?branch=master&style=flat-square
[inch]: http://inch-ci.org/github/jccguimaraes/project-viewer-plus

[file-icons]: images/pvp-file-icons.png
