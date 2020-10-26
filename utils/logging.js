function displayHeadline(str) {
  let headline = "\n";
  headline += "------------------------------    ";
  headline += str.toUpperCase();
  headline += "    ------------------------------";
  headline += "\n";
  
  console.log(headline);
  return headline;
}

function displayResults(result) {
  console.table(result);

}

function displayFooter(headline) {
  const length = headline.length;
  let footer = "-";
  for (let i = 0; i < length; i++) {
    footer += "-";
  }
  footer += "\n";

  console.log(footer);

}

module.exports = {
  displayHeadline,
  displayFooter,
  displayResults,
};
