window.addEventListener("DOMContentLoaded", 
() => {
    const aboutButton = document.getElementById("about-meButton");
    const projectsButton = document.getElementById("projectsButton");
    const cards = Array.from(document.getElementsByClassName("card"));
    for(const btn of [aboutButton, projectsButton]) {
        btn.addEventListener("click", ((e) => {
            const id = e.target.id;
            for(const card of cards) {
                card.style.display="none";
            }
            if(id.startsWith("about-me")) {
                cards.filter(e=>e.id === "about-me")[0].style.display="block"
            } else {
                cards.filter(e=>e.id === "projects")[0].style.display="block";
            }
        }).bind(cards));
    }
    console.log("DOM content loaded.");
    aboutButton.click();
});