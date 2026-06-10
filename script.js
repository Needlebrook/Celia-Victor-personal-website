window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("spinner-overlay").style.display = "none";
    document.getElementById("main-content").style.display = "block";
  }, 500);
});

const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = [
    "#7F58AF",
    "#64C5EB",
    "#E84D8A",
    "#FEB326"
];


const cellSize = 40;
const cols = Math.ceil(canvas.width / cellSize);
const rows = Math.ceil(canvas.height / cellSize);

const cells = [];

for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        cells.push({
            x,
            y,
            phase: Math.random() * Math.PI * 2,
            colorIndex: Math.floor(Math.random() * colors.length)
        });
    }
}

function animate(time) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const cell of cells) {

        const pulse = (Math.sin(time * 0.001 + cell.phase) + 1) / 2;

        const color = colors[cell.colorIndex];

        ctx.fillStyle = color;
        ctx.globalAlpha = 0.15 + pulse * 0.35;

        ctx.shadowBlur = 20;
        ctx.shadowColor = color;

        ctx.fillRect(
            cell.x * cellSize,
            cell.y * cellSize,
            cellSize - 2,
            cellSize - 2
        );
    }

    requestAnimationFrame(animate);
}

animate();
