---
author: martin
comments: true
date: 2020-08-21
layout: post
tags: post
slug: wcp-and-lejog-data-analysis
title: WCP and LEJOG data analysis
---

Since this whole lockdown thing happened, I've hit the running hard. Since the start of March I've run about 600km, which, to add some context is about 200km more than I ran in the whole of 2019. I'm using running as stress relief, and there's a lot of stress around, so there's a lot of running to be done.

While I'm running so much, and partly as a motivator to ensure I don't slack off and stop running I thought I should enter some virtual events. I found the events I needed in the Wales Coast Path (WCP) and Lands End to John 'O Groats (LEJOG) virtual runs being put on by [EndToEnd running](https://endtoend.run/). In these events you have a year to 'virtually' run the length of the Wales Coast Path (870 miles) or from Lands End to John 'O Groats (874 miles).

Being the data nerd I am, I wanted to be able to track my mileage in quite some detail, and hopefully predict when I should be able to finish these ridiculous challenges so of course I had to analyse it with a bit of Python. I'm storing data in a simple spreadsheet like this:

| Day | Date | Mileage | Cumulative
|---|---|---|---|
| 1 | 13/07/2020 | 12.99 | 12.99
| 2 | 14/07/2020 | 0 | 12.99
| 3 | 15/07/2020 | 0 | 12.99
| 4 | 16/07/2020 | 6.45 | 19.44


Loading this in to Pandas is straightforward, even more so using the excellent `pathlib` library, which I cannot recommend enough for manipulating files and directories

``` python
from pathlib import Path

DATA_FILE = Path.home() / 'Some' / 'folders' / 'where' / 'data' / 'is' / 'WCP.xlsx'

# data is in two sheets in the file, and we want the first row as a header
run_data = pd.read_excel(DATA_FILE, sheet_name=['WCP', 'LEJOG'], header=1)
```

We're going to analyse both runs at once, so lets set up some helpful dictionaries to hold some constants and other magic numbers etc:

``` python
RUNS = ['WCP', 'LEJOG']

# length of each run (miles)
LENGTHS = {
    'WCP': 870,
    'LEJOG': 874
}

# target lengths
TARGETS = [365,350,300,250,200,150]

# how many miles should we run each day for the given target?
RATES = {}
for run in RUNS:
    RATES[run] = {}
    for target in TARGETS:
        RATES[run][target] = LENGTHS[run]/target
```

This spreadsheet has the dates for the rest of the year already entered, but we only want to analyse the data up to the present day and not worry about the future (an excellent life strategy, if not entirely sensible), so lets get rid of days with no data:

``` python
for run in RUNS:
    run_data[run] = run_data[run].dropna()
```

So the first thing we want to do now we've cleaned the data is work out what our current run rate is in miles per day, and how much distance we have left for both of the runs:

``` python
CURRENT_RATES = {}
REMAINING = {}

for run in RUNS:
    last_run = run_data[run].iloc[-1]
    CURRENT_RATES[run] = last_run['Cumulative']/last_run['Day']
    REMAINING[run] = LENGTHS[run] - last_run['Cumulative']
```
Which gives us, as of today:
```
CURRENT_RATES = {'WCP': 2.988088235294118, 'LEJOG': 3.0367499999999996}
REMAINING = {'WCP': 666.81, 'LEJOG': 752.53}
```

We can then use this information to predict how many days it will be until we finish the race, assuming the run rate stays the same:

``` python
DAYS_TO_FINISH = {}
for run in RUNS:
    DAYS_TO_FINISH[run] = REMAINING[run] / CURRENT_RATES[run]
```

which gives us:

```
DAYS_TO_FINISH = {'WCP': 223.1560608297652, 'LEJOG': 247.8076891413518}
```

Once we know how many days we have left, we can add that to the first run date, and work out when we should finish each race:

``` python
PROJECTED_END = {}
for run in RUNS:
    first_run = run_data[run].iloc[0]
    start_date = first_run['Date']
    PROJECTED_END[run] = (start_date + timedelta(days=DAYS_TO_FINISH[run])).date()
    print('Predicted to finish {0} on {1}'.format(run, PROJECTED_END[run].strftime('%A %d %B %Y')))
```

which lets us know that:

```
Predicted to finish WCP on Sunday 24 January 2021
Predicted to finish LEJOG on Wednesday 17 March 2021
```

So just another 5 to 8 months of running to go. Best go get my trainers on again ...

- if you want to see the full code I've used, it's [in github](https://github.com/martinjc/wcp-lejog-analysis)