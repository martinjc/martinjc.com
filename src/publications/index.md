---
layout: page
title: publications
data: pubs
---

A list of my publications is given below, it's usually fairly up to date. Alternatively, you can take a look at my [Google Scholar](http://scholar.google.com/citations?user=t3R1ZLgAAAAJ) profile, or my profile on any number of useless "academic profile" websites (listed at the end of the page).

## Journal Papers
<ul>
{%- for pub in pubs reversed -%}
    {% if pub.entryType == "ARTICLE" %}
  <li>
    <p><strong>{{ pub.entryTags.TITLE }}</strong>, {{ pub.entryTags.YEAR }}, {{ pub.entryTags.AUTHOR }} </p>
  </li>
  {%- endif -%}
{%- endfor -%}
</ul>

## Conference Papers
<ul>
{%- for pub in pubs reversed -%}
    {% if pub.entryType == "INPROCEEDINGS" %}
  <li>
    <p><strong>{{ pub.entryTags.TITLE }}</strong>, {{ pub.entryTags.YEAR }}, {{ pub.entryTags.AUTHOR }} </p>
  </li>
  {%- endif -%}
{%- endfor -%}
</ul>

## Other outputs
<ul>
{%- for pub in pubs reversed -%}
    {% if pub.entryType != "INPROCEEDINGS" and pub.entryType != "ARTICLE" %}
  <li>
    <p><strong>{{ pub.entryTags.TITLE }}</strong>, {{ pub.entryTags.YEAR }}, {{ pub.entryTags.AUTHOR }} </p>
  </li>
  {%- endif -%}
{%- endfor -%}
</ul>


## Other "Academic Profile" Pages:

[ORCiD](http://orcid.org/0000-0001-8744-260X)

[ResearchGate](https://www.researchgate.net/profile/Martin_Chorley/)

[Mendeley](http://www.mendeley.com/profiles/martin-chorley/)

[ResearcherID](http://www.researcherid.com/rid/F-2971-2010)

[academia.edu](https://cardiff.academia.edu/MartinChorley)
