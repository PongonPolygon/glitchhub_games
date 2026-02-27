(function () {
    const repo = "PongonPolygon/glitchhub_games";
    const branch = "main";
    const filePath = "iseeyou/eyes.js";

    const currentScript = document.currentScript;

    const originalParams = currentScript.src.includes("?")
        ? currentScript.src.substring(currentScript.src.indexOf("?"))
        : "";

    const apiUrl = `https://api.github.com/repos/${repo}/commits/${branch}`;

    fetch(apiUrl)
        .then(res => {
            if (!res.ok) throw new Error("GitHub API failed");
            return res.json();
        })
        .then(data => {
            const sha = data.sha;

            const newScript = document.createElement("script");
            newScript.src =
                `https://cdn.jsdelivr.net/gh/${repo}@${sha}/${filePath}` +
                originalParams;

            currentScript.parentNode.replaceChild(newScript, currentScript);
        })
        .catch(() => {
            // Fallback to @main
            const fallbackScript = document.createElement("script");
            fallbackScript.src =
                `https://cdn.jsdelivr.net/gh/${repo}@${branch}/${filePath}` +
                originalParams;

            currentScript.parentNode.replaceChild(
                fallbackScript,
                currentScript
            );
        });
})();
