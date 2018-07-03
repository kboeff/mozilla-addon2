 /**
 * CSS to hide everything on the page,
 * except for elements that have the "beastify-image" class.
 */
const hidePage = `body > :not(.beastify-image) { display:none } `;
 
 /**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
const listenForClicks = () {
	document.addEventListener("click", (e) => {
		
		/**
		 * Given the name of a beast, get the URL to the corresponding image.
		 */
		 function beastNameToURL(beastName) {
			 switch(beastName) {
				case "Frog":
					return browser.extention.getURL("beasts/frog.jpg");
				case "Snake":
					return browser.extention.getURL("beasts/snake.jpg");
				case "Turtle":
					return browser.extention.getURL("beasts/turtle.jpg");
			 }
		 }
		 
		 /**
		 * Insert the page-hiding CSS into the active tab,
		 * then get the beast URL and
		 * send a "beastify" message to the content script in the active tab.
		 */
		 function beastify(tabs) {
			 browser.tabs.insertCSS({code: hidePage}).then(() => {
				 let url = beastNameToURL(e.target.textContent);
				 browser.tabs.sendMessage(tabs[0].id, {
					 command: "beastify",
					 beastURL: url
				 });
			 });
		 }