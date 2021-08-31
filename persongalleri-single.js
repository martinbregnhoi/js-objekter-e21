       const url = "https://persongalleri-5d3e.restdb.io/rest/persongalleri/";
       const options = {
        headers: {
          "x-apikey": "600fe9211346a1524ff12e31",
        },
      };
        let person;
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id")


document.addEventListener("DOMContentLoaded", start);

function start(){
    hentData();
}


        async function hentData() {
            const resspons = await fetch(url+id, options);
            person = await resspons.json();
            console.log(person);
            vis();
        }

        const main = document.querySelector("main");


        function vis() {
            console.log(person)
          
                document.querySelector(".billede").src = "faces/" + person.billede;
                document.querySelector(".navn").textContent = person.fornavn+" "+person.efternavn;
                document.querySelector(".titel").textContent = person.titel;
                document.querySelector(".fødselsdag").textContent = person.fødselsdag;
                document.querySelector(".hobby").textContent = person.hobby;
           
         
        }

        document.querySelector("button").addEventListener("click", ()=> window.history.back());