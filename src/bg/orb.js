import * as PIXI from "pixi.js";
import SimplexNoise from "simplex-noise";
import debounce from "debounce";

const simplex = new SimplexNoise();

class Orb {
    constructor(fill = 0x000000) {

        this.bounds = this.setBounds_();

        this.x = random(this.bounds["x"].min, this.bounds["x"].max);
        this.y = random(this.bounds["y"].min, this.bounds["y"].max);

        this.scale = 1;

        this.fill = fill;

        this.radius = random(window.innerHeight / 6, window.innerHeight / 3);

        // starting points in "time" for the noise/self similar random values
        this.xOff = random(0, 1000);
        this.yOff = random(0, 1000);
        // how quickly the noise/self similar random values step through time
        this.inc = 0.002;

        // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
        this.graphics = new PIXI.Graphics();
        this.graphics.alpha = 0.3;

        // 250ms after the last window resize event, recalculate orb positions.
        window.addEventListener(
            "resize",
            debounce(() => {
                this.bounds = this.setBounds_();
            }, 250)
        );

    }

    setBounds_() {
        // how far from the { x, y } origin can each orb move
        const maxDist =
            window.innerWidth < 1000 ? window.innerWidth / 3 : window.innerWidth / 5;
        // the { x, y } origin for each orb (the bottom right of the screen)
        const originX = window.innerWidth / 1.25;
        const originY =
            window.innerWidth < 1000
                ? window.innerHeight
                : window.innerHeight / 1.375;

        // allow each orb to move x distance away from it's { x, y }origin
        return {
            x: {
                min: originX - maxDist,
                max: originX + maxDist
            },
            y: {
                min: originY - maxDist,
                max: originY + maxDist
            }
        };
    }

    update() {
        // self similar "psuedo-random" or noise values at a given point in "time"
        const xNoise = simplex.noise2D(this.xOff, this.xOff);
        const yNoise = simplex.noise2D(this.yOff, this.yOff);
        const scaleNoise = simplex.noise2D(this.xOff, this.yOff);

        // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
        this.x = map(xNoise, -1, 1, this.bounds["x"].min, this.bounds["x"].max);
        this.y = map(yNoise, -1, 1, this.bounds["y"].min, this.bounds["y"].max);
        // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
        this.scale = map(scaleNoise, -1, 1, 0.5, 1);

        // step through "time"
        this.xOff += this.inc;
        this.yOff += this.inc;
    }

    render() {
        // update the PIXI.Graphics position and scale values
        this.graphics.x = this.x;
        this.graphics.y = this.y;
        this.graphics.scale.set(this.scale);
      
        // clear anything currently drawn to graphics
        this.graphics.clear();
      
        // tell graphics to fill any shapes drawn after this with the orb's fill color
        this.graphics.beginFill(this.fill);
        // draw a circle at { 0, 0 } with it's size set by this.radius
        this.graphics.drawCircle(0, 0, this.radius);
        // let graphics know we won't be filling in any more shapes
        this.graphics.endFill();
      }
}

// return a random number within a range
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// map a number from 1 range to another
function map(n, start1, end1, start2, end2) {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

export default Orb;