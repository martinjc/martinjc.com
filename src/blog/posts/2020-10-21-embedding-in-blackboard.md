---
author: martin
comments: true
date: 2020-10-21
layout: post
tags: post
slug: embedding-in-blackboard
title: Embedding an external website in Blackboard
---

Imagine that [you've written a set of course notes using your favourite static site generator]({{ '/blog/posts/2020-10-19-course-notes-with-eleventy/' | url }}), and that you're using a modern development process to automatically check, compile, and publish that site to the web. Wouldn't it be great if that automatic build process could also automatically update the course notes in your University's VLE?

It sure would!

But it can't. At least, not if you're using Blackboard, like us. Or at least, not if you're using Blackboard in the way we're using it.

But wait! All is not lost. If we're using our super duper modern dev process to deploy to a securely hosted website, we can simply embed that site inside our VLE! That way any updates we push to the course notes will automatically be reflected in the VLE pages for our module. Our students can access the notes either through the VLE or by visiting the external site itself, and everyone wins!

## Embedding in Blackboard

Embedding an external website in Blackboard is actually surprisingly easy. First, we need to find the place in our module where we want to put the notes, click 'Build Content' and then 'Item' under the 'Create' section:

{% insertImage "img/2020-10-21-embedding-in-blackboard/new_item.png" "" "" url %}

Then we want to click the 'HTML' button on the content editor:

![create a content item]({{ "/img/2020-10-21-embedding-in-blackboard/html.png" | url }})

In the HTML editor that opens we'll want to add an `<iframe>` that embeds our notes pages. We can set the width to 100% to make the most of the space, and set the height to whatever you think makes sense. Remember that people need to be able to see content to read it, so I'd advise something bigger than 0px.

![create a content item]({{ "/img/2020-10-21-embedding-in-blackboard/html_editor.png" | url }})

Update your content, submit the new content item (yes, you're not imagining things, that really was two clicks to accept your changes where one would have done ...) and voila! One website embedded in your VLE. Students can easily find your notes, and you can easily keep them up to date using a super smooth and simple build process, rather than whatever editor and process your VLE demands of you:

![create a content item]({{ "/img/2020-10-21-embedding-in-blackboard/embedded.png" | url }})
