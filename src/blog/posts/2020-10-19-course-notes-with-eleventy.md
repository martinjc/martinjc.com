---
author: martin
comments: true
date: 2020-10-19
layout: post
tags: post
draft: true
slug: course-notes-with-eleventy
title: Using eleventy to create a short-course website in Markdown
---

I'm re-writing some course notes, as I usually do at this time of year, and I'm trying to separate things up into small reusable chunks, so that rather than building a comprehensive set of notes/videos/resources for an entire module, I create a range of small short-course type resources on different topics that can be built up for my module, or re-used by other people.

Previously, I've created websites for each of my modules by using a static site generator. This year, having [fallen out of love with Hugo](/blog/posts/2020-08-16-eleventy) I thought I'd see about using [11ty.js](https://www.11ty.dev/) for this.

There's some notable drawbacks in abandoning Hugo for 11ty as far as the 'quickly get a set of course notes up and running' goes. Chief among these is that as a 'young-ish' technology, 11ty is still maturing in the 'themes' department. Whereas there's a rich set of templates and themes for creating academic/instructional courses using tools like Hugo or Jekyll, there's not that much out there for 11ty, so rather than adapt an existing example (which tend to be more for portfolio sites or blogs) I figured I'd take this from scratch.

The approach I've taken looks a little something like this. This is still a Work in Progress, so I expect some of this will change as the semester goes on, but as a starting point I'm pretty happy with where I am.

## Contents

The contents of the notes are written in markdown. Nothing complicated here, just regular markdown. I don't tend to do anything too fancy as far as mathematics or diagrams are concerned, so a fairly basic set of markdown notes, arranged into sections based on topic in a notes folder, with a top-level index and an about page:

{% insertBlogImage "img/2020-10-19-course-notes-with-eleventy/file-structure.png", "File structure of the notes markdown files" %}

See those json files? We'll come back to the `variables.11tydata.json` in the future but the `notes.json` is a shortcut file, all it has in it is:

```json
{
    "tags": "notes"
}
```

This means that anything in the 'notes' folder will be tagged with `notes`. 11ty automatically builds collections based on tags, so by tagging everything in the folder with 'notes' we automatically get a collection of those pages we can use later.

For a set of course notes or documentation there's two things I like to have:

* a navigation menu that leads to each of the pages and allows us to view the overall structure
* a way to step through the pages in order one after the other

### Sidebar navigation

I'm using nunjucks templates for the page layouts here. Part of the notes page template looks like this:

```html
---
layout: base.njk
---

...

    <nav class="sidebar">
        <a href='{{ "/" | url }}'>Home</a>
        <ul>
            {{ "{%- for note in collections.notes | sortByPageOrder -%}" | escape }}
                <li><a href="{{ note.url | url }}">{{ note.data.title }}</a></li>
            {{ "{%- endfor -%}" | escape }}
        </ul>
        <a href="{{ '/about/' | url }}">About</a>
    </nav>

...

```

Here we loop through our collection of notes to add a link for each page to the navigation. 11ty automatically orders collections by date. This doesn't suit our purposes as we want to order the pages by topic so that readers can follow the notes in the correct order. So, we add an order data item to the .yaml data for each page:

```yaml
---
layout: page
order: 6
title: Iteration
---
```

We write a function in our 11ty config that will sort pages by this order variable, and add it as a filter, referenced in the template above:

```js
function sortByPageOrder(values) {
    return values.slice().sort((a, b) => Math.sign(a.data.order - b.data.order))
}
eleventyConfig.addFilter("sortByPageOrder", sortByPageOrder);
```

Now we can determine the page order and the pages will be listed in our navigation in the order we specify. 

### Stepping through pages

11ty has a nice pagination feature for collectons that means once we have a collection that's ordered, we can easily find out what page is next in the collection. We can use this in our notes page template to add stepping links backwards and forwards through our pages just below the page contents:

```html
<div class="content">
    {{ "{{ content | safe }}" | escape }}
    <div class="nextprev">
    {{ "{%- set nextPost = collections.notes | sortByPageOrder | getNextCollectionItem(page) %}" | escape }}
    {{ "{%- if nextPost %}" | escape }}<p class="next">Next: <a href="{{ nextPost.url | url }}">{{ nextPost.data.title }}</a></p>{{ "{% endif %}" | escape }}
    {{ "{%- set previousPost = collections.notes | sortByPageOrder | getPreviousCollectionItem(page) %}" | escape }}
    {{ "{%- if previousPost %}" | escape }}<p class="previous">Previous: <a href="{{ previousPost.url | url }}">{{ previousPost.data.title }}</a></p>{{ "{% endif %}" | escape }}
</div>
```

Putting this all together with a (pretty much) default 11ty setup and a little CSS to lay things out nicely we end up with a nice documentation/course notes site that has navigation between each topic, all built from markdown.

{% insertBlogImage "img/2020-10-19-course-notes-with-eleventy/website.png", "Notes website screenshot" %}

The [full code for the site is on github](https://github.com/martinjc/programming-intro), and in the next post I'll talk about some of the other features I've added to the site.


