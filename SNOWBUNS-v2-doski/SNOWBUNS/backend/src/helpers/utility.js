exports.randomNumber = function (length) {
  var text = "";
  var possible = "123456789";
  for (var i = 0; i < length; i++) {
    var sup = Math.floor(Math.random() * possible.length);
    text += possible.charAt(sup);
  }
  return Number(text);
};
