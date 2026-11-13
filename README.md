# dhaka-ndvi-timeseries
Sentinel-2 based vegetation monitoring in Dhaka, Bangladesh (2019–2025)
![Annual NDVI maps](outputs/ndvi_maps_2019_2025.png)

## Overview
This project examines vegetation dynamics in Dhaka, Bangladesh, using
Sentinel-2 imagery (10 m resolution) and Google Earth Engine, covering 2019–2025.

## Objectives
- Generate annual NDVI maps
- Assess spatial vegetation distribution
- Identify vegetation change over time
- Analyze annual NDVI trends

## Data
- Sentinel-2 Level-2A Surface Reflectance
- Source: Google Earth Engine Data Catalog
- Study area: Dhaka [specify boundary]

## Methodology
1. Study area selection
2. Satellite data acquisition
3. Cloud and shadow masking
4. NDVI calculation: `NDVI = (B8 − B4) / (B8 + B4)`
5. Annual median compositing
6. Time-series analysis
7. Map visualization

## Key Findings
- [Add 2-3 main results here]

## Outputs
- Annual NDVI maps
- Vegetation trend chart
- Spatial vegetation assessment

## Repository Structure
├── gee/        # Google Earth Engine script
├── outputs/    # Maps and charts
└── README.md

## Usage
1. Open the script in the Google Earth Engine Code Editor
2. Define or import the Dhaka boundary
3. Run to generate annual composites and NDVI maps

## Limitations
Monsoon cloud cover may reduce usable observations in some years.

## Tools
Google Earth Engine (JavaScript), QGIS

## Author
**Md. Raisul Islam**
Geography and Environment | GIS and Remote Sensing
