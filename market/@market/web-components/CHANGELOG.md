# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [7.2.1](https://github.com/squareup/market/compare/@market/web-components@7.2.0...@market/web-components@7.2.1) (2025-01-24)


### :bug: Bug Fixes

* **web:** fix broken `market-pagination-nav` ([#9739](https://github.com/squareup/market/issues/9739)) ([eadd9d7](https://github.com/squareup/market/commit/eadd9d721418131430ba01122202966362cb681b))
* **web:** Improve keyboard accessibility of market-selects & provide compatibility with focus trapped modals ([#9692](https://github.com/squareup/market/issues/9692)) ([71d9439](https://github.com/squareup/market/commit/71d94399106d2aab8d81ea83c8023a91dc98ee8f))
* **web:** remove market-toggle focused attr when disabled ([81ea9c1](https://github.com/squareup/market/commit/81ea9c16e5ead35ae2e08ce3aa6241432cb30430))



## [7.2.0](https://github.com/squareup/market/compare/@market/web-components@7.1.0...@market/web-components@7.2.0) (2025-01-09)


### :sparkles: Features

* **web:** A11Y-1248 add aria-hidden to svg in market-toggle ([235fdec](https://github.com/squareup/market/commit/235fdecabd9e1dd9dd6533e08dec3c422997d10b))
* **web:** A11Y-2170 Add sr-only class ([512823f](https://github.com/squareup/market/commit/512823fa6bd665e30abef00d0046619fb0c072ce))
* **web:** Add required prop to password input ([bd605e7](https://github.com/squareup/market/commit/bd605e7b3b80c8e080b88f06cbed9d0a67fa8d04))
* **web:** market-file-upload "compact" mode ([#9505](https://github.com/squareup/market/issues/9505)) ([aa05ea6](https://github.com/squareup/market/commit/aa05ea6d79ca4538caee6b9cd59a06c5727eb0c4))


### :bug: Bug Fixes

* **web:** [A11Y-1203] Add role and tabindex to market-date-picker-date ([#9606](https://github.com/squareup/market/issues/9606)) ([7c628db](https://github.com/squareup/market/commit/7c628db218e2558f2585d1355978cb841edb1fc8))
* **web:** [A11Y-1595] Add "role" and "aria-label" to market banner ([#9569](https://github.com/squareup/market/issues/9569)) ([039e358](https://github.com/squareup/market/commit/039e3581e7cb71b27500001fc1a16e409aec80c6))
* **web:** adds required prop/attribute to market-select ([#9596](https://github.com/squareup/market/issues/9596)) ([6345b77](https://github.com/squareup/market/commit/6345b7726fbe4ec0c989bd927a5fda5fb0680551))
* **web:** banner icon a11y fixes ([#9489](https://github.com/squareup/market/issues/9489)) ([2f9973f](https://github.com/squareup/market/commit/2f9973ffdaebef0775019e8dee6e1bb8934947ba))
* **web:** DatePicker - fix keyboard a11y issue ([#9580](https://github.com/squareup/market/issues/9580)) ([40b1359](https://github.com/squareup/market/commit/40b13595dbec6a7e7bb4345b00bc337ed8b149e8))
* **web:** do not check box when clicking on buttons inside of market-row ([#9552](https://github.com/squareup/market/issues/9552)) ([dca2649](https://github.com/squareup/market/commit/dca26499aae224a16d4f9de515c7a70c6fc99159))
* **web:** ensure table cell control is direct child of cell ([613cc4a](https://github.com/squareup/market/commit/613cc4a69655cf591e0a6137a761b1ba64d0e9d2))
* **web:** ensure table row only listens to selection change from first cell ([06d1d67](https://github.com/squareup/market/commit/06d1d67b92458b7329e01f021756618500709e8d))
* **web:** fix input, input-text, button blur ([#9434](https://github.com/squareup/market/issues/9434)) ([7c6961a](https://github.com/squareup/market/commit/7c6961a3df4d7053f7c734e801f23ee01919ab7a))
* **web:** Fixes divider flex height bug ([#9620](https://github.com/squareup/market/issues/9620)) ([6f4e39b](https://github.com/squareup/market/commit/6f4e39bbbd5799a40c275fdd3f76bf5eaa0dbd15))
* **web:** market-dialog: remove first heading's top margin; update tokens ([#9545](https://github.com/squareup/market/issues/9545)) ([7b7598e](https://github.com/squareup/market/commit/7b7598eaf108c50b469f0fbdbe7be044b900c2a4))
* **web:** remove aria-expanded from market-dropdown ([#9537](https://github.com/squareup/market/issues/9537)) ([08f77d7](https://github.com/squareup/market/commit/08f77d777d7cffb2beebdf3987b33c82d3b759f0)), closes [#9528](https://github.com/squareup/market/issues/9528)
* **web:** text inputs used as dropdown triggers should only preventDefault on Enter ([#9677](https://github.com/squareup/market/issues/9677)) ([a08db5f](https://github.com/squareup/market/commit/a08db5fb86ffe4d5c9a0b5dc66d4f58e4a66312a))
* **web:** update focus ring color to meet contrast ratio ([#9460](https://github.com/squareup/market/issues/9460)) ([87af883](https://github.com/squareup/market/commit/87af883a1b3f616a463751f7bbf95dc4140bf17c))



## [7.1.0](https://github.com/squareup/market/compare/@market/web-components@7.0.0...@market/web-components@7.1.0) (2024-11-27)


### :sparkles: Features

* **web:** add market-inline-section-header component ([0e729c8](https://github.com/squareup/market/commit/0e729c8175549ccc875697b74dc017b6ab31401a))


### :bug: Bug Fixes

* **web:** add market-radio innerInput guard ([c5dcaa2](https://github.com/squareup/market/commit/c5dcaa288654c1598f168ded79dc4eced3aee8f6))
* **web:** add tests & storybook for modals accessible names ([#9375](https://github.com/squareup/market/issues/9375)) ([681e196](https://github.com/squareup/market/commit/681e196d0594498696b5f4c750702997d75dc021))
* **web:** Delegate focus of market rows to their underlying controls ([#9305](https://github.com/squareup/market/issues/9305)) ([92efd23](https://github.com/squareup/market/commit/92efd23bf05409b187b582e638b2da35835f3e18))
* **web:** reduce risk of marketComponentsLoaded timing out in tests ([6eccaff](https://github.com/squareup/market/commit/6eccaffa0d0a336504a30247811863f1eae1f52b))
* **web:** simply market-icon logic ([f2c73a5](https://github.com/squareup/market/commit/f2c73a5e82eaaafc540587189c8fc4c2d120d06a))



## [7.0.0](https://github.com/squareup/market/compare/@market/web-components@6.15.0...@market/web-components@7.0.0) (2024-11-15)

### ⚠ BREAKING CHANGES

See the [Market 7.0.0 migration guide](./MIGRATION_GUIDE.md) for guidance on breaking changes. There were many component role changes that could break role-based tests.

* **web:** remove tabindex in market-row if slotted control exist

### :bug: Bug Fixes

* **web:** a11y revert aria-haspopup and related roles on filter, dropdown, button-dropdown ([1dc10e2](https://github.com/squareup/market/commit/1dc10e26381ade0dcfc4797c99fca4b853f35825))
* **web:** a11y update market-row roles for link and button usages, restructure and add a11y tests ([9089bd0](https://github.com/squareup/market/commit/9089bd004e05621a25ad46e1e1aa240817c5c4cf))
* **web:** a11y: fix nested interactive issue in market-link ([1330d81](https://github.com/squareup/market/commit/1330d810ceb54d92b590a70f44c4b02e2ff3acc5))
* **web:** adds expandable content aria controls to filter, dropdown, and dropdown button ([#9061](https://github.com/squareup/market/issues/9061)) ([18f05c1](https://github.com/squareup/market/commit/18f05c10cdc6e31408a17c61a881c1970b905bb5))
* **web:** Fix market list and rows roles ([3c54e37](https://github.com/squareup/market/commit/3c54e37f491e480191328f66a7264c1e9ea8fe16))
* **web:** Remove redundant or unnecessary ARIA ([#8042](https://github.com/squareup/market/issues/8042)) ([2c86db9](https://github.com/squareup/market/commit/2c86db9875341bc1e60b2bcc3baa279755ff6f6b)), closes [#7666](https://github.com/squareup/market/issues/7666)
* **web:** remove tabindex in market-row if slotted control exist ([4474480](https://github.com/squareup/market/commit/44744802c1abbbd94569e00b371857af1a518c49))



## [6.15.0](https://github.com/squareup/market/compare/@market/web-components@6.14.0...@market/web-components@6.15.0) (2024-11-14)


### :sparkles: Features

* **web:** add drag-handle part to market-row ([9d49539](https://github.com/squareup/market/commit/9d4953907356351cf165f2819cb61a4db1c9ce56))


### :bug: Bug Fixes

* **web:** Escape innerInput in case its undefined ([#9261](https://github.com/squareup/market/issues/9261)) ([56c5b97](https://github.com/squareup/market/commit/56c5b9712cf2dba23c7e1bb5f8508745e3ddf317)), closes [#9229](https://github.com/squareup/market/issues/9229)
* **web:** fix how inputs are focused/blurred ([70b5aca](https://github.com/squareup/market/commit/70b5acaf6595f6076e4cdf2dca916edc68061a11))
* **web:** ignore market-table-row clicks when they occur within a market-button-dropdown ([5957590](https://github.com/squareup/market/commit/59575909907ed2ec5935f31ccd7e666a48bfe847))


### :rewind: Reverted

* Revert "fix(web): fix how inputs are focused/blurred" ([c814d64](https://github.com/squareup/market/commit/c814d64cf44dcf508a731f9f865960b5cb97ab04))



## [6.14.0](https://github.com/squareup/market/compare/@market/web-components@6.13.0...@market/web-components@6.14.0) (2024-10-29)


### :sparkles: Features

* **web:** allow for disabling pagination ([b6e3ddc](https://github.com/squareup/market/commit/b6e3ddc9fb8353f20db09e611dc610203151f3b3))


### :bug: Bug Fixes

* market-row keyboard actions in shadow doms ([fcc63f4](https://github.com/squareup/market/commit/fcc63f4b230720daf7aa3d49199a2993c516bbbb))
* **web:** add market-toggle innerInput guard ([4e65199](https://github.com/squareup/market/commit/4e651990cf0c6b21fdf68c7d53895767566a1073))
* **web:** default footer to false in modal stories ([71e2246](https://github.com/squareup/market/commit/71e224654fedfbf35e51a1ba019752894a6bb2ac))
* **web:** Move date picker displayed date validation to fix freezing bug ([523025e](https://github.com/squareup/market/commit/523025e0165831bc6ef69d10840085ebd2e3b94f))
* **web:** remove incorrect button group usage from modal stories ([bb6f7e6](https://github.com/squareup/market/commit/bb6f7e683cb5777c5f18c88d3f334026fbcfc7d2))



## [6.13.0](https://github.com/squareup/market/compare/@market/web-components@6.12.0...@market/web-components@6.13.0) (2024-10-04)

### :sparkles: Features

* **web:** search input is now form associated and implicitly submits ([2807232](https://github.com/squareup/market/commit/2807232454a64b99cf82e1ccae9d9e35c3a08c27))


### :bug: Bug Fixes

* Missing onMutationObserved fuction in Vitest environment ([6d6c396](https://github.com/squareup/market/commit/6d6c396d71584d5f8bf837017f871a36c500f01b))
* **web:** `market-progress-tracker-step` event allow bubbling ([036003e](https://github.com/squareup/market/commit/036003eb3612c5beee69ff7dac8cc6415e56b422))
* **web:** action card / slotted text inputs should accept spaces ([#9033](https://github.com/squareup/market/issues/9033)) ([a07bb57](https://github.com/squareup/market/commit/a07bb57447b4aa8e7957761f2fa6d99c78c83f62))
* **web:** add focus indicator to stepper buttons ([e60a9a7](https://github.com/squareup/market/commit/e60a9a737dbc6a54fd9cbf16490d7c94498496e4))
* **web:** adds accessible highlight prop to market-link component ([#8963](https://github.com/squareup/market/issues/8963)) ([869c27d](https://github.com/squareup/market/commit/869c27d50046d2db7eee72473d42fce8ada271a3))
* **web:** don't dupe IDs in select's cloned display value row ([#9045](https://github.com/squareup/market/issues/9045)) ([67b2b9d](https://github.com/squareup/market/commit/67b2b9d94f0b12135eb3ebd80af70ee1f6d89a52))
* **web:** don't override constructor in market-input-text ([ef4936e](https://github.com/squareup/market/commit/ef4936e94a16d1820551aa9de58f13a80715939e))
* **web:** ensure hover tooltip content can be moused to ([0f36e12](https://github.com/squareup/market/commit/0f36e12bb5a460ff890a4b0b6866caaa55b07c33))
* **web:** fix `market-filter-group` incorrectly querying unnamespaced filters ([3cc9695](https://github.com/squareup/market/commit/3cc9695e2f6f6039ce795cd202c7a0f6f83848a3))
* **web:** hide all filters when searching on mobile ([c91ff66](https://github.com/squareup/market/commit/c91ff660fb15756131499c2ad7c4570c790e98f3))
* **web:** move marketComponentsLoaded to web components package ([4fd6672](https://github.com/squareup/market/commit/4fd66720eeb532fd13daac2c275e70b4a731c068))
* **web:** recompute filter group overflow on filters slot change ([ff19f3a](https://github.com/squareup/market/commit/ff19f3a0a598e4116ab571ed5b913488984e0c0e))
* **web:** remove hover highlight from `readonly` field ([#9080](https://github.com/squareup/market/issues/9080)) ([7a9e31b](https://github.com/squareup/market/commit/7a9e31b88b0a6cde0adb24a9d54f408ba37db44c))
* **web:** replace `<main>` in modals with `<section class="main">` ([e489b10](https://github.com/squareup/market/commit/e489b108f95343af3a51ac7f8858fd5240799f60))
* **web:** search clear icon meets contrast ratio requirements ([b8b0e9a](https://github.com/squareup/market/commit/b8b0e9a3f812dae1f81b58bb6ab66914242f8084))
* **web:** sheet + virtual keyboard + mobile safari bug fixes ([658d2f9](https://github.com/squareup/market/commit/658d2f9befa2e5b266eec1789a7fdf70375d65eb))
* **web:** tap-to-click on drag handle no longer freezes up drag ([f08702e](https://github.com/squareup/market/commit/f08702eadf4d9721903736340d9cf5bfcfb66b87))
* **web:** text input type time now aligns left in iOS ([d731ed6](https://github.com/squareup/market/commit/d731ed6faf2e04dcdd21a2683df37e795f2a2a5e))
* **web:** tooltip: reapply links’ inline styles before rerender ([e8f3ce6](https://github.com/squareup/market/commit/e8f3ce6a6aa234d0724ae7457b745b2d8aead53b))
* **web:** UI-6772: fix for filters within overflow menu not emitting events ([#8985](https://github.com/squareup/market/issues/8985)) ([142aeb8](https://github.com/squareup/market/commit/142aeb86a442cc31169a95c54f6ddd4d45007e9e))
* **web:** update `market-toaster` z-index to 1010 ([b4a02e0](https://github.com/squareup/market/commit/b4a02e05a6b0641882622e8b32f5918cd473ae3f))
* **web:** update broken accessory token references ([c67a429](https://github.com/squareup/market/commit/c67a429049eb8096fd0ad28132b5d7e0201ed816))



## [6.12.0](https://github.com/squareup/market/compare/@market/web-components@6.11.0...@market/web-components@6.12.0) (2024-09-06)


### :sparkles: Features

* **web:** add focusRow() method to market-list ([d668f0e](https://github.com/squareup/market/commit/d668f0e47540b2542e385f840efe3655f845f589))


### :bug: Bug Fixes

* **web:** Check for existence of ElementInternals methods ([b94b201](https://github.com/squareup/market/commit/b94b2012007c6c376b57579aff626c30ae71e1f5))
* **web:** never shrink table sort button ([a9a963a](https://github.com/squareup/market/commit/a9a963a762da433fed2be0da8b683ecdf40d639d))



## [6.11.0](https://github.com/squareup/market/compare/@market/web-components@6.10.0...@market/web-components@6.11.0) (2024-08-29)


### :sparkles: Features

* **web:** add default ids and aria-describedby to MarketField ([0b1f90d](https://github.com/squareup/market/commit/0b1f90df43b4b95cbf9441cf5a172fc5f0d68a12))


### :bug: Bug Fixes

* **web:** Fixing margins for market-header wayfinding and subheading ([337c503](https://github.com/squareup/market/commit/337c503a17310004f9becefb95c0248d1ebae146))
* **web:** sheet and virtual keyboard bug fixes ([#8853](https://github.com/squareup/market/issues/8853)) ([800b614](https://github.com/squareup/market/commit/800b614ded13d2f031c1c67bacec603aed30efd1))



## [6.10.0](https://github.com/squareup/market/compare/@market/web-components@6.9.0...@market/web-components@6.10.0) (2024-08-21)

### :sparkles: Features

* **web:** market-list now supports nested reordering ([05ff7eb](https://github.com/squareup/market/commit/05ff7eb5de530ae60a348947e3e30d1d63732013))

### :bug: Bug Fixes

* **web:** a11y - allow market-input-search to tab into clear or back buttons ([95b4be2](https://github.com/squareup/market/commit/95b4be2bb86c52beba53b2901f032a3cefc53357))
* **web:** Add a11y aria sort and column header for sortable column svg ([#8701](https://github.com/squareup/market/issues/8701)) ([54883a3](https://github.com/squareup/market/commit/54883a344df04354876464c2b8a9aef709516560)), closes [#594](https://github.com/squareup/market/issues/594) [#593](https://github.com/squareup/market/issues/593)
* **web:** Add protective check to suppress Sentry errors ([#8793](https://github.com/squareup/market/issues/8793)) ([65e17dc](https://github.com/squareup/market/commit/65e17dc66fb1bc24cee2e24672fe2ae6737325f3))
* **web:** do not prevent default when enter key is pressed on MarketRow with href ([3c6b430](https://github.com/squareup/market/commit/3c6b430d7d95b0b653f458ab0c6d5c3242dfc714))
* **web:** Hide SVG sprite appended to DOM by market-icon components UI-6580 ([#8838](https://github.com/squareup/market/issues/8838)) ([53e03b0](https://github.com/squareup/market/commit/53e03b09a32c500361d42579ae937ce0e9b5f3bc))
* **web:** Remove emoji hack from autocomplete resolver UISW-94 ([#8812](https://github.com/squareup/market/issues/8812)) ([8b7f2ec](https://github.com/squareup/market/commit/8b7f2ecc0bd9ddb194eeaff6ca5f115c5bab7fa6))


## [6.9.0](https://github.com/squareup/market/compare/@market/web-components@6.8.0...@market/web-components@6.9.0) (2024-08-13)


### :sparkles: Features

* **web:** fire collapsed event when dragged item expands a table group ([20bfe5a](https://github.com/squareup/market/commit/20bfe5ab40a08b17841fe29c7498eecf4ff37500))
* **web:** market-code-input password input support ([69e847b](https://github.com/squareup/market/commit/69e847b5284905e7ba104ddf4c61a56f089a8afc))


### :bug: Bug Fixes

* **web:** adding focus-visible styles to market-link inner element ([#8647](https://github.com/squareup/market/issues/8647)) ([ceb706c](https://github.com/squareup/market/commit/ceb706c1f73c298bb78deda0a83f84a950dff90f))
* **web:** correctly style interactive rows during drag & drop ([9c43584](https://github.com/squareup/market/commit/9c43584a6e91e62437e1446216f0aeadd7d9bf5f), [d631d6c](https://github.com/squareup/market/commit/d631d6ca59b7a06db6c38c9b564a7b152e85213b))
* **web:** don't expand table group on drag hover if no children rows ([cec99fd](https://github.com/squareup/market/commit/cec99fd6ccedfe9b29680092bf60603f805e3c80))
* **web:** enable scrolling on disabled textareas ([1466036](https://github.com/squareup/market/commit/1466036d91970083d708d4b918186645d0a7c9ac))
* **web:** ensure dropdown components only handle internal open & close events ([49b7fa3](https://github.com/squareup/market/commit/49b7fa3c16f5dc83abee860ad55cd19774ac0e93))
* **web:** Fix scroll blocking regression in modals ([320368e](https://github.com/squareup/market/commit/320368e03657c66616ff80b6f1b21b7383044491))
* **web:** icon: set default width + height ([a7c3acf](https://github.com/squareup/market/commit/a7c3acfadc1de49c4039d02d75ce990c20bbd900))
* **web:** list: sync control row state on component reattach ([fe5783e](https://github.com/squareup/market/commit/fe5783e0f6a63fa252192f4cdd82fcfc01c497f2))
* **web:** Revert JS scroll block on market context manager after CSS solution added ([5dab29d](https://github.com/squareup/market/commit/5dab29dcf7c1a59f294b9db634f8ca7cfb189616))
* **web:** rows used inside action cards should not have interactive text styles ([#8630](https://github.com/squareup/market/issues/8630)) ([c49c027](https://github.com/squareup/market/commit/c49c027ddfc78107d2d65fb84a744ab89868f9c8))
* **web:** Update displayed date validation to occur on prop change ([ef5a58c](https://github.com/squareup/market/commit/ef5a58c295339a178710867d533410563340bdab))



## [6.8.1](https://github.com/squareup/market/compare/@market/web-components@6.8.0...@market/web-components@6.8.1) (2024-08-09)


### :bug: Bug Fixes

* **web:** icon: set default width + height ([f49da6e](https://github.com/squareup/market/commit/f49da6edc17c7fce43e87b4feac73114c4448bfe))



## [6.8.0](https://github.com/squareup/market/compare/@market/web-components@6.7.1...@market/web-components@6.8.0) (2024-07-11)


### :sparkles: Features

* **web:** adding optional range-error slot to market-date-picker for custom error string ([#8576](https://github.com/squareup/market/issues/8576)) ([dc984f5](https://github.com/squareup/market/commit/dc984f50f11a09d547c6a9180bf3aa21b2bc8f7d))
* **web:** collapsed table group opens when hovered over with a dragged table row ([f714e8e](https://github.com/squareup/market/commit/f714e8e1f7152b7b8f6de30e67b32ba4268b4564))
* **web:** file upload updates (UI-4902) ([#8412](https://github.com/squareup/market/issues/8412)) ([e27d673](https://github.com/squareup/market/commit/e27d673820a3262a59361193ec83f47c49b080d2))


### :bug: Bug Fixes

* **web:** add protective check in context manager to prevent sentry errors ([f87e6e5](https://github.com/squareup/market/commit/f87e6e53e79d7d251f6e45ade36e13bfc5607361))
* **web:** replace usage of lodash.isEqual on objects ([#8529](https://github.com/squareup/market/issues/8529)) ([8830ac7](https://github.com/squareup/market/commit/8830ac7edcd8468c6422fc44402ba4b6944f5b3b))
* **web:** use ref instead of componentDidRender for innerInput on checkbox, radio, toggle ([#8577](https://github.com/squareup/market/issues/8577)) ([6ea723e](https://github.com/squareup/market/commit/6ea723e86401103be471d54c311fceb061a153ae))


### :recycle: Refactored

* **web:** replace market-activity-indicator svg with market-icon (UI-6212) ([#8530](https://github.com/squareup/market/issues/8530)) ([02bb717](https://github.com/squareup/market/commit/02bb7172a4c9e1e784b39118a51025468b3ee29b))



## [6.7.1](https://github.com/squareup/market/compare/@market/web-components@6.7.0...@market/web-components@6.7.1) (2024-06-27)


### :rewind: Reverted

* Revert "refactor(web): market-field now uses market-inline-status for error slot (#8419)" ([7174799](https://github.com/squareup/market/commit/7174799112aa6ec299d7de1689f0a44ffb384952)), closes [#8419](https://github.com/squareup/market/issues/8419)



## [6.7.0](https://github.com/squareup/market/compare/@market/web-components@6.6.0...@market/web-components@6.7.0) (2024-06-17)


### :sparkles: Features

* **web:** add market support for validity checks on form submission ([4607cc5](https://github.com/squareup/market/commit/4607cc53e3274c8a548b6fe1e6b2d7ef225ada6c))
* **web:** add reorder-mode="framework" to list & table v2 ([#8474](https://github.com/squareup/market/issues/8474)) ([de2378f](https://github.com/squareup/market/commit/de2378f1a9330f24a2b4b59c39760bac6b2fe893))


### :bug: Bug Fixes

* **web:** table v2 caret click stops propagation of native click ([#8559](https://github.com/squareup/market/issues/8559)) ([b24ddc8](https://github.com/squareup/market/commit/b24ddc850d877d1eba5155f3ed613e17cdb46e9f))


### :recycle: Refactored

* **web:** market-button must set CSS color so market-icon can use currentColor ([9185ec6](https://github.com/squareup/market/commit/9185ec620ee155761bb779a979b12607dddcc498))
* **web:** replace market-accordion-item caret with market-icon (UI-6211) ([#8502](https://github.com/squareup/market/issues/8502)) ([933f2c1](https://github.com/squareup/market/commit/933f2c12c61b6144df20de1ef86f16a7ad1d03b1))
* **web:** replace market-button caret svg with market-icon (UI-6213) ([4a0685a](https://github.com/squareup/market/commit/4a0685a15f0e071ff62ab0542ed9b3ce4b2e38c6))
* **web:** replace market-button-group "more" svg with market-icon (UI-6214) ([a1b54ea](https://github.com/squareup/market/commit/a1b54eaf132f766f4fd1f086ad1d10bbc8276f26))
* **web:** replace market-date-picker button svgs with market-icon (UI-6216) ([6b55979](https://github.com/squareup/market/commit/6b5597996727836871eced49a5ab5de91dc784f6))
* **web:** replace market-header button svgs with market-icon (UI-6221) ([a2c8884](https://github.com/squareup/market/commit/a2c8884e0e4644a8b0b971ed52c0302b71bb5b93))
* **web:** replace market-row drill svg with market-icon (UI-6225) ([#8518](https://github.com/squareup/market/issues/8518)) ([5d2ac9c](https://github.com/squareup/market/commit/5d2ac9c2cb5116c721681d59278a29a496f807bc))
* **web:** replace market-toast svgs with market-icon (UI-6232) ([#8519](https://github.com/squareup/market/issues/8519)) ([8bb6160](https://github.com/squareup/market/commit/8bb61602110e050425674878506b2756fc381f29))



## [6.6.0](https://github.com/squareup/market/compare/@market/web-components@6.5.0...@market/web-components@6.6.0) (2024-06-11)


### :sparkles: Features

* **web:** support same date ranges for date picker ([#8424](https://github.com/squareup/market/issues/8424)) ([b76773e](https://github.com/squareup/market/commit/b76773e07885324732361895a3ab26c23dcb1208))


### :bug: Bug Fixes

* **web:** market-list: fix deselect all logic when items are being filtered ([#8449](https://github.com/squareup/market/issues/8449)) ([936dd37](https://github.com/squareup/market/commit/936dd37b09fa9531f856b565f22bbc0f2f71c9a4))


### :recycle: Refactored

* **web:** market-field now uses market-inline-status for error slot ([#8419](https://github.com/squareup/market/issues/8419)) ([92d208e](https://github.com/squareup/market/commit/92d208e93b2dc35b7fb76eaa0eeba1a97daeeb06))



## [6.5.0](https://github.com/squareup/market/compare/@market/web-components@6.4.0...@market/web-components@6.5.0) (2024-05-15)


### :sparkles: Features

* **web:** Add year and month view for date picker ([#8235](https://github.com/squareup/market/issues/8235)) ([7acf8b2](https://github.com/squareup/market/commit/7acf8b2aacd7ca26dda84a35b4be2c2edfeb6c03))
* **web:** Graduate market-accordion-item from beta ([1608d35](https://github.com/squareup/market/commit/1608d351f561b8f5eaad9f8225dc0fd44b4727b3))
* **web:** Graduate market-tabs and subcomponents from beta ([da6a823](https://github.com/squareup/market/commit/da6a823d0b70d96ce354a8f8ce1e6b09f9af9668))
* **web:** Graduate market-tile from beta ([9bbf867](https://github.com/squareup/market/commit/9bbf86782e2e08c9862d65406e2fc4bb4d1de8dc))
* **web:** icon web component UI-1102 ([#8178](https://github.com/squareup/market/issues/8178)) ([b02f2dc](https://github.com/squareup/market/commit/b02f2dc5a8863069e211c3c567eefcfa700c0aa5))
* **web:** UI-5385: `market-progress-tracker` horizontal variant ([#8362](https://github.com/squareup/market/issues/8362)) ([ff1fc73](https://github.com/squareup/market/commit/ff1fc73ea9760f88230c17f91d9a6e6af7ebb565))


### :bug: Bug Fixes

* **web:** Fix flaky bug where indeterminate checkboxes loaded incorrectly in market lists ([#8335](https://github.com/squareup/market/issues/8335)) ([ee3642b](https://github.com/squareup/market/commit/ee3642b42902f679ecfb639eb82ade977834651a)), closes [#6179](https://github.com/squareup/market/issues/6179)
* **web:** guard against no reorder object ([77f9ba0](https://github.com/squareup/market/commit/77f9ba0252398183aca21801b521029fb6ddf701))



## [6.4.0](https://github.com/squareup/market/compare/@market/web-components@6.3.0...@market/web-components@6.4.0) (2024-04-29)


### :sparkles: Features

* **web:** Add subheading slot to market-header ([15ab290](https://github.com/squareup/market/commit/15ab290d00d6cd76b9ee3428dc0a4c65143d13cf))
* **web:** table v2 sort recurses down through nested groups ([42c7d77](https://github.com/squareup/market/commit/42c7d77cf18abfbbe6ce724bd86ae9f2220fc8c5))


### :bug: Bug Fixes

* **web:** Fix bug where pointer wasn't initialized on color picker load ([#8283](https://github.com/squareup/market/issues/8283)) ([5191398](https://github.com/squareup/market/commit/5191398b2cc29296280c17cb677bff986fefe92a))



## [6.3.0](https://github.com/squareup/market/compare/@market/web-components@6.2.0...@market/web-components@6.3.0) (2024-04-18)


### :sparkles: Features

* **web:** Add disabled state on market-color-swatch ([9109782](https://github.com/squareup/market/commit/9109782bf3fc729f0a7a97b5f65a8db386fe6356))
* **web:** add drag-handle CSS part to market-table-v2-row ([0a43f7a](https://github.com/squareup/market/commit/0a43f7a1ad3f7a94cb0c3f7a53b2881a47f65b1f))
* **web:** add drag-handle-visibility="hover" to table v2 rows ([be8577a](https://github.com/squareup/market/commit/be8577a4d9b4185cf09403ad074e93a678ecd4e0))
* **web:** Add market-color-picker parent component ([#8037](https://github.com/squareup/market/issues/8037)) ([db10b31](https://github.com/squareup/market/commit/db10b31fc10ac26352f6b87cd4686607b6fc28ea))
* **web:** Add market-color-picker-input for color picker ([e8f8a1d](https://github.com/squareup/market/commit/e8f8a1d5915ba2326d8866865df2e26c1e53fac2))
* **web:** draggable util now adds transitioning class ([04b8d30](https://github.com/squareup/market/commit/04b8d3041398fccae846428c9ebdad5e2e81e8ad))
* **web:** implement market-inline-status component ([#8050](https://github.com/squareup/market/issues/8050)) ([720c09f](https://github.com/squareup/market/commit/720c09fafa167045643696985ba3f2beffc5ef03))
* **web:** Improve accessibility of `table-v2` interactive controls ([#8020](https://github.com/squareup/market/issues/8020)) ([f366bf5](https://github.com/squareup/market/commit/f366bf56cf8b4460b29601e71ec065e2742d7a04))
* **web:** market-table-v2-group now emits collapsed change event ([b4fac70](https://github.com/squareup/market/commit/b4fac7007e75447f30b5cc2cb7a563e82bcbe067))
* **web:** UI-5667 add ability to have tooltip open by default ([#8013](https://github.com/squareup/market/issues/8013)) ([9df11d7](https://github.com/squareup/market/commit/9df11d7c8263cb4ebe404db4024ba90ad197b563))


### :bug: Bug Fixes

* **web:** `market-input-text` assigning incorrect `aria-label` values to slotted `<input>` ([#8086](https://github.com/squareup/market/issues/8086)) ([a7d638e](https://github.com/squareup/market/commit/a7d638e59d98d149e785b1af95f0c89bf7bceace))
* **web:** collapsing a table group does not collapse its children groups ([bb40c5d](https://github.com/squareup/market/commit/bb40c5dd072af9532de98fa33a93e850b869fb90))
* **web:** correct blade max-width ([#8156](https://github.com/squareup/market/issues/8156)) ([d8922a8](https://github.com/squareup/market/commit/d8922a85ce1e6e2dd857375b5a480fa2b720c3df))
* **web:** fix drag & drop reorder event target bugs ([b603981](https://github.com/squareup/market/commit/b603981b60c05f28bb17cc518f839ea6ba25c98c))
* **web:** fix padding when row is slotted in action-card ([#8161](https://github.com/squareup/market/issues/8161)) ([450e4c6](https://github.com/squareup/market/commit/450e4c6806716809a0c1a73c61895cd993afcefa))
* **web:** fixes [#3616](https://github.com/squareup/market/issues/3616) style market link in tooltips ([#8065](https://github.com/squareup/market/issues/8065)) ([3a9b853](https://github.com/squareup/market/commit/3a9b85368087f1c8d3590151f0b54ae1fc91b6cc))
* **web:** improve state management of inner inputs on controls ([e8c63b1](https://github.com/squareup/market/commit/e8c63b144cb2999a5c7e312e23d0731ca64636e7))
* **web:** table v2 propagates drag enabled to dynamically appended rows ([ebd823f](https://github.com/squareup/market/commit/ebd823f8d937329e9e7b1c9d6474683617cb3ad4))
* **web:** UI-5528 use tooltip tokens in js template ([#8066](https://github.com/squareup/market/issues/8066)) ([082eb01](https://github.com/squareup/market/commit/082eb0184421930a29054318f780b2bfc190c9ae))
* **web:** update local dev env stencil config paths ([#8196](https://github.com/squareup/market/issues/8196)) ([98a4508](https://github.com/squareup/market/commit/98a45084603a3204dd5c14599b02319c1caddeb2)), closes [/github.com/squareup/market/blob/b83f75b2294ebca28c62252b1a379224b739a694/web/web-components/src/styles/global.css#L3-L4](https://github.com/squareup//github.com/squareup/market/blob/b83f75b2294ebca28c62252b1a379224b739a694/web/web-components/src/styles/global.css/issues/L3-L4)
* **web:** update password input eye icons ([52c1923](https://github.com/squareup/market/commit/52c19238be2bf7455d9751b2b99618d03a279d99))


### :rewind: Reverted

* Revert "fix(web): `market-input-text` assigning incorrect `aria-label` values to slotted `<input>` (#8086)" ([e66df98](https://github.com/squareup/market/commit/e66df98b02f069a9cd14225d6fbd23c743cb7f21)), closes [#8086](https://github.com/squareup/market/issues/8086)
* Revert "test(web): avoid spurious html in aria-label" ([4b8b916](https://github.com/squareup/market/commit/4b8b91666ceba1373ae64149771b68f788067efc))



## [6.2.0](https://github.com/squareup/market/compare/@market/web-components@6.1.0...@market/web-components@6.2.0) (2024-03-06)


### :sparkles: Features

* **web:** Add market-color-picker-gradient component for color picker ([c07470e](https://github.com/squareup/market/commit/c07470ea2ebfcd1b1992abab8f2454370c973940))


### :bug: Bug Fixes

* **web:** add default size of 'medium' to accessory ([76982d1](https://github.com/squareup/market/commit/76982d127a8da2cc9b8ed3361727f15233688bec))
* **web:** Rerender rows when slottedControlEl changes ([1ab2231](https://github.com/squareup/market/commit/1ab22319406afa0152828cb9e6829e103d7482f9))


### :rewind: Reverted

* **web:** revert accessory changes ([#7961](https://github.com/squareup/market/issues/7961)) ([9595a6f](https://github.com/squareup/market/commit/9595a6f92b97f5a6634c8b0d75f6414f429047a6))



## [6.1.0](https://github.com/squareup/market/compare/@market/web-components@6.0.0...@market/web-components@6.1.0) (2024-02-26)


### :sparkles: Features

* **web:** add extra interaction polish to drag & drop util ([c6e076d](https://github.com/squareup/market/commit/c6e076d09db986011f319986b4680b5eefad5519))


### :bug: Bug Fixes

* **web:** ensure e.target.selected is updated in card / row events ([10c2916](https://github.com/squareup/market/commit/10c2916e54b01c29f7318da09bf0f416794fd6d7))
* **web:** fix alignment of dragged table row with leading handle ([29df2f1](https://github.com/squareup/market/commit/29df2f16eafbcef367f05ef3234cb50691ca8f9f))
* **web:** Fixes UI-5467 by adding direct child selector to styles in components.css ([fc2302b](https://github.com/squareup/market/commit/fc2302bf4a61f0d436cdc6c2f9a441fa9e76ac3e))



## [6.0.0](https://github.com/squareup/market/compare/@market/web-components@5.9.0...@market/web-components@6.0.0) (2024-02-09)


### ⚠ BREAKING CHANGES

* **web:** rename `market-features` attribute to `data-market-features`
* **web:** upgrade @market/market-theme to v23.0.0
* **web:** context manager blocks scrolling of document root rather than parent element
* **web:** as of @stencil/core 4.6.0, there are TypeScript build errors related to the
events marketTableColumnStick, marketTableColumnUnstick, marketTableRowStick, and
marketTableRowUnstick and their use of Stencil component references in the event detail. this
commit removes those references and refactors market-table to use the event.target as needed.
* **web:** stencil upgrade (2.22.1 → 4.3.0) (#7125)

### :sparkles: Features

* **web:** Add default slotted content styles to global styles ([a94fa88](https://github.com/squareup/market/commit/a94fa88f873081a0391b8e31ea17bf4b651d5c38))
* **web:** context manager blocks scrolling of document root rather than parent element ([492b107](https://github.com/squareup/market/commit/492b107a9e2619d23e80d4914466bbb557785d36))
* **web:** implement market-sheet ([5ad20e5](https://github.com/squareup/market/commit/5ad20e55eeeefa0232f8c68f72eb3826bd92ada6))
* **web:** stencil upgrade (2.22.1 → 4.3.0) ([#7125](https://github.com/squareup/market/issues/7125)) ([c5db6e6](https://github.com/squareup/market/commit/c5db6e6c0187f9633def50388b57bad591342548))
* **web:** tables v2 now supports sorting rows by column ([743a972](https://github.com/squareup/market/commit/743a972c158448eed578b8b00171f09f188715ee))
* **web:** Update dialog component with new tokens from v20.0 ([0039a3a](https://github.com/squareup/market/commit/0039a3a4898edaa8d1e3c7987664d41584258388))


### :bug: Bug Fixes

* **web:** market-sheet should use custom react output target ([#7694](https://github.com/squareup/market/issues/7694)) ([7a11dcd](https://github.com/squareup/market/commit/7a11dcd9ab851112f891fa3a818b49e1e62a5bd9))


### :recycle: Refactored

* **web:** rename `market-features` attribute to `data-market-features` ([cd02ee2](https://github.com/squareup/market/commit/cd02ee2dd66c5311426893775171478beb3ca806))
* **web:** updating market-table row and column stick/unstick events for stencil upgrade ([239b005](https://github.com/squareup/market/commit/239b005ffd299cb0557ff5c332f37a51a193d639))
* **web:** upgrade @market/market-theme to v23.0.0 ([3b03a85](https://github.com/squareup/market/commit/3b03a85eed60f357a840ba209c31c0400ff5971c))



## [5.9.0](https://github.com/squareup/market/compare/@market/web-components@5.8.0...@market/web-components@5.9.0) (2024-02-02)

### :sparkles: Features

* **web:** add popoverStrategy prop to market-button-dropdown ([3250e42](https://github.com/squareup/market/commit/3250e42f639d7217b03e29d9096a66c9ef1d87f8))
* **web:** add popoverStrategy prop to market-button-group ([3a383ef](https://github.com/squareup/market/commit/3a383ef41aafd3cca5e61fe3eabe70c4ea00ad1e))
* **web:** add popoverStrategy prop to market-select ([2b7d8eb](https://github.com/squareup/market/commit/2b7d8eb0cb0c08828c44714f34a7d1041773d32e))
* **web:** table v2 reordering now supports nesting ([38b8e7b](https://github.com/squareup/market/commit/38b8e7bb770eed67b158e20144230375580fbe22))


### :bug: Bug Fixes

* **web:** fix control background color when disabled in iOS Safari ([802c4fc](https://github.com/squareup/market/commit/802c4fc615fc1dac2603b20f6d23f4536e540c16))
* **web:** fix Popper re-initialization in market-dropdown initializePopper() ([8bf7915](https://github.com/squareup/market/commit/8bf7915fcd691fb737ae377746c16f34bc42ce55))


### :recycle: Refactored

* **web:** add elevation shadow CSS vars for drop-shadows ([b05f053](https://github.com/squareup/market/commit/b05f05373d6a741ab69284370a8373f2714b6e76))
* **web:** use outline CSS for action-card focus ring instead of span ([1bc76b3](https://github.com/squareup/market/commit/1bc76b36e3415ff134883be43ed0cc2a77095a92))
* **web:** use outline CSS for button focus ring instead of span ([925eff5](https://github.com/squareup/market/commit/925eff5fbf00eee5c0bc4b7f822c1cc56f293c91))
* **web:** use outline CSS for checkbox focus ring instead of span ([71213cc](https://github.com/squareup/market/commit/71213cc8ee0396c52f7769a6fc883385b651f88b))
* **web:** use outline CSS for choice-button focus ring instead of pseudo ([be92080](https://github.com/squareup/market/commit/be920809068c6267ca7caa22bafc4cd72f0bce94))
* **web:** use outline CSS for radio focus ring instead of span ([a3fee82](https://github.com/squareup/market/commit/a3fee8238d98ec5fa3a5e3af6f1a2a2977911dc7))
* **web:** use outline CSS for row focus ring instead of pseudo ([bd4dfd5](https://github.com/squareup/market/commit/bd4dfd58fda81740848b9d9ef8940b20fa8e1757))
* **web:** use outline CSS for tile focus ring instead of pseudo ([e457198](https://github.com/squareup/market/commit/e457198066252fe9a02c495723d154a2a11b12c8))
* **web:** use outline CSS for toggle focus ring instead of span ([5f2a715](https://github.com/squareup/market/commit/5f2a715fb715bb2d291610c58cbbc723a339f381))



## [5.8.0](https://github.com/squareup/market/compare/@market/web-components@5.7.0...@market/web-components@5.8.0) (2024-01-19)


### :sparkles: Features

* **web:** add slotted control selection to table-v2 ([302dd84](https://github.com/squareup/market/commit/302dd84ac273fd5cbc9f5062159841e90f6b4eaf))
* **web:** market-checkbox setSelection method now takes silent option ([23ba6c2](https://github.com/squareup/market/commit/23ba6c2b5b180074ed004fc5704686f529bfa469))
* **web:** market-radio setSelection method now takes silent option ([db7dae6](https://github.com/squareup/market/commit/db7dae6d027e9a6d729b9057f2dc5e755bd68489))
* **web:** market-toggle setSelection method now takes silent option ([7d437c3](https://github.com/squareup/market/commit/7d437c33ec98470715c7d2543a89a0a90358a4dd))
* **web:** table v2 rows now reorderable via drag & drop ([cc48234](https://github.com/squareup/market/commit/cc482348e4de57e300b38abb708058ccb803b9ab))


### :bug: Bug Fixes

* **web:** fix bug that prevents file from showing when passed in as value ([7d8b065](https://github.com/squareup/market/commit/7d8b06555f6fa22fa99cb34004e6b867468e2b1b))
* **web:** market-list will not select disabled items on "Select all"; added `showSelectableCount` prop ([#7609](https://github.com/squareup/market/issues/7609)) ([ed3684d](https://github.com/squareup/market/commit/ed3684dd2d34f6d21eb51f96fda97b8e9cd40f48))
* **web:** remove market-component css selectors ([#7630](https://github.com/squareup/market/issues/7630)) ([edffc9f](https://github.com/squareup/market/commit/edffc9f708f861faf2bacabfb184e9f1518bc22e))
* **web:** revert MutationObserver with focus-trap; return focus via `checkCanReturnFocus` ([#7660](https://github.com/squareup/market/issues/7660)) ([1a599a8](https://github.com/squareup/market/commit/1a599a8870d9a0002f6f1727c37a888d798dde46))
* **web:** Use max-width for headers ([7b44609](https://github.com/squareup/market/commit/7b44609d6c03cb391c807318fd9124bdbbd96f8b)), closes [#7247](https://github.com/squareup/market/issues/7247)



## [5.7.0](https://github.com/squareup/market/compare/@market/web-components@5.6.0...@market/web-components@5.7.0) (2023-12-15)


### :sparkles: Features

* **web:** Add market-color-swatch for color picker implementation ([de7a36b](https://github.com/squareup/market/commit/de7a36b0c4e470e581440c777d96850510f13ee0))
* **web:** draggable items now scroll a scrollable parent ([749605e](https://github.com/squareup/market/commit/749605e6bf396bebb128c65578a0b821da4b5e39))
* **web:** market-link add support for download attribute ([e0589d1](https://github.com/squareup/market/commit/e0589d1550547eb8443a47714ad0b024f0ba1a95))


### :bug: Bug Fixes

* **web:** filter should display slotted display-value ([bb7bdcf](https://github.com/squareup/market/commit/bb7bdcfa0663da11c014f7a1025b341626799974))
* **web:** Fix [#7392](https://github.com/squareup/market/issues/7392) Nested accessories are triggering has-accessory classes in market-input-field ([9d61fb1](https://github.com/squareup/market/commit/9d61fb14cb9fc21ce0efaf90f7582f895be800ae))
* **web:** fix market-filter display value not rendering sometimes ([#7503](https://github.com/squareup/market/issues/7503)) ([d03d693](https://github.com/squareup/market/commit/d03d6932b43a0ae432c3d985a103e1c690341c16))



## [5.6.0](https://github.com/squareup/market/compare/@market/web-components@5.5.0...@market/web-components@5.6.0) (2023-12-08)

### :sparkles: Features

* **web:** Add locale support for start of weekdays for market date picker ([53f5612](https://github.com/squareup/market/commit/53f5612f516f242164794a220351d71ab541b38c))
* **web:** add market-table-v2-group component (in beta) ([a91eaac](https://github.com/squareup/market/commit/a91eaac6a4084d60a5ee17e3cb52b2d1ddbbfffb))


### :bug: Bug Fixes

* **web:** button group should fill available space when used in flex containers ([#7389](https://github.com/squareup/market/issues/7389)) ([34c501f](https://github.com/squareup/market/commit/34c501faab6f19e8c9935b2c6cd13ee8425aaa7f))
* **web:** remove unused initialScrollingElementOverflowState ([4926792](https://github.com/squareup/market/commit/49267928b2069046571e3739aff45ae889c83e6a))



## [5.5.0](https://github.com/squareup/market/compare/@market/web-components@5.4.0...@market/web-components@5.5.0) (2023-11-10)


### :sparkles: Features

* **web:** add thin size to market-divider ([#7277](https://github.com/squareup/market/issues/7277)) ([4546bf3](https://github.com/squareup/market/commit/4546bf39eae17e6945e7da544437d2ad19cdcca9))
* **web:** tables v2 - add keyboard support to interactive rows & cells ([6e5eb07](https://github.com/squareup/market/commit/6e5eb077e08f63a4baad2d4c6260804008fe37f9))


### :bug: Bug Fixes

* **web:** remove focus styles from row (use focus-ring only) ([#7299](https://github.com/squareup/market/issues/7299)) ([a43eae4](https://github.com/squareup/market/commit/a43eae4ef45450e92ecbf98fb4d4dc4a6cd144c9))
* **web:** unbold displayed selection row in market-select ([5a970e9](https://github.com/squareup/market/commit/5a970e919c58a8382b447bbee5b12a967665790f))



## [5.4.0](https://github.com/squareup/market/compare/@market/web-components@5.3.0...@market/web-components@5.4.0) (2023-10-25)


### :sparkles: Features

* **web:** Add popoverStrategy prop to filter ([a363309](https://github.com/squareup/market/commit/a363309381014fafcf86342bc8a054fbf972721d))
* **web:** Make internal dropdown full width in button-dropdown ([ae5cd0a](https://github.com/squareup/market/commit/ae5cd0a9a09ae4b9cca18a363428e61a6d9c54e2))


### :bug: Bug Fixes

* **web:** Correct disabled color for search input icon ([9b7793a](https://github.com/squareup/market/commit/9b7793a9b8db7e847257ff38688086453cfba39f))


## [5.3.0](https://github.com/squareup/market/compare/@market/web-components@5.2.0...@market/web-components@5.3.0) (2023-10-13)

### :sparkles: Features

* **web:** add market-table-v2 components (in beta) ([819e8cd](https://github.com/squareup/market/commit/819e8cdc21272442c963b9ffb67b640dbb4d394f))
* **web:** add market-tag size medium ([7369460](https://github.com/squareup/market/commit/73694609e4c8995b5d0f0fe863c0a945ef0cb1cc))
* **web:** adding destructive variant / boolean prop to market-row ([9fa0ed3](https://github.com/squareup/market/commit/9fa0ed30b4e89b1eea924af688e66234a3e1604d))


### :bug: Bug Fixes

* **web:** ensure list is visible in open select when it's re-rendered ([2f04251](https://github.com/squareup/market/commit/2f042514af5976ed88dc50fa1615d5f48c3e9aca))
* **web:** Ensure support for getNamespacedTag() in all components ([3c8f658](https://github.com/squareup/market/commit/3c8f658b957beb7fa3ed02034d75f4e81e0f5da3))
* **web:** fix disabled styles for toggle when SSR'd ([1204c97](https://github.com/squareup/market/commit/1204c97c17d523d00baa1f58c38e05f5d94d157a))
* **web:** market-select should support dynamically slotted accessories ([#7157](https://github.com/squareup/market/issues/7157)) ([07789e5](https://github.com/squareup/market/commit/07789e5874c9fbf53a78efe0b378255e203ec333))
* **web:** reorderable util & event should only apply to direct children ([7b7b560](https://github.com/squareup/market/commit/7b7b5600f6a7af426ae993c1e5f19bad5da268f5))
* **web:** set reorderable on list default slot change ([f090ef5](https://github.com/squareup/market/commit/f090ef5c967228e448871511ba2b946dfa0ad813))
* **web:** shift select popover horizontally to keep within viewport ([714bcbe](https://github.com/squareup/market/commit/714bcbee4e642e42a0cf2f5efdd5422b3b06080b))
* **web:** slotted accessories should have less opacity in disabled rows ([3eb32c1](https://github.com/squareup/market/commit/3eb32c13dde0451f3d9575e938497109b556d05e))


## [5.2.0](https://github.com/squareup/market/compare/@market/web-components@5.1.0...@market/web-components@5.2.0) (2023-10-02)

### :sparkles: Features

* **web:** `market-filter-group` new prop: `max-visible-filters` ([#6950](https://github.com/squareup/market/issues/6950)) ([ad2e016](https://github.com/squareup/market/commit/ad2e0160c499c5bd7c64bb4fab72e5d5c202d559))
* **web:** add trailing-accessory slot to market-input-search ([#6990](https://github.com/squareup/market/issues/6990)) ([5774305](https://github.com/squareup/market/commit/5774305de1cef19dcaff2f19a82bde8befae94ae))


### :bug: Bug Fixes

* **web:** market-accordion-item click area symmetry ([0ccd03f](https://github.com/squareup/market/commit/0ccd03fc6c49c1fa690401d59cfa131ed2beaa46))
* **web:** remove default yellow autofill styles from code input in mobile safari ([56106ba](https://github.com/squareup/market/commit/56106ba2ded7f1f90552200c47f46ac754fd3851))


### :recycle: Refactored

* **web:** input field border styles now applied to ::after pseudo-element ([a1c5e83](https://github.com/squareup/market/commit/a1c5e8374ec4c261e0998515a8d5bf307bcc6c24))
* **web:** market-pill SSR support ([b188cae](https://github.com/squareup/market/commit/b188caea51f861c799260330877b8176f508cb6e))
* **web:** market-tag SSR support ([85829c2](https://github.com/squareup/market/commit/85829c221b12401a4d0321a3caaf2c68e21615f3))
* **web:** market-toast SSR support ([548a947](https://github.com/squareup/market/commit/548a94718b9ffb0ffac83813c660e61294e3e480))
* **web:** split market-row CSS into separate files ([2f6bee8](https://github.com/squareup/market/commit/2f6bee8d5ccf5e1506d67302b0b33915553e12ee))
* **web:** SSR support for banner ([3f13707](https://github.com/squareup/market/commit/3f13707af6b6edc8a2677a63053744978e2bbf60))
* **web:** SSR support for choice-button ([41ebfd7](https://github.com/squareup/market/commit/41ebfd78a4c5eab91775f074aa3e9a81fdbfb832))


### :rewind: Reverted

* Revert "feat(web): Use Floating UI for rendering popovers instead of Popper.js" ([1cb06c7](https://github.com/squareup/market/commit/1cb06c7bbd7dd84796ec07e865de1746d258c411))
* Revert "fix(web): Clean up redundant expanded check in open/close dropdown methods" ([e95d83d](https://github.com/squareup/market/commit/e95d83d636f67220bda761ea507a530d4db7fe31))


## [5.1.0](https://github.com/squareup/market/compare/@market/web-components@5.0.0...@market/web-components@5.1.0) (2023-09-22)


### :bug: Bug Fixes

* **web:** guard against missing elements in market-dropdown ([0dd25f6](https://github.com/squareup/market/commit/0dd25f6cd05c6daabb84915c8f50f099856528b3))
* **web:** Clean up redundant expanded check in open/close dropdown methods ([8f17940](https://github.com/squareup/market/commit/8f179403c836171bef611a13f002f652133e5742))
* **web:** fix column-gap in button size variants ([c0ca3ca](https://github.com/squareup/market/commit/c0ca3ca7767472bb38510932f519d48fe3cd1bc9))
* **web:** fix radio selected & disabled styles ([dec0e41](https://github.com/squareup/market/commit/dec0e41e80dca845f6e53408cfad69fa5eaa80c7))
* **web:** set boolean attrs to empty string in custom react output ([535c18b](https://github.com/squareup/market/commit/535c18b181ecfc990a8901e71b5dcb16f7b32e23))
* **web:** update design tokens package to 17.0.0 with associated fixes ([1466f25](https://github.com/squareup/market/commit/1466f2521b6dc68ef552390eb3bd7e6dc22f91ee))

### :sparkles: Features

* **web:** Use Floating UI for rendering popovers instead of Popper.js ([8bd5bc2](https://github.com/squareup/market/commit/8bd5bc2f5863631aea49272fd8b55500dc7f5518))

### :recycle: Refactored

* **web:** extract reorderable util from reorderable lists ([97485e0](https://github.com/squareup/market/commit/97485e039e81ff33500bee657d3fb9e5dfc1b0db))
* **web:** refactor market-button to support SSR ([7aafbb9](https://github.com/squareup/market/commit/7aafbb9ab32f94f0110958a5074db310a2d33a57))
* **web:** update icon slot in button instances to use accessory ([6e7c0ac](https://github.com/squareup/market/commit/6e7c0ac43ae2ac8ad4da81147ec2ea3420786db8))


## [5.0.0](https://github.com/squareup/market/compare/@market/web-components@4.16.1...@market/web-components@5.0.0) (2023-09-08)

### :warning: Breaking Changes

* **web:** renaming market-code-button to market-code-display (#6825) ([7aacfe32b](https://github.com/squareup/market/commit/7aacfe32b))
* **web:** Rename 'helper' slot in market-field to 'bottom-accessory' ([614a2b003](https://github.com/squareup/market/commit/614a2b003))
* **web:** `market-tabs` rework (#6503) ([6e71c049b](https://github.com/squareup/market/commit/6e71c049b))
* **web:** fixes disabled rows to not be clickable ([ece3d7173](https://github.com/squareup/market/commit/ece3d7173))
* **web:** disabled row w/ slotted control inits with disabled control ([73824dbbb](https://github.com/squareup/market/commit/73824dbbb))
* **web:** guard against null rows in market-select ([22a80d762](https://github.com/squareup/market/commit/22a80d762))
* **web:** clicks to context without veil should pass through to page content (#5238) ([409f68a6e](https://github.com/squareup/market/commit/409f68a6e))
* **web:** remove focus-visible polyfill ([1313a5216](https://github.com/squareup/market/commit/1313a5216))
* **web:** update market-button-group overflow logic ([7546c830e](https://github.com/squareup/market/commit/7546c830e))

### :sparkles: Features

* **web:** add preventDefault support to marketRadioValueChange ([200816468](https://github.com/squareup/market/commit/200816468))
* **web:** add preventDefault support to marketCheckboxValueChange ([be555822a](https://github.com/squareup/market/commit/be555822a))
* **web:** add setFocus() method to market-toggle ([9e73cbbb8](https://github.com/squareup/market/commit/9e73cbbb8))
* **web:** add setFocus() method to market-radio ([935a68dd9](https://github.com/squareup/market/commit/935a68dd9))

### :bug: Bug Fixes

* **web:** don't use overflow for stacked button-group ([b6e1b3950](https://github.com/squareup/market/commit/b6e1b3950))
* **web:** update `market-tab` structure (#6863) ([ea063961e](https://github.com/squareup/market/commit/ea063961e))
* **web:** don't measure button widths in stack button-group ([2137c04af](https://github.com/squareup/market/commit/2137c04af))
* **web:** update on tab component group events (#6852) ([1d9962235](https://github.com/squareup/market/commit/1d9962235))
* **web:** market-field helper text should always be visible (#6931) ([f2db64fa6](https://github.com/squareup/market/commit/f2db64fa6))
* **web:** market-tile size prop should be reflected (#6934) ([b0cbf7223](https://github.com/squareup/market/commit/b0cbf7223))
* **web:** Fix issue with caret interaction colors in nested table rows ([456a4e3b7](https://github.com/squareup/market/commit/456a4e3b7))

### :recycle: Refactors

* **web:** remove references to focus-visible class ([68035c072](https://github.com/squareup/market/commit/68035c072))
* **web:** normalize focus management in form controls ([97a9e3d2d](https://github.com/squareup/market/commit/97a9e3d2d))
* **web:** use native :focus-visible in market-button ([5e2930230](https://github.com/squareup/market/commit/5e2930230))
* **web:** use native :focus-visible in market-row ([4ac74a76c](https://github.com/squareup/market/commit/4ac74a76c))
* **web:** use native :focus-visible in market-action-card ([b0ff2ec53](https://github.com/squareup/market/commit/b0ff2ec53))
* **web:** use native :focus-visible in market-toggle ([80e98dde9](https://github.com/squareup/market/commit/80e98dde9))
* **web:** use native :focus-visible in market-radio ([be6d35cab](https://github.com/squareup/market/commit/be6d35cab))
* **web:** use native :focus-visible in market-checkbox ([230762183](https://github.com/squareup/market/commit/230762183))
* **web:** use native :focus-visible in market-choice-button ([e9988cd66](https://github.com/squareup/market/commit/e9988cd66))
* **web:** use native :focus-visible in market-tile ([002de926d](https://github.com/squareup/market/commit/002de926d))


## [4.16.1](https://github.com/squareup/market/compare/@market/web-components@4.16.0...@market/web-components@4.16.1) (2023-08-29)


### :bug: Bug Fixes

* **web:** market-tile should re-render on changes to slotted media ([#6908](https://github.com/squareup/market/issues/6908)) ([0a8a327](https://github.com/squareup/market/commit/0a8a3278ca781f9687cedbaa42490fdd837de73b))



## [4.16.0](https://github.com/squareup/market/compare/@market/web-components@4.15.0...@market/web-components@4.16.0) (2023-08-29)


### :sparkles: Features

* **web:** add reorderable functionality to market-list ([67ad079](https://github.com/squareup/market/commit/67ad079cbd441637cb4c0ba90f4ac04726f5a399))
* **web:** Update modal component to trigger a new event, `marketDialogDidDismiss`, once modals are fully dismissed ([e57dbde](https://github.com/squareup/market/commit/e57dbdee55ae8f56acbcc4455bd0ef3efb51840b))


### :bug: Bug Fixes

* **web:** market-tile should dynamically display slotted media ([cb79ab8](https://github.com/squareup/market/commit/cb79ab86cd89ab3e9d4bb196ae60045151898af2))
* **web:** add hover & pressed states for rows w/ slotted controls ([1f60677](https://github.com/squareup/market/commit/1f60677474980e18fe1a56062bdd86ce3827f6c9))
* **web:** market-choice-button disabled prop should be reflected for CSS styling ([#6854](https://github.com/squareup/market/issues/6854)) ([ffed8e9](https://github.com/squareup/market/commit/ffed8e93bbdb5c2b1995ad4e801c79c9bd059b85))



### v4.15.0 (8/16/2023)

- [[ca27855aa4](https://github.com/squareup/market/commit/ca27855aa4)] fix(web): `market-progress-tracker` add `onSlotchange` handler (#6819)
- [[af02b129f0](https://github.com/squareup/market/commit/af02b129f0)] fix(web): Add check for slotted button to prevent NPE from creating noise in logs
- [[d5e192ed88](https://github.com/squareup/market/commit/d5e192ed88)] feat(web): [ItemTile] Implemented market-item-tile (#6404)
- [[4bce97f259](https://github.com/squareup/market/commit/4bce97f259)] feat(web): Add date and time inputs for date picker
- [[a735d19b2d](https://github.com/squareup/market/commit/a735d19b2d)] fix(web): `market-progress-tracker`: add watcher for step props (#6807)
- [[32af48a44b](https://github.com/squareup/market/commit/32af48a44b)] fix(web): action buttons change color when disabled
- [[fddd958f08](https://github.com/squareup/market/commit/fddd958f08)] feat(web): Create new market-code-button component

### v4.14.0 (8/9/2023)

- [[6c6331a3f](https://github.com/squareup/market/commit/6c6331a3f)] feat(web): add support for preventDefault to row drag events
- [[8a7b12576](https://github.com/squareup/market/commit/8a7b12576)] feat(web): `market-progress-tracker` rework (#6670)
- [[3ea923389](https://github.com/squareup/market/commit/3ea923389)] fix(web): Update helper text token color name in market-select
- [[91f5b788f](https://github.com/squareup/market/commit/91f5b788f)] feat(web): add drag & drop functionality to market-row
- [[0cf714f08](https://github.com/squareup/market/commit/0cf714f08)] fix(web): update row drill icon SVG from figma
- [[5061f0aa5](https://github.com/squareup/market/commit/5061f0aa5)] fix(web): use CSS to handle context manager scroll blocking (#6701)
- [[80d5ab4d9](https://github.com/squareup/market/commit/80d5ab4d9)] feat(web): add market-drag-handle component
- [[e99625c6a](https://github.com/squareup/market/commit/e99625c6a)] fix(web): pre-selected rows should not animate slotted toggles on load (#6606)

### v4.13.0 (7/20/2023)

- [[93ba6a04ff](https://github.com/squareup/market/commit/93ba6a04ff)] feat(web): Add control slot to market-table-row (#6426)

### v4.12.2 (7/10/2023)

- [[a5a36c107d](https://github.com/squareup/market/commit/a5a36c107d)] fix(web): removing check for disabled prop in row click handler

### v4.12.1 (7/7/2023)

- [[c62c32855](https://github.com/squareup/market/commit/c62c32855)] fix(web components): Update market row to allow tooltips in disabled rows
- [[fa2603599](https://github.com/squareup/market/commit/fa2603599)] fix(web): `market-select` `openList` prevent race condition

### v4.12.0 (6/22/2023)

**NOTE**: This was a bad release and is identical to v4.11.1

### v4.11.1 (6/12/2023)

- [[dabaf8f05](https://github.com/squareup/market/commit/dabaf8f05)] fix(web): Fix event listeners in market-progress-tracker (#6362)
- [[3917c58e98](https://github.com/squareup/market/commit/3917c58e98)] fix(web): rename `popover` to `popoverElement` in `market-select` to avoid conflict with native popover API
- [[c688e72703](https://github.com/squareup/market/commit/c688e72703)] fix(web components): Add dialog aria role for dialogs
- [[29660d6d84](https://github.com/squareup/market/commit/29660d6d84)] fix(web components): Fix tooltip trigger text wrapping

### v4.11.0 (6/7/2023)

- [[03ccdc5f84](https://github.com/squareup/market/commit/03ccdc5f84)] feat(web): add leading-accessory support to market-select
- [[4bcc8a3a94](https://github.com/squareup/market/commit/4bcc8a3a94)] fix(web): update `market-list` internal state with dynamic rows (#6354)
- [[199bceed60](https://github.com/squareup/market/commit/199bceed60)] feat(web): ensure that `market-list` emits unique values (#6292)
- [[a14d96620d](https://github.com/squareup/market/commit/a14d96620d)] fix(web): don't let trailing & leading accessories flex-shrink
- [[94e44b8724](https://github.com/squareup/market/commit/94e44b8724)] fix(web): prevent overlay components to `setTimeout` from `connectedCallback` after `disconnectedCallback`

### v4.10.1 (5/18/2023)

- [[82c9b49cc](https://github.com/squareup/market/commit/82c9b49cc)] fix(web): only hide a slotted empty state in a list

### v4.10.0 (5/15/2023)

- [[83469d806](https://github.com/squareup/market/commit/83469d806)] feat(web components): Add presetMenuOption for date picker
- [[be9fca22b](https://github.com/squareup/market/commit/be9fca22b)] fix(web): apply focus-visible polyfill to date-picker-menu shadow DOM
- [[a43881e27](https://github.com/squareup/market/commit/a43881e27)] chore(web): export component types in a way they can be imported in an app's code (#6170)
- [[ea9b95a2e](https://github.com/squareup/market/commit/ea9b95a2e)] fix(web): Update date picker docs for datetime strings and fix broken snapshot test in Safari
- [[8117ff02f](https://github.com/squareup/market/commit/8117ff02f)] fix(web): Fix bug where infinite focus loop can occur when used in Cypress test runner with slotted textarea in market text area component
- [[46993ed07](https://github.com/squareup/market/commit/46993ed07)] feat(web): Create market segmented control for web (#5930)
- [[ed1d6e3aa](https://github.com/squareup/market/commit/ed1d6e3aa)] fix(web): Correct caret rotation on market-table-row
- [[117964f9d](https://github.com/squareup/market/commit/117964f9d)] feat(web): Add market-progress-tracker (#6153)
- [[8daefbf1c](https://github.com/squareup/market/commit/8daefbf1c)] fix(web): list using control row w/ some selections should have indeterminate checkbox (#6179)

### v4.9.0 (5/3/2023)

- [[744156876](https://github.com/squareup/market/commit/744156876)] fix(web): hide list empty state initially
- [[a47ab1e97](https://github.com/squareup/market/commit/a47ab1e97)] fix(market-table): Clicking accordion button does not trigger row clicked event
- [[8cea2dcaa](https://github.com/squareup/market/commit/8cea2dcaa)] fix(web): pressing spacebar in slotted search input in market-select should not close popover (#6123)
- [[36dd0f8a6](https://github.com/squareup/market/commit/36dd0f8a6)] feat(web): Add custom text area slot to market text area component
- [[52c6b59bb](https://github.com/squareup/market/commit/52c6b59bb)] chore(web): moving market-stepper out of beta
- [[ba63ca3eb](https://github.com/squareup/market/commit/ba63ca3eb)] chore(web): moving market-code-input out of beta
- [[83a53c955](https://github.com/squareup/market/commit/83a53c955)] chore(web): moving market-activity-indicator-bar out of beta
- [[6e07eb87e](https://github.com/squareup/market/commit/6e07eb87e)] docs(web): add link and loading stories for market-button
- [[ce9c9fbc4](https://github.com/squareup/market/commit/ce9c9fbc4)] fix(web components): Fix fill alignment in button group to have equal width buttons
- [[debb2cec1](https://github.com/squareup/market/commit/debb2cec1)] fix(web components): Update button group to use overflow design token
- [[786187829](https://github.com/squareup/market/commit/786187829)] docs(web): add more complete button stories based on figma
- [[c5312131f](https://github.com/squareup/market/commit/c5312131f)] fix(web): don't show empty list in market-file-upload

### v4.8.0 (4/19/2023)

- [[fdb9441df](https://github.com/squareup/market/commit/fdb9441df)] fix(web): Remove extra indentation on market-table-rows with accordions
- [[c5312131f](https://github.com/squareup/market/commit/c5312131f)] fix(web): don't show empty list in market-file-upload
- [[9056e40d5](https://github.com/squareup/market/commit/9056e40d5)] feat(web): add ability to prevent modal to get dismissed
- [[c71334117](https://github.com/squareup/market/commit/c71334117)] feat(web): dynamically set `market-context-manager`s `currentContext` with `MutationObserver`

### v4.7.1 (4/13/2023)

- [[8d5bdee97](https://github.com/squareup/market/commit/8d5bdee97)] Revert "fix(web components): Fixed a bunch of button group bugs with resizing of buttons"

### v4.7.0 (4/10/2023)

- [[7c098414f](https://github.com/squareup/market/commit/7c098414f)] feat(web): `market-select` + `market-list` + `market-input-search` (#5910)
- [[1c91b5e9e](https://github.com/squareup/market/commit/1c91b5e9e)] fix(web): guard against empty list & rows in market-select
- [[7550dd79b](https://github.com/squareup/market/commit/7550dd79b)] feat(web): `market-input-search` in `market-list` (#5827)
- [[34f147099](https://github.com/squareup/market/commit/34f147099)] feat(web): add support for pattern & required attrs to market-input-text
- [[3ca1af39d](https://github.com/squareup/market/commit/3ca1af39d)] feat(web): add autovalidate feature to market-input-text
- [[555be368c](https://github.com/squareup/market/commit/555be368c)] feat(web): add support for min & max to market-input-text
- [[555db49ae](https://github.com/squareup/market/commit/555db49ae)] fix(web): hide extra native UI in market-input-text type time
- [[86c27a5bb](https://github.com/squareup/market/commit/86c27a5bb)] fix(web): refactor floating input CSS to fix slotted input placeholder in safari
- [[81cb3a4af](https://github.com/squareup/market/commit/81cb3a4af)] fix(web): fixing table sticky areas and adding docs on horizontal overflow
- [[b5d99a770](https://github.com/squareup/market/commit/b5d99a770)] fix(web): table header rows should always have bottom border
- [[7b5956d97](https://github.com/squareup/market/commit/7b5956d97)] fix(web): Fix issue in table row where parentRow was undefined when trying to read leadingIndentation for nested rows

### v4.6.0 (3/28/2023)

- [[2a7c2a664](https://github.com/squareup/market/commit/2a7c2a664)] feat(web): `market-empty-state` updates (#5838)
- [[da89c3a41](https://github.com/squareup/market/commit/da89c3a41)] fix(web): emit `marketInputSearchValueChange` when input is cleared (#5882)
- [[8a5f763fb](https://github.com/squareup/market/commit/8a5f763fb)] fix(web): row states w/ trailing control now match states w/ leading control
- [[fcdf80e9c](https://github.com/squareup/market/commit/fcdf80e9c)] fix(web components): Fixed a bunch of button group bugs with resizing of buttons

### v4.5.0 (3/23/2023)

- [[4952cfd93](https://github.com/squareup/market/commit/4952cfd93)] feat(web): `market-date-picker` support for `market-filter` (#5767)
- [[ca56d980e](https://github.com/squareup/market/commit/ca56d980e)] feat(web): Do not close dialog if the marketDialogDismissed event has had its default behavior prevented (#5789)
- [[004fa2edc](https://github.com/squareup/market/commit/004fa2edc)] feat(web): `market-list` inject number of items on control row (#5806)
- [[798a3407e](https://github.com/squareup/market/commit/798a3407e)] feat(web): `market-input-search` compact mode in `market-filter-group` (#5716)
- [[e99549533](https://github.com/squareup/market/commit/e99549533)] test(web components): Set static dates for date picker examples for chromatic testing

### v4.4.0 (3/15/2023)

- [[d32d4bbfe](https://github.com/squareup/market/commit/d32d4bbfe)] feat(web): add popoverContainer prop to market-select
- [[58c59a162](https://github.com/squareup/market/commit/58c59a162)] docs(web components): Add date picker example for excludeMenuItems prop
- [[7c20d4315](https://github.com/squareup/market/commit/7c20d4315)] chore(web): `getNamespacedTagFor` with extra TypeScript support (#5682)
- [[05ee02e24](https://github.com/squareup/market/commit/05ee02e24)] chore(web): remove nested extends from typography.css
- [[29f720838](https://github.com/squareup/market/commit/29f720838)] chore(web): replace precss plugin with postcss alternatives
- [[36c072747](https://github.com/squareup/market/commit/36c072747)] fix(market-table): Async nested row indentation

### v4.3.0 (3/7/2023)

- [[bdbb0d58b](https://github.com/squareup/market/commit/bdbb0d58b)] fix(web): #5572 Add role option to market-pill component
- [[12ba6d3c6](https://github.com/squareup/market/commit/12ba6d3c6)] feat(web components): Add excludeMenuItems prop for date picker menu
- [[937245daf](https://github.com/squareup/market/commit/937245daf)] chore(web): quick type fixes
- [[0957ed31c](https://github.com/squareup/market/commit/0957ed31c)] Revert "fix(web): guard against null rows in market-select"
- [[bbfb05a40](https://github.com/squareup/market/commit/bbfb05a40)] Revert "fix(web): `market-field` granular prop propagation (#5667)"
- [[d907d6dae](https://github.com/squareup/market/commit/d907d6dae)] Revert "chore(web): `marketListSelectionsDidChange` + `preventDefault` (#5352)"
- [[19fffc47b](https://github.com/squareup/market/commit/19fffc47b)] chore(web): `market-pagination` stop internal event from propagating (#5686)

### v4.2.0 (2/24/2023)

- [[6586ed6ea](https://github.com/squareup/market/commit/6586ed6ea)] feat(web): forward ARIA attributes for `market-input-text` and `market-textarea` (#5669)
- [[070626e94](https://github.com/squareup/market/commit/070626e94)] feat(web): `market-button` add support for `download` attribute (#5661)
- [[8bb98c9b8](https://github.com/squareup/market/commit/8bb98c9b8)] feat(web): add `role=alert` to `market-toast` (#5670)
- [[893e9f37c](https://github.com/squareup/market/commit/893e9f37c)] feat(web): market-table-column can manage visibility using hidden prop
- [[bc38ca7ba](https://github.com/squareup/market/commit/bc38ca7ba)] fix(web): market-table columns can be hidden using grid-template-columns
- [[b2b047d8b](https://github.com/squareup/market/commit/b2b047d8b)] fix(web): `market-field` granular prop propagation (#5667)
- [[5bdf4c331](https://github.com/squareup/market/commit/5bdf4c331)] fix(web): market-button should react to slot changes (#5642)
- [[6f1624e53](https://github.com/squareup/market/commit/6f1624e53)] feat(web): `market-banner` title slot (#5659)
- [[f9f1f4ce8](https://github.com/squareup/market/commit/f9f1f4ce8)] chore(web): `marketListSelectionsDidChange` + `preventDefault` (#5352)
- [[b63c4bec5](https://github.com/squareup/market/commit/b63c4bec5)] fix(web): auto focus on input upon opening a modal (#5555)
- [[c7798c29a](https://github.com/squareup/market/commit/c7798c29a)] fix(web): reactivate focus trap on MutationObserver (#5576)

### v4.1.0 (2/17/2023)

- [[5e2c673d3](https://github.com/squareup/market/commit/5e2c673d3)] fix(web): control inputs should have aria-label
- [[ff60f15d3](https://github.com/squareup/market/commit/ff60f15d3)] fix(web): text inputs should have aria-label
- [[959065e86](https://github.com/squareup/market/commit/959065e86)] fix(web): adding preventDefault support to marketBannerDismissed event (#5614)
- [[6e08b3c42](https://github.com/squareup/market/commit/6e08b3c42)] fix(web): guard against null rows in market-select
- [[981179650](https://github.com/squareup/market/commit/981179650)] fix(web): market-button-group console errors (#5563)
- [[20931e651](https://github.com/squareup/market/commit/20931e651)] chore(web): finish namespacing the remaining components
- [[1c5b6ff01](https://github.com/squareup/market/commit/1c5b6ff01)] fix(web): inset action-card border to prevent overflow hidden clipping
- [[fc8604c1f](https://github.com/squareup/market/commit/fc8604c1f)] feat(web): add rel prop to market-link
- [[139cd3b54](https://github.com/squareup/market/commit/139cd3b54)] feat(web): add rel prop to market-button
- [[fa2bfa92f](https://github.com/squareup/market/commit/fa2bfa92f)] feat: enable `@storybook/addon-a11y` plugin in storybook

### v4.0.0 (2/13/2023)

- [[a08fa5b26](https://github.com/squareup/market/commit/a08fa5b26)] fix(web): remove browser focus styles from fields
- [[c80c2655a](https://github.com/squareup/market/commit/c80c2655a)] Revert "fix(web): `market-button` icon alignment (#5393)"
- [[77587df2c](https://github.com/squareup/market/commit/77587df2c)] fix(web): use position relative on inputs (restores some custom positioning logic in dashboard)
- [[bd2b005ee](https://github.com/squareup/market/commit/bd2b005ee)] fix(web): fix date picker menu row padding
- [[cdcaa6e9b](https://github.com/squareup/market/commit/cdcaa6e9b)] feat(web): add `small` & `medium` variants to `market-select`
- [[468ac3a6d](https://github.com/squareup/market/commit/468ac3a6d)] fix(web): misc market-row visual bugs
- [[6ada502dd](https://github.com/squareup/market/commit/6ada502dd)] feat(web): add placeholder prop to market-select
- [[46c27e697](https://github.com/squareup/market/commit/46c27e697)] feat(web): market-select caret now rotates on open/close
- [[93f1401bd](https://github.com/squareup/market/commit/93f1401bd)] fix(web): don't shrink the market-select caret when label or options are long
- [[f225d7328](https://github.com/squareup/market/commit/f225d7328)] fix(web): truncate selected option text in market-select
- [[33627130f](https://github.com/squareup/market/commit/33627130f)] refactor!(web): fields now use box shadow instead of border
- [[e9a720548](https://github.com/squareup/market/commit/e9a720548)] feat!(web): add `small` & `medium` variants to `market-input-text` & `market-input-password`
- [[df314b0a8](https://github.com/squareup/market/commit/df314b0a8)] fix(web): loading indicator should never be visible on regular buttons (#5416)
- [[1d81cef76](https://github.com/squareup/market/commit/1d81cef76)] feat(web): market-qrcode can be scaled w/ optional size prop (#5469)
- [[9443bffd6](https://github.com/squareup/market/commit/9443bffd6)] fix(web): text and password input autocomplete value should propagate before user interaction (#5470)

### v3.4.3 (2/3/2023)

- [[ac922d30e](https://github.com/squareup/market/commit/ac922d30e)] revert(web): disabled row should have disabled control

### v3.4.2 (1/31/2023)

- [[63e03a734](https://github.com/squareup/market/commit/63e03a734)] fix(web): disabled row should have disabled control

### v3.4.1 (1/20/2023)

- [[3ba8eb1f1](https://github.com/squareup/market/commit/3ba8eb1f1)] fix(web): handle case where row `selected` prop is set to `null`
- [[10425db00](https://github.com/squareup/market/commit/10425db00)] fix(web): better `market-header` repositioning in `market-modal-full` (#5410)

### v3.4.0 (1/16/2023)

- [[bb874cde5](https://github.com/squareup/market/commit/bb874cde5)] fix(web): `market-button` icon alignment (#5393)
- [[f6c1b76af](https://github.com/squareup/market/commit/f6c1b76af)] fix(web): fix pasting into `market-code-input`
- [[98e765abc](https://github.com/squareup/market/commit/98e765abc)] fix(web): code-input validates initial passed in value
- [[ec1d59fd8](https://github.com/squareup/market/commit/ec1d59fd8)] chore(web): `market-row` control renders first before leading accessory (#5380)
- [[e0d47d267](https://github.com/squareup/market/commit/e0d47d267)] fix(web): pointer cursor on input-password toggle
- [[30089fc03](https://github.com/squareup/market/commit/30089fc03)] fix(web): enforce maxlength on code-input final input

### v3.3.0 (1/6/2023)

- [[bfcabfd83](https://github.com/squareup/market/commit/bfcabfd83)] fix(web): table resize observer shouldn't cause testing infinite loop
- [[19ca30f9e](https://github.com/squareup/market/commit/19ca30f9e)] fix(web): table resize observer shouldn't clobber styles on tables w/o grid-template-columns (#5336)
- [[28abfc3a1](https://github.com/squareup/market/commit/28abfc3a1)] fix(web): remove negative margin from button dropdown (no longer needed)
- [[5cd251e58](https://github.com/squareup/market/commit/5cd251e58)] feat(web): expose dropdown methods from tooltip component (#5320)

### v3.2.0 (12/20/2022)

- [[a7351dc52](https://github.com/squareup/market/commit/a7351dc52)] fix(web): Update `market-context-manager` to reset scroll state on deactivate (#5313)
- [[d11fdc418](https://github.com/squareup/market/commit/d11fdc418)] fix(web): updates to table grid-column-template styles should propagate to rows (#5270)
- [[f1be88f1c](https://github.com/squareup/market/commit/f1be88f1c)] fix(web): Use the namespaced form of market-popover from market-select (#5290)
- [[1f1e4f558](https://github.com/squareup/market/commit/1f1e4f558)] feat(web): add SMS autocomplete support to market-code-input
- [[334c98308](https://github.com/squareup/market/commit/334c98308)] feat(web): setup plugin and add core tokens page to storybook

### v3.1.0 (12/14/2022)

- [[a00f1041f](https://github.com/squareup/market/commit/a00f1041f)] feat(web): `market-input-search` improvements (#5237)
- [[a6ebcd10b](https://github.com/squareup/market/commit/a6ebcd10b)] fix(web): specify market-toggle's cx position as px (#5268)
- [[271babedd](https://github.com/squareup/market/commit/271babedd)] fix(web): prevent `market-button` and `market-link` to throw mutation error
- [[59a0ff36e](https://github.com/squareup/market/commit/59a0ff36e)] fix(web): stricter checks on list control-row functionality (#5248)
- [[5a1da2225](https://github.com/squareup/market/commit/5a1da2225)] feat(web components): Add prop for setting custom disabled dates in date picker
- [[6a5d0b512](https://github.com/squareup/market/commit/6a5d0b512)] fix(web): inherit stdio when spawning stencil from stencil-build.js (#5247)
- [[88945c2fb](https://github.com/squareup/market/commit/88945c2fb)] feat(web): `market-dropdown` use `popoverDistance` instead of padding (#5197)

### v3.0.1 (12/6/2022)

- [[b622e42c7](https://github.com/squareup/market/commit/b622e42c7)] fix(web): adding tsconfig rule and exporting type for MarketFilter.filterType
- [[28f3ee046](https://github.com/squareup/market/commit/28f3ee046)] fix(web): update `market-context` component to only remove `overflow: hidden` when necessary

### v3.0.0 (12/1/2022)

See the [Market 3.0 migration guide](./MIGRATION_GUIDE.md#v300-12012022) for guidance on breaking changes.

- [[0de201c1c](https://github.com/squareup/market/commit/0de201c1c)] feat(web): adding "control-row" slot to market-list to manage interactive multiselect lists
- [[d74e224e0](https://github.com/squareup/market/commit/d74e224e0)] feat(web): `market-filter-group` overflow
- [[03166f1de](https://github.com/squareup/market/commit/03166f1de)] fix(web): radio/toggle aria-checked value should be string
- [[a473bd6f3](https://github.com/squareup/market/commit/a473bd6f3)] feat(web)!: `market-accessory` remove default `size` prop (#4657)
- [[04314394b](https://github.com/squareup/market/commit/04314394b)] fix(web): deprecating setValue() method on controls, updating related tests
- [[d2520e713](https://github.com/squareup/market/commit/d2520e713)] feat(web)!: market-checkbox refactor
- [[3981ee5fc](https://github.com/squareup/market/commit/3981ee5fc)] fix(web)!: making marketToggleChange event consistent with radio/checkbox events
- [[c6a0fba38](https://github.com/squareup/market/commit/c6a0fba38)] feat(web)!: market-radio refactor
- [[cbabfb137](https://github.com/squareup/market/commit/cbabfb137)] chore(web): updating @market/market-theme to 13.4.0
- [[6662a8aa0](https://github.com/squareup/market/commit/6662a8aa0)] chore(react): Bump stencil/react-output-target from 0.0.9 to 0.3.1 and build react-bindings
- [[d65c0e89d](https://github.com/squareup/market/commit/d65c0e89d)] feat(web)!: adding types to emitted events (#4542)
- [[3ce09ceda](https://github.com/squareup/market/commit/3ce09ceda)] feat!(web): market-select now opens list outside of current context
- [[c1fbdbffe](https://github.com/squareup/market/commit/c1fbdbffe)] chore!(web components): Delete deprecated dismiss slot in market-toast
- [[cde1073da](https://github.com/squareup/market/commit/cde1073da)] chore!(web components): Delete deprecated dismiss slot in market-banner
- [[46dca1154](https://github.com/squareup/market/commit/46dca1154)] feat(web): update market-pagination-nav to support new variant without page info
- [[da6be1e7e](https://github.com/squareup/market/commit/da6be1e7e)] fix(web): pass down `aria-*` attributes from `market-button` to `button` component

### v2.24.0 (11/28/2022)

- [[fda730fd2](https://github.com/squareup/market/commit/fda730fd2)] feat(web): market-link supports internal a or button tag (#4903)
- [[9d4591faa](https://github.com/squareup/market/commit/9d4591faa)] feat(web): expanding support of namespaced components (#5119)
- [[544eb7d4a](https://github.com/squareup/market/commit/544eb7d4a)] fix(web): indeterminate invalid checkbox icon color (#4999)
- [[040bdd5cb](https://github.com/squareup/market/commit/040bdd5cb)] fix(web): market-toggle aria-checked value should be string
- [[c3bf90aae](https://github.com/squareup/market/commit/c3bf90aae)] fix(web): market-list: only call .filter if this.value is an array (#5051)
- [[1a0374511](https://github.com/squareup/market/commit/1a0374511)] fix(web): `market-textarea` host is now resizable instead of the internal container (#4993)
- [[ff41e6656](https://github.com/squareup/market/commit/ff41e6656)] feat(web): `trap-focus` opt-in prop for market-blade
- [[4dbf904ee](https://github.com/squareup/market/commit/4dbf904ee)] fix(web): incorrect market-filter-button background color (#5008)

### v2.23.0 (10/27/2022)

- [[c75859818](https://github.com/squareup/market/commit/c75859818)] fix(web): fix `market-button-group` for dynamic prefixes
- [[14ea64ea8](https://github.com/squareup/market/commit/14ea64ea8)] feat(web): adding default slot to market-empty-state
- [[092e539c5](https://github.com/squareup/market/commit/092e539c5)] feat(web): `market-filter-group` and `market-filter` (Beta components)
- [[5eb58d571](https://github.com/squareup/market/commit/5eb58d571)] feat(web): pagination events emit from parent
- [[e6d82f645](https://github.com/squareup/market/commit/e6d82f645)] feat(web): Add market-input-search component

### v2.22.0 (10/12/2022)

- [[edcd79645](https://github.com/squareup/market/commit/edcd79645)] fix(web): dont remove row border when using leading control (#4853)
- [[82f3f15d3](https://github.com/squareup/market/commit/82f3f15d3)] feat(web): add interactivity to table-cell and table-row
- [[64ea9e0d5](https://github.com/squareup/market/commit/64ea9e0d5)] fix(web): accordion should not change color on focus
- [[015d46721](https://github.com/squareup/market/commit/015d46721)] feat(web): add support for custom icon slot in banner

### v2.21.0 (10/4/2022)

- [[fab77bbd4](https://github.com/squareup/market/commit/fab77bbd4)] fix(web): updating market-table base font size to match figma
- [[892f28e24](https://github.com/squareup/market/commit/892f28e24)] fix(web): market-blade should span vertical length of screen
- [[f960ad1da](https://github.com/squareup/market/commit/f960ad1da)] feat(web): emit focus event from market-stepper (#4729)

### v2.20.2 (9/26/2022)

- [[029447a8c](https://github.com/squareup/market/commit/029447a8c)] Revert "feat(web): market-row events now support preventDefault()"
- [[4f07be9f5](https://github.com/squareup/market/commit/4f07be9f5)] fix(web): destroy Popper instances to prevent memory leaks (#4677)
- [[801487abd](https://github.com/squareup/market/commit/801487abd)] fix(web components): Prevent row accessories from shrinking when label wraps

### v2.20.1 (9/16/2022)

- [[4f360c6ed](https://github.com/squareup/market/commit/4f360c6ed)] fix(web): fix style order for accordion item and table cell

### v2.20.0 (9/15/2022)

- [[bb28cb2b5](https://github.com/squareup/market/commit/bb28cb2b5)] feat(web components): market-pagination components (#4477)
- [[85f9c6f82](https://github.com/squareup/market/commit/85f9c6f82)] feat(web): market-row events now support preventDefault()

### v2.19.1 (9/12/2022)

- [[3e647d0a6](https://github.com/squareup/market/commit/3e647d0a6)] fix(web-components): revert Popper memory leak fix again

### v2.19.0 (9/9/2022)

- [[8f78a5b2b](https://github.com/squareup/market/commit/8f78a5b2b)] feat(web): add market-stepper component
- [[66f47433c](https://github.com/squareup/market/commit/66f47433c)] fix(web): remove width restrictions from date picker to enable usage inside popovers
- [[c803d848e](https://github.com/squareup/market/commit/c803d848e)] feat(web): blade and context manager can now be used together (#4239)
- [[25d01acc3](https://github.com/squareup/market/commit/25d01acc3)] feat(web): marketAccordionItemExpandedChange event now supports preventDefault()
- [[18a9837ab](https://github.com/squareup/market/commit/18a9837ab)] docs(web): storybook sidebar now matches figma library
- [[60990034b](https://github.com/squareup/market/commit/60990034b)] feat(web): marketToggleChange event now supports preventDefault()
- [[a81259760](https://github.com/squareup/market/commit/a81259760)] fix(web): generate dialog selector dynamically

### v2.18.2 (8/30/2022)

- [[a0180b164](https://github.com/squareup/market/commit/a0180b164)] fix(web): properly deselect market-list options when value is set via JS
- [[423110306](https://github.com/squareup/market/commit/423110306)] fix(web): market-button no longer displays focus ring on click focus
- [[a93628ecc](https://github.com/squareup/market/commit/a93628ecc)] fix(web): inset input focus border so it doesn't get cut off

### v2.18.1 (8/26/2022)

- [[c8a7e4b95](https://github.com/squareup/market/commit/c8a7e4b95)] fix(web): do not emit code-input event if value did not change
- [[a1f9b5d34](https://github.com/squareup/market/commit/a1f9b5d34)] fix(web): do not emit code-input event if value changed programmatically
- [[6c8d810af](https://github.com/squareup/market/commit/6c8d810af)] fix(web-components): guard against destroying popper on connect (#4547)

### v2.18.0 (8/23/2022)

- [[00e079227](https://github.com/squareup/market/commit/00e079227)] fix(web): Fixes the market-select `Cannot read properties of undefined (reading 'trim')` seen in tests
- [[a95ed3402](https://github.com/squareup/market/commit/a95ed3402)] feat(web): add filter button
- [[1a3d21025](https://github.com/squareup/market/commit/1a3d21025)] fix(web): market-code-input now supports pasting a value
- [[4da6c1485](https://github.com/squareup/market/commit/4da6c1485)] feat(web): add market activity indicator bar
- [[df6ddb36f](https://github.com/squareup/market/commit/df6ddb36f)] fix(web): destroy Popper instances to prevent memory leaks (#4478)

### v2.17.0 (8/18/2022)

- [[ce864bccb](https://github.com/squareup/market/commit/ce864bccb)] fix(web): `trap-focus` opt-in prop for market-dialog, market-modal-full, and market-modal-partial (#4507)
- [[ba0ff339a](https://github.com/squareup/market/commit/ba0ff339a)] build(web components): enable use of Market with additional bundlers (#4318)
- [[2920e02e4](https://github.com/squareup/market/commit/2920e02e4)] feat(web): add `setFocus()` method to `market-button`
- [[71f02d289](https://github.com/squareup/market/commit/71f02d289)] feat(web): `market-input-password` now supports `inputmode`
- [[78d2e2507](https://github.com/squareup/market/commit/78d2e2507)] feat(web): `market-textarea` now supports `inputmode`
- [[34142e6c8](https://github.com/squareup/market/commit/34142e6c8)] feat(web): `market-input-text` now supports `inputmode`
- [[f1d11ff17](https://github.com/squareup/market/commit/f1d11ff17)] feat(web components): Expose setFocus function on market-input-password

### v2.16.1 (8/12/2022)

- [[59a9666b2](https://github.com/squareup/market/commit/59a9666b2)] fix(web): re-revert popper memory leak fix (#4467)

### v2.16.0 (8/11/2022)

- [[138c090f5](https://github.com/squareup/market/commit/138c090f5)] fix(web): add thisYear and lastYear slot to marketDatePicker datePickerMenu
- [[677d1413f](https://github.com/squareup/market/commit/677d1413f)] fix(web): market-input-text: separate the style block that breaks in safari (#4435)
- [[3b8836f52](https://github.com/squareup/market/commit/3b8836f52)] feat(web components): Expose setFocus function on checkbox
- [[465c5ba5b](https://github.com/squareup/market/commit/465c5ba5b)] fix(web components): Add aria-labels to market-toast nav elements
- [[9a87fabdf](https://github.com/squareup/market/commit/9a87fabdf)] feat: Add hydrate-app output target for SSR (#4430)
- [[1f966e9ef](https://github.com/squareup/market/commit/1f966e9ef)] feat(web): `focus-trap` on modals and dialog (#4393)
- [[b4bc391e4](https://github.com/squareup/market/commit/b4bc391e4)] fix(web): add to autofill animation event
- [[745eff720](https://github.com/squareup/market/commit/745eff720)] fix(web components): Check nativeInput presence in market-input-text
- [[aa0d8f2f4](https://github.com/squareup/market/commit/aa0d8f2f4)] fix(web): `market-blade` CSS transition instead of animation (#4410)
- [[53565f41a](https://github.com/squareup/market/commit/53565f41a)] fix(web): adjust dropdown lifecycle updates on popper instance (#4390)
- [[afcc85120](https://github.com/squareup/market/commit/afcc85120)] Revert "fix(web): destroy Popper instances to prevent memory leaks (#4353)"
- [[55404482d](https://github.com/squareup/market/commit/55404482d)] Revert "fix(web): guard against handler firing after popper is destroyed"

### v2.15.1 (8/5/2022)

- [[d0d60a9e7](https://github.com/squareup/market/commit/d0d60a9e7)] fix(web): guard against handler firing after popper is destroyed

### v2.15.0 (8/2/2022)

- [[d45eb7f86](https://github.com/squareup/market/commit/d45eb7f86)] chore(web): fix market-custom-elements.json race condition (#4392)
- [[aabecdf72](https://github.com/squareup/market/commit/aabecdf72)] fix(web): destroy Popper instances to prevent memory leaks (#4353)
- [[aa0bf33c4](https://github.com/squareup/market/commit/aa0bf33c4)] feat: adding menu selection value to marketDateRangeChanged action
- [[925ac791e](https://github.com/squareup/market/commit/925ac791e)] chore(web components): Update stencil to 2.17
- [[efb6589a8](https://github.com/squareup/market/commit/efb6589a8)] chore(web): allow for transforming tag names of market-dropdown related components
- [[51079682a](https://github.com/squareup/market/commit/51079682a)] Use exsiting accordion component approach

### v2.14.1 (7/26/2022)

- [[6e54ac55a](https://github.com/squareup/market/commit/6e54ac55a)] fix(web): text and password inputs now submit forms implicitly

### v2.14.0 (7/20/2022)

- [[e57ff4fa8](https://github.com/squareup/market/commit/e57ff4fa8)] feat(web): Enable dropdown popper instance to update skidding and distance on componentWillUpdate
- [[b44a99bd3](https://github.com/squareup/market/commit/b44a99bd3)] feat(web components): Miscellaneous improvements to market-pill
- [[231bf35d8](https://github.com/squareup/market/commit/231bf35d8)] fix(web components): add 'insight' variant to market-banner

### v2.13.0 (7/13/2022)

- [[891ec9333](https://github.com/squareup/market/commit/891ec9333)] fix(web components): market-text-input should now receive focus whenever dialogs containing such inputs are opened a second time
- [[90d878236](https://github.com/squareup/market/commit/90d878236)] feat(web components): market-accessory now supports icons sized to their original dimensions
- [[681b2a879](https://github.com/squareup/market/commit/681b2a879)] feat(web components): expose dropdown props in tooltip
- [[fd9ef6b1a](https://github.com/squareup/market/commit/fd9ef6b1a)] fix(web components): navigation buttons dynamically slotted into market-header display as expected
- [[50290604f](https://github.com/squareup/market/commit/50290604f)] feat(web components): market-button can optionally take custom tabindex
- [[0b66fd523](https://github.com/squareup/market/commit/0b66fd523)] fix(web components): dismissing a nested dialog does not dismiss its parent dialog
- [[8bf01a42d](https://github.com/squareup/market/commit/8bf01a42d)] chore: replace deprecated emphasis type tokens with semibold
- [[1fd7d004d](https://github.com/squareup/market/commit/1fd7d004d)] fix(web components): fix dark-mode color contrast on date-picker

### vv2.12.2 (6/29/2022)

- [[c91181e7a](https://github.com/squareup/market/commit/c91181e7a)] fix(web): market-row does not intercept descendant keypresses

### v2.12.1 (6/23/2022)

- [[38b195b5b](https://github.com/squareup/market/commit/38b195b5b)] fix(web components): better interaction states on rows used as links
- [[c90fb87eb](https://github.com/squareup/market/commit/c90fb87eb)] fix(web components): adding css part to wrap market-row side slots
- [[fc9d149ec](https://github.com/squareup/market/commit/fc9d149ec)] fix(web components): drill rows functioning as links should not be selectable

### v2.12.0 (6/14/2022)

- [[2ba69eee1](https://github.com/squareup/market/commit/2ba69eee1)] feat(web components): transform market tag names at runtime (EEN-1204)
- [[6f0d7e426](https://github.com/squareup/market/commit/6f0d7e426)] feat(web components): slotted HTML inputs inherit props from parent market input
- [[92b7afaee](https://github.com/squareup/market/commit/92b7afaee)] fix(web components): labels on autofilled text inputs should float
- [[9049bc401](https://github.com/squareup/market/commit/9049bc401)] feat(web components): allow passing a slotted input into market-input-text

### v2.11.2 (6/6/2022)

- [[282655690](https://github.com/squareup/market/commit/282655690)] move @stencil/core from dev dependency to "real one"

### v2.11.1 (6/2/2022)

- [[f09630497](https://github.com/squareup/market/commit/f09630497)] fix(web components): suppress pointer events on select displayed selection
- [[96205e7ab](https://github.com/squareup/market/commit/96205e7ab)] fix(web components): hide extra market-row slots in market-select displayed selection
- [[e5941cd9c](https://github.com/squareup/market/commit/e5941cd9c)] fix(web components): context manager should check for context before dismissing on esc closes #3927
- [[95c0088fc](https://github.com/squareup/market/commit/95c0088fc)] fix(web components): using correct design token for context manager veil closes #3939
- [[3bf1a77fe](https://github.com/squareup/market/commit/3bf1a77fe)] docs(web components): Use shared state list template in select, modal, & grid stories
- [[bc07a4d2c](https://github.com/squareup/market/commit/bc07a4d2c)] fix(web components): don't use main element in toast or banner

### v2.11.0 (5/24/2022)

- [[14de9954e](https://github.com/squareup/market/commit/14de9954e)] move away from tag name selectors in market-row
- [[00a16e079](https://github.com/squareup/market/commit/00a16e079)] feat(web components): promoting market-table components out of beta
- [[63e0eda6e](https://github.com/squareup/market/commit/63e0eda6e)] fix(web components): fixes to sticky table column behavior
- [[cfbbce341](https://github.com/squareup/market/commit/cfbbce341)] chore(web components): market-table docs
- [[8cc088994](https://github.com/squareup/market/commit/8cc088994)] chore(web components): market-table-column docs
- [[ea901357b](https://github.com/squareup/market/commit/ea901357b)] chore(web components): market-table-cell docs
- [[bad73d2dc](https://github.com/squareup/market/commit/bad73d2dc)] chore(web components): market-table-row docs
- [[4e27d41af](https://github.com/squareup/market/commit/4e27d41af)] test(web components): adding tests for market-table
- [[9e50054ae](https://github.com/squareup/market/commit/9e50054ae)] test(web components): tests and related fixes for market-table-row
- [[3aa54158b](https://github.com/squareup/market/commit/3aa54158b)] test(web components): adding tests for market-table-area
- [[c3ae51b30](https://github.com/squareup/market/commit/c3ae51b30)] test(web components): tests and related fixes for market-table-column
- [[52d42d6b6](https://github.com/squareup/market/commit/52d42d6b6)] test(web components): tests and related fixes for market-table-cell

### v2.10.0 (5/18/2022)

- [[b43d5d6cb](https://github.com/squareup/market/commit/b43d5d6cb)] feat(web components): spacebar selects market-row & market-select (#3868)
- [[04c8e90de](https://github.com/squareup/market/commit/04c8e90de)] fix(web components): skip disabled items when navigating market-list with keyboard (#3871)
- [[2673f08e6](https://github.com/squareup/market/commit/2673f08e6)] fix(web components): prevent disabled action-cards from receiving focus (#3872)
- [[ae16f801a](https://github.com/squareup/market/commit/ae16f801a)] feat(web components): [CONV-1045] Implement market-accordion component in market web
- [[bc624e4ee](https://github.com/squareup/market/commit/bc624e4ee)] fix(web-components): market-activity-indicator update svg (#3814)
- [[8eed78131](https://github.com/squareup/market/commit/8eed78131)] fix(web components): reverse modal-full animations to fix blurry content (#3844)

### v2.9.0 (5/10/2022)

- [[8e86c3a27](https://github.com/squareup/market/commit/8e86c3a27)] fix(web components): Properly hide paragraph in market-header in compact mode
- [[462bf6fad](https://github.com/squareup/market/commit/462bf6fad)] fix(web components): fix phantom separator bug in banners & toasts (#3806)
- [[925c716e0](https://github.com/squareup/market/commit/925c716e0)] fix(web components): dialog elements can now use custom ids
- [[21f22705c](https://github.com/squareup/market/commit/21f22705c)] feat(web components): market-dropdown's popover skidding/offset now configurable
- [[ea7014fd8](https://github.com/squareup/market/commit/ea7014fd8)] feat(web): Enable row text truncation, add guide
- [[ce73fa791](https://github.com/squareup/market/commit/ce73fa791)] fix(web components): make market-link inherit font-size and line-height (#3790)
- [[96027fd3a](https://github.com/squareup/market/commit/96027fd3a)] feat(web components): enable tagNameTransform property for renaming web components

### v2.8.0 (5/2/2022)

- [[c025ba377](https://github.com/squareup/market/commit/c025ba377)] fix(web components): Fix padding issues with row in market-date-picker-menu
- [[5f982e564](https://github.com/squareup/market/commit/5f982e564)] feat(web components): Add support for disabled dates in date picker based on timeframe
- [[ca56e5255](https://github.com/squareup/market/commit/ca56e5255)] fix(web components): Correctly remove padding on market-select displayed selection row
- [[f140666a1](https://github.com/squareup/market/commit/f140666a1)] fix(web components): reverting change that caused tables to not render without slotted header columns
- [[9551e273e](https://github.com/squareup/market/commit/9551e273e)] Revert "fix(web components): market-select only display label in displayed-selection slot (#3681)" (#3748)
- [[08002b52b](https://github.com/squareup/market/commit/08002b52b)] feat(web components): Use horizontal padding in full modal for scrollability
- [[7e59b864d](https://github.com/squareup/market/commit/7e59b864d)] feat(web components): add market-tab, market-tab-list, and market-tab-panel (#3527)
- [[2ab11841c](https://github.com/squareup/market/commit/2ab11841c)] feat(web components): Enable market-row to render as link
- [[72363f4f9](https://github.com/squareup/market/commit/72363f4f9)] fix(web components): fix modal enter & exit animations

### v2.7.0 (4/20/2022)

- [[fb972e21d](https://github.com/squareup/market/commit/fb972e21d)] fix(web components) fix dismiss button styles in banner & toast
- [[4c42fc4f6](https://github.com/squareup/market/commit/4c42fc4f6)] fix(web components): market-select only display label in displayed-selection slot (#3681)
- [[a98382efd](https://github.com/squareup/market/commit/a98382efd)] feat(web components): Add support for date picker year selections in shortcut menu
- [[8f6bef0eb](https://github.com/squareup/market/commit/8f6bef0eb)] fix(web components): Update Storybook form example layout
- [[9bf39845c](https://github.com/squareup/market/commit/9bf39845c)] fix(web components): Update market-blade width to match designs
- [[e9fe8c350](https://github.com/squareup/market/commit/e9fe8c350)] feat(web components): add toast animations
- [[a762e5710](https://github.com/squareup/market/commit/a762e5710)] fix(web components): Fix partial modal width on larger screens

### v2.6.1 (4/7/2022)

- [[8756376d0](https://github.com/squareup/market/commit/8756376d0)] fix(web components): fix market-header custom navigation event

### v2.6.0 (4/5/2022)

- [[f2b8acabb](https://github.com/squareup/market/commit/f2b8acabb)] fix(web components): Update existing design tokens to date picker
- [[4024bbdb7](https://github.com/squareup/market/commit/4024bbdb7)] fix(web components): support adding actions dynamically after market-header render
- [[e2abfa000](https://github.com/squareup/market/commit/e2abfa000)] fix(web components): sticky table columns now behave consistently
- [[361cabb04](https://github.com/squareup/market/commit/361cabb04)] fix(web components): sticky table header/footer rows now behave consistently
- [[72a58186c](https://github.com/squareup/market/commit/72a58186c)] fix(web components): Update market-select popover after toggle (#3614)
- [[13a87d2f4](https://github.com/squareup/market/commit/13a87d2f4)] feat(web-components): Market File Upload (#3469)
- [[1890cc3eb](https://github.com/squareup/market/commit/1890cc3eb)] feat(web components): Add controlPosition prop to market-row (#3548)
- [[18c3b3a7f](https://github.com/squareup/market/commit/18c3b3a7f)] feat(web components): make market-button-group go full-width inside market-footer

### v2.5.0 (3/29/2022)

- [[241e8bfce](https://github.com/squareup/market/commit/241e8bfce)] fix(web components): watch for banner slot changes after first render
- [[3380d1d8d](https://github.com/squareup/market/commit/3380d1d8d)] fix(web components): watch for toast slot changes after first render
- [[a08887d8f](https://github.com/squareup/market/commit/a08887d8f)] feat(web components): add trailing-accessory slot to market-row
- [[2d1e338a2](https://github.com/squareup/market/commit/2d1e338a2)] feat(web components): add interaction states to slotted buttons & links in market-toast
- [[2f189c496](https://github.com/squareup/market/commit/2f189c496)] feat(web components): add interaction states to slotted buttons & links in market-banner
- [[9565f40d8](https://github.com/squareup/market/commit/9565f40d8)] fix(web components): Update English based weekday headers to current figma design in date picker
- [[55f644a4a](https://github.com/squareup/market/commit/55f644a4a)] fix(web components): Fix semibold-30 weight typo

### v2.4.0 (3/24/2022)

- [[d95070508](https://github.com/squareup/market/commit/d95070508)] fix(web components): update market-toast to latest design spec
- [[2175adba5](https://github.com/squareup/market/commit/2175adba5)] fix(web components): update market-field error icon and slot spacing to latest design
- [[577cb0fbd](https://github.com/squareup/market/commit/577cb0fbd)] fix(web components): fix focus state on market-toggle
- [[33c8d19eb](https://github.com/squareup/market/commit/33c8d19eb)] feat(web components): add autofocus to market-textarea
- [[e2acee62e](https://github.com/squareup/market/commit/e2acee62e)] fix(web components): Remove temporary banner style overrides
- [[225f4a9e7](https://github.com/squareup/market/commit/225f4a9e7)] fix(web components): Remove temporary font overrides from Square Sans migration
- [[6951bd50f](https://github.com/squareup/market/commit/6951bd50f)] chore(web components): Update to @square/market-theme v10.0.1
- [[c449e95bc](https://github.com/squareup/market/commit/c449e95bc)] fix(web components): adding check for cells on market-table-row fixes #3362
- [[e5175a4f3](https://github.com/squareup/market/commit/e5175a4f3)] fix(web components): async loaded table rows now correctly inherit grid-template-columns style
- [[2c55781a9](https://github.com/squareup/market/commit/2c55781a9)] fix(web components): checkbox should not be clickable when disabled

### v2.3.0 (3/14/2022)

- [[5da14b42d](https://github.com/squareup/market/commit/5da14b42d)] fix(web components): update market-tooltip icon to latest design
- [[2074a942c](https://github.com/squareup/market/commit/2074a942c)] feat(web components): Add date picker events and remove menu selection prop only used for viewing state
- [[44ab23b43](https://github.com/squareup/market/commit/44ab23b43)] chore(web components): upgrading @square/qrcode-encoder dependency<br>
  This should resolve issues where babel-loader has trouble parsing the market-qrcode component

### v2.2.1 (3/10/2022)

- [[65f490ec3](https://github.com/squareup/market/commit/65f490ec3)] fix(web components): `market-list`: ignore empty values (#3422)
- [[5f9ddb660](https://github.com/squareup/market/commit/5f9ddb660)] Fix tooltip documentation typo and regenerate readme

### v2.2.0 (3/9/2022)

- [[f53d0b544](https://github.com/squareup/market/commit/f53d0b544)] feat(web components): multiselect for `market-list` and `market-select` (#3298)
- [[933588d22](https://github.com/squareup/market/commit/933588d22)] Commit generated date-picker files
- [[1827e406a](https://github.com/squareup/market/commit/1827e406a)] Update market-tooltip with shadow parts and docs
- [[be59455a2](https://github.com/squareup/market/commit/be59455a2)] feat(web components): Add shadow part to market-tooltip trigger
- [[423b3fb94](https://github.com/squareup/market/commit/423b3fb94)] feat (web components): add trailing-accessory slot for market-select
- [[e9288e532](https://github.com/squareup/market/commit/e9288e532)] feat(web components): Expose date picker menu options and clean up enums and update tests
- [[6e3889c56](https://github.com/squareup/market/commit/6e3889c56)] feat(web components): market-banner now emits marketBannerDismissed event
- [[dafe27f12](https://github.com/squareup/market/commit/dafe27f12)] fix(web components): update market-banner to latest design spec

### v2.1.0 (3/3/2022)

- [[c0cbd73de](https://github.com/squareup/market/commit/c0cbd73de)] chore(web components): Update qrcode encoder to v0.0.2
- [[12f242721](https://github.com/squareup/market/commit/12f242721)] fix(web components): don't assume headings are present in market-modal-full
- [[0717b31c8](https://github.com/squareup/market/commit/0717b31c8)] fix(web components): don't set the height of market-header when not compact
- [[76cc29fa4](https://github.com/squareup/market/commit/76cc29fa4)] chore(web components): remove action-card box-shadow fallbacks
- [[93a273a16](https://github.com/squareup/market/commit/93a273a16)] fix(web components): truncate text in market-header compact mode
- [[3740a608e](https://github.com/squareup/market/commit/3740a608e)] fix(web components): select can be toggled open/closed using spacebar
- [[40292ab66](https://github.com/squareup/market/commit/40292ab66)] fix(web components): clicks to empty inputs in code-input shift focus to earliest empty input
- [[24630485d](https://github.com/squareup/market/commit/24630485d)] fix(web components): list can be navigated using tab and arrow keys
- [[d95df09f5](https://github.com/squareup/market/commit/d95df09f5)] fix(web components): action card can be focused w/ tab, selected w/ enter
- [[d75a73016](https://github.com/squareup/market/commit/d75a73016)] fix(web components): row can be focused w/ tab, selected w/ enter
- [[824605035](https://github.com/squareup/market/commit/824605035)] feat(web components): Add new component market-empty-state

### v2.0.0 (2/24/2022)

- [[1e1d96cf7](https://github.com/squareup/market/commit/1e1d96cf7)] fix(web): Remove vestigial dialog types from dialog util
- [[157ba1547](https://github.com/squareup/market/commit/157ba1547)] feat(web components): toggle market-header compact state on modal scroll
- [[fb07f23e6](https://github.com/squareup/market/commit/fb07f23e6)] feat!(web components): add compact prop to market-header
- [[8fbda9624](https://github.com/squareup/market/commit/8fbda9624)] fix(web components): change pill default size to medium for 2.0
- [[52f23702f](https://github.com/squareup/market/commit/52f23702f)] chore(web components): Update @market/market-theme to 9.1.0
- [[2cb4b3c1f](https://github.com/squareup/market/commit/2cb4b3c1f)] fix(web components): Add temporary override for button font weight
- [[39513376b](https://github.com/squareup/market/commit/39513376b)] chore(web components): Update @market/market-theme to 8.5.0
- [[e96842a96](https://github.com/squareup/market/commit/e96842a96)] chore(web components): Add font rendering optimizations to base-type mixin
- [[777542c5a](https://github.com/squareup/market/commit/777542c5a)] chore(web components): Add Square Sans support to storybook and update typography stories
- [[8433fcdc1](https://github.com/squareup/market/commit/8433fcdc1)] feat(web components): **BREAKING** Add new Display 20, Medium, and Semibold weights and remove Emphasis weight
- [[f93cbdb42](https://github.com/squareup/market/commit/f93cbdb42)] feat(web components): Add font-family tokens to type styles
- [[4edbc853d](https://github.com/squareup/market/commit/4edbc853d)] chore(web components): **BREAKING** Remove hack to reset SqMarket bold font weight to 700
- [[7b0d53cf7](https://github.com/squareup/market/commit/7b0d53cf7)] chore(web components): Update @market/market-theme to 8.3.0
- [[51eda2df5](https://github.com/squareup/market/commit/51eda2df5)] chore!(web components): Delete deprecated market-modal
- [[3da852f83](https://github.com/squareup/market/commit/3da852f83)] feat!(web components): market-button-dropdown defaults slotted lists to transient

### v1.14.0 (2/23/2022)

- [[da3d9211d](https://github.com/squareup/market/commit/da3d9211d)] feat(web-components): Add leading indentation to table rows
- [[e7adb530c](https://github.com/squareup/market/commit/e7adb530c)] fix(web components): Fix bug where slots were not showing up, some doc clean up
- [[73c637781](https://github.com/squareup/market/commit/73c637781)] feat(web components): Fix multiple bugs within date picker, some code refactoring and clean up
- [[89f63e300](https://github.com/squareup/market/commit/89f63e300)] feat(web components): Add date picker for web
- [[14ed78ea1](https://github.com/squareup/market/commit/14ed78ea1)] feat(web components): Add market date picker menu for web
- [[f04256b24](https://github.com/squareup/market/commit/f04256b24)] feat(web components): Add market date picker date for web
- [[dc9b6720a](https://github.com/squareup/market/commit/dc9b6720a)] feat(web components): Add base file for date picker

### v1.13.0 (2/15/2022)

- [[e3d07e725](https://github.com/squareup/market/commit/e3d07e725)] feat(web components): adding optional global link styles for a tags
- [[5b701013b](https://github.com/squareup/market/commit/5b701013b)] fix(web components): fixing bug where dragging outside modal closes it (#3230)
- [[8a27abfa8](https://github.com/squareup/market/commit/8a27abfa8)] fix(web components): qrcode should only have background color when using data-pixel border
- [[0d9ed2bbc](https://github.com/squareup/market/commit/0d9ed2bbc)] fix(web components): rows slotted into action-card should inherit action-card background color

### v1.12.1 (2/10/2022)

- [[7c83cd8a7](https://github.com/squareup/market/commit/7c83cd8a7)] fix(web-components): stopgap solution for market-select with long text

### v1.12.0 (2/7/2022)

- [[bec73dfbd](https://github.com/squareup/market/commit/bec73dfbd)] feat(web components): adding market-qrcode component
- [[c6d93a5fe](https://github.com/squareup/market/commit/c6d93a5fe)] fix(web components): Fix issue where market-list throws an error when rendered without items
- [[aa7bad5da](https://github.com/squareup/market/commit/aa7bad5da)] fix(web components): Fix market-list issue where multiselect and transient props do not update on children
- [[d40e007ac](https://github.com/squareup/market/commit/d40e007ac)] fix(web components): market-table-column match spec for sorting variants
- [[43bf2878c](https://github.com/squareup/market/commit/43bf2878c)] fix(web components): sortable market-table-column emits marketTableColumnSort event on click
- [[d0a8046d8](https://github.com/squareup/market/commit/d0a8046d8)] fix(web components): replacing use of deprecated row tokens
- [[211219a14](https://github.com/squareup/market/commit/211219a14)] fix(web components): prevent market-button from treating icon badge text as label text

### v1.11.0 (1/28/2022)

- [[5740c88fe](https://github.com/squareup/market/commit/5740c88fe)] feat(web components): Update market-action-card to be deselectable on click after being selected
- [[9d84498d8](https://github.com/squareup/market/commit/9d84498d8)] fix(web-components): watch `value` prop on market-code-input to enable prop updates on re-renders
- [[a47b9ddcc](https://github.com/squareup/market/commit/a47b9ddcc)] fix(web components): update market-action-card styles

### v1.10.0 (1/21/2022)

- [[580b8acb6](https://github.com/squareup/market/commit/580b8acb6)] feat(web components): adding 'origin' to marketDialogDismissed event
- [[1fd08b8c9](https://github.com/squareup/market/commit/1fd08b8c9)] fix(web components): dialogs dismissed via context-manager emit dismissed event
- [[257eabc6a](https://github.com/squareup/market/commit/257eabc6a)] fix(web components): market-checkbox can properly transition between value=checked and value=indeterminate
- [[f63131ff0](https://github.com/squareup/market/commit/f63131ff0)] fix(web-components): Correct market-button margin in market-header per Figma
- [[d99c53966](https://github.com/squareup/market/commit/d99c53966)] feat(web-components): Add trailing accessory to market-table-column

### v1.9.0 (1/14/2022)

- [[3aef088b8](https://github.com/squareup/market/commit/3aef088b8)] feat(web-components): Add trailing accessory to market-table-cell
- [[fbdd21ccf](https://github.com/squareup/market/commit/fbdd21ccf)] fix(web components): clicks pass through market-toaster but not market-toast
- [[42dab4bb6](https://github.com/squareup/market/commit/42dab4bb6)] feat(web components): market-dialog can now be "persistent"/undismissable w/ prop
- [[f3f317672](https://github.com/squareup/market/commit/f3f317672)] feat(web components): market-context-manager now dismisses current dialog on click to veil or esc keydown
- [[149bce097](https://github.com/squareup/market/commit/149bce097)] fix(web components): market-row variant=small has correct minimum height
- [[cc7bdbc72](https://github.com/squareup/market/commit/cc7bdbc72)] fix(web components): market-select now accurately updates displayed selection when row content has been dynamically changed
- [[29ee32de6](https://github.com/squareup/market/commit/29ee32de6)] feat(web components): market-field error slot has aria-role=alert by default
- [[bb9df9318](https://github.com/squareup/market/commit/bb9df9318)] feat(web-components) Market Code Input
- [[dbeac6c3c](https://github.com/squareup/market/commit/dbeac6c3c)] feat(web-components): Add leading accessory to market-table-column

### v1.8.0 (1/7/2022)

- [[b2be79a4b](https://github.com/squareup/market/commit/b2be79a4b)] fix(web components): updating market-button-group 'stack' alignment to show all buttons
- [[aeb9ef8a1](https://github.com/squareup/market/commit/aeb9ef8a1)] fix(web components): market-row now registers slotted control consistently
- [[00339d382](https://github.com/squareup/market/commit/00339d382)] feat(web components): market-select now emits events when opened/closed
- [[962347d69](https://github.com/squareup/market/commit/962347d69)] feat(web components): Add leading accessory to market-table-cell
- [[646080714](https://github.com/squareup/market/commit/646080714)] chore(web components): updating market-toggle to use latest design tokens
- [[a71d4f110](https://github.com/squareup/market/commit/a71d4f110)] fix(web components): updating market-textarea to use latest design tokens
- [[6071de3df](https://github.com/squareup/market/commit/6071de3df)] fix(web components): updating market-tag to use latest design tokens
- [[aa237c0e9](https://github.com/squareup/market/commit/aa237c0e9)] fix(web components): updating market-row to use latest design tokens
- [[be04ac9c0](https://github.com/squareup/market/commit/be04ac9c0)] fix(web components): updating market-radio to use latest design tokens
- [[21b3d866a](https://github.com/squareup/market/commit/21b3d866a)] chore(web components): updating market-popover to use latest design tokens
- [[1fb9dba75](https://github.com/squareup/market/commit/1fb9dba75)] fix(web components): updating market-footer to use latest design tokens
- [[782ee53e5](https://github.com/squareup/market/commit/782ee53e5)] fix(web components): updating market-field and floating input styles to use latest design tokens
- [[887af07ac](https://github.com/squareup/market/commit/887af07ac)] chore(web components): updating market-content-card to use latest design tokens
- [[62d8e9fca](https://github.com/squareup/market/commit/62d8e9fca)] chore(web components): updating market-choice-button to use latest design tokens
- [[0c73746a5](https://github.com/squareup/market/commit/0c73746a5)] chore(web components): updating market-checkbox to use latest design tokens
- [[e3f23d4b0](https://github.com/squareup/market/commit/e3f23d4b0)] fix(web components): updating market-button to use latest design tokens (fixes #2702)
- [[16dbc21cb](https://github.com/squareup/market/commit/16dbc21cb)] fix(web components): updating market-banner to use latest design tokens (partially addresses UI-1364)
- [[93a1a385f](https://github.com/squareup/market/commit/93a1a385f)] fix(web components): updating market-action-card to use latest design tokens
- [[abfb21eb3](https://github.com/squareup/market/commit/abfb21eb3)] chore(web components): upgrading @market/market-theme from 7.0.0 to 8.0.0
- [[8f9faf306](https://github.com/squareup/market/commit/8f9faf306)] fix(web components): slotted links in market-banner should have similar text styles as slotted buttons

### v1.7.0 (12/17/2021)

- [[c30f424b7](https://github.com/squareup/market/commit/c30f424b7)] docs(web components): Update market-action-card story to include transient prop
- [[fdc520b5c](https://github.com/squareup/market/commit/fdc520b5c)] feat(web components): Add market-header option for disabling close button
- [[c54cdd03a](https://github.com/squareup/market/commit/c54cdd03a)] docs(web): Add documentation for attributes vs. properties
- [[22ea16dfe](https://github.com/squareup/market/commit/22ea16dfe)] fix(web components): Fix issue where market-table-row did not show up correctly in stories without header row with columns present
- [[2909163ff](https://github.com/squareup/market/commit/2909163ff)] chore(web components): Clean up some internal props from the storybook documentation for table releted elements
- [[75a217b87](https://github.com/squareup/market/commit/75a217b87)] fix(web components): #2906 Fix market-table rows being unresponsive,
- [[9992bac39](https://github.com/squareup/market/commit/9992bac39)] docs(web): update Web Components crash course doc
- [[f35379ff1](https://github.com/squareup/market/commit/f35379ff1)] fix(web): fix text alignment in toast when there is a hidden dismissed button and a slotted action button

### v1.6.0 (12/10/2021)

- [[6e78ae72f](https://github.com/squareup/market/commit/6e78ae72f)] fix(web components): Update size attribute in row story
- [[2cae985a7](https://github.com/squareup/market/commit/2cae985a7)] refactor(web components): Rearrange row styles for clarity
- [[eecf105d3](https://github.com/squareup/market/commit/eecf105d3)] fix(web components): Fix row active style when controls are slotted
- [[476a890a6](https://github.com/squareup/market/commit/476a890a6)] fix(web components): Don't apply selected row background color when controls are slotted
- [[720d46109](https://github.com/squareup/market/commit/720d46109)] feat(web components): Adding `step` property to `market-input-formatted`
- [[bb1c15789](https://github.com/squareup/market/commit/bb1c15789)] feat(web components): Add popover shadow part to tooltip
- [[90dd73274](https://github.com/squareup/market/commit/90dd73274)] fix(web components): Add max width to tooltip
- [[a4d0856a2](https://github.com/squareup/market/commit/a4d0856a2)] fix(web components): update toast cta margin styling to target dismiss slots

### v1.5.1 (12/3/2021)

- [[f2dd19a77](https://github.com/squareup/market/commit/f2dd19a77)] fix(web components): reposition header inside market-header to left align with modal content

### v1.5.0 (11/19/2021)

- [[78b3f931f](https://github.com/squareup/market/commit/78b3f931f)] test(web components): fixing storybook render smoke test to account for branch names using '+'
- [[c843ecdce](https://github.com/squareup/market/commit/c843ecdce)] fix(web components): Add conditional emoji selector to fix weird Safari repaint bug with market-dropdown
- [[18dc2a1af](https://github.com/squareup/market/commit/18dc2a1af)] test(web components): follow-up tests for disabling scroll when market-context-manager is open
- [[655cb755e](https://github.com/squareup/market/commit/655cb755e)] fix(web components): center isloading spinner in market button
- [[469b0bd4d](https://github.com/squareup/market/commit/469b0bd4d)] feat(web components): adding market-divider
- [[6eaa9da8c](https://github.com/squareup/market/commit/6eaa9da8c)] docs(web components): hide docs mode for market-toaster stories

### v1.4.1 (11/15/2021)

- [[c7af936a0](https://github.com/squareup/market/commit/c7af936a0)] fix(web components): Set row value to string type
- [[acf7ba006](https://github.com/squareup/market/commit/acf7ba006)] fix(web components): Revert button dropdown defaulting lists to transient<br>
  This was a breaking change, so we're postponing it till 2.0.

### v1.4.0 (11/12/2021)

- [[a2dfab9f7](https://github.com/squareup/market/commit/a2dfab9f7)] fix(web components): Check select value property instead of attribute
- [[89445fcd8](https://github.com/squareup/market/commit/89445fcd8)] fix(web components): Fix activity indicator re-render warnings
- [[5e6de91c3](https://github.com/squareup/market/commit/5e6de91c3)] fix(web components): Fix bug where button dropdown lists persisted selection on re-open<br>
  **NOTE:** This change is actually breaking, so we released the patch version 1.4.1 reverting it, and will hold off on making this change for real until 2.0.
- [[da1c8da70](https://github.com/squareup/market/commit/da1c8da70)] feat(web components): market choice button component
- [[2bb39eb5c](https://github.com/squareup/market/commit/2bb39eb5c)] fix(web components): fix isLoading text bug for market button
- [[51573a4c9](https://github.com/squareup/market/commit/51573a4c9)] feat(web components): Add transient property to list, row and action card
- [[92be18726](https://github.com/squareup/market/commit/92be18726)] fix(web components): allow isLoading spinner to render when disabled
- [[31f205acd](https://github.com/squareup/market/commit/31f205acd)] fix(web components): Ensure elements beneath the market-toaster are click through. (#2746)

### v1.3.0 (11/5/2021)

- [[2c503be0a](https://github.com/squareup/market/commit/2c503be0a)] feat(web components): Add progress bar to market-toast
- [[c5509af39](https://github.com/squareup/market/commit/c5509af39)] fix(web components): dropdown components now initialize popper.js later (this helps address but not fully resolve the visual bug reported in #2586)
- [[e220ab68c](https://github.com/squareup/market/commit/e220ab68c)] fix(web components): prevent the page behind market-context-manager from scrolling when the manager is open
- [[c6b4d8a03](https://github.com/squareup/market/commit/c6b4d8a03)] fix(web components): market-links should look the same with or without an href prop
- [[75541ec9b](https://github.com/squareup/market/commit/75541ec9b)] feat(web components): adding new option for 'persistent' interaction on dropdown components
- [[ec1bb79af](https://github.com/squareup/market/commit/ec1bb79af)] fix(web components): Ensuring modals in the context manager take up viewport regardless of scroll (#2709)

### v1.2.0 (10/28/2021)

- [[a38da9e](https://github.com/squareup/market/commit/a38da9e)] feat(web components): **[BETA]** Add beta `market-table` and related components
- [[9fed94d](https://github.com/squareup/market/commit/9fed94d)] fix(web components): add size variants to `market-pill`

### v1.1.0 (10/22/2021)

- [[c3ff51a2f](https://github.com/squareup/market/commit/c3ff51a2f)] fix(web components): reflecting props that get used as selectors in component css
- [[9f48c7e77](https://github.com/squareup/market/commit/9f48c7e77)] fix(web components): Restore market-select default value of empty string
- [[35e3c1c7c](https://github.com/squareup/market/commit/35e3c1c7c)] fix(web components): Textarea should have no padding instead of 2px padding.
- [[02494d449](https://github.com/squareup/market/commit/02494d449)] fix(web components): Anchor toaster to bottom of viewport regardless of scroll
- [[66276bf07](https://github.com/squareup/market/commit/66276bf07)] fix(web components): partial modal should not have margin at medium viewport
- [[ab8b47d15](https://github.com/squareup/market/commit/ab8b47d15)] feat(web components): Add CSS shadow part for market-select popover
- [[012fb7033](https://github.com/squareup/market/commit/012fb7033)] feat(web components): market-tag component
- [[4904ee956](https://github.com/squareup/market/commit/4904ee956)] fix(web components): Refactor checkbox so the input element recieves focus and click events instead of the Host element
- [[1a23349a4](https://github.com/squareup/market/commit/1a23349a4)] fix(web components): safari needs explicit import to access keyframe animations

### v1.0.4 (10/15/2021)

- [[b9b046b43](https://github.com/squareup/market/commit/b9b046b43)] fix(web components): updating link to align w/ text link medium designs (fixes #2537, 2538)
- [[e3f06a9bc](https://github.com/squareup/market/commit/e3f06a9bc)] fix(web components): fix market-pill indicator color to change with variant
- [[b7fef0c56](https://github.com/squareup/market/commit/b7fef0c56)] fix(web components): fixing vendor prefix typo in animation styles
- [[b707553f3](https://github.com/squareup/market/commit/b707553f3)] fix(web components): make market-textarea respect dark mode
- [[1b11745d3](https://github.com/squareup/market/commit/1b11745d3)] fix(web components): fix for long input label text reflow
- [[6069b7675](https://github.com/squareup/market/commit/6069b7675)] fix(web components): tooltip now has larger tap target and aligns correctly in market-input-text accessory slots

### v1.0.3 (10/11/2021)

- [[12be24557](https://github.com/squareup/market/commit/12be24557)] fix(web components): Remove 100% width from market-popover
- [[83f7a8b85](https://github.com/squareup/market/commit/83f7a8b85)] feat(web components): Add popover shadow part to market-button-dropdown
- [[896177f82](https://github.com/squareup/market/commit/896177f82)] fix(web components): Change storybook custom elements file name to stop clobbering Stencil custom elements package
- [[fcd9a789e](https://github.com/squareup/market/commit/fcd9a789e)] fix(web components): button dropdown no longer persists list selection after being closed
- [[6a197538b](https://github.com/squareup/market/commit/6a197538b)] fix(web components): Move popper.js to dependencies to fix failing build issues for new projects
- [[b01acce76](https://github.com/squareup/market/commit/b01acce76)] fix(web components): hide native number arrow on input
- [[d9d721afe](https://github.com/squareup/market/commit/d9d721afe)] fix(web components): fix toggle on empty field in input-password
- [[7fb504189](https://github.com/squareup/market/commit/7fb504189)] chore(web): publishing new release
- [[952863fce](https://github.com/squareup/market/commit/952863fce)] fix(web components): Fix storybook issue where props were not updating for toggle

### v1.0.2 (10/1/2021)

- [[99ac7e379](https://github.com/squareup/market/commit/99ac7e379)] fix (web components): fix market-toast dark mode text color
- [[bb9d8e4bc](https://github.com/squareup/market/commit/bb9d8e4bc)] fix(web components): add cursor pointer to hover in market-button

### v1.0.1 (9/24/2021)

- [[d78c5b98b](https://github.com/squareup/market/commit/d78c5b98b)] fix(web components): Fix partial modal centering

### v1.0.0 (9/24/2021) 🎉

- [[315260007](https://github.com/squareup/market/commit/315260007)] fix(web components): Fix toggle functionality where clicking on the toggle emitted an event
- [[daddcc4f8](https://github.com/squareup/market/commit/daddcc4f8)] chore(web components): Replace hardcoded button min heights with design tokens
- [[024599894](https://github.com/squareup/market/commit/024599894)] refactor!(web components): Update market-row to use small/medium size
- [[e0e67b37c](https://github.com/squareup/market/commit/e0e67b37c)] chore!(web components): Update to @market/market-theme 7.0.0
- [[0378e7cd6](https://github.com/squareup/market/commit/0378e7cd6)] fix(web components): disabled components should have not-allowed cursor
- [[b99ac1eec](https://github.com/squareup/market/commit/b99ac1eec)] feat!(web components): add implicit submission support to market-button
- [[2c5f59fa7](https://github.com/squareup/market/commit/2c5f59fa7)] feat(web components): Add layout property to full modal
- [[2d099f61d](https://github.com/squareup/market/commit/2d099f61d)] fix(web components): remove pointer cursor from market button when isLoading
- [[7e0dfb40a](https://github.com/squareup/market/commit/7e0dfb40a)] fix(web components): Fixes issues where slotted controls in rows were not disabled or selected properly. (#2363)
- [[58bb4cba3](https://github.com/squareup/market/commit/58bb4cba3)] fix(web components): Add back accidentally removed market-button size variant styling
- [[73fd8f40e](https://github.com/squareup/market/commit/73fd8f40e)] refactor(web components): Split modal component into separate full and partial modal components, deprecate market-modal component
- [[6cf9433b1](https://github.com/squareup/market/commit/6cf9433b1)] feat(web components): Add fade in and fade out animations
- [[c64ecbdb9](https://github.com/squareup/market/commit/c64ecbdb9)] fix(web components): more consistent disabled link color
- [[caa91f5c7](https://github.com/squareup/market/commit/caa91f5c7)] fix!(web components): dialogs and modals now use 'hidden' instead of 'active' property to set visibility [UI-1377]
- [[4e05a6227](https://github.com/squareup/market/commit/4e05a6227)] fix(web components): fixing styling on unselected + active market-radio
- [[cac5f3971](https://github.com/squareup/market/commit/cac5f3971)] fix(web components): Fix market-link visited link color
- [[8e3b0ba81](https://github.com/squareup/market/commit/8e3b0ba81)] fix(web components): Fix market modal animation bugs
- [[04d16f2dd](https://github.com/squareup/market/commit/04d16f2dd)] fix(web components): Give dialog modal a screen buffer on mobile
- [[4832c6e89](https://github.com/squareup/market/commit/4832c6e89)] fix(web components): fix modal animations not working in Safari
- [[649185388](https://github.com/squareup/market/commit/649185388)] fix(web components): Fix dialog open/close bug
- [[2ff40b959](https://github.com/squareup/market/commit/2ff40b959)] feat(web components) animate the modal veil enter and exit
- [[f9b71b9cd](https://github.com/squareup/market/commit/f9b71b9cd)] feat(web components): Update modal animations to use match updated design spec
- [[5652e7f92](https://github.com/squareup/market/commit/5652e7f92)] feat(web components): Add .close() method to market-context-manager

### v0.38.0-beta (9/17/2021)

- [[94870e338](https://github.com/squareup/market/commit/94870e338)] feat(web components): Add toggle support for slotting into market-row
- [[af7d2bda4](https://github.com/squareup/market/commit/af7d2bda4)] refactor!(web components): Replace market-link buttonMode with conditional anchor tag in market-button
- [[69588ed51](https://github.com/squareup/market/commit/69588ed51)] fix(web components): market-button-group overflow buttons retain their event handlers [UI-1374]
- [[8f33086c8](https://github.com/squareup/market/commit/8f33086c8)] feat(web components): add market-banner
- [[253d58285](https://github.com/squareup/market/commit/253d58285)] fix(web components): market header navigation and text spacing
- [[fc2e26d39](https://github.com/squareup/market/commit/fc2e26d39)] fix(web components): add side label to market row

### v0.37.1-beta (9/14/2021)

- [[0aa6d8774](https://github.com/squareup/market/commit/0aa6d8774)] fix(web components): Update market-select and market-list to better handle incremental row addition

### v0.37.0-beta (9/10/2021)

- [[9c382f1fc](https://github.com/squareup/market/commit/9c382f1fc)] fix(web components): disable market-button click events for isLoading
- [[92adf6511](https://github.com/squareup/market/commit/92adf6511)] refactor(web components): Refactor market-select and market-list
- [[8fc85c081](https://github.com/squareup/market/commit/8fc85c081)] refactor(web components): Rename option => row in market select
- [[2eaf88062](https://github.com/squareup/market/commit/2eaf88062)] refactor!(web components): remove concept of multiselect from market-select
- [[b26b5b607](https://github.com/squareup/market/commit/b26b5b607)] fix(web components): Add comment and test for ensuring market button group button sizing works
- [[8000c13f5](https://github.com/squareup/market/commit/8000c13f5)] fix(web components): Update button group to use width of button content instead of full button for handling min width
- [[fe087d0e9](https://github.com/squareup/market/commit/fe087d0e9)] chore(web components): Update migration guide for namespace event changes
- [[bcbbe26e9](https://github.com/squareup/market/commit/bcbbe26e9)] chore!(web components): Namespace all events to use market prefix
- [[008e73f2c](https://github.com/squareup/market/commit/008e73f2c)] fix: disable hover and click styling when isLoading is true
- [[92895e8c5](https://github.com/squareup/market/commit/92895e8c5)] fix(web components): remove hover styling on devices without hover for market-row with option role
- [[c7babad12](https://github.com/squareup/market/commit/c7babad12)] feat(web components): Add tests for toggle component
- [[2c539dc7c](https://github.com/squareup/market/commit/2c539dc7c)] feat(web components): Add toggle component to Market web
- [[2dd510f6e](https://github.com/squareup/market/commit/2dd510f6e)] fix(web components): add activity indicator button, update variants for activity indicator in button, set default sizes for activity indicator, and update dialog
- [[5c2498486](https://github.com/squareup/market/commit/5c2498486)] fix(web components): better check for clicks outside dropdown component
- [[3f3444763](https://github.com/squareup/market/commit/3f3444763)] fix(web components): fix action card disabled styling
- [[a355f75cd](https://github.com/squareup/market/commit/a355f75cd)] fix(web components): update icons in market-toast; right-align dismiss button text

### v0.36.0-beta (8/27/2021)

- [[69e00bc89](https://github.com/squareup/market/commit/69e00bc89)] feat(web components): Add tests for toggle component
- [[09881148a](https://github.com/squareup/market/commit/09881148a)] fix(web components): add activity indicator button, update variants for activity indicator in button, set default sizes for activity indicator, and update dialog
- [[246cc1428](https://github.com/squareup/market/commit/246cc1428)] feat(web components): Add toggle component to Market web
- [[34de2e6f6](https://github.com/squareup/market/commit/34de2e6f6)] fix(web components): better check for clicks outside dropdown component
- [[9c6cdfbcd](https://github.com/squareup/market/commit/9c6cdfbcd)] fix(web components): fix action card disabled styling

### v0.35.0-beta (8/25/2021)

- [[5fde10018](https://github.com/squareup/market/commit/5fde10018)] chore!(web components): Update @market/market-theme to v6.0.0-beta<br>
  **Note:** If you're referencing the design token variables included in this package in your own custom styles, you'll need to update any references to the button tokens that were changed in v5.10.0-beta, as outlined [here](https://github.com/squareup/market/blob/main/common/design-tokens/CHANGELOG.md#changed-2).
- [[163370c16](https://github.com/squareup/market/commit/163370c16)] feat(web components): add market-toaster, a component for displaying market-toast
- [[f46ace450](https://github.com/squareup/market/commit/f46ace450)] fix(web components): updating popper-related component props to be consistent
- [[099d13c0e](https://github.com/squareup/market/commit/099d13c0e)] test(web components): basic tests for dropdown/button dropdown/tooltip
- [[1f49cca95](https://github.com/squareup/market/commit/1f49cca95)] fix(web components): better disabled state management for dropdown + button dropdown
- [[4d12da94a](https://github.com/squareup/market/commit/4d12da94a)] fix(web components): market-button-dropdown now expects slotted market-button, not button text
- [[416c066b6](https://github.com/squareup/market/commit/416c066b6)] feat(web components): adding market-tooltip
- [[aa340be63](https://github.com/squareup/market/commit/aa340be63)] fix(web components): refactoring dropdown's use of popover
- [[413530cc7](https://github.com/squareup/market/commit/413530cc7)] feat(web components): using market-button-dropdown in market-button-group
- [[446299914](https://github.com/squareup/market/commit/446299914)] feat(web components): adding market-button-dropdown
- [[0137b4c89](https://github.com/squareup/market/commit/0137b4c89)] feat(web components): adding market-dropdown
- [[f6e63e280](https://github.com/squareup/market/commit/f6e63e280)] docs(web): Specify setup file path for Ember addons
- [[72e6326f0](https://github.com/squareup/market/commit/72e6326f0)] fix(web components): Fix incorrect market in market-pill story
- [[e3017c719](https://github.com/squareup/market/commit/e3017c719)] a11y(web components): market-select / ensure that scrollable region has keyboard access

### v0.34.0-beta (8/13/2021)

- [[c3d5ba86c](https://github.com/squareup/market/commit/c3d5ba86c)] fix(web components): Fix market-textarea maxheight
- [[c5e2a50fe](https://github.com/squareup/market/commit/c5e2a50fe)] fix(web components): fix padding to center text in market button size variants
- [[1abda013e](https://github.com/squareup/market/commit/1abda013e)] Fix infinite loop bug
- [[dbc914b5f](https://github.com/squareup/market/commit/dbc914b5f)] feat(web components): add size property (small, medium, large) to market button, old tokens

### v0.33.0-beta (8/6/2021)

- [[8430692fc](https://github.com/squareup/market/commit/8430692fc)] feat(web components): market activity indicator
- [[dbc914b5f](https://github.com/squareup/market/commit/dbc914b5f)] feat(web components): add size property (small, medium, large) to market button, old tokens
- [[24ca42a09](https://github.com/squareup/market/commit/24ca42a09)] fix(web storybook): changing deps to fix storybook WSOD

### v0.32.0-beta (7/30/2021)

- [[9a9e4df13](https://github.com/squareup/market/commit/9a9e4df13)] fix(web components): Fix visual regression in market-link
- [[3aaf33bfd](https://github.com/squareup/market/commit/3aaf33bfd)] feat(web components): create market-content-card component
- [[c4e938a23](https://github.com/squareup/market/commit/c4e938a23)] feat(web components): add toast component
- [[779921649](https://github.com/squareup/market/commit/779921649)] docs(web): update docs to be more explicit about when applyPolyfills() is needed; make supporting Edge the default case
- [[0b73b34c7](https://github.com/squareup/market/commit/0b73b34c7)] fix(web storybook): updating header stories to use new icon slot
- [[1d65c0db6](https://github.com/squareup/market/commit/1d65c0db6)] feat(web components): Add maxlength to market-textarea
- [[94a64e34e](https://github.com/squareup/market/commit/94a64e34e)] feat(web components): Add minlength and size attributes to market-input-text
- [[84f7f143e](https://github.com/squareup/market/commit/84f7f143e)] docs(web): update ember docs to be more explicit about how to define custom elements

### v0.31.0-beta (7/23/2021)

- [[8be09ca53](https://github.com/squareup/market/commit/59ef8be53)] fix!(web components): vertically align icons in market-button and market-link in button mode

### v0.30.2-beta (7/19/2021)

- [[dd418b222](https://github.com/squareup/market/commit/dd418b222)] fix(web components): Update @market/market-theme to v5.7.0-beta<br>
  **Note:** This update fixes an [issue](https://github.com/squareup/market/issues/1877) where styles were updated to reflect layout size removal, but design token output didn't have that change yet.

### v0.30.1-beta (7/16/2021)

- [[d40ce0024](https://github.com/squareup/market/commit/d40ce0024)] fix(web components): market-header should support longer text (fixes #1594)
- [[2f19f30b8](https://github.com/squareup/market/commit/2f19f30b8)] fix(web): Update market radio to use aria-checked property
- [[2fd1e6ef6](https://github.com/squareup/market/commit/2fd1e6ef6)] fix(web components): Use capture phase for market-button click listener
- [[467f944aa](https://github.com/squareup/market/commit/467f944aa)] chore(web components): Fix some js/ts lint errors
- [[01f7808d3](https://github.com/squareup/market/commit/01f7808d3)] chore(web components): Make lint tasks more consistent
- [[47e00fc5c](https://github.com/squareup/market/commit/47e00fc5c)] chore(web components): Use yarn task for pre-commit lint
- [[5cdaa4e25](https://github.com/squareup/market/commit/5cdaa4e25)] chore(web components): Fix stylelint errors
- [[807851e61](https://github.com/squareup/market/commit/807851e61)] chore(web components): Turn on required-jsdoc lint rule
- [[04aa8a85d](https://github.com/squareup/market/commit/04aa8a85d)] feat(web components): Add compact variant option to row component
- [[f4efa9dc1](https://github.com/squareup/market/commit/f4efa9dc1)] fix(web): Update date and time inputs to properly show placeholder colored text in Safari
- [[6fc47b7ef](https://github.com/squareup/market/commit/6fc47b7ef)] !chore: remove layout size (#1764)

### v0.30.0-beta (7/9/2021)

- [[4bc31966e](https://github.com/squareup/market/commit/4bc31966e)] feat(web storybook): adding introduction page w/ links
- [[80a0eb326](https://github.com/squareup/market/commit/80a0eb326)] docs(web components): adding storybook authoring guide
- [[6b15a7114](https://github.com/squareup/market/commit/6b15a7114)] fix(web storybook): adding override styles for modal + blade canvas size
- [[176ee980a](https://github.com/squareup/market/commit/176ee980a)] feat(web storybook): swapping out knobs for controls w/ auto-generated docs
- [[4a178c9b5](https://github.com/squareup/market/commit/4a178c9b5)] fix(web storybook): fixing light/dark mode regression
- [[a64a2e198](https://github.com/squareup/market/commit/a64a2e198)] feat(web storybook): better hot reloading
- [[aae119bf4](https://github.com/squareup/market/commit/aae119bf4)] chore(web storybook): upgrading storybook deps
- [[7b9c714d2](https://github.com/squareup/market/commit/7b9c714d2)] feat(web): update stencil to copy over scss files from the /styles directory
- [[b1e8c6bc0](https://github.com/squareup/market/commit/b1e8c6bc0)] chore(web components): Add some linebreaks to migration guide

### v0.29.0-beta (6/30/2021)

- [[9368b973a](https://github.com/squareup/market/commit/9368b973a)] fix(web components)!: Expose correct method for manually setting list option
- [[93ad669e1](https://github.com/squareup/market/commit/93ad669e1)] chore(web components): Add types in market-select
- [[b0e8f1206](https://github.com/squareup/market/commit/b0e8f1206)] docs(web components): Add updated docs for textarea and button group
- [[e0cb93a6a](https://github.com/squareup/market/commit/e0cb93a6a)] fix(web components): adding aria-label to modal close x (fixes #1639), spacing fix
- [[e793c4729](https://github.com/squareup/market/commit/e793c4729)] doc(web components): Add jsdoc to market-modal, market-dialog, market-blade, market-context, and market-context-manager components
- [[5f5595875](https://github.com/squareup/market/commit/5f5595875)] doc(web): Add instructions for using modals & context manager
- [[4b721864f](https://github.com/squareup/market/commit/4b721864f)] docs(web): adding info about ember asset prepending
- [[d23319dc1](https://github.com/squareup/market/commit/d23319dc1)] docs(web components): better component docstrings for docs week
- [[104e2249f](https://github.com/squareup/market/commit/104e2249f)] chore(web components): Add migration guide entry for buttonClick removal

### v0.28.1-beta (6/25/2021)

- [[1fcd8dd9e](https://github.com/squareup/market/commit/1fcd8dd9e)] fix(web components): adding minwidth to button styles
- [[a05c146c6](https://github.com/squareup/market/commit/a05c146c6)] fix(web components): fix row leading accessory margin
- [[cdf9d1832](https://github.com/squareup/market/commit/cdf9d1832)] fix(web components): market-select should not allow multiple selections w/o multiselect attr
- [[6cd905f45](https://github.com/squareup/market/commit/6cd905f45)] fix(web components): popper now recalculates popover position accurately
- [[65ab45597](https://github.com/squareup/market/commit/65ab45597)] fix(web components): updating password icon color
- [[f355975f5](https://github.com/squareup/market/commit/f355975f5)] docs(web components): update documentation for market-field, market-footer, market-header, market-input-text, and market-input-password

### v0.28.0-beta (6/17/2021)

- [[dcd550f61](https://github.com/squareup/market/commit/dcd550f61)] feat(web components): UI-928 - Remove "buttonClick" custom event from market-button
- [[1408e67ab](https://github.com/squareup/market/commit/1408e67ab)] chore(web): update react, @types/react and @types/react-dom to same version as in boba-time; multiple versions of @type/react prevented react-bindings from building successfully, so added a resolution for it
- [[b7df5a179](https://github.com/squareup/market/commit/b7df5a179)] fix(web components): market-header now checks for modal parent (instead of the opposite)
- [[487529dfb](https://github.com/squareup/market/commit/487529dfb)] chore(web components): upgrade @stencil/core to 2.6.0
- [[9b8b25cbd](https://github.com/squareup/market/commit/9b8b25cbd)] fix(web components): Delete unused dialog CSS file
- [[fbd1f8b98](https://github.com/squareup/market/commit/fbd1f8b98)] fix!(web components): UI-916 - Namespace CSS animations
- [[e5e7ad40e](https://github.com/squareup/market/commit/e5e7ad40e)] fix(web components): Don't emit click event when market-button is disabled
- [[a03cb5cc8](https://github.com/squareup/market/commit/a03cb5cc8)] Add jsx-a11y linting package
- [[4aeef70c1](https://github.com/squareup/market/commit/4aeef70c1)] docs(web): updating getting started and ember addon docs
- [[a9c467802](https://github.com/squareup/market/commit/a9c467802)] Define an explicit union type for pill variants
- [[21d5507ca](https://github.com/squareup/market/commit/21d5507ca)] feat(web): increase type specificity for enumerable string interface properties
- [[f1cdb6275](https://github.com/squareup/market/commit/f1cdb6275)] Fix run-on sentence in documentation
- [[a5ed1f5c7](https://github.com/squareup/market/commit/a5ed1f5c7)] Utilize inline union types to reduce indirection for consumers
- [[3ec2c9dea](https://github.com/squareup/market/commit/3ec2c9dea)] feat(web): increase type specificity for MarketButton string interface properties

### v0.27.2-beta (5/19/2021)

- [[1409f2ad](https://github.com/squareup/market/commit/1409f2ad)] feat(web): add scss exports for base css files

### v0.27.1-beta (5/7/2021)

- [[416d0218f](https://github.com/squareup/market/commit/416d0218fec4d7c8825132bb4b2b12472ed6b4c0#diff-c1cf8f8c2768cb68a9b059ddffabe1096a2c6f81307c9bf4efc248d7a76bf6eb)] fix(web): Remap bold font weight to 500 in market CSS
- [[0f27c9857](https://github.com/squareup/market/commit/0f27c9857)] fix(web components): SVGs in market should use fill rather than stroke

### v0.27.0-beta (4/30/2021)

- [[de7df361](https://github.com/squareup/market/commit/de7df361)] fix(web): Fix unresolved merge conflict in web components components.d.ts
- [[a8abe745](https://github.com/squareup/market/commit/a8abe745)] feat(web components): Add indicator version of pills
- [[2d055df4](https://github.com/squareup/market/commit/2d055df4)] feat(web components): Add market-pill Stencil component
- [[1cb21bbc](https://github.com/squareup/market/commit/1cb21bbc)] chore(web components): Upgrade @market/web-components' @market/market-theme to v5.1.0
- [[18446de0](https://github.com/squareup/market/commit/18446de0)] fix(market web): Fix incorrect splice call in market-context-manager
- [[bfa66c15](https://github.com/squareup/market/commit/bfa66c15)] fix (web components): Fix async issues when closing and opening modals out of order
- [[8e78eac1](https://github.com/squareup/market/commit/8e78eac1)] fix(web components): using % instead of vh for modal height (UI-1123)
- [[125f81fe](https://github.com/squareup/market/commit/125f81fe)] fix(web components): removing stroke styles for button slotted svgs
- [[05546ff1](https://github.com/squareup/market/commit/05546ff1)] fix(typography): Update documentation to use paragraph-10
- [[bdefd02e](https://github.com/squareup/market/commit/bdefd02e)] lint(web components): small market-field change to get ts linting to pass
- [[73ddc3c6](https://github.com/squareup/market/commit/73ddc3c6)] lint(web components): js and ts/tsx autofix
- [[cefb8a60](https://github.com/squareup/market/commit/cefb8a60)] lint(web components): css autofix
- [[e7942cfd](https://github.com/squareup/market/commit/e7942cfd)] fix(web): eslint should lint js OR ts
- [[ba03d9b5](https://github.com/squareup/market/commit/ba03d9b5)] chore(web): updating .gitignore & .eslintignore
- [[b465c3e6](https://github.com/squareup/market/commit/b465c3e6)] fix(web): replace missing image in market-accessory

### v0.26.4-beta (4/20/2021)

- [[02fbb975](https://github.com/squareup/market/commit/9100d96d)] fix(web components): Fix bug where market-action-card did not properly change padding based on slotted rows
- [[35905676](https://github.com/squareup/market/commit/c890ac86)] fix(web components): Fix button group extra left margin on fill alignment
- [[5a90056e](https://github.com/squareup/market/commit/53ece918)] fix(web-components): market-list propagates selected state to market-row nested in market-action-card
- [[c42d0505](https://github.com/squareup/market/commit/05eee91a)] fix(web components): radios should not be togglable [UI-1052]
- [[0123bc1f](https://github.com/squareup/market/commit/fc491044)] fix(web components): clicking slotted links in market-row shouldn't select the row
- [[5f0bd594](https://github.com/squareup/market/commit/7091d8b7)] fix(web components): market-row's bottom border shouldn't disappear
- [[8f02320c](https://github.com/squareup/market/commit/6eae5a35)] fix(web components): interactive row label inherits cursor from parent
- [[3217e335](https://github.com/squareup/market/commit/5f132097)] fix(web components): fixing css vars used for checkbox/radio active states

### v0.26.3-beta (4/9/2021)

- [[e8110ba6](https://github.com/squareup/market/commit/e8110ba6)] fix(web components): Fix bug where market-link used an incorrect font
- [[61d549ff](https://github.com/squareup/market/commit/61d549ff)] fix(web-components): remove underline from tertiary buttons

### v0.26.2-beta (4/7/2021)

- [[935b5cfe](https://github.com/squareup/market/commit/935b5cfe)] fix(web components): market-list re-register items when they change

### v0.26.1-beta (4/6/2021)

- [[b152e182](https://github.com/squareup/market/commit/b152e182)] fix(web components): ignore duplicat dialogLoaded events
- [[10309488](https://github.com/squareup/market/commit/10309488)] fix(web components): market-field now passes disabled prop to slotted market-select

### v0.26.0-beta (4/2/2021)

- [[c47f9184](https://github.com/squareup/market/commit/c47f9184)] fix(market-select): cache rows as early as possible
- [[10309488](https://github.com/squareup/market/commit/10309488)] fix(web components): market-field now passes disabled prop to slotted market-select
- [[14f0c203](https://github.com/squareup/market/commit/14f0c203)] chore(web-components): upgrade @market/market-theme to v4.0.1-beta
- [[6b9cc618](https://github.com/squareup/market/commit/6b9cc618)] fix!(web components): Update grid helpers to add row spacing, remove margin
- [[553b7327](https://github.com/squareup/market/commit/553b7327)] chore(pizza time): Use latest @market/market-theme (4.0.0-beta)

### v0.25.0-beta (3/26/2021)

- [[012a1410](https://github.com/squareup/market/commit/012a1410)] fix(web components): Fix bug where button group errors with only one button
- [[1ae2880b](https://github.com/squareup/market/commit/1ae2880b)] fix(web components): Fix button group design token import
- [[4680f81f](https://github.com/squareup/market/commit/4680f81f)] feat(web components): UI-1044 - Emit values in market-list change events

### v0.24.0-beta (3/19/2021)

- [[340058e33](https://github.com/squareup/market/commit/340058e33)] chore(web components): Check in updated component docs
- [[9abe5efbd](https://github.com/squareup/market/commit/9abe5efbd)] feat(web components): Don't deselect action cards on subsequent click
- [[55eb7cab6](https://github.com/squareup/market/commit/55eb7cab6)] feat(web components): UI-1036 - Enable market-list to work with action card that don't contain rows
- [[63816f287](https://github.com/squareup/market/commit/63816f287)] add flex-shrink 0 to market-row svg

### v0.23.0-beta (3/12/2021)

- [[9cf728fb3](https://github.com/squareup/market/commit/9cf728fb3)] fix(web components): delay dialogLoaded event until animation done
- [[210ada45c](https://github.com/squareup/market/commit/210ada45c)] fix(web components): fixing bg color on active buttons
- [[b09f87373](https://github.com/squareup/market/commit/b09f87373)] fix(web components): fixing bg color on selected rows w/ slotted controls
- [[4a1a56077](https://github.com/squareup/market/commit/4a1a56077)] chore(web components): consuming updated design tokens

### v0.22.1-beta (3/10/2021)

- [[55bd167ca](https://github.com/squareup/market/commit/55bd167ca)] fix(web components): adding z-index to market-popover inside market-select

### v0.22.0-beta (3/5/2021)

- [[b2b83eb8](https://github.com/squareup/market/commit/b2b83eb8)] fix(web components): fixing keyboard accessibility bug in market-select
- [[2496eb9a](https://github.com/squareup/market/commit/2496eb9a)] test(web components): updating market-select tests for new popper functionality
- [[16897667](https://github.com/squareup/market/commit/16897667)] feat(web components): adding popper.js to market-select
- [[ec4ef2ff](https://github.com/squareup/market/commit/ec4ef2ff)] Update row web component styles
- [[d438f984](https://github.com/squareup/market/commit/d438f984)] fix(web components): Update design tokens to new format in market-button-group

### v0.21.0-beta (2/26/2021)

- [[a8fc9554](https://github.com/squareup/market/commit/a8fc9554)] chore (web components): readme updates from running yarn build
- [[5bb1e0bc](https://github.com/squareup/market/commit/5bb1e0bc)] fix(web components): Emit row deselected in `deselect` method
- [[7dca4b94](https://github.com/squareup/market/commit/7dca4b94)] chore!(web components): Remove deprecated choice-block and choice-block-set components (see [migration guide](./MIGRATION_GUIDE.md) for docs on how to migrate from current use of choice blocks))
- [[75141a40](https://github.com/squareup/market/commit/75141a40)] fix(web-components): remove bottom border on last market-row (#1103)
- [[7317624e](https://github.com/squareup/market/commit/7317624e)] fix(web-components): Use click instead of listSelectionsDidChange for market-select closing
- [[21349b50](https://github.com/squareup/market/commit/21349b50)] fix(web components): Fire market-list change event on row deselection
- [[2c80fa25](https://github.com/squareup/market/commit/2c80fa25)] fix(web components): Fix lint violations in market-select
- [[8cc6582f](https://github.com/squareup/market/commit/8cc6582f)] feat(web components): Add grid storybook example
- [[fb899ce4](https://github.com/squareup/market/commit/fb899ce4)] refactor!(web components): Rename grid-container-main to grid-container
- [[02edd892](https://github.com/squareup/market/commit/02edd892)] feat(web components): Export grid helpers as CSS classes
- [[2917c1f4](https://github.com/squareup/market/commit/2917c1f4)] chore(web): Update migration guide with information on breaking design token changes

### v0.20.0-beta (2/19/2021)

- [[71a85aad](https://github.com/squareup/market/commit/aa7698f4)] fix(web components): Fix bug with fill alignment button groups not resizing properly when expanding
- [[1a14cacf](https://github.com/squareup/market/commit/b1c1b54c)] feat(web components): Add market-button-group docs and code cleanup
- [[4f3c0051](https://github.com/squareup/market/commit/f811b634)] feat(web components): Add tests for market-button-group
- [[a066dc4a](https://github.com/squareup/market/commit/d3c72eac)] feat(web components): Add support for text overflow on primary button
- [[e19df29d](https://github.com/squareup/market/commit/f610ca0a)] feat(web components): Add button group component
- [[3066a162](https://github.com/squareup/market/commit/777dada8)] chore(web components): adding JIRA ticket reference to todos
- [[8775e395](https://github.com/squareup/market/commit/e536f8a4)] chore(web components): density tokens are now layout-size
- [[cdf81ffd](https://github.com/squareup/market/commit/bb9dcf22)] chore(web components): adding color token to market-dialog
- [[266d962c](https://github.com/squareup/market/commit/925ae4be)] chore(web components): updating color tokens in market-row
- [[a513dbc8](https://github.com/squareup/market/commit/8b0a8a49)] chore(web components): focus ring opacity now managed at component rather than token level
- [[b261db61](https://github.com/squareup/market/commit/cbc4b2ff)] chore(web components): updating color tokens in market-choice-block
- [[0ab40ac9](https://github.com/squareup/market/commit/a5b07cbd)] chore(web components): updating color tokens in shared dialog styles
- [[1fea5589](https://github.com/squareup/market/commit/0576b2ad)] chore(web components)!: upgrading market-theme to v3.0.3-beta
- [[3a054ba0](https://github.com/squareup/market/commit/3a054ba0)] fix(web components): adding build step to generate scss mixins (#1046)
- [[f8e84aca](https://github.com/squareup/market/commit/f8e84aca)] fix(web components): removing pseudostates storybook decorator bc shell warnings

### v0.19.0-beta (2/12/2021)

- [[d70f5318](https://github.com/squareup/market/commit/d70f5318)] style(web components): update a variable in market-input-text to a design token
- [[59651460](https://github.com/squareup/market/commit/59651460)] chore(web components): UI-922 - Add market-list + market-action-card story
- [[7aefe31f](https://github.com/squareup/market/commit/7aefe31f)] feat(web components): UI-922 - Fix card bottom margin in lists
- [[dd24630d](https://github.com/squareup/market/commit/dd24630d)] fix(web components): fixing keyboard focus ring for row + select
- [[0e1b5398](https://github.com/squareup/market/commit/0e1b5398)] chore(web components): adding tests for market-select typeahead
- [[1dbeebc6](https://github.com/squareup/market/commit/1dbeebc6)] feat(web components): adding typeahead functionality to market-select
- [[d9702bde](https://github.com/squareup/market/commit/d9702bde)] feat(web components): Add tests for market-action-card
- [[7a411e7b](https://github.com/squareup/market/commit/7a411e7b)] UI-922 - Create market-action-card web component
- [[78155ece](https://github.com/squareup/market/commit/78155ece)] chore(web components): updating design tokens to 2.1.1-beta (new blue) (#1002)
- [[3a067ffb](https://github.com/squareup/market/commit/3a067ffb)] fix(web components): Refactor market-list multiselect

### v0.18.0-beta (2/5/2021)

- [[aa86a068](https://github.com/squareup/market/commit/aa86a068)] refactor(web): Make shadowDOM <button> element in market-button inherit font properties from parent
- [[b640b91a](https://github.com/squareup/market/commit/b640b91a)] feat(ember-test-helpers): add open-modal and utils
- [[27698d45](https://github.com/squareup/market/commit/27698d45)] refactor(web): move event interfaces to utils/dialog
- [[afad92e1](https://github.com/squareup/market/commit/afad92e1)] fix(web): market-context ignores non-child modals
- [[849bcbd0](https://github.com/squareup/market/commit/849bcbd0)] fix(web-components): fix market-row with leading accessory storybook
- [[875d9582](https://github.com/squareup/market/commit/875d9582)] fix(web components): fixing missing demo stories
- [[2275e7b4](https://github.com/squareup/market/commit/2275e7b4)] feat(web components): add leading accessory to market-input-text
- [[6c71c9ed](https://github.com/squareup/market/commit/6c71c9ed)] fix(web): market-row registers slotted control via event
- [[4c7778a6](https://github.com/squareup/market/commit/4c7778a6)] refactor(web): only store slottedControl in market-row
- [[51265f6e](https://github.com/squareup/market/commit/51265f6e)] fix(web): market-row hover stays in sync with slotted control.
- [[c67aae2a](https://github.com/squareup/market/commit/c67aae2a)] feat(web components): adding leading accessory to market-row
- [[ce4977f7](https://github.com/squareup/market/commit/ce4977f7)] feat(web components): first pass at market-accessory
- [[4b391994](https://github.com/squareup/market/commit/4b391994)] fix(web components): Fix order blade close animation
- [[4e92f6e3](https://github.com/squareup/market/commit/4e92f6e3)] chore(web components): results of running lint:ts:fix
- [[668578db](https://github.com/squareup/market/commit/668578db)] chore(web components): adding eslint-plugin-jest to get rid of linting errors in tests
- [[10be8d40](https://github.com/squareup/market/commit/10be8d40)] chore(web components): results of running css:lint:fix
- [[03401687](https://github.com/squareup/market/commit/03401687)] chore(web components): stylelint should ignore files/dirs from .gitignore
- [[1297d9b0](https://github.com/squareup/market/commit/1297d9b0)] chore(web): add market-select to context manager stories
- [[67a335d7](https://github.com/squareup/market/commit/67a335d7)] chore(web components): Fix broken changelog SHA

### v0.17.0-beta (1/29/2021)

- [[854eb3b0](https://github.com/squareup/market/commit/854eb3b0)] refactor(web): rename checkbox/radio mutate function to setValue
- [[a9c6cdae](https://github.com/squareup/market/commit/a9c6cdae)] fix(web): handle market-list deselection
- [[a59fc225](https://github.com/squareup/market/commit/a59fc225)] fix(web components): rename toggle* functions to set*
- [[747c90cc](https://github.com/squareup/market/commit/747c90cc)] fix(web components): row explicitly sets slotted checkbox/radio value
- [[bd986975](https://github.com/squareup/market/commit/bd986975)] fix(web components): Add animation duration to blade; needed for market-context
- [[24cd45f4](https://github.com/squareup/market/commit/24cd45f4)] fix(web components): Update component comments with reference to blade and fix aria attr
- [[03c7b8ae](https://github.com/squareup/market/commit/03c7b8ae)] feat(web components): Init Market Blade component
- [[da2b17de](https://github.com/squareup/market/commit/da2b17de)] chore(web components): adding tests for market-select [UI-972]

### v0.16.1-beta (1/25/2021)

- [[d558dbdf](https://github.com/squareup/market/commit/d558dbdf)] fix(web components): fix console errors in market-list

### v0.16.0-beta (1/22/2021)

- [[8ba4790e](https://github.com/squareup/market/commit/8ba4790e)] fix(web components): reorganizing market-select methods for readability
- [[eb6efd71](https://github.com/squareup/market/commit/eb6efd71)] fix(web components): fix for value preselection on market-select [UI-972]
- [[57317a4d](https://github.com/squareup/market/commit/57317a4d)] fix(web): MarketContextManager open does not look at child
- [[23d093ef](https://github.com/squareup/market/commit/23d093ef)] fix(web): remove aria-role from market-model
- [[2691ab3f](https://github.com/squareup/market/commit/2691ab3f)] fix(web): add submit event handler to market-button
- [[0b194f2d](https://github.com/squareup/market/commit/0b194f2d)] fix(web): dont assume a market-header in a market-modal
- [[f9f45b47](https://github.com/squareup/market/commit/f9f45b47)] fix(web): set modal padding variable for narrow screens

### v0.15.1-beta (1/15/2021)

- [[6de7d47d](https://github.com/squareup/market/commit/6de7d47d)] fix(web): Remove min-width from hgroup in market-header component
- [[8b9ab48f](https://github.com/squareup/market/commit/8b9ab48f)] feat(web): update ember test app with new sass paths and add test for scss breakage
- [[cfc6fa1c](https://github.com/squareup/market/commit/cfc6fa1c)] dep(web): Update @market/web-components dependency on @market/market-theme to v2.0.0-beta
- [[911b5aa7](https://github.com/squareup/market/commit/911b5aa7)] feat(web-components): classes for emphasis typography
- [[5f57a565](https://github.com/squareup/market/commit/5f57a565)] Update master branch to main branch in ci scripts
- [[a5f3e951](https://github.com/squareup/market/commit/a5f3e951)] Update grid css variables to use :root selector instead of :host

### v0.15.0-beta (12/16/2020)

- [[489014e3](https://github.com/squareup/market/commit/489014e3)] docs(web components): adding migration guide doc for choice block deprecation
- [[669bf585](https://github.com/squareup/market/commit/669bf585)] fix(web components): nicer deprecation of market-choice-block and market-choice-block
- [[2a38c750](https://github.com/squareup/market/commit/2a38c750)] feat(web components): adding ability to slot market-radio into market-row and use in market-list
- [[fb5e35eb](https://github.com/squareup/market/commit/fb5e35eb)] chore(web components)!: deprecating market-choice-block and market-choice-block-set (see [migration guide](./MIGRATION_GUIDE.md) for docs on how to migrate from current use of choice blocks))
- [[1a16bba4](https://github.com/squareup/market/commit/1a16bba4)] feat(web components): adding choice block set functionality to market-list
- [[50492d1c](https://github.com/squareup/market/commit/50492d1c)] feat(web components): adding choice block functionality to market-row
- [[68ffbc54](https://github.com/squareup/market/commit/68ffbc54)] fix(web components): Trying to move value preselection to market-list
- [[f62b7005](https://github.com/squareup/market/commit/f62b7005)] fix(web components): tweaking storybook config to ignore OS light/dark mode
- [[913e083d](https://github.com/squareup/market/commit/913e083d)] fix(web-components): prevent Ember from breaking hydration in Stencil
- [[ce6c9ae4](https://github.com/squareup/market/commit/ce6c9ae4)] Change design-token version

### v0.14.0-beta (12/4/2020)

- [[599b452e](https://github.com/squareup/market/commit/599b452e)] fix(web-components): remove excess padding from header with no title
- [[1fe02fba](https://github.com/squareup/market/commit/1fe02fba)] fix(web components): tweaking opt-in global attr approach for CSS
- [[13b7fe4f](https://github.com/squareup/market/commit/13b7fe4f)] fix(web components): using design tokens in typography.css
- [[1790e3c1](https://github.com/squareup/market/commit/1790e3c1)] feat(web components): first pass at typography styles + storybook demo

### v0.13.1-beta (12/2/2020)

- [[d3529237](https://github.com/squareup/market/commit/d3529237)] fix(storybook): Update storybook to pull in generated light/dark mode CSS from market theme
- [[cec333c7](https://github.com/squareup/market/commit/cec333c7)] fix(web components): Update market to pull new generated dark-mode.css from tokens output
- [[64e868a2](https://github.com/squareup/market/commit/64e868a2)] bump(web): Update market theme dependency to 1.3.0-beta

### v0.13.0-beta (11/20/2020)

- [[6f7a8fec](https://github.com/squareup/market/commit/6f7a8fec)] docs(web): clarifying global styling docs
- [[6cb9018f](https://github.com/squareup/market/commit/6cb9018f)] fix(web components): update references to renamed header token
- [[968e33a0](https://github.com/squareup/market/commit/968e33a0)] chore(web): publishing global style files in /dist and documenting their use
- [[b725f8c5](https://github.com/squareup/market/commit/b725f8c5)] fix(web components): Fix spacing issues on market-select
- [[c41acab6](https://github.com/squareup/market/commit/c41acab6)] feat(web components): add keydown events to market-select to improve accessibility
- [[de913f6c](https://github.com/squareup/market/commit/de913f6c)] feat(web components): add type to market-button to support implicit submission
- [[a7ce5839](https://github.com/squareup/market/commit/a7ce5839)] fix(web components): Fix invisible close icon in header component
- [[96caa5fa](https://github.com/squareup/market/commit/96caa5fa)] chore: Add abstracted release script
- [[bcc365ba](https://github.com/squareup/market/commit/bcc365ba)] Fix market-context-manager story
- [[66ca6988](https://github.com/squareup/market/commit/66ca6988)] chore(design tokens, web): bumping @market/design-tokens and market-theme version
- [[e4bac505](https://github.com/squareup/market/commit/e4bac505)] chore(web): updating changelog

### v0.12.3-beta (10/26/2020)

- New component: `<market-input-password>`
  - [[e67f742d](https://github.com/squareup/market/commit/e67f742d)] fix(web components): Use trailing accessory design tokens and fix input width issues
  - [[e11d9832](https://github.com/squareup/market/commit/e11d9832)] fix(web components): Update trailing accessory size and shorten input length with accessory
  - [[e8633f81](https://github.com/squareup/market/commit/e8633f81)] test(web components): Add tests for market-input-password
  - [[b743182e](https://github.com/squareup/market/commit/b743182e)] feat(web components): Add new market-input-password component
  - [[87d9a474](https://github.com/squareup/market/commit/87d9a474)] feat(web components): Add slot and styling for a right side icon for market inputs
- [[459ab9f3](https://github.com/squareup/market/commit/459ab9f3)] chore(web): updating web getting started READMEs and react and ember test apps
- [[a03bbea7](https://github.com/squareup/market/commit/a03bbea7)] fix(web components): fix for storybook dark mode bugs
- [[ef63cb8e](https://github.com/squareup/market/commit/ef63cb8e)] chore(web components): cleaning up use of deprecated CSS variables
- [[d428b25f](https://github.com/squareup/market/commit/d428b25f)] chore(web components): upgrading @market/market-theme dependency to v1.0.0-beta
- [[10596a26](https://github.com/squareup/market/commit/10596a26)] chore(react bindings): updating @stencil/react-output-target version and updating react-bindings
- [[da5398f2](https://github.com/squareup/market/commit/da5398f2)] fix(web components): move error icon to pseudoelement, so it's only shown if an error slot is present

### v0.12.2-beta (10/12/2020)

- [[6bde3a1c](https://github.com/squareup/market/commit/6bde3a1c)] chore(web): Add a bunch of documentation
- [[81ef89d7](https://github.com/squareup/market/commit/81ef89d7)] chore(web components): Remove spec tests for market-input-text and market-field
- [[21e2ae96](https://github.com/squareup/market/commit/21e2ae96)] fix(web components): UI-810 Add autocomplete functionality to market-input-text component
- [[27a3034e](https://github.com/squareup/market/commit/27a3034e)] fix(web components): Remove unnecesary dist CSS files copying
- [[adf5ed48](https://github.com/squareup/market/commit/adf5ed48)] chore(web components): Update jest and puppeteer
- [[062a980d](https://github.com/squareup/market/commit/062a980d)] chore(web components): Update to Stencil 2.0.3
- [[4435c424](https://github.com/squareup/market/commit/4435c424)] feat(web): add ability to reject inputs on market-input-text
