/*

URL Prefixer 1.0.0 by DarkLBP (https://github.com/DarkLBP)

Put this script before the end of the body tag. If you want it in your head you should wrap it with the load event.
Once included and loaded the script will run automatically.

Fill the exclude array with segments of a URL you want to exclude from prefixing.
Fill the include array with segments of a URL you want to be included for prefixing.
Fill prefix with the string you want to put before all your URLs.
Change openNewTab boolean to true if you want all your prefixed URL to be opened in a new tab.
Change prefixByDefault to false if you only want to prefix included matching URLs. Excluded list will be ignored.
Included segments have more weight that excluded ones.

*/

(function () {
    var exclude = [];
    var include = [];
    var prefix = "";
    var openNewTab = false;
    var prefixByDefault = true;

    var links = document.getElementsByTagName("a");

    for (var link in links) {
        var shouldPrefix = prefixByDefault;
        if (prefixByDefault) {
            for (var excludedSegment in exclude) {
                if (containsSegment(exclude[excludedSegment], links[link].href)) {
                    shouldPrefix = false;
                    break;
                }
            }
        }
        for (var includedSegment in include) {
            if (containsSegment(include[includedSegment], links[link].href)) {
                shouldPrefix = true;
                break;
            }
        }
        if (shouldPrefix) {
            links[link].href = prefix + links[link].href;
            if (openNewTab) {
                links[link].target = "_blank";
            }
        }
    }

    function containsSegment(segment, source) {
        if (segment === null || !segment || source === null || !source) {
            return false;
        }
        return source.indexOf(segment) !== -1;
    }
})();
