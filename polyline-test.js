var polyline = require('polyline');

function generate(length) {
    var coords = [];
    var loc = [0, 0];
    for (var i = 0; i < length; i++) {
        coords.push([loc[0], loc[1]]);
        loc[0] += 3 * (Math.random() - 0.5);
        loc[1] += 3 * (Math.random() - 0.5);
    }
    return coords;
}

function pairEnc(coords) {
    return coords.map(function(c) {
        return c.join(',');
    }).join('|');
}

var encodedLength = 0,
    pairLength = 0,
    rawLength = 0;

for (var i = 0; i < 1000; i++) {
    var coords = generate(i);
    encodedLength += encodeURIComponent(polyline.encode(coords)).length;
    rawLength += encodeURIComponent(JSON.stringify(coords)).length;
    pairLength += encodeURIComponent(pairEnc(coords)).length;
}

console.log('encoded length: ' + encodedLength);
console.log('raw length: ' + rawLength);
console.log('pair length: ' + pairLength);
console.log('ratio enc/raw: ' + encodedLength / rawLength);
console.log('ratio pair/raw: ' + pairLength / rawLength);
