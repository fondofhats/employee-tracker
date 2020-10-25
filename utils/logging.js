const CFonts = require("cfonts");

function displayHeadline(str) {
  let headline = "\n";
  headline += "------------------------------    ";
  headline += str.toUpperCase();
  headline += "    ------------------------------";
  headline += "\n";
  /*
  CFonts.say(headline, {
    font: "console", // define the font face
    align: "left", // define text alignment
    colors: ["green"], // define all colors
    background: "transparent", // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: "0", // define how many character can be on one line
    gradient: false, // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false, // define if this is a transition between colors directly
    env: "node", // define the environment CFonts is being executed in
  });
  */
  console.log(headline);
  return headline;
}

function displayResults(result) {
  CFonts.say(`${result.toUpperCase()}\n`, {
    font: "console", // define the font face
    align: "left", // define text alignment
    colors: ["green"], // define all colors
    background: "transparent", // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: "0", // define how many character can be on one line
    gradient: false, // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false, // define if this is a transition between colors directly
    env: "node", // define the environment CFonts is being executed in
  });
}

function displayFooter(headline) {
  const length = headline.length;
  let footer = "-";
  for (let i = 0; i < length; i++) {
    footer += "-";
  }
  footer += "\n";

  console.log(footer);
  /* CFonts.say(footer, {
    font: 'console',              // define the font face
    align: 'left',              // define text alignment
    colors: ['green'],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line
    gradient: false,            // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false,  // define if this is a transition between colors directly
    env: 'node'                 // define the environment CFonts is being executed in
    }); */
}

module.exports = {
  displayHeadline,
  displayFooter,
  displayResults,
};
