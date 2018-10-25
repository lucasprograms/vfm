# Vetro Fiber Map Extravaganza

## Setup
I used create-react-app to bootstrap this project to have easy webpack setup, and a straightforward way to deploy. I also thought it would be helpful for componetizing my code, and it was to some extent. However, the map component ended up being more difficult to componetize than I initially expected.

## First Steps
Unfamiliar with Leaflet, I began by exploring the basics of the documentatio, and setting up a basic map. Additionally, I set up a mapbox account for the tiles (the service recommended by leaflet). After converting the provided shapefiles to geojson, I set about adding them to the map. For the cables, this was quite straightforward, but the so called lit buildings proved to be more challenging. A small challenge for the fibers was determinging the total amount of providers (so that the vectors could be color-coded). I accomplished this with the following code:
``` console.log([...new Set(fiberCables.features.map(cable => cable.properties.OWNER))]) ```

## Rendering Lit Buildings
This was the most challenging aspect of the project. Immediately rendering the thousands of data points to the map created both an unwieldy UI, and an app that was prone to crashing. Failure! Misery! I turned to Stack Overflow for advice, and was led to the Marker Cluster library. By grouping the markers into clusters, I was able to drastically improve performance, while still delivering on the requirements of the app. I also looked into scale dependency, but since I had already impleneted the cluster solution at that time, I stuck with clusters. I think the final decision in a production app would come down to how users were most likely to use the product.

## Last Steps
I added a few small components, the Key and the Header, to make the app feel more complete. I added in leaflet popups using the `onEachFeature` method. This was another instance where leaflet didn't play particularly nicely with React. I would've loved to make the popups react components, but instead it seemed the only way to go about it was using html strings.

## Next Steps
If this project continued to grow, there are a few steps I would take to improve its fundamentals. To begin with, I would add a CSS preprocessor. For this MVP, there was not a lot of custom CSS, so I was happy using vanilla CSS. I think that an exploration of react-leaflet could provide dividends as well.

