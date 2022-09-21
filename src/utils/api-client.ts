import {
  ApiError,
  Client,
  DataToolsController,
  Environment,
} from 'neutrino-apilib';

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
      const client = new Client({
        userId: 'saeed.jamshaid',
        apiKey: 'Db90F9yoZZMpQeGiilSADOcp52o2P9GYwHgxJqxtWLnjvasw',
        environment: Environment.Production,
      });

      const dataToolsController = new DataToolsController(client);
      const catalog = 'strict';

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
