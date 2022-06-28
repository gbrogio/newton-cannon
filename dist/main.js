"use strict";
/////////////// HTML ELEMENTS //////////////////
const planet = document.getElementById('planet')?.style;
const projetil = document.getElementById('projetil')?.style;
const universe = document.getElementById('universe');
const impulse = document.getElementById('impulse');
const start = document.getElementById('start');
/////////////// GLOBALS //////////////////
const G = 6.67384;
let IMPULSE = undefined;
/////////////// ENTITIES //////////////////
const universeValues = {
    x0: window.innerWidth / 2,
    y0: window.innerHeight / 2,
};
const planetValues = {
    x: universeValues.x0,
    y: universeValues.y0,
    r: 100,
    w: 6 * 10 ^ 24,
};
const projetilValues = {
    x: (universeValues.x0 - 25),
    y: (universeValues.y0 - 25) - 150,
    r: 25,
    w: 7 * 10 ^ 19,
    speedX: 0,
    speedY: 0,
    velocityX: 0,
    velocityY: 0,
};
const projetis = [];
/////////////// FUNCTIONS //////////////////
function getDistancie(x1, y1, x2, y2) {
    const distancieX = Math.pow(x1 - x2, 2);
    const distancieY = Math.pow(y1 - y2, 2);
    const distancie = Math.sqrt(distancieX + distancieY);
    return distancie;
}
/////////////// EVENTS //////////////////
// window.addEventListener('resize', () => {
//   universeValues.x0 = window.innerWidth / 2;
//   universeValues.y0 = window.innerHeight / 2;
//   planetValues.x = universeValues.x0;
//   planetValues.y = universeValues.y0;
//   projetilValues.x = (universeValues.x0 - 10);
//   projetilValues.y = (universeValues.y0 - 10) - 120;
//   IMPULSE = undefined;
// });
start.addEventListener('click', () => {
    IMPULSE = undefined;
    projetilValues.x = (universeValues.x0 - 25);
    projetilValues.y = (universeValues.y0 - 25) - 150;
    setTimeout(() => {
        IMPULSE = Number(impulse.value);
    }, 500);
});
/////////////// SCREEN //////////////////
if (projetil && planet) {
    projetil.width = `${projetilValues.r + projetilValues.r}px`;
    projetil.height = `${projetilValues.r + projetilValues.r}px`;
    projetil.borderRadius = `${projetilValues.r}px`;
    planet.width = `${planetValues.r + planetValues.r}px`;
    planet.height = `${planetValues.r + planetValues.r}px`;
    planet.borderRadius = `${planetValues.r}px`;
    planet.top = `${planetValues.y}px`;
    planet.left = `${planetValues.x}px`;
}
/////////////// LOOP //////////////////
function loop() {
    if (projetil && IMPULSE) {
        const projetilX = projetilValues.x;
        const projetilY = projetilValues.y;
        let distancie = getDistancie(projetilX, projetilY, planetValues.x, planetValues.y);
        if (distancie < 1) {
            distancie = 1;
        }
        const mM = projetilValues.w * planetValues.w;
        const dd = distancie * distancie;
        const gForce = G * mM / dd;
        const cos = (planetValues.x - projetilValues.x) / distancie;
        const sin = (planetValues.y - projetilValues.y) / distancie;
        const gForceX = gForce * cos;
        const gForceY = gForce * sin;
        projetilValues.speedX = gForceX / projetilValues.w;
        projetilValues.speedY = gForceY / projetilValues.w;
        projetilValues.velocityX += projetilValues.speedX;
        projetilValues.velocityY += projetilValues.speedY;
        projetilValues.x += projetilValues.velocityX + IMPULSE;
        projetilValues.y += projetilValues.velocityY;
        if (getDistancie(projetilX + 25, projetilY + 25, planetValues.x, planetValues.y) < projetilValues.r + planetValues.r) {
            projetilValues.speedX = 0;
            projetilValues.speedY = 0;
            projetilValues.velocityX = 0;
            projetilValues.velocityY = 0;
            projetilValues.x = projetilX;
            projetilValues.y = projetilY;
        }
        projetil.top = `${projetilValues.y}px`;
        projetil.left = `${projetilValues.x}px`;
    }
}
setInterval(() => {
    loop();
}, 5);
