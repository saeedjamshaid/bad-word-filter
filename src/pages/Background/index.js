import { ApiClient } from "../../utils/api-client";

const apiClient = ApiClient.getInstance();

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        debugger;
        apiClient.filterPage(request.currentTab.id, request.currentTab.url, true);
    }
);