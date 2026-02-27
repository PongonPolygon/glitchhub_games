//get modifiers
const scriptElement = document.currentScript;
let sizeModify = new URLSearchParams(new URL(document.currentScript.src).search).get("size") || 1;
let gap = new URLSearchParams(new URL(document.currentScript.src).search).get("gap") || 50;
const scriptPartent = document.currentScript.parentElement;

//create divs and stuff for eyes
const eyesDiv = document.createElement("div");
eyesDiv.style.display = "flex";
eyesDiv.style.flexDirection = "row";
eyesDiv.style.gap = gap*sizeModify + "px";
scriptPartent.appendChild(eyesDiv);

const leftSclera = document.createElement("div");
leftSclera.style.border = 4*sizeModify + "px solid black";
leftSclera.style.height = 100*sizeModify + "px";
leftSclera.style.width = 100*sizeModify + "px";
leftSclera.style.background = "white";
leftSclera.style.borderRadius = 50 + "%";
leftSclera.style.display = "flex";
leftSclera.style.justifyContent = "center";
leftSclera.style.alignItems = "center";
leftSclera.style.position = "relative";
leftSclera.style.overflow = "hidden";
eyesDiv.appendChild(leftSclera);

const leftPupil = document.createElement("div");
leftPupil.style.height = 50*sizeModify + "px";
leftPupil.style.width = 50*sizeModify + "px";
leftPupil.style.background = "black";
leftPupil.style.borderRadius = 50 + "%";
leftPupil.style.position = "absolute";
leftPupil.style.top = 25*sizeModify + "px";
leftPupil.style.left = 25*sizeModify + "px";
leftSclera.appendChild(leftPupil);

const rightSclera = document.createElement("div");
rightSclera.style.border = 4*sizeModify + "px solid black";
rightSclera.style.height = 100*sizeModify + "px";
rightSclera.style.width = 100*sizeModify + "px";
rightSclera.style.background = "white";
rightSclera.style.borderRadius = 50 + "%";
rightSclera.style.display = "flex";
rightSclera.style.justifyContent = "center";
rightSclera.style.alignItems = "center";
rightSclera.style.position = "relative";
rightSclera.style.overflow = "hidden";
eyesDiv.appendChild(rightSclera);

const rightPupil = document.createElement("div");
rightPupil.style.height = 50*sizeModify + "px";
rightPupil.style.width = 50*sizeModify + "px";
rightPupil.style.background = "black";
rightPupil.style.borderRadius = 50 + "%";
rightPupil.style.position = "absolute";
rightPupil.style.top = 25*sizeModify + "px";
rightPupil.style.left = 25*sizeModify + "px";
rightSclera.appendChild(rightPupil);

const adButton = document.createElement("button");
adButton.style.backgroundColor = "rgba(0, 0, 0, 0)";
adButton.style.width = 2*((100*sizeModify)+2*(4*sizeModify)) + gap*sizeModify + "px"; // goofy ahh size math
adButton.style.height = ((100*sizeModify)+2*(4*sizeModify)) + "px"; // some more goofy ahh size math
adButton.style.position = "absolute";
adButton.style.borderWidth = "0px";
adButton.style.borderRadius = 52*sizeModify + "px";
adButton.style.cursor = "pointer";
eyesDiv.appendChild(adButton);

adButton.addEventListener("click", function() {
    window.open("https://pongonpolygon.github.io/glitchhub_games/iseeyou/", "_blank");
});

let parentUrl;

try {
    parentUrl = window.parent.location.origin;
} catch (e) {
    // Cross-origin — cannot access parent
    parentUrl = document.referrer
        ? new URL(document.referrer).origin
        : window.location.origin;
}

if (parentUrl == "https://pongonpolygon.github.io") {
    adButton.remove();
}


//actual functions and stuff
let leftPos = {
    x: 25*sizeModify,
    y: 25*sizeModify,
    currentx: 25*sizeModify,
    currenty: 25*sizeModify
};

