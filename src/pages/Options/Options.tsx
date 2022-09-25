import React from 'react';
import './Options.css';

interface Props {
  title: string;
}

const Options: React.FC<Props> = ({title}: Props) => {  

  const [initUserId, setInitUserId] = React.useState("");
  const [initApiKey, setInitApiKey] = React.useState("");
  const [initCatalog, setInitCatalog] = React.useState("");
  const [initEnableGlobal, setInitEnableGlobal] = React.useState("");
  
  chrome.storage.sync.get(['userId', 'apiKey', 'catalog'], function(data) {    
    setInitUserId(data.userId)
    setInitApiKey(data.apiKey)
    setInitCatalog(data.catalog)
    setInitEnableGlobal(data.enableGlobal !== undefined ? data.enableGlobal : 'false')
    console.log('userId: ' + initUserId, 'apiKey: ' +
     initApiKey + ', catalog: ' + initCatalog + ', enableGlobal: ' + initEnableGlobal)
  });
  
  return (
    <div className="OptionsContainer">
      <form>
        <label>User ID:</label>
        <input
          type="text"
          id="userId"
          name="userId"
          onChange={(e) => chrome.storage.sync.set({userId: e.target.value})}
          defaultValue={initUserId}
        />
        <label>API Key:</label>
        <input
          type="text"
          id="apiKey"
          name="apiKey"
          onChange={(e) => chrome.storage.sync.set({apiKey: e.target.value})}
          defaultValue={initApiKey}
        />
        <label>Catalog:</label>
        <select
          onChange={(e) => {
            chrome.storage.sync.set({catalog: e.target.value})
            setInitCatalog(e.target.value)
        }}
          value={initCatalog}
          id="catalog"
          name="catalog"
        >
          <option value="strict">strict</option>
          <option value="obscene">obscene</option>
        </select>
        <label>Enable Globally:</label>
        <input className='checkbox'
          type="checkbox"
          id="enableGlobal"
          name="enableGlobal"
          onChange={(e) => {            
            var value =  e.target.value == 'on' ? 'true' : 'false'
            chrome.storage.sync.set({enableGlobal: value})
          }}
          defaultChecked={initEnableGlobal == 'true'}
        />
      </form>
    </div>
  );
};

export default Options;
