 let retter;
        const dest = document.querySelector("#menu-container");
        const theTemplatePointer = document.querySelector("template");
        let filterRet = "alle";

        document.addEventListener("DOMContentLoaded", getJson);

        //Her hentes json data ind og sendes videre til funktionen visRetter
        async function getJson() {
           let jsonData = await fetch("https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json");
    
    let tempVar = await jsonData.json();
    retter = tempVar.feed.entry;
        visRetter();
            addEventListenersToButtons();
        }

        // visRetter sætter hver enkelt ret ind i html
        function visRetter() {
            dest.innerHTML = "";// html containeren tømmes får der fyldes nyt indhold i den.
            retter.forEach(ret => { // aray'et retter løbes igennem, og hver ret indsættes i html
                if (filterRet == "alle" || filterRet == ret.gsx$kategori.$t)  {
                    const theClone = theTemplatePointer.cloneNode(true).content;// html template klones og fyldes med indhold
                    theClone.querySelector("h2").textContent = ret.gsx$navn.$t;
                    theClone.querySelector("img").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;
                    theClone.querySelector("img").alt = ret.gsx$navn.$t;
                    theClone.querySelector("p.info").textContent = ret.gsx$kort.$t;
                    theClone.querySelector("span").textContent = ret.gsx$pris.$t;

                    dest.appendChild(theClone);// klonen tilføjes til DOM
                    
                    dest.lastElementChild.addEventListener("click", () => {
                        visSingle(ret);
                       // location.href = "single.html?id="+ret.gsx$id.$t;
                        
                   });
                }
            })
        }
        
        //når der klikkes på en enkelt ret vises denne seperat
        function visSingle(ret) {

           console.log("ret", ret) ;
            document.querySelector(".popup").style.display = "block";
            document.querySelector(".popup button").addEventListener("click", lukSingle);
            
            document.querySelector(".popup h2").textContent = ret.gsx$navn.$t;
            document.querySelector(".popup img").src = `imgs/large/${ret.gsx$billede.$t}.jpg`;
            document.querySelector(".popup img").alt = ret.gsx$navn.$t;
            document.querySelector(".popup details p").textContent = ret.gsx$lang.$t;
            
        }

        function lukSingle(){
            document.querySelector(".popup").style.display = "none";
        }
        
        // funktion der lægger en eventListener på alle filtreringsknapper
        function addEventListenersToButtons() {
            document.querySelectorAll("nav button").forEach(elm => {
                elm.addEventListener("click", filtrering);
            })
        }
        
        // funktion der filtrer indholdet på siden, alt efter hvilken knap der er klikket på
        function filtrering() {
            filterRet = this.dataset.ret;
            document.querySelector("h1").textContent = this.textContent;
//            document.querySelectorAll(".filter").forEach(elm => {
//                elm.classList.remove("valgt");
//            });
//            this.classList.add("valgt");
            visRetter();
        }

document.querySelector(".burger").addEventListener("click",()=>{
    document.querySelector("nav").classList.toggle("show");
})