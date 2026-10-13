# Arrosage

Trop peu d'eau freine la croissance et donne des fruits éclatés ou amers ; trop d'eau asphyxie les racines et favorise les maladies. Voici comment Hortulus fait le calcul.

## Évaporation : ET0 et Kc

L'**évapotranspiration de référence (ET0)** est la quantité d'eau qu'une pelouse rase et bien arrosée évapore par jour. Hortulus calcule l'ET0 avec l'équation **FAO-56 Penman-Monteith** à partir de la température, de l'humidité, du vent et de la nébulosité prévus. Quand ces données manquent, il passe à l'équation plus simple de **Hargreaves** (température seule).

Une culture consomme ET0 × **Kc** (coefficient cultural). Le Kc varie avec le stade de croissance :

| Stade | Part de la saison | Kc (exemple tomate) |
|---|---|---|
| Initial | 15 % | 0,6 |
| Développement | 25 % | montant jusqu'à 1,15 |
| Mi-saison | 40 % | 1,15 |
| Arrière-saison | 20 % | descendant jusqu'à 0,8 |

En serre, l'évaporation est environ 30 % plus faible (moins de vent et de rayonnement), mais la pluie ne compte pas.

## Bilan hydrique par planche

Sans sonde d'humidité, Hortulus tient un **réservoir** par planche : la zone racinaire contient une certaine quantité d'eau (selon le sol et la profondeur d'enracinement). Chaque jour, l'évaporation de la culture en sort, et 80 % de la pluie plus tout l'arrosage y entrent. Dès que la moitié de l'eau disponible est consommée, il est temps d'arroser - jusqu'à revenir à la capacité au champ.

Avec une **sonde d'humidité du sol**, Hortulus utilise la valeur mesurée et une plage cible par type de sol.

## Règles pratiques

- Arrosez **rarement mais copieusement** (10-20 litres par m²) plutôt qu'un peu chaque jour : cela favorise un enracinement profond.
- Arrosez **le matin**, au pied de la plante, pas sur le feuillage (moins de maladies cryptogamiques).
- Le **paillage** réduit de moitié l'évaporation du sol.
- Moments critiques : germination, mise en place, floraison et nouaison (tomate, haricots), formation des tubercules (pomme de terre).
- L'eau de pluie vaut mieux que l'eau du robinet pour les plantes de terre de bruyère, et elle est gratuite.

## Arrosage automatique

Avec des vannes (entités switch ou valve), Hortulus peut arroser tout seul. Règles de sécurité :

- **Blocage gel** : les vannes extérieures restent fermées quand du gel est prévu dans les 12 heures ou qu'il fait trop froid maintenant - les goutte-à-goutte gelés éclatent.
- **Saut en cas de pluie** quand plus que la quantité réglée de pluie est prévue dans les 24 heures.
- **Durée maximale** par vanne.
- **Verrouillage de la pompe** : la pompe ne tourne que lorsqu'une vanne est ouverte, et s'arrête en premier.
