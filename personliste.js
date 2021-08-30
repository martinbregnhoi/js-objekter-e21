       const url = "https://persongalleri-5d3e.restdb.io/rest/persongalleri";
        const key = "600fe9211346a1524ff12e31";
        let personer;
        let filter= "alle";
        const filterknapper = document.querySelectorAll("button");

document.addEventListener("DOMContentLoaded", start);

function start(){
    filterknapper.forEach(knap=>{
        knap.addEventListener("click", setFilter);
    })
    hentData();
}

function setFilter(){
    filter = this.dataset.troende;
    document.querySelector("h1").textContent = this.textContent;
    vis();
}

        async function hentData() {
            const resspons = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-apikey': key
                }
            });
            personer = await resspons.json();
            console.log(personer);
            vis();
        }

        const main = document.querySelector("main");
        const template = document.querySelector("template").content;


        function vis() {
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
                    location.href = "personliste-single.html?id="+person._id;
                });

                main.appendChild(klon);
                }
            })
        }