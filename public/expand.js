
var something = document.getElementById('expandable');

something.style.cursor = 'pointer';
something.onclick = function() {
    var main = document.getElementById('main');

    if (main.classList.contains("visible"))
    {
        main.classList.add("flex-none");
        main.classList.replace("w-64", "w-0");
    }
    else
    {
        main.classList.remove("flex-none");
        main.classList.replace("w-0", "w-64");
    }
};