let rightPos = {
    x: 25*sizeModify,
    y: 25*sizeModify,
    currentx: 25*sizeModify,
    currenty: 25*sizeModify
};

document.addEventListener("mousemove", (event) => {
    movePupil(leftSclera, leftPupil, event, leftPos);
    movePupil(rightSclera, rightPupil, event, rightPos);
});

function movePupil(eye, pupil, event, vari) {
    const rect = eye.getBoundingClientRect();

    const eyeCenterX = rect.left + rect.width / 2;
    const eyeCenterY = rect.top + rect.height / 2;

    let dx = event.clientX - eyeCenterX;
    let dy = event.clientY - eyeCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxRadius = 25*sizeModify; // (eyeSize - pupilSize) / 2

    if (distance > maxRadius) {
        const angle = Math.atan2(dy, dx);
        dx = Math.cos(angle) * maxRadius;
        dy = Math.sin(angle) * maxRadius;
    }

    vari.x = 25*sizeModify + dx;
    vari.y = 25*sizeModify + dy;
}

let lastTime = performance.now();

document.documentElement.addEventListener("mouseleave", (event) => {
    leftPos.x = 25*sizeModify;
    rightPos.x = 25*sizeModify;
    rightPos.y = 25*sizeModify;
    leftPos.y = 25*sizeModify;
});

function update(currentTime) {
    const currentSrc = scriptElement.src;
    const params = new URLSearchParams(new URL(currentSrc).search);

    sizeModify = Number(params.get("size")) || 1;
    gap = Number(params.get("gap")) || 50;
    
    //update perframe variables for changes
    leftSclera.style.border = 4*sizeModify + "px solid black";
    leftSclera.style.height = 100*sizeModify + "px";
    leftSclera.style.width = 100*sizeModify + "px";
    leftSclera.style.borderRadius = 50 + "%";
    leftPupil.style.height = 50*sizeModify + "px";
    leftPupil.style.width = 50*sizeModify + "px";
    leftPupil.style.background = "black";
    leftPupil.style.borderRadius = 50 + "%";
    leftPupil.style.top = 25*sizeModify + "px";
    leftPupil.style.left = 25*sizeModify + "px";
    rightSclera.style.border = 4*sizeModify + "px solid black";
    rightSclera.style.height = 100*sizeModify + "px";
    rightSclera.style.width = 100*sizeModify + "px";
    rightSclera.style.borderRadius = 50 + "%";
    rightPupil.style.height = 50*sizeModify + "px";
    rightPupil.style.width = 50*sizeModify + "px";
    rightPupil.style.borderRadius = 50 + "%";
    rightPupil.style.top = 25*sizeModify + "px";
    rightPupil.style.left = 25*sizeModify + "px";
    eyesDiv.style.gap = gap*sizeModify + "px";
    adButton.style.width = 2*((100*sizeModify)+2*(4*sizeModify)) + gap*sizeModify + "px"; // goofy ahh size math
    adButton.style.height = ((100*sizeModify)+2*(4*sizeModify)) + "px"; // some more goofy ahh size math
    adButton.style.borderRadius = 100*sizeModify + "px";

    const delta = (currentTime - lastTime) / 1000;
    lastTime = currentTime;

    const speed = 20;

    leftPos.currentx += (leftPos.x - leftPos.currentx) * speed * delta;
    leftPos.currenty += (leftPos.y - leftPos.currenty) * speed * delta;

    rightPos.currentx += (rightPos.x - rightPos.currentx) * speed * delta;
    rightPos.currenty += (rightPos.y - rightPos.currenty) * speed * delta;

    leftPupil.style.left = leftPos.currentx + "px";
    leftPupil.style.top = leftPos.currenty + "px";

    rightPupil.style.left = rightPos.currentx + "px";
    rightPupil.style.top = rightPos.currenty + "px";

    requestAnimationFrame(update);
}

requestAnimationFrame(update);
