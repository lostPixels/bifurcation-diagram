import Random from './ab-random';

let PRODUCTION = process.env.NODE_ENV === 'production';

window.setup = () => {

    if (tokenData.hash) {
        const R = new Random();
        let randomSeedValue = R.random_dec() * 100000000000000000;
        randomSeed(randomSeedValue);
        noiseSeed(randomSeedValue);
    }

    if (!PRODUCTION) {
        console.log(`Random Seed: ${tokenData.hash}`);
    }

    createCanvas(1700, 1100, SVG);
}

window.draw = () => {
    background(255)

    let rMin = 2
    let rMax = 4;
    let numPoints = 50

    let ar = [];
    let xSteps = 500;
    for (let i = 0; i < xSteps; i += 1) {
        let r = map(i, 0, xSteps, rMin, rMax);
        let x = 0.5;
        ar[i] = []
        for (let j = 0; j < numPoints; j++) {
            x = r * x * (1 - x);

            let y = map(x, 0, 1, height, 0);
            //ar[i][j] = { x: i, y };
            if (j > numPoints / 2) {
                ar[i][j] = { x: i, y };
            }
        }
    }

    noFill();
    stroke(0, 0, 0)
    strokeWeight(1);

    for (let j = 0; j < numPoints; j++) {
        beginShape()
        let opened = true;
        for (let i = 0; i < xSteps; i++) {

            let p = ar[i][j];
            let x = map(i, 0, xSteps, 0, width);
            let drawn = false;

            if (p) {
                const distance = notCloseToOthers(p.y, j, ar[i], 2);
                if (distance || !drawn) {
                    drawn = true;
                    if (!opened) {
                        beginShape();
                        opened = true;
                    }
                    vertex(x, p.y);
                }
                else {
                    endShape();
                    opened = false;
                }
            }
        }
        endShape();
    }

    // for (let i = 0; i < ar.length; i++) {
    //     let x = map(i, 0, ar.length, 0, width);
    //     strokeWeight(.5)
    //     noFill();
    //     beginShape();
    //     for (let j = 0; j < ar[i].length; j++) {
    //         let p = ar[i][j];
    //         stroke(0);
    //         //point(i, p.y);
    //         //console.log(p.x, p.y)
    //         vertex(x, p.y);
    //         //point(x, p.y)
    //     }
    //     endShape();
    // }


    noLoop();



    // Start doing cool stuff here 8^)
}

const notCloseToOthers = (y, yI, ar, minDist) => {
    for (let i = 0; i < ar.length; i++) {
        let p2 = ar[i];
        if (p2 && i !== yI) {
            let d = Math.abs(p2.y - y);
            if (d < minDist) {
                console.log('too close!')
                return false;
            }
        }
    }
    return true;
}