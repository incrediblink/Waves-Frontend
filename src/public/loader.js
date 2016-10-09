var counter = 0;

function loaded() {
    if (++counter >= 3) {
        document.getElementsByClassName('loader')[0].setAttribute("hidden", true);
        document.getElementById("content").setAttribute("style", "display: initial");
    }
}