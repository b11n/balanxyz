import * as PIXI from "pixi.js";
import { KawaseBlurFilter } from "@pixi/filter-kawase-blur";
import Orb from './orb';
import ColorPalette from './color';

const colorPalette = new ColorPalette();

class BackgroundManager {
    constructor() {
        // Create PixiJS app
        const app = new PIXI.Application({
            view: document.querySelector(".orb-canvas"),
            resizeTo: window,
            transparent: true
        });
        app.stage.filters = [new KawaseBlurFilter(30, 10, true)];


        // Create orbs
        const orbs = [];

        for (let i = 0; i < 10; i++) {
            // each orb will be black, just for now
            const orb = new Orb(colorPalette.randomColor());

            app.stage.addChild(orb.graphics);

            orbs.push(orb);
        }

        // Animate!
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            app.ticker.add(() => {
                // update and render each orb, each frame. app.ticker attempts to run at 60fps
                orbs.forEach((orb) => {
                    orb.update();
                    orb.render();
                });
            });
        } else {
            // perform one update and render per orb, do not animate
            orbs.forEach((orb) => {
                orb.update();
                orb.render();
            });
        }
    }
}


export default BackgroundManager;