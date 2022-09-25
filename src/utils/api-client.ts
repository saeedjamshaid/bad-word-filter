import {
  ApiError,
  Client,
  DataToolsController,
  Environment,
} from 'neutrino-apilib';

var userId :string;
var apiKey :string;
var catalog :string;

chrome.storage.sync.get(['userId', 'apiKey', 'catalog'], function(data) {    
  userId = data.userId
  apiKey = data.apiKey
  catalog = data.catalog
});

export class ApiClient {
  static instance?: ApiClient;

  static getInstance() {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  private constructor() {}

  filterPage(
    tabId: number | undefined,
    url: string | undefined,
    active: boolean
  ) {
    if (url != undefined && tabId != undefined) {
      console.log('userId: ' + userId, 'apiKey: ' + apiKey + ', catalog: ' + catalog)
      
      const client = new Client({
        userId: userId,
        apiKey: apiKey,
        environment: Environment.Production,
      });

      const dataToolsController = new DataToolsController(client);

      dataToolsController
        .badWordFilter(url, '*', catalog)
        .then((response) => {
          response.result.badWordsList.forEach((badWord: string) => {
            chrome.scripting.executeScript({
              target: { tabId: tabId, allFrames: true },
              func: censorText,
              args: [badWord],
            });
          });
        })
        .catch((error) => {
          console.log('inner exception occurred');
          console.log(error);
        });
    }
  }
}

function censorText(badWord: string) {
  debugger;
  let text = document.querySelectorAll(
    'h1, h2, h3, h4, h5, p, li, td, caption, span, a'
  );

  for (let i = 0; i < text.length; ++i) {
    if (text[i].innerHTML.includes(badWord)) {
      text[i].innerHTML = text[i].innerHTML.replace(
        badWord,
        '*'.repeat(badWord.length)
      );
    }
  }
}
