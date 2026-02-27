(function () {

    const instances = [];

    function createEyes(options = {}) {
        const size = Number(options.size) || 1;
        const gap = Number(options.gap) || 50;
        const mount = options.mount || document.body;

        let sizeModify = size;
        let gapSize = gap;

        const eyesDiv = document.createElement("div");
        eyesDiv.style.display = "flex";
        eyesDiv.style.flexDirection = "row";
        mount.appendChild(eyesDiv);

        const leftSclera = document.createElement("div");
        const rightSclera = document.createElement("div");
        const leftPupil = document.createElement("div");
        const rightPupil = document.createElement("div");

        [leftSclera, rightSclera].forEach(s => {
            s.style.background = "white";
            s.style.borderRadius = "50%";
            s.style.display = "flex";
            s.style.justifyContent = "center";
            s.style.alignItems = "center";
            s.style.position = "relative";
            s.style.overflow = "hidden";
            eyesDiv.appendChild(s);
        });

        [leftPupil, rightPupil].forEach(p => {
            p.style.background = "black";
            p.style.borderRadius = "50%";
            p.style.position = "absolute";
        });

        leftSclera.appendChild(leftPupil);
        rightSclera.appendChild(rightPupil);

        let leftPos = { x: 0, y: 0, cx: 0, cy: 0 };
        let rightPos = { x: 0, y: 0, cx: 0, cy: 0 };

        function applySize() {
            eyesDiv.style.gap = gapSize * sizeModify + "px";

            [leftSclera, rightSclera].forEach(s => {
                s.style.border = 4 * sizeModify + "px solid black";
                s.style.height = 100 * sizeModify + "px";
                s.style.width = 100 * sizeModify + "px";
            });

            [leftPupil, rightPupil].forEach(p => {
                p.style.height = 50 * sizeModify + "px";
                p.style.width = 50 * sizeModify + "px";
            });

            leftPos.x = rightPos.x = 25 * sizeModify;
            leftPos.y = rightPos.y = 25 * sizeModify;
        }

        applySize();

        document.addEventListener("mousemove", (event) => {
            movePupil(leftSclera, leftPos, event);
            movePupil(rightSclera, rightPos, event);
        });

        function movePupil(eye, pos, event) {
            const rect = eye.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            let dx = event.clientX - centerX;
            let dy = event.clientY - centerY;

            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxRadius = 25 * sizeModify;

            if (distance > maxRadius) {
                const angle = Math.atan2(dy, dx);
                dx = Math.cos(angle) * maxRadius;
                dy = Math.sin(angle) * maxRadius;
            }

            pos.x = 25 * sizeModify + dx;
            pos.y = 25 * sizeModify + dy;
        }

        let last = performance.now();

        function animate(now) {
            const delta = (now - last) / 1000;
            last = now;
            const speed = 20;

            [leftPos, rightPos].forEach(pos => {
                pos.cx += (pos.x - pos.cx) * speed * delta;
                pos.cy += (pos.y - pos.cy) * speed * delta;
            });

            leftPupil.style.left = leftPos.cx + "px";
            leftPupil.style.top = leftPos.cy + "px";
            rightPupil.style.left = rightPos.cx + "px";
            rightPupil.style.top = rightPos.cy + "px";

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        return {
            update(config = {}) {
                if (config.size !== undefined)
                    sizeModify = Number(config.size) || 1;

                if (config.gap !== undefined)
                    gapSize = Number(config.gap) || 50;

                applySize();
            },
            destroy() {
                eyesDiv.remove();
            }
        };
    }

    window.ISeeYou = {
        create: createEyes
    };

})();
