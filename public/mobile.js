if (!window.matchMedia("(min-width: 1024px)").matches) {
    const newDiv = document.createElement("div");

    // and give it some content
    const newContent = document.createElement("div");
    newContent.textContent = "Collapse";
    newContent.id = "button";

    newContent.addEventListener('click', () => {
        // When there is a "click"
        // it shows an alert in the browser
        var elem = document.getElementById("collapse");
        if (elem.style.length == 0)
        {
            elem.style = "height: 0; overflow: hidden;";
            document.getElementById("button").textContent = "Expand";
        }
        else
        {
            elem.style = "";
            document.getElementById("button").textContent = "Collapse";
        }
      })

    newContent.style = "width: 200px; background-color: rgba(0, 0, 0, 0.05); margin: auto; border-radius: 4px;";

    newDiv.style = "margin-top: 10px;";
    newDiv.className = "text-center";

    // add the text node to the newly created div
    newDiv.appendChild(newContent);

    const elem = document.getElementById("place");
    elem.insertBefore(newDiv, elem.firstChild);
}
