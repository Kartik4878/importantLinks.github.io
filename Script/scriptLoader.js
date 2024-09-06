function loadJSFiles(){
    loadFile("./configs.js");
    loadFile("https://unpkg.com/aos@2.3.1/dist/aos.js");
    loadFile("./Script/Components/components.js");
    loadFile("./Script/Components/componentHandler.js")
    loadFile("./Script/utils.js");
    setTimeout(()=>loadFile("./Script/script.js"),100);
}
function loadFile(url){
    const script = document.createElement("script");
    script.setAttribute("src",url);
    script.setAttribute("defer","defer");
    document.head.appendChild(script);
}

loadJSFiles();

