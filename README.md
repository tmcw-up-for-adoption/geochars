# geochars

Compact GeoJSON encoding for URLs

```js
{ "type": "FeatureCollection",
    "features": [
 { "type": "Feature",
   "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
   "properties": {
       "marker-symbol": "bus"
   }
   },
 { "type": "Feature",
   "geometry": {
     "type": "LineString",
     "coordinates": [
       [102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]
       ]
     },
   "properties": {}
   }
  ]
}
```

As geochar:

```
_{pmR_t`B|marker-symbol:bus|_{pmR?_ibE_ibE_ibE~hbE_ibE_ibE|
```

## How

* Geometries are encoded as [encoded polylines](https://developers.google.com/maps/documentation/utilities/polylinealgorithm), of simple
  coordinates. Coordinates of `length=2` are points.
* Properties encoded without types
