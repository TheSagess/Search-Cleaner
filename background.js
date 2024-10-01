// Load the blocked sites from storage
let blockedSites = [];
browser.storage.local.get('blockedSites').then((data) => {
  blockedSites = data.blockedSites || [];
});

// Listen for changes in the blocked sites list
browser.storage.onChanged.addListener((changes) => {
  if (changes.blockedSites) {
    blockedSites = changes.blockedSites.newValue;
  }
});

// Block history for blocked sites
browser.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Check if the URL contains any blocked site
    for (let site of blockedSites) {
      if (details.url.includes(site)) {
        // Prevent adding to history by blocking the navigation
        return { cancel: true };
      }
    }
    return { cancel: false }; // Allow if not blocked
  },
  { urls: ["<all_urls>"] },
  ["blocking"]
);
