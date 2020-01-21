=== Gutenberg ===
Contributors: matveb, joen, karmatosed
Requires at least: 5.2.0
Tested up to: 5.3
Stable tag: V.V.V
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

The Gutenberg plugin provides editing, customization, and site building features to WordPress. This beta plugin allows you to test bleeding-edge features before they land in future WordPress releases.

== Description ==

Gutenberg is more than an editor. It is the foundation that will revolutionize customization, site building and the entire publishing experience of the platform. The four phases of the project are Editing, Customization, Collaboration, and Multilingual.

### Discover More

- **User Documentation:** See the <a href="https://wordpress.org/support/article/wordpress-editor/">WordPress Editor documentation</a> for detailed docs on using the editor as an author creating posts and pages.

- **Developer Documentation:** Extending and customizing is at the heart of the WordPress platform, see the <a href="https://developer.wordpress.org/block-editor/developers/">Developer Documentation</a> for extensive tutorials, documentation, and API reference on how to extend the editor.

- **Contributors:** Gutenberg is an open-source project and welcomes all contributors from code to design, from documentation to triage. See the <a href="https://developer.wordpress.org/block-editor/contributors/">Contributor's Handbook</a> for all the details on how you can help.

The development hub for the Gutenberg project is on Github at: <a href="https://github.com/wordpress/gutenberg/"> https://github.com/wordpress/gutenberg</a>

Discussion for the project is on <a href="https://make.wordpress.com/core/">Make Blog</a> and the `#core-editor` channel in Slack, <a href="https://make.wordpress.org/chat/">signup information</a>.

== Frequently Asked Questions ==

= How can I send feedback or get help with a bug? =

We'd love to hear your bug reports, feature suggestions and any other feedback! Please head over to <a href="https://github.com/WordPress/gutenberg/issues">the GitHub issues page</a> to search for existing issues or open a new one. While we'll try to triage issues reported here on the plugin forum, you'll get a faster response (and reduce duplication of effort) by keeping everything centralized in the GitHub repository.

= What are the next phases for the project? =

The four phases of the project are Editing, Customization, Collaboration, and Multilingual. You can hear more about the project and phases from Matt in his State of the Word talks for <a href="https://ma.tt/2019/11/state-of-the-word-2019/">2019</a> and <a href="https://ma.tt/2018/12/state-of-the-word-2018/">2018</a>. Additionally you can follow updates in the <a href="https://make.wordpress.org/core/?s=gutenberg">Make WordPress Core blog</a>.


= Where can I read more about Gutenberg? =

- <a href="http://matiasventura.com/post/gutenberg-or-the-ship-of-theseus/">Gutenberg, or the Ship of Theseus</a>, with examples of what Gutenberg might do in the future
- <a href="https://make.wordpress.org/core/2017/01/17/editor-technical-overview/">Editor Technical Overview</a>
- <a href="https://wordpress.org/gutenberg/handbook/reference/design-principles/">Design Principles and block design best practices</a>
- <a href="https://github.com/Automattic/wp-post-grammar">WP Post Grammar Parser</a>
- <a href="https://make.wordpress.org/core/tag/gutenberg/">Development updates on make.wordpress.org</a>
- <a href="https://wordpress.org/gutenberg/handbook/">Documentation: Creating Blocks, Reference, and Guidelines</a>
- <a href="https://wordpress.org/gutenberg/handbook/reference/faq/">Additional frequently asked questions</a>


== Changelog ==

## Enhancements

- Add border to table header & footer [19450](https://github.com/WordPress/gutenberg/pull/19450)
- Add the new replace flow to the cover [19583](https://github.com/WordPress/gutenberg/pull/19583), media text [19198](https://github.com/WordPress/gutenberg/pull/19198), file [19174](https://github.com/WordPress/gutenberg/pull/19174), audio [19158](https://github.com/WordPress/gutenberg/pull/19158) and video [19162](https://github.com/WordPress/gutenberg/pull/19162) block.
- Components: improve ToolbarButton [18931](https://github.com/WordPress/gutenberg/pull/18931)
- Sibling inserter: fix dead zone between blocks [19719](https://github.com/WordPress/gutenberg/pull/19719) [19729](https://github.com/WordPress/gutenberg/pull/19729)
- Top toolbar: adjust tab order [19623](https://github.com/WordPress/gutenberg/pull/19623)
- Regions: position publish region after sidebar [19427](https://github.com/WordPress/gutenberg/pull/19427)
- Better accessibility labels for blocks [18132](https://github.com/WordPress/gutenberg/pull/18132)
- Breadcrumb: add accessibility label [19597](https://github.com/WordPress/gutenberg/pull/19597)
- Navigation: add background color [19108](https://github.com/WordPress/gutenberg/pull/19108)

## Performance

- Lighter block DOM:
	- Put sibling inserter in popover [19456](https://github.com/WordPress/gutenberg/pull/19456)
	- Remove extra div wrapper [19010](https://github.com/WordPress/gutenberg/pull/19010)
	- Remove inner div wrapper [19593](https://github.com/WordPress/gutenberg/pull/19593)
	- Split out toolbar rendering [19564](https://github.com/WordPress/gutenberg/pull/19564)
	- Put side inserter in Popover [19406](https://github.com/WordPress/gutenberg/pull/19406)
	- Rewrite drop zone with hooks (useDropZone) [19514](https://github.com/WordPress/gutenberg/pull/19514)
	- Merge effects [19617](https://github.com/WordPress/gutenberg/pull/19617)
	- Fix alignments [19704](https://github.com/WordPress/gutenberg/pull/19704)
	- Clean up after control removal [19618](https://github.com/WordPress/gutenberg/pull/19618)
	- Reposition tabbable inserter [19596](https://github.com/WordPress/gutenberg/pull/19596)
- Avoid rerendering every block when caret moves in and out of formatting [19524](https://github.com/WordPress/gutenberg/pull/19524)

## Bug Fixes

- Navigation:
	- Format the allowed styles [19477](https://github.com/WordPress/gutenberg/pull/19477)
	- Show recent pages as default suggestions when creating Nav Links [19458](https://github.com/WordPress/gutenberg/pull/19458)
	- Define allowedFormats option for NavigationLink [19507](https://github.com/WordPress/gutenberg/pull/19507)
	- Rename the LinkControl's edit button title [19505](https://github.com/WordPress/gutenberg/pull/19505)
	- Use underline instead of bottom border for nav links [19538](https://github.com/WordPress/gutenberg/pull/19538)
	- Do not output navigation links with empty labels [19652](https://github.com/WordPress/gutenberg/pull/19652)
	- Remove draggable from all navigation-link blocks [19648](https://github.com/WordPress/gutenberg/pull/19648)
	- Remove duplicate CSS from Navigation that is aleady in Navigation Link CSS [19540](https://github.com/WordPress/gutenberg/pull/19540)
	- Remove the text color button double border on the navigation block toolbar [19567](https://github.com/WordPress/gutenberg/pull/19567)
	- Replace, on editing a navigation link, the current label with the title of page or post [19461](https://github.com/WordPress/gutenberg/pull/19461)
	- Add description for the Link Settings Description in the Link Block settings [19508](https://github.com/WordPress/gutenberg/pull/19508)
	- Fix Navigation Link url escaping [19679](https://github.com/WordPress/gutenberg/pull/19679)
	- Fix alignment on left border between menu navigation controls and menu item [19511](https://github.com/WordPress/gutenberg/pull/19511)
	- Styling fixes after navigation feature merge [19455](https://github.com/WordPress/gutenberg/pull/19455)
- Add support for align wide to deprecated versions of gallery block [19522](https://github.com/WordPress/gutenberg/pull/19522)
- Block top toolbar: fix mover direction [19574](https://github.com/WordPress/gutenberg/pull/19574)
- Editor keyboard shortcuts: fix Toggle Sidebar [19605](https://github.com/WordPress/gutenberg/pull/19605)
- Editor: Fix Block Embed Input size [19438](https://github.com/WordPress/gutenberg/pull/19438)
- Fix ServerSideRender component showing className [19555](https://github.com/WordPress/gutenberg/pull/19555)
- Fix writing flow focus capturing [19621](https://github.com/WordPress/gutenberg/pull/19621)
- Fix small visual select glitch [19590](https://github.com/WordPress/gutenberg/pull/19590)
- Fix the height of the tags tokens [19592](https://github.com/WordPress/gutenberg/pull/19592)
- Fix buttons block Link shortcut not working with multiple buttons [19492](https://github.com/WordPress/gutenberg/pull/19492)
- Disable HTML on navigation link [19483](https://github.com/WordPress/gutenberg/pull/19483)
- Fix managing page break in the block manager [19303](https://github.com/WordPress/gutenberg/pull/19303)
- Show predefined colors in the navigation block [19493](https://github.com/WordPress/gutenberg/pull/19493)
- Update CSS rule on the widgets screen required for drag & drop [19428](https://github.com/WordPress/gutenberg/pull/19428)
- Multi block selection: fix tabbing [19700](https://github.com/WordPress/gutenberg/pull/19700)
- Multi block selection: set focus back after attempt [19720](https://github.com/WordPress/gutenberg/pull/19720)
- RichText: don't set focus when applying format [19536](https://github.com/WordPress/gutenberg/pull/19536)
- Writing Flow: fix list selection [19721](https://github.com/WordPress/gutenberg/pull/19721)
- Fix Color Picker Format Toggle placement [19607](https://github.com/WordPress/gutenberg/pull/19607)
- Fix Columns block pattern picker item margin. [19494](https://github.com/WordPress/gutenberg/pull/19494)
- Fix block styles for More block [19745](https://github.com/WordPress/gutenberg/pull/19745)
- Block: fix hasMovers BlockList setting for top toolbar [19619](https://github.com/WordPress/gutenberg/pull/19619)

## New APIs

- Components: add ImageSizeControl component [17148](https://github.com/WordPress/gutenberg/pull/17148)
- Add block collections [17609](https://github.com/WordPress/gutenberg/pull/17609)
- Add `Text` component [18495](https://github.com/WordPress/gutenberg/pull/18495)
- Add warning package [19317](https://github.com/WordPress/gutenberg/pull/19317)
- Components: add isFocusable state to Button [19337](https://github.com/WordPress/gutenberg/pull/19337)

## Experiments

- Edit Site:
	- Add a Post Author block [19576](https://github.com/WordPress/gutenberg/pull/19576)
	- Add a Post Date block [19578](https://github.com/WordPress/gutenberg/pull/19578)
	- Add a Post Excerpt block [19579](https://github.com/WordPress/gutenberg/pull/19579)
	- Implement Template Part block editing 2 [19203](https://github.com/WordPress/gutenberg/pull/19203)
	- Add template loading [19081](https://github.com/WordPress/gutenberg/pull/19081)
- Block Directory:
	- Change 'update' icon to text to be more communicative [19451](https://github.com/WordPress/gutenberg/pull/19451)
	- Update the action button label to read 'Add block' [19412](https://github.com/WordPress/gutenberg/pull/19412)
- useColors:
	- Fix contrast check [19500](https://github.com/WordPress/gutenberg/pull/19500)
	- Directly pass ref for color detecting [19474](https://github.com/WordPress/gutenberg/pull/19474)
- InnerBlocks: Fix toolbar capturing [19530](https://github.com/WordPress/gutenberg/pull/19530)

## Documentation

- Add js syntax highlighting to documentation [19467](https://github.com/WordPress/gutenberg/pull/19467)
- Add lint-md section to scripts readme [19716](https://github.com/WordPress/gutenberg/pull/19716)
- Add linting of source in markdown files [19518](https://github.com/WordPress/gutenberg/pull/19518)
- Document packages-update wp-scripts command [19711](https://github.com/WordPress/gutenberg/pull/19711)
- Linting Documentation [19543](https://github.com/WordPress/gutenberg/pull/19543)
- More visibility to the theme opt-in styles documentation [19463](https://github.com/WordPress/gutenberg/pull/19463)
- Remove spaces in title for consistency with other components and docs [19466](https://github.com/WordPress/gutenberg/pull/19466) [19464](https://github.com/WordPress/gutenberg/pull/19464)
- Update block-filters.md [19595](https://github.com/WordPress/gutenberg/pull/19595) [19684](https://github.com/WordPress/gutenberg/pull/19684)
- Update contributors guide with docker-compose info [19362](https://github.com/WordPress/gutenberg/pull/19362)
- Add js syntax highlighting to documentation [19465](https://github.com/WordPress/gutenberg/pull/19465)
- Use import statement instead of deconstruction in docs [19469](https://github.com/WordPress/gutenberg/pull/19469) [19471](https://github.com/WordPress/gutenberg/pull/19471)
- Fix Navigable Container component usage code [19615](https://github.com/WordPress/gutenberg/pull/19615)

## Various

- Block Editor: Remove (more) legacy "editor-" class name compatibility [19489](https://github.com/WordPress/gutenberg/pull/19489)
- Block toolbar: rewrite toolbar forcing [19527](https://github.com/WordPress/gutenberg/pull/19527)
- Breadcrumb: isolate logic [19573](https://github.com/WordPress/gutenberg/pull/19573)
- Contain selection logic in useMultiSelection [19529](https://github.com/WordPress/gutenberg/pull/19529)
- Move navigation and selection logic to WritingFlow [19397](https://github.com/WordPress/gutenberg/pull/19397)
- LinkControl
	- Refactor LinkControl API [19396](https://github.com/WordPress/gutenberg/pull/19396)
	- Remove Popover from LinkControl component [19638](https://github.com/WordPress/gutenberg/pull/19638)
	- Add search results label for initial suggestions [19665](https://github.com/WordPress/gutenberg/pull/19665)
	- Prevent space being reserved for scrollbar when items fit box [19633](https://github.com/WordPress/gutenberg/pull/19633)
	- Remove non-public fetchSearchSuggestions from LinkControl documentation [19710](https://github.com/WordPress/gutenberg/pull/19710)
	- Update Nav Block to use new showInitialSuggestions prop on LinkControl [19667](https://github.com/WordPress/gutenberg/pull/19667)
	- Flatten LinkControl components by mocking useSelect for tests [19705](https://github.com/WordPress/gutenberg/pull/19705)
- Remove core editor usage from block editor rich text [18789](https://github.com/WordPress/gutenberg/pull/18789)
- Add script to automatically update core packages [19448](https://github.com/WordPress/gutenberg/pull/19448)
- Adds tests for horizontal mover descriptions [19549](https://github.com/WordPress/gutenberg/pull/19549)
- Remove: Gradient Picker from cover block placeholder [19712](https://github.com/WordPress/gutenberg/pull/19712)
- Add SVGR support to wp-scripts [18243](https://github.com/WordPress/gutenberg/pull/18243)
- Add storybook for Panel component [18541](https://github.com/WordPress/gutenberg/pull/18541)
- Add supports html: false to new website blocks. [19646](https://github.com/WordPress/gutenberg/pull/19646)
- Add: Block editor keyboard shortcuts on the widgets screen [19432](https://github.com/WordPress/gutenberg/pull/19432)
- Added 8px padding to search input block. [19452](https://github.com/WordPress/gutenberg/pull/19452)
- Adds a "(no title)" label to links to pages or posts with no title [19528](https://github.com/WordPress/gutenberg/pull/19528)
- Array type attribute source query comma missing [19717](https://github.com/WordPress/gutenberg/pull/19717)
- Block Editor: Make initial inner blocks non-dirtying. [19521](https://github.com/WordPress/gutenberg/pull/19521)
- Block Popover: editor canvas as boundary [19322](https://github.com/WordPress/gutenberg/pull/19322)
- Check for existing of avatar_urls array before trying to return the avatar img part of user autocomplete fragment [18259](https://github.com/WordPress/gutenberg/pull/18259)
- Update downshift dependency to v4.0.5 [19661](https://github.com/WordPress/gutenberg/pull/19661)
- Components: replace console.warn with @wordpress/warning [19687](https://github.com/WordPress/gutenberg/pull/19687)
- DOM: Mark stripHTML as unstable [19725](https://github.com/WordPress/gutenberg/pull/19725)
- Decode HTML entities for publish link [19517](https://github.com/WordPress/gutenberg/pull/19517)
- Expose custom gradient picker [19480](https://github.com/WordPress/gutenberg/pull/19480)
- Gallerys ids are saved as numbers [19163](https://github.com/WordPress/gutenberg/pull/19163)
- Media & Text: Remove "Insert from URL" from the replacement flow. [19606](https://github.com/WordPress/gutenberg/pull/19606)
- Page template previews [19106](https://github.com/WordPress/gutenberg/pull/19106)
- Post-Author: Move HTML tags outside of the translatable string [19675](https://github.com/WordPress/gutenberg/pull/19675)
- Priority Queue: Invoke callback when flushing queue [19282](https://github.com/WordPress/gutenberg/pull/19282)
- RichText: split out inline warning [19545](https://github.com/WordPress/gutenberg/pull/19545)
- Storybook: Update to latest 5.3 [19599](https://github.com/WordPress/gutenberg/pull/19599)
- Update `npm-package-json-lint-config` docs [19584](https://github.com/WordPress/gutenberg/pull/19584)
- Update the float on the Spinner to `none` [19338](https://github.com/WordPress/gutenberg/pull/19338)
- Wrap color palette in fieldset with label inside of a legend [19546](https://github.com/WordPress/gutenberg/pull/19546)
- Check Symbol.iterator not Symbol.toStringTag (redux-routine) [19666](https://github.com/WordPress/gutenberg/pull/19666)
- Skip intermittent end to end test on the button block [19653](https://github.com/WordPress/gutenberg/pull/19653)
- Fix e2e test failures via console log exception to handle temp `wpnonce` error [19532](https://github.com/WordPress/gutenberg/pull/19532)
- Packages: Mark build-styles as side-effectful [19535](https://github.com/WordPress/gutenberg/pull/19535)
- docgen: Omit unknown type tag from Markdown format output [19571](https://github.com/WordPress/gutenberg/pull/19571)
- Build Tooling: Skip package for build if package.json unreadable [19439](https://github.com/WordPress/gutenberg/pull/19439)

