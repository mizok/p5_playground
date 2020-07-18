import { includeHTML, preventIEError, debounce } from './lib';
import p5 from 'p5';


function initializePage() {
  let conf = {};
  let ballGroupRef = {};
  let randomColor = function () {
    var color = 'rgb(' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ',' + parseInt(Math.random() * 255) + ')'
    return color;
  }
  let sketch = function (p) {

    p.setup = function () {
      p.createCanvas(p.windowWidth, p.windowHeight);
      p.background(0);

      conf.gravity = 0.098;
      conf.repulsiveX = 0.1;
      conf.timeOut = 200;
      conf.maxSize = 100;
      conf.maxSpeedX = 10;
      conf.maxSpeedY = 10;

      ballGroupRef = {
        ballArray: [],
        genBall: function (x, y, radius, bgColor, timer) {
          var ball = {
            x: x,
            y: y,
            radius: radius,
            bgColor: bgColor,
            speedX: Math.random() * conf.maxSpeedX,
            speedY: Math.random() * conf.maxSpeedY,
            timer: timer
          }

          if (this.ballArray.length > 300) {
            var overflow = confirm('住手！！～～～～再丟球視窗就要爆炸啦~~~~~')
            if (overflow) {
              var overflowConfrim = confirm('再不清空就～要～爆～啦～～～～準備清空啦');
              if (overflowConfrim) {
                p.mouseIsPressed = false;
                this.ballArray = [];
              }
            }
          }
          else {
            this.ballArray.push(ball);
          }

        },
        defaultGen: function () {
          var num = 20;
          for (let i = 0; i < num; i++) {
            this.genBall(Math.random() * p.windowWidth, Math.random() * p.windowHeight, Math.random() * conf.maxSize, randomColor(), conf.timeOut)
          }
        },

      };

    };

    p.draw = function () {
      p.background(0, 90);
      p.noStroke();


      if (p.mouseIsPressed) {
        ballGroupRef.genBall(p.mouseX, p.mouseY, Math.random() * conf.maxSize, randomColor(), 0);


      }
      for (let i = 0; i < ballGroupRef.ballArray.length; i++) {

        //change balls speed at next frame;


        if (ballGroupRef.ballArray[i].timer > conf.timeOut) {
          ballGroupRef.ballArray[i].speedX -= conf.repulsiveX;
          ballGroupRef.ballArray[i].speedY += conf.gravity;


          //change balls position at next frame;
          if (ballGroupRef.ballArray[i].x > p.windowWidth || ballGroupRef.ballArray[i].x < 0) {
            ballGroupRef.ballArray[i].speedX = - ballGroupRef.ballArray[i].speedX;
          }


          if (ballGroupRef.ballArray[i].y > p.windowHeight || ballGroupRef.ballArray[i].y < 0) {
            ballGroupRef.ballArray[i].speedY = - ballGroupRef.ballArray[i].speedY;
          }


          ballGroupRef.ballArray[i].x += ballGroupRef.ballArray[i].speedX;
          ballGroupRef.ballArray[i].y += ballGroupRef.ballArray[i].speedY;

        }
        else {
          ballGroupRef.ballArray[i].timer += 3;
        }




        //draw ball
        if (ballGroupRef.ballArray.length) {
          p.fill(ballGroupRef.ballArray[i].bgColor);
          p.ellipse(ballGroupRef.ballArray[i].x, ballGroupRef.ballArray[i].y, ballGroupRef.ballArray[i].radius, ballGroupRef.ballArray[i].radius);


        }

      }
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









