// Load the blocked sites when the popup opens
document.addEventListener('DOMContentLoaded', loadBlockedSites);

document.getElementById('addSite').addEventListener('click', function () {
  const site = document.getElementById('site').value;

  if (site) {
    browser.storage.local.get('blockedSites').then((data) => {
      const blockedSites = data.blockedSites || [];
      blockedSites.push(site);
      browser.storage.local.set({ blockedSites });

      updateBlockedSitesUI(blockedSites);
      document.getElementById('site').value = ''; // Clear input
    });
  }
});

function loadBlockedSites() {
  browser.storage.local.get('blockedSites').then((data) => {
    const blockedSites = data.blockedSites || [];
    updateBlockedSitesUI(blockedSites);
  });
}

function updateBlockedSitesUI(sites) {
  const list = document.getElementById('blockedSites');
  list.innerHTML = ''; // Clear the list

  sites.forEach((site) => {
    const li = document.createElement('li');
    li.textContent = site;
    list.appendChild(li);
  });
}
