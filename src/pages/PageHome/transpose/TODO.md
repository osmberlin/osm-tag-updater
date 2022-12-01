# Duplikate von tags vermeiden

Vor dem schreiben in den output, müssen wir doppelte tags löschen.
Siehe issue von Alex "marked", "painted_area_only".

Duplikate von key vermeiden

Warnung wenn ein Key 2x vorkommt, dann manuell auflösen.
Bspw. 2x fixme.

# Wiki Seiten

Überlegen wo wir Wikiseiten verlinken

# Messages explizit anzeigen im UI

`parking:condition:right=residents` — Wiki-Seite verlinken

Nicht verstandene Tags klarer hervorheben

# Final checks…

if parking:lane:$side:$type unspecified
(but parking:lane:$side specified)
then parking:$side = yes
AKA position unspecified

# Check age of way

Add a warning if updated at of way is older than 2 years

# List all tags/transponation

Maybe as a source of review, on a separate page.
