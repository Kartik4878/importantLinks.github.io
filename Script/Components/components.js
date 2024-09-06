//**********************To do list components ***************************/

function returnListItem(isCompleted,{value, dateAdded, id}){
    const listItemBox = document.createElement("div");
    listItemBox.setAttribute("id",id);
    const removeButton = document.createElement("button");
    const listItemValue = document.createElement("p");
    listItemValue.textContent = value;
    removeButton.textContent = "X"
    listItemBox.appendChild(listItemValue);
    listItemBox.appendChild(removeButton);
    listItemBox.setAttribute("data-aos","zoom-in");
    if(isCompleted){
        removeButton.setAttribute("class","list-item-button-completed button-effect");
        removeButton.addEventListener("click",(e)=>removeCompletedItem(e,{id, value}));
        listItemBox.setAttribute("class","list-item-box-completed");
    }else{
        removeButton.setAttribute("class","list-item-button button-effect");
        removeButton.addEventListener("click",(e)=>removeItem(e,{value, dateAdded, id}));
        if(dateAdded !== getDate()) listItemValue.setAttribute("class","red-underline");
        listItemBox.setAttribute("class","list-item-box");
    }
    return listItemBox;
}


function returnAddItemBox(){
    const addItemBox = document.createElement("div");
    const textBox = document.createElement("input");
    textBox.setAttribute("autofocus","autofocus");
    const submitButton = document.createElement("button");
    submitButton.textContent = "+";
    submitButton.setAttribute("class","list-item-button button-effect");
    textBox.setAttribute("class","list-item-input button-effect");
    textBox.addEventListener("keypress",(e)=>{if(e.key === "Enter"){createListItem(e,textBox.value)}});
    submitButton.addEventListener("click", ()=>createListItem(textBox));
    addItemBox.appendChild(textBox);
    addItemBox.appendChild(submitButton);
    addItemBox.setAttribute("class","list-item-box");
    addItemBox.setAttribute("id","list-item-add-box");
    addItemBox.setAttribute("data-aos","zoom-in");
    return addItemBox;
}

function returnToDoBox(){
    const toDoBox = document.createElement("div");
    toDoBox.setAttribute("class","to-do-box");
    toDoBox.setAttribute("id","toDoBox");
    const todoListElement = document.createElement("ul");
    todoListElement.setAttribute("class","to-do-list");
    todoListElement.setAttribute("id","toDoList");
    toDoBox.appendChild(todoListElement);
    todoList?.itemList?.forEach(element => {
        todoListElement.appendChild(returnListItem(false,element));
    });
    todoList?.completedList?.forEach(element => {
        todoListElement.appendChild(returnListItem(true,element));
    });
    if(todoListElement.childNodes.length < 5){
    toDoBox.appendChild(returnToDoItemButton());
    }
    return toDoBox;
}


function returnToDoItemButton(){
    const addToDoItemButton = document.createElement("button");
    addToDoItemButton.setAttribute("class","list-item-button pointer-cursor button-effect");
    addToDoItemButton.setAttribute("id","itemAddButton");
    addToDoItemButton.setAttribute("title","Add new");
    addToDoItemButton.textContent = "+";
    addToDoItemButton.setAttribute("data-aos","zoom-in");
    addToDoItemButton.addEventListener("click",(e)=>addItemAddTextBox(e));
    return addToDoItemButton;
}


//**************************************************************************** */


//**********************Important item list components***************************/


