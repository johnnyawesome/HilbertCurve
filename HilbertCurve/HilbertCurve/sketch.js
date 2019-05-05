/// <reference path="../TSDef/p5.global-mode.d.ts" />

//The Axiom-Array, "A"
let hilbertCurve = "A".split("");
const initialSegmentLength = 300;
let segmentLength = initialSegmentLength;
let minimalSegmentLength = 5;
let theta = 90;

function setup() {
  createCanvas(650, 650, P2D);
  background(0);
  stroke(0, 255, 0);
  strokeWeight(3);
  angleMode(DEGREES);
}

let createCurve = setInterval(() => {

  if (segmentLength > minimalSegmentLength) {
    background(0);
    calculateHilbertCurve();
    drawHilbertCurve(segmentLength);
  }
  else {
    segmentLength = initialSegmentLength;
    hilbertCurve = "A".split("");
  }
}, 2000);

function calculateHilbertCurve() {

  //Create a temporary curve to do all the calculations
  let hilbertCurveTemp = [];

  //We step through each element of the array
  //and apply the rules to it
  hilbertCurve.forEach(function (element) {

    //If we hit a "A"....
    if (element === "A") {
      //...we create a temporary array, and it's elements are
      //the characters returned by the string.split operation
      let tempRuleArray = "-BF+AFA+FB-".split("");
      tempRuleArray.forEach(function (element1) {
        //Then we append the contents of tempRuleArray to hilbertCurveTemp
        hilbertCurveTemp.push(element1);
      });
    }
    //If we hit a "B"....
    else if (element === "B") {
      //...we create a temporary array, and it's elements are
      //the characters returned by the string.split operation
      let tempRuleArray = "+AF-BFB-FA+".split("");
      tempRuleArray.forEach(function (element1) {
        //Then we append the contents of tempRuleArray to hilbertCurveTemp
        hilbertCurveTemp.push(element1);
      });
    }
    //If the currently checked element is not "A" and not "B" we just append it
    else if (element !== "A" && element !== "B") hilbertCurveTemp.push(element);

    hilbertCurve = hilbertCurveTemp.slice(0);
    console.log(hilbertCurve);
  });
}

function drawHilbertCurve(length) {

  translate(35, height - 30);

  if (length > minimalSegmentLength) {

    push();

    //Draws the actual curve
    for (let i = 0; i < hilbertCurve.length; i++) {
      const element = hilbertCurve[i];

      if (element === "F") {
        line(0, 0, length, 0);
        translate(length, 0);
      }
      //-theta = turn left, theta = turn right
      else if (element === "+") {
        rotate(theta);
      }
      else if (element === "-") {
        rotate(-theta);
      }
    }
    pop();
  }
  segmentLength *= 0.5;
}

function draw() {
}