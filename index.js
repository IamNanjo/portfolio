const body = document.body;
const githublogo = document.querySelector("#githublogo img");
const darkModeBtn = document.getElementById("darkModeBtn");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const upArrow1 = document.getElementById("upArrow1");
const upArrow2 = document.getElementById("upArrow2");

body.style.visibility = "visible";

const getIconSrc = (element) => element.getAttribute("src"); // Get src of element
const setIconSrc = (element, newValue) =>
	element.setAttribute("src", `icons/${newValue}`); // Set src on element to newValue

// Contains filenames for icons with a dark and light theme.
const themedElements = {
	githublogo: {
		light: "GitHub-Mark.webp",
		dark: "GitHub-Mark-Light.webp"
	},
	menuBtn: {
		alt: {
			light: "close.svg",
			dark: "close_white.svg"
		},
		light: "menu.svg",
		dark: "menu_white.svg"
	},
	darkModeBtn: {
		dark: "light_mode_white.svg",
		light: "dark_mode.svg"
	},
	upArrow: {
		dark: "up_arrow_white.svg",
		light: "up_arrow.svg"
	}
};

// true if user has selected dark theme as their preference in system settings
const prefDarkMode = () =>
	window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
		? true
		: false;

// true if viewport width is 960px or less
const mobileView = () =>
	window.matchMedia && window.matchMedia("(max-width: 960px)").matches
		? true
		: false;

// Whenever the user scrolls
const scrollFunction = () => {
	/* If user has scrolled past a specific point and mobileView is false, show the upArrow */
	(body.scrollTop > 200 || document.documentElement.scrollTop > 200) &&
	!mobileView()
		? (upArrow1.style.display = "block")
		: (upArrow1.style.display = "none");
};
window.onscroll = () => scrollFunction();

// Changes the theme by replacing a class on the body element
const changeTheme = (theme, newTheme) => {
	body.classList.replace(theme, newTheme);
	localStorage.setItem("theme", newTheme); // Saves the theme in local storage

	// Change menu button theme
	if (getIconSrc(menuBtn) == `icons/${themedElements["menuBtn"]["alt"][theme]}`)
		setIconSrc(menuBtn, themedElements["menuBtn"]["alt"][newTheme]);
	// Open menu theme
	else if (getIconSrc(menuBtn) == `icons/${themedElements["menuBtn"][theme]}`)
		setIconSrc(menuBtn, themedElements["menuBtn"][newTheme]); // Closed menu theme
	// Change theme for the up arrow inside menu
	setIconSrc(upArrow1, themedElements["upArrow"][newTheme]);
	setIconSrc(upArrow2, themedElements["upArrow"][newTheme]);
	// Change dark mode button theme
	setIconSrc(darkModeBtn, themedElements["darkModeBtn"][newTheme]);
	// Change GitHub icon theme
	setIconSrc(githublogo, themedElements["githublogo"][newTheme]);
};

// Check for a saved theme
if (localStorage.hasOwnProperty("theme")) {
	// Change theme to the value found in local storage
	if (localStorage["theme"] == "light") changeTheme(body.className, "light");
	else if (localStorage["theme"] == "dark") changeTheme(body.className, "dark");
}
// If no theme is saved in localStorage -> check system preferences
else if (prefDarkMode()) {
	// System preference - dark mode
	changeTheme(body.className, "dark");
} else if (!prefDarkMode()) {
	// System preference - dark mode
	changeTheme(body.className, "light");
}

// Onclick events

upArrow1.onclick = () => {
	/* Desktop view */
	window.scrollTo(0, 0);
	location.hash = ""; /* Clear hash from url */
};
upArrow2.onclick = () => {
	/* Mobile view */
	window.scrollTo(0, 0);
	location.hash = ""; /* Clear hash from url */
};

darkModeBtn.onclick = () => {
	body.className == "dark"
		? changeTheme("dark", "light")
		: changeTheme("light", "dark");
};

menuBtn.onclick = () => {
	console.log("Menu button clicked");
	switch (getIconSrc(menuBtn)) {
		// Dark theme
		case `icons/${themedElements["menuBtn"]["dark"]}`: // Closed menu
			setIconSrc(menuBtn, themedElements["menuBtn"]["alt"]["dark"]); // Replace icon with open menu
			mobileMenu.style.display = "grid";
			break;

		case `icons/${themedElements["menuBtn"]["alt"]["dark"]}`: // Open menu
			setIconSrc(menuBtn, themedElements["menuBtn"]["dark"]); // Replace icon with closed menu
			mobileMenu.style.display = "none";
			break;

		// Light theme
		case `icons/${themedElements["menuBtn"]["light"]}`: // Closed menu - light theme
			setIconSrc(menuBtn, themedElements["menuBtn"]["alt"]["light"]); // Replace icon with open menu - dark theme
			mobileMenu.style.display = "grid";
			break;

		case `icons/${themedElements["menuBtn"]["alt"]["light"]}`: // Open menu - light theme
			setIconSrc(menuBtn, themedElements["menuBtn"]["light"]); // Replace icon with closed menu - dark theme
			mobileMenu.style.display = "none";
			break;

		default:
			break;
	}
};

mobileMenu.onclick = () => {
	// Close mobileMenu onclick
	if (body.className == "dark") {
		setIconSrc(menuBtn, themedElements["menuBtn"]["dark"]);
	} else if (body.className == "light") {
		setIconSrc(menuBtn, themedElements["menuBtn"]["light"]);
	}
	mobileMenu.style.display = "none";
};
