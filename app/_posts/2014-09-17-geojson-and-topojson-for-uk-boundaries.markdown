---
author: martin
comments: true
date: 2014-09-17 10:05:37+00:00
layout: post
link: https://martinjc.com/2014/09/17/geojson-and-topojson-for-uk-boundaries/
slug: geojson-and-topojson-for-uk-boundaries
title: GeoJSON and topoJSON for UK boundaries
tags:
- coding
- data
- geo
- geojson
- opendata
- places
- topojson
- visualisation
---

I've just put an archive online containing GeoJSON and topoJSON for UK boundary data. It's all stored on [Github](https://github.com/martinjc/UK-GeoJSON), with a viewer and download site hosted on [Github pages](http://martinjc.github.io/UK-GeoJSON/).

![Browser for the UK topoJSON stored in the Github repository]({{ site.url }}/img/{{ page.date | date: "%Y-%m-%d"}}-{{page.slug}}/Screenshot-2014-09-16-11.08.37-1008x1024.png)

The data is all created from shapefiles released by the Office of National Statistics, Ordnance Survey and National Records Scotland, all under the [Open Government](http://www.nationalarchives.gov.uk/doc/open-government-licence/) and [OS OpenData](http://www.ordnancesurvey.co.uk/docs/licences/os-opendata-licence.pdf) licences.

In later posts I'll detail how I created the files, and how to use them to create interactive choropleth maps.
