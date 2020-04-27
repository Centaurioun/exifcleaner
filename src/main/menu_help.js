const path = require("path");
const {
	is,
	aboutMenuItem,
	openUrlMenuItem,
	openNewGitHubIssue,
	debugInfo
} = require("electron-util");

const WEBSITE_URL = "https://exifcleaner.com";
const GITHUB_USERNAME = "szTheory";
const GITHUB_PROJECTNAME = "exifcleaner";
const SOURCE_CODE_URL = `https://github.com/${GITHUB_USERNAME}/${GITHUB_PROJECTNAME}`;
const COPYRIGHT_TEXT = `Copyright © ${GITHUB_USERNAME}`;

function aboutMenuIconPath() {
	if (is.linux) {
		return path.join(__dirname, "../../exifcleaner.png");
	} else {
		return path.join(__dirname, "static", "icon.png");
	}
}

function buildHelpSubmenu() {
	let submenu = [
		openUrlMenuItem({
			label: "Website",
			url: WEBSITE_URL
		}),
		openUrlMenuItem({
			label: "Source Code",
			url: SOURCE_CODE_URL
		}),
		{
			label: "Report an Issue…",
			click() {
				const body = `
	<!-- Please succinctly describe your issue and steps to reproduce it. -->


	---

	${debugInfo()}`;

				openNewGitHubIssue({
					user: GITHUB_USERNAME,
					repo: GITHUB_PROJECTNAME,
					body
				});
			}
		}
	];

	if (!is.macos) {
		submenu.push(
			{
				type: "separator"
			},
			aboutMenuItem({
				website: WEBSITE_URL,
				icon: aboutMenuIconPath(),
				copyright: COPYRIGHT_TEXT
			})
		);
	}

	return submenu;
}

module.exports = {
	buildHelpSubmenu
};
