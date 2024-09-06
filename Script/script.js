 //******************Set up global variables **********/
  
  const todoList = getListData();
  localStorage.setItem("todoList",JSON.stringify(todoList?.itemList || todoList?.completedList ? todoList : {itemList :[], completedList :[]}));
  sessionStorage.setItem("editSwitch", "false");
  sessionStorage.setItem("importantItemsSwitch", "false");
  sessionStorage.setItem("importantItemsEditSwitch", "false");
  sessionStorage.setItem("searchBoxSwitch",false);
  const loadFromFileSwitch = false;
  const manageLinksButton = document.getElementById("manage-links");
  const submitButton = manageLinksButton.parentElement.nextElementSibling.lastElementChild;
  const reloadConfigButton = manageLinksButton.parentElement.nextElementSibling.firstElementChild;
  const cancelButton = reloadConfigButton.nextElementSibling;

  //************************************************************************** */
  
  
  //*********************Initialize***********************/

//   function showdialog(){
//     const dialog = document.getElementById("dialog");
//     dialog.showModal();

//   }
  
  function initialize(){
      AOS.init();
      if(!getConfig() || JSON.stringify(getConfig()) === ""){
      setUpConfig();
      }
      setDate();
      setUpContainers();
      setUpBannerCard();
      if(manageLinksButton && submitButton){
          manageLinksButton.addEventListener("click",()=>handleEditMode(false));
          submitButton.addEventListener("click",()=>handleEditMode(false));
          reloadConfigButton.addEventListener("click",resetConfig);
          cancelButton.addEventListener("click",()=>{handleEditMode(true)})
          importantLinkSwitch.addEventListener("click",()=>switchBannerCard(sessionStorage.getItem("importantItemsSwitch") === "true" ? "false" : "true"));
      }
      enableShortCuts();
    //   document.getElementById("my-img").addEventListener("click",showdialog)
  }
initialize();
  

  
  
  
  
  
  
  
  
  
  
  
  
  
  
