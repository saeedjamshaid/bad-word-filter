import { ApiClient } from "../../utils/api-client";

const apiClient = ApiClient.getInstance();
var enableGlobal = 'false'
chrome.storage.sync.get(['userId', 'apiKey', 'catalog'], function(data) {    
    enableGlobal = data.enableGlobal
  });

chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      if (enableGlobal == 'true' && changeInfo.url) {
        apiClient.filterPage(tabId, changeInfo.url, true);
      }
    }
  );