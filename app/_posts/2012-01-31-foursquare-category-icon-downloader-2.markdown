---
author: martin
comments: true
date: 2012-01-31 08:50:10+00:00
layout: post
link: https://martinjc.com/2012/01/31/foursquare-category-icon-downloader-2/
slug: foursquare-category-icon-downloader-2
title: Foursquare Category Icon Downloader (2)
tags:
- coding
- development
- foursquare
- python
---

**UPDATE [01 August 2014]: Even more breaking! More recent version of the script [here]({{ site.url }}/2014/08/01/foursquare-icon-downloading-yet-again/)**

Someone commented recently that the [script I'd written to download the Foursquare category icons]({{ site.url }}/2011/10/01/colourful-foursquare-category-icons/) was broken. [downloader.py]({{ site.url }}/img/{{ page.date | date: "%Y-%m-%d"}}-{{page.slug}}/downloader.py_1.txt) is an update that works as of today (notice the URL param with today's date) that will fetch all available sizes of all the category icons and store them in folders by size.
