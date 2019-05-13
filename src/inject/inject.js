var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
        
        var observer = new MutationObserver(function (mutations, observerInstance) {
            chrome.runtime.sendMessage({method: "getLocalStorage", key: "store.settings.mainSwitch"}, function(response) {
                if (response.data=="true") {
                    watchedVideos = Array.from(document.querySelectorAll("ytd-video-renderer div[id=progress],ytd-compact-video-renderer div[id=progress],ytd-grid-video-renderer div[id=progress]")).map(x => x.closest("ytd-video-renderer,ytd-compact-video-renderer,ytd-grid-video-renderer"));
                    if (watchedVideos.length > 0) watchedVideos.forEach(video => video.remove());
                } 
            });
        });
        observer.observe(document, {childList:true, subtree:true});
    }
}, 10)