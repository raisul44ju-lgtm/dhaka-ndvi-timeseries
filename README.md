# Dhaka NDVI Time-Series Analysis (2019–2025)

Sentinel-2 based vegetation monitoring in Dhaka, Bangladesh using Google Earth Engine.

## Overview
This project examines vegetation dynamics in Dhaka, Bangladesh, using Sentinel-2 imagery (10 m resolution) and Google Earth Engine for the period 2019–2025.

## Objectives
- Generate annual NDVI maps
- Assess spatial vegetation distribution
- Identify vegetation change over time
- Analyze annual NDVI trends

## Data
- **Satellite data:** Sentinel-2 Level-2A Surface Reflectance (`COPERNICUS/S2_SR_HARMONIZED`)
- **Platform:** Google Earth Engine Data Catalog
- **Study area:** Dhaka, Bangladesh
- **Spatial resolution:** 10 m
- **Study period:** 2019–2025

## Methodology
1. Study area selection
2. Satellite data acquisition
3. Cloud and shadow masking (Scene Classification Layer)
4. NDVI calculation: `NDVI = (B8 − B4) / (B8 + B4)`
5. Annual median compositing
6. Time-series analysis
7. Map visualization

## Outputs
- Annual NDVI maps
- Vegetation trend chart
- Spatial vegetation assessment

## Repository Structure
```
├── gee/
│   └── ndvi_timeseries.js   # Google Earth Engine script
├── outputs/                 # Maps and charts
└── README.md
```

## Usage
1. Open the [Google Earth Engine Code Editor](https://code.earthengine.google.com/)
2. Create a new script and paste the contents of `gee/ndvi_timeseries.js`
3. Click **Run** to view the annual NDVI layers and the trend chart
4. Use the **Tasks** tab to export the maps

## Limitations
Monsoon cloud cover in Bangladesh may reduce the number of usable observations in some years, which can affect annual composites.

## Tools
- Google Earth Engine (JavaScript)
- QGIS

## Author
**Md. Raisul Islam**
Geography and Environment | GIS and Remote Sensing
Jahangirnagar University, Bangladesh

## License
This project is licensed under the MIT License.
