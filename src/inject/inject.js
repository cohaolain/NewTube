var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
        
        var observer = new MutationObserver(function (mutations, observerInstance) {
            chrome.runtime.sendMessage({method: "getLocalStorage", keys: ["store.settings.mainSwitch","store.settings.partSwitch"]}, function(response) {
				if (response.data["store.settings.mainSwitch"]=="true") { // Main switch if we should do anything
					// This finds only fully (100%) watched videos
					var elementList = 'ytd-video-renderer div[id=progress][style*="100%"],ytd-compact-video-renderer div[id=progress][style*="100%"],ytd-grid-video-renderer div[id=progress][style*="100%"]';
					if (response.data["store.settings.partSwitch"]=="true") { 
						// Finds videos of any view length
						elementList = 'ytd-video-renderer div[id=progress],ytd-compact-video-renderer div[id=progress],ytd-grid-video-renderer div[id=progress]';
					}
					watchedVideos = Array.from(document.querySelectorAll(elementList)).map(x => x.closest("ytd-video-renderer,ytd-compact-video-renderer,ytd-grid-video-renderer"));
					if (watchedVideos.length > 0) watchedVideos.forEach(video => video.remove());
				}
            });
        });
        observer.observe(document, {childList:true, subtree:true});
    }
}, 10)
