---
author: martin
comments: true
date: 2017-06-12 12:45:00+00:00
layout: post
link: https://martinjc.com/2017/06/12/catching-a-bug/
slug: catching-a-bug
title: Catching a Bug
tags:
---

I'm doing some data analysis, and I just caught a showstopper of a bug. Want to see it? Here's the code as it was before:

``` python
new_index = [LIKERT[value] for value in LIKERT.keys() if value in data_counts.index]
```


and here's a simple fix for the code:

``` python
new_index = [LIKERT[value] for value in data_counts.index]
```

Doesn't look like much of a problem, but it completely changed the way my data was analysed. Both lines are creating a new index for a pandas dataframe. I have a dataframe that is indexed:

``` python
[0.0, 1.0, 2.0, 3.0, 4.0, 5.0]
```

and I want to replace the index with the correct names from a likert scale that these values refer to:

``` python
['N/A', 'Disagree Strongly', 'Disagree', 'Neither Agree nor Disagree', 'Agree', 'Agree Strongly']
```

so I create a dictionary that maps from keys in the first index, to values for the new index:

``` python
LIKERT = {
    0.0: 'N/A',
    1.0: 'Disagree Strongly',
    2.0: 'Disagree',
    3.0: 'Neither Agree nor Disagree',
    4.0: 'Agree',
    5.0: 'Agree Strongly'
}
```

I then do a little list comprehension that adds the correct new value to the new index, if it's key is in the old index. If the key isn't there, it gets skipped:

``` python
new_index = [LIKERT[value] for value in LIKERT.keys() if value in data_counts.index]
```

All fine, right? Sure, if the index is always in numerical order. Which it isn't. Using this code, if the index is in the wrong order, you can get '5' being replaced with 'Disagree Strongly' (or any of the values other than 'Agree Strongly') and suddenly your analysis is completely wrong.

The second line fixes this by looping through the index, not the dictionary, and so creates the new index in the correct order.

A better fix is actually to use the [.rename()](https://pandas.pydata.org/pandas-docs/stable/generated/pandas.DataFrame.rename.html) function, which can rename the index of a dataframe (or the column names) using a dictionary as a lookup, like so:

``` python
data.rename(index=LIKERT, inplace=True)
```

Any values present in the index but not in the lookup are left alone, and values in the lookup but not in the index are ignored, and the result is exactly what I need, all my '5s' replaced with 'Agree Strongly' and so on.

So I guess the lesson learnt here is RTFM, and don't try to be clever and re-invent functionality that already exists.
