# Can women compete with men in running?

This repository contains all components and other things related to my group project for the [G0R04A](https://onderwijsaanbod.kuleuven.be/2020/syllabi/e/G0R04AE.htm) course ("Data Visualisation"). The group project focuses on whether it might be possible for men and women to compete in the same running competitions. The goal is not to provide a definitive solution to the issue of men and women competing in the same sport, but rather to make the end user reflect on the problem itself. The entire implementation of these visualisations was carried out by me.

The website consists of three parts:
1.  An **introduction** part, where we explain that men and women's running habits are actually very comparable.
2.  An **analysis** part, where we show that there is still a performance gap between men and women, and we try to explain where this gap comes from
3.  An **explorative** part, where we provide two methods to shorten the gap between men and women

The visualisations are mostly made using [d3.js](https://d3js.org/). Most of them are based on examples from the [d3 graph gallery](https://d3-graph-gallery.com/), but they are definitely 'supercharged' to fit the project. Some highlights:

https://user-images.githubusercontent.com/84721952/168669060-21ccf2e8-6ed0-4ab3-b81a-f8c6a45bece9.mp4

https://user-images.githubusercontent.com/84721952/168669110-3137491f-96d2-403d-9107-6ff13a61f8f1.mp4

Maps are based on the [Leaflet library](https://leafletjs.com/). They simulate runs in real time.

https://user-images.githubusercontent.com/84721952/168669143-983fb459-68b2-4e98-b500-eae6bda77c77.mp4

Other visualisations are made with standard DOM elements.

https://user-images.githubusercontent.com/84721952/168669177-104b73f5-1adc-4d2b-85c4-64be8249dd17.mp4

https://user-images.githubusercontent.com/84721952/168669203-45c726c1-83b9-4933-9b6e-aa9a12393d8a.mp4

Since group projects always evolve into "agile" development, this project is no different. I tried my best to keep everything clean, but unfortunately last-minute work is not the prettiest. Also, not all classes are still in use.

Unfortunately, since the visualisations are based on Strava data (which is *technically* private data), I am unable to include the dataset in this repository. If you would like to build on this project, you will have to bring your own data, or send me an e-mail. My apologies.