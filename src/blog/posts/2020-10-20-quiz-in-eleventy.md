---
author: martin
comments: true
date: 2020-10-20
layout: post
tags: post
draft: true
slug: quiz-in-eleventy
title: Adding basic quiz questions in Eleventy
---

So, lets say that hypothetically you have [written a set of course notes in an 11ty site]({{ 'posts/2020-10-19-course-notes-with-eleventy/' | url }}) and you want to add some quizzing to the pages so that students can quickly check their grasp of the material they've just read. How would you do that? Here's a possible solution...

![quiz screenrecording]({{ "/img/2020-10-20-quiz-in-eleventy/quiz.gif" | url }})

## Data files

The first issue - where can we store our questions that we'd like to quiz readers with? Eleventy templates can [pull in data from all sorts of places](https://www.11ty.dev/docs/data-cascade/). One such place is any `*.11tydata.json` file that has the same name as one of your markdown files. So, if we have a file `variables.md` , we can store some questions as json in `variables.11tydata.json`, and this data will be made available inside the final variables page. An example data structure might look like this:

```json
{
"questions":[
    {
        "question": "How many 'things' can a variable store at any one time?",
        "answers": [
            {
                "answer": 1,
                "correct": "true",
                "feedback": "Yes, correct! A variable can store a single thing at any one time. That 'thing' may be a complex item made up of other things, but it is still only one single thing as far as the variable is concerned."
            },
            {
                "answer": "infinite",
                "correct": "false",
                "feedback": "No, sorry, that's incorrect. Each data item we store in a variable takes up an amount of the computers available memory. To store an infinite number of values in a variable we would need a computer with infinite memory. This does not currently exist."
            }
        ]
    }, ...
```

The `questions` object inside the `.json` file will end up as a variable inside our page template. So, given that, how do we get the questions from the `.json` and into the page?

## Shortcodes

11ty allows us to define our own shortcodes that mean we can create reusable snippets of code (layout etc) that we can use all over our 11ty site. We could define an 11ty shortcode as a JavaScript function that takes our questions as input, and returns the HTML code that should be inserted into the template to display the question:

```js
insertQuestions: (questions) => {
        let template = ``;

        questions.forEach((q, i) => {
            template += `
<div class="question-block" id="q-block${i}">
<p class="question" id="q${i}">${q.question}</p>`;

            q.answers.forEach((a, j) => {
                template += `
<div class="answer-block" id="a-block${j}" data-correct="${a.correct}">
<p class="answer" id="a${j}">${a.answer}</p>
<p class="feedback hidden">${a.feedback}</p>
</div>`;
            });
            template += `</div>`;
        });
        return template;
    },
```

We then register this new shortcode with our eleventyConfig:

```js
eleventyConfig.addShortcode("questions", shortcodes.insertQuestions);
```

And now our shortcode is available to be used in our `variables.md` file:

```md
{{ "{% questions questions %}" | escape }}
```

Once 11ty has done it's magic and built our site, we end up with:

```html
<div class="question-block" id="q-block0">
    <p class="question" id="q0">How many 'things' can a variable store at any one time?</p>
    <div class="answer-block" id="a-block0" data-correct="true">
        <p class="answer" id="a0">1</p>
        <p class="feedback hidden">
            Yes, correct! A variable can store a single thing at any one time. That 'thing' may be a complex item made
            up of other things, but it is still only one single thing as far as the variable is concerned.
        </p>
    </div>
    <div class="answer-block" id="a-block2" data-correct="false">
        <p class="answer" id="a2">infinite</p>
        <p class="feedback hidden">
            No, sorry, that's incorrect. Each data item we store in a variable takes up an amount of the computers
            available memory. To store an infinite number of values in a variable we would need a computer with infinite
            memory. This does not currently exist.
        </p>
    </div>
</div>
```

So that's the data in a nice format for storage and editing, nicely separated from the notes content, but able to be inserted into the final built page. How then do we make it into a real quiz, where the reader can choose an answer?

## Bring on the JavaScript!

Yes, we'll solve this problem the way we solve everything in web development ... we'll throw a load of JavaScript at it:

```js
document.querySelectorAll(".answer-block").forEach((d) => {
    d.addEventListener("click", (e) => {
        d.querySelector(".feedback").classList.toggle("hidden");
        d.classList.toggle("selected");
    });
});
```

Okay, it's not really a large amount of javascript.

We add this into our page layout, and then it'll be present on all the notes pages. This JS will find all the answers in our page and add a listener to them that will fire whenever someone clicks on one of the answers. The listener calls a function which finds the feedback associated with that answer and toggles a 'hidden' class, which we'll use to show and hide the feedback. It will also toggle the 'selected' class on the answer itself. That's all the JS we need for the answer selection, so what gives us the rest of the quiz functionality?

## Bring on the CSS!

Yes! We could do a whole lot of this in JS, but JS is very bad and we should keep it to a minimum. So let's do the showing and hiding with CSS instead. Actually .sass in this case:

```sass
.hidden {
    display: none;
}

.answer-block {


    &[data-correct="false"].selected {
        .answer {
            background-color: #b00900;
        }

        .feedback {
            background-color: #750600;
        }

    }

    &[data-correct="true"].selected {
        .answer {
            background-color: #007506;
        }

        .feedback {
            background-color: #006205;
        }
    }
}
```

Here we set the `.hidden` class to display none. This way any feedback with the hidden class applied will be hidden, and when the hidden class is removed (when we click on an answer) it will be shown. Then in the second set of rules we select the answers that are incorrect and colour them a shade of red, and colour the answers that are correct green. Job done.

![quiz screenrecording]({{ "/img/2020-10-20-quiz-in-eleventy/quiz.gif" | url }})
