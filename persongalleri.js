       const url = "https://persongalleri-5d3e.restdb.io/rest/persongalleri";
        const options = {
        headers: {
          "x-apikey": "600fe9211346a1524ff12e31",
        },
      };

        let personer;
        let filter= "alle";
        const filterknapper = document.querySelectorAll("button");
        const main = document.querySelector("main");
        const template = document.querySelector("template").content;

document.addEventListener("DOMContentLoaded", start);

function start(){
  addEventListenersToButtons();
    hentData();
}

  function addEventListenersToButtons() {
        filterknapper.forEach(knap=>{
        knap.addEventListener("click", filtrer);
    })
      }

function filtrer(){
    filter = this.dataset.troende;
    document.querySelector("#troTekst").textContent = this.textContent;
     document.querySelector(".valgt").classList.remove("valgt");
        this.classList.add("valgt");
    visPersoner();
}

        async function hentData() {
            const resspons = await fetch(url, options);
            personer = await resspons.json();
            console.log(personer);
            visPersoner();
        }

       
        function visPersoner() {
            console.log(personer)
            main.innerHTML = "";
            personer.forEach(person => {
                if(filter == person.troende || filter == "alle"){
                const klon = template.cloneNode(true);
                klon.querySelector(".billede").src = "faces/" + person.billede;
                klon.querySelector(".navn").textContent = person.fornavn+" "+person.efternavn;
                klon.querySelector(".titel").textContent = person.titel;
                klon.querySelector(".fødselsdag").textContent = person.fødselsdag;
                klon.querySelector("article").addEventListener("click",()=>{
                    location.href = "persongalleri-single.html?id="+person._id;
                });

                main.appendChild(klon);
                }
            })
        }