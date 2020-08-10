---
layout: page
title: publications
data: pubs
---

A list of my publications is given below, it's usually fairly up to date. Alternatively, you can take a look at my [Google Scholar](http://scholar.google.com/citations?user=t3R1ZLgAAAAJ) profile, or my profile on any number of useless "academic profile" websites (listed at the end of the page).

If you would like a copy of any of these and can't find them via the links below, check [my page in the Cardiff University institutional repository](http://orca.cf.ac.uk/view/cardiffauthors/A003291O.html) or drop me an [email](mailto:chorleymj@cardiff.ac.uk).

## Conference Papers
<ul>
{%- for pub in pubs.INPROCEEDINGS reversed -%}
  <li class="reference">
    <p>{% if pub.entryTags.URL %}<a href="{{ pub.entryTags.URL }}">{% endif %}<span class="ref-title">{{ pub.entryTags.TITLE }}</span>{% if pub.entryTags.URL %}</a>{% endif %} - {{ pub.entryTags.AUTHOR }}. <span class="ref-journal">{{ pub.entryTags.BOOKTITLE }}</span> <span class="ref-year">{{ pub.entryTags.YEAR }}</span>
    {% if pub.entryTags.DOI %}<br><small>doi: <a href="https://doi.org/{{ pub.entryTags.DOI }}">{{pub.entryTags.DOI}}</a></small>{% endif %}</p>
  </li>
{%- endfor -%}
</ul>

## Conference Presentations

<ul>
{%- for pub in pubs.TALK reversed -%}
  <li class="reference">
    <p>{% if pub.entryTags.URL %}<a href="{{ pub.entryTags.URL }}">{% endif %}<span class="ref-title">{{ pub.entryTags.TITLE }}</span>{% if pub.entryTags.URL %}</a>{% endif %}, {{ pub.entryTags.AUTHOR }} <span class="ref-journal">{{ pub.entryTags.BOOKTITLE }}</span> <span class="ref-year">{{ pub.entryTags.YEAR }}</span> </p>
  </li>
{%- endfor -%}
</ul>

## Journal Papers
<ul>
{%- for pub in pubs.ARTICLE reversed -%}
  <li class="reference">
    <p>{% if pub.entryTags.URL %}<a href="{{ pub.entryTags.URL }}">{% endif %}<span class="ref-title">{{ pub.entryTags.TITLE }}</span>{% if pub.entryTags.URL %}</a>{% endif %} - {{ pub.entryTags.AUTHOR }} <span class="ref-journal">{{ pub.entryTags.JOURNAL }}</span> <span class="ref-year">{{ pub.entryTags.YEAR }}</span>
    {% if pub.entryTags.DOI %}<br><small>doi: <a href="https://doi.org/{{ pub.entryTags.DOI }}">{{pub.entryTags.DOI}}</a></small>{% endif %}</p>
  </li>
{%- endfor -%}
</ul>

## Book Chapters

<ul>
{%- for pub in pubs.INCOLLECTION reversed -%}
  <li class="reference">
    <p>{% if pub.entryTags.URL %}<a href="{{ pub.entryTags.URL }}">{% endif %}<span class="ref-title">{{ pub.entryTags.TITLE }}</span>{% if pub.entryTags.URL %}</a>{% endif %} - {{ pub.entryTags.AUTHOR }} in <span class="ref-journal">{{ pub.entryTags.BOOKTITLE }}</span>{% if pub.entryTags.EDITOR %}, edited by {{ pub.entryTags.EDITOR }}{% endif %} <span class="ref-year">{{ pub.entryTags.YEAR }}</span></p>
  </li>
{%- endfor -%}
</ul>

## Other outputs
<ul>
{%- for pub in pubs.MISC reversed -%}
  <li class="reference">
    <p>{% if pub.entryTags.URL %}<a href="{{ pub.entryTags.URL }}">{% endif %}<span class="ref-title">{{ pub.entryTags.TITLE }}</span>{% if pub.entryTags.URL %}</a>{% endif %} - {{ pub.entryTags.AUTHOR }} <span class="ref-year">{{ pub.entryTags.YEAR }}</span></p>
  </li>
{%- endfor -%}
{%- for pub in pubs.PHDTHESIS reversed -%}
  <li class="reference">
    <p>{% if pub.entryTags.URL %}<a href="{{ pub.entryTags.URL }}">{% endif %}<span class="ref-title">{{ pub.entryTags.TITLE }}</span>{% if pub.entryTags.URL %}</a>{% endif %} - {{ pub.entryTags.AUTHOR }} <span class="ref-year">{{ pub.entryTags.YEAR }}</span></p>
  </li>
{%- endfor -%}
</ul>


## Other "Academic Profile" Pages:

[ORCiD](http://orcid.org/0000-0001-8744-260X)

[ResearchGate](https://www.researchgate.net/profile/Martin_Chorley/)

[Mendeley](http://www.mendeley.com/profiles/martin-chorley/)

[ResearcherID](http://www.researcherid.com/rid/F-2971-2010)

[academia.edu](https://cardiff.academia.edu/MartinChorley)
