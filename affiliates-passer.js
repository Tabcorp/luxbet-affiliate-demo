/**
 * @author Arthur Kusumadjaja
 * @date 24/07/2014
 *
 * Affiliates passer is a script to pass information from incoming affiliate link to the main site Luxbet.com or Luxbet.mobi
 * The script will save affiliate information in cookies and load them back when generating links.
 * Links generated will depend on the client device, Luxbet.com for desktop and Luxbet.mobi for mobile.
 *
 * All links in the page that needs to be processes will have to be in "luxbet-link" class.
 * Specific target page will have to be tagged as "link-desktop" and/or "link-mobile", otherwise it will go to homepage as default.
 *
 * For example:
 *		<a class="luxbet-link" link-mobile="arthur" link-desktop="index.php?cPath=6197&event_id=945959" target="_blank">
 *			<img src="http://placehold.it/350x150" alt="Image 01"/>
 *		</a>
 * This sample would target,
 * 		Mobile: http://luxbet.mobi/arthur
 * 		Desktop: http://luxbet.com/index.php?cPath=6197&event_id=945959
 *
 * @copyright Copyright © Tabcorp Pty Ltd. All rights reserved. http://www.tabcorp.com.au/
 * @license This code is copyrighted and is the exclusive property of Tabcorp Pty Ltd. It may not be used, copied or redistributed without the written permission of Tabcorp.
 */

// Document ready
$(function() {
	// Initialize variable
	var md = new MobileDetect(window.navigator.userAgent);
	var linkDesktop = $("a.luxbet-link").first().attr("link-desktop");
	var linkMobile = $("a.luxbet-link").first().attr("link-mobile");
	var n, b, c;

	// Clean link variable desktop and mobile
	if (linkDesktop == null) {
		linkDesktop = "";
	} else {
		if (linkDesktop.indexOf('?') > -1) {
			// Adding parameter
			linkDesktop = linkDesktop + "&";
		} else {
			// New parameter
			linkDesktop = linkDesktop + "?";
		}
	}
	if (linkMobile == null) {
		linkMobile = "";
	}

	// Save cookies if there is no prior info
	if (!loadAffiliate()) {
		if (getInfoUrl()) {
			saveAffiliate();
		}
	}

	// Mobile or desktop inspector
	if (md.mobile() != null) {
		// Mobile client
		if (n && b && c) {
			// From affiliate link
			if (linkMobile == "") {
				// Target not supplied
				$("a.luxbet-link").attr("href","https://www.luxbet.mobi/affiliates/" + n + "/"+ b + "/" + c + "/nexttogo");
			} else {
				$("a.luxbet-link").attr("href","https://www.luxbet.mobi/affiliates/" + n + "/"+ b + "/" + c + "/" + linkMobile);
			}
		} else {
			// Direct access to promo.luxbet.com
			if (linkMobile == "") {
				// Target not supplied
				$("a.luxbet-link").attr("href","https://www.luxbet.mobi/nexttogo/");
			} else {
				$("a.luxbet-link").attr("href","https://www.luxbet.mobi/" + linkMobile);
			}
		}
	} else {
		// Desktop client
		if (n && b && c) {
			// From affiliate link
			if (linkDesktop == "") {
				// Target not supplied
				$("a.luxbet-link").attr("href","https://www.luxbet.com/?n=" + n + "&b=" + b + "&c=" + c);
			} else {
				$("a.luxbet-link").attr("href","https://www.luxbet.com/" + linkDesktop + "n=" + n + "&b=" + b + "&c=" + c);
			}
		} else {
			// Direct access to promo.luxbet.com
			if (linkDesktop == "") {
				// Target not supplied
				$("a.luxbet-link").attr("href","https://www.luxbet.com/");
			} else {
				$("a.luxbet-link").attr("href","https://www.luxbet.com/" + linkDesktop);
			}
		}
	}

	function getInfoUrl() {
		var oGetVars = {};

		if (window.location.search.length > 1) {
			for (var aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
				aItKey = aCouples[nKeyId].split("=");
				oGetVars[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
			}
		}

		if (oGetVars.n && oGetVars.b && oGetVars.c ) {
			n = oGetVars.n;
			b = oGetVars.b;
			c = oGetVars.c;
			return true;
		} else {
			return false;
		}
	}

	function loadAffiliate() {
		var aff_n = $.cookie('aff_n');
		var aff_b = $.cookie('aff_b');
		var aff_c = $.cookie('aff_c');

		if (aff_n && aff_b && aff_c) {
			n = aff_n;
			b = aff_b;
			c = aff_c;
			return true;
		} else {
			return false;
		}
	}

	function saveAffiliate() {
		$.cookie('aff_n', n, { expires: 30 });
		$.cookie('aff_b', b, { expires: 30 });
		$.cookie('aff_c', c, { expires: 30 });

		if (loadAffiliate()) {
			return true;
		} else {
			return false;
		}
	}
});