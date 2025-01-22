'use client'; // Mark this as a Client Component
import { Map, Marker } from 'pigeon-maps';
const locations = [
  {
      "title": "Ariège",
      "link": "https://www.youtube.com/watch?v=aIpaeTkgR_0",
      "type": "100 places to see",
      "description": "Journeys through time",
      "coordinates": [
          42.965,
          1.6
      ]
  },
  {
      "title": "Anjou",
      "link": "https://www.youtube.com/watch?v=zi3owFrI67E",
      "type": "1000 Countries in one",
      "description": "Crossing the longest river in France",
      "coordinates": [
          47.468,
          -0.554
      ]
  },
  {
      "title": "Loire-Atlantique",
      "link": "https://www.youtube.com/watch?v=kXB--PfQ8lM",
      "type": "The 100 places you must see",
      "description": "A medieval past",
      "coordinates": [
          47.357,
          -1.706
      ]
  },
  {
      "title": "Cantal",
      "link": "https://www.youtube.com/watch?v=v3Lfno0ZANU",
      "type": "The 100 places you must see",
      "description": "Massifs and grandiose landscapes",
      "coordinates": [
          45.049,
          2.667
      ]
  },
  {
      "title": "Mâconnais, Southern Burgundy",
      "link": "https://www.youtube.com/watch?v=oMpLrQmTlEo",
      "type": "1000 Countries in one",
      "description": "Land of wines and hedonism",
      "coordinates": [
          46.3,
          4.833
      ]
  },
  {
      "title": "Hérault",
      "link": "https://www.youtube.com/watch?v=TmaRpOhn2i8",
      "type": "100 places to see",
      "description": "Heading for the Mediterranean",
      "coordinates": [
          43.68,
          3.36
      ]
  },
  {
      "title": "Tarn",
      "link": "https://www.youtube.com/watch?v=UGLsOh7nmP8",
      "type": "The 100 places you must see",
      "description": "Discovering the Midi Rose",
      "coordinates": [
          43.929,
          2.148
      ]
  },
  {
      "title": "Les Landes",
      "link": "https://www.youtube.com/watch?v=BC7hiTsqDvo",
      "type": "100 Places to See",
      "description": "A Surfers' Paradise",
      "coordinates": [
          44,
          -0.833
      ]
  },
  {
      "title": "Ille-et-Vilaine",
      "link": "https://www.youtube.com/watch?v=8dAsTxvWvPE",
      "type": "The 100 places you must see",
      "description": "In Upper Brittany",
      "coordinates": [
          48.176,
          -1.683
      ]
  },
  {
      "title": "Alpes-Maritimes",
      "link": "https://www.youtube.com/watch?v=qGAqAwuwBBs",
      "type": "The 100 places you must see",
      "description": "Riches of the land",
      "coordinates": [
          43.92,
          7.25
      ]
  },
  {
      "title": "🇫🇷 Discover FRANCE’s Finest National Park ",
      "link": "https://www.youtube.com/watch?v=UHWbMKbqVZI",
      "description": "Where Wilderness Meets Heritage! 🌿"
  },
  {
      "title": "Langres",
      "link": "https://www.youtube.com/watch?v=IMgZXm0W18Q",
      "type": "1000 Countries in one",
      "description": "The largest fortified enclosure in Europe",
      "coordinates": [
          47.85,
          5.333
      ]
  },
  {
      "title": "La Seine Maritime",
      "link": "https://www.youtube.com/watch?v=U95npmzDh0s",
      "type": "The 100 places you must see",
      "description": "Between land and sea",
      "coordinates": [
          49.5,
          0.5
      ]
  },
  {
      "title": "Brive-la-Gaillarde",
      "link": "https://www.youtube.com/watch?v=OyPVwubBg-0",
      "type": "1000 Countries in one",
      "description": "The vibrant heart of Corrèze",
      "coordinates": [
          45.158,
          1.533
      ]
  },
  {
      "title": "Haute Savoie",
      "link": "https://www.youtube.com/watch?v=IvtxzeG6uGA",
      "type": "The 100 places you must see",
      "description": "A winter getaway",
      "coordinates": [
          46,
          6.5
      ]
  },
  {
      "title": "The Alps, from Maurienne to Mont Blanc",
      "link": "https://www.youtube.com/watch?v=O_sz2Y8IHlQ",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          45.5,
          6.5
      ]
  },
  {
      "title": "Reunion Island 🐠",
      "link": "https://www.youtube.com/watch?v=takYKxyrtI4",
      "type": "1000 Countries in One",
      "description": "Heading for the island of sensations 🐚 🌴"
  },
  {
      "title": "Aveyron",
      "link": "https://www.youtube.com/watch?v=ERbo9O_FfDY",
      "type": "The 100 places you must see",
      "description": "A land of history",
      "coordinates": [
          44.25,
          2.667
      ]
  },
  {
      "title": "Berry, from Bourges to the banks of the Allier",
      "link": "https://www.youtube.com/watch?v=-BCIqLhE4Uw",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          47.083,
          2.4
      ]
  },
  {
      "title": "Brittany",
      "link": "https://www.youtube.com/watch?v=pkewFSIQ5r0",
      "type": "1000 Countries in one",
      "description": "Secret spots by the sea",
      "coordinates": [
          48.202,
          -2.932
      ]
  },
  {
      "title": "Bas-Rhin",
      "link": "https://www.youtube.com/watch?v=9OyutsZr6NU",
      "type": "The 100 places you must see",
      "description": "Old towns of Alsace",
      "coordinates": [
          48.583,
          7.75
      ]
  },
  {
      "title": "Vosges",
      "link": "https://www.youtube.com/watch?v=cncq-EgYXX0",
      "type": "100 Places to See",
      "description": "Green Peaks and Valleys",
      "coordinates": [
          48.167,
          6.417
      ]
  },
  {
      "title": "Martinique 🌺",
      "link": "https://www.youtube.com/watch?v=drbrb-PkreQ",
      "type": "1000 Countries in one",
      "description": "The island of flowers, jewel of the Caribbean"
  },
  {
      "title": "Anjou, from Saumur to the meanders of the Loire",
      "link": "https://www.youtube.com/watch?v=nV9jkAliJYA",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          47.259,
          -0.076
      ]
  },
  {
      "title": "Lot-et-Garonne",
      "link": "https://www.youtube.com/watch?v=oGbKTuA8an0",
      "type": "The 100 places you must see",
      "description": "In the heart of the bastides",
      "coordinates": [
          44.333,
          0.5
      ]
  },
  {
      "title": "Gironde",
      "link": "https://www.youtube.com/watch?v=nB6BvNXQEQ8",
      "type": "The 100 places you must see",
      "description": "Nature, history and shores",
      "coordinates": [
          44.833,
          -0.667
      ]
  },
  {
      "title": "The Tricolor Périgord",
      "link": "https://www.youtube.com/watch?v=Uj78fIpQWcc",
      "type": "The 100 places you must see",
      "description": "Jewels of the Dordogne",
      "coordinates": [
          45.183,
          0.717
      ]
  },
  {
      "title": "Quercy",
      "link": "https://www.youtube.com/watch?v=U2icSyYjSt8",
      "type": "1000 Countries in one",
      "description": "A gourmet getaway",
      "coordinates": [
          44.5,
          1.667
      ]
  },
  {
      "title": "Vendée",
      "link": "https://www.youtube.com/watch?v=JOAtWkxMBzU",
      "type": "The 100 places you must see",
      "description": "Bocages and golden beaches",
      "coordinates": [
          46.667,
          -1.417
      ]
  },
  {
      "title": "Guebwiller",
      "link": "https://www.youtube.com/watch?v=QR5vvyJiTjs",
      "type": "1000 Countries in One",
      "description": "Discovery of the Alsace Vineyards",
      "coordinates": [
          47.908,
          7.213
      ]
  },
  {
      "title": "Vaucluse",
      "link": "https://www.youtube.com/watch?v=xJA7Mpg6W_U",
      "type": "100 Places to See",
      "description": "Hidden Treasures of Provence",
      "coordinates": [
          44,
          5.167
      ]
  },
  {
      "title": "Lorient",
      "link": "https://www.youtube.com/watch?v=NzDboG4CEMw",
      "type": "1000 Countries in One",
      "description": "The City of 6 Ports",
      "coordinates": [
          47.75,
          -3.367
      ]
  },
  {
      "title": "Aude",
      "link": "https://www.youtube.com/watch?v=vDphSrn7co4",
      "type": "100 Places to See",
      "description": "The Soul of the South of France",
      "coordinates": [
          43.083,
          2.25
      ]
  },
  {
      "title": "The Nivernais Country",
      "link": "https://www.youtube.com/watch?v=-e3g3eX_p6A",
      "type": "1000 Countries in One",
      "description": "Canals and Nature Reserves",
      "coordinates": [
          47,
          3.5
      ]
  },
  {
      "title": "Châteauneuf-du-Pape",
      "link": "https://www.youtube.com/watch?v=VhjYf6RBENA",
      "type": "1000 Countries in One",
      "description": "Provence and Grands Crus",
      "coordinates": [
          44.056,
          4.832
      ]
  },
  {
      "title": "The country of Laval",
      "link": "https://www.youtube.com/watch?v=xQt0-lQjpdA",
      "type": "1000 Countries in one",
      "description": "at the heart of our regions",
      "coordinates": [
          48.073,
          -0.768
      ]
  },
  {
      "title": "Visite d'une réserve naturelle",
      "link": "https://www.youtube.com/watch?v=4BXyqtN3GfU",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Touraine",
      "link": "https://www.youtube.com/watch?v=KI8LFjXLmO8",
      "type": "The 100 places you must see",
      "description": "The land of wines and castles",
      "coordinates": [
          47.25,
          0.667
      ]
  },
  {
      "title": "La Camargue n'est plus très loin",
      "link": "https://www.youtube.com/watch?v=9bwyeUHmaVY",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          43.53,
          4.5
      ]
  },
  {
      "title": "The Bay of Somme",
      "link": "https://www.youtube.com/watch?v=Lg2RDQGXOww",
      "type": "1000 Countries in one",
      "description": "The seal estuary 🦭",
      "coordinates": [
          50.2,
          1.633
      ]
  },
  {
      "title": "Balade en Occitanie",
      "link": "https://www.youtube.com/watch?v=u1KFTJapGjc",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          43.6,
          3.883
      ]
  },
  {
      "title": "Seine-et-Marne",
      "link": "https://www.youtube.com/watch?v=oUOHWUQMf1M",
      "type": "The 100 places you must see",
      "description": "Village of Character",
      "coordinates": [
          48.5,
          2.833
      ]
  },
  {
      "title": "Arrivée aux portes de l'Aude",
      "link": "https://www.youtube.com/watch?v=3CaiPUU12_4",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          43.083,
          2.25
      ]
  },
  {
      "title": "The Pays d'Auch",
      "link": "https://www.youtube.com/watch?v=mKFIS0hUQf0",
      "type": "1000 Countries in One",
      "description": "Beating Heart of Gascony",
      "coordinates": [
          43.647,
          0.585
      ]
  },
  {
      "title": "La vallée des tortues",
      "link": "https://www.youtube.com/watch?v=HQAvRImI6QI",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          43,
          6
      ]
  },
  {
      "title": "The Oise, from Chantilly to the forest of Compiègne",
      "link": "https://www.youtube.com/watch?v=WfUu0fI03NM",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          49.2,
          2.583
      ]
  },
  {
      "title": "Escpade à Montalba-le-Château",
      "link": "https://www.youtube.com/watch?v=VBpBYlog13I",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          42.7,
          2.567
      ]
  },
  {
      "title": "Normandy, land of plenty",
      "link": "https://www.youtube.com/watch?v=Tr58m8G8wJU",
      "type": "Documentary Travel in France",
      "description": "",
      "coordinates": [
          49,
          0
      ]
  },
  {
      "title": "Balade à Carcassonne",
      "link": "https://www.youtube.com/watch?v=CX56BDHcO40",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          43.213,
          2.351
      ]
  },
  {
      "title": "Gascony",
      "link": "https://www.youtube.com/watch?v=BZP_1cyPsSo",
      "type": "100 Places to See",
      "description": "Historic Heart of the Southwest",
      "coordinates": [
          43.833,
          0.167
      ]
  },
  {
      "title": "Visite de l'Ariège ",
      "link": "https://www.youtube.com/watch?v=jNo62VT4jBU",
      "type": "Julie Raynaud",
      "description": ""
  },
  {
      "title": "The country of Forcalquier",
      "link": "https://www.youtube.com/watch?v=TERGAOjnhl8",
      "type": "1000 Countries in one",
      "description": "From the alleys to the citadel",
      "coordinates": [
          43.96,
          5.78
      ]
  },
  {
      "title": "Virée à Saint-Bertrand-de-Comminges",
      "link": "https://www.youtube.com/watch?v=8kUSs2X44iA",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          43.027,
          0.571
      ]
  },
  {
      "title": "Bouches-du-Rhône",
      "link": "https://www.youtube.com/watch?v=yjCCURltrc0",
      "type": "The 100 places you must see",
      "description": "Beaches of the South of France",
      "coordinates": [
          43.5,
          5
      ]
  },
  {
      "title": "Sur la trace de nos ancêtres",
      "link": "https://www.youtube.com/watch?v=ggKQiN7PQh4",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Besançon, Doubs",
      "link": "https://www.youtube.com/watch?v=tJOn_w6GVgk",
      "type": "1000 Countries in one",
      "description": "At the heart of our regions",
      "coordinates": [
          47.24,
          6.02
      ]
  },
  {
      "title": "En terre béarnaise",
      "link": "https://www.youtube.com/watch?v=cdaHMaaU7iU",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          43.3,
          -0.5
      ]
  },
  {
      "title": "Un nouveau départ",
      "link": "https://www.youtube.com/watch?v=VhRe_F4psAg",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Arrivée en Belgique",
      "link": "https://www.youtube.com/watch?v=6yhTNmsHBAU",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          50.5,
          4
      ]
  },
  {
      "title": "En route pour les grottes de Han",
      "link": "https://www.youtube.com/watch?v=PRxsOiHBTu4",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          50.125,
          5.189
      ]
  },
  {
      "title": "Le parc naturel des Ardennes",
      "link": "https://www.youtube.com/watch?v=sxy-d_y1SuY",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          49.833,
          4.667
      ]
  },
  {
      "title": "Direction la Meuse",
      "link": "https://www.youtube.com/watch?v=RrYG0OxNgcI",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          49,
          5.5
      ]
  },
  {
      "title": "Le Malzieu Ville",
      "link": "https://www.youtube.com/watch?v=XNlGdT6h_Zc",
      "type": "Occitanie Region",
      "description": "",
      "coordinates": [
          44.855,
          3.331
      ]
  },
  {
      "title": "Rencontre avec un artiste équestre",
      "link": "https://www.youtube.com/watch?v=RHiUxMqhc9Q",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Une escapade à Colmar",
      "link": "https://www.youtube.com/watch?v=hWIL6uvw0hE",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          48.08,
          7.36
      ]
  },
  {
      "title": "Exceptional Gardens to Visit in France",
      "link": "https://www.youtube.com/watch?v=T1BACAJLiVs",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          48.8566,
          2.3522
      ]
  },
  {
      "title": "Traversée du Massif du Jura ",
      "link": "https://www.youtube.com/watch?v=ea8wAtfUijU",
      "type": "Julie Raynaud",
      "description": ""
  },
  {
      "title": "L'amazone qui danse avec les chevaux",
      "link": "https://www.youtube.com/watch?v=WTL6HX0Muro",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Grave",
      "link": "https://www.youtube.com/watch?v=yrv_MNcStLY",
      "type": "Provence-Alpes-Côte d'Azur Region",
      "description": "",
      "coordinates": [
          45.045,
          6.305
      ]
  },
  {
      "title": "Sur la route des fromages",
      "link": "https://www.youtube.com/watch?v=Ey4yNHJAkxE",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "The island of Oléron",
      "link": "https://www.youtube.com/watch?v=OhVJhOKm0u4",
      "description": "Flagship of the most beautiful islands in the Atlantic -Travel Documentary",
      "coordinates": [
          45.933,
          -1.3
      ]
  },
  {
      "title": "À la découverte du Gévaudan à cheval",
      "link": "https://www.youtube.com/watch?v=fsJgynExFjM",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          44.5,
          3.5
      ]
  },
  {
      "title": "Le parc national des Causses du Quercy",
      "link": "https://www.youtube.com/watch?v=2uXifZWdAaM",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          44.5,
          1.667
      ]
  },
  {
      "title": "Puy de Dôme",
      "link": "https://www.youtube.com/watch?v=KjdukbyLRZQ",
      "type": "1000 Countries in one",
      "description": "discovering the Auvergne Volcanoes",
      "coordinates": [
          45.772,
          2.964
      ]
  },
  {
      "title": "Le canal des Deux-Mers à cheval",
      "link": "https://www.youtube.com/watch?v=MswvyaJqhi0",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          43.6,
          1.433
      ]
  },
  {
      "title": "Les vignobles de Barsac",
      "link": "https://www.youtube.com/watch?v=ul_Jkat5xwo",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          44.61,
          -0.315
      ]
  },
  {
      "title": "Ainhoa",
      "link": "https://www.youtube.com/watch?v=q-ZVWbSIzVY",
      "type": "Nouvelle-Aquitaine Region",
      "description": "",
      "coordinates": [
          43.307,
          -1.499
      ]
  },
  {
      "title": "Les Yvelines, a Journey to the Heart of French Heritage",
      "link": "https://www.youtube.com/watch?v=qXhGJmUkZeE",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          48.8,
          1.917
      ]
  },
  {
      "title": "Épinal",
      "link": "https://www.youtube.com/watch?v=59idibDOZ_4",
      "type": "1000 Countries in one",
      "description": "a journey to the heart of the Vosges",
      "coordinates": [
          48.175,
          6.449
      ]
  },
  {
      "title": "Meeting with Tao",
      "link": "https://www.youtube.com/watch?v=IGPpau7zd8o",
      "type": "Julie Raynaud",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le Forez",
      "link": "https://www.youtube.com/watch?v=N95FdBcUKC4",
      "type": "1000 Countries in one",
      "description": "secret escape to the confines of the Loire",
      "coordinates": [
          45.75,
          4.083
      ]
  },
  {
      "title": "Loire Valley, a French treasure",
      "link": "https://www.youtube.com/watch?v=OXO2xdOmi5c",
      "type": "Documentary Travel in France",
      "description": "",
      "coordinates": [
          47.5,
          1
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=EqGnZ8v7Fa0",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=e6eKaBldPEA",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Artois",
      "link": "https://www.youtube.com/watch?v=IJSWjDPaScU",
      "type": "1000 Countries in one-Voyage- Documentary",
      "description": "hiking in the heart of a land steeped in history",
      "coordinates": [
          50.5,
          2.5
      ]
  },
  {
      "title": "Sologne, the setting of 3000 ponds",
      "link": "https://www.youtube.com/watch?v=eb6RPYsc-Ik",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          47.5,
          1.833
      ]
  },
  {
      "title": "Dieulefit",
      "link": "https://www.youtube.com/watch?v=Lm81WvO97n4",
      "type": "Auvergne-Rhône-Alpes Region",
      "description": "",
      "coordinates": [
          44.523,
          5.37
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=3XfgNzBB8U8",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Flanders",
      "link": "https://www.youtube.com/watch?v=nLBeQ8Z104c",
      "type": "1000 Countries in one",
      "description": "the jewel of the North of France",
      "coordinates": [
          50.75,
          2.5
      ]
  },
  {
      "title": "Arcachon",
      "link": "https://www.youtube.com/watch?v=eihaovV0zc4",
      "type": "The 100 places you must see",
      "description": "Between Landais Lakes and Exceptional Residences",
      "coordinates": [
          44.658,
          -1.167
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=lJk-tXqBvzE",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "The Jura, Land of Lakes and Small Mountains",
      "link": "https://www.youtube.com/watch?v=07NTac6jJxs",
      "type": "Documentary Travel in France",
      "description": "",
      "coordinates": [
          46.75,
          6
      ]
  },
  {
      "title": "Oloron",
      "link": "https://www.youtube.com/watch?v=ItKgs2mJ6P8",
      "type": "1000 Countries in one",
      "description": "gateway to the Béarnaise Pyrenees",
      "coordinates": [
          43.194,
          -0.61
      ]
  },
  {
      "title": "The Rhône Valley, Between History and Terroirs",
      "link": "https://www.youtube.com/watch?v=ijZ2FXb16qE",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          45.5,
          4.833
      ]
  },
  {
      "title": "Saül",
      "link": "https://www.youtube.com/watch?v=4STKR1zxQNA",
      "type": "Guyana Region",
      "description": "",
      "coordinates": [
          3.617,
          -53.2
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=dk_OQBugTkA",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "The Creuse",
      "link": "https://www.youtube.com/watch?v=9Ou3zMN0UA8",
      "type": "1000 Countries in one",
      "description": "the valley of painters",
      "coordinates": [
          46.083,
          2
      ]
  },
  {
      "title": "Provence, Splendors of the South of France",
      "link": "https://www.youtube.com/watch?v=mYH7_qwUc3Y",
      "type": "Documentary Travel in France",
      "description": "",
      "coordinates": [
          43.935,
          6.067
      ]
  },
  {
      "title": "Hurepoix",
      "link": "https://www.youtube.com/watch?v=ngB2x_JoSrA",
      "type": "1000 Countries in one",
      "description": "little-known charms of Essonne",
      "coordinates": [
          48.5,
          2.25
      ]
  },
  {
      "title": "The Canal du Midi, a Navigation in the Heart of the South of France",
      "link": "https://www.youtube.com/watch?v=E_2v3LHtq7g",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          43.6,
          1.433
      ]
  },
  {
      "title": "Quintin",
      "link": "https://www.youtube.com/watch?v=UdHl5phYvVw",
      "type": "Brittany Region",
      "description": "",
      "coordinates": [
          48.403,
          -2.91
      ]
  },
  {
      "title": "The Pays de Foix",
      "link": "https://www.youtube.com/watch?v=0i6oLu40bw4",
      "type": "1000 Countries in one",
      "description": "an escapade among the Cathars",
      "coordinates": [
          42.967,
          1.617
      ]
  },
  {
      "title": "Guadeloupe, the true treasure of the Caribbean",
      "link": "https://www.youtube.com/watch?v=yqt7pqxj-Ws",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          16.265,
          -61.551
      ]
  },
  {
      "title": "Berry",
      "link": "https://www.youtube.com/watch?v=6frED7xOEG8",
      "type": "1000 Countries in one",
      "description": "in the land of George Sand",
      "coordinates": [
          47.083,
          2.4
      ]
  },
  {
      "title": "French Flanders, an Extraordinary Heritage",
      "link": "https://www.youtube.com/watch?v=bS98C9ePLk8",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          50.75,
          2.5
      ]
  },
  {
      "title": "Bergheim",
      "link": "https://www.youtube.com/watch?v=VnSoyazdjMo",
      "type": "Grand Est Region",
      "description": "",
      "coordinates": [
          48.205,
          7.362
      ]
  },
  {
      "title": "L'Avallonnais",
      "link": "https://www.youtube.com/watch?v=S67TuCeB69o",
      "type": "Bourgogne",
      "description": "a charming fortified city",
      "coordinates": [
          47.49,
          3.908
      ]
  },
  {
      "title": "The Pays de Caux",
      "link": "https://www.youtube.com/watch?v=Lm5aKcaBu1E",
      "type": "1000 Countries in one",
      "description": "banks of the Seine and seaside",
      "coordinates": [
          49.667,
          0.5
      ]
  },
  {
      "title": "The Sentier des Douaniers, a succession of postcards",
      "link": "https://www.youtube.com/watch?v=MX-vo97u_qM",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          48.633,
          -4
      ]
  },
  {
      "title": "Houat Island",
      "link": "https://www.youtube.com/watch?v=Fy2PjkIuy10",
      "type": "Brittany Region",
      "description": "",
      "coordinates": [
          47.383,
          -2.95
      ]
  },
  {
      "title": "Alsace, land of fairy tales",
      "link": "https://www.youtube.com/watch?v=QNIFiN9Jalo",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          48.318,
          7.441
      ]
  },
  {
      "title": "The Médoc",
      "link": "https://www.youtube.com/watch?v=lAkMtx08gyg",
      "type": "South of France",
      "description": "an Atlantic escape",
      "coordinates": [
          45.167,
          -0.75
      ]
  },
  {
      "title": "Lozère, land of legends and large wild spaces",
      "link": "https://www.youtube.com/watch?v=Rn1274qtprY",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          44.5,
          3.5
      ]
  },
  {
      "title": "Valois",
      "link": "https://www.youtube.com/watch?v=Dt7P5-Xbbxs",
      "type": "1000 Countries in one",
      "description": "kingdom of “Beauty and the Beast”",
      "coordinates": [
          49.167,
          2.833
      ]
  },
  {
      "title": "La Bouille",
      "link": "https://www.youtube.com/watch?v=IQeMTAzgnqY",
      "type": "Normandy Region",
      "description": "",
      "coordinates": [
          49.355,
          0.93
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=wnKHHhM7ToM",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Tarbes",
      "link": "https://www.youtube.com/watch?v=Ik-QjvZjs4E",
      "type": "South of France",
      "description": "a land of opportunities",
      "coordinates": [
          43.233,
          0.083
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=XZECfGtokn4",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Pontarlier",
      "link": "https://www.youtube.com/watch?v=vN_85eGNDZE",
      "type": "1000 Countries in one",
      "description": "a town in the mountains",
      "coordinates": [
          46.903,
          6.355
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=0jORAo9arSg",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Carcassonne",
      "link": "https://www.youtube.com/watch?v=7sTzwnP1JJ0",
      "type": "South of France",
      "description": "a modern fairy tale",
      "coordinates": [
          43.213,
          2.351
      ]
  },
  {
      "title": "Levroux",
      "link": "https://www.youtube.com/watch?v=orEWOtkBDSg",
      "type": "Centre-Val de Loire Region",
      "description": "",
      "coordinates": [
          46.978,
          1.612
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=Pfcm3Z7TZ78",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Rochelle",
      "link": "https://www.youtube.com/watch?v=KkQFST83hJ8",
      "type": "1000 Countries in one",
      "description": "the thousand-year-old city",
      "coordinates": [
          46.16,
          -1.152
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=3obQEQBqqsQ",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "The Basque Country",
      "link": "https://www.youtube.com/watch?v=r-9dJKIzGd4",
      "type": "South of France",
      "description": "",
      "coordinates": [
          43.3,
          -1.5
      ]
  },
  {
      "title": "Hesdin",
      "link": "https://www.youtube.com/watch?v=blQryX8i8d8",
      "type": "Hauts de France region",
      "description": "",
      "coordinates": [
          50.373,
          2.038
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=fCnVvI8_Vp4",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "The Cévennes",
      "link": "https://www.youtube.com/watch?v=zhLUJooLIAM",
      "type": "South of France",
      "description": "",
      "coordinates": [
          44.25,
          3.75
      ]
  },
  {
      "title": "Saint-Sauveur en Puisaye",
      "link": "https://www.youtube.com/watch?v=gn-2CKtT41w",
      "type": "Burgundy-FC Region",
      "description": "",
      "coordinates": [
          47.617,
          3.2
      ]
  },
  {
      "title": "Entre-deux-Mers:a land of wine tradition-1000 Countries in one-South of France-Travel Documentary",
      "link": "https://www.youtube.com/watch?v=_wuFWUnsjXo",
      "description": "",
      "coordinates": [
          44.75,
          -0.25
      ]
  },
  {
      "title": "Saint Sulpice de Favières",
      "link": "https://www.youtube.com/watch?v=ltFg1V4ap5w",
      "type": "Essonne Region",
      "description": "",
      "coordinates": [
          48.54,
          2.17
      ]
  },
  {
      "title": "The Wonders of the South-West",
      "link": "https://www.youtube.com/watch?v=2fDmS2FfoiM",
      "type": "The 100 places you must see",
      "description": "",
      "coordinates": [
          44,
          0.5
      ]
  },
  {
      "title": "Fresnay sur Sarthe",
      "link": "https://www.youtube.com/watch?v=qTVNEKiDWxg",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          48.283,
          0.017
      ]
  },
  {
      "title": "Pyrénées, les montagnes du Midi",
      "link": "https://www.youtube.com/watch?v=c6vNWfIq-R0",
      "type": "Documentaire Voyage en France",
      "description": "",
      "coordinates": [
          42.833,
          0.167
      ]
  },
  {
      "title": "Pino",
      "link": "https://www.youtube.com/watch?v=WwkjIyMvC3g",
      "type": "Région Corse",
      "description": "",
      "coordinates": [
          42.933,
          9.383
      ]
  },
  {
      "title": "Viticulture, La part des anges",
      "link": "https://www.youtube.com/watch?v=ByxLKREKT5E",
      "type": "Documentaire Gastronomie et Art de vivre",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le pays des Landes ",
      "link": "https://www.youtube.com/watch?v=9kdnc9jaBls",
      "type": "1000 Pays en un",
      "description": "au coeur de nos régions"
  },
  {
      "title": "Port-Joinville",
      "link": "https://www.youtube.com/watch?v=mwjL7q5AYbw",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          46.717,
          -2.333
      ]
  },
  {
      "title": "La grande histoire des petits bouchons Lyonnais",
      "link": "https://www.youtube.com/watch?v=-CfYxPvMLhM",
      "type": "Documentaire Gastronomie et Art de vivre",
      "description": "",
      "coordinates": [
          45.75,
          4.85
      ]
  },
  {
      "title": "Bretagne, sauvage et mystérieuse ",
      "link": "https://www.youtube.com/watch?v=It52MMBNmcU",
      "type": "Documentaire Voyage en France",
      "description": ""
  },
  {
      "title": "Winstubs, le meilleur de l'Alsace",
      "link": "https://www.youtube.com/watch?v=_bYi0cbEdXo",
      "type": "Documentaire Gastronomie et Art de vivre",
      "description": "",
      "coordinates": [
          48.318,
          7.441
      ]
  },
  {
      "title": "La Désirade en Guadeloupe Région Outre mer",
      "link": "https://www.youtube.com/watch?v=8n3PuCB_U4s",
      "type": "Stéphane Bern",
      "description": "",
      "coordinates": [
          16.317,
          -61.05
      ]
  },
  {
      "title": "Bourgogne, le coeur de France",
      "link": "https://www.youtube.com/watch?v=F57IJH03RY0",
      "type": "Documentaire Voyage en France",
      "description": "",
      "coordinates": [
          47,
          4.5
      ]
  },
  {
      "title": "Villerville",
      "link": "https://www.youtube.com/watch?v=96pUlA5RdBY",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.4,
          0.133
      ]
  },
  {
      "title": "Les pâtisseries françaises à la conquête du monde",
      "link": "https://www.youtube.com/watch?v=ONzM3y09pX8",
      "type": "Documentaire Gastronomie et Art de vivre",
      "description": "",
      "coordinates": [
          48.8566,
          2.3522
      ]
  },
  {
      "title": "Rocroi",
      "link": "https://www.youtube.com/watch?v=ocBAJL8FjTQ",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          49.923,
          4.522
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=u1UtEs-D3I4",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le pays de l'Anjou ",
      "link": "https://www.youtube.com/watch?v=sYJKhnO6j50",
      "type": "1000 Pays en un",
      "description": "au coeur de nos régions"
  },
  {
      "title": "Auvillar",
      "link": "https://www.youtube.com/watch?v=TH4gzzk9A7k",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          44.07,
          0.9
      ]
  },
  {
      "title": "La France Atlantique de l'estuaire de la Loire aux Pyrénées",
      "link": "https://www.youtube.com/watch?v=Um7TY_6Ucqw",
      "type": "Documentaire Voyage",
      "description": "",
      "coordinates": [
          47,
          -2
      ]
  },
  {
      "title": "Long",
      "link": "https://www.youtube.com/watch?v=O-Bx3fzzNT0",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          50.05,
          1.983
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=bSBSyQHivWo",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La sublime Provence dans le Sud de la France",
      "link": "https://www.youtube.com/watch?v=7RPNFz7wAPs",
      "type": "Documentaire Voyage en France",
      "description": "",
      "coordinates": [
          43.935,
          6.067
      ]
  },
  {
      "title": "Estaminets, la magie des bistrots du Nord",
      "link": "https://www.youtube.com/watch?v=vj0EWmdvGZw",
      "type": "Documentaire Gastronomie et Art de vivre",
      "description": "",
      "coordinates": [
          50.633,
          3.067
      ]
  },
  {
      "title": "Châteauneuf",
      "link": "https://www.youtube.com/watch?v=OTJeWN8YZn0",
      "type": "Région Bourgogne",
      "description": "",
      "coordinates": [
          47.217,
          5.133
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=-KOzCMAMEFM",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le Pays d'Auch ",
      "link": "https://www.youtube.com/watch?v=fpnEr3QkGIs",
      "type": "1000 Pays en un",
      "description": "au coeur de nos régions"
  },
  {
      "title": "Saint-Véran, plus haute commune d'Europe",
      "link": "https://www.youtube.com/watch?v=OivdtY-ml9w",
      "type": "Région Haute-Alpes",
      "description": "",
      "coordinates": [
          44.7,
          6.867
      ]
  },
  {
      "title": "Crêpes, voyage en terres de Bretagne",
      "link": "https://www.youtube.com/watch?v=hFtVLQ8oqnA",
      "type": "Rencontre avec les passionnés de la crêpe",
      "description": "",
      "coordinates": [
          48.202,
          -2.932
      ]
  },
  {
      "title": "Sancerre",
      "link": "https://www.youtube.com/watch?v=LJ84RLZLTj4",
      "type": "élu Village Préféré des Français 2021",
      "description": "",
      "coordinates": [
          47.33,
          2.833
      ]
  },
  {
      "title": "Le Tour de FRANCE de nos régions avec Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=3mM5kZk9E0o",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Saint-Florent",
      "link": "https://www.youtube.com/watch?v=CafA6DQmL4M",
      "type": "Région Haute-Corse",
      "description": "",
      "coordinates": [
          42.683,
          9.3
      ]
  },
  {
      "title": "Samois-sur-Seine",
      "link": "https://www.youtube.com/watch?v=yJtPFgZn2Ds",
      "type": "Région Île-de-France",
      "description": "",
      "coordinates": [
          48.45,
          2.75
      ]
  },
  {
      "title": "La petite Creuse ",
      "link": "https://www.youtube.com/watch?v=9Ne8JAdZrI0",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "territoire plein de mystères"
  },
  {
      "title": "Trôo ",
      "link": "https://www.youtube.com/watch?v=JtBiDy3GNKw",
      "type": "Région Centre-Val de Loire",
      "description": "Cité Troglodyte"
  },
  {
      "title": "Giverny",
      "link": "https://www.youtube.com/watch?v=EwLmPAW4Ux8",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.075,
          1.533
      ]
  },
  {
      "title": "Le Sud de l'Orne ",
      "link": "https://www.youtube.com/watch?v=ALnwZztHmTM",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "escapade dans le Perche"
  },
  {
      "title": "Saint-Bertrand de Comminges",
      "link": "https://www.youtube.com/watch?v=EEflXsxIlf4",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          43.027,
          0.571
      ]
  },
  {
      "title": "Batz",
      "link": "https://www.youtube.com/watch?v=e6lF-KHQL58",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          47.283,
          -2.483
      ]
  },
  {
      "title": "De l'étang de Berre à la Camargue ",
      "link": "https://www.youtube.com/watch?v=eR6xnGoSHcQ",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "rencontres à Martigues"
  },
  {
      "title": "Pierrefonds",
      "link": "https://www.youtube.com/watch?v=GN_rWuajwGY",
      "type": "Région Hauts de France",
      "description": "",
      "coordinates": [
          49.35,
          2.983
      ]
  },
  {
      "title": "Rencontre les habitants du NORD PAS DE CALAIS",
      "link": "https://www.youtube.com/watch?v=2CGnnIlVLPk",
      "type": "La France de nos Régions",
      "description": "",
      "coordinates": [
          50.5,
          2.5
      ]
  },
  {
      "title": "Hunspach",
      "link": "https://www.youtube.com/watch?v=FR1vStJs54s",
      "type": "Région Grand-Est",
      "description": "",
      "coordinates": [
          48.955,
          7.94
      ]
  },
  {
      "title": "La vallée de l'Huisne ",
      "link": "https://www.youtube.com/watch?v=fu0eoNA4KBo",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "excursion dans le Perche"
  },
  {
      "title": "Les Anses d'Arlet",
      "link": "https://www.youtube.com/watch?v=n1feDcxD4h0",
      "type": "Martinique",
      "description": "",
      "coordinates": [
          14.483,
          -61.083
      ]
  },
  {
      "title": "Cargèse",
      "link": "https://www.youtube.com/watch?v=nrpoAqtV8uI",
      "type": "région Corse-du-Sud",
      "description": "",
      "coordinates": [
          42.133,
          8.6
      ]
  },
  {
      "title": "Chablis",
      "link": "https://www.youtube.com/watch?v=RXY9pcFk6vA",
      "type": "Région Bourgogne Franche Comté",
      "description": "",
      "coordinates": [
          47.817,
          3.8
      ]
  },
  {
      "title": "Le Pays d'Ouche ",
      "link": "https://www.youtube.com/watch?v=9dPxA94U-hI",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "au coeur de l'Histoire de France dans le Perche"
  },
  {
      "title": "Rencontre les habitants du LIMOUSIN",
      "link": "https://www.youtube.com/watch?v=frOVwuMznXw",
      "type": "La France de nos Régions",
      "description": "",
      "coordinates": [
          45.833,
          1.25
      ]
  },
  {
      "title": "Montpeyroux",
      "link": "https://www.youtube.com/watch?v=pVYWKyihfyo",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          45.617,
          3.217
      ]
  },
  {
      "title": "En Haute-Loire ",
      "link": "https://www.youtube.com/watch?v=mN-WuDqRuaQ",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "aux frontières du Vivarais"
  },
  {
      "title": "Sur les rives de la Loire ",
      "link": "https://www.youtube.com/watch?v=H776FjSDbEg",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "au coeur d'Orléans"
  },
  {
      "title": "Du Haut Velay aux gorges de l'Allier",
      "link": "https://www.youtube.com/watch?v=50sqig7kwJA",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          45.083,
          3.833
      ]
  },
  {
      "title": "Rencontre les habitants du LANGUEDOC ROUSSILLON",
      "link": "https://www.youtube.com/watch?v=cxt-xnR-V3s",
      "type": "La France de nos Régions",
      "description": "",
      "coordinates": [
          43.6,
          3.883
      ]
  },
  {
      "title": "Montfort L’Amaury",
      "link": "https://www.youtube.com/watch?v=3dzYrYwgKC4",
      "type": "Région Île-De-France",
      "description": "",
      "coordinates": [
          48.777,
          1.81
      ]
  },
  {
      "title": "Le Maine et Loire ",
      "link": "https://www.youtube.com/watch?v=lZci_mFkPBQ",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "la beauté et l'histoire du Val de Loire"
  },
  {
      "title": "La Haute-Loire, du Puy-en-Velay aux méandres des gorges de l'Allier",
      "link": "https://www.youtube.com/watch?v=XtPngV42wKU",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          45.083,
          3.833
      ]
  },
  {
      "title": "Du Clos Lucé à Chambord ",
      "link": "https://www.youtube.com/watch?v=3-juonGJDyk",
      "description": "sur la route de l'Histoire du Val de Loire- Les 100 Lieux qu'il faut voir"
  },
  {
      "title": "Le golfe du Lion, de la Provence à la côte catalane",
      "link": "https://www.youtube.com/watch?v=tc6Jk1VL0_M",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          43,
          3
      ]
  },
  {
      "title": "Ménerbes",
      "link": "https://www.youtube.com/watch?v=xY-jvJWbafk",
      "type": "Régions Provence-Alpes-Côte-D'Azur",
      "description": "",
      "coordinates": [
          43.833,
          5.2
      ]
  },
  {
      "title": "Concours de bûcherons dans les Vosges",
      "link": "https://www.youtube.com/watch?v=TWdVMpw8Rx0",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          48.167,
          6.417
      ]
  },
  {
      "title": "Au coeur de la Haute-Loire ",
      "link": "https://www.youtube.com/watch?v=fPJJUgL0lPM",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "aux détours du Puy-En-Velay"
  },
  {
      "title": "Sauver les poissons ",
      "link": "https://www.youtube.com/watch?v=AZYIMawwdI8",
      "type": "Au P'tit Bonheur la France",
      "description": "le vétérinaire spécialiste de France raconte"
  },
  {
      "title": "Pont-Aven",
      "link": "https://www.youtube.com/watch?v=g1jAcFf41-0",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          47.85,
          -3.75
      ]
  },
  {
      "title": "Compter les fourmis, un passe-temps comme un autre",
      "link": "https://www.youtube.com/watch?v=Tiv9Rh_UUnU",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La plaine de l'Hérault ",
      "link": "https://www.youtube.com/watch?v=A7vs703f968",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "autour du Golfe du Lion"
  },
  {
      "title": "Rendez-vous avec un chasseur de fantômes à Mortemer",
      "link": "https://www.youtube.com/watch?v=Ql_p5lshcfA",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          49.167,
          1.833
      ]
  },
  {
      "title": "Le Val-de-Loire, de la cité royale d'Amboise à l'Anjou",
      "link": "https://www.youtube.com/watch?v=JeMA5MM_alI",
      "type": "Les 100 lieux qu'il faut voir -Documentaire",
      "description": "",
      "coordinates": [
          47.5,
          1
      ]
  },
  {
      "title": "Aubeterre-Sur-Dronne",
      "link": "https://www.youtube.com/watch?v=Kx8Lw8CW-gA",
      "type": "Région NOUVELLE AQUITAINE",
      "description": "",
      "coordinates": [
          45.27,
          0.17
      ]
  },
  {
      "title": "Les combats de reines en haut des Alpes",
      "link": "https://www.youtube.com/watch?v=urN4-rGiIlg",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          45.5,
          6.5
      ]
  },
  {
      "title": "Le grésivaudan ",
      "link": "https://www.youtube.com/watch?v=X815GsnOlgE",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "découverte de la vallée de l'Isère"
  },
  {
      "title": "Créer un refuge pour cochons, le rêve de cette femme",
      "link": "https://www.youtube.com/watch?v=miIDboiue_4",
      "type": "Au p'tit bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Il décide de vivre comme un INDIEN en Lorraine",
      "link": "https://www.youtube.com/watch?v=03kyangp1Xc",
      "type": "Au p'tit bonheur la France",
      "description": "",
      "coordinates": [
          48.69,
          6.183
      ]
  },
  {
      "title": "Le pays catalan ",
      "link": "https://www.youtube.com/watch?v=eD1eCP0EQuE",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "au coeur de l'Occitanie"
  },
  {
      "title": "Champion de course landaise, il raconte ce sport",
      "link": "https://www.youtube.com/watch?v=tCEBBus8z5Q",
      "type": "Au p'tit bonheur la France",
      "description": "",
      "coordinates": [
          44,
          -0.833
      ]
  },
  {
      "title": "Chasser les ultra sons des chauve-souris dans le Jura",
      "link": "https://www.youtube.com/watch?v=oYXqKAlI85g",
      "type": "Au P'tit Bonheur la France -Philippe Gougler",
      "description": "",
      "coordinates": [
          46.75,
          6
      ]
  },
  {
      "title": "Le pays viennois ",
      "link": "https://www.youtube.com/watch?v=A0HlerbQSjs",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "traditions et patrimoine en Isère"
  },
  {
      "title": "Découvrez la fantastique maison de Philippe Hermez",
      "link": "https://www.youtube.com/watch?v=uPmArz8UwFU",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les Alpes de Haute-Provence, de l'Ubaye à la Provence de Giono",
      "link": "https://www.youtube.com/watch?v=63qZUv52ez0",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          44,
          6
      ]
  },
  {
      "title": "Métier de passion ",
      "link": "https://www.youtube.com/watch?v=_CalINHWpa0",
      "type": "Au P'tit Bonheur la France",
      "description": "Faire des portraits de vaches"
  },
  {
      "title": "Entre Creuse et Sédelle ",
      "link": "https://www.youtube.com/watch?v=dMIfHwFzCmI",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "au temps de la fenaison"
  },
  {
      "title": "Son métier, cueilleur de Lichen un champignon peu connu -Philippe Gougler",
      "link": "https://www.youtube.com/watch?v=4bi7wJ89h2M",
      "type": "Au P'tit Bonheur la France",
      "description": ""
  },
  {
      "title": "Le pouvoir magique de ces lamas est incroyable",
      "link": "https://www.youtube.com/watch?v=rRElqB3I1nk",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les contreforts du Val d'Allos dans les Alpes de Haute-Provence",
      "link": "https://www.youtube.com/watch?v=85dUDtP0c94",
      "type": "Les 100 lieux qu'il Faut voir",
      "description": "",
      "coordinates": [
          44,
          6
      ]
  },
  {
      "title": "Préserver les traditions dans la traite des vaches en Auvergne",
      "link": "https://www.youtube.com/watch?v=8Q9CWHrJ24Y",
      "type": "Au P'tit bonheur la France",
      "description": "",
      "coordinates": [
          45.75,
          3
      ]
  },
  {
      "title": "La Creuse, d'Aubusson à la vallée des peintres",
      "link": "https://www.youtube.com/watch?v=RQEFbrC6E88",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          46.083,
          2
      ]
  },
  {
      "title": "Inventeur, ce grand-père nous partage ces trésors",
      "link": "https://www.youtube.com/watch?v=zrCeITd86Mk",
      "type": "Au p'tit bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les gorges du Verdon ",
      "link": "https://www.youtube.com/watch?v=vNuulDt2yzw",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "le paradis de Haute-Provence"
  },
  {
      "title": "Sauver les homards, la devise de deux bretonnes",
      "link": "https://www.youtube.com/watch?v=_0aOsgpqucQ",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          48.202,
          -2.932
      ]
  },
  {
      "title": "Le pays de Banon ",
      "link": "https://www.youtube.com/watch?v=1iVhj64ysC0",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "au coeur des Alpes de Haute-Provence"
  },
  {
      "title": "Amoureux des bisons, cet éleveur y consacre sa vie",
      "link": "https://www.youtube.com/watch?v=T7nggCUOjjY",
      "type": "Au P'tit Bonheur la France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le vignoble champenois ",
      "link": "https://www.youtube.com/watch?v=GBx5UGfZasQ",
      "type": "Champagne",
      "description": "excursion dans les vignes"
  },
  {
      "title": "Sur la route de l'Aube ",
      "link": "https://www.youtube.com/watch?v=5HAFIXkok4A",
      "type": "Les 100 Lieux qu'il faut voir",
      "description": "découverte du patrimoine champenois"
  },
  {
      "title": "Le Perche ",
      "link": "https://www.youtube.com/watch?v=vccFONEQK6g",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "Terre de manoirs et de bocages"
  },
  {
      "title": "La vallée des tapissiers ",
      "link": "https://www.youtube.com/watch?v=fokEZuz0Ljk",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "escapade en terre creusoise"
  },
  {
      "title": "Le massif des écrins ",
      "link": "https://www.youtube.com/watch?v=0uXQcERgJaM",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "périple en Isère"
  },
  {
      "title": "La Marne ",
      "link": "https://www.youtube.com/watch?v=QWbayUbYQAQ",
      "type": "Reims",
      "description": "escapade dans les terres champenoises"
  },
  {
      "title": "L'Isère, de Vienne aux terres pastorales",
      "link": "https://www.youtube.com/watch?v=JHuRLIiT_Z0",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          45.333,
          5.5
      ]
  },
  {
      "title": "La Champagne",
      "link": "https://www.youtube.com/watch?v=YlTslheCtC0",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "Territoire d'histoire et de vignobles",
      "coordinates": [
          49,
          4
      ]
  },
  {
      "title": "Auvergne, volcanic France",
      "link": "https://www.youtube.com/watch?v=Y2W5BUtPCpo",
      "type": "unique adventure in the Massif Central",
      "description": "",
      "coordinates": [
          45.75,
          3
      ]
  },
  {
      "title": "Les pays du Mont Blanc",
      "link": "https://www.youtube.com/watch?v=NIN_3yBj7rQ",
      "type": "Chamonix",
      "description": "",
      "coordinates": [
          45.833,
          6.833
      ]
  },
  {
      "title": "Cotignac",
      "link": "https://www.youtube.com/watch?v=dg5oEgdQpS0",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.53,
          6.15
      ]
  },
  {
      "title": "Lauzerte",
      "link": "https://www.youtube.com/watch?v=TR1meUijoZ8",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          44.25,
          1.133
      ]
  },
  {
      "title": "Terre de Haut",
      "link": "https://www.youtube.com/watch?v=a64ClZ73TVA",
      "type": "Guadeloupe",
      "description": "",
      "coordinates": [
          15.867,
          -61.583
      ]
  },
  {
      "title": "Les Riceys",
      "link": "https://www.youtube.com/watch?v=AGNJbxdw8e4",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48,
          4.367
      ]
  },
  {
      "title": "Mornac-sur-Seudre",
      "link": "https://www.youtube.com/watch?v=z_UIVQdydlA",
      "type": "Région Nouvelle Aquitaine",
      "description": "",
      "coordinates": [
          45.717,
          -1.033
      ]
  },
  {
      "title": "Saint-Vaast La Hougue",
      "link": "https://www.youtube.com/watch?v=T1FLew6lfoc",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.583,
          -1.267
      ]
  },
  {
      "title": "Bourron-Marlotte",
      "link": "https://www.youtube.com/watch?v=PMtDR7-1v3I",
      "type": "Région Ile-de-France",
      "description": "",
      "coordinates": [
          48.333,
          2.7
      ]
  },
  {
      "title": "La Ferté-Milon",
      "link": "https://www.youtube.com/watch?v=eaFFv6psxl4",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          49.183,
          3.117
      ]
  },
  {
      "title": "Le Thoureil",
      "link": "https://www.youtube.com/watch?v=fDBdBttQQPI",
      "type": "Région Pays de La Loire",
      "description": "",
      "coordinates": [
          47.367,
          -0.267
      ]
  },
  {
      "title": "Pont-Croix",
      "link": "https://www.youtube.com/watch?v=JobhNPbamo0",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          48.033,
          -4.483
      ]
  },
  {
      "title": "Erbalunga",
      "link": "https://www.youtube.com/watch?v=b32vqJCSRKs",
      "type": "Région Corse",
      "description": "",
      "coordinates": [
          42.583,
          9.283
      ]
  },
  {
      "title": "Frazé",
      "link": "https://www.youtube.com/watch?v=bCNopj5BxZU",
      "type": "Région Centre Val de Loire",
      "description": "",
      "coordinates": [
          48.25,
          1.067
      ]
  },
  {
      "title": "Mouthier-Haute-Pierre",
      "link": "https://www.youtube.com/watch?v=i7HE5HZJAaM",
      "type": "Région Franche-Comté",
      "description": "",
      "coordinates": [
          47.033,
          6.267
      ]
  },
  {
      "title": "Souvigny",
      "link": "https://www.youtube.com/watch?v=JisZJdPRl3w",
      "type": "Région Auvergne Rhône Alpes",
      "description": "",
      "coordinates": [
          46.533,
          3.183
      ]
  },
  {
      "title": "Ile de Sein",
      "link": "https://www.youtube.com/watch?v=0q_VDHcPrIE",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          48.033,
          -4.85
      ]
  },
  {
      "title": "Mirmande",
      "link": "https://www.youtube.com/watch?v=AM8lK_HoRvA",
      "type": "Région Auvergne Rhône Alpes",
      "description": "",
      "coordinates": [
          44.7,
          4.833
      ]
  },
  {
      "title": "Roussillon",
      "link": "https://www.youtube.com/watch?v=oUXNvfMSUls",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.9,
          5.3
      ]
  },
  {
      "title": "Mittelbergheim",
      "link": "https://www.youtube.com/watch?v=lX_bDe3YOKs",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48.4,
          7.45
      ]
  },
  {
      "title": "Monpazier",
      "link": "https://www.youtube.com/watch?v=18jpAerHFhE",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          44.683,
          0.9
      ]
  },
  {
      "title": "Asnières-sur-Vegre",
      "link": "https://www.youtube.com/watch?v=qxK__m_4fVo",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          47.95,
          -0.233
      ]
  },
  {
      "title": "Janvry",
      "link": "https://www.youtube.com/watch?v=0fRhKxo-jlo",
      "type": "Région Ile de France",
      "description": "",
      "coordinates": [
          48.65,
          2.15
      ]
  },
  {
      "title": "Lama",
      "link": "https://www.youtube.com/watch?v=hwjwGWW-gMk",
      "type": "Corse",
      "description": "",
      "coordinates": [
          42.583,
          9.167
      ]
  },
  {
      "title": "Hell-Bourg",
      "link": "https://www.youtube.com/watch?v=UohF1O6wsjA",
      "type": "La Réunion",
      "description": "",
      "coordinates": [
          -21.067,
          55.517
      ]
  },
  {
      "title": "Cassel",
      "link": "https://www.youtube.com/watch?v=lLV-dKKVQ-Y",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          50.8,
          2.483
      ]
  },
  {
      "title": "La Couvertoirade",
      "link": "https://www.youtube.com/watch?v=1NYPQmK0Ap0",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          43.917,
          3.317
      ]
  },
  {
      "title": "Yèvre-Le-Chatel ",
      "link": "https://www.youtube.com/watch?v=Q3uUTMB6sH4",
      "type": "Région Centre Val de Loire",
      "description": ""
  },
  {
      "title": "Mont Saint-Michel",
      "link": "https://www.youtube.com/watch?v=kKfkQUci6Nw",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          48.636,
          -1.511
      ]
  },
  {
      "title": "Sémur-en-Brionnais",
      "link": "https://www.youtube.com/watch?v=VIzcepXSRMc",
      "type": "Région Franche-Comté",
      "description": "",
      "coordinates": [
          46.267,
          4.083
      ]
  },
  {
      "title": "Fort La Latte",
      "link": "https://www.youtube.com/watch?v=sTiUaI7fX1Q",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          48.667,
          -2.283
      ]
  },
  {
      "title": "Chapelle Impériale",
      "link": "https://www.youtube.com/watch?v=5D7A8T-qGyA",
      "type": "Corse",
      "description": "",
      "coordinates": [
          48.636,
          -1.511
      ]
  },
  {
      "title": "Arsenal de Rochefort",
      "link": "https://www.youtube.com/watch?v=j-hjo7-EHss",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          45.933,
          -0.967
      ]
  },
  {
      "title": "Canal du midi",
      "link": "https://www.youtube.com/watch?v=7UAU7sTPeJI",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          43.6,
          1.433
      ]
  },
  {
      "title": "Parc du haut-fourneau U4",
      "link": "https://www.youtube.com/watch?v=BWXazF702Ww",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          49.25,
          6
      ]
  },
  {
      "title": "Château de Brézé",
      "link": "https://www.youtube.com/watch?v=eWAlw5uhsIw",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          47.167,
          -0.067
      ]
  },
  {
      "title": "Palais Idéal du Facteur Cheval",
      "link": "https://www.youtube.com/watch?v=3F6TxSZ5x78",
      "type": "Région Auvergne Rhône Alpes",
      "description": "",
      "coordinates": [
          45.25,
          5.033
      ]
  },
  {
      "title": "Le château du Champ de Bataille",
      "link": "https://www.youtube.com/watch?v=HcrL7-l3eFQ",
      "type": "Région Haute-Normandie",
      "description": "",
      "coordinates": [
          49.167,
          1.167
      ]
  },
  {
      "title": "Temple Tamoul",
      "link": "https://www.youtube.com/watch?v=BJwTMJircZw",
      "type": "La Réunion",
      "description": "",
      "coordinates": [
          48.8566,
          2.3522
      ]
  },
  {
      "title": "Cathédrale Saint-Nicolas de Nice",
      "link": "https://www.youtube.com/watch?v=Mvick4qCm0U",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.7,
          7.267
      ]
  },
  {
      "title": "Villa Carvois",
      "link": "https://www.youtube.com/watch?v=1F4i1DSPOdU",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          48.8566,
          2.3522
      ]
  },
  {
      "title": "Sainte Chapelle",
      "link": "https://www.youtube.com/watch?v=PrXvPBgs63M",
      "type": "Région Ile-de-France",
      "description": "",
      "coordinates": [
          48.8566,
          2.3522
      ]
  },
  {
      "title": "Château et Jardins de Villandry",
      "link": "https://www.youtube.com/watch?v=i-FcoZh-UTo",
      "type": "Région Centre Val de Loire",
      "description": "",
      "coordinates": [
          47.333,
          0.5
      ]
  },
  {
      "title": "Citadelle et Lion de Belfort",
      "link": "https://www.youtube.com/watch?v=os6Hd2HeIog",
      "type": "Région Bourgogne Franche-Comté",
      "description": "",
      "coordinates": [
          47.633,
          6.867
      ]
  },
  {
      "title": "Usson",
      "link": "https://www.youtube.com/watch?v=s9zJXCoGtRk",
      "type": "Puy-de-Dôme",
      "description": "",
      "coordinates": [
          45.517,
          3.333
      ]
  },
  {
      "title": "Lac Pavin",
      "link": "https://www.youtube.com/watch?v=sg2gctf9v4w",
      "type": "Puy-de-Dôme",
      "description": "",
      "coordinates": [
          45.5,
          2.883
      ]
  },
  {
      "title": "Le puy de Dôme",
      "link": "https://www.youtube.com/watch?v=_Wz5K6CrJiY",
      "type": "Puy-de-Dôme",
      "description": "",
      "coordinates": [
          45.772,
          2.964
      ]
  },
  {
      "title": "LE PUY-DE-DÔME",
      "link": "https://www.youtube.com/watch?v=eG51bulrBHw",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          45.772,
          2.964
      ]
  },
  {
      "title": "Lac du Bourget",
      "link": "https://www.youtube.com/watch?v=9CbL10ixMhQ",
      "type": "Savoie",
      "description": "",
      "coordinates": [
          45.733,
          5.867
      ]
  },
  {
      "title": "Bonneval-sur-Arc",
      "link": "https://www.youtube.com/watch?v=SwlsOfc38_Q",
      "type": "Savoie",
      "description": "",
      "coordinates": [
          45.367,
          7.05
      ]
  },
  {
      "title": "Haute-Luce",
      "link": "https://www.youtube.com/watch?v=7ORyxsVCTeU",
      "type": "Savoie",
      "description": "",
      "coordinates": [
          45.75,
          6.5
      ]
  },
  {
      "title": "LA SAVOIE",
      "link": "https://www.youtube.com/watch?v=x3VvLzBHEBs",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          45.5,
          6.5
      ]
  },
  {
      "title": "Le Piton de la Fournaise",
      "link": "https://www.youtube.com/watch?v=1ihSMzV9zqA",
      "type": "La Réunion",
      "description": "",
      "coordinates": [
          -21.242,
          55.708
      ]
  },
  {
      "title": "Hell-Bourg",
      "link": "https://www.youtube.com/watch?v=E6emtYSfmeE",
      "type": "La Réunion",
      "description": "",
      "coordinates": [
          -21.067,
          55.517
      ]
  },
  {
      "title": "Côte ouest de la Réunion",
      "link": "https://www.youtube.com/watch?v=OWMfx-Qxhp0",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          -21.1151,
          55.5364
      ]
  },
  {
      "title": "LA RÉUNION",
      "link": "https://www.youtube.com/watch?v=E6Rpo8pwWYg",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          -21.1151,
          55.5364
      ]
  },
  {
      "title": "Blanot",
      "link": "https://www.youtube.com/watch?v=MzrWxP2cUxc",
      "type": "Saône-et-Loire",
      "description": "",
      "coordinates": [
          46.467,
          4.733
      ]
  },
  {
      "title": "Cluny",
      "link": "https://www.youtube.com/watch?v=RsWssU0JPv0",
      "type": "Saône-et-Loire",
      "description": "",
      "coordinates": [
          46.433,
          4.65
      ]
  },
  {
      "title": "Autun",
      "link": "https://www.youtube.com/watch?v=3Yv8BTqxzSo",
      "type": "Saône-et-Loire",
      "description": "",
      "coordinates": [
          46.95,
          4.3
      ]
  },
  {
      "title": "LA SAONE-ET-LOIRE",
      "link": "https://www.youtube.com/watch?v=3jUVqfUek0s",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          46.5,
          4.5
      ]
  },
  {
      "title": "Le pays du Trégor",
      "link": "https://www.youtube.com/watch?v=fQvgY70hPd8",
      "type": "Finistère",
      "description": "",
      "coordinates": [
          48.75,
          -3.5
      ]
  },
  {
      "title": "Landerneau et sa région",
      "link": "https://www.youtube.com/watch?v=S1ZPLHSc3GY",
      "type": "Finistère",
      "description": "",
      "coordinates": [
          48.45,
          -4.25
      ]
  },
  {
      "title": "Quimper et la presqu'île de Crozon",
      "link": "https://www.youtube.com/watch?v=BZul2zGNXpg",
      "type": "Finistère",
      "description": "",
      "coordinates": [
          48,
          -4.1
      ]
  },
  {
      "title": "LE FINISTÈRE",
      "link": "https://www.youtube.com/watch?v=xZ6owlDtoIA",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          48.25,
          -4
      ]
  },
  {
      "title": "La Provence, des Alpes au Lubéron",
      "link": "https://www.youtube.com/watch?v=b8ASsGpMAy4",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          43.935,
          6.067
      ]
  },
  {
      "title": "Gorges du Verdon",
      "link": "https://www.youtube.com/watch?v=E7DK6UBLL10",
      "type": "Alpes de Haute-Provence",
      "description": "",
      "coordinates": [
          43.75,
          6.25
      ]
  },
  {
      "title": "Les contreforts du Val d'Allos",
      "link": "https://www.youtube.com/watch?v=uP4a5ARvfoc",
      "type": "Alpes de Haute Provence",
      "description": "",
      "coordinates": [
          44,
          6
      ]
  },
  {
      "title": "Le pays de Banon",
      "link": "https://www.youtube.com/watch?v=XkyXYvUy4Ds",
      "type": "Alpes de Haute Provence",
      "description": "",
      "coordinates": [
          44,
          5.5
      ]
  },
  {
      "title": "Ardennes",
      "link": "https://www.youtube.com/watch?v=mgV9fY6EHx4",
      "type": "Pays Rethelois ",
      "description": "",
      "coordinates": [
          49.5,
          4.5
      ]
  },
  {
      "title": "Ardennes",
      "link": "https://www.youtube.com/watch?v=gbr4B9INMxw",
      "type": "Massif Ardennais",
      "description": "",
      "coordinates": [
          49.5,
          4.5
      ]
  },
  {
      "title": "Oise",
      "link": "https://www.youtube.com/watch?v=UDazyy1bwmA",
      "type": "Gerberdy",
      "description": "",
      "coordinates": [
          49.333,
          2.5
      ]
  },
  {
      "title": "Ardennes",
      "link": "https://www.youtube.com/watch?v=fbpk4I5fVVs",
      "type": "Charleville Mézières et sa région",
      "description": "",
      "coordinates": [
          49.5,
          4.5
      ]
  },
  {
      "title": "Oise",
      "link": "https://www.youtube.com/watch?v=QwHE3uEupZc",
      "type": "Chantilly",
      "description": "",
      "coordinates": [
          49.333,
          2.5
      ]
  },
  {
      "title": "Berry ",
      "link": "https://www.youtube.com/watch?v=BdEZ96u-jNo",
      "type": "Bourges et ses environs",
      "description": ""
  },
  {
      "title": "Berry",
      "link": "https://www.youtube.com/watch?v=Hs2DavuGL38",
      "type": "L'Indre",
      "description": "",
      "coordinates": [
          47.083,
          2.4
      ]
  },
  {
      "title": "Berry",
      "link": "https://www.youtube.com/watch?v=kGBWcyxyuxA",
      "type": "Le Cher",
      "description": "",
      "coordinates": [
          47.083,
          2.4
      ]
  },
  {
      "title": "Oise",
      "link": "https://www.youtube.com/watch?v=OUnMJvE8D0g",
      "type": "Pierrefonds",
      "description": "",
      "coordinates": [
          49.333,
          2.5
      ]
  },
  {
      "title": "Manche",
      "link": "https://www.youtube.com/watch?v=HJpH8FmkNME",
      "type": "Le Sud Manche",
      "description": "",
      "coordinates": [
          49,
          -1.5
      ]
  },
  {
      "title": "Gascogne",
      "link": "https://www.youtube.com/watch?v=7iG4NFR5xx0",
      "type": "Les Landes ",
      "description": "",
      "coordinates": [
          43.833,
          0.167
      ]
  },
  {
      "title": "Haute Garonne",
      "link": "https://www.youtube.com/watch?v=LqJaRFhHcPk",
      "type": "Rieux-Volvestre ",
      "description": "",
      "coordinates": [
          43.5,
          1.5
      ]
  },
  {
      "title": "Haute Garonne",
      "link": "https://www.youtube.com/watch?v=87CQEX-QvA8",
      "type": "Toulouse",
      "description": "",
      "coordinates": [
          43.5,
          1.5
      ]
  },
  {
      "title": "Haute Garonne",
      "link": "https://www.youtube.com/watch?v=xq713yTv1jA",
      "type": "Saint Bertand De Comminges",
      "description": "",
      "coordinates": [
          43.5,
          1.5
      ]
  },
  {
      "title": "Gascogne",
      "link": "https://www.youtube.com/watch?v=fxFhydFZ4MA",
      "type": "Le Gers ",
      "description": "",
      "coordinates": [
          43.833,
          0.167
      ]
  },
  {
      "title": "Manche",
      "link": "https://www.youtube.com/watch?v=B3psy4tBCUU",
      "type": "Le Centre Manche ",
      "description": "",
      "coordinates": [
          49,
          -1.5
      ]
  },
  {
      "title": "MANCHE",
      "link": "https://www.youtube.com/watch?v=s_YNhCyqbV8",
      "type": "Le Nord Cotentin ",
      "description": ""
  },
  {
      "title": "Gascogne",
      "link": "https://www.youtube.com/watch?v=3h8C9iJYnlI",
      "type": "Le Béarn",
      "description": "",
      "coordinates": [
          43.833,
          0.167
      ]
  },
  {
      "title": "Les îles Aix et Madame",
      "link": "https://www.youtube.com/watch?v=pC2XvqQ7Y4U",
      "type": "Îles Atlantiques",
      "description": "",
      "coordinates": [
          46,
          -1.167
      ]
  },
  {
      "title": "Îles d'Oléron",
      "link": "https://www.youtube.com/watch?v=xSvaKFOU4Qc",
      "type": "Îles Atlantiques",
      "description": "",
      "coordinates": [
          45.933,
          -1.3
      ]
  },
  {
      "title": "Yeu et Noirmoutier, les îles de Vendée",
      "link": "https://www.youtube.com/watch?v=pQdM1jKrsz0",
      "type": "Îles Atlantiques",
      "description": "",
      "coordinates": [
          46.7,
          -2.333
      ]
  },
  {
      "title": "Le val de Sioule",
      "link": "https://www.youtube.com/watch?v=22wzMBYp1vs",
      "type": "Allier",
      "description": "",
      "coordinates": [
          46,
          3
      ]
  },
  {
      "title": "Moulins",
      "link": "https://www.youtube.com/watch?v=H_oCuP8sllg",
      "type": "Allier",
      "description": "",
      "coordinates": [
          46.567,
          3.333
      ]
  },
  {
      "title": "Vichy",
      "link": "https://www.youtube.com/watch?v=mFLKpJcJmbQ",
      "type": "Allier",
      "description": "",
      "coordinates": [
          46.133,
          3.417
      ]
  },
  {
      "title": "Arreau",
      "link": "https://www.youtube.com/watch?v=WcXgVnZWebc",
      "type": "Hautes-Pyrénées",
      "description": "",
      "coordinates": [
          42.9,
          0.35
      ]
  },
  {
      "title": "Cauterets",
      "link": "https://www.youtube.com/watch?v=BjsDwwDEKu0",
      "type": "Hautes-Pyrénées",
      "description": "",
      "coordinates": [
          42.883,
          -0.117
      ]
  },
  {
      "title": "Lourdes",
      "link": "https://www.youtube.com/watch?v=_k2_thwOH0g",
      "type": "Hautes-Pyrénées",
      "description": "",
      "coordinates": [
          43.1,
          -0.05
      ]
  },
  {
      "title": "Les Cévennes Gardoises",
      "link": "https://www.youtube.com/watch?v=WFk-VPDuGuI",
      "type": "Cévennes",
      "description": "",
      "coordinates": [
          44.25,
          3.75
      ]
  },
  {
      "title": "Les Cévennes Gardoises",
      "link": "https://www.youtube.com/watch?v=SEJyrB9Pns0",
      "type": "Cévennes",
      "description": "",
      "coordinates": [
          44.25,
          3.75
      ]
  },
  {
      "title": "Les Cévennes Lozériennes",
      "link": "https://www.youtube.com/watch?v=RWdVVIZTxDE",
      "type": "Cévennes- Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          44.5,
          3.5
      ]
  },
  {
      "title": "Le Boulonnais",
      "link": "https://www.youtube.com/watch?v=gZjKIiMogN8",
      "type": "Côte d'Opale",
      "description": "",
      "coordinates": [
          50.75,
          1.833
      ]
  },
  {
      "title": "Le Montreuillois",
      "link": "https://www.youtube.com/watch?v=tFQD1kcpkso",
      "type": "Côte d'Opale",
      "description": "",
      "coordinates": [
          50.5,
          1.75
      ]
  },
  {
      "title": "Région de Saint Omer",
      "link": "https://www.youtube.com/watch?v=NUPp71TnF3s",
      "type": "Côte d'Opale",
      "description": "",
      "coordinates": [
          50.75,
          2.25
      ]
  },
  {
      "title": "L'Alta Rocca",
      "link": "https://www.youtube.com/watch?v=2jiOSqUy828",
      "type": "Corse du Sud",
      "description": "",
      "coordinates": [
          41.833,
          9.167
      ]
  },
  {
      "title": "Le cap de Bonifacio",
      "link": "https://www.youtube.com/watch?v=xziS0O97fDs",
      "type": "Corse du Sud",
      "description": "",
      "coordinates": [
          41.383,
          9.15
      ]
  },
  {
      "title": "Le littoral Ouest",
      "link": "https://www.youtube.com/watch?v=xUbQDpA7vGk",
      "type": "Corse du Sud",
      "description": "",
      "coordinates": [
          46,
          -1.167
      ]
  },
  {
      "title": "Côte d'Azur, de la côte Varoise au pays niçois",
      "link": "https://www.youtube.com/watch?v=x5nFk3HaCks",
      "type": "Les 100 lieux qu'il faut voir Documentaire complet",
      "description": "",
      "coordinates": [
          43.7,
          7.267
      ]
  },
  {
      "title": "L'Oise, de Chantilly à la forêt de Compiègne",
      "link": "https://www.youtube.com/watch?v=t1ilWqHdlAk",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          49.2,
          2.583
      ]
  },
  {
      "title": "L'Allier, de Vichy aux méandres de l'Allier",
      "link": "https://www.youtube.com/watch?v=r4gdnI1dENE",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          46.133,
          3.417
      ]
  },
  {
      "title": "Les Ardennes, de Charleville-Mézières au Massif ardennais",
      "link": "https://www.youtube.com/watch?v=U6YiT-x6fow",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          49.5,
          4.5
      ]
  },
  {
      "title": "Les Hautes-Pyrénnées, de Lourdes à l'observatoire du Pic du Midi",
      "link": "https://www.youtube.com/watch?v=BqtnkdUS-1E",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          43.1,
          -0.05
      ]
  },
  {
      "title": "Les Cévennes, du Gard à la Lozère",
      "link": "https://www.youtube.com/watch?v=nHX7NMzEEM4&t=2034s",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          44.25,
          3.75
      ]
  },
  {
      "title": "La Haute-Garonne, de Toulouse aux contreforts des Pyrénées",
      "link": "https://www.youtube.com/watch?v=-ecdrpCmhC4",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          43.5,
          1.5
      ]
  },
  {
      "title": "La Manche, du Nord Cotentin au Mont Saint-Michel",
      "link": "https://www.youtube.com/watch?v=vtQp13DtXJ4",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          49,
          -1.5
      ]
  },
  {
      "title": "Les Iles de l'Atlantique, de la Vendée à la Charente-Maritime",
      "link": "https://www.youtube.com/watch?v=mUrtImCDGIQ",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          46,
          -1.167
      ]
  },
  {
      "title": "La Corse du Sud, du Golfe de Bonifacio au massif de l'Alta Rocca",
      "link": "https://www.youtube.com/watch?v=LmBmxvbGHcE",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          41.833,
          9.167
      ]
  },
  {
      "title": "La Côte d'Opale, des Deux-Caps aux marais de Saint-Omer",
      "link": "https://www.youtube.com/watch?v=9SLuc0NVVQk",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          50.75,
          2.25
      ]
  },
  {
      "title": "Monbazillac",
      "link": "https://www.youtube.com/watch?v=mnNwqw71--A",
      "type": "Périgord tricolore",
      "description": "",
      "coordinates": [
          44.783,
          0.5
      ]
  },
  {
      "title": "Périgueux",
      "link": "https://www.youtube.com/watch?v=M-NCdHfV-kI",
      "type": "Périgord tricolore",
      "description": "",
      "coordinates": [
          45.183,
          0.717
      ]
  },
  {
      "title": "Brantôme",
      "link": "https://www.youtube.com/watch?v=1mmJVpo4Fd4",
      "type": "Périgord tricolore",
      "description": "",
      "coordinates": [
          45.367,
          0.65
      ]
  },
  {
      "title": "Le Cantal",
      "link": "https://www.youtube.com/watch?v=XYCbTwTymNc",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          45.049,
          2.667
      ]
  },
  {
      "title": "Saint-Flour et la Planèze",
      "link": "https://www.youtube.com/watch?v=RRkUMqKO2Ug",
      "type": "Le Cantal",
      "description": "",
      "coordinates": [
          45.033,
          3.083
      ]
  },
  {
      "title": "Le Pays de Salers",
      "link": "https://www.youtube.com/watch?v=NK0RP2bsPoo",
      "type": "Le Cantal",
      "description": "",
      "coordinates": [
          45.133,
          2.5
      ]
  },
  {
      "title": "Le Pays d'Aurillac",
      "link": "https://www.youtube.com/watch?v=Bop1-Tq-BWw",
      "type": "Le Cantal",
      "description": "",
      "coordinates": [
          44.933,
          2.45
      ]
  },
  {
      "title": "Le Parc Naturel des Vosges du Nord",
      "link": "https://www.youtube.com/watch?v=Oxx0AhuJTn0",
      "type": "Bas-Rhin",
      "description": "",
      "coordinates": [
          48.833,
          7.5
      ]
  },
  {
      "title": "Koenigsbourg et les plaines d'Alsace",
      "link": "https://www.youtube.com/watch?v=g_XSYiovHzo",
      "type": "Bas-Rhin",
      "description": "",
      "coordinates": [
          48.25,
          7.417
      ]
  },
  {
      "title": "Pays du Mont Saint-Odile",
      "link": "https://www.youtube.com/watch?v=MDBHcKzpZuo",
      "type": "Bas-Rhin",
      "description": "",
      "coordinates": [
          48.433,
          7.4
      ]
  },
  {
      "title": "Côtes-d'Armor",
      "link": "https://www.youtube.com/watch?v=DfbSyI3VDAo",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          48.5,
          -2.75
      ]
  },
  {
      "title": "Le Trégor",
      "link": "https://www.youtube.com/watch?v=9ZnUbkISixs",
      "type": "Côtes-d'Armor",
      "description": "",
      "coordinates": [
          48.75,
          -3.5
      ]
  },
  {
      "title": "Les Côtes d'Émeraude",
      "link": "https://www.youtube.com/watch?v=VdR8FvXdWBI",
      "type": "Côtes-d'Armor",
      "description": "",
      "coordinates": [
          48.633,
          -2
      ]
  },
  {
      "title": "Côtes du Goëlo et de Granit Rose",
      "link": "https://www.youtube.com/watch?v=TPZZsBQL2ao",
      "type": "Côtes-d'Armor",
      "description": "",
      "coordinates": [
          48.75,
          -3
      ]
  },
  {
      "title": "L'Ariège",
      "link": "https://www.youtube.com/watch?v=IMOmzcLqvLE",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          42.965,
          1.6
      ]
  },
  {
      "title": "Mirepoix",
      "link": "https://www.youtube.com/watch?v=rc5tcXAC68I",
      "type": "L'Ariège",
      "description": "",
      "coordinates": [
          43.083,
          1.867
      ]
  },
  {
      "title": "Saint-Lizier",
      "link": "https://www.youtube.com/watch?v=6BTYFejPL5I",
      "type": "L'Ariège",
      "description": "",
      "coordinates": [
          43,
          1.133
      ]
  },
  {
      "title": "Foix",
      "link": "https://www.youtube.com/watch?v=uBiEZPOFOmc",
      "type": "L'Ariège",
      "description": "",
      "coordinates": [
          42.967,
          1.617
      ]
  },
  {
      "title": "Le Biterrois",
      "link": "https://www.youtube.com/watch?v=_nUUjBWH0Jw",
      "type": "Hérault",
      "description": "",
      "coordinates": [
          43.333,
          3.167
      ]
  },
  {
      "title": "Le littoral héraultais",
      "link": "https://www.youtube.com/watch?v=6tD0fnKqZ0Y",
      "type": "Hérault",
      "description": "",
      "coordinates": [
          43.3,
          3.5
      ]
  },
  {
      "title": "La Vallée de l'Hérault",
      "link": "https://www.youtube.com/watch?v=QhEl8hhsKM0",
      "type": "Hérault",
      "description": "",
      "coordinates": [
          43.68,
          3.36
      ]
  },
  {
      "title": "Le Mercantour",
      "link": "https://www.youtube.com/watch?v=K5io_z9s0eM",
      "type": "Alpes-Maritimes",
      "description": "",
      "coordinates": [
          44.167,
          7.167
      ]
  },
  {
      "title": "Le pays de Vence",
      "link": "https://www.youtube.com/watch?v=9FwwEPhmQ4I",
      "type": "Alpes-Maritimes",
      "description": "",
      "coordinates": [
          43.717,
          7.117
      ]
  },
  {
      "title": "Le pays de Grasse",
      "link": "https://www.youtube.com/watch?v=D71c3NTsT3E",
      "type": "Alpes-Maritimes",
      "description": "",
      "coordinates": [
          43.667,
          6.917
      ]
  },
  {
      "title": "Landes",
      "link": "https://www.youtube.com/watch?v=RssL4yD5AlA",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          44,
          -0.833
      ]
  },
  {
      "title": "Saint-Sever",
      "link": "https://www.youtube.com/watch?v=e-8oiLJT_MQ",
      "type": "Landes",
      "description": "",
      "coordinates": [
          43.75,
          -0.567
      ]
  },
  {
      "title": "Mont-de-Marsan",
      "link": "https://www.youtube.com/watch?v=AVUbyx1xhyw",
      "type": "Landes",
      "description": "",
      "coordinates": [
          43.883,
          -0.5
      ]
  },
  {
      "title": "Hossegor",
      "link": "https://www.youtube.com/watch?v=LvexRZuAkAI",
      "type": "Landes",
      "description": "",
      "coordinates": [
          43.667,
          -1.417
      ]
  },
  {
      "title": "L'Agenais et l'Albret",
      "link": "https://www.youtube.com/watch?v=PbTNWGGkNCE",
      "type": "Lot-et-Garonne",
      "description": "",
      "coordinates": [
          44.333,
          0.5
      ]
  },
  {
      "title": "La Vallée du Lot",
      "link": "https://www.youtube.com/watch?v=FOY0Vf_JTMs",
      "type": "Lot-et-Garonne",
      "description": "",
      "coordinates": [
          44.5,
          1.667
      ]
  },
  {
      "title": "Le Marmandais",
      "link": "https://www.youtube.com/watch?v=p2Od2RjAwoQ",
      "type": "Lot-et-Garonne",
      "description": "",
      "coordinates": [
          44.5,
          0.167
      ]
  },
  {
      "title": "Loire-Atlantique",
      "link": "https://www.youtube.com/watch?v=xPu8xArmS3o",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          47.357,
          -1.706
      ]
  },
  {
      "title": "Pornic",
      "link": "https://www.youtube.com/watch?v=5gmmrAdC-yk",
      "type": "Loire-Atlantique",
      "description": "",
      "coordinates": [
          47.117,
          -2.1
      ]
  },
  {
      "title": "Guérande",
      "link": "https://www.youtube.com/watch?v=bYcWSPmNelo",
      "type": "Loire-Atlantique",
      "description": "",
      "coordinates": [
          47.333,
          -2.417
      ]
  },
  {
      "title": "Nantes",
      "link": "https://www.youtube.com/watch?v=ZpLl-AGZUk0",
      "type": "Loire-Atlantique",
      "description": "",
      "coordinates": [
          47.217,
          -1.55
      ]
  },
  {
      "title": "PERIGORD NOIR",
      "link": "https://www.youtube.com/watch?v=6KUnoIRkhzc",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          44.833,
          1.167
      ]
  },
  {
      "title": "Saint-Léon-sur-Vézère",
      "link": "https://www.youtube.com/watch?v=ZqTqtglNyWE",
      "type": "Périgord Noir",
      "description": "",
      "coordinates": [
          45,
          1.083
      ]
  },
  {
      "title": "La Roque-Gageac",
      "link": "https://www.youtube.com/watch?v=vLavlL8zB2c",
      "type": "Périgord Noir",
      "description": "",
      "coordinates": [
          44.833,
          1.167
      ]
  },
  {
      "title": "Sarlat-la-Canéda",
      "link": "https://www.youtube.com/watch?v=3K_RsBc5oPM",
      "type": "Périgord Noir",
      "description": "",
      "coordinates": [
          44.883,
          1.217
      ]
  },
  {
      "title": "LA DRÔME",
      "link": "https://www.youtube.com/watch?v=KfsIG3Fcpzg",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          44.5,
          5.167
      ]
  },
  {
      "title": "La Garde-Adhémar",
      "link": "https://www.youtube.com/watch?v=aQthnVg8FDI",
      "type": "Drôme",
      "description": "",
      "coordinates": [
          44.383,
          4.75
      ]
  },
  {
      "title": "Drôme des collines",
      "link": "https://www.youtube.com/watch?v=1HvFVY4S2pg",
      "type": "Drôme",
      "description": "",
      "coordinates": [
          45,
          5
      ]
  },
  {
      "title": "Vercors",
      "link": "https://www.youtube.com/watch?v=5QgwcD3W9Uc",
      "type": "Drôme",
      "description": "",
      "coordinates": [
          44.967,
          5.417
      ]
  },
  {
      "title": "Chinon",
      "link": "https://www.youtube.com/watch?v=sKZra6DuatQ",
      "type": "Touraine",
      "description": "",
      "coordinates": [
          47.167,
          0.25
      ]
  },
  {
      "title": "Amboise",
      "link": "https://www.youtube.com/watch?v=8AYGAxG6JRc",
      "type": "Touraine",
      "description": "",
      "coordinates": [
          47.417,
          0.983
      ]
  },
  {
      "title": "Azay-le-Rideau",
      "link": "https://www.youtube.com/watch?v=kiVHvzXOcxo",
      "type": "Touraine",
      "description": "",
      "coordinates": [
          47.267,
          0.467
      ]
  },
  {
      "title": "LE GARD",
      "link": "https://www.youtube.com/watch?v=2ZiXldVUV1k",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          44,
          4.5
      ]
  },
  {
      "title": "Cévennes",
      "link": "https://www.youtube.com/watch?v=MsBoB6gKUe8",
      "type": "Gard",
      "description": "",
      "coordinates": [
          44.25,
          3.75
      ]
  },
  {
      "title": "Camargue",
      "link": "https://www.youtube.com/watch?v=FHdeLUtrghw",
      "type": "Gard",
      "description": "",
      "coordinates": [
          43.53,
          4.5
      ]
  },
  {
      "title": "Nîmes",
      "link": "https://www.youtube.com/watch?v=yZVHVhZbqpg",
      "type": "Gard",
      "description": "",
      "coordinates": [
          43.833,
          4.35
      ]
  },
  {
      "title": "Castres",
      "link": "https://www.youtube.com/watch?v=Jnrq9z9ykbw",
      "type": "Tarn",
      "description": "",
      "coordinates": [
          43.6,
          2.25
      ]
  },
  {
      "title": "Lautrec",
      "link": "https://www.youtube.com/watch?v=pDpe7UW7WI0",
      "type": "Tarn",
      "description": "",
      "coordinates": [
          43.7,
          2.133
      ]
  },
  {
      "title": "Albi",
      "link": "https://www.youtube.com/watch?v=XQUF3OrxNAY",
      "type": "Tarn",
      "description": "",
      "coordinates": [
          43.933,
          2.15
      ]
  },
  {
      "title": "Épinal",
      "link": "https://www.youtube.com/watch?v=2bQ2Q66L1k4",
      "type": "Vosges",
      "description": "",
      "coordinates": [
          48.175,
          6.449
      ]
  },
  {
      "title": "La Plaine Vosgienne",
      "link": "https://www.youtube.com/watch?v=RyO2jSnSPvk",
      "type": "Vosges",
      "description": "",
      "coordinates": [
          48.167,
          6.417
      ]
  },
  {
      "title": "Hautes-Vosges",
      "link": "https://www.youtube.com/watch?v=yN-1z5xqimQ",
      "type": "Vosges",
      "description": "",
      "coordinates": [
          48,
          7
      ]
  },
  {
      "title": "Moret-sur-Loing",
      "link": "https://www.youtube.com/watch?v=yyFCAGNhPQc",
      "type": "Seine-et-Marne",
      "description": "",
      "coordinates": [
          48.367,
          2.817
      ]
  },
  {
      "title": "Provins",
      "link": "https://www.youtube.com/watch?v=TDsaLgBYeT4",
      "type": "Seine-et-Marne",
      "description": "",
      "coordinates": [
          48.567,
          3.3
      ]
  },
  {
      "title": "Rocamadour",
      "link": "https://www.youtube.com/watch?v=p24viuAwqx8&t=231s",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          44.8,
          1.617
      ]
  },
  {
      "title": "Antraigues-sur-Volane",
      "link": "https://www.youtube.com/watch?v=olFnC-wUzN0",
      "type": "Région Auvergne-Rhône-Alpes",
      "description": "",
      "coordinates": [
          44.717,
          4.35
      ]
  },
  {
      "title": "Candes-Saint-Martin",
      "link": "https://www.youtube.com/watch?v=dTYN4r9F4II",
      "type": "Région Centre-Val de Loire",
      "description": "",
      "coordinates": [
          47.217,
          0.067
      ]
  },
  {
      "title": "Apremont-sur-Allier",
      "link": "https://www.youtube.com/watch?v=O042Mx68fHk",
      "type": "Région Centre-Val de Loire",
      "description": "",
      "coordinates": [
          46.9,
          3.05
      ]
  },
  {
      "title": "Barbizon",
      "link": "https://www.youtube.com/watch?v=z2GR__w2F20",
      "type": "Région Île-de-France",
      "description": "",
      "coordinates": [
          48.45,
          2.6
      ]
  },
  {
      "title": "Corbara",
      "link": "https://www.youtube.com/watch?v=wivDJyXhBZ8",
      "type": "Région Corse",
      "description": "",
      "coordinates": [
          42.633,
          8.9
      ]
  },
  {
      "title": "Espelette",
      "link": "https://www.youtube.com/watch?v=vqSf9lSsnkE",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          43.333,
          -1.45
      ]
  },
  {
      "title": "Bèze",
      "link": "https://www.youtube.com/watch?v=noqieMEpMrs",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          47.467,
          5.267
      ]
  },
  {
      "title": "Beynac-et-Cazenac",
      "link": "https://www.youtube.com/watch?v=hSt6Y1dBKPU",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          44.833,
          1.167
      ]
  },
  {
      "title": "Beuvron-en-Auge",
      "link": "https://www.youtube.com/watch?v=g_RhAECzO8Y",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.183,
          0.05
      ]
  },
  {
      "title": "Bellême",
      "link": "https://www.youtube.com/watch?v=fcy6VaAdXKY",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          48.367,
          0.567
      ]
  },
  {
      "title": "Andlau",
      "link": "https://www.youtube.com/watch?v=fcNInna3oBk",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48.383,
          7.417
      ]
  },
  {
      "title": "Collonges-la-Rouge",
      "link": "https://www.youtube.com/watch?v=fTMmNJg4D5A",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          45.067,
          1.65
      ]
  },
  {
      "title": "Châteauvillain",
      "link": "https://www.youtube.com/watch?v=dUzTOW0rAAc",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48.033,
          4.917
      ]
  },
  {
      "title": "Conques",
      "link": "https://www.youtube.com/watch?v=d6Q5-bdWnlE",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          44.6,
          2.4
      ]
  },
  {
      "title": "Barfleur",
      "link": "https://www.youtube.com/watch?v=ca3dbjdFceA",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.667,
          -1.267
      ]
  },
  {
      "title": "Angles-sur-l'Anglin",
      "link": "https://www.youtube.com/watch?v=XCFYvtWdeII",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          46.7,
          0.883
      ]
  },
  {
      "title": "Ferrette",
      "link": "https://www.youtube.com/watch?v=VXnkV4YH6rk",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          47.5,
          7.317
      ]
  },
  {
      "title": "Fénétrange",
      "link": "https://www.youtube.com/watch?v=TLniwDCvjh4",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48.85,
          7.017
      ]
  },
  {
      "title": "Castelnou",
      "link": "https://www.youtube.com/watch?v=Pk0RSvuT9ng",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          42.617,
          2.7
      ]
  },
  {
      "title": "Gargilesse-Dampierre",
      "link": "https://www.youtube.com/watch?v=PTsOjSQsXHc",
      "type": "Région Centre-Val-de-Loire",
      "description": "",
      "coordinates": [
          46.517,
          1.6
      ]
  },
  {
      "title": "Les Baux-de-Provence",
      "link": "https://www.youtube.com/watch?v=M27xJvYAQL0",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.75,
          4.8
      ]
  },
  {
      "title": "Blesle",
      "link": "https://www.youtube.com/watch?v=JtKhj8y3wAM",
      "type": "Région d'Auvergne-Rhône-Alpes",
      "description": "",
      "coordinates": [
          45.317,
          3.167
      ]
  },
  {
      "title": "Eguisheim",
      "link": "https://www.youtube.com/watch?v=IofQDydwBgU",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48.05,
          7.3
      ]
  },
  {
      "title": "Charroux",
      "link": "https://www.youtube.com/watch?v=Io5OaiCZeTA",
      "type": "Région d'Auvergne-Rhône-Alpes",
      "description": "",
      "coordinates": [
          46.183,
          3.167
      ]
  },
  {
      "title": "Kaysersberg",
      "link": "https://www.youtube.com/watch?v=GLtQmZTGXGE",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48.133,
          7.267
      ]
  },
  {
      "title": "Arcais",
      "link": "https://www.youtube.com/watch?v=EKCqKg9GUUM",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          46.3,
          -0.683
      ]
  },
  {
      "title": "Essoyes",
      "link": "https://www.youtube.com/watch?v=B8hLH_fdB40",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48.05,
          4.533
      ]
  },
  {
      "title": "Château-Chalon",
      "link": "https://www.youtube.com/watch?v=23z4nkcRe4c",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          46.75,
          5.633
      ]
  },
  {
      "title": "Étretat",
      "link": "https://www.youtube.com/watch?v=0tJbnFSvSrw",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.7,
          0.2
      ]
  },
  {
      "title": "Cordes-sur-Ciel",
      "link": "https://www.youtube.com/watch?v=0TJ6gAFsF04",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          44.067,
          1.95
      ]
  },
  {
      "title": "Ploumanach",
      "link": "https://www.youtube.com/watch?v=zbnu6Oku3dE",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          48.833,
          -3.483
      ]
  },
  {
      "title": "Maincy",
      "link": "https://www.youtube.com/watch?v=rWTu7fXIvv4",
      "type": "Région Île-de-France",
      "description": "",
      "coordinates": [
          48.55,
          2.7
      ]
  },
  {
      "title": "Marville",
      "link": "https://www.youtube.com/watch?v=pAGsv4iwABU",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          49.45,
          5.45
      ]
  },
  {
      "title": "Saint-Cirq-Lapopie",
      "link": "https://www.youtube.com/watch?v=njhWwOCW4As",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          44.467,
          1.667
      ]
  },
  {
      "title": "Noyers-sur-Serein",
      "link": "https://www.youtube.com/watch?v=mpawKZD9_n4",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          47.7,
          3.983
      ]
  },
  {
      "title": "Maroilles",
      "link": "https://www.youtube.com/watch?v=i5H6uhgZfCE",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          50.133,
          3.75
      ]
  },
  {
      "title": "Mussy-sur-Seine",
      "link": "https://www.youtube.com/watch?v=geRGVJtVw7U",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          47.967,
          4.5
      ]
  },
  {
      "title": "Montrésor",
      "link": "https://www.youtube.com/watch?v=fHb3ycH8_HU",
      "type": "Région Centre-Val de Loire",
      "description": "",
      "coordinates": [
          47.15,
          1.2
      ]
  },
  {
      "title": "Lavardin",
      "link": "https://www.youtube.com/watch?v=f8Y6n6-tUqs",
      "type": "Région Centre-Val de Loire",
      "description": "",
      "coordinates": [
          47.733,
          0.883
      ]
  },
  {
      "title": "Flavigny-sur-Ozerain",
      "link": "https://www.youtube.com/watch?v=eNKbCuLkRlA",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          47.517,
          4.533
      ]
  },
  {
      "title": "Pigna",
      "link": "https://www.youtube.com/watch?v=dmAEOYhdUxg",
      "type": "Région Corse",
      "description": "",
      "coordinates": [
          42.6,
          8.9
      ]
  },
  {
      "title": "Gerberoy",
      "link": "https://www.youtube.com/watch?v=dJjW663d2IU",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          49.533,
          1.85
      ]
  },
  {
      "title": "Piana",
      "link": "https://www.youtube.com/watch?v=_qTKQG9ZdU0",
      "type": "Région Corse",
      "description": "",
      "coordinates": [
          42.233,
          8.633
      ]
  },
  {
      "title": "Pesmes",
      "link": "https://www.youtube.com/watch?v=_QK58WbM_bI",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          47.283,
          5.567
      ]
  },
  {
      "title": "Pérouges",
      "link": "https://www.youtube.com/watch?v=Yt25hKx8Xeo",
      "type": "Région Auvergne-Rhône-Alpes",
      "description": "",
      "coordinates": [
          45.9,
          5.2
      ]
  },
  {
      "title": "La Perrière",
      "link": "https://www.youtube.com/watch?v=WN6WlDSY3yM",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          48.383,
          0.433
      ]
  },
  {
      "title": "Parfondeval",
      "link": "https://www.youtube.com/watch?v=Uz_6QMqinPo",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          49.733,
          4.15
      ]
  },
  {
      "title": "Riquewihr",
      "link": "https://www.youtube.com/watch?v=SWOwuGxz1Fc",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48.167,
          7.3
      ]
  },
  {
      "title": "Gourdon",
      "link": "https://www.youtube.com/watch?v=RozX4AWCfZw",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          44.733,
          1.383
      ]
  },
  {
      "title": "Lods",
      "link": "https://www.youtube.com/watch?v=OYRa5Qu-VRs",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          47.033,
          6.25
      ]
  },
  {
      "title": "Le Bec-Hellouin",
      "link": "https://www.youtube.com/watch?v=OMQq6f9qs8k",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.233,
          0.717
      ]
  },
  {
      "title": "Moustiers-Sainte-Marie",
      "link": "https://www.youtube.com/watch?v=NkUb4aSlQEM",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.85,
          6.217
      ]
  },
  {
      "title": "Labastide-d'Armagnac",
      "link": "https://www.youtube.com/watch?v=GEFOZoFKyIM",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          43.967,
          -0.183
      ]
  },
  {
      "title": "Baume-les-Messieurs",
      "link": "https://www.youtube.com/watch?v=ETAgKyVDdv8",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          46.717,
          5.65
      ]
  },
  {
      "title": "Lyons-la-Forêt",
      "link": "https://www.youtube.com/watch?v=3mo2K-epY60",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.4,
          1.467
      ]
  },
  {
      "title": "Grez-sur-Loing",
      "link": "https://www.youtube.com/watch?v=3PBo02DuLbY",
      "type": "Région Île-de-France",
      "description": "",
      "coordinates": [
          48.317,
          2.683
      ]
  },
  {
      "title": "Montsoreau",
      "link": "https://www.youtube.com/watch?v=2dJSLEifiQA",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          47.217,
          0.05
      ]
  },
  {
      "title": "Rodemack",
      "link": "https://www.youtube.com/watch?v=227oIF9KZSg",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          49.467,
          6.233
      ]
  },
  {
      "title": "La Roche-Guyon",
      "link": "https://www.youtube.com/watch?v=-PTbJUVAhNw",
      "type": " Région Île-de-France",
      "description": "",
      "coordinates": [
          49.083,
          1.633
      ]
  },
  {
      "title": "Saint-Guilhem-Le-Desert",
      "link": "https://www.youtube.com/watch?v=B4YR9H9WqOE",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          43.733,
          3.55
      ]
  },
  {
      "title": "Saint-Suliac",
      "link": "https://www.youtube.com/watch?v=wqxB_kFtZL4",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          48.567,
          -2.017
      ]
  },
  {
      "title": "Saint-Antonin-Noble-Val",
      "link": "https://www.youtube.com/watch?v=S_1jQBD4tmc",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          44.15,
          1.75
      ]
  },
  {
      "title": "Fontainebleau",
      "link": "https://www.youtube.com/watch?v=hQCqaynO_x8",
      "type": "Seine-et-Marne",
      "description": "",
      "coordinates": [
          48.4,
          2.7
      ]
  },
  {
      "title": "LE PAYS CARCASSONNAIS",
      "link": "https://www.youtube.com/watch?v=9KI0G2Od1TQ",
      "type": "\"1000 Pays en un\"",
      "description": "",
      "coordinates": [
          43.213,
          2.351
      ]
  },
  {
      "title": "Les Grands Causses",
      "link": "https://www.youtube.com/watch?v=8yF2yiFtXnI",
      "type": "Aveyron",
      "description": "",
      "coordinates": [
          44.5,
          3.5
      ]
  },
  {
      "title": "Aubrac Aveyronnais",
      "link": "https://www.youtube.com/watch?v=1wD6OKryzyo",
      "type": "Aveyron",
      "description": "",
      "coordinates": [
          44.5,
          3
      ]
  },
  {
      "title": "Rouergue Occidental",
      "link": "https://www.youtube.com/watch?v=lVhgTKWMGZk",
      "type": "Aveyron",
      "description": "",
      "coordinates": [
          44.5,
          2.5
      ]
  },
  {
      "title": "Sainte-Suzanne",
      "link": "https://www.youtube.com/watch?v=LIMlQ7Gznos",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          48.1,
          -0.35
      ]
  },
  {
      "title": "Sebourg",
      "link": "https://www.youtube.com/watch?v=zNJFl4_Atk0",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          50.35,
          3.65
      ]
  },
  {
      "title": "Salers",
      "link": "https://www.youtube.com/watch?v=Kd1LKb_LuyQ",
      "type": "Région Auvergne-Rhône-Alpes",
      "description": "",
      "coordinates": [
          45.133,
          2.5
      ]
  },
  {
      "title": "Saint-Émilion",
      "link": "https://www.youtube.com/watch?v=F-Ono37tdLs",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          44.883,
          -0.15
      ]
  },
  {
      "title": "Saint-Ceneri-Le-Cerei",
      "link": "https://www.youtube.com/watch?v=5RxJpXiDjew",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          48.383,
          0.433
      ]
  },
  {
      "title": "Saint-Nectaire",
      "link": "https://www.youtube.com/watch?v=ewPFLbP4ubY",
      "type": "Région Auvergne-Rhône-Alpes",
      "description": "",
      "coordinates": [
          45.583,
          2.983
      ]
  },
  {
      "title": "Saint-Quirin",
      "link": "https://www.youtube.com/watch?v=WMU4PTERaJY",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          48.617,
          7.067
      ]
  },
  {
      "title": "Sainte-Énimie",
      "link": "https://www.youtube.com/watch?v=AKCr1p7hlUM",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          44.367,
          3.417
      ]
  },
  {
      "title": "Sauzon",
      "link": "https://www.youtube.com/watch?v=0U68kLUkMPU",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          47.367,
          -3.217
      ]
  },
  {
      "title": "Veules-les-Roses",
      "link": "https://www.youtube.com/watch?v=wMwkz4y6SLE",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.867,
          0.8
      ]
  },
  {
      "title": "Septmonts",
      "link": "https://www.youtube.com/watch?v=q1XisQvtuRU",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          49.333,
          3.35
      ]
  },
  {
      "title": "Terdeghem",
      "link": "https://www.youtube.com/watch?v=nTPyaAVVKWw",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          50.8,
          2.533
      ]
  },
  {
      "title": "Vouvant- Région Pays de la Loire",
      "link": "https://www.youtube.com/watch?v=n7L7pyNjsKU",
      "type": "Stéphane Bern",
      "description": "",
      "coordinates": [
          46.567,
          -0.767
      ]
  },
  {
      "title": "Solutre-Pouilly",
      "link": "https://www.youtube.com/watch?v=kQRk_zM_yJY",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          46.3,
          4.717
      ]
  },
  {
      "title": "Wissant",
      "link": "https://www.youtube.com/watch?v=kKiwwtdz8IA",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          50.883,
          1.667
      ]
  },
  {
      "title": "Villefranche-de-Conflent",
      "link": "https://www.youtube.com/watch?v=gT6l4MzWkRM",
      "type": "Région Occitanie",
      "description": "",
      "coordinates": [
          42.583,
          2.367
      ]
  },
  {
      "title": "Tourtour",
      "link": "https://www.youtube.com/watch?v=bg1OWo1pljo",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.583,
          6.3
      ]
  },
  {
      "title": "Trentemoult",
      "link": "https://www.youtube.com/watch?v=a6mTjmaJEbk",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          47.2,
          -1.583
      ]
  },
  {
      "title": "Vezelay",
      "link": "https://www.youtube.com/watch?v=Rvn68aDUDo4",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          47.467,
          3.75
      ]
  },
  {
      "title": "Talmont-sur-Gironde",
      "link": "https://www.youtube.com/watch?v=NPLRUbvaHqQ",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          45.533,
          -0.917
      ]
  },
  {
      "title": "Annonce du classement du Village préféré des Français 2016",
      "link": "https://www.youtube.com/watch?v=Ko9gDW1f52k",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Arbois",
      "link": "https://www.youtube.com/watch?v=IPnB9kj7L-U",
      "type": "Région Bourgogne-Franche-Comté",
      "description": "",
      "coordinates": [
          46.9,
          5.767
      ]
  },
  {
      "title": "Béhuard",
      "link": "https://www.youtube.com/watch?v=Exm0gClYRA8",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          47.383,
          -0.65
      ]
  },
  {
      "title": "Célébration à Rochefort-en-Terre, gagnant 2016 du Village préféré des Français",
      "link": "https://www.youtube.com/watch?v=B4RnpsZ6Bi0",
      "description": "",
      "coordinates": [
          47.7,
          -2.333
      ]
  },
  {
      "title": "Turenne",
      "link": "https://www.youtube.com/watch?v=9jsg7S8I6Mo",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          45.05,
          1.583
      ]
  },
  {
      "title": "Yvoire",
      "link": "https://www.youtube.com/watch?v=6IGBH5sKUZk",
      "type": "Région Auvergne-Rhône-Alpes",
      "description": "",
      "coordinates": [
          46.367,
          6.333
      ]
  },
  {
      "title": "Varengeville-sur-mer",
      "link": "https://www.youtube.com/watch?v=pqk0Zw59mO8",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.9,
          0.983
      ]
  },
  {
      "title": "Sare",
      "link": "https://www.youtube.com/watch?v=I5oZroYkQgc",
      "type": "Région Nouvelle-Aquitaine",
      "description": "",
      "coordinates": [
          43.317,
          -1.583
      ]
  },
  {
      "title": "Courances",
      "link": "https://www.youtube.com/watch?v=38lh-TeKsoQ",
      "type": "Région Île-de-France",
      "description": "",
      "coordinates": [
          48.433,
          2.467
      ]
  },
  {
      "title": "Vogüé",
      "link": "https://www.youtube.com/watch?v=38FMW4rST-k",
      "type": "Région Auvergne-Rhône-Alpes",
      "description": "",
      "coordinates": [
          44.55,
          4.417
      ]
  },
  {
      "title": "Gordes",
      "link": "https://www.youtube.com/watch?v=zR13IcCRqqI",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.9,
          5.2
      ]
  },
  {
      "title": "Plombières-les-Bains",
      "link": "https://www.youtube.com/watch?v=ez0BEkCq8ic",
      "type": "Région Grand Est",
      "description": "",
      "coordinates": [
          47.967,
          6.467
      ]
  },
  {
      "title": "Nonza",
      "link": "https://www.youtube.com/watch?v=bLYr0vf0lMU",
      "type": "Région Haute-Corse",
      "description": "",
      "coordinates": [
          42.783,
          9.35
      ]
  },
  {
      "title": "Rochefort-en-Terre",
      "link": "https://www.youtube.com/watch?v=IVj1Hj8WEjc",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          47.7,
          -2.333
      ]
  },
  {
      "title": "Montreuil-sur-mer",
      "link": "https://www.youtube.com/watch?v=GldVdBmg8Ho",
      "type": "Région Hauts-de-France",
      "description": "",
      "coordinates": [
          50.467,
          1.767
      ]
  },
  {
      "title": "Marseille",
      "link": "https://www.youtube.com/watch?v=R8iCS9dodJA",
      "type": "Bouches-du-Rhône",
      "description": "",
      "coordinates": [
          43.3,
          5.4
      ]
  },
  {
      "title": "Aix-en-Provence",
      "link": "https://www.youtube.com/watch?v=pOlq_fe_wy4",
      "type": "Bouches-du-Rhône",
      "description": "",
      "coordinates": [
          43.533,
          5.45
      ]
  },
  {
      "title": "Arles",
      "link": "https://www.youtube.com/watch?v=Y3tllvHyEUk",
      "type": "Bouches-du-Rhône",
      "description": "",
      "coordinates": [
          43.683,
          4.633
      ]
  },
  {
      "title": "Le Chablais",
      "link": "https://www.youtube.com/watch?v=pupmxhqbmjU",
      "type": "Haute-Savoie",
      "description": "",
      "coordinates": [
          46.25,
          6.5
      ]
  },
  {
      "title": "Annecy",
      "link": "https://www.youtube.com/watch?v=X94lL-JnQZ8",
      "type": "Haute-Savoie",
      "description": "",
      "coordinates": [
          45.9,
          6.133
      ]
  },
  {
      "title": "Pays du Mont-Blanc",
      "link": "https://www.youtube.com/watch?v=PIO3KmxjzjU",
      "type": "Haute-Savoie",
      "description": "",
      "coordinates": [
          45.833,
          6.833
      ]
  },
  {
      "title": "Sud vendéen",
      "link": "https://www.youtube.com/watch?v=rb0PIYaj3JM",
      "type": "Vendée",
      "description": "",
      "coordinates": [
          46.5,
          -1.5
      ]
  },
  {
      "title": "Littoral vendéen",
      "link": "https://www.youtube.com/watch?v=SDSp57qXPZA",
      "type": "Vendée",
      "description": "",
      "coordinates": [
          46.5,
          -1.5
      ]
  },
  {
      "title": "Bocage vendéen",
      "link": "https://www.youtube.com/watch?v=Zb8cwyNRbC4",
      "type": "Vendée",
      "description": "",
      "coordinates": [
          46.5,
          -1.5
      ]
  },
  {
      "title": "L'ARDÈCHE",
      "link": "https://www.youtube.com/watch?v=-4r4cKVa9tg",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          44.5,
          4.5
      ]
  },
  {
      "title": "Tournon-sur-Rhône",
      "link": "https://www.youtube.com/watch?v=X1O6LKO3d_4",
      "type": "Ardèche",
      "description": "",
      "coordinates": [
          45.067,
          4.833
      ]
  },
  {
      "title": "Antraigues-sur-Volane",
      "link": "https://www.youtube.com/watch?v=91bEe1gkD2g",
      "type": "Ardèche",
      "description": "",
      "coordinates": [
          44.717,
          4.35
      ]
  },
  {
      "title": "Vallon-Pont-d'Arc",
      "link": "https://www.youtube.com/watch?v=WTRHEf0Ulps",
      "type": "Ardèche",
      "description": "",
      "coordinates": [
          44.4,
          4.4
      ]
  },
  {
      "title": "Alet-les-Bains",
      "link": "https://www.youtube.com/watch?v=GpwC8_ZHOS0",
      "type": "Aude",
      "description": "",
      "coordinates": [
          42.983,
          2.25
      ]
  },
  {
      "title": "Gruissan",
      "link": "https://www.youtube.com/watch?v=vs2Oce5b0pg&t=133s",
      "type": "Aude",
      "description": "",
      "coordinates": [
          43.1,
          3.083
      ]
  },
  {
      "title": "Carcassonne",
      "link": "https://www.youtube.com/watch?v=-SYQPZ3e_WI",
      "type": "Aude",
      "description": "",
      "coordinates": [
          43.213,
          2.351
      ]
  },
  {
      "title": "Blaye",
      "link": "https://www.youtube.com/watch?v=bQmx3mKv7aA",
      "type": "Gironde",
      "description": "",
      "coordinates": [
          45.133,
          -0.667
      ]
  },
  {
      "title": "La citadelle souterraine de Verdun",
      "link": "https://www.youtube.com/watch?v=d7N6Tb6BDUQ",
      "type": "Région Lorraine",
      "description": "",
      "coordinates": [
          49.167,
          5.383
      ]
  },
  {
      "title": "Grotte du Pech Merle",
      "link": "https://www.youtube.com/watch?v=b8WdFMHu4QY",
      "type": "Région Midi-Pyrénées",
      "description": "",
      "coordinates": [
          44.5,
          1.667
      ]
  },
  {
      "title": "La basilique du Sacré-Cœur de Montmartre",
      "link": "https://www.youtube.com/watch?v=V1MZEAkqM60",
      "type": "Région Ile de France",
      "description": "",
      "coordinates": [
          48.886,
          2.343
      ]
  },
  {
      "title": "Château de Tiffauges",
      "link": "https://www.youtube.com/watch?v=QiPXkdD3U5Y",
      "type": "Région Pays-de-la-Loire",
      "description": "",
      "coordinates": [
          47.017,
          -1.117
      ]
  },
  {
      "title": "La cathédrale Notre-Dame-de-Rouen",
      "link": "https://www.youtube.com/watch?v=QHQx5jbXVac",
      "type": "Région Haute-Normandie",
      "description": "",
      "coordinates": [
          49.44,
          1.095
      ]
  },
  {
      "title": "La cathédrale d'Amiens",
      "link": "https://www.youtube.com/watch?v=FGk5V63J5MY",
      "type": "Région Picardie",
      "description": "",
      "coordinates": [
          49.895,
          2.302
      ]
  },
  {
      "title": "La base sous-marine de Lorient",
      "link": "https://www.youtube.com/watch?v=BXtreQhSSuc",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          47.733,
          -3.367
      ]
  },
  {
      "title": "La cathédrale Saint Julien Mans",
      "link": "https://www.youtube.com/watch?v=6vlmNcc-Dv0",
      "type": "Région Pays-de-la-Loire",
      "description": "",
      "coordinates": [
          48,
          0.2
      ]
  },
  {
      "title": "Hôtel Dieu de Beaune",
      "link": "https://www.youtube.com/watch?v=3fP3S746GEA",
      "type": "Région Bourgogne",
      "description": "",
      "coordinates": [
          47.025,
          4.838
      ]
  },
  {
      "title": "La Chartreuse de Neuville",
      "link": "https://www.youtube.com/watch?v=yRmXTrc1q5M",
      "type": "Région Nord-Pas-de-Calais",
      "description": "",
      "coordinates": [
          50.467,
          2.567
      ]
  },
  {
      "title": "La citadelle de Besançon",
      "link": "https://www.youtube.com/watch?v=xbplEeYA8tw",
      "type": "Région Franche-Comté",
      "description": "",
      "coordinates": [
          47.233,
          6.033
      ]
  },
  {
      "title": "La cathédrale Notre-Dame-de-Chartres",
      "link": "https://www.youtube.com/watch?v=uC-RtXWeCiI",
      "type": "Région Centre",
      "description": "",
      "coordinates": [
          48.447,
          1.487
      ]
  },
  {
      "title": "Hôtel Magon dit demeure de Corsaire",
      "link": "https://www.youtube.com/watch?v=rkH6XVk-I9c",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          48.633,
          -2.05
      ]
  },
  {
      "title": "Basilique Sainte-Marie-Madeleine de Vezelay",
      "link": "https://www.youtube.com/watch?v=iDyxkGiPcDc",
      "type": "Région Bourgogne",
      "description": "",
      "coordinates": [
          47.467,
          3.75
      ]
  },
  {
      "title": "La cathédrale de Strasbourg",
      "link": "https://www.youtube.com/watch?v=_1UZkfDUyLU",
      "type": "Région Alsace",
      "description": "",
      "coordinates": [
          48.582,
          7.75
      ]
  },
  {
      "title": "La cathédrale Saint-Pierre de Poitiers",
      "link": "https://www.youtube.com/watch?v=Ze1M3r7by1E",
      "type": "Région Poitou-Charentes",
      "description": "",
      "coordinates": [
          46.58,
          0.34
      ]
  },
  {
      "title": "La cathédrale de Reims",
      "link": "https://www.youtube.com/watch?v=YVxcGhgIzVY",
      "type": "Région Champagne-Ardenne",
      "description": "",
      "coordinates": [
          49.253,
          4.034
      ]
  },
  {
      "title": "La cathédrale du Puy-en-Velay",
      "link": "https://www.youtube.com/watch?v=YAgHTr_AO2I",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          45.043,
          3.885
      ]
  },
  {
      "title": "La citadelle de Calvi",
      "link": "https://www.youtube.com/watch?v=UYqCsymbB5A",
      "type": "Région Corse",
      "description": "",
      "coordinates": [
          42.567,
          8.75
      ]
  },
  {
      "title": "La basilique Notre-Dame-de-Fourvière",
      "link": "https://www.youtube.com/watch?v=T-ayRwmAjlo",
      "type": "Région Rhone-Alpes",
      "description": "",
      "coordinates": [
          45.762,
          4.823
      ]
  },
  {
      "title": "La Cité religieuse de Rocamadour",
      "link": "https://www.youtube.com/watch?v=RArcykxi2y8",
      "type": "Région Midi-Pyrénées",
      "description": "",
      "coordinates": [
          44.8,
          1.617
      ]
  },
  {
      "title": "La citadelle de Brouage",
      "link": "https://www.youtube.com/watch?v=L97RqWXqjQ4",
      "type": "Région Poitou-Charentes",
      "description": "",
      "coordinates": [
          45.867,
          -1.067
      ]
  },
  {
      "title": "Abbaye de la Chaise Dieu",
      "link": "https://www.youtube.com/watch?v=3dXLSE_cXi4",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          45.317,
          3.7
      ]
  },
  {
      "title": "La basilique Notre-Dame-de-la-Garde",
      "link": "https://www.youtube.com/watch?v=3GWEXiYiBtU",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.283,
          5.367
      ]
  },
  {
      "title": "La cité médiévale de Carcassonne",
      "link": "https://www.youtube.com/watch?v=1FlWMTfCCyM",
      "type": "Région Languedoc Roussillon",
      "description": "",
      "coordinates": [
          43.213,
          2.351
      ]
  },
  {
      "title": "La gare de Metz",
      "link": "https://www.youtube.com/watch?v=vSgEtlHEc_E",
      "type": "Région Lorraine",
      "description": "",
      "coordinates": [
          49.11,
          6.177
      ]
  },
  {
      "title": "La place Stanislas Nancy",
      "link": "https://www.youtube.com/watch?v=v2yQ9s-cpWE",
      "type": "Région Lorraine",
      "description": "",
      "coordinates": [
          48.693,
          6.183
      ]
  },
  {
      "title": "La gare des Benedictins de Limoges",
      "link": "https://www.youtube.com/watch?v=siQxVi-SYGU",
      "type": "Région Limousin",
      "description": "",
      "coordinates": [
          45.835,
          1.261
      ]
  },
  {
      "title": "La Piscine, musée d'Art et d'Industrie André Diligent",
      "link": "https://www.youtube.com/watch?v=exCbLsyNvuk",
      "type": "Région Nord-Pas-de-Calais",
      "description": "",
      "coordinates": [
          50.633,
          3.067
      ]
  },
  {
      "title": "La grotte Chauvet-Pont d’Arc",
      "link": "https://www.youtube.com/watch?v=_erMPRWjh7M",
      "type": "Région Rhône-Alpes",
      "description": "",
      "coordinates": [
          44.4,
          4.4
      ]
  },
  {
      "title": "La manufacture de Wesserling",
      "link": "https://www.youtube.com/watch?v=YTU3HlySVug",
      "type": "Région Alsace",
      "description": "",
      "coordinates": [
          47.867,
          7.083
      ]
  },
  {
      "title": "La cité souterainne de Naours",
      "link": "https://www.youtube.com/watch?v=U42Ebpvk-sY",
      "type": "Région Picardie",
      "description": "",
      "coordinates": [
          50.033,
          2.283
      ]
  },
  {
      "title": "La villa Strassburger",
      "link": "https://www.youtube.com/watch?v=0jRQ8MKb95g",
      "type": "Région Basse Normandie",
      "description": "",
      "coordinates": [
          48.633,
          -2.05
      ]
  },
  {
      "title": "La villa Arnaga",
      "link": "https://www.youtube.com/watch?v=y8lhxq9VZyE",
      "type": "Région Aquitaine",
      "description": "",
      "coordinates": [
          43.3,
          -1.383
      ]
  },
  {
      "title": "La Gare Maritime Transatlantique",
      "link": "https://www.youtube.com/watch?v=w3Ah_G4WP4w",
      "type": "Région Basse-Normandie",
      "description": "",
      "coordinates": [
          48.633,
          -2.05
      ]
  },
  {
      "title": "La corderie royale de Rochefort",
      "link": "https://www.youtube.com/watch?v=tYKgiYAgy5Q",
      "type": "Région Poitou-Charentes",
      "description": "",
      "coordinates": [
          45.933,
          -0.967
      ]
  },
  {
      "title": "La Croix de Lorraine",
      "link": "https://www.youtube.com/watch?v=idHj6uLNM9Y",
      "type": "Région Champagne-Ardenne",
      "description": "",
      "coordinates": [
          48.69,
          6.183
      ]
  },
  {
      "title": "La tour Eiffel",
      "link": "https://www.youtube.com/watch?v=b6C2TzFDT9U",
      "type": "Région Ile de France",
      "description": "",
      "coordinates": [
          48.858,
          2.294
      ]
  },
  {
      "title": "La vieille Bourse de Lille",
      "link": "https://www.youtube.com/watch?v=Tec3520LQmM",
      "type": "Région Nord-Pas-de-Calais",
      "description": "",
      "coordinates": [
          50.637,
          3.063
      ]
  },
  {
      "title": "La Coupole",
      "link": "https://www.youtube.com/watch?v=9WYAxorx4-A",
      "type": "Région Nord-Pas-de-Calais",
      "description": "",
      "coordinates": [
          50.717,
          2.25
      ]
  },
  {
      "title": "La saline royale d'Arc-et-Senans",
      "link": "https://www.youtube.com/watch?v=7XPbz5NjrCw",
      "type": "Région Franche-Comté",
      "description": "",
      "coordinates": [
          47.033,
          5.783
      ]
  },
  {
      "title": "La villa Kerylos",
      "link": "https://www.youtube.com/watch?v=5phv5ouopZU",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.7,
          7.3
      ]
  },
  {
      "title": "La Bergerie, graine et Ficelle",
      "link": "https://www.youtube.com/watch?v=eFU7R1bTOPo",
      "type": "Saint-Jeannet",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La ferme de Marie-Eugénie",
      "link": "https://www.youtube.com/watch?v=VBucXJR3s6A",
      "type": "Saône-et-Loire",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La ferme de Marie",
      "link": "https://www.youtube.com/watch?v=OwLex1AxmQI",
      "type": "Bas-Rhin",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La ferme blanche",
      "link": "https://www.youtube.com/watch?v=HdOt4VJzz0Q",
      "type": "Indre et Loire",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Etxegaraïa, la maison basque",
      "link": "https://www.youtube.com/watch?v=AUQLAVNt904",
      "type": "Pyrénées-Atlantiques",
      "description": "",
      "coordinates": [
          43.3,
          -1.383
      ]
  },
  {
      "title": "Ker Ehan",
      "link": "https://www.youtube.com/watch?v=20rfWHIPN9Q",
      "type": "Loire-Atlantique",
      "description": "",
      "coordinates": [
          48.202,
          -2.932
      ]
  },
  {
      "title": "La longère normande, bord de Scène",
      "link": "https://www.youtube.com/watch?v=0zxuS1BzDMY",
      "type": "Eure",
      "description": "",
      "coordinates": [
          49,
          -1.5
      ]
  },
  {
      "title": "Kereleven",
      "link": "https://www.youtube.com/watch?v=zCkpjSNlRV8",
      "type": "Morbihan",
      "description": "",
      "coordinates": [
          48.202,
          -2.932
      ]
  },
  {
      "title": "La Grange Del Sur",
      "link": "https://www.youtube.com/watch?v=vv9NL31aUWQ",
      "type": "Corrèze",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La chapelle du couvent",
      "link": "https://www.youtube.com/watch?v=qKQkKiyvLBA",
      "type": "Puy-de-Dôme",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Datcha",
      "link": "https://www.youtube.com/watch?v=pw4QEH8so8I",
      "type": "Somme",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Grange à Nicolas",
      "link": "https://www.youtube.com/watch?v=h18TSyrR7io",
      "type": "Jura",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Casa Torreillane",
      "link": "https://www.youtube.com/watch?v=WnvQ28X8ano",
      "type": "Pyrénées-Orientales",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La ferme Zen, O Sixieme Sens",
      "link": "https://www.youtube.com/watch?v=SjWgJw8q6sc",
      "type": "Ardennes",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La ferme de Marion",
      "link": "https://www.youtube.com/watch?v=OxTgXPeP8qk",
      "type": "Vosges",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Charmeraie",
      "link": "https://www.youtube.com/watch?v=Gmg9CDr-71M",
      "type": "Oise",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La ferme alsacienne",
      "link": "https://www.youtube.com/watch?v=CxpDpVZ9qJw",
      "type": "Bas-Rhin",
      "description": "",
      "coordinates": [
          48.318,
          7.441
      ]
  },
  {
      "title": "La ferme d’alpage",
      "link": "https://www.youtube.com/watch?v=Apdl38t1dF4",
      "type": "Haute-Savoie",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Chez les Colin, la ferme comtoise",
      "link": "https://www.youtube.com/watch?v=0RbT7e8tlUw",
      "type": "Doubs",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "L'abbaye de Clairvaux",
      "link": "https://www.youtube.com/watch?v=jTSEC8py0cg",
      "type": "Région Champagne-Ardenne",
      "description": "",
      "coordinates": [
          48.15,
          4.783
      ]
  },
  {
      "title": "La ville close de concarneau",
      "link": "https://www.youtube.com/watch?v=ItOoNkXReJo",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          47.867,
          -3.917
      ]
  },
  {
      "title": "L'abbaye d'Aubazine",
      "link": "https://www.youtube.com/watch?v=BxLDQbP74sY",
      "type": "Région Limousin",
      "description": "",
      "coordinates": [
          45.167,
          1.667
      ]
  },
  {
      "title": "Le château de Cognac",
      "link": "https://www.youtube.com/watch?v=hST9ySsts7o",
      "type": "Région Poitou-Charentes",
      "description": "",
      "coordinates": [
          45.7,
          -0.333
      ]
  },
  {
      "title": "Le château de Bussy Rabutin",
      "link": "https://www.youtube.com/watch?v=Vy5Cou5jaJc",
      "type": "Région Bourgogne",
      "description": "",
      "coordinates": [
          47.467,
          4.533
      ]
  },
  {
      "title": "Le château de Boussac",
      "link": "https://www.youtube.com/watch?v=RrSR2jFvpMc",
      "type": "Région Limousin",
      "description": "",
      "coordinates": [
          46.333,
          2.217
      ]
  },
  {
      "title": "Le château d'Azay le Rideau",
      "link": "https://www.youtube.com/watch?v=QJYLjLXm6Mc",
      "type": "Région Centre",
      "description": "",
      "coordinates": [
          47.267,
          0.467
      ]
  },
  {
      "title": "L'abbaye de Fontevraud",
      "link": "https://www.youtube.com/watch?v=Q965qkwZqnk",
      "type": "Région Pays-de-la-Loire",
      "description": "",
      "coordinates": [
          47.183,
          0.05
      ]
  },
  {
      "title": "Le château d'Angers",
      "link": "https://www.youtube.com/watch?v=F3mGJL2yqhY",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          47.467,
          -0.55
      ]
  },
  {
      "title": "Le centre minier de Lewarde",
      "link": "https://www.youtube.com/watch?v=AS4mwo-wfBg",
      "type": "Région Nord-Pas-de-Calais",
      "description": "",
      "coordinates": [
          50.333,
          3.167
      ]
  },
  {
      "title": "Le château de Foix",
      "link": "https://www.youtube.com/watch?v=5bqiaeee5ag",
      "type": "Région Midi-Pyrénées",
      "description": "",
      "coordinates": [
          42.967,
          1.617
      ]
  },
  {
      "title": "Le château de Bazoches",
      "link": "https://www.youtube.com/watch?v=4yemRnMfJ-0",
      "type": "Région Bourgogne",
      "description": "",
      "coordinates": [
          47.383,
          3.783
      ]
  },
  {
      "title": "L’Abbaye de Jumièges",
      "link": "https://www.youtube.com/watch?v=xR8Z0sejegg",
      "type": "Région Haute-Normandie",
      "description": "",
      "coordinates": [
          49.433,
          0.817
      ]
  },
  {
      "title": "Le château de Castelnaud",
      "link": "https://www.youtube.com/watch?v=vhaW2k6yw_c",
      "type": "Région Aquitaine",
      "description": "",
      "coordinates": [
          44.817,
          1.15
      ]
  },
  {
      "title": "Le château de Bonneval",
      "link": "https://www.youtube.com/watch?v=lpBodeGyeOA",
      "type": "Région Limousin",
      "description": "",
      "coordinates": [
          45.167,
          1.667
      ]
  },
  {
      "title": "Le château de Beaumesnil",
      "link": "https://www.youtube.com/watch?v=j-ZduMip-AE",
      "type": "Région Haute-Normandie",
      "description": "",
      "coordinates": [
          49.017,
          0.717
      ]
  },
  {
      "title": "Le château de Chambord",
      "link": "https://www.youtube.com/watch?v=TcIPi12lFgU",
      "type": "Région Centre",
      "description": "",
      "coordinates": [
          47.617,
          1.517
      ]
  },
  {
      "title": "Le château d'Anjony",
      "link": "https://www.youtube.com/watch?v=SnIM6R-OR_Q",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          45.167,
          2.5
      ]
  },
  {
      "title": "Le canal de la Robine",
      "link": "https://www.youtube.com/watch?v=S3ZPAA9hHik",
      "type": "Région Languedoc-Roussillon",
      "description": "",
      "coordinates": [
          43.183,
          3
      ]
  },
  {
      "title": "Le château de Carrouges",
      "link": "https://www.youtube.com/watch?v=Nm9vDaCqfuc",
      "type": "Région Basse Normandie",
      "description": "",
      "coordinates": [
          48.567,
          -0.15
      ]
  },
  {
      "title": "Le beffroi d’Arras",
      "link": "https://www.youtube.com/watch?v=KJzmBx-gJ2g",
      "type": "Région Nord-Pas-de-Calais",
      "description": "",
      "coordinates": [
          50.283,
          2.783
      ]
  },
  {
      "title": "Le château d'Amboise",
      "link": "https://www.youtube.com/watch?v=IToetFBdwjE",
      "type": "Région Centre",
      "description": "",
      "coordinates": [
          47.417,
          0.983
      ]
  },
  {
      "title": "L'abbaye de Valloires",
      "link": "https://www.youtube.com/watch?v=FJtfuBh9C-o",
      "type": "Région Picardie",
      "description": "",
      "coordinates": [
          50.333,
          1.833
      ]
  },
  {
      "title": "L'abbaye de Clunny",
      "link": "https://www.youtube.com/watch?v=9Y9KQQwLRfM",
      "type": "Région Bourgogne",
      "description": "",
      "coordinates": [
          46.433,
          4.65
      ]
  },
  {
      "title": "L'alignement de Carnac",
      "link": "https://www.youtube.com/watch?v=7GZ595v3-KI",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          47.583,
          -3.083
      ]
  },
  {
      "title": "L'abbaye Saint-Martin Canigou",
      "link": "https://www.youtube.com/watch?v=30rFxxP4Gqc",
      "type": "Région Languedoc Roussillon",
      "description": "",
      "coordinates": [
          42.5,
          2.75
      ]
  },
  {
      "title": "Le beffroi de Bethune",
      "link": "https://www.youtube.com/watch?v=2RWbjSOUCEU",
      "type": "Région Nord-Pas-de-Calais",
      "description": "",
      "coordinates": [
          50.533,
          2.633
      ]
  },
  {
      "title": "Le château de Grignan",
      "link": "https://www.youtube.com/watch?v=1cnJCi3jlAQ",
      "type": "Région Rhone-Alpes",
      "description": "",
      "coordinates": [
          44.417,
          4.917
      ]
  },
  {
      "title": "Estuaire de la Gironde",
      "link": "https://www.youtube.com/watch?v=E7CjLg9Kcxw",
      "type": "Gironde",
      "description": "",
      "coordinates": [
          45,
          -0.75
      ]
  },
  {
      "title": "L'ancienne école, la Fontaine de Grégoire",
      "link": "https://www.youtube.com/watch?v=rpEDzfy5fnM",
      "type": "Cantal",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le domaine de la Creuse",
      "link": "https://www.youtube.com/watch?v=o0oM2cEMeQk",
      "type": "l'Aube",
      "description": "",
      "coordinates": [
          46.083,
          2
      ]
  },
  {
      "title": "La maison Calcatoggio",
      "link": "https://www.youtube.com/watch?v=Z7gM4YObmFQ",
      "type": "Corse-du-Sud",
      "description": "",
      "coordinates": [
          42.3,
          8.75
      ]
  },
  {
      "title": "Le couvent des Ursulines",
      "link": "https://www.youtube.com/watch?v=OaVZ8X3syuY",
      "type": "Haute Garonne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "L'ancien relais de poste, la Croix Verte",
      "link": "https://www.youtube.com/watch?v=D7mvdG_3qrA",
      "type": "l'Indre",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Maison de Famille",
      "link": "https://www.youtube.com/watch?v=jQz9VCGEs0g",
      "type": "Moselle",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Maison Cocon",
      "link": "https://www.youtube.com/watch?v=h6sua2wtBEM",
      "type": "Yvelines",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Luciole",
      "link": "https://www.youtube.com/watch?v=eQXeKsoHlAg",
      "type": "Seine-et-Marne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "L'Ancienne Bergerie Corse",
      "link": "https://www.youtube.com/watch?v=_RKfcMYei84",
      "type": "Haute-Corse",
      "description": "",
      "coordinates": [
          42.3,
          8.75
      ]
  },
  {
      "title": "Le chai de l'île de Ré",
      "link": "https://www.youtube.com/watch?v=Z7l8RLyDIjg",
      "type": "Charente-Maritime",
      "description": "",
      "coordinates": [
          46.2,
          -1.367
      ]
  },
  {
      "title": "La meunière",
      "link": "https://www.youtube.com/watch?v=YazVhGW45x4",
      "type": "Nord",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La maison Grand Champ",
      "link": "https://www.youtube.com/watch?v=SnI_WNkrjSI",
      "type": "Corrèze",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La troglo à plumes",
      "link": "https://www.youtube.com/watch?v=NnDgo0vE5wI",
      "type": "Maine-et-Loire",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le Lavoir du Lauzon",
      "link": "https://www.youtube.com/watch?v=GqpJhGZM2jQ",
      "type": "Drôme",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le Pigeonnier",
      "link": "https://www.youtube.com/watch?v=GcMtMXIkGIc",
      "type": "l'Aveyron",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Maison en couleur",
      "link": "https://www.youtube.com/watch?v=6foyWSfyl_4",
      "type": "Bouches-du-Rhône",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Maison d'Hector",
      "link": "https://www.youtube.com/watch?v=5PTFWlCfQcQ",
      "type": "l'Orne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Maison dans les Pins",
      "link": "https://www.youtube.com/watch?v=4-QC-2Rs4hI",
      "type": "Landes",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La magnanerie de Fougairolles",
      "link": "https://www.youtube.com/watch?v=2t2XRnKkqj8",
      "type": "Languedoc-Roussillon",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le château de Pierrefonds",
      "link": "https://www.youtube.com/watch?v=uobboLAbdtI",
      "type": "Région Picardie",
      "description": "",
      "coordinates": [
          49.35,
          2.983
      ]
  },
  {
      "title": "Le château de Monbazillac",
      "link": "https://www.youtube.com/watch?v=9NYWMtK-kxM",
      "type": "Région Aquitaine",
      "description": "",
      "coordinates": [
          44.783,
          0.5
      ]
  },
  {
      "title": "Le couvent du Mont Sainte-Odile",
      "link": "https://www.youtube.com/watch?v=ngDDx4irVlE",
      "type": "Région Alsace",
      "description": "",
      "coordinates": [
          48.433,
          7.4
      ]
  },
  {
      "title": "Le Palais des Benedictine",
      "link": "https://www.youtube.com/watch?v=K9B1BA5qXfg",
      "type": "Région Haute-Normandie",
      "description": "",
      "coordinates": [
          49.517,
          0.117
      ]
  },
  {
      "title": "Le château du Haut-Koenigsbourg",
      "link": "https://www.youtube.com/watch?v=GOudmi-CC1I",
      "type": "Région Alsace",
      "description": "",
      "coordinates": [
          48.25,
          7.417
      ]
  },
  {
      "title": "Le moulin Richard de Bas",
      "link": "https://www.youtube.com/watch?v=9aNVWHQ4aMU",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          45.75,
          3
      ]
  },
  {
      "title": "Le musée du Louvre",
      "link": "https://www.youtube.com/watch?v=0v5z7zTB59I",
      "type": "Région Ile de France",
      "description": "",
      "coordinates": [
          48.861,
          2.336
      ]
  },
  {
      "title": "Le Palais de la Berbie",
      "link": "https://www.youtube.com/watch?v=xbwl_Uku6mk",
      "type": "Région Midi-Pyrénées",
      "description": "",
      "coordinates": [
          43.933,
          2.15
      ]
  },
  {
      "title": "Le fort de Schoenenbourg",
      "link": "https://www.youtube.com/watch?v=vFR_IbvCoDo",
      "type": "Région Alsace",
      "description": "",
      "coordinates": [
          48.967,
          7.917
      ]
  },
  {
      "title": "Le familistère de Godin",
      "link": "https://www.youtube.com/watch?v=ttC0iPj1kp0",
      "type": "Région Picardie",
      "description": "",
      "coordinates": [
          49.833,
          3.333
      ]
  },
  {
      "title": "Le Moulin de la Blies",
      "link": "https://www.youtube.com/watch?v=nR04K4DYqxY",
      "type": "Région Lorraine",
      "description": "",
      "coordinates": [
          49.133,
          6.167
      ]
  },
  {
      "title": "Le château des Ducs de Bretagne",
      "link": "https://www.youtube.com/watch?v=kTWPv5myrF4",
      "type": "Région Pays-de-la-Loire",
      "description": "",
      "coordinates": [
          47.217,
          -1.55
      ]
  },
  {
      "title": "Le château de Rochechouart",
      "link": "https://www.youtube.com/watch?v=k0shtCSk95A",
      "type": "Région Limousin",
      "description": "",
      "coordinates": [
          45.817,
          0.817
      ]
  },
  {
      "title": "Le Palais des Papes",
      "link": "https://www.youtube.com/watch?v=eS8TpjQCtFk",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.95,
          4.8
      ]
  },
  {
      "title": "Le Palais Jacques Cœur",
      "link": "https://www.youtube.com/watch?v=e2d2AFUxrfY",
      "type": "Région Centre",
      "description": "",
      "coordinates": [
          47.083,
          2.4
      ]
  },
  {
      "title": "Le grand théâtre de Bordeaux",
      "link": "https://www.youtube.com/watch?v=b5-Fk7YRJ40",
      "type": "Région Aquitaine",
      "description": "",
      "coordinates": [
          44.842,
          -0.573
      ]
  },
  {
      "title": "Le château d'If",
      "link": "https://www.youtube.com/watch?v=YBJLKkjag9U",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          43.28,
          5.325
      ]
  },
  {
      "title": "Le domaine de Vizille",
      "link": "https://www.youtube.com/watch?v=XSULzqaaHyo",
      "type": "Région Rhone-Alpes",
      "description": "",
      "coordinates": [
          45.083,
          5.767
      ]
  },
  {
      "title": "Le domaine de Chantilly",
      "link": "https://www.youtube.com/watch?v=SrxJzkdIwfs",
      "type": "Région Picardie",
      "description": "",
      "coordinates": [
          49.194,
          2.484
      ]
  },
  {
      "title": "Le château d’Ussé",
      "link": "https://www.youtube.com/watch?v=S3QuPq9C7F8",
      "type": "Région Centre",
      "description": "",
      "coordinates": [
          47.25,
          0.3
      ]
  },
  {
      "title": "Le château de Versailles",
      "link": "https://www.youtube.com/watch?v=IXKYeo6XZiw",
      "type": "Région Ile de France",
      "description": "",
      "coordinates": [
          48.804,
          2.123
      ]
  },
  {
      "title": "Le chêne millenaire d'Allouville",
      "link": "https://www.youtube.com/watch?v=Fz7rtiJIbEs",
      "type": "Région Haute-Normandie",
      "description": "",
      "coordinates": [
          49.6,
          0.683
      ]
  },
  {
      "title": "Le Palais Rohan",
      "link": "https://www.youtube.com/watch?v=FDRKerFL8zg",
      "type": "Région Alsace",
      "description": "",
      "coordinates": [
          48.582,
          7.75
      ]
  },
  {
      "title": "Le monastère royal de Brou",
      "link": "https://www.youtube.com/watch?v=ARPUySD6yHc",
      "type": "Région Rhone-Alpes",
      "description": "",
      "coordinates": [
          46.2,
          5.233
      ]
  },
  {
      "title": "Le mémorial de Caen",
      "link": "https://www.youtube.com/watch?v=5Ziu3PwoaQo",
      "type": "Région Basse Normandie",
      "description": "",
      "coordinates": [
          49.2,
          -0.383
      ]
  },
  {
      "title": "Le château fort de Sedan",
      "link": "https://www.youtube.com/watch?v=0LK4k7hS4SQ",
      "type": "Région Champagne-Ardenne",
      "description": "",
      "coordinates": [
          49.7,
          4.95
      ]
  },
  {
      "title": "Le harras du Pin",
      "link": "https://www.youtube.com/watch?v=-tS1IJiV6Jo",
      "type": "Région Basse Normandie",
      "description": "",
      "coordinates": [
          48.733,
          0.15
      ]
  },
  {
      "title": "MORBIHAN",
      "link": "https://www.youtube.com/watch?v=NqKLxFWrjjI",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          47.833,
          -2.833
      ]
  },
  {
      "title": "Golfe du Morbihan",
      "link": "https://www.youtube.com/watch?v=RxxLwPOX8sw",
      "type": "Morbihan",
      "description": "",
      "coordinates": [
          47.6,
          -2.833
      ]
  },
  {
      "title": "L'arrière-pays morbihannais",
      "link": "https://www.youtube.com/watch?v=VxVNDzbKgog",
      "type": "Morbihan",
      "description": "",
      "coordinates": [
          47.833,
          -2.833
      ]
  },
  {
      "title": "La maison de l'Armateur",
      "link": "https://www.youtube.com/watch?v=pplbcOCkaC0",
      "type": "Région Haute-Normandie",
      "description": "",
      "coordinates": [
          49.483,
          0.117
      ]
  },
  {
      "title": "La maison des Têtes",
      "link": "https://www.youtube.com/watch?v=Pv_TZoWRrPk",
      "type": "Région Alsace",
      "description": "",
      "coordinates": [
          48.633,
          -2.05
      ]
  },
  {
      "title": "Les Hêtres Rouges",
      "link": "https://www.youtube.com/watch?v=579ZHZfoEM4",
      "type": "Côte-d'Or",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "L'Epicerie du Pape",
      "link": "https://www.youtube.com/watch?v=xiOezZ68iBI",
      "type": "l'Eure",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les Persiennes",
      "link": "https://www.youtube.com/watch?v=v6KjmDnDm00",
      "type": "Charente-Maritime",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Villa Providence",
      "link": "https://www.youtube.com/watch?v=Vu0kZ39tzA4",
      "type": "Pas-de-Calais",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La maison de l'Armateur au Havre",
      "link": "https://www.youtube.com/watch?v=GL3h1fEE4JU",
      "type": "Région Haute-Normandie",
      "description": "",
      "coordinates": [
          49.483,
          0.117
      ]
  },
  {
      "title": "Les loups, la longère paysanne",
      "link": "https://www.youtube.com/watch?v=FOD2E-5g0ws",
      "type": "Calvados",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "L'église souterraine Saint-Jean d'Aubeterre",
      "link": "https://www.youtube.com/watch?v=tPADUeheMYQ",
      "type": "Région Poitou-Charentes",
      "description": "",
      "coordinates": [
          45.27,
          0.17
      ]
  },
  {
      "title": "Les tours du Vieux-Port de la Rochelle",
      "link": "https://www.youtube.com/watch?v=rvodYAJ1cRw",
      "type": "Région Poitou-Charentes",
      "description": "",
      "coordinates": [
          46.16,
          -1.152
      ]
  },
  {
      "title": "Le phare d'Eckmuhl",
      "link": "https://www.youtube.com/watch?v=eBLWzfsZKW0",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          47.8,
          -4.367
      ]
  },
  {
      "title": "Théâtre antique d'Orange",
      "link": "https://www.youtube.com/watch?v=_oAXO1Fq8Ng",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          44.133,
          4.8
      ]
  },
  {
      "title": "Les crayeres de Reims",
      "link": "https://www.youtube.com/watch?v=NWof0Z8OA28",
      "type": "Région Champagne-Ardenne",
      "description": "",
      "coordinates": [
          49.253,
          4.034
      ]
  },
  {
      "title": "Les Traboules de Lyon",
      "link": "https://www.youtube.com/watch?v=K-AsdSBQaGg",
      "type": "Région Rhone-Alpes",
      "description": "",
      "coordinates": [
          45.75,
          4.85
      ]
  },
  {
      "title": "Le pont canal de Briare",
      "link": "https://www.youtube.com/watch?v=DPnkWEO3wSY",
      "type": "Région Centre",
      "description": "",
      "coordinates": [
          47.633,
          2.733
      ]
  },
  {
      "title": "Les Invalides",
      "link": "https://www.youtube.com/watch?v=CAdjTrCzuM0",
      "type": "Région Ile-de-France",
      "description": "",
      "coordinates": [
          48.856,
          2.312
      ]
  },
  {
      "title": "Les remparts de Saint-Malo",
      "link": "https://www.youtube.com/watch?v=C6BaJEtomko",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          48.65,
          -2.017
      ]
  },
  {
      "title": "Les grottes de Lascaux",
      "link": "https://www.youtube.com/watch?v=BUZf2mV8Uh4",
      "type": "Région Aquitaine",
      "description": "",
      "coordinates": [
          45.05,
          1.167
      ]
  },
  {
      "title": "Musée national de la maison Bonaparte",
      "link": "https://www.youtube.com/watch?v=5EO9QWm7rKo",
      "type": "Région Corse",
      "description": "",
      "coordinates": [
          42.7,
          9.45
      ]
  },
  {
      "title": "La basilique Sainte-Thérèse de Lisieux",
      "link": "https://www.youtube.com/watch?v=3N7fQZemsNw",
      "type": "Région Normandie",
      "description": "",
      "coordinates": [
          49.15,
          0.217
      ]
  },
  {
      "title": "Le rocher Saint Michel d'Aiguilhe",
      "link": "https://www.youtube.com/watch?v=xOTq9lDEEtg",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          45.05,
          3.883
      ]
  },
  {
      "title": "Les remparts d'Aigues-Mortes",
      "link": "https://www.youtube.com/watch?v=sTNomVUNBfc",
      "type": "Région Languedoc Roussillon",
      "description": "",
      "coordinates": [
          43.567,
          4.183
      ]
  },
  {
      "title": "L'opéra Garnier",
      "link": "https://www.youtube.com/watch?v=mw_5yOl4_cw",
      "type": "Région Ile de France",
      "description": "",
      "coordinates": [
          48.871,
          2.331
      ]
  },
  {
      "title": "Les arènes de Nîmes",
      "link": "https://www.youtube.com/watch?v=mfrZhLdl6nE",
      "type": "Région Languedoc Roussillon",
      "description": "",
      "coordinates": [
          43.833,
          4.35
      ]
  },
  {
      "title": "Le viaduc de Millau",
      "link": "https://www.youtube.com/watch?v=im5XcgB5Kto",
      "type": "Région Midi-Pyrénées",
      "description": "",
      "coordinates": [
          44.083,
          3.017
      ]
  },
  {
      "title": "Le pont Transbordeur de Rochefort",
      "link": "https://www.youtube.com/watch?v=fOxl8Y3X_Ms",
      "type": "Région Poitou-Charentes",
      "description": "",
      "coordinates": [
          45.933,
          -0.967
      ]
  },
  {
      "title": "Le passage Pommeraye à Nantes",
      "link": "https://www.youtube.com/watch?v=buzi43RQUiw",
      "type": "Région Pays-de-la-Loire",
      "description": "",
      "coordinates": [
          47.217,
          -1.55
      ]
  },
  {
      "title": "Le sanctuaire de Lourdes",
      "link": "https://www.youtube.com/watch?v=YbNoKbqhKQs",
      "type": "Région Midi-Pyrénées",
      "description": "",
      "coordinates": [
          43.1,
          -0.05
      ]
  },
  {
      "title": "L'opéra de Vichy",
      "link": "https://www.youtube.com/watch?v=WOW9cHDKopM",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          46.133,
          3.417
      ]
  },
  {
      "title": "Les troglodytes de Doué La Fontaine",
      "link": "https://www.youtube.com/watch?v=TA16EmLieIs",
      "type": "Région Pays-de-la-Loire",
      "description": "",
      "coordinates": [
          47.2,
          -0.283
      ]
  },
  {
      "title": "Notre-Dame-de-Paris",
      "link": "https://www.youtube.com/watch?v=SQO1mxoRvIY",
      "type": "Région Ile de France",
      "description": "",
      "coordinates": [
          48.853,
          2.35
      ]
  },
  {
      "title": "Le viaduc de Gabarit",
      "link": "https://www.youtube.com/watch?v=RtWiva6oMPk",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Notre-Dame-du-Haut de Le Corbusier",
      "link": "https://www.youtube.com/watch?v=Or4tXS2vv4c",
      "type": "Région Franche-Comté",
      "description": "",
      "coordinates": [
          47.7,
          6.617
      ]
  },
  {
      "title": "Les écluses de Fonserannes",
      "link": "https://www.youtube.com/watch?v=L-njuhCmlew",
      "type": "Région Languedoc Roussillon",
      "description": "",
      "coordinates": [
          43.3,
          3.5
      ]
  },
  {
      "title": "Le pont de Valentre",
      "link": "https://www.youtube.com/watch?v=HUjmiuMTQpU",
      "type": "Région Midi-Pyrénées",
      "description": "",
      "coordinates": [
          44.45,
          1.433
      ]
  },
  {
      "title": "Le pont du Gard",
      "link": "https://www.youtube.com/watch?v=4xr4-8iLw10",
      "type": "Région Languedoc Roussillon",
      "description": "",
      "coordinates": [
          43.95,
          4.533
      ]
  },
  {
      "title": "Le phare de Cordouan",
      "link": "https://www.youtube.com/watch?v=1lqo7eTnBf4",
      "type": "Région Aquitaine",
      "description": "",
      "coordinates": [
          45.583,
          -1.167
      ]
  },
  {
      "title": "Le Ria d'Etel",
      "link": "https://www.youtube.com/watch?v=ijEQtM7DTcs",
      "type": "Morbihan",
      "description": "",
      "coordinates": [
          47.65,
          -3.2
      ]
  },
  {
      "title": "Rouen",
      "link": "https://www.youtube.com/watch?v=btFAhEhrDoE",
      "type": "Seine Maritime",
      "description": "",
      "coordinates": [
          49.44,
          1.095
      ]
  },
  {
      "title": "Ermenouville",
      "link": "https://www.youtube.com/watch?v=alzhL608IlE",
      "type": "Seine Maritime",
      "description": "",
      "coordinates": [
          49.8,
          0.733
      ]
  },
  {
      "title": "Veules-les-Roses",
      "link": "https://www.youtube.com/watch?v=pyNdvGjURD0",
      "type": "Seine Maritime",
      "description": "",
      "coordinates": [
          49.867,
          0.8
      ]
  },
  {
      "title": "Au Paradi'Zen",
      "link": "https://www.youtube.com/watch?v=zoxfZznJoIw",
      "type": "Région Rhone-Alpes",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Jardins du château de la Motte",
      "link": "https://www.youtube.com/watch?v=MC4gOSgzwII",
      "type": "Région Poitou-Charentes",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Jardin de Saint-Adrien",
      "link": "https://www.youtube.com/watch?v=bTTOqNTOflo",
      "type": "Région Languedoc-Roussillon",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "LE VAR",
      "link": "https://www.youtube.com/watch?v=0_AyGGKkI7g",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          43.5,
          6.5
      ]
  },
  {
      "title": "Moustiers Sainte-Marie",
      "link": "https://www.youtube.com/watch?v=gLAx4mCYRuY",
      "type": "Var",
      "description": "",
      "coordinates": [
          43.85,
          6.217
      ]
  },
  {
      "title": "La Bizerie",
      "link": "https://www.youtube.com/watch?v=HXTffBDJ6Is",
      "type": "Région Basse Normandie",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Jardins du mont des Recollets",
      "link": "https://www.youtube.com/watch?v=A0OxYT-lsig",
      "type": "Région Nord-Pas-de-Calais",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La bonne maison",
      "link": "https://www.youtube.com/watch?v=NwuZn211QzM",
      "type": "Région Rhone Alpes",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La Grenouillère",
      "link": "https://www.youtube.com/watch?v=LIr8Q4JQt14",
      "type": "Région Ile de France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Tourtour",
      "link": "https://www.youtube.com/watch?v=72042YS4jt4",
      "type": "Var",
      "description": "",
      "coordinates": [
          43.583,
          6.3
      ]
  },
  {
      "title": "La pomme d'Ambre",
      "link": "https://www.youtube.com/watch?v=tqlG6bpw0u8",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La rose des prairies",
      "link": "https://www.youtube.com/watch?v=hDBa2MZLvRM",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Saint Tropez",
      "link": "https://www.youtube.com/watch?v=JCBXUl2wdbY",
      "type": "Var",
      "description": "",
      "coordinates": [
          43.267,
          6.633
      ]
  },
  {
      "title": "L'Argelière",
      "link": "https://www.youtube.com/watch?v=zGiy99phVB8",
      "type": "Région PACA",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "La roseraie de Barbary",
      "link": "https://www.youtube.com/watch?v=Fvo2O2IbmNs",
      "type": "Région Aquitaine",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le clos de Saint-Saturnin",
      "link": "https://www.youtube.com/watch?v=oV6QLDzDKdU",
      "type": "Région Champagne Ardenne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "L'atelier jardin",
      "link": "https://www.youtube.com/watch?v=0XxytBpb_TA",
      "type": "Région Franche-Comté",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin d'Adoue",
      "link": "https://www.youtube.com/watch?v=XeSVjI994_U",
      "type": "Région Lorraine",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin d'Anabelle",
      "link": "https://www.youtube.com/watch?v=-eLlKpM12Xw",
      "type": "Région Franche Comté",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin d'atmosphère de Bordeaux",
      "link": "https://www.youtube.com/watch?v=rw5igNnOgXM",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          44.842,
          -0.573
      ]
  },
  {
      "title": "Le jardin de Cassandra",
      "link": "https://www.youtube.com/watch?v=AZDrmmJBkMI",
      "type": "Région Bourgogne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin de la Ganille",
      "link": "https://www.youtube.com/watch?v=dsNo67a1vNQ",
      "type": "Région Limousin",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin de Cuy",
      "link": "https://www.youtube.com/watch?v=7nLFSBryd3M",
      "type": "Région Bourgogne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin de Liliane",
      "link": "https://www.youtube.com/watch?v=oe_LU2jAsyA",
      "type": "Région Limousin",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin de Marguerite",
      "link": "https://www.youtube.com/watch?v=phr9nlWd1BI",
      "type": "Région Alsace",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin de Marie",
      "link": "https://www.youtube.com/watch?v=rahdixkraXE",
      "type": "Région Centre",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin de Valerianes",
      "link": "https://www.youtube.com/watch?v=mUVBNn-MJc8",
      "type": "Région Haute Normandie",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin d'Enteoulet",
      "link": "https://www.youtube.com/watch?v=SBMRyeilyxY",
      "type": "Région Midi Pyrénées",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "U Giardinu di l'Isuli",
      "link": "https://www.youtube.com/watch?v=1A3shtkDMd8",
      "type": "Région Corse",
      "description": "",
      "coordinates": [
          42.3,
          8.75
      ]
  },
  {
      "title": "Le jardin du fond de l'or",
      "link": "https://www.youtube.com/watch?v=VpvJKF_OerQ",
      "type": "Région Aquitaine",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin des Lianes",
      "link": "https://www.youtube.com/watch?v=03SnjUkKr6g",
      "type": "Région Nord-Pas-de-Calais",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "LES VOSGES",
      "link": "https://www.youtube.com/watch?v=myKl7wEcXH0&t=49s",
      "type": "\"1000 Pays en un\"",
      "description": "",
      "coordinates": [
          48.167,
          6.417
      ]
  },
  {
      "title": "Le jardin des Songes",
      "link": "https://www.youtube.com/watch?v=XIrt5-r1hbk",
      "type": "Région Alsace",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin des mélanges",
      "link": "https://www.youtube.com/watch?v=P2zSWb055zw",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin du Pellinec",
      "link": "https://www.youtube.com/watch?v=pxl7-IgFKE0",
      "type": "Région Bretagne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin du mas de l'abris",
      "link": "https://www.youtube.com/watch?v=DBhlI5MTmkc",
      "type": "Région Languedoc Roussillon",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin mosaïque",
      "link": "https://www.youtube.com/watch?v=ypBEWM5eFwg",
      "type": "Région Pays de la Loire",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin du peintre Van Beek",
      "link": "https://www.youtube.com/watch?v=lofSjC263kE",
      "type": "Région Picardie",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les jardins de la Boirie",
      "link": "https://www.youtube.com/watch?v=-QSupKe3Nto",
      "type": "Région Poitou Charentes",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les jardins de la Croze",
      "link": "https://www.youtube.com/watch?v=jj5owwqEsTo",
      "type": "Région Auvergne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les jardins de la Mansonière",
      "link": "https://www.youtube.com/watch?v=FDnsoNktPuE",
      "type": "Région Basse Normandie",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les jardins de la Poterie Hillen",
      "link": "https://www.youtube.com/watch?v=zb6pICjZWcs",
      "type": "Région Midi-Pyrénées",
      "description": ""
  },
  {
      "title": "Les jardins de Maizicourt -Région Picardie",
      "link": "https://www.youtube.com/watch?v=FJ7DJh3GFfI",
      "type": "Le jardin préféré des Français",
      "description": "",
      "coordinates": [
          50,
          2
      ]
  },
  {
      "title": "Les jardins du couvent Saint-François",
      "link": "https://www.youtube.com/watch?v=VDHA1a6V0Ss",
      "type": "Région Corse",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les jardins de mon Moulin",
      "link": "https://www.youtube.com/watch?v=Foa91C4GnvA",
      "type": "Région Champagne-Ardenne",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Les près de Gittonville",
      "link": "https://www.youtube.com/watch?v=m3jy9gs9vYM",
      "type": "Région Ile de France",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "Le jardin des Dietzs",
      "link": "https://www.youtube.com/watch?v=XYbeLz8GtLo",
      "type": "Région Centre",
      "description": "",
      "coordinates": [
          46,
          2
      ]
  },
  {
      "title": "L'Isle sur la Sorgue",
      "link": "https://www.youtube.com/watch?v=CJ6OqO5UzFw",
      "type": "Le Vaucluse",
      "description": "",
      "coordinates": [
          43.917,
          5.05
      ]
  },
  {
      "title": "Orange, Le Mont Ventoux",
      "link": "https://www.youtube.com/watch?v=lJyP7JP2J5k",
      "type": "Le Vaucluse",
      "description": "",
      "coordinates": [
          44.133,
          4.8
      ]
  },
  {
      "title": "Gordes, Roussillon, Lourmarin",
      "link": "https://www.youtube.com/watch?v=WKZrNqQhiCI",
      "type": "Le Vaucluse",
      "description": "",
      "coordinates": [
          43.9,
          5.2
      ]
  },
  {
      "title": "LE PAYS BASQUE",
      "link": "https://www.youtube.com/watch?v=-IYnnXru5gw",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          43.3,
          -1.5
      ]
  },
  {
      "title": "Saint-Jean Pied-de-Port",
      "link": "https://www.youtube.com/watch?v=ekpYhYAAft8",
      "type": "Le pays basque",
      "description": "",
      "coordinates": [
          43.167,
          -1.233
      ]
  },
  {
      "title": "Mauléon",
      "link": "https://www.youtube.com/watch?v=rUPTAX5UUf4",
      "type": "Le pays basque",
      "description": "",
      "coordinates": [
          43.217,
          -0.883
      ]
  },
  {
      "title": "Saint-Jean de Luz",
      "link": "https://www.youtube.com/watch?v=v6agMwYHt58",
      "type": "Le pays basque",
      "description": "",
      "coordinates": [
          43.383,
          -1.667
      ]
  },
  {
      "title": "Rennes",
      "link": "https://www.youtube.com/watch?v=38Il4Uq3f5s",
      "type": "Ille et Vilaine",
      "description": "",
      "coordinates": [
          48.117,
          -1.683
      ]
  },
  {
      "title": "Saint Malo et la baie de Cancale",
      "link": "https://www.youtube.com/watch?v=ky3h4X9glLw",
      "type": "Ille et Vilaine",
      "description": "",
      "coordinates": [
          48.65,
          -2.017
      ]
  },
  {
      "title": "La Forêt de Brocéliande",
      "link": "https://www.youtube.com/watch?v=4TPeDD51Nc4",
      "type": "Ille et Vilaine",
      "description": "",
      "coordinates": [
          48,
          -2.167
      ]
  },
  {
      "title": "L'ARTOIS ",
      "link": "https://www.youtube.com/watch?v=wSXDF9_7ybU",
      "type": "\"1000 Pays en un\"",
      "description": ""
  },
  {
      "title": "Pyrénées Orientales",
      "link": "https://www.youtube.com/watch?v=CZ157ewicGU",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          42.5,
          2.75
      ]
  },
  {
      "title": "Haut-Rhin",
      "link": "https://www.youtube.com/watch?v=Qf_hyBDVRBQ",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          48,
          7.5
      ]
  },
  {
      "title": "Quercy",
      "link": "https://www.youtube.com/watch?v=GtIE09E3NcU",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          44.5,
          1.667
      ]
  },
  {
      "title": "Jura",
      "link": "https://www.youtube.com/watch?v=Spm-t3a5vc0",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          46.75,
          6
      ]
  },
  {
      "title": "Charente-Maritime",
      "link": "https://www.youtube.com/watch?v=q1BERKFENH4",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          45.75,
          -0.75
      ]
  },
  {
      "title": "Corrèze",
      "link": "https://www.youtube.com/watch?v=bCy0_hpUZlI",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          45.333,
          1.833
      ]
  },
  {
      "title": "Cornouaille",
      "link": "https://www.youtube.com/watch?v=LXzEiybejTo",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          48,
          -4.1
      ]
  },
  {
      "title": "Pays d'Auge",
      "link": "https://www.youtube.com/watch?v=gsuPqpL4j9Y",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          49.167,
          0.167
      ]
  },
  {
      "title": "Baie de Somme",
      "link": "https://www.youtube.com/watch?v=vsVzWPrdg_I",
      "type": "Les 100 lieux qu'il faut voir",
      "description": "",
      "coordinates": [
          50.2,
          1.633
      ]
  }
];
import { useState } from "react";
// Sample markers data
// const markers = locations.filter(item => item.hasOwnProperty('coordinates'));

export default function MapWrapper() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  return (
    <div style={{ position: 'relative', height: '100vh' }}>
      <Map defaultCenter={[46.2, 1.6997]} defaultZoom={7}>
        {locations.filter(item => item.hasOwnProperty('coordinates')).map((marker) => (
          <Marker
            key={marker.title}
            anchor={marker.coordinates} // [latitude, longitude]
            width={50}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}
      </Map>

      {selectedMarker && (
        <div
          className="fixed z-50 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
          style={{
            top: `${selectedMarker.coordinates.y}px`, // Adjust based on your coordinate system
            left: `${selectedMarker.coordinates.x}px`, // Adjust based on your coordinate system
          }}
        >
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">{selectedMarker.title}</h3>
            <p className="text-gray-700">{selectedMarker.description}</p>
            <p className="text-sm text-gray-500">{selectedMarker.type}</p>
            <a
              href={selectedMarker.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Watch Video
            </a>
          </div>
          <button
            onClick={() => setSelectedMarker(null)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors text-xl"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}