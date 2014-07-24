Affiliates passer is a script to pass information from incoming affiliate link to the main site Luxbet.com or Luxbet.mobi

The script will save affiliate information in cookies and load them back when generating links.

Links generated will depend on the client device, Luxbet.com for desktop and Luxbet.mobi for mobile.

All links in the page that needs to be processes will have to be in "luxbet-link" class.

Specific target page will have to be tagged as "link-desktop" and/or "link-mobile", otherwise it will go to homepage as default.

For example:
<a class="luxbet-link" link-mobile="arthur" link-desktop="index.php?cPath=6197&event_id=945959" target="_blank">
	<img src="http://placehold.it/350x150" alt="Image 01"/>
</a>

This sample would target,
Mobile: http://luxbet.mobi/arthur
Desktop: http://luxbet.com/index.php?cPath=6197&event_id=945959
