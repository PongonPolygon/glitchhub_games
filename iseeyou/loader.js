(function () {

    const repo = "PongonPolygon/glitchhub_games";
    const branch = "main";
    const filePath = "iseeyou/eyes.js";

    const apiUrl = `https://api.github.com/repos/${repo}/commits/${branch}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const sha = data.sha;
            loadScript(sha);
        })
        .catch(() => {
            loadScript(branch);
        });

    function loadScript(ref) {
        const script = document.createElement("script");
        script.src = `https://cdn.jsdelivr.net/gh/${repo}@${ref}/${filePath}`;
        script.onload = () => {
            window.dispatchEvent(new Event("ISeeYouReady"));
        };
        document.head.appendChild(script);
    }

})();
