// Load files

for (file in gameInfo.gameFiles) {
    let script = document.createElement("script");
    script.setAttribute("src", "js/" + gameInfo.gameFiles[file]);
    script.setAttribute("async", "false");
    document.head.insertBefore(script, document.getElementById("temp"));
}

