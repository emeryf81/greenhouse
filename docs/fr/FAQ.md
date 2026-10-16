# FAQ et dépannage

Les questions sont regroupées : [Général](#général) · [Planification](#planification) ·
[Météo et historique du climat](#météo-et-historique-du-climat) ·
[Cuisine](#cuisine) · [Enregistrements](#enregistrements) ·
[Entités, voix et tableaux de bord](#entités-voix-et-tableaux-de-bord) ·
[Impression, manuel, remplissage auto](#impression-manuel-remplissage-auto) ·
[Sécurité de l'irrigation](#sécurité-de-lirrigation) · [Dépannage](#dépannage)

## Général

**Ai-je besoin de capteurs ?**
Non. Sans capteurs, Hortulus planifie, programme et rappelle quand même. Les capteurs de sol
ajoutent l'état d'humidité et un arrosage précis ; la température du sol fait attendre les conseils
de semis en pleine terre jusqu'à ce que le sol soit chaud ; un thermomètre de serre active les
conseils d'aération en direct.

**Ai-je besoin d'une prévision météo ?**
Recommandée. Sans elle, le risque de gel devient `unknown` (ou *low/moderate* d'après la température
extérieure actuelle quand il fait déjà froid), l'irrigation se rabat sur les capteurs seuls, et le
moment de la plantation ne peut pas attendre des nuits sans gel. Choisissez l'entité météo sous
**Paramètres › Météo et capteurs extérieurs**.

**Pourquoi `garden_manager.*` et pas `garden.*` ?**
Home Assistant exige que les actions utilisent le domaine de l'intégration. Le dossier et le domaine
de l'intégration sont `garden_manager` ; le produit s'appelle Hortulus.

**Quelque chose est-il envoyé sur Internet ?**
Home Assistant lui-même ne se connecte à l'extérieur que si vous activez **Open‑Meteo** (Paramètres →
Météo et capteurs extérieurs) : il récupère alors une prévision sur api.open‑meteo.com et, une fois par
jour, la météo observée des derniers jours pour compléter l'historique du climat, en envoyant les
coordonnées du jardin arrondies à deux décimales (~1 km). La base de plantes, le manuel, toutes les
illustrations et le livre de cuisine sont fournis avec l'intégration ; les photos que vous ajoutez
passent par l'`image_upload` de Home Assistant et restent dans votre répertoire de configuration.
Deux choses sont chargées par *votre navigateur*, pas par Home Assistant : les photos de plantes de
Wikipédia (activées par défaut, désactivables sous **Paramètres → Affichage**) et, dans l'onglet
Météo, la carte radar publique de Buienradar quand vous n'avez pas de caméra radar dans Home
Assistant (voir plus bas).

**Hémisphère sud ?**
Entièrement pris en charge : choisissez un préréglage austral, une zone USDA avec l'hémisphère *sud*,
ou vos propres dates. Les saisons vont de juillet à juin et portent le nom de l'année du printemps. Le
thème de couleurs saisonnier suit aussi l'hémisphère.

**Hortulus existe-t-il en français ?**
Oui. Le néerlandais, l'anglais et le français sont complets : panneau, tâches et notifications, manuel
et glossaire, noms et conseils de plantes, livre de saison, livre de cuisine, phrases Assist et écrans
de Home Assistant. Choisissez **Français** sous **Paramètres › Général › Langue**, ou laissez sur
*Suivre Home Assistant*. Les dates et les nombres utilisent les formats belges (fr‑BE, nl‑BE). La
langue des tâches générées peut être réglée séparément dans les options de l'intégration (Réglages
avancés).

**Où sont passés Plantes, Conseils et Paramètres ? Comment le menu est-il organisé ?**
Le menu compte huit rubriques : **Aujourd'hui**, **Jardin** (Planificateur, Plan du jardin, Cultures),
**Calendrier**, **Météo**, **Journal**, **Cuisine**, **Savoir** (Plantes, Conseils, Manuel) et
**Gestion** (Analyse, Imprimer, Paramètres). Les onglets d'une rubrique se placent en ligne au-dessus
de la page ; une rubrique se rouvre sur le dernier onglet utilisé. Sur téléphone, les rubriques passent
dans une barre du bas et les Paramètres dans la barre du haut.

**Puis-je changer l'apparence ? Que sont les thèmes ?**
Oui, sous **Paramètres → Affichage**. *Thème de couleurs* : **Vert classique** (vert feuille et souci),
**Terre** (terre cuite et argile), **Nuit** (toujours sombre, menthe au clair de lune) ou **Saison**, qui
suit l'année (printemps, été, automne, hiver, selon l'hémisphère). *Clair ou sombre* :
**Automatique** (suit Home Assistant ou l'appareil), toujours clair ou toujours sombre. Dans Home
Assistant, le choix de couleurs est stocké avec votre utilisateur et vous suit sur tous les appareils ;
l'interrupteur des photos Wikipédia est propre à chaque navigateur. Les animations (la gerbe de
feuilles quand vous cochez une tâche, les vues qui s'estompent, les squelettes de chargement)
s'arrêtent quand votre appareil est réglé sur *réduire les animations*.

**Qu'est-ce que l'écran mural ?**
Une vue kiosque calme et en grand format pour une tablette dans la cuisine ou l'abri : l'horloge, la
météo actuelle, les tâches du jour avec de grosses cases à cocher, des prévisions sur trois jours,
l'humidité de vos planches et toute alerte (gel, fuite, vanne restée ouverte). Pas de menus ; l'écran
s'assombrit entre 22 h et 6 h. Ouvrez-le avec **Écran mural** dans l'onglet Aujourd'hui, ou allez sur
`/hortulus/wall`. *Fermer* (en haut à droite) vous ramène.

**Puis-je gérer plusieurs jardins ?**
Oui. Ajoutez à nouveau Hortulus (Paramètres › Appareils et services › Ajouter une intégration) pour un
jardin ouvrier ou une seconde parcelle, et renommez l'entrée (p. ex. « Allotment »). Chaque jardin a son
propre plan, ses tâches, son journal, ses récoltes et son livre de cuisine. Choisissez le jardin en haut
du panneau ; votre navigateur s'en souvient. Chaque action accepte `garden: Allotment` (titre ou
identifiant d'entrée), la carte du tableau de bord `garden: Allotment`. Sans cela, tout va au premier
jardin, qui reste exactement comme avant. Pour quelques planches devant la maison, des zones
supplémentaires dans le même plan conviennent aussi.

**Existe-t-il une version site web ?**
Le panneau est écrit pour que le même code et le même moteur puissent tourner dans un navigateur en
dehors de Home Assistant (« Hortulus Web »). Ce que ce dépôt en montre : le panneau peut être lancé
avec une liste restreinte d'onglets (`panel.config.tabs`) pour que les visiteurs aient une vue en
lecture seule **Jardin** d'un plan que son propriétaire partage – cliquez sur une zone, une planche, une
culture ou un élément pour les détails, choisissez l'année – et des recettes partagées ; le livre de
cuisine peut *m'envoyer une recette par mail* au lieu de l'envoyer vers un téléphone ; et un plan
exporté là-bas s'importe dans Home Assistant (zones, planches, éléments, plans de saison et cultures
suivent). Dans Home Assistant, rien de tout cela ne change. L'hébergement, les comptes et la
disponibilité du site web ne font pas partie de ce dépôt et ne sont pas décrits ici.

## Planification

**Pourquoi ma tâche de semis est-elle « en retard » ?**
Soit la période de semis a commencé et vous avez fixé une date explicite dans le passé, soit la tâche
a été créée à partir d'une série de semis échelonnés à dates fixes. Terminez-la, reportez-la, ou
changez la date planifiée dans les détails du planificateur. Les tâches qui *dépendent* d'un
prérequis en retard (l'éclaircissage après le semis) reculent automatiquement jusqu'à ce que le
prérequis soit fait.

**La tâche de semis dit « attendre ».**
Pour un semis en pleine terre, le sol est plus froid que la température minimale de germination de la
plante (p. ex. les haricots ont besoin de 12 °C). Hortulus prend la plus basse entre la mesure actuelle
du capteur de sol et la moyenne enregistrée des derniers jours : un après-midi chaud ne suffit pas, ou – pour une plantation – du gel
est prévu sous la température minimale de la plante. La tâche passe à demain et la raison figure dans
la description.

**Le calendrier tient-il compte de la météo ?**
Oui. Avec la **Planification selon la météo** (activée par défaut), les semis, plantations,
endurcissement, tailles, préparation du sol et travaux semblables se déplacent dans leur période vers
le jour adapté le plus proche (ni pluie, ni gel, ni chaleur, ni orage). S'il n'y en a aucun, la tâche
reçoit un avertissement météo. Hortulus crée aussi des tâches pour la chaleur, les périodes sèches,
les orages et les fortes pluies, avec des conseils écologiques – et des tâches de suivi pour le temps
déjà passé, voir [Hortulus tient-il compte de la météo pour la croissance ?](#météo-et-historique-du-climat).

**Pourquoi n'ai-je pas de tâches de récolte pour les soucis (œillets d'Inde) ?**
Les fleurs compagnes sont marquées `harvestable: false`. Mettez-le à true dans une plante
personnelle / surchargée si vous les cultivez pour la coupe.

**Des semis échelonnés ont été ignorés.**
Les semis qui tomberaient après la dernière période de semis sont écartés volontairement ; le
planificateur vous dit combien.

**Deux cultures se chevauchent mais aucun avertissement n'apparaît.**
Elles ne sont pas en terre en même temps (p. ex. des radis récoltés avant la mise en place des
haricots). Les contrôles de chevauchement et d'association ne considèrent que les cultures dont les
périodes d'occupation se recoupent. Utilisez *Afficher le jardin au* pour voir ce qui se trouve dans la
planche à une date donnée.

**Comment le « rayon d'association » est-il utilisé ?**
Deux cultures interagissent quand leurs empreintes sont à moins de
`max(radius, (spacing_a + spacing_b) / 2)` ; l'influence décroît linéairement avec la distance.

**Comment fonctionnent le plan du jardin par année et le passage à la nouvelle année ?**
Dans **Plan du jardin**, vous façonnez le jardin sans plantes : zones (pleine terre, serre, châssis,
jardinières et pots, verger, forêt-jardin …), planches et éléments comme l'allée carrossable, la
maison, le tonneau d'eau de pluie, la haie, la pelouse, l'abri de jardin ou une allée dans la serre. Ce
plan vaut pour une saison. Dans le **Planificateur**, vous plantez cette saison sur son plan ; zones et
planches y sont fixes. Le planificateur fonctionne en cinq étapes – terrain, zones de culture,
planches, vivaces, annuelles – et chaque élément ne peut être modifié que dans sa propre étape.

Rien ne passe tout seul à une nouvelle année, vivaces comprises. En fin d'année, ouvrez le
**Passage à la nouvelle année** (bouton dans Plan du jardin et Planificateur ; en janvier, les Conseils
vous le rappellent). Gardez tout, ou cochez les zones, éléments et vivaces qui suivent (ou utilisez le
plan que vous avez déjà dessiné pour l'an prochain), les cultures qui hivernent (ail, poireaux d'hiver
…) qui passent, et si la nouvelle année devient tout de suite votre jardin actif. L'ancien plan est
archivé ; tout figure dans le journal système et peut être annulé.

**Mon pommier est dans le plan chaque année – comment le retirer ?**
Les vivaces (arbres fruitiers, baies, asperges, aromatiques vivaces) ne passent à la saison suivante
que si vous les incluez dans le **Passage à la nouvelle année**. Pour en retirer une de la saison en
cours, sélectionnez la plante dans le planificateur et choisissez **Retirer**. Deux options s'offrent à
vous : **Il a disparu à partir de cette saison** (les années précédentes le gardent pour la rotation et
l'historique) ou **Le supprimer complètement**.

**Puis-je recommencer avec un nouveau plan de jardin ?**
Oui. Dans **Plan du jardin → Plans**, choisissez **Commencer un nouveau plan** : complètement vide (à
partir de zéro), avec les mêmes zones mais sans planches ni cultures, ou avec zones et planches mais
sans cultures. Le plan actuel devient **inactif** : il est conservé avec son nom, ses planches et ses
cultures, et **Activer** le ramène plus tard (le plan alors actif devient inactif à son tour). Un plan
inactif dont vous n'avez plus besoin peut être supprimé (la suppression peut être annulée depuis le
journal système). Les plans mis de côté sont inclus dans un export et dans un import.

**Puis-je comparer deux plans ?**
Oui, dans **Analyse → Comparer** ou dans **Plan du jardin → Plans** (*Comparer* à côté d'un plan
inactif). Vous voyez quelles zones, planches, éléments et cultures ont été ajoutés, retirés ou modifiés.

**Puis-je modifier les dates de mes cultures sans les faire glisser ?**
Oui, l'onglet **Cultures** liste chaque culture d'une saison (par planche, par culture ou par date).
Modifiez-y la méthode, le statut, le nombre, les dates planifiées et réelles de semis, de plantation, de
récolte et de fin, et les notes. Laissez une date planifiée vide et Hortulus la calcule (en gris en
dessous). Cliquez sur une plante pour tous les détails. La vue **Chronologie** montre l'année par
planche sous forme de barres ; faites glisser une culture planifiée sur le côté pour déplacer son
semis et sa plantation.

**Puis-je modifier plusieurs cultures à la fois ?**
Oui. Cochez les cultures dans **Cultures** ; une barre apparaît pour définir le statut et/ou une date
(p. ex. *Semé le* = aujourd'hui) pour toutes. Cela fait une seule entrée dans le journal système et peut
être annulé d'un coup. **Afficher sur le plan** saute à la culture dans le planificateur ; **Dans
Cultures** dans la fenêtre du planificateur vous ramène.

**Que dois-je semer cette semaine, et de quelles graines ai-je besoin ?**
**Cultures** propose quatre vues à côté de la liste : **Plan de semis** (semaine par semaine, ce qu'il
faut semer à l'abri ou en plein air, planter et commencer à récolter ; **Fait** inscrit la date réelle),
**Semences** (les graines dont le plan a besoin par rapport à votre stock), **Succession** (les planches
qui se libèrent cette saison et ce qui peut encore y aller) et **Prévision de récolte** (kg par semaine ;
elle gagne en précision avec vos propres récoltes). Sur téléphone, la liste montre une carte par culture.

**Pourquoi une plante ne convient-elle pas là où je l'ai mise ?**
Cliquez sur la culture dans le planificateur et choisissez **Pourquoi (pas) ici ?** : vous voyez chaque
raison pour laquelle la planche ne lui convient pas (trop tard, mauvais type de zone, pas sous verre, gel
avant la récolte, rotation des cultures, mauvais voisin, pas de place) et quelles planches conviendraient.
Déposez une plante sur une planche où elle n'a pas sa place et cette explication apparaît tout de suite
au-dessus du plan. Cliquez sur une planche pour voir quelles familles de plantes y ont poussé ces cinq
dernières années.

**Puis-je recevoir des rappels pour les tâches oubliées ?**
Oui. Sous **Paramètres › Notifications › Rappels**, réglez une heure pour le rappel quotidien des tâches
en retard (pour chaque tâche, il dit si c'est encore possible, ou trop tard et mieux vaut la passer) et
un **Aperçu de la semaine** un jour de votre choix. Ils utilisent les mêmes canaux que les autres
notifications.

**Plusieurs personnes peuvent-elles se partager le travail ?**
Oui. Chaque tâche peut être attribuée à une personne (entité `person.*`). Sous **Paramètres › Ménage et
voix**, choisissez qui reçoit les nouvelles tâches par défaut et par type de tâche, et un service notify
par personne : chacun reçoit alors son propre récapitulatif quotidien et ses rappels de retard. La carte
du tableau de bord peut n'afficher que vos tâches (`assignee: me`).

**Puis-je agir sur une notification depuis mon téléphone ?**
Oui, avec l'application Home Assistant : le récapitulatif du matin et les rappels portent **Fait** (pour
une tâche), **Demain** et – quand des planches ont besoin d'eau – **Arroser maintenant**. Une vanne
restée ouverte porte **Fermer la vanne**.

**Où trouver la météo et le radar des pluies ?**
Dans l'onglet **Météo** : la météo actuelle, un graphique des 24 prochaines heures (température
au-dessus de la pluie), les dix prochains jours avec une barre de température et des étiquettes gel et
chaleur, et ce que cela signifie pour le jardin (nuits de gel, journées chaudes, pluie qui permet
d'attendre pour arroser, période sèche, planches qui ont besoin d'eau). Le **radar des pluies** montre
une caméra radar de Home Assistant s'il y en a une (une entité `camera.*` dont l'identifiant contient
*buienradar*, *radar*, *regen* ou *rain*, p. ex. via l'intégration Buienradar). Sans elle, Hortulus
montre la carte publique de Buienradar quand le pays de Home Assistant est les Pays-Bas ou la
Belgique, actualisée toutes les 5 minutes ; ailleurs, il n'y a pas de radar. La prévision vient de
l'entité météo choisie dans les Paramètres. Plus bas sur la même page se trouve l'**Historique du
climat** (voir [Météo et historique du climat](#météo-et-historique-du-climat)).

**Quand dois-je poser un filet anti-insectes ?**
Hortulus suit un **calendrier des ravageurs** : pour la mouche de la carotte, la mouche du chou, la
piéride, la mouche de l'oignon, la teigne du poireau, les pucerons, l'altise, le doryphore et d'autres,
il calcule à partir des degrés-jours de cette saison quand ils volent. Tant que le journal climatique
est encore court, il utilise les mois habituels. Les limaces suivent la météo : pluie et nuits douces.
Vous recevez une tâche pour poser le filet quelques jours avant un vol, un contrôle hebdomadaire ou une
ronde des limaces le soir, et une carte **Ravageurs au jardin** sur le tableau de bord. Seulement pour
les cultures qui sont (ou seront bientôt) en terre. Avec les **Conseils écologiques** activés
(recommandé, jamais obligatoire), chaque avertissement de ravageur s'accompagne aussi d'une réponse bio.

**Quels capteurs dois-je acheter ?**
Voyez le chapitre du manuel **Choisir et acheter ses capteurs** : commencez par un thermomètre de serre
et un capteur d'humidité du sol dans votre planche principale.

**Hortulus utilise-t-il mon analyse de sol ?**
Oui. Sélectionnez une planche dans le planificateur et ajoutez une **analyse de sol** (pH, matière
organique, P, K, Mg et calcaire d'un rapport de laboratoire ou d'un kit maison). Le plan de
fertilisation de la planche, le conseil de chaulage et la liste de courses suivent la dernière analyse :
moins de phosphate quand le P est élevé, du calcaire seulement quand le pH est trop bas pour les
cultures, plus de compost quand la matière organique est faible.

## Météo et historique du climat

**Hortulus tient-il compte de la météo pour la croissance ?**
Oui, et pas seulement des prévisions : de la météo **qui a vraiment eu lieu** chez vous, enregistrée
jour après jour dans l'historique du climat.
* **Croissance** – les degrés-jours enregistrés depuis la plantation déplacent la date de récolte (± 3
  semaines). Les cultures sous serre comptent les degrés-jours de leur propre capteur d'air (sinon la
  journée extérieure avec l'effet tampon de la serre). Les jours de chaleur du dernier mois et une série
  de jours sombres retardent les cultures fruitières ; les cultures sans modèle de degrés-jours sont
  retardées par les jours froids sous leur minimum. La fiche de la culture montre le retard et sa raison.
* **Eau** – le bilan hydrique calcule l'évaporation des jours passés avec Penman-Monteith sur la journée
  enregistrée (humidité, vent, ensoleillement ou rayonnement) et la pluie tombée : un jour venteux et
  ensoleillé assèche plus vite.
* **Maladies** – deux jours chauds et humides déjà passés (critères de Hutton) donnent un risque de
  mildiou élevé ; plusieurs jours humides relèvent le niveau.
* **Semis** – le sol doit être chaud durablement : la plus basse entre la mesure actuelle et la moyenne
  des derniers jours.
* **Tâches** – après une tempête (rafales ≥ 60 km/h), une tâche *Après la tempête* ; après une forte
  averse enregistrée, la ronde contre les limaces (la même que celle de la prévision, jamais deux fois) ;
  après une semaine sèche et chaude, un arrosage en profondeur. S'il a gelé alors que des cultures
  frileuses étaient dehors, une alerte *« Il a gelé »* vous le dit.

**Où trouver l'historique du climat et les statistiques de température ?**
Dans l'onglet **Météo**, sous les prévisions : **Historique du climat**. Vous y trouvez un graphique
quotidien des températures et de la pluie (30 jours, 90 jours ou 1 an), les 7 derniers jours, les 30
derniers jours et la saison en cours (chacun comparé à l'an dernier : moyenne, minimum,
maximum, pluie, nuits de gel, jours ≥ 25 °C, ensoleillement, vent le plus fort, degrés-jours,
évaporation), les records, un tableau de **tous les capteurs de température** (maintenant, aujourd'hui,
moyenne 7 jours, min–max 30 jours, records bas et haut), le mois par mois et les dates de gel. Pour vos
tableaux de bord : `sensor.hortulus_rain_7_days`, `sensor.hortulus_mean_temperature_7_days`,
`sensor.hortulus_sunshine_7_days` et `sensor.hortulus_frost_nights_this_season`, chacun avec la valeur
de l'an dernier dans l'attribut `last_year` ; tout le reste via la commande websocket
`garden_manager/climate/stats` (voir [Entités](ENTITES.md#capteurs-de-climat-historique-du-climat)).
Les premiers jours, l'historique est encore court : il se remplit jour après jour.

**Et si Home Assistant (ou Hortulus) était arrêté ?**
Les jours manqués sont complétés. Une fois par jour et au démarrage, Hortulus regarde les 30 derniers
jours et remplit ce qui n'a pas été bien couvert depuis l'**enregistreur** (recorder) de Home Assistant :
les mêmes capteurs, convertis en minimum, maximum et moyenne par jour. Il faut donc que le recorder
garde ces capteurs (par défaut 10 jours d'historique). Si l'option **Utiliser Open-Meteo** est activée,
les jours sans aucune mesure reçoivent en plus la météo **observée** d'Open-Meteo pour votre
emplacement. Vos propres mesures priment toujours ; la météo observée ne fait que combler les trous. Si
Home Assistant était complètement arrêté (pas d'enregistreur non plus) et qu'Open-Meteo est désactivé,
ces jours restent vides et les calculs se contentent des jours enregistrés.

**Quels capteurs de station météo aident ?**
Sous **Paramètres → Météo et capteurs extérieurs** : température extérieure, capteur de pluie, humidité
de l'air et, pour une station météo, **vitesse du vent**, **rafales**, **rayonnement solaire (W/m²)** et
**lumière extérieure (lux)**. Le vent, l'humidité et le soleil (rayonnement ou lux) rendent exacts le
bilan hydrique (Penman-Monteith au lieu d'une estimation à partir des seules températures), le risque de
maladie et les statistiques ; les rafales déclenchent la tâche après une tempête. Les unités sont
converties (m/s, mph, nœuds → km/h ; °F → °C). Sans station, l'entité météo complète, et Open-Meteo s'il
est activé. Chaque capteur de température associé ailleurs (serre, sol, air près d'une planche) est
suivi aussi.

**Comment les dates de gel sont-elles mesurées ?**
D'après le minimum extérieur enregistré : chaque nuit sous 0 °C compte comme gelée. Par année, Hortulus
retient la **dernière gelée de printemps** (dernière nuit de gel du premier semestre ; de juillet à
décembre dans l'hémisphère sud) et la **première gelée d'automne** (première nuit de gel du second
semestre). Un semestre ne compte comme complet qu'une fois terminé et enregistré à au moins 80 %.
*Météo → Historique du climat → Dates de gel* montre la moyenne de vos années mesurées face au préréglage
régional (*n jours plus tôt / plus tard*). Hortulus ne change pas vos dates de gel tout seul : si l'écart
est grand, saisissez vos propres dates sous **Paramètres → Climat et région** et toutes les fenêtres de
semis suivent. Dès que ≥ 2 années complètes placent une date à ≥ 7 jours du préréglage, l'historique du
climat propose le bouton **Utiliser mes dates de gel** (admin) pour le faire en un clic.

**Comment désactiver les dictons, ou un autre extra ?**
**Paramètres → Extras** : un interrupteur par extra (dictons du jardin, température du sol estimée,
prévision d'eau, alerte de capteur muet, résumé météo, dates de gel propres, import de station météo,
arrosage au surplus solaire, ligne climat sur la carte). Tous sont activés par défaut. Sur une seule
carte de tableau de bord, vous pouvez aussi masquer seulement le dicton ou la ligne climat avec
`slogan: false` ou `climate: false`.

**Comment importer mon historique Netatmo ou Ecowitt ?**
Exportez les données en CSV depuis l'application ou le site de la station (Davis ou un tableur
conviennent aussi), puis **Météo → Historique du climat → Importer les données d'une station météo**
(admin). Le séparateur, l'en-tête, l'heure (aussi en secondes unix) et les colonnes de température,
d'humidité, de pluie, de vent et de rafales sont reconnus en français, néerlandais et anglais ; °F,
pouces, mph, m/s et nœuds sont convertis. Les jours déjà mesurés par Hortulus sont conservés ; les
jours importés comptent comme *historique*.

**Combien de temps l'historique est-il conservé ?**
Les jours extérieurs restent pendant deux saisons, les jours par capteur 400 jours. Ensuite, ils sont
regroupés en chiffres mensuels, conservés pour toujours, pour que les comparaisons d'une année sur
l'autre restent possibles. L'historique vit dans le stockage du jardin, pas dans le fichier de plan
exporté.

**Le site web (Hortulus Web) garde-t-il l'historique ?**
Oui. Le site web tient le même historique du climat pour chaque jardin. Il le remplit avec la météo
observée d'**Open-Meteo** pour l'emplacement du jardin et, si le jardin est relié à un Home Assistant,
avec l'**enregistreur** de ce Home Assistant via le jeton du jardin. Les mêmes règles valent : vos
mesures d'abord, deux saisons de jours (400 jours par capteur), puis des chiffres mensuels. Voir
[Configuration → Hortulus Web](CONFIGURATION.md#10-hortulus-web-site-web-facultatif).

## Cuisine

**À quoi sert l'onglet Cuisine ?**
C'est un livre de cuisine de saison construit à partir de ce que le jardin donne *en ce moment*.
Hortulus regarde les cultures prêtes à cueillir (plus tout ce que vous ajoutez vous-même, comme des
courges stockées ou des haricots congelés) et leur propose des plats, chacun avec les quantités par
personne, ce qui vient du jardin et ce qu'il faut acheter. Le jardin passe toujours en premier : un
plat n'est proposé que si le jardin fournit son ingrédient principal. Les recettes sont écrites en
néerlandais, en anglais et en français. L'onglet a trois sections : **Idées du jardin**, **Mon livre de
cuisine** et **Liste de courses**.

**Quelles sortes de plats y a-t-il ?**
Plus de 60 techniques : soupes (dont velouté rôti, minestrone, soupe verte, chowder et une soupe froide
façon gazpacho), entrées (beignets, carpaccio, rémoulade, taboulé, caprese, caponata, crostini …), plats
(plats au four, sautés, pâtes, risotto, gratin, ragoûts et currys, frittata, stoemp, légumes farcis,
ratatouille, tian, shakshuka, waterzooi, tartes, gnudi …), desserts (crumble, clafoutis, panna cotta,
sorbet, gâteaux de légumes, fruits cuits …) et un chapitre **Conserves** pour le surplus (pickles
express, chutney, passata, cubes de pesto, confiture, blanchiment et congélation, choucroute – les
quantités y sont celles d'une fournée, pas d'une assiette). La laitue, le concombre et le radis ne vont
que dans des plats crus.

**Que sont les chapitres et les menus ?**
Les idées, votre livre de cuisine et le PDF du livre sont découpés en **Soupes, Entrées, Plats,
Desserts** et **Conserves** (une page de chapitre chacun dans le PDF, un filtre par chapitre dans le
livre). Les **Menus** combinent une soupe ou une entrée, un plat et un dessert qui vont ensemble,
construits à partir de ce qui est prêt à cueillir : des menus à thème de la saison (un dîner de jardin
provençal, des mezzés du Levant, une avalanche de courgettes, un menu de printemps flamand, un menu
réconfort d'hiver …) et des menus autour d'un plat. Un clic met les trois plats sur la liste de courses
ou dans votre livre de cuisine.

**Comment utiliser ce qu'il y a dans le frigo, et qu'est-ce que « toujours à la maison » ?**
Sous *Plus de choix*, cochez **À utiliser du frigo** (yaourt, feta, parmesan, œufs, moutarde, oignon,
chapelure …). Chaque produit reçoit sa propre préparation selon le genre de plat – le yaourt devient une
sauce façon tzatziki, un raïta ou un lit citron-ail sous des légumes rôtis ; la feta est cuite parmi les
légumes ou émiettée dans une frittata ; les œufs sont cuits dans des creux sur le plat au four – et
seulement là où cela convient. Un plat prend au plus trois produits du frigo, une sauce, une vinaigrette
et une garniture croquante, jamais deux fromages ni deux crèmes. Les produits du frigo comptent comme
« à la maison ». Cochez **Toujours à la maison** pour ce qui ne doit jamais figurer sur une liste de
courses (le sel, le poivre et l'huile d'olive sont toujours supposés). **Retenir ces choix** conserve
tout cela pour la prochaine fois.

**Comment choisir l'accompagnement, la viande ou le poisson, et le nombre de personnes ?**
Sous *Plus de choix* : **Personnes** ; **Accompagnement** (ce qui convient au plat, aucun, ou pâtes, riz,
boulgour, couscous, couscous perlé, gnocchis, pommes de terre, frites, pain ou nouilles) ; et **Viande,
poisson ou …** (poulet, haché, bœuf, steak, bœuf à mijoter, porc, saucisse, lard, jambon, ris de veau,
saumon, poisson blanc, crevettes – ou les protéines végétariennes tofu, pois chiches, lentilles, œuf,
halloumi, fromage de chèvre). Ne choisissez rien pour des plats végétariens, ou plusieurs pour varier.
Chaque plat n'obtient que la protéine et l'accompagnement qui lui conviennent (un risotto garde son riz,
un waterzooi pochera le poulet). Chaque recette peut encore changer d'accompagnement, de protéine et de
nombre de personnes. Les baies de sureau et les haricots (aussi les pois chiches et les edamames) ne
sont jamais proposés crus ou à moitié cuits.

**Puis-je modifier une recette ou écrire ma propre version ?**
Oui. **Modifier** dans une recette permet d'ajouter, de supprimer ou de changer des ingrédients (nom,
quantité, unité, jardin / à la maison / à acheter) et d'ajouter, de réécrire, de supprimer ou de
réordonner les étapes. Votre version va dans votre livre de cuisine, et la liste de courses et les PDF
la suivent. **Revenir à l'original** rétablit la recette générée. Une recette a besoin d'au moins un
ingrédient et d'une étape, et contient au plus 40 ingrédients et 30 étapes.

**Comment fonctionne mon livre de cuisine ?**
**Garder dans mon livre** enregistre un plat. Vous pouvez y marquer des favoris, ajouter une note,
noter quand vous l'avez cuisiné, chercher par recette ou par ingrédient et filtrer par favoris ou par
chapitre. Les recettes enregistrées sont stockées sous forme de petite description de recette et
affichées dans la langue courante, si bien qu'elles se lisent bien en néerlandais, en anglais ou en
français.

**Comment fonctionne la liste de courses ?**
Mettez des plats sur la liste depuis leur recette (le bouton caddie), ou un menu entier d'un coup. Il y
a **une seule liste** pour tout ce que vous avez choisi : ce qu'il faut acheter, regroupé (viande,
poisson, protéines végétariennes, produits laitiers, accompagnements, placard, autre), et séparément ce
que vous pouvez cueillir au jardin. Ce que vous avez à la maison ou que vous utilisez du frigo n'y
figure pas. Vous pouvez l'imprimer, l'enregistrer en PDF (éventuellement avec toutes les recettes et
leurs images de plats), l'envoyer sur votre téléphone ou la mettre sur une liste de tâches Home
Assistant.

**Chaque plat a une image – d'où vient-elle ?**
Hortulus la dessine : les cultures du plat dans une assiette (un bol pour les soupes et les conserves, un
plat à four pour les gratins), l'accompagnement en lit dessous, la viande ou le poisson au milieu et des
herbes éparpillées dessus. Elle est générée à partir de la recette, fonctionne donc hors ligne et un plat
a toujours le même aspect.

**Comment sortir une recette d'Hortulus : PDF, impression, téléphone, liste de tâches ?**
- **PDF** : une recette, tout votre livre de cuisine (une page de chapitre chacun ; jusqu'à 200 recettes,
  une longue recette continue sur une autre page), toutes les idées actuelles en livre, ou la liste de
  courses avec les recettes, le tout avec les images des plats. **Imprimer** ouvre la boîte de dialogue
  d'impression.
- **Vers mon téléphone** envoie la recette ou la liste de courses comme notification via le service
  notify que vous choisissez (par défaut : les réglages de notification du jardin sous Paramètres ›
  Notifications).
- **Liste de tâches** (vue liste de courses) ajoute les éléments à une liste de tâches Home Assistant de
  votre choix, p. ex. la liste de courses ; les éléments déjà ouverts dessus sont ignorés, et cela suit
  vos propres droits Home Assistant sur cette liste.

**Assist ou la voix fonctionnent-ils avec la cuisine ?**
Non : les phrases Assist qu'installe Hortulus couvrent six questions sur le jardin (tâches du jour, en
retard, récolte, serre, eau, gel), aucune sur les recettes. L'export vers une liste de tâches est une
liste de tâches Home Assistant ordinaire, tout ce que vous faites ailleurs avec cette liste (tableaux de
bord, automatisations) fonctionne donc avec elle. Les fonctions de cuisine ne sont disponibles que dans
le panneau.

**Rien n'est « prêt à cueillir » – puis-je quand même cuisiner ?**
Oui. Utilisez **Aussi du jardin ou de la cave** pour ajouter des légumes, aromatiques ou fruits que vous
avez encore ; les plats suivent. Ce qui compte comme prêt vient de votre plan et des périodes de récolte
de ses cultures.

## Enregistrements

**Puis-je tenir un journal des récoltes et un carnet de jardin ?**
Oui, dans l'onglet **Journal** : un **carnet** avec photos par planche, par culture ou pour tout le
jardin ; un **journal des récoltes** en kg et en pièces (aussi depuis la fenêtre de tâche quand vous
cochez une récolte, ou depuis le planificateur) avec totaux par culture ; la **boîte à graines** avec
années limites par famille de cultures et les cultures de votre plan qui ont encore besoin de graines ;
la consommation d'**eau** d'après un compteur d'eau du jardin et le niveau du tonneau de pluie ; et
**Cuisine** (voir plus bas). Après une saison, le remplissage auto utilise vos propres kg/m² à la place
de la moyenne de la base. **Récoltes au fil des années** montre le total par saison avec la meilleure
année mise en avant et une rangée de barres par culture.

**Comment enregistrer rapidement une récolte ?**
**Aujourd'hui** propose la **Récolte rapide** : touchez une culture prête, additionnez le poids avec les
gros boutons et enregistrez. Pour un tag NFC ou un bouton : l'action `garden_manager.log_harvest` avec
`plant: Tomato` et `kg: 0.5` retrouve la culture dans votre jardin (ajoutez `bed:` quand la plante
pousse dans plusieurs planches).

**Puis-je ajouter rapidement une note ou une photo à une culture ?**
Oui, dans la fenêtre d'une culture ou d'une planche (planificateur ou Cultures) sous **Note ou photo**.
Sur téléphone, *Photo* ouvre l'appareil photo. La note va dans le journal avec cette culture ; les
dernières notes s'affichent dessous. Les photos d'une culture ou d'une planche forment aussi une
**chronologie** de la première image à la dernière.

**Puis-je voir ce qui a changé, et l'annuler ?**
Oui. **Journal → Journal système** liste chaque modification : ce que vous ou quelqu'un de votre ménage
a fait dans le panneau, ce qu'une automatisation ou une action a changé, et ce qu'Hortulus a fait
lui-même (création ou clôture de tâches, nettoyage). Chaque entrée montre quand, qui et quoi (p. ex.
*Retiré – Culture : Tomate (planche de la serre, saison 2027)*). **Annuler** rétablit l'état d'avant cette
action. Si un élément a été modifié depuis, Hortulus demande avant d'écarter cette modification
ultérieure ; une annulation qui laisserait une culture sans sa planche est refusée. L'annulation est
elle aussi enregistrée, et peut donc être annulée. Les 500 dernières entrées sont conservées (la
suppression d'un plan, les dépenses et les entrées du livre de cuisine figurent aussi dans le journal).

**Existe-t-il un aperçu de la saison ?**
**Journal → Bilan de saison** (et le **Passage à la nouvelle année**) montre par culture ce que vous avez
planté et récolté par rapport à l'attendu, ce qui a raté, les problèmes du carnet et l'eau apportée.
Téléchargez-le en Markdown.

**Puis-je imprimer mon année de jardin sous forme de livre ?**
Oui : **Imprimer → Livre de saison** (ou *Livre de saison (PDF)* dans le bilan de saison). Vous obtenez
un livre entièrement rédigé : couverture, sommaire, introduction, un chapitre par mois avec ce qui a été
semé, planté et fait, votre journal avec vos propres photos, la récolte, l'eau et la météo, puis
l'année en chiffres, un glossaire, un colophon et une quatrième de couverture. Choisissez A5 et imprimez
en recto verso (retournement sur le bord long) ; le nombre de pages est toujours un multiple de quatre,
si bien qu'il se plie en cahiers pour la reliure. Les photos viennent de votre carnet (images Home
Assistant), redressées et réduites. Il est disponible en néerlandais, en anglais et en français.

**Combien mon potager me fait-il économiser ?**
*Journal → Cuisine* montre la récolte aux prix du magasin à côté de vos dépenses (graines, plants,
compost, outils …) et de l'eau du compteur. Ajustez les prix par culture et le prix de l'eau sous
*Paramètres → Coûts*. Le même onglet montre ce qui est prêt à cueillir, avec des conseils de
conservation, et un avertissement quand vous cueillez plus que vous ne mangez.

**Puis-je voir si l'arrosage sert à quelque chose ?**
Oui : **Journal → Eau → Arrosage par planche** montre l'humidité du sol (d'après l'historique de Home
Assistant), l'eau apportée par Hortulus et la pluie (capteur de pluie) par planche sur 7, 14 ou 30
jours. Le même graphique figure dans la fenêtre d'une planche du planificateur.

**Les graines manquantes peuvent-elles aller sur ma liste de courses ?**
**Cultures → Semences** montre par culture combien de graines acheter. **Ajouter … à la liste** met ce
qui manque sur une liste de tâches Home Assistant (p. ex. la liste de courses) ; les éléments déjà
présents ne sont pas ajoutés deux fois, et cela suit vos propres droits Home Assistant sur cette liste.

**Où sont mes anciennes saisons ?**
Les saisons plus anciennes que la saison en cours et les deux précédentes passent dans un fichier
d'archive séparé pour qu'Hortulus reste rapide après des années d'utilisation. Rien n'est perdu : la
rotation des cultures en tient toujours compte, et le bilan de saison et le livre de saison peuvent
encore les ouvrir (choisissez l'année). Une saison ne quitte le fichier du jardin qu'après que l'archive
qui la contient a été relue sur le disque.

**Puis-je exporter ou importer tout mon jardin ?**
Oui, le plan voyage dans un seul fichier. **Paramètres › Général › Importation et exportation**
télécharge du JSON ou du YAML ; **Importer un plan** dans le Planificateur lit un tel fichier, soit
**fusionné** avec le plan actuel, soit en le **remplaçant** (les actions `garden_manager.export_plan` et
`import_plan` font la même chose). Le fichier contient zones, planches, éléments du jardin, les plans de
jardin de chaque saison, cultures, vos propres plantes et modifications de plantes, historique de
rotation, plans mis de côté et, si vous le cochez, les tâches. Il ne contient *pas* le carnet, le journal
des récoltes, les photos, les dépenses ni le livre de cuisine. Un fichier qu'Hortulus refuse (mauvais
format ou valeurs invalides) ne change rien. Pour une copie complète de tout, utilisez une sauvegarde
Home Assistant. Un fichier produit par un autre Hortulus (un autre Home Assistant ou le site web)
s'importe de la même façon.

**D'où viennent les photos de plantes ?**
Chaque plante, suggestion et chapitre du manuel a une illustration dessinée par Hortulus lui-même
(fonctionne hors ligne). En plus, votre navigateur affiche une photo de Wikipédia, recherchée par nom
scientifique, sous une licence qu'Hortulus peut respecter (CC BY, CC BY‑SA, CC0, domaine public), avec
crédit du créateur et de la licence et lien vers la source. Votre navigateur la récupère directement sur
Wikipédia ; Home Assistant lui-même ne fait aucune connexion. Pour la désactiver, utilisez **Paramètres
→ Affichage** (par navigateur).

## Entités, voix et tableaux de bord

**Les entités d'une nouvelle planche n'apparaissent pas.**
Elles sont ajoutées dès que le plan est enregistré (surveillez l'indicateur *Enregistré* dans la barre
d'outils du planificateur). Rechargez l'intégration si vous avez modifié `.storage` à la main (ne le
faites pas).

**Les identifiants d'entités sont en néerlandais / anglais.**
Les identifiants sont générés dans la langue système de HA au moment de la création. Renommez-les dans
Paramètres → Entités ; les identifiants uniques sont stables.

**Le capteur de gel affiche `unknown`.**
L'entité météo est indisponible ou ne fournit pas de prévision. Vérifiez Paramètres → Appareils et
services → Hortulus → *Télécharger les diagnostics* → `weather.error`.

**Comment utiliser les commandes vocales ?**
Lancez une fois **Paramètres › Ménage et voix › Installer les phrases vocales** (ou l'action
`garden_manager.install_voice_sentences`). Demandez ensuite à Assist, par exemple, « qu'est-ce que je
dois faire aujourd'hui au jardin ? », « qu'est-ce que je peux récolter aujourd'hui ? », « quelle est la
température de la serre ? » ou « va-t-il geler cette nuit ? ». Les phrases existent en anglais, en
néerlandais et en français. Voir la [référence des entités](ENTITES.md#voix-assist).

**Existe-t-il une carte pour le tableau de bord ?**
Oui : `type: custom:hortulus-tasks-card` est chargée automatiquement. Elle montre les tâches du jour et
en retard avec une case à cocher, l'arrosage du jour, un arrosage en cours, une vanne restée ouverte
(avec *Fermer*) et les fuites, plus un dicton et une ligne climat ; `days`, `assignee`, `max`, `garden`,
`climate` et `slogan` sont facultatifs. Voir la
[référence des entités](ENTITES.md#carte-lovelace).

**Puis-je automatiser Hortulus ?**
Oui : le README renvoie vers des blueprints prêts à l'emploi (alerte de gel sur une lampe, enregistrer
une récolte avec un bouton ou un tag NFC, arroser une planche sèche au bon moment, annoncer les travaux
urgents du jardin). `run_irrigation_plan` accepte `only_if_needed` pour que votre automatisation choisisse
le moment alors qu'Hortulus décide encore si la planche a besoin d'eau.

**Mon capteur d'humidité est parfois hors ligne – le conseil est-il toujours juste ?**
Oui. Un capteur qui n'a rien transmis depuis plus longtemps que les *minutes avant qu'un capteur soit
obsolète* (360 par défaut, à régler dans les Réglages avancés de l'intégration) est traité comme absent,
et non comme sa dernière valeur, et une alerte vous dit de quel capteur il s'agit. Chaque jour, Hortulus
règle aussi le bilan hydrique d'une planche équipée d'un capteur d'après la mesure et apprend à quelle
vitesse cette planche se dessèche vraiment (p. ex. « 15 % plus rapide que le modèle », sur le tableau de
bord). Quand le capteur décroche, il continue avec ce qu'il a appris.

## Impression, manuel, remplissage auto

**Comment mettre un plan sur mon reMarkable Paper Pro ?**
Onglet Imprimer → papier *reMarkable Paper Pro*, couleurs *E-ink (clair + motifs)* → *Télécharger le PDF*,
puis faites glisser le fichier dans l'application reMarkable (ou utilisez *Send to reMarkable* par
e-mail). La page a exactement la taille de l'écran ; la zone de notes en grille de points et les teintes
claires laissent de la place pour dessiner. Pour une liste de contrôle hebdomadaire, automatisez
`garden_manager.export_pdf` avec `document: tasks` et récupérez le fichier à partir du lien signé dans
la réponse du service. Les PDF sont privés : ils sont écrits dans `/config/hortulus/exports/` et servis
via un lien authentifié valable 7 jours.

**Pourquoi les planches ont-elles des motifs à l'impression ?**
En mode e-ink et niveaux de gris, chaque famille de plantes reçoit aussi un motif hachuré, si bien que
le plan reste lisible sans couleur et sur une imprimante monochrome.

**Que puis-je imprimer ?**
Plan du jardin, plan de serre ou de zone, fiches de planches, liste de contrôle des tâches, tableau de
saison, plan annuel, feuille de planification vierge, fiches de plantes et livre de saison, sur A4, A3,
A5, Letter ou reMarkable Paper Pro, en couleur, e-ink ou niveaux de gris. Le livre de cuisine et la liste
de courses ont leurs propres PDF dans l'onglet Cuisine.

**Le remplissage auto a mis mes tomates dehors alors que j'ai une serre.**
Des tomates ont poussé dans cette planche de serre la saison dernière : la planche est donc exclue pour
les solanacées par la règle de rotation. Ajoutez une autre planche de serre, ou déplacez-les quand même –
le planificateur affichera l'avertissement de rotation.

**Le remplissage auto ne place presque rien. Pourquoi ?**
Le plus souvent, il est simplement trop tard dans la saison : en octobre, la période de semis ou de
plantation de presque toutes les cultures est passée pour cette année. La fenêtre du remplissage auto
dit pour chaque plante pourquoi elle n'a pas été placée (trop tard, mauvais type de zone, pas sous verre,
gel avant la récolte, rotation des cultures, mauvais voisin, plus de place, planche trop étroite pour ses
marges) et propose de remplir plutôt la **saison suivante**. Si cette saison n'a pas encore de plan de
jardin, Hortulus remplit sur le plan le plus récent et le copie quand vous appliquez. Pour une seule
plante, **Analyse → Pourquoi pas ?** montre par planche si elle convient et, sinon, pourquoi – avec les
mêmes règles que le glisser-déposer et le remplissage auto.

**Le remplissage auto a ignoré des cultures.**
Les raisons sont listées sous *Non placées* : pas de planche adaptée (rotation, saison sans gel trop
courte en plein air, ne convient pas sous verre), pas de place, ou le budget hebdomadaire de temps / d'eau
est épuisé. Augmentez le budget, sélectionnez plus de planches ou cochez *remplacer*.

**Pourquoi la date de récolte attendue a-t-elle bougé ?**
Avec un capteur de température (ou l'entité météo), Hortulus enregistre les températures minimales et
maximales quotidiennes et additionne les degrés-jours depuis la plantation ; une période chaude avance la
récolte, une période froide la retarde (trois semaines au plus dans chaque sens). Sous serre, ce sont les
degrés-jours du capteur d'air de la serre qui comptent. Des jours de chaleur ou une série de jours sombres
retardent les cultures fruitières, des jours froids sous le minimum de la culture retardent les autres ;
la fiche de la culture indique le retard et pourquoi. Voir aussi
[Hortulus tient-il compte de la météo pour la croissance ?](#météo-et-historique-du-climat).

## Sécurité de l'irrigation

**L'arrosage automatique peut-il inonder mon jardin ?**
Chaque vanne a une durée maximale, une seule vanne tourne à la fois, et la pompe ne tourne que tant
qu'une vanne qui a indiqué ouverte est ouverte. Quand un arrosage se termine, échoue ou est arrêté
(bouton, service, redémarrage de Home Assistant), toutes les vannes ouvertes et la pompe sont éteintes –
la pompe d'abord, puis la vanne.

**Que se passe-t-il si une vanne ou la pompe cesse de répondre ?**
- Une vanne qui n'indique jamais ouverte termine l'arrosage sans comptabiliser d'eau ; avec une pompe, la
  pompe n'est jamais lancée contre elle.
- Si une vanne alimentée par pompe ne répond plus du tout (unknown ou unavailable) pendant **60
  secondes**, l'arrosage s'arrête aussitôt et la pompe s'arrête, car Hortulus ne peut plus s'assurer que
  la pompe a une sortie ouverte. Le problème est signalé dans le journal système et par une
  notification.
- Une vanne qui se ferme toute seule au milieu d'un arrosage termine l'arrosage, comptabilise le temps
  réel et est signalée.
- Une vanne ou une pompe qui reste ouverte bien plus longtemps que n'importe quel arrosage (durée max. +
  10 minutes) alors qu'Hortulus n'arrose pas est signalée par une notification et un bandeau rouge sur
  **Aujourd'hui** avec **Fermer la vanne**. Après chaque arrosage, Hortulus vérifie aussi que la vanne
  indique fermée.

**Comment tester ma vanne ou ma pompe ?**
Dans **Paramètres → Matériel d'irrigation**, chaque vanne de planche a **Tester (5 s)**. Hortulus ouvre la
vanne pendant 5 secondes (avec la pompe, dans l'ordre sûr ; la pompe est testée ainsi, jamais seule), la
referme et vous dit si la vanne a indiqué ouverte puis fermée. Enregistrez d'abord les paramètres : seules
les vannes reliées sont testées. *Arrêter* ou *Fermer* met fin à un test en cours.

**Ma pompe est un robinet connecté (vanne) – est-ce que ça marche ?**
Oui. Dans **Paramètres → Matériel d'irrigation**, les sélecteurs de pompe et de vanne de planche listent
aussi les entités `valve.*` et `input_boolean.*`. Hortulus ouvre et ferme une `valve` avec
`valve.open_valve` / `valve.close_valve`, dans le même ordre sûr (vanne ouverte → pompe en marche …
pompe arrêtée → vanne fermée). Les robinets connectés dotés de leur propre minuterie (comme un réglage
*Watering Duration*) se ferment seuls après ce temps : indiquez-le sous **Paramètres › Planches et
capteurs › Minuterie de la vanne (min)** et les arrosages plus longs sont découpés en ouvertures qui
restent en dessous. Sinon, réglez-la plus longue que la durée max. d'Hortulus, faute de quoi le robinet
s'arrête plus tôt que prévu.

**Hortulus peut-il signaler une fuite ?**
Avec un compteur d'eau (Paramètres › Compteur d'eau et tonneau de pluie) : quand le compteur compte de
l'eau (au moins 5 litres) pendant 15 minutes alors que toutes les vannes d'Hortulus sont fermées et que
rien ne tourne, vous recevez une notification et un bandeau rouge sur Aujourd'hui (et sur l'écran
mural) ; il disparaît de lui-même quand l'eau s'arrête. Vous pouvez désactiver les alertes de fuite au
même endroit. Pendant un arrosage, Hortulus lit aussi le compteur : le journal montre les litres réels et
chaque planche apprend son débit réel, utilisé quand vous n'indiquez aucun débit vous-même.

**Pourquoi n'a-t-il pas arrosé ce matin ?**
Regardez `binary_sensor.hortulus_irrigation_frost_lockout` et lancez
`garden_manager.run_irrigation_plan` avec `dry_run: true` : la réponse liste chaque planche ignorée avec
sa raison (blocage en cas de gel, pluie attendue, pas de vanne, pas de débit, pas nécessaire, mode non
*automatique*). Le blocage en cas de gel regarde les 12 prochaines heures : une nuit plus froide plus
tard dans la prévision ne masque donc pas le gel de ce soir.

**Pourquoi l'arrosage automatique démarre-t-il plus tard que l'heure de début ?**
Parce qu'un capteur de surplus solaire est défini sous **Paramètres → Matériel d'irrigation** (extra
*Arrosage économe*) : l'arrosage attend que le surplus atteigne *démarrer à partir de* (500 W par
défaut), mais jamais au-delà de *attendre au plus tard jusqu'à* (11:00 par défaut) – il arrose alors
quand même. En attendant, **Aujourd'hui** affiche *Attend un surplus solaire pour arroser*. Sans
capteur ou sans valeur exploitable, pas d'attente ; videz le champ du capteur ou désactivez l'extra
pour démarrer de nouveau à l'heure.

## Dépannage

**Où trouver les erreurs et les comportements inattendus ?**
Dans l'onglet **Analyse** (Gestion) :

- **Contrôle** compare les plans de jardin, les cultures et les saisons et signale ce qui ne colle pas :
  une année avec des cultures mais sans plan de jardin, des cultures dont la planche n'est pas sur le plan
  (invisibles dans le planificateur), des planches hors de leur zone, des cultures superposées ou
  planifiées trop tard, un passage à la nouvelle année oublié …, avec un bouton vers le bon endroit. Le
  nombre sur l'onglet indique combien de problèmes il y a en ce moment ; il est recalculé après chaque
  modification.
- **Pourquoi pas ?** explique pourquoi une plante ne convient pas quelque part.
- **Erreurs** liste chaque action qu'Hortulus a refusée, avec la raison.
- **Comparer** montre la différence entre deux plans.
- **Journal système** est le même journal que **Journal → Journal système**.

**Hortulus peut-il corriger lui-même les problèmes ?**
Plusieurs constats de **Analyse → Contrôle** ont un bouton : copier un plan de jardin manquant, remettre
dans le plan ou dans leur planche des cultures qui en sont sorties, déplacer une planche dans sa zone, ou
reporter à cette année une vivace oubliée. Chaque correction figure dans le journal système et peut être
annulée. **Exporter le diagnostic** donne un fichier unique (contrôle, erreurs, journal récent) à joindre
quand vous signalez un problème.

| Symptôme | À vérifier |
|---|---|
| Le panneau affiche « Hortulus n'est pas encore configuré » | L'intégration n'est pas chargée ; voyez *Paramètres → Système → Journaux* pour `garden_manager`. |
| Le panneau est vide après une mise à jour | Actualisation forcée (l'URL du module est hachée selon le contenu, mais certains proxys mettent en cache de façon agressive). |
| « Modifié ailleurs - rechargé » | Quelqu'un (ou une importation / un service) a modifié le plan pendant que vous éditiez ; votre dernière seconde de modifications non enregistrées a été écartée. |
| Les paramètres sont grisés | Modifier le plan, les plantes ou le matériel exige un administrateur Home Assistant. |
| Durée d'arrosage manquante | Indiquez un débit (L/min) pour la planche dans Paramètres → Planches et capteurs (ou reliez un compteur d'eau pour qu'Hortulus l'apprenne). |
| Alerte de capteur obsolète | Le capteur n'a rien transmis depuis plus longtemps que les *minutes avant qu'un capteur soit obsolète* (options → réglages avancés). |
| Tâches dans la mauvaise langue | Options → Réglages avancés → *Langue des tâches générées*. |
| Rien sous « Prêt au jardin » | Aucune culture n'est encore prête à cueillir ; ajoutez ce que vous avez sous *Aussi du jardin ou de la cave*. |
| Pas de radar des pluies | Pas de caméra radar dans Home Assistant et le pays n'est ni NL ni BE, ou l'entité météo n'est pas définie. |
| Couleurs ou thème bizarres sur iPhone | Mettez à jour l'intégration (la 1.7.1 définit les thèmes en couleurs en ligne que tous les navigateurs appliquent d'un coup) et rechargez l'application. |
| Bandeau de fuite ou de « vanne restée ouverte » | Vérifiez la vanne, puis *Fermer la vanne* sur le bandeau ; voir Sécurité de l'irrigation. |

Activer la journalisation de débogage :

```yaml
logger:
  logs:
    custom_components.garden_manager: debug
```

Joignez le téléchargement des **diagnostics** (il masque les services notify, les haut-parleurs, la
latitude et les photos) quand vous ouvrez un ticket.
