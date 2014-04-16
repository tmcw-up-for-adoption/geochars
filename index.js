var polyline = require('polyline'),
    normalize = require('geojson-normalize');

module.exports.encode = function(gj) {
    var fc = normalize(gj),
        output = '';
    return fc.features
        .filter(function(feature) {
            return feature.geometry;
        })
        .map(function(feature) {
            return encodeCoords(feature.geometry.coordinates) + '|' +
                encodeProperties(feature.properties);
        })
        .join('|');
};

module.exports.decode = function(buf) {
    var parts = buf.split('|');
    if (parts.length % 2 !== 0) return null;
    var fs = {
        type: 'FeatureCollection',
        features: []
    };
    for (var i = 0; i < parts.length; i += 2) {
        var geom = polyline.decode(parts[i]);
        var props = parseProps(parts[i + 1]);
        var geometry;
        if (geom.length === 1) {
            geometry = {
                type: 'Point',
                coordinates: geom[0]
            };
        } else {
            geometry = {
                type: 'LineString',
                coordinates: geom
            };
        }
        fs.features.push({
            type: 'Feature',
            geometry: geometry,
            properties: props
        });
    }
    return fs;
};

function parseProps(str) {
    var parts = str.split(';');
    return parts.reduce(function(mem, part) {
        var kv = part.split(':');
        mem[kv[0]] = kv[1];
        return mem;
    }, {});
}

var styleTokens = [
    'marker-size', 'marker-symbol', 'marker-color',
    'stroke', 'stroke-opacity', 'stroke-width',
    'fill', 'fill-opacity'].reduce(function(mem, o) {
        mem[o] = true;
        return mem;
    }, {});

function encodeProperties(props) {
    var out = [];
    for (var k in props) {
        if (styleTokens[k]) {
            out.push(k + ':' + props[k].replace('#', ''));
        }
    }
    return out.join(';');
}

function encodeCoords(coords) {
    switch (depth(coords)) {
        case 1:
            return polyline.encode([coords]);
        case 2:
            return polyline.encode(coords);
        default:
            return null;
    }
}

function depth(array) {
    if (typeof array[0] === 'object') {
        if (typeof array[0][0] === 'object') {
            return 3;
        } else {
            return 2;
        }
    } else {
        return 1;
    }
}
