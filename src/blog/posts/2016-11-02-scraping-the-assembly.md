---
author: martin
comments: true
date: 2016-11-02 20:17:40+00:00
layout: post
link: https://martinjc.com/2016/11/02/scraping-the-assembly/
slug: scraping-the-assembly
title: Scraping the Assembly
tags:
 - coding
 - data
 - development
 - expenses
 - scraping
 - python
 - selenium
---

M’colleague is currently teaching a first-semester module on Data Journalism to the students on our MSc in Computational and Data Journalism. As part of this, they need to do some sort of data project. One of the students is looking at the [expenses of Welsh Assembly Members](http://allowances.assembly.wales/Default.aspx?Option=switch). These are all freely available online, but not in an easy to manipulate form. According to the Assembly they’d be happy to give the data out as a spreadsheet, if we submitted an FOI.

To me, this seems quite stupid. The information is all online and freely accessible. You’ve admitted you’re willing to give it out to anyone who submits an FOI. So why not just make the raw data available to download? This does not sound like a helpful [Open Government](http://www.opengovernment.org.uk/about/) to me. Anyway, for whatever reason, they’ve chosen not to, and we can’t be bothered to wait around for an FOI to come back. It’s much quicker and easier to build a scraper! We’ll just use selenium to drive a web browser, submit a search, page through all the results collecting the details, then dump it all out to csv. Simple.

{% insertBlogImage "img/2016-11-02-scraping-the-assembly/out.gif" "Scraping AM expenses" %}

I built this as a quick hack this morning. It took about an hour or so, and it shows. The code is not robust in any way, but it works. You can ask it for data from any year (or a number of years) and it’ll happily sit there churning its way through the results and spitting them out as both .csv and .json.

All the code is [available on Github](https://github.com/martinjc/assembly-expenses-scraper) and it’s under an MIT Licence. Have fun 😉
