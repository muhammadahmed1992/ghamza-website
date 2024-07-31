// Function to mute or unmute a tab
function muteTab(tabId, mute) {
  browser.tabs.update(tabId, { muted: mute }).then(() => {
    console.log(`Tab ${tabId} has been ${mute ? 'muted' : 'unmuted'}.`);
  }).catch((error) => {
    console.error(`Error: ${error}`);
  });
}
// Function to get the mute status of a tab
function getMuteStatus(tabId) {
  browser.tabs.get(tabId).then((tab) => {
    console.log(`Tab ${tabId} mute status: ${tab.mutedInfo.muted}`);
  }).catch((error) => {
    console.error(`Error: ${error}`);
  });
}
// Example usage
const exampleTabId = 1; // Replace with your tab ID
// Mute the tab
muteTab(exampleTabId, true);
// Get the mute status of the tab
getMuteStatus(exampleTabId);
// Unmute the tab after 5 seconds
setTimeout(() => {
  muteTab(exampleTabId, false);
  // Get the mute status again
  getMuteStatus(exampleTabId);
}, 5000);