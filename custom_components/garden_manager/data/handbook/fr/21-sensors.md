# Choisir et acheter des capteurs

Hortulus fonctionne sans le moindre capteur : il s'appuie alors sur les prévisions et un bilan hydrique. Mais quelques capteurs bien choisis rendent les conseils beaucoup plus précis - surtout l'humidité du sol et la température de la serre. Ce chapitre vous aide à les choisir, les acheter et les connecter.

## Qu'est-ce qui rapporte le plus ?

| Priorité | Capteur | Pourquoi | À connecter dans Hortulus |
|---|---|---|---|
| 1 | **Température de l'air de la serre** (idéalement avec humidité) | aération, ombrage, gel, risque de maladie | Zone › capteurs › température / humidité de l'air |
| 2 | **Humidité du sol par planche** | arroser selon la mesure plutôt qu'au jugé | Planche › capteurs › humidité du sol |
| 3 | **Température du sol** | moment du semis, croissance (degrés-jours) | Planche › capteurs › température du sol |
| 4 | **Pluviomètre** ou station météo | pluie réellement mesurée, économie d'eau | Paramètres › pluie |
| 5 | **Température extérieure** à hauteur des plantes (environ 50 cm) | alertes de gel plus précises | Paramètres › température extérieure |
| Extra | Humectation foliaire, lumière (lux/PAR), CE / NPK | risque fongique, cumul de lumière, fertilisation | Zone / planche › avancé |
| Actionneur | Vanne, pompe, ouvre-fenêtre, écran d'ombrage | arrosage et aération automatiques | Planche › arrosage, Zone › fenêtre / ombrage |

## Les types, avantages et inconvénients

### Zigbee (via Zigbee2MQTT ou ZHA)
Bon marché, piles qui durent 1-2 ans, réseau maillé fiable. Il vous faut une clé Zigbee (p. ex. SONOFF ZBDongle, Home Assistant Connect ZBT-1). **Astuce :** un appareil alimenté sur secteur (prise connectée) dans l'abri ou la serre sert de répéteur et étend la portée.
- Les capteurs d'humidité du sol de la famille « Tuya Zigbee soil moisture » mesurent l'humidité et la température ; choisissez un modèle **capacitif** (pas de broches qui se corrodent).
- Capteurs de température/humidité (Aqara, SONOFF SNZB-02, Tuya) - pour la serre, prenez-en un avec écran ou sonde externe et placez-le **à l'ombre** (sinon vous mesurez le soleil, pas l'air).

### Ecowitt (433/868 MHz avec passerelle)
Très populaire chez les jardiniers : le capteur d'humidité du sol **WH51** (pile AA, environ un an, longue portée), une sonde de température du sol (WN34), l'humectation foliaire (WN35), des pluviomètres et des stations météo complètes. La passerelle GW1100/GW2000 se connecte localement via l'**intégration Ecowitt** de Home Assistant. Longue portée jusqu'au fond du jardin.

### Bluetooth (BLE)
Le célèbre capteur de plantes **Mi Flora / Flower Care** mesure l'humidité, la température, la lumière et la conductivité. Bon marché mais de courte portée : il faut un **proxy Bluetooth ESPHome** (un ESP32 de quelques euros) à proximité.

### Wi-Fi et ESPHome (à construire soi-même)
Un ESP32 avec des capteurs d'humidité du sol capacitifs (v1.2), un thermomètre de sol DS18B20 ou un BME280/SHT31 pour l'air. Bon marché et flexible, mais le Wi-Fi au jardin demande de l'alimentation (secteur, ou petit panneau solaire + veille profonde). Voir le site d'ESPHome pour des exemples. Étalonnez toujours l'humidité du sol : mesurez en sol sec et en sol détrempé et utilisez ces valeurs comme 0 % et 100 %.

### Vannes, pompes et ouvre-fenêtres
- **Vannes :** programmateurs d'arrosage Zigbee ou Wi-Fi (Tuya/Sonoff/LinkTap), le système Gardena smart (intégration propre), ou une électrovanne 12/24 V sur un relais (Shelly, ESPHome).
- **Pompe :** une prise connectée ou un relais (Shelly) - configurez le verrouillage de la pompe dans Hortulus (la pompe ne tourne que lorsqu'une vanne est ouverte).
- **Serre :** les ouvre-fenêtres à vérin de cire n'ont pas besoin d'électricité ; pour une commande depuis Home Assistant, utilisez un vérin linéaire sur relais ou un ventilateur connecté.

## Conseils pour trouver de bons capteurs

1. **Vérifiez d'abord que Home Assistant le prend en charge :** la liste des intégrations sur le site de Home Assistant, la base d'appareils de Zigbee2MQTT (« supported devices ») et la liste d'appareils ESPHome. Ce qui y figure fonctionne en général immédiatement.
2. **Termes de recherche :** « capteur humidité sol zigbee », « capacitive soil moisture », « Ecowitt WH51 », « capteur température humidité zigbee extérieur », « vanne d'arrosage zigbee », « LinkTap ».
3. **Étanchéité :** vérifiez l'indice IP - IP65 ou mieux à l'extérieur, IP67 pour les sondes enterrées. Protégez l'électronique du soleil direct.
4. **Piles :** des AA ou AAA se remplacent plus facilement que des piles bouton ; les piles au lithium tiennent plus longtemps par temps de gel.
5. **Portée :** testez avant d'acheter si le Zigbee/Wi-Fi atteint le fond du jardin ; le 433/868 MHz (Ecowitt) et le LoRa portent bien plus loin.
6. **Local :** préférez les appareils qui fonctionnent en local (Zigbee, Ecowitt, ESPHome) - pas de cloud, pas d'abonnement, ils continuent de fonctionner si le fabricant arrête.
7. **Où acheter :** boutiques en ligne spécialisées en domotique, grandes places de marché en ligne (moins cher mais livraison plus lente), magasins de bricolage et jardineries (surtout Gardena). Lisez les avis sur le forum Home Assistant et sur Reddit (r/homeassistant).
8. **Commencez petit :** un thermomètre de serre et un capteur d'humidité du sol dans votre planche principale. Étendez quand vous voyez comment vous les utilisez.

## Emplacement et entretien

- **Humidité du sol :** dans la zone racinaire (10-15 cm de profondeur), entre les plantes, pas juste à côté d'un goutteur. Un capteur par planche avec la même culture et le même sol suffit.
- **Thermomètre de serre :** à hauteur des plantes, à l'ombre (derrière un pot ou dans un abri anti-rayonnement), pas contre la vitre.
- **Température extérieure :** à 50 cm dans un abri anti-rayonnement (un pot de fleurs blanc retourné fait l'affaire) - vous mesurez ainsi le gel que ressentent vos plantes.
- **Pluviomètre :** à l'écart des arbres et des toits, de niveau.
- Retirez les sondes de sol avant de bêcher ou de passer la motobineuse, et avant l'hiver si elles ne résistent pas au gel. Remplacez les piles au printemps.

## Connexion à Hortulus

Ouvrez **Paramètres** (capteurs extérieurs) ou sélectionnez une zone ou une planche dans le **planificateur** et choisissez le capteur dans le champ. Hortulus affiche immédiatement la valeur, signale comme « obsolètes » les capteurs muets depuis trop longtemps et se rabat alors sur le bilan hydrique et les prévisions.
