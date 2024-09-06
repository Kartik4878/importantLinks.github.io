function setUpConfig(){
    // var config;
    // var oReq = new XMLHttpRequest();
    // oReq.open("get","../configs.json", true);
    // oReq.onload = reqListener;
    // oReq.send();
    // function reqListener(e) {
    // config = JSON.parse(this.responseText);
    // saveConfigData(config);
    // }
    saveConfigData(configData);
}


function setWelcomeMessage(){
    let welcomeText = "";
    const hours = new Date().getHours();
    if(hours <12) welcomeText = "Good morning";
    else if(hours >= 12 && hours < 17) welcomeText = "Good afternoon";
    else welcomeText = "Good evening";
    return `${welcomeText} ${getConfig()?.Name} !`;
}

function setDate(){
    const todayDate = sessionStorage.getItem("todayDate");
    if(todayDate !== calculateDate()){
        sessionStorage.setItem("todayDate", calculateDate());
    }
}

function calculateDate(){
    const date = new Date();
    const today = date.getDate() + "" + date.getMonth() + date.getFullYear();
    return today;
}

function getDate(){
    return sessionStorage.getItem("todayDate");
}

function saveListData(listItemObject){
    localStorage.setItem("todoList",JSON.stringify(listItemObject)); 
    // setUpList();
}

function getListData(){
    return JSON.parse(localStorage.getItem("todoList"));
}

function saveConfigData(configs){ 
    localStorage.setItem("configs",JSON.stringify(configs)); 
    navigator.clipboard.writeText(JSON.stringify(configs, 2, 2));
    alert(`Configuration copied to clipboard, save the copied text in script.js file`);
    setUpContainers();
}

function getConfig(){
    return JSON.parse(localStorage.getItem("configs"));
}

function resetConfig(){
  let acceptance = true;
  if(JSON.stringify(getConfig()) !== JSON.stringify(configData)){
      acceptance = confirm("Configs saved in file doesn't match the local storage. Are you sure to reset the data?");
  }
  if(acceptance){
  localStorage.removeItem("configs");
  window.location.reload();
  }
}

function searchAllElements(searchString){
    const latestConfig = getConfig();
    let filteredLinks = [];
    let filteredImportantItems = [];
    filteredImportantItems = latestConfig.ImportantItems.filter( (item)=>{
            return item.heading.toUpperCase().includes(searchString.toUpperCase());
    })
    latestConfig.Containers.forEach((container)=>{
        let MatchedLinks = [];
        MatchedLinks = container.links.filter((link)=>{
            return link.label.toUpperCase().includes(searchString.toUpperCase());
        })
        filteredLinks = filteredLinks.concat([...MatchedLinks]);     
    })
    return {filteredLinks , filteredImportantItems}
}

function enableShortCuts(){
    document.addEventListener("keydown",(e)=>{
        if(e.altKey && e.key.toUpperCase() === "S"){
            handleSearchMode(false);
        }else if(e.altKey && e.key.toUpperCase() === "I"){
            switchBannerCard(sessionStorage.getItem("importantItemsSwitch") === "true" ? "false" : "true");
        }else if(e.altKey  && e.key.toUpperCase() === "U"){
            handleEditMode(false);
    }else if(e.altKey  && e.key.toUpperCase() === "C"){
        if(sessionStorage.getItem("editSwitch") === "true"){
        handleEditMode(true);
        }
}
    })
}

setInterval(()=>{
    setWelcomeMessage();
    if(getDate()!==calculateDate()){
        setUpList();
        setDate();
    }
}, 600000);


