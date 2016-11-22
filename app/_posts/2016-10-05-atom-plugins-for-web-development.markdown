---
author: martin
comments: true
date: 2016-10-05 20:17:40+00:00
layout: post
link: https://martinjc.com/2016/10/05/atom-plugins-for-web-development/
slug: atom-plugins-for-web-development
title: Atom Plugins for Web Development
tags:
 - coding
 - d3
 - visualisation
 - workshop
---

I’ve had a number of students in my web-dev module asking me what plugins I’m using in my text editor, so I thought I’d dash off a quick blog post on the plugins I find useful day-to-day. (Actually, most people are normally asking me ‘how did you do that thing where you typed one word and suddenly you had a whole HTML page? The answer is I used a plugin, so ‘what plugins do you use?’ is really the question they should be asking…)

I’m using [Atom](https://atom.io/) as my text editor. It’s free, open source, and generally reliable. If you’re a student on my web-dev course you’re stuck using [Sublime Text](https://www.sublimetext.com/) in the lab for now. I’m pretty sure most of the Atom plugins I use have either direct Sublime equivalents, or similarly functioning alternatives.

There’s a guide to Atom packages [here](here) and one for Sublime Text [here](https://www.sublimetext.com/docs/3/packages.html)

A quick google for ‘best atom packages web developer’ will probably get you to a far more comprehensive list than this, but here’s my current pick of useful plugins anyway:

## [emmet](https://atom.io/packages/emmet)

This is essential for anyone writing any amount of HTML. This is the magic package that allows me to write ‘html:5’ in a blank document, hit the shortcut keys (CTRL + E in my setup), and suddenly have a simple boilerplate HTML page.

![emmet auto-completion]({{ site.url }}/img/{{ page.date | date: "%Y-%m-%d"}}-{{page.slug}}/out.gif)

It’s ace. Not only that, but it can write loads of HTML for you, and all you have to do is write a CSS selector for that HTML:

![html css Selector expansion]({{ site.url }}/img/{{ page.date | date: "%Y-%m-%d"}}-{{page.slug}}/out-1.gif)

Great stuff. The documentation is here.

## [atom-beautify](https://atom.io/packages/atom-beautify)

This will tidy up your code automatically, fixing the indentation and spacing etc. It can even be set to automatically tidy your code every time you save a file. Awesome huh? Imagine being set a coursework where some of the marks were dependent on not writing code that looks like it was written by a five-year old child who’s addicted to hitting the tab key, then finding out that there’s software to strap that five-year olds thumbs to his hands so he can’t hit that tab key. Awesome.

![Beautiful tidy code]({{ site.url }}/img/{{ page.date | date: "%Y-%m-%d"}}-{{page.slug}}/out-2.gif)

## [color-picker](https://atom.io/packages/color-picker)

This one adds a colour picker right into atom. Just CMD-SHIFT-C and choose your colours!

![Colour picker]({{ site.url }}/img/{{ page.date | date: "%Y-%m-%d"}}-{{page.slug}}/out-3.gif)

Another useful colour related plugin you may want to look at is Pigments, which can highlight colours in your projects, and gather them all together so you can see your palette.

## [linter](https://atom.io/packages/linter)

My last recommendation is linter. This plugin will automatically check your code for errors. You’ll need to install linters for whatever language you want to check, like linter-tidy, linter-csslint, linter-pylint and linter-jshint.

![Linter finds errors in your code]({{ site.url }}/img/{{ page.date | date: "%Y-%m-%d"}}-{{page.slug}}/Screenshot.png)


So there we go – a few recommendations to get you started. Found anything else interesting? Let me know!
