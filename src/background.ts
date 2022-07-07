import {
  ApiError,
  Client,
  DataToolsController,
  Environment,
} from "neutrino-apilib";

let active = false;

const client = new Client({
  timeout: 0,
  userId: "haseeb.apimatic",
  apiKey: "EK2nRlqyZirWgiQFxj1TFyB90AAjyYMtFIAN7FnEDfqAplnz",
  environment: Environment.Production,
});

const dataToolsController = new DataToolsController(client);
const catalog = "strict";

function filterPage(
  tabId: number | undefined,
  url: string | undefined,
  active: boolean
)  {
  console.log(tabId + ", " + url + ", " + active)
  //document.body.style.backgroundColor = color;
  if (url != undefined && tabId != undefined) {
    if (active) {
      try {
         dataToolsController.badWordFilter(url, '*', catalog).then(response => {
            response.result.badWordsList.forEach((badWord) => {
                let text = document.querySelectorAll(
                  "h1, h2, h3, h4, h5, p, li, td, caption, span, a"
                );
      
                for (let i = 0; i < text.length; ++i) {
                  if (text[i].innerHTML.includes(badWord)) {
                    text[i].innerHTML = text[i].innerHTML.replace(
                      badWord,
                      "*".repeat(badWord.length)
                    );
                  }
                }
              });
         })

        // Get more response info...
        // const { statusCode, headers } = httpResponse;
      } catch (error) {
        console.log("exception occurred")
        console.log(error)
        if (error instanceof ApiError) {
          const errors = error.result;
          // const { statusCode, headers } = error;
        }
      }
    } else {
        chrome.tabs.reload(tabId);
    }
  }
}

chrome.action.onClicked.addListener((tab) => {
  active = !active;
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id ? tab.id : -1 },
      func: filterPage,
      args: [tab.id, tab.url, active],
    })
    .then();
});
