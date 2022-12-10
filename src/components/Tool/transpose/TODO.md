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

# Warnen

Wenn alles prozessiert ist, dann prüfe ich, ob "parking:$side=" (mit gleich, ohne value) existiert in neuen Tags.
Wenn es fehlt, dann Warnung das Primärtag fehlt und eine dieser Tags gesetzt werden soll…
parking:$side=yes (oder besser lane, half_on_kerb, etc.) — oder no.

Wenn alles prozessiert ist, dann prüfe ich, ob "parking:$side:orientation=" (mit gleich, ohne value) existiert in neuen Tags.
Wenn es fehlt, dann Hinweis, dass besser auch Ausrichtung erfasst werden soll…
parking:$side:orientation=parallel|perpendicular|lane|diagonal

# Warnen maxstay

Wenn parking:$side:authentication:disc=yes vorhanden
UND parking:$side:maxstay (ODER BOTH) nicht vorhanden ist
DANN "Bitte ergänze parking:$side:maxstay=2 hours wenn möglich. Mehr im WIKI.

ODER: Direkt als Hinweis ans Feld.

# JOSM Link

- URL: `http://localhost:8111/load_and_zoom?left=...&right=...&top=...&bottom=...&select=way38473`
- Add tags: `?addtags=key=value|key2=value2`
- Delete tags: `?addtags=deleteKey=|deleteKey2=value2`

Docs: add/delete https://josm.openstreetmap.de/wiki/Help/RemoteControlCommands#load_and_zoom
Docs: https://wiki.openstreetmap.org/wiki/JOSM/RemoteControl
