 
  // ******************Code for BannerCard *******************************//

  
  function switchBannerCard(editSwitch){
    if(editSwitch === "true"){
        handleSearchMode(true);
    }
    const importantItemsSwitch = editSwitch;
    sessionStorage.setItem("importantItemsSwitch", importantItemsSwitch);
    const BannerCard = document.getElementById("banner-card");
    while (BannerCard.lastElementChild) {
        BannerCard.removeChild(BannerCard.lastElementChild);
      }
      setUpBannerCard();
}

//**********************************************************************//


// ******************Code for To do list *******************************//


function removeItem(e,{id, value}){
    let newList = [];
    const completedList = [...todoList?.completedList] ;
    todoList?.itemList.forEach((item)=>{
          if(item.id !== id) newList.push(item);
          else completedList.unshift(item);
    })
    e.target.parentElement.parentElement.replaceChild(returnListItem(true,{ value : value, id : id}),e.target.parentElement);
    todoList.itemList = [...newList];
    todoList.completedList = [...completedList];
    saveListData(todoList);
}

function removeCompletedItem(e,{id}){
    let newList = [] ;
    newList = todoList?.completedList.filter((item)=>{item.id !== id})
    todoList.completedList = [...newList];
    if(e.target.parentElement.parentElement.childNodes.length === 5){
        e.target.parentElement.parentElement.parentElement.appendChild(returnToDoItemButton());
    }
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);
    saveListData(todoList);
}

function createListItem(e,value){
    const toDoListElement = document.getElementById("toDoList");
    const itemValue = value;
    if(itemValue!=="" && itemValue.length < 42){
    const newItem = {
        id : todoList?.itemList.length,
        value : itemValue,
        dateAdded : getDate()
    }
    todoList?.itemList.push(newItem);
    toDoListElement.parentElement.removeChild(e.target.parentElement);
    toDoListElement.appendChild(returnListItem(false,newItem));
    if(todoList?.itemList.length  + todoList?.completedList.length < 5){
        toDoListElement.parentElement.appendChild(returnToDoItemButton());
    }
    saveListData(todoList);
    }else{
        itemValue==="" ?  alert("Please enter a valid value.") : alert("Please define the task under 40 characters.") 
    }
    }

    function addItemAddTextBox(e){
        const toDoBox = document.getElementById("toDoBox");
        if(!todoList?.itemList || todoList?.itemList.length < 5){
        toDoBox.appendChild(returnAddItemBox());
        e.target.parentElement.removeChild(e.target);
    }else{
        alert("Cannot add more than 5 items at a time")
    }
    }
    

function setUpList(){
    const todoListElement = document.getElementById("toDoList");
    while (todoListElement.lastElementChild) {
        todoListElement.removeChild(todoListElement.lastElementChild);
      }
    todoList?.itemList?.forEach(element => {
        todoListElement.appendChild(returnListItem(false,element));
    });
    todoList?.completedList?.forEach(element => {
        todoListElement.appendChild(returnListItem(true,element));
    });
    if(todoList?.itemList.length  + todoList?.completedList.length < 5){
        todoListElement.parentElement.appendChild(returnToDoItemButton());
    }
}



//**********************************************************************//


//*******************Code for important items list************************************************ *//


function onClickEditBox(heading,content,id){
    const bannerCard = document.getElementById("banner-card");
    if(bannerCard.lastElementChild?.className.includes("important-items-edit-mode")){
        bannerCard.removeChild(bannerCard.lastElementChild);
    }else{
        bannerCard.appendChild(returnImportantItemEditBox(heading,content,id));
        }
    }
    


function handleImportantLinkEditMode(isForceClose){
    
    if(sessionStorage.getItem("importantItemsSwitch") === "true"){
        if(isForceClose){
          sessionStorage.setItem("importantItemsEditSwitch" , "false");
      }
        else{
        sessionStorage.setItem("importantItemsEditSwitch" , sessionStorage.getItem("importantItemsEditSwitch") === "true" ? "false" : "true"); 
        }
    }else{
        sessionStorage.setItem("importantItemsEditSwitch","false");
    }
    switchBannerCard("true");
}

function handleImporatantLinkSubmit(e, id, isSubmit){
    if(isSubmit){
    const newConfig = getConfig();
    let heading = e.target.parentElement.previousSibling.previousSibling.value;
    let content = e.target.parentElement.previousSibling.value;
    if(heading !== "" && content !== ""){
     if(id!==""){
     const newItems =  newConfig?.ImportantItems.map(item => {
        if(item?.id === id){
            item.heading = heading;
            item.content = content;
        }
        return item;
    });
    newConfig.ImportantItems =  [...newItems];
}else{
    newItem = { 
        heading :  heading,
        content :  content,
        id : "I" + Math.floor(Math.random()*100)
}
newConfig.ImportantItems.push(newItem);
}
    saveConfigData(newConfig);
}else alert("Please enter right values to proceed.");
    }else{
    const newConfig = getConfig();
    if(id !== ""){
    
    if(newConfig?.ImportantItems.length > 1){
        const acceptance = confirm("Press \"OK\" to remove");
        if(acceptance){
            const newItems = newConfig?.ImportantItems.filter((item) => item?.id !== id);
            newConfig.ImportantItems =  [...newItems];
            saveConfigData(newConfig);
        }
    }else alert("Cannot delete the last item.")
}
}
handleImportantLinkEditMode(true);

    
}


//********************************************************************** */

// ******************Code for container list *******************************//


function setUpContainers(){
    let editSwitch = sessionStorage.getItem("editSwitch");
    const contentCard = document.getElementById("content-card");
    while (contentCard.lastElementChild) {
        contentCard.removeChild(contentCard.lastElementChild);
    }
    const containers = getConfig()?.Containers
    if(containers.length > 0){
        containers.forEach((container)=>{
            contentCard.appendChild(returnContainer(container));
        })
    }
    if(editSwitch==="true"){
        const addContainerButton =  document.createElement("button");
        addContainerButton.textContent = "Add new +";
        addContainerButton.setAttribute("class","add-new-item-button button-effect");
        contentCard.appendChild(addContainerButton);
        addContainerButton.addEventListener("click",(e)=>handleContainerAdd(e.target));
    }
    
}

function handleEditMode(isCancel){
    let editSwitch = sessionStorage.getItem("editSwitch");
    let result = "";
    if(editSwitch === "true") {
        if (!isCancel) result = handleFinalSubmit();
        if(result !== "Cancelled" || isCancel){
        sessionStorage.setItem("editSwitch", "false" );
        manageLinksButton.parentElement.setAttribute("class","pointer-cursor");
        submitButton.parentElement.setAttribute("class","hide-element");
        }
    }
    else {
        manageLinksButton.removeAttribute("class");
        submitButton.parentElement.setAttribute("class","button-effect");
        sessionStorage.setItem("editSwitch", "true" );
    }
    setUpContainers();
    if(sessionStorage.getItem("importantItemsSwitch") === "true"){
    switchBannerCard("false");
}
handleSearchMode(true);

}


function handleRemoveChild(e){
    if(e.parentElement.parentElement.querySelectorAll("div.link-container-edit-mode").length > 1){
        const acceptance = confirm("Press \"OK\" to remove");
    if(acceptance) e.parentElement.parentElement.removeChild(e.parentElement);
    }else{
        alert("Cannot remove the single container left.")
    }
}

function handleRemoveLink(e){
    if(e.parentElement.parentElement.parentElement.parentElement.querySelectorAll("div.link-card-edit-mode").length > 1){
        e.parentElement.parentElement.parentElement.removeChild(e.parentElement.parentElement);
    }else{
        alert("Cannot remove the single link left.")
    }
    
}

function handleAddLinkButton(e){
    e.previousSibling.insertAdjacentElement("afterend",returnLinkBox({id : "", label : "", address :""},"true"));
}


function handleContainerAdd(e){
    e.previousSibling.insertAdjacentElement("afterend",returnContainer({links : [],label : "",id : ""}));
}


//**********************************************************************//

//**********For Final submission******************** */


function validateData(){
    let validity = "valid";
    document.querySelectorAll("input").forEach((input)=>{
        if(input.value === ""){
            validity = "invalid";
        }
    });
    return validity;
}

function handleFinalSubmit(){
    const acceptance = confirm("Press \"OK\" to confirm.");
    if(acceptance){
    if(validateData() === "valid"){
    let contID  = 0;
    const Containers = [];
    const containers = document.querySelectorAll("div.link-container-edit-mode");
    containers.forEach((container)=>{
        let cont = { id : "", links : [], label : "" };
        let linkID = 0;
        cont.id = "C"+ contID;
        cont.label = container.firstChild.value;
        const contLinks = container.querySelectorAll("div.link-card-content-edit-mode");
        contLinks.forEach((link)=>{
            const inputs = link.querySelectorAll("input");
            let li = {id : "", address : "" ,label :"" };
            li.id = cont.id + "L" + linkID;
            li.label = inputs[0].value;
            li.address = inputs[1].value;
            linkID +=1
            cont.links.push(li);
        })
        contID+=1;
        Containers.push(cont);
    })
    const confiuration = getConfig();
    confiuration.Containers = [...Containers];
    saveConfigData(confiuration);
    setUpContainers();
    return "Submitted";
}else{
    alert("Please enter valid data in the text-box provided.");
    return "Cancelled";
}
    }else {
        return "Cancelled";
}
}

//**************************************************/

//********************* Search Box Code*****************************/


function handleSearchMode(isForceClose){
    if(isForceClose){
        sessionStorage.setItem("searchBoxSwitch","false")
    }
    else if(sessionStorage.getItem("searchBoxSwitch")==="true"){
        sessionStorage.setItem("searchBoxSwitch","false");
    }else{
        sessionStorage.setItem("searchBoxSwitch","true");
    }
    switchBannerCard("false");
    setUpContainers();
}


function handleContentSearch(searchString){
    setUpContainers();
    const {filteredImportantItems, filteredLinks} = searchAllElements(searchString);
    if(filteredImportantItems.length >0 || filteredLinks.length > 0){
        const contentCard = document.getElementById("content-card");
        while (contentCard.lastElementChild) {
        contentCard.removeChild(contentCard.lastElementChild);
        }
        const resultBox = returnResultBox(filteredImportantItems,filteredLinks);
        contentCard.appendChild(resultBox);
    }else{
        alert("No results found.")
    }
}

function handleSearchButton(searchString){
    if(searchString.length > 2){
        handleContentSearch(searchString);
    }
    else{
        alert("Please enter atleast 3 characters to search.")
    }
}



//**************************************************/












