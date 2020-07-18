import { includeHTML, preventIEError, debounce } from './lib';
import p5 from 'p5';


function initializePage() {
  let sketch = function (p) {

    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);

    };

    p.draw = function () {
      p.background(0, 0, 0, 0.75);

      p.stroke(255, 255, 255);
      p.line(0, 0, p.mouseX, p.mouseY);
      p.ellipse(p.mouseX, p.mouseY, 200, 200);
      p.fill(p.mouseX * 0.1, p.mouseY * 0.2, p.mouseY * 0.5);
    };

    window.addEventListener('resize', debounce(function () {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    }, 200))
  };

  let p5Instance = new p5(sketch);
  window.p5Instance = p5Instance;
}


function main() {
  // init
  preventIEError();
  includeHTML(function () {
    initializePage();
  });

  // for api
}

main();


