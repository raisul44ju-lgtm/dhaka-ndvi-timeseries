// ============================================================
// Dhaka NDVI Time-Series Analysis (2019-2025)
// Sentinel-2 Level-2A Surface Reflectance | Google Earth Engine
// Author: Md. Raisul Islam
// ============================================================

// 1. STUDY AREA ------------------------------------------------
// Dhaka district boundary from FAO GAUL. If the name below does
// not return a result, draw your own polygon with the geometry
// tool and replace `aoi` with it.
var aoi = ee.FeatureCollection('FAO/GAUL/2015/level2')
  .filter(ee.Filter.eq('ADM1_NAME', 'Dhaka'))
  .filter(ee.Filter.eq('ADM2_NAME', 'Dhaka'))
  .geometry();

Map.centerObject(aoi, 10);
Map.addLayer(aoi, {color: 'red'}, 'Study area', false);

// 2. PARAMETERS ------------------------------------------------
var startYear = 2019;
var endYear = 2025;
var cloudThreshold = 20;   // max cloudy pixel percentage per scene

// 3. CLOUD AND SHADOW MASK (Scene Classification Layer) --------
function maskS2(image) {
  var scl = image.select('SCL');
  var mask = scl.neq(3)    // cloud shadow
    .and(scl.neq(8))       // cloud medium probability
    .and(scl.neq(9))       // cloud high probability
    .and(scl.neq(10))      // thin cirrus
    .and(scl.neq(11));     // snow/ice
  return image.updateMask(mask).divide(10000)
    .copyProperties(image, ['system:time_start']);
}

// 4. NDVI = (B8 - B4) / (B8 + B4) ------------------------------
function addNDVI(image) {
  return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
}

// 5. ANNUAL MEDIAN COMPOSITES ----------------------------------
var years = ee.List.sequence(startYear, endYear);

var annualNDVI = ee.ImageCollection.fromImages(
  years.map(function (y) {
    y = ee.Number(y);
    var composite = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
      .filterBounds(aoi)
      .filterDate(ee.Date.fromYMD(y, 1, 1), ee.Date.fromYMD(y, 12, 31))
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', cloudThreshold))
      .map(maskS2)
      .map(addNDVI)
      .select('NDVI')
      .median()
      .clip(aoi);
    return composite
      .set('year', y)
      .set('system:time_start', ee.Date.fromYMD(y, 1, 1).millis());
  })
);

// 6. VISUALIZATION ---------------------------------------------
var ndviVis = {
  min: 0, max: 0.8,
  palette: ['#d73027', '#fc8d59', '#fee08b', '#d9ef8b', '#91cf60', '#1a9850']
};

for (var y = startYear; y <= endYear; y++) {
  var img = annualNDVI.filter(ee.Filter.eq('year', y)).first();
  Map.addLayer(img, ndviVis, 'NDVI ' + y, y === endYear);
}

// 7. TIME-SERIES CHART (mean NDVI per year) --------------------
var chart = ui.Chart.image.series({
  imageCollection: annualNDVI,
  region: aoi,
  reducer: ee.Reducer.mean(),
  scale: 100,
  xProperty: 'system:time_start'
}).setOptions({
  title: 'Mean annual NDVI, Dhaka (2019-2025)',
  hAxis: {title: 'Year'},
  vAxis: {title: 'Mean NDVI'},
  lineWidth: 2,
  pointSize: 5,
  legend: {position: 'none'}
});
print(chart);

// 8. CHANGE MAP (last year minus first year) -------------------
var first = annualNDVI.filter(ee.Filter.eq('year', startYear)).first();
var last = annualNDVI.filter(ee.Filter.eq('year', endYear)).first();
var change = last.subtract(first).rename('NDVI_change');

Map.addLayer(change, {
  min: -0.4, max: 0.4,
  palette: ['#b2182b', '#ef8a62', '#f7f7f7', '#67a9cf', '#2166ac']
}, 'NDVI change ' + startYear + '-' + endYear, false);

// 9. EXPORT ANNUAL MAPS TO GOOGLE DRIVE ------------------------
for (var yr = startYear; yr <= endYear; yr++) {
  Export.image.toDrive({
    image: annualNDVI.filter(ee.Filter.eq('year', yr)).first(),
    description: 'Dhaka_NDVI_' + yr,
    folder: 'dhaka_ndvi',
    region: aoi,
    scale: 10,
    maxPixels: 1e10
  });
}
