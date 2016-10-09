var counter = 0;

function loaded() {
    if (++counter >= 1) {
        document.getElementsByClassName('loader')[0].setAttribute("hidden", true);
        document.getElementById("content").setAttribute("hidden", false);
    }
}