function returnImportantItemBox(ImportantItems, isSearch){
    const importantItemsWrapper = document.createElement("div");
    const importantItems = document.createElement("div");
    importantItemsWrapper.appendChild(importantItems);
    if(isSearch){
        importantItems.setAttribute("class","important-card-search");
    }else{
        importantItems.setAttribute("class","important-card");
    }
    ImportantItems.forEach(item => {
        importantItems.appendChild(returnImportantItem(item?.heading, item?.content, item?.id, sessionStorage.getItem("importantItemsEditSwitch")==="true"));
    });
    return importantItemsWrapper;
}

  
function returnImportantItem(heading, content, id, editMode){
    let importantItemBox = document.createElement("div");
    let importantItemCard = document.createElement("div");
    let importantItemSlide = document.createElement("div");
    let importantItemContent = document.createElement("div");
    let importantItemHeader = document.createElement("div");
    let ItemHeading = document.createElement("h3");
    ItemHeading.setAttribute("class","pointer-cursor");
    ItemHeading.addEventListener("click",()=>navigator.clipboard.writeText(heading));
    importantItemBox.setAttribute("class","importantItemBox");
    importantItemContent.setAttribute("class","content");
    importantItemBox.appendChild(importantItemCard);
    importantItemCard.setAttribute("class","card");
    importantItemSlide.setAttribute("class","slide slide1");
    importantItemHeader.setAttribute("class","icon");
    importantItemCard.appendChild(importantItemSlide);
    importantItemSlide.appendChild(importantItemContent);
    importantItemContent.appendChild(importantItemHeader);
    importantItemHeader.appendChild(ItemHeading);
    ItemHeading.textContent = heading;
    if(!editMode){
        let importantItemSlide2 = document.createElement("div");
        let importantItemMainContent = document.createElement("div");
        let ItemContent = document.createElement("p");
        importantItemCard.appendChild(importantItemSlide2);
        importantItemSlide2.appendChild(importantItemMainContent);
        importantItemMainContent.appendChild(ItemContent);
        ItemContent.textContent = content;
        ItemContent.setAttribute("class","pointer-cursor");
        ItemContent.addEventListener("click",()=>navigator.clipboard.writeText(content));
        importantItemSlide2.setAttribute("class","slide slide2");
        importantItemMainContent.setAttribute("class","content");
        importantItemBox.setAttribute("id",id);
    }else {
        importantItemBox.setAttribute("title", "Click to edit");
        importantItemBox.addEventListener("click",()=>onClickEditBox(heading,content,id));
    }
    importantItemBox.setAttribute("data-aos","zoom-in");
    return importantItemBox;
}


  
function returnImportantItemEditBox(heading, content, id){
    const editBox = document.createElement("div");
    editBox.setAttribute("class", "important-items-edit-mode");
    editBox.setAttribute("data-aos","zoom-in");
    const editBoxHeading = document.createElement("input");
    editBoxHeading.setAttribute("class","important-item-input");
    editBoxHeading.value = heading;
    const editBoxValue = document.createElement("input");
    editBoxValue.setAttribute("class","important-item-input");
    editBoxValue.value = content;
    const editBoxSubmit = document.createElement("button");
    editBoxSubmit.innerText = "Submit";
    editBoxSubmit.setAttribute("class","add-new-item-button button-effect pointer-cursor");
    editBoxSubmit.addEventListener("click",(e)=>handleImporatantLinkSubmit(e, id, true));
    const editBoxDelete = document.createElement("button");
    editBoxDelete.innerText = "X";
    editBoxDelete.setAttribute("class","list-item-button-completed button-effect pointer-cursor")
    editBoxDelete.addEventListener("click",(e)=>handleImporatantLinkSubmit(e, id, false))
    const submitBox = document.createElement("div");
    submitBox.appendChild(editBoxSubmit);
    submitBox.appendChild(editBoxDelete);
    editBox.appendChild(editBoxHeading);
    editBox.appendChild(editBoxValue);
    editBox.appendChild(submitBox);
    return editBox;
}


//*******************Container List components ****************/

function returnLinkBox({address, label, id}, editMode){
    let linkBox = null;
    let linkCard = document.createElement("div");
    let linkCardYellow = document.createElement("div");
    let linkCardContent = document.createElement("div");
    linkCardYellow.setAttribute("class","link-card-yellow");
    if(editMode === "true"){
    linkBox = document.createElement("div");
    linkCard.setAttribute("class","link-card-edit-mode");
    linkCardContent.setAttribute("class","link-card-content-edit-mode");
    const labelTextBox = document.createElement("input");
    labelTextBox.setAttribute("value",label);
    const addressTextBox = document.createElement("input");
    addressTextBox.setAttribute("value",address);
    labelTextBox.setAttribute("class","link-item-input");
    addressTextBox.setAttribute("class","link-item-input");
    const removeLinkButton = document.createElement("button");
    removeLinkButton.setAttribute("class", "list-item-button-completed button-effect");
    removeLinkButton.textContent = "X";
    removeLinkButton.addEventListener("click",(e)=>handleRemoveLink(e.target));
    linkCardContent.appendChild(labelTextBox);
    linkCardContent.appendChild(addressTextBox);
    linkCardContent.appendChild(removeLinkButton);
    }else{
    linkBox = document.createElement("a");
    linkBox.setAttribute("href",address);
    linkBox.setAttribute("target","_blank");
    linkCard.setAttribute("class","link-card button-effect");
    const linkLabel = document.createElement("h3");
    linkLabel.textContent = label;
    linkCardContent.appendChild(linkLabel);
    linkCardContent.setAttribute("class","link-card-content");
    }
    linkBox.setAttribute("id",id);
    linkBox.appendChild(linkCard);
    linkCard.appendChild(linkCardYellow);
    linkCard.appendChild(linkCardContent);
    linkBox.setAttribute("data-aos","zoom-in");
    linkBox.setAttribute("data-aos-offset","30");
    return linkBox;
}

  
function returnContainer({links, label, id}){
    const editSwitch = sessionStorage.getItem("editSwitch");
    const containerBox = document.createElement("div");
    containerBox.setAttribute("class", editSwitch === "true" ? "link-container-edit-mode" : "link-container");
    containerBox.setAttribute("id",id);
    if(editSwitch === "true"){
    containerLabel = document.createElement("input");
    containerLabel.setAttribute("class","container-heading-input");
    containerLabel.value = label;
    }else{
    containerLabel = document.createElement("h2");
    containerLabel.setAttribute("class","font-size-2");
    containerLabel.textContent = label;
    }
    containerContent = document.createElement("div");
    containerContent.setAttribute("class",editSwitch === "true" ? "link-container-content-edit-mode" : "link-container-content");
    
    if(links.length > 0 ){
        links.forEach((link) =>{
            containerContent.appendChild(returnLinkBox(link, editSwitch));
        })
    }
    containerBox.appendChild(containerLabel);
    containerBox.appendChild(containerContent);
    if(editSwitch === "true"){
        const addLinkButton =  document.createElement("button");
        addLinkButton.textContent = "Add new +";
        addLinkButton.setAttribute("class","add-new-item-button button-effect");
        const removeContainerButton =  document.createElement("button");
        removeContainerButton.textContent = "X";
        removeContainerButton.setAttribute("class","list-item-button-completed button-effect");
        addLinkButton.addEventListener("click", (e)=>handleAddLinkButton(e.target));
        removeContainerButton.addEventListener("click",(e)=>handleRemoveChild(e.target));
        containerBox.appendChild(addLinkButton);
        containerBox.appendChild(removeContainerButton);
    }
    containerBox.setAttribute("data-aos","fade-up");
    containerBox.setAttribute("data-aos-offset","50");
    return containerBox;
}

//***************************banner Card components**********************/
  
function setUpBannerCard(){
    const BannerCard = document.getElementById("banner-card");
    const importantItemsSwitch = sessionStorage.getItem("importantItemsSwitch"); 
    const yellowCard = document.createElement("div");
    yellowCard.setAttribute("class","banner-card-yellow pointer-cursor");
    yellowCard.setAttribute("data-aos","flip-left");
    yellowCard.setAttribute("title","Click to search");
    yellowCard.setAttribute("id","searchBoxSwitch");
    yellowCard.addEventListener("click",()=>handleSearchMode(false));
    if(importantItemsSwitch === "false"){
        const searchBoxSwitch = sessionStorage.getItem("searchBoxSwitch");
        BannerCard.appendChild(yellowCard);
        if(searchBoxSwitch === "false"){
        BannerCard.setAttribute("class","banner-card");
        const mainCard = document.createElement("div");
        mainCard.setAttribute("class","banner-card-main");
        const mainHead = document.createElement("h1");
        mainHead.setAttribute("class","font-size-1");
        const subHead = document.createElement("h4");
        subHead.setAttribute("class","font-size-3");
        mainCard.appendChild(mainHead);
        mainCard.appendChild(subHead);
        mainCard.appendChild(returnToDoBox());
        BannerCard.appendChild(mainCard);
        mainHead.textContent = setWelcomeMessage();
        subHead.textContent = "Today's tasks ";
        }else{
            BannerCard.appendChild(returnSearchBox());
        }
    }else{
        BannerCard.appendChild(returnImportantItemBox(getConfig()?.ImportantItems), false);
        BannerCard.removeAttribute("class");
        const buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class","important-items-buttons");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.setAttribute("class","add-new-item-button button-effect");
        editButton.setAttribute("data-aos","fade-up");
        editButton.addEventListener("click",()=>handleImportantLinkEditMode(false));
        const addNewButton = document.createElement("button");
        addNewButton.textContent = "Add New +";
        addNewButton.setAttribute("class","add-new-item-button button-effect");
        addNewButton.setAttribute("data-aos","fade-up");
        addNewButton.addEventListener("click",()=>onClickEditBox("","",""));
        buttonContainer.appendChild(addNewButton);
        buttonContainer.appendChild(editButton);
        BannerCard.lastChild.appendChild(buttonContainer);
        BannerCard.lastChild.setAttribute("data-aos","zoom-in-right");
    }
}



//*************************************************************************8 */

//************************************ Search Box ************************************* */


function returnSearchBox(){
    const searchBox = document.createElement("div");
    const searchInput = document.createElement("input");
    searchInput.addEventListener("keypress",(e)=>{if(e.key === "Enter"){handleSearchButton(searchInput.value)}})
    searchInput.setAttribute("data-aos","zoom-in");
    searchInput.setAttribute("autofocus","autofocus");
    searchInput.setAttribute("class","search-box-input");
    searchInput.setAttribute("id","search-box-input");
    const searchButton = document.createElement("button");
    searchButton.setAttribute("class","add-new-item-button button-effect")
    searchButton.setAttribute("data-aos","zoom-in");
    searchButton.textContent = "Search";
    searchButton.addEventListener("click",()=>{handleSearchButton(searchInput.value)})
    searchBox.appendChild(searchInput);
    searchBox.appendChild(searchButton);
    return searchBox;
}
function returnResultBox(filteredImportantItems, filteredLinks){
    const resultBox = document.createElement("div");
    const containerObject = {
        links : [...filteredLinks],
        label : "",
        id : "search-results"
    }
    if(filteredImportantItems.length >0){
        resultBox.appendChild(returnImportantItemBox(filteredImportantItems, true));
        }
    if(filteredLinks.length > 0){
        resultBox.appendChild(returnContainer(containerObject));
    }
    return resultBox;  
}





















//*************************************************************************8 */




