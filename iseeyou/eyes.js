(function () {

    function create(options = {}) {

        let size = Number(options.size) || 1;
        let gap = Number(options.gap) || 50;
        const mount = options.mount || document.body;

        const container = document.createElement("div");
        container.style.display = "flex";
        container.style.gap = gap * size + "px";
        mount.appendChild(container);

        function createEye() {
            const sclera = document.createElement("div");
            const pupil = document.createElement("div");

            sclera.style.position = "relative";
            sclera.style.background = "white";
            sclera.style.borderRadius = "50%";
            sclera.style.display = "flex";
            sclera.style.alignItems = "center";
            sclera.style.justifyContent = "center";
            sclera.style.overflow = "hidden";

            pupil.style.position = "absolute";
            pupil.style.background = "black";
            pupil.style.borderRadius = "50%";

            sclera.appendChild(pupil);
            container.appendChild(sclera);

            return { sclera, pupil };
        }

        const left = createEye();
        const right = createEye();

        let leftPos = { x: 0, y: 0, cx: 0, cy: 0 };
        let rightPos = { x: 0, y: 0, cx: 0, cy: 0 };

        function applySize() {
            container.style.gap = gap * size + "px";

            [left, right].forEach(eye => {
                eye.sclera.style.width = 100 * size + "px";
                eye.sclera.style.height = 100 * size + "px";
                eye.sclera.style.border = 4 * size + "px solid black";

                eye.pupil.style.width = 50 * size + "px";
                eye.pupil.style.height = 50 * size + "px";
            });

            leftPos.x = rightPos.x = 25 * size;
            leftPos.y = rightPos.y = 25 * size;
        }

        applySize();

        function move(eye, pos, event) {
            const rect = eye.sclera.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            let dx = event.clientX - centerX;
            let dy = event.clientY - centerY;

            const max = 25 * size;
            const dist = Math.sqrt(dx*dx + dy*dy);

            if (dist > max) {
                const angle = Math.atan2(dy, dx);
                dx = Math.cos(angle) * max;
                dy = Math.sin(angle) * max;
            }

            pos.x = 25 * size + dx;
            pos.y = 25 * size + dy;
        }

        document.addEventListener("mousemove", e => {
            move(left, leftPos, e);
            move(right, rightPos, e);
        });

        let last = performance.now();

        function animate(now) {
            const delta = (now - last) / 1000;
            last = now;
            const speed = 20;

            [leftPos, rightPos].forEach(pos => {
                pos.cx += (pos.x - pos.cx) * speed * delta;
                pos.cy += (pos.y - pos.cy) * speed * delta;
            });

            left.pupil.style.left = leftPos.cx + "px";
            left.pupil.style.top = leftPos.cy + "px";

            right.pupil.style.left = rightPos.cx + "px";
            right.pupil.style.top = rightPos.cy + "px";

            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);

        return {
            update(config = {}) {
                if (config.size !== undefined)
                    size = Number(config.size) || 1;

                if (config.gap !== undefined)
                    gap = Number(config.gap) || 50;

                applySize();
            },
            destroy() {
                container.remove();
            }
        };
    }

    window.ISeeYou = { create };

})();
