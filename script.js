const countryFlags = {
  "Canadá": "🇨🇦", "México": "🇲🇽", "Corea del Sur": "🇰🇷", "República Checa": "🇨🇿",
  "Sudáfrica": "🇿🇦", "Bosnia y Herzegovina": "🇧🇦", "Suiza": "🇨🇭", "Catar": "🇶🇦",
  "Brasil": "🇧🇷", "Escocia": "🏴󠁧󠁢󠁳󠁣󠁴󠁿", "Marruecos": "🇲🇦", "Haití": "🇭🇹",
  "Estados Unidos": "🇺🇸", "Australia": "🇦🇺", "Turquía": "🇹🇷", "Paraguay": "🇵🇾",
  "Alemania": "🇩🇪", "Curazao": "🇨🇼", "Costa de Marfil": "🇨🇮", "Ecuador": "🇪🇨",
  "Países Bajos": "🇳🇱", "Japón": "🇯🇵", "Suecia": "🇸🇪", "Túnez": "🇹🇳",
  "Bélgica": "🇧🇪", "Irán": "🇮🇷", "Nueva Zelanda": "🇳🇿", "Egipto": "🇪🇬",
  "España": "🇪🇸", "Cabo Verde": "🇨🇻", "Arabia Saudita": "🇸🇦", "Uruguay": "🇺🇾",
  "Francia": "🇫🇷", "Senegal": "🇸🇳", "Irak": "🇮🇶", "Noruega": "🇳🇴",
  "Argentina": "🇦🇷", "Argelia": "🇩🇿", "Austria": "🇦🇹", "Jordania": "🇯🇴",
  "Portugal": "🇵🇹", "Colombia": "🇨🇴", "República Democrática del Congo": "🇨🇩",
  "Uzbekistán": "🇺🇿", "Inglaterra": "🇬🇧", "Croacia": "🇭🇷", "Ghana": "🇬🇭", "Panamá": "🇵🇦",
};

// Mapa inverso: jugador → equipo (se construye al cargar plantillas)
let playerTeamMap = {};

const groups = [
  { name: "A", teams: ["México", "Corea del Sur", "República Checa", "Sudáfrica"],
    matches: [
      { id: "A-1", date: "2026-06-11", time: "18:00", team1: "México", team2: "Sudáfrica", stadium: "Estadio Azteca, Ciudad de México" },
      { id: "A-2", date: "2026-06-11", time: "20:30", team1: "Corea del Sur", team2: "República Checa", stadium: "Estadio Akron, Guadalajara" },
      { id: "A-3", date: "2026-06-18", time: "12:00", team1: "República Checa", team2: "Sudáfrica", stadium: "Mercedes-Benz Stadium, Atlanta" },
      { id: "A-4", date: "2026-06-18", time: "21:00", team1: "México", team2: "Corea del Sur", stadium: "Estadio Akron, Guadalajara" },
      { id: "A-5", date: "2026-06-24", time: "21:00", team1: "República Checa", team2: "México", stadium: "Estadio Azteca, Ciudad de México" },
      { id: "A-6", date: "2026-06-24", time: "21:00", team1: "Sudáfrica", team2: "Corea del Sur", stadium: "Estadio BBVA, Monterrey" },
    ],
  },
  { name: "B", teams: ["Canadá", "Bosnia y Herzegovina", "Suiza", "Catar"],
    matches: [
      { id: "B-1", date: "2026-06-12", time: "20:00", team1: "Canadá", team2: "Bosnia y Herzegovina", stadium: "BMO Field, Toronto" },
      { id: "B-2", date: "2026-06-13", time: "15:00", team1: "Catar", team2: "Suiza", stadium: "Levi's Stadium, San Francisco" },
      { id: "B-3", date: "2026-06-18", time: "15:00", team1: "Suiza", team2: "Bosnia y Herzegovina", stadium: "SoFi Stadium, Los Ángeles" },
      { id: "B-4", date: "2026-06-18", time: "18:00", team1: "Canadá", team2: "Catar", stadium: "Estadio BC Place, Vancouver" },
      { id: "B-5", date: "2026-06-24", time: "15:00", team1: "Suiza", team2: "Canadá", stadium: "Estadio BC Place, Vancouver" },
      { id: "B-6", date: "2026-06-24", time: "15:00", team1: "Bosnia y Herzegovina", team2: "Catar", stadium: "Lumen Field, Seattle" },
    ],
  },
  { name: "C", teams: ["Brasil", "Escocia", "Marruecos", "Haití"],
    matches: [
      { id: "C-1", date: "2026-06-13", time: "18:00", team1: "Brasil", team2: "Marruecos", stadium: "MetLife Stadium, Nueva York/Nueva Jersey" },
      { id: "C-2", date: "2026-06-13", time: "20:30", team1: "Haití", team2: "Escocia", stadium: "Gillette Stadium, Boston" },
      { id: "C-3", date: "2026-06-19", time: "18:00", team1: "Escocia", team2: "Marruecos", stadium: "Gillette Stadium, Boston" },
      { id: "C-4", date: "2026-06-19", time: "20:30", team1: "Brasil", team2: "Haití", stadium: "Lincoln Financial Field, Filadelfia" },
      { id: "C-5", date: "2026-06-24", time: "18:00", team1: "Escocia", team2: "Brasil", stadium: "Hard Rock Stadium, Miami" },
      { id: "C-6", date: "2026-06-24", time: "18:00", team1: "Marruecos", team2: "Haití", stadium: "Mercedes-Benz Stadium, Atlanta" },
    ],
  },
  { name: "D", teams: ["Estados Unidos", "Australia", "Turquía", "Paraguay"],
    matches: [
      { id: "D-1", date: "2026-06-12", time: "22:30", team1: "Estados Unidos", team2: "Paraguay", stadium: "SoFi Stadium, Los Ángeles" },
      { id: "D-2", date: "2026-06-14", time: "16:00", team1: "Australia", team2: "Turquía", stadium: "Estadio BC Place, Vancouver" },
      { id: "D-3", date: "2026-06-19", time: "15:00", team1: "Estados Unidos", team2: "Australia", stadium: "Lumen Field, Seattle" },
      { id: "D-4", date: "2026-06-19", time: "23:00", team1: "Turquía", team2: "Paraguay", stadium: "Levi's Stadium, San Francisco" },
      { id: "D-5", date: "2026-06-25", time: "22:00", team1: "Turquía", team2: "Estados Unidos", stadium: "SoFi Stadium, Los Ángeles" },
      { id: "D-6", date: "2026-06-25", time: "22:00", team1: "Paraguay", team2: "Australia", stadium: "Levi's Stadium, San Francisco" },
    ],
  },
  { name: "E", teams: ["Alemania", "Curazao", "Costa de Marfil", "Ecuador"],
    matches: [
      { id: "E-1", date: "2026-06-14", time: "18:00", team1: "Alemania", team2: "Curazao", stadium: "NRG Stadium, Houston" },
      { id: "E-2", date: "2026-06-14", time: "20:00", team1: "Costa de Marfil", team2: "Ecuador", stadium: "Lincoln Financial Field, Filadelfia" },
      { id: "E-3", date: "2026-06-20", time: "16:00", team1: "Alemania", team2: "Costa de Marfil", stadium: "BMO Field, Toronto" },
      { id: "E-4", date: "2026-06-20", time: "20:00", team1: "Ecuador", team2: "Curazao", stadium: "Estadio Kansas City" },
      { id: "E-5", date: "2026-06-25", time: "16:00", team1: "Curazao", team2: "Costa de Marfil", stadium: "Lincoln Financial Field, Filadelfia" },
      { id: "E-6", date: "2026-06-25", time: "16:00", team1: "Ecuador", team2: "Alemania", stadium: "MetLife Stadium, Nueva York/Nueva Jersey" },
    ],
  },
  { name: "F", teams: ["Países Bajos", "Japón", "Suecia", "Túnez"],
    matches: [
      { id: "F-1", date: "2026-06-14", time: "19:00", team1: "Países Bajos", team2: "Japón", stadium: "AT&T Stadium, Dallas" },
      { id: "F-2", date: "2026-06-14", time: "20:30", team1: "Suecia", team2: "Túnez", stadium: "Estadio BBVA, Monterrey" },
      { id: "F-3", date: "2026-06-20", time: "13:00", team1: "Países Bajos", team2: "Suecia", stadium: "NRG Stadium, Houston" },
      { id: "F-4", date: "2026-06-21", time: "00:00", team1: "Túnez", team2: "Japón", stadium: "Estadio BBVA, Monterrey" },
      { id: "F-5", date: "2026-06-25", time: "19:00", team1: "Japón", team2: "Suecia", stadium: "AT&T Stadium, Dallas" },
      { id: "F-6", date: "2026-06-25", time: "19:00", team1: "Túnez", team2: "Países Bajos", stadium: "Arrowhead Stadium, Kansas City" },
    ],
  },
  { name: "G", teams: ["Bélgica", "Irán", "Nueva Zelanda", "Egipto"],
    matches: [
      { id: "G-1", date: "2026-06-15", time: "18:00", team1: "Bélgica", team2: "Egipto", stadium: "Lumen Field, Seattle" },
      { id: "G-2", date: "2026-06-15", time: "21:00", team1: "Irán", team2: "Nueva Zelanda", stadium: "SoFi Stadium, Los Ángeles" },
      { id: "G-3", date: "2026-06-21", time: "15:00", team1: "Bélgica", team2: "Irán", stadium: "SoFi Stadium, Los Ángeles" },
      { id: "G-4", date: "2026-06-21", time: "21:00", team1: "Nueva Zelanda", team2: "Egipto", stadium: "Estadio BC Place, Vancouver" },
      { id: "G-5", date: "2026-06-26", time: "23:00", team1: "Egipto", team2: "Irán", stadium: "Lumen Field, Seattle" },
      { id: "G-6", date: "2026-06-26", time: "23:00", team1: "Nueva Zelanda", team2: "Bélgica", stadium: "Estadio BC Place, Vancouver" },
    ],
  },
  { name: "H", teams: ["España", "Uruguay", "Cabo Verde", "Arabia Saudita"],
    matches: [
      { id: "H-1", date: "2026-06-15", time: "15:00", team1: "España", team2: "Cabo Verde", stadium: "Mercedes-Benz Stadium, Atlanta" },
      { id: "H-2", date: "2026-06-15", time: "18:00", team1: "Arabia Saudita", team2: "Uruguay", stadium: "Hard Rock Stadium, Miami" },
      { id: "H-3", date: "2026-06-21", time: "12:00", team1: "España", team2: "Arabia Saudita", stadium: "Mercedes-Benz Stadium, Atlanta" },
      { id: "H-4", date: "2026-06-21", time: "18:00", team1: "Uruguay", team2: "Cabo Verde", stadium: "Hard Rock Stadium, Miami" },
      { id: "H-5", date: "2026-06-26", time: "20:00", team1: "Cabo Verde", team2: "Arabia Saudita", stadium: "NRG Stadium, Houston" },
      { id: "H-6", date: "2026-06-26", time: "20:00", team1: "Uruguay", team2: "España", stadium: "Estadio Akron, Guadalajara" },
    ],
  },
  { name: "I", teams: ["Francia", "Senegal", "Irak", "Noruega"],
    matches: [
      { id: "I-1", date: "2026-06-16", time: "15:00", team1: "Francia", team2: "Senegal", stadium: "MetLife Stadium, Nueva York/Nueva Jersey" },
      { id: "I-2", date: "2026-06-16", time: "18:00", team1: "Irak", team2: "Noruega", stadium: "Gillette Stadium, Boston" },
      { id: "I-3", date: "2026-06-22", time: "17:00", team1: "Francia", team2: "Irak", stadium: "Lincoln Financial Field, Filadelfia" },
      { id: "I-4", date: "2026-06-22", time: "20:00", team1: "Noruega", team2: "Senegal", stadium: "MetLife Stadium, Nueva York/Nueva Jersey" },
      { id: "I-5", date: "2026-06-26", time: "15:00", team1: "Noruega", team2: "Francia", stadium: "Gillette Stadium, Boston" },
      { id: "I-6", date: "2026-06-26", time: "15:00", team1: "Senegal", team2: "Irak", stadium: "BMO Field, Toronto" },
    ],
  },
  { name: "J", teams: ["Argentina", "Argelia", "Austria", "Jordania"],
    matches: [
      { id: "J-1", date: "2026-06-16", time: "21:00", team1: "Argentina", team2: "Argelia", stadium: "Arrowhead Stadium, Kansas City" },
      { id: "J-2", date: "2026-06-17", time: "00:00", team1: "Austria", team2: "Jordania", stadium: "Levi's Stadium, San Francisco" },
      { id: "J-3", date: "2026-06-22", time: "13:00", team1: "Argentina", team2: "Austria", stadium: "AT&T Stadium, Dallas" },
      { id: "J-4", date: "2026-06-22", time: "23:00", team1: "Jordania", team2: "Argelia", stadium: "Levi's Stadium, San Francisco" },
      { id: "J-5", date: "2026-06-27", time: "22:00", team1: "Argelia", team2: "Austria", stadium: "Arrowhead Stadium, Kansas City" },
      { id: "J-6", date: "2026-06-27", time: "22:00", team1: "Jordania", team2: "Argentina", stadium: "AT&T Stadium, Dallas" },
    ],
  },
  { name: "K", teams: ["Portugal", "Colombia", "República Democrática del Congo", "Uzbekistán"],
    matches: [
      { id: "K-1", date: "2026-06-17", time: "13:00", team1: "Portugal", team2: "República Democrática del Congo", stadium: "NRG Stadium, Houston" },
      { id: "K-2", date: "2026-06-17", time: "22:00", team1: "Uzbekistán", team2: "Colombia", stadium: "Estadio Azteca, Ciudad de México" },
      { id: "K-3", date: "2026-06-23", time: "13:00", team1: "Portugal", team2: "Uzbekistán", stadium: "NRG Stadium, Houston" },
      { id: "K-4", date: "2026-06-23", time: "22:00", team1: "Colombia", team2: "República Democrática del Congo", stadium: "Estadio Akron, Guadalajara" },
      { id: "K-5", date: "2026-06-27", time: "19:30", team1: "Colombia", team2: "Portugal", stadium: "Hard Rock Stadium, Miami" },
      { id: "K-6", date: "2026-06-27", time: "19:30", team1: "República Democrática del Congo", team2: "Uzbekistán", stadium: "Mercedes-Benz Stadium, Atlanta" },
    ],
  },
  { name: "L", teams: ["Inglaterra", "Croacia", "Ghana", "Panamá"],
    matches: [
      { id: "L-1", date: "2026-06-17", time: "16:00", team1: "Inglaterra", team2: "Croacia", stadium: "AT&T Stadium, Dallas" },
      { id: "L-2", date: "2026-06-17", time: "19:00", team1: "Ghana", team2: "Panamá", stadium: "BMO Field, Toronto" },
      { id: "L-3", date: "2026-06-23", time: "16:00", team1: "Inglaterra", team2: "Ghana", stadium: "Gillette Stadium, Boston" },
      { id: "L-4", date: "2026-06-23", time: "19:00", team1: "Panamá", team2: "Croacia", stadium: "BMO Field, Toronto" },
      { id: "L-5", date: "2026-06-27", time: "17:00", team1: "Panamá", team2: "Inglaterra", stadium: "MetLife Stadium, Nueva York/Nueva Jersey" },
      { id: "L-6", date: "2026-06-27", time: "17:00", team1: "Croacia", team2: "Ghana", stadium: "Lincoln Financial Field, Filadelfia" },
    ],
  },
];

const knockoutMatches = [
  { id: "r16-1",  round: "Dieciseisavos 1",  source1: { group: "A", pos: 2 }, source2: { group: "B", pos: 2 }, date: "2026-06-28", time: "TBD", stadium: "SoFi Stadium, Los Ángeles" },
  { id: "r16-2",  round: "Dieciseisavos 2",  source1: { group: "E", pos: 1 }, source2: { pos: 3, groups: ["A","B","C","D","F"] }, date: "2026-06-29", time: "TBD", stadium: "Gillette Stadium, Boston" },
  { id: "r16-3",  round: "Dieciseisavos 3",  source1: { group: "F", pos: 1 }, source2: { group: "C", pos: 2 }, date: "2026-06-29", time: "TBD", stadium: "Estadio BBVA, Monterrey" },
  { id: "r16-4",  round: "Dieciseisavos 4",  source1: { group: "C", pos: 1 }, source2: { group: "F", pos: 2 }, date: "2026-06-29", time: "TBD", stadium: "NRG Stadium, Houston" },
  { id: "r16-5",  round: "Dieciseisavos 5",  source1: { group: "I", pos: 1 }, source2: { pos: 3, groups: ["C","D","F","G","H"] }, date: "2026-06-30", time: "TBD", stadium: "MetLife Stadium, Nueva York/Nueva Jersey" },
  { id: "r16-6",  round: "Dieciseisavos 6",  source1: { group: "E", pos: 2 }, source2: { group: "I", pos: 2 }, date: "2026-06-30", time: "TBD", stadium: "AT&T Stadium, Dallas" },
  { id: "r16-7",  round: "Dieciseisavos 7",  source1: { group: "A", pos: 1 }, source2: { pos: 3, groups: ["C","E","F","H","I"] }, date: "2026-06-30", time: "TBD", stadium: "Estadio Azteca, Ciudad de México" },
  { id: "r16-8",  round: "Dieciseisavos 8",  source1: { group: "L", pos: 1 }, source2: { pos: 3, groups: ["E","H","I","J","K"] }, date: "2026-07-01", time: "TBD", stadium: "Mercedes-Benz Stadium, Atlanta" },
  { id: "r16-9",  round: "Dieciseisavos 9",  source1: { group: "D", pos: 1 }, source2: { pos: 3, groups: ["B","E","F","I","J"] }, date: "2026-07-01", time: "TBD", stadium: "Levi's Stadium, San Francisco" },
  { id: "r16-10", round: "Dieciseisavos 10", source1: { group: "G", pos: 1 }, source2: { pos: 3, groups: ["A","E","H","I","J"] }, date: "2026-07-01", time: "TBD", stadium: "Lumen Field, Seattle" },
  { id: "r16-11", round: "Dieciseisavos 11", source1: { group: "K", pos: 2 }, source2: { group: "L", pos: 2 }, date: "2026-07-02", time: "TBD", stadium: "BMO Field, Toronto" },
  { id: "r16-12", round: "Dieciseisavos 12", source1: { group: "H", pos: 1 }, source2: { group: "J", pos: 2 }, date: "2026-07-02", time: "TBD", stadium: "SoFi Stadium, Los Ángeles" },
  { id: "r16-13", round: "Dieciseisavos 13", source1: { group: "B", pos: 1 }, source2: { pos: 3, groups: ["E","F","G","I","J"] }, date: "2026-07-02", time: "TBD", stadium: "BC Place, Vancouver" },
  { id: "r16-14", round: "Dieciseisavos 14", source1: { group: "J", pos: 1 }, source2: { group: "H", pos: 2 }, date: "2026-07-03", time: "TBD", stadium: "Hard Rock Stadium, Miami" },
  { id: "r16-15", round: "Dieciseisavos 15", source1: { group: "K", pos: 1 }, source2: { pos: 3, groups: ["D","E","I","J","L"] }, date: "2026-07-03", time: "TBD", stadium: "Arrowhead Stadium, Kansas City" },
  { id: "r16-16", round: "Dieciseisavos 16", source1: { group: "D", pos: 2 }, source2: { group: "G", pos: 2 }, date: "2026-07-03", time: "TBD", stadium: "AT&T Stadium, Dallas" },
  { id: "oct-1",  round: "Octavos 1",        source1: { from: "r16-2" }, source2: { from: "r16-5" }, date: "2026-07-04", time: "TBD", stadium: "Lincoln Financial Field, Filadelfia" },
  { id: "oct-2",  round: "Octavos 2",        source1: { from: "r16-1" }, source2: { from: "r16-3" }, date: "2026-07-04", time: "TBD", stadium: "NRG Stadium, Houston" },
  { id: "oct-3",  round: "Octavos 3",        source1: { from: "r16-4" }, source2: { from: "r16-6" }, date: "2026-07-05", time: "TBD", stadium: "MetLife Stadium, Nueva York/Nueva Jersey" },
  { id: "oct-4",  round: "Octavos 4",        source1: { from: "r16-7" }, source2: { from: "r16-8" }, date: "2026-07-05", time: "TBD", stadium: "Estadio Azteca, Ciudad de México" },
  { id: "oct-5",  round: "Octavos 5",        source1: { from: "r16-11" }, source2: { from: "r16-12" }, date: "2026-07-06", time: "TBD", stadium: "AT&T Stadium, Dallas" },
  { id: "oct-6",  round: "Octavos 6",        source1: { from: "r16-9" }, source2: { from: "r16-10" }, date: "2026-07-06", time: "TBD", stadium: "Lumen Field, Seattle" },
  { id: "oct-7",  round: "Octavos 7",        source1: { from: "r16-14" }, source2: { from: "r16-16" }, date: "2026-07-07", time: "TBD", stadium: "Mercedes-Benz Stadium, Atlanta" },
  { id: "oct-8",  round: "Octavos 8",        source1: { from: "r16-13" }, source2: { from: "r16-15" }, date: "2026-07-07", time: "TBD", stadium: "BC Place, Vancouver" },
  { id: "qf-1",   round: "Cuartos 1",        source1: { from: "oct-1" }, source2: { from: "oct-2" }, date: "2026-07-09", time: "TBD", stadium: "Gillette Stadium, Boston" },
  { id: "qf-2",   round: "Cuartos 2",        source1: { from: "oct-5" }, source2: { from: "oct-6" }, date: "2026-07-10", time: "TBD", stadium: "SoFi Stadium, Los Ángeles" },
  { id: "qf-3",   round: "Cuartos 3",        source1: { from: "oct-3" }, source2: { from: "oct-4" }, date: "2026-07-11", time: "TBD", stadium: "Hard Rock Stadium, Miami" },
  { id: "qf-4",   round: "Cuartos 4",        source1: { from: "oct-7" }, source2: { from: "oct-8" }, date: "2026-07-11", time: "TBD", stadium: "Arrowhead Stadium, Kansas City" },
  { id: "sf-1",   round: "Semifinal 1",      source1: { from: "qf-1" }, source2: { from: "qf-2" }, date: "2026-07-14", time: "TBD", stadium: "AT&T Stadium, Dallas" },
  { id: "sf-2",   round: "Semifinal 2",      source1: { from: "qf-3" }, source2: { from: "qf-4" }, date: "2026-07-15", time: "TBD", stadium: "Mercedes-Benz Stadium, Atlanta" },
  { id: "thirdplace", round: "Tercer lugar", source1: { from: "sf-1", outcome: "loser" }, source2: { from: "sf-2", outcome: "loser" }, date: "2026-07-18", time: "TBD", stadium: "Hard Rock Stadium, Miami" },
  { id: "final",  round: "Final",            source1: { from: "sf-1" }, source2: { from: "sf-2" }, date: "2026-07-19", time: "TBD", stadium: "MetLife Stadium, Nueva York/Nueva Jersey" },
];

const defaultResults = {
  "A-1": { score1: "2", score2: "0" }, "A-2": { score1: "2", score2: "1" },
  "B-1": { score1: "1", score2: "1" }, "B-2": { score1: "1", score2: "1" },
  "C-1": { score1: "1", score2: "1" }, "C-2": { score1: "0", score2: "1" },
  "D-1": { score1: "4", score2: "1" }, "D-2": { score1: "2", score2: "0" },
  "E-1": { score1: "7", score2: "1" }, "E-2": { score1: "1", score2: "0" },
  "F-1": { score1: "2", score2: "2" }, "F-2": { score1: "5", score2: "1" },
  "G-1": { score1: "1", score2: "1" }, "H-1": { score1: "0", score2: "0" },
};

const fairPlayScores = { "Suiza": -1, "Canadá": -2, "Catar": -2, "Bosnia y Herzegovina": -3, "Marruecos": 0, "Brasil": -2, "Japón": 0, "Países Bajos": -3 };
const fifaRanks = { "Canadá": 30, "Catar": 56, "Bélgica": 9, "Egipto": 29, "España": 2, "Cabo Verde": 67 };

// ─── STATE ───────────────────────────────────────────────────────────────────
function createDefaultState() {
  return { results: { ...defaultResults }, scorers: {}, knockoutResults: {}, knockoutScorers: {} };
}

function migrateState(raw) {
  // Migrar estado antiguo que mezclaba todo en state.knockout
  if (!raw) return createDefaultState();
  const migrated = {
    results: raw.results || {},
    scorers: raw.scorers || {},
    knockoutResults: {},
    knockoutScorers: {},
  };
  if (raw.knockout && typeof raw.knockout === "object") {
    for (const [key, val] of Object.entries(raw.knockout)) {
      if (Array.isArray(val)) {
        migrated.knockoutScorers[key] = val;
      } else if (typeof val === "object" && val !== null && ("score1" in val || "score2" in val)) {
        migrated.knockoutResults[key] = val;
      } else if (typeof val === "string") {
        migrated.knockoutScorers[key] = val.split(",").map(s => s.trim()).filter(Boolean);
      }
    }
  }
  if (raw.knockoutResults) Object.assign(migrated.knockoutResults, raw.knockoutResults);
  if (raw.knockoutScorers) Object.assign(migrated.knockoutScorers, raw.knockoutScorers);
  return migrated;
}

function loadStoredState() {
  try {
    const raw = JSON.parse(localStorage.getItem("mundial2026Data") || "null");
    return migrateState(raw);
  } catch (err) {
    console.warn("Datos corruptos. Reiniciando.", err);
    localStorage.removeItem("mundial2026Data");
    return createDefaultState();
  }
}

const state = loadStoredState();

// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const groupStageContainer = document.getElementById("groupStage");
const knockoutContainer   = document.getElementById("knockoutStage");
const resetBtn            = document.getElementById("resetBtn");
const saveStatus          = document.getElementById("saveStatus");

// ─── SQUADS (embebido — no requiere fetch, funciona en GitHub Pages) ──────────
const teamSquads = {
  "México": ["Guillermo Ochoa","Raúl Jiménez","Alexis Vega","Santiago Giménez","Carlos Acevedo","Armando González","Israel Reyes","Julián Quiñones","Orbelín Pineda","Obed Vargas","Gilberto Mora","Mateo Chávez","César Huerta","Guillermo Martínez","Jesús Gallardo","Luis Chávez","Roberto Alvarado","Brian Gutiérrez"],
  "Corea del Sur": ["Kim Seung-gyu","Son Heung-min","Lee Jae-sung","Hwang Hee-chan","Kim Min-jae","Hwang In-beom","Paik Seung-ho","Cho Gue-sung","Lee Kang-in","Oh Hyeon-gyu","Jens Castrop","Song Bum-keun","Lee Tae-seok","Cho Wi-je","Kim Moon-hwan","Park Jin-seob","Bae Jun-ho","Yang Hyun-jun","Jo Hyeon-woo","Seol Young-woo","Lee Gi-hyuk","Lee Han-beom","Kim Tae-hyeon","Eom Ji-sung","Lee Dong-gyeong","Kim Jin-gyu"],
  "República Checa": ["Matěj Kovář","David Zima","Jan Kuchta","Lukáš Červ","Mojmír Chytil","David Jurásek","Pavel Šulc","Jaroslav Zelený","David Douděra","Tomáš Souček","Lukáš Horníček","Alexandr Sojka","Hugo Sochůrek","Denis Višinský"],
  "Sudáfrica": ["Ronwen Williams","Thabang Matuludi","Khulumani Ndamane","Teboho Mokoena","Thalente Mbatha","Aubrey Modiba","Oswin Appollis","Tshepang Moremi","Lyle Foster","Relebohile Mofokeng","Themba Zwane","Thapelo Maseko","Sphephelo Sithole","Mbekezeli Mbokazi","Iqraam Rayners","Sipho Chaine","Evidence Makgopa","Samukele Kabini","Nkosinathi Sibisi","Khuliso Mudau","Ime Okon","Ricardo Goss","Jayden Adams","Olwethu Makhanya","Kamogelo Sebelebele","Bradley Cross"],
  "Canadá": ["Dayne St. Clair","Alistair Johnston","Alfie Jones","Luc de Fougerolles","Joel Waterman","Mathieu Choinière","Stephen Eustáquio","Ismaël Koné","Cyle Larin","Jonathan David","Liam Millar","Tani Oluwaseyi","Derek Cornelius","Jacob Shaffelburg","Moïse Bombito","Maxime Crépeau","Tajon Buchanan","Owen Goodman","Alphonso Davies","Ali Ahmed","Jonathan Osorio","Richie Laryea","Niko Sigur","Promise David","Nathan Saliba","Jayden Nelson"],
  "Bosnia y Herzegovina": [],
  "Suiza": ["Gregor Kobel","Miro Muheim","Silvan Widmer","Granit Xhaka","Dan Ndoye","Yvon Mvogo","Ricardo Rodriguez","Ardon Jashari","Djibril Sow","Christian Fassnacht","Rubén Vargas","Eray Cömert"],
  "Catar": ["Mahmud Abunada","Pedro Miguel","Lucas Mendes","Issa Laye","Jassem Gaber","Abdulaziz Hatem","Ahmed Alaaeldin","Edmilson Junior","Mohammed Muntari","Hassan Al-Haydos","Akram Afif","Karim Boudiaf","Sultan Al-Brake","Almoez Ali","Ahmed Fathy","Salah Zakaria","Meshaal Barsham","Assim Madibo","Tahsin Jamshid","Al-Hashmi Al-Hussain","Mohamed Manai"],
  "Brasil": ["Alisson","Éderson Silva","Gabriel Magalhães","Marquinhos","Casemiro","Alex Sandro","Vinícius Júnior","Bruno Guimarães","Matheus Cunha","Neymar","Raphinha","Weverton","Danilo Luiz","Bremer","Léo Pereira","Douglas Santos","Fabinho","Danilo Santos","Endrick","Lucas Paquetá","Luiz Henrique","Gabriel Martinelli","Ederson Moraes","Roger Ibañez","Igor Thiago","Rayan"],
  "Escocia": [],
  "Marruecos": ["Yassine Bounou","Achraf Hakimi","Noussair Mazraoui","Sofyan Amrabat","Marwane Saâdane","Gessime Yassine","Amine Sbaï","Chadi Riad","Youssef Belammari","Ayoub El Kaabi","Anass Salah-Eddine"],
  "Haití": ["Johny Placide","Carlens Arcus","Keeto Thermoncy","Ricardo Adé","Hannes Delcroix","Carl Sainté","Derrick Etienne Jr.","Martin Expérience","Duckens Nazon","Jean-Ricner Bellegarde","Louicius Deedson","Alexandre Pierre","Duke Lacroix","Garven Metusala","Ruben Providence","Lenny Joseph","Danley Jean Jacques","Wilson Isidor","Yassin Fortuné","Frantzdy Pierrot","Josué Casimir","Jean-Kévin Duverne","Josué Duverger","Wilguens Paugain","Dominique Simon","Woodensky Pierre"],
  "Estados Unidos": ["Matt Turner","Sergiño Dest","Chris Richards","Tyler Adams","Antonee Robinson","Auston Trusty","Giovanni Reyna","Weston McKennie","Sebastian Berhalter","Cristian Roldan","Alex Freeman","Malik Tillman","Max Arfsten","Haji Wright","Folarin Balogun","Timothy Weah","Mark McKenzie","Joe Scally","Matt Freese","Chris Brady","Alejandro Zendejas"],
  "Australia": ["Mathew Ryan","Miloš Degenek","Alessandro Circati","Jacob Italiano","Jordan Bos","Jason Geria","Mathew Leckie","Connor Metcalfe","Mohamed Touré","Ajdin Hrustic","Awer Mabil","Paul Izzo","Aiden O'Neill","Cammy Devlin","Cristian Volpato","Cameron Burgess","Jackson Irvine","Nishan Velupillay","Paul Okon-Engstler","Lucas Herrington","Tete Yengi"],
  "Turquía": ["Deniz Gül","Hakan Çalhanoğlu","Kenan Yıldız","Altay Bayındır","Eren Elmalı","Oğuz Aydın","Samet Akaydin","Can Uzun"],
  "Paraguay": ["Gatito Fernández","Gustavo Velázquez","Omar Alderete","Juan José Cáceres","Fabián Balbuena","Júnior Alonso","Ramón Sosa","Diego Gómez","Andrés Cubas","Gustavo Gómez","Damián Bobadilla","Kaku","Álex Arce","Julio Enciso","Braian Ojeda","Gabriel Ávalos","Gastón Olveira","Matías Galarza"],
  "Alemania": ["Manuel Neuer","Antonio Rüdiger","Waldemar Anton","Jonathan Tah","Aleksandar Pavlović","Joshua Kimmich","Kai Havertz"],
  "Curazao": ["Eloy Room","Shurandy Sambo","Juriën Gaari","Leandro Bacuna","Jeremy Antonisse","Sontje Hansen","Tyrese Noslin","Kenji Gorré","Ar'jany Martha","Jearl Margaritha","Brandley Kuwas","Armando Obispo","Gervane Kastaneer","Joshua Brenet","Tahith Chong","Kevin Felida","Riechedly Bazoer"],
  "Costa de Marfil": ["Yahia Fofana","Ousmane Diomande","Ibrahim Sangaré","Nicolas Pépé","Emmanuel Agbadou","Evan Ndicka","Evann Guessand","Alban Lafont","Bazoumana Touré","Parfait Guiagon","Christ Inao Oulaï"],
  "Ecuador": ["Hernán Galíndez","Félix Torres","Piero Hincapié","Joel Ordóñez","Jordy Alcívar","Willian Pacho","Pervis Estupiñán","Anthony Valencia","John Yeboah","Kendry Páez","Kevin Rodríguez","Moisés Ramírez","Enner Valencia","Jeremy Arévalo","Jackson Porozo","Yaimar Medina"],
  "Países Bajos": ["Virgil van Dijk","Nathan Aké","Jan Paul van Hecke","Justin Kluivert","Ryan Gravenberch","Wout Weghorst","Memphis Depay","Cody Gakpo","Mats Wieffer","Donyell Malen","Brian Brobbey","Teun Koopmeiners","Frenkie de Jong","Denzel Dumfries"],
  "Japón": ["Shōgo Taniguchi","Kō Itakura","Yūto Nagatomo","Shūto Machino","Ao Tanaka","Keito Nakamura","Junya Itō","Daichi Kamada","Tsuyoshi Watanabe","Yuito Suzuki","Ayase Ueda","Kōki Ogawa","Ayumu Seko","Hiroki Itō","Takehiro Tomiyasu","Tomoki Hayakawa","Kaishū Sano","Junnosuke Suzuki","Kento Shiogai"],
  "Suecia": ["Jacob Widell Zetterström","Gustaf Lagerbielke","Victor Lindelöf","Isak Hien","Gabriel Gudmundsson","Herman Johansson","Lucas Bergvall","Daniel Svensson","Alexander Isak","Benjamin Nygren","Anthony Elanga","Viktor Johansson","Ken Sema","Hjalmar Ekdal","Carl Starfelt","Jesper Karlström","Viktor Gyökeres","Yasin Ayari","Mattias Svanberg","Eric Smith","Alexander Bernhardsson","Besfort Zeneli"],
  "Túnez": ["Omar Rekik","Adem Arous","Dylan Bronn","Elias Achouri","Elias Saad","Hazem Mastouri","Hannibal Mejbri","Ismaël Gharbi","Mortadha Ben Ouanes","Rani Khedira","Khalil Ayari","Hadj Mahmoud","Aymen Dahmen","Ellyes Skhiri","Rayan Elloumi","Firas Chaouat","Yan Valery","Mohamed Amine Ben Hamida","Sabri Ben Hessen","Moutaz Neffati"],
  "Bélgica": ["Thibaut Courtois","Zeno Debast","Arthur Theate","Brandon Mechele","Maxim De Cuyper","Axel Witsel","Kevin De Bruyne","Youri Tielemans","Romelu Lukaku","Leandro Trossard","Jérémy Doku","Senne Lammens","Mike Penders","Dodi Lukébakio","Thomas Meunier","Koni De Winter","Charles De Ketelaere","Joaquin Seys","Amadou Onana","Nathan Ngoy","Matias Fernandez-Pardo"],
  "Irán": ["Ehsan Hajsafi","Shojae Khalilzadeh","Milad Mohammadi","Saeid Ezatolahi","Payam Niazmand","Hossein Kanaanizadegan","Saman Ghoddos","Rouzbeh Cheshmi","Mohammad Ghorbani","Hossein Hosseini","Ramin Rezaeian","Dennis Eckert","Danial Eiri","Amirmohammad Razzaghinia"],
  "Nueva Zelanda": ["Liberato Cacace","Alex Rufer","Nando Pijnaker","Finn Surman","Kosta Barbarouses"],
  "Egipto": ["Mohamed El Shenawy","Yasser Ibrahim","Mohamed Hany","Hossam Abdelmaguid","Ramy Rabia","Mohamed Abdelmonem","Trézéguet","Emam Ashour","Hamza Abdelkarim","Mohamed Salah","Mostafa Ziko","Haissem Hassan","Ahmed Fatouh","Hamdy Fathy","Karim Hafez","El Mahdy Soliman","Mohanad Lasheen","Nabil Emad","Tarek Alaa","Zizo","Mohamed Alaa"],
  "España": ["David Raya","Marc Pubill","Álex Grimaldo","Gavi","Dani Olmo","Yéremy Pino","Pedro Porro","Joan Garcia","Aymeric Laporte","Álex Baena","Rodri","Nico Williams","Martín Zubimendi","Lamine Yamal","Pedri","Mikel Oyarzabal","Pau Cubarsí","Unai Simón","Marc Cucurella","Víctor Muñoz","Borja Iglesias"],
  "Cabo Verde": ["Vozinha","Stopira","Diney","Roberto Lopes","Logan Costa","Kevin Pina","Jovane Cabral","João Paulo","Gilson Benchimol","Laros Duarte","Yannick Semedo","Willy Semedo","Telmo Arcanjo","Dailon Livramento","Ryan Mendes","Nuno da Costa","Steven Moreira","CJ dos Santos","Wagner Pina"],
  "Arabia Saudita": ["Nawaf Al-Aqidi","Ali Majrashi","Ali Lajami","Abdulelah Al-Amri","Hassan Al-Tambakti","Nasser Al-Dawsari","Musab Al-Juwayr","Ayman Yahya","Firas Al-Buraikan","Salem Al-Dawsari","Saleh Al-Shehri","Saud Abdulhamid","Nawaf Boushal","Hassan Kadesh","Abdullah Al-Khaibari","Ziyad Al-Johani","Khalid Al-Ghannam","Alaa Al-Hejji","Abdullah Al-Hamdan","Sultan Mandash","Mohammed Al-Owais","Ahmed Al-Kassar","Mohamed Kanno","Moteb Al-Harbi","Jehad Thakri","Mohammed Abu Al-Shamat"],
  "Uruguay": ["Sergio Rochet","José María Giménez","Sebastián Cáceres","Ronald Araújo","Manuel Ugarte","Rodrigo Bentancur","Nicolás de la Cruz","Federico Valverde","Darwin Núñez","Giorgian de Arrascaeta","Facundo Pellistri","Santiago Mele","Guillermo Varela","Agustín Canobbio","Emiliano Martínez","Mathías Olivera","Matías Viña","Brian Rodríguez","Santiago Bueno","Juan Manuel Sanabria","Rodrigo Zalazar"],
  "Francia": ["Brice Samba","Malo Gusto","Lucas Digne","Dayot Upamecano","Jules Koundé","Manu Koné","Ousmane Dembélé","Aurélien Tchouaméni","Marcus Thuram","Kylian Mbappé","Michael Olise","Bradley Barcola","N'Golo Kanté","Adrien Rabiot","Maghnes Akliouche","Maxence Lacroix"],
  "Senegal": ["Yehvann Diouf","Mamadou Sarr","Kalidou Koulibaly","Abdoulaye Seck","Idrissa Gueye","Pathé Ciss","Assane Diao","Lamine Camara","Bamba Dieng","Sadio Mané","Nicolas Jackson","Cherif Ndiaye","Iliman Ndiaye","Ismail Jakobs","Krépin Diatta","Édouard Mendy","Pape Matar Sarr","Ismaïla Sarr","Moussa Niakhaté","Ibrahim Mbaye","Habib Diarra","Bara Sapoko Ndiaye","Mory Diaw","Antoine Mendy","El Hadji Malick Diouf","Pape Gueye"],
  "Irak": ["Rebin Sulaka","Hussein Ali","Zaid Tahseen","Akam Hashim","Manaf Younis","Jalal Hassan","Ali Yousif","Zidane Iqbal","Ahmed Maknzi","Amir Al-Ammari","Ali Jasim","Aymen Hussein","Kevin Yakob","Aimar Sher","Marko Farji","Ahmed Basil","Merchas Doski","Zaid Ismail","Mustafa Saadoon","Frans Putros"],
  "Noruega": ["Ørjan Nyland","Morten Thorsby","Kristoffer Ajer","Leo Østigård","David Møller Wolfe","Patrick Berg","Alexander Sørloth","Sander Berge","Erling Haaland","Martin Ødegaard","Jørgen Strand Larsen","Sander Tangvik","Egil Selvik","Sondre Langås","Henrik Falchener","Julian Ryerson"],
  "Argentina": ["Juan Musso","Marcos Senesi","Nicolás Tagliafico","Gonzalo Montiel","Leandro Paredes","Lisandro Martínez","Rodrigo De Paul","Valentín Barco","Julián Alvarez","Lionel Messi","Giovani Lo Celso","Gerónimo Rulli","Cristian Romero","Exequiel Palacios","Nicolás González","Thiago Almada","Giuliano Simeone","Nico Paz","Nicolás Otamendi","Alexis Mac Allister","José Manuel López","Lautaro Martínez","Emiliano Martínez","Enzo Fernández","Facundo Medina","Nahuel Molina"],
  "Argelia": ["Melvin Mastil","Aïssa Mandi","Achref Abada","Houssem Aouar","Amine Gouiri","Farès Chaïbi","Anis Hadj Moussa","Nadhir Benbouali","Jaouen Hadjam","Hicham Boudaoui","Rayan Aït-Nouri","Oussama Benbot","Rafik Belghali","Mohamed Amoura","Nabil Bentaleb","Adil Boulbina","Ramy Bensebaini","Ibrahim Maza","Luca Zidane","Yacine Titraoui","Farès Ghedjemis","Samir Chergui"],
  "Austria": ["David Affengruber","Kevin Danso","Xaver Schlager","Stefan Posch","Nicolas Seiwald","Florian Wiegele","Patrick Pentz","Saša Kalajdžić","Philipp Lienhart","Phillipp Mwene"],
  "Jordania": ["Mohammad Abu Hashish","Abdallah Nasib","Husam Abu Dahab","Yazan Al-Arab","Amer Jamous"],
  "Portugal": ["Diogo Costa","Nélson Semedo","Rúben Dias","Tomás Araújo","Diogo Dalot","Matheus Nunes","Cristiano Ronaldo","Bruno Fernandes","Samú Costa","Nuno Mendes","Francisco Conceição"],
  "Colombia": ["David Ospina","Daniel Muñoz","Jhon Lucumí","Santiago Arias","Kevin Castaño","Richard Ríos","Luis Díaz","Jorge Carrascal","Jhon Córdoba","James Rodríguez","Jhon Arias","Camilo Vargas","Yerry Mina","Cucho Hernández","Juan Fernando Quintero","Jaminton Campaz","Deiver Machado","Davinson Sánchez","Álvaro Montero","Luis Suárez","Andrés Gómez"],
  "República Democrática del Congo": ["Steve Kapuadi","Axel Tuanzebe","Dylan Batubinsika","Ngal'ayel Mukau","Nathanaël Mbuku","Samuel Moutoussamy","Brian Cipenga","Théo Bongonda","Gaël Kakuta","Joris Kayembe","Meschak Elia","Noah Sadiki","Aaron Tshibola","Timothy Fayulu","Cédric Bakambu","Charles Pickel","Fiston Mayele","Yoane Wissa","Matthieu Epolo","Chancel Mbemba","Simon Banza","Gédéon Kalulu","Edo Kayembe","Arthur Masuaku"],
  "Uzbekistán": ["Akmal Mozgovoy","Otabek Shukurov","Jamshid Iskanderov","Odiljon Hamrobekov"],
  "Inglaterra": ["Jordan Pickford","Ezri Konsa","Nico O'Reilly","Declan Rice","John Stones","Marc Guéhi","Bukayo Saka","Elliot Anderson","Harry Kane","Jude Bellingham","Marcus Rashford","Tino Livramento","Dean Henderson","Jordan Henderson","Dan Burn","Kobbie Mainoo","Morgan Rogers","Anthony Gordon","Ollie Watkins","Noni Madueke","Eberechi Eze","Ivan Toney","James Trafford","Reece James","Djed Spence","Jarell Quansah"],
  "Croacia": ["Joško Gvardiol","Duje Ćaleta-Car","Josip Šutalo","Nikola Moro","Mateo Kovačić","Toni Fruk","Igor Matanović","Luka Sučić","Luka Vušković","Dominik Kotarski","Marco Pašalić","Martin Erlić","Petar Musa"],
  "Ghana": ["Lawrence Ati-Zigi","Alidu Seidu","Caleb Yirenkyi","Jonas Adjetey","Thomas Partey","Abdul Mumin","Joseph Anang","Christopher Bonsu Baah","Gideon Mensah","Elisha Owusu","Benjamin Asare","Abdul Rahman Baba","Jerome Opoku","Iñaki Williams","Augustine Boakye","Kojo Peprah Oppong","Kamaldeen Sulemana","Derrick Luckassen","Ernest Nuamah","Prince Kwabena Adu","Marvin Senaya"],
  "Panamá": ["Luis Mejía","César Blackman","José Córdoba","Fidel Escobar","Edgardo Fariña","Cristian Martínez","José Luis Rodríguez","Adalberto Carrasquilla","Tomás Rodríguez","Ismael Díaz","Yoel Bárcenas","César Samudio","Jiovany Ramos","Alberto Quintero","Aníbal Godoy","César Yanis","Orlando Mosquera","Michael Amir Murillo","Azarias Londoño","Roderick Miller","Jorge Gutiérrez"],
};

// Construir mapa inverso jugador → equipo al inicio (sin fetch)
function buildPlayerTeamMap() {
  playerTeamMap = {};
  for (const [team, players] of Object.entries(teamSquads)) {
    for (const player of players) {
      playerTeamMap[player] = team;
    }
  }
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, c =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );
}

function mapFlag(country) { return countryFlags[country] || "🏳️"; }

function saveState() {
  localStorage.setItem("mundial2026Data", JSON.stringify(state));
  saveStatus.textContent = "Guardado · " + new Date().toLocaleTimeString("es", { hour: "2-digit", minute: "2-digit" });
}

function formatMatchTime(date, time, stadium) {
  const parts = [date];
  if (time && time !== "TBD") parts.push(time);
  if (stadium) parts.push(stadium);
  return parts.join(" · ");
}

function parseScore(value) {
  const num = parseInt(value, 10);
  return Number.isFinite(num) && num >= 0 ? num : null;
}

// ─── RESULTS ACCESS ──────────────────────────────────────────────────────────
function getResult(id) {
  return state.results[id] || { score1: "", score2: "" };
}

function getKnockoutResult(id) {
  return state.knockoutResults[id] || { score1: "", score2: "" };
}

// ─── SCORERS ACCESS ──────────────────────────────────────────────────────────
function scorersToString(raw) {
  if (!raw) return "";
  if (Array.isArray(raw)) return raw.join(", ");
  return String(raw);
}

function stringToScorers(value) {
  if (!value || !value.toString().trim()) return null;
  return value.toString().split(",").map(s => s.trim()).filter(Boolean);
}

function getScorer(id, teamIndex) {
  return scorersToString(state.scorers[`${id}-${teamIndex}`]);
}

function setScorer(id, teamIndex, value) {
  const key = `${id}-${teamIndex}`;
  const parsed = stringToScorers(value);
  if (!parsed) delete state.scorers[key];
  else state.scorers[key] = parsed;
  saveState();
  renderTopScorers();
}

function getKnockoutScorer(id, teamIndex) {
  return scorersToString(state.knockoutScorers[`${id}-${teamIndex}`]);
}

function setKnockoutScorer(id, teamIndex, value) {
  const key = `${id}-${teamIndex}`;
  const parsed = stringToScorers(value);
  if (!parsed) delete state.knockoutScorers[key];
  else state.knockoutScorers[key] = parsed;
  saveState();
  renderTopScorers();
}

// ─── RESULT SETTERS ──────────────────────────────────────────────────────────
function setResult(id, teamIndex, value) {
  const result = state.results[id] || { score1: "", score2: "" };
  result[`score${teamIndex}`] = value;
  state.results[id] = result;
  // Solo re-renderizar standings y knockout, sin reconstruir inputs de grupo
  rerenderStandings();
  rerenderKnockoutTeams();
  renderTopScorers();
  saveState();
}

function setKnockoutResult(id, teamIndex, value) {
  const result = state.knockoutResults[id] || { score1: "", score2: "" };
  result[`score${teamIndex}`] = value;
  state.knockoutResults[id] = result;
  rerenderKnockoutTeams();
  renderTopScorers();
  saveState();
}

// ─── AUTOCOMPLETE ─────────────────────────────────────────────────────────────
function getLastScorerToken(value) {
  const token = value.toString().split(",").pop();
  return token ? token.trim() : "";
}

function replaceLastScorerToken(value, replacement) {
  const pieces = value.toString().split(",");
  pieces[pieces.length - 1] = replacement;
  return pieces.map(p => p.trim()).filter(Boolean).join(", ") + ", ";
}

function getScorerSuggestions(teamName, partialInput) {
  const players = teamSquads[teamName] || [];
  if (!partialInput.trim()) return players;
  const lower = partialInput.toLowerCase();
  return players.filter(name => name.toLowerCase().includes(lower));
}

function renderAutocompleteOptions(input) {
  const teamName = input.dataset.teamName;
  const query = getLastScorerToken(input.value);
  const list = input.parentElement.querySelector(".autocomplete-list");
  if (!list) return;
  if (!teamName || !query) { closeAutocomplete(list); return; }
  const suggestions = getScorerSuggestions(teamName, query).slice(0, 8);
  if (!suggestions.length) { closeAutocomplete(list); return; }
  list.classList.add("visible");
  list.innerHTML = suggestions.map(s =>
    `<div class="autocomplete-item" data-value="${escapeHtml(s)}">${escapeHtml(s)}</div>`
  ).join("");
  list.querySelectorAll(".autocomplete-item").forEach(item => {
    item.addEventListener("mousedown", e => {
      e.preventDefault();
      input.value = replaceLastScorerToken(input.value, item.dataset.value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
      closeAutocomplete(list);
    });
  });
}

function closeAutocomplete(list) {
  list.innerHTML = "";
  list.classList.remove("visible");
}

function attachAutocomplete(root) {
  (root || document).querySelectorAll(".scorer-input").forEach(input => {
    input.addEventListener("input",  () => renderAutocompleteOptions(input));
    input.addEventListener("focus",  () => renderAutocompleteOptions(input));
    input.addEventListener("blur",   () => setTimeout(() => {
      const list = input.parentElement?.querySelector(".autocomplete-list");
      if (list) closeAutocomplete(list);
    }, 150));
  });
}

// ─── STANDINGS ────────────────────────────────────────────────────────────────
function calculateGroupStandings(group) {
  const seedOrder = new Map(group.teams.map((t, i) => [t, i]));
  const table = group.teams.map(team => ({ team, played: 0, won: 0, draw: 0, lost: 0, gf: 0, ga: 0, points: 0 }));
  const row = name => table.find(r => r.team === name);

  group.matches.forEach(match => {
    const { score1, score2 } = getResult(match.id);
    const g1 = parseScore(score1), g2 = parseScore(score2);
    if (g1 === null || g2 === null) return;
    const r1 = row(match.team1), r2 = row(match.team2);
    if (!r1 || !r2) return;
    r1.played++; r2.played++;
    r1.gf += g1; r1.ga += g2;
    r2.gf += g2; r2.ga += g1;
    if (g1 > g2)      { r1.won++; r2.lost++; r1.points += 3; }
    else if (g1 < g2) { r2.won++; r1.lost++; r2.points += 3; }
    else              { r1.draw++; r2.draw++; r1.points++; r2.points++; }
  });

  return table.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const da = a.gf - a.ga, db = b.gf - b.ga;
    if (db !== da) return db - da;
    if (b.gf !== a.gf) return b.gf - a.gf;
    const fa = fairPlayScores[a.team], fb = fairPlayScores[b.team];
    if (Number.isFinite(fa) && Number.isFinite(fb) && fb !== fa) return fb - fa;
    const ra = fifaRanks[a.team], rb = fifaRanks[b.team];
    if (Number.isFinite(ra) && Number.isFinite(rb) && ra !== rb) return ra - rb;
    return seedOrder.get(a.team) - seedOrder.get(b.team);
  });
}

function getTeamByPosition(groupName, pos) {
  const group = groups.find(g => g.name === groupName);
  if (!group) return `${pos}º ${groupName}`;
  const standings = calculateGroupStandings(group);
  const team = standings[pos - 1];
  return team ? team.team : `${pos}º ${groupName}`;
}

// ─── KNOCKOUT RESOLUTION ──────────────────────────────────────────────────────
function getMatchOutcome(id, outcome = "winner") {
  const result = getKnockoutResult(id);
  const g1 = parseScore(result.score1), g2 = parseScore(result.score2);
  if (g1 === null || g2 === null) return null;
  if (g1 === g2) return "draw";
  const t1won = g1 > g2;
  return outcome === "loser" ? (t1won ? "team2" : "team1") : (t1won ? "team1" : "team2");
}

function getSourceLabel(source) {
  if (source.group)  return `${source.pos}º ${source.group}`;
  if (source.groups) return source.groups.map(g => `3º${g}`).join("/");
  if (source.from) {
    const match = knockoutMatches.find(m => m.id === source.from);
    if (!match) return source.from;
    const outcome = source.outcome === "loser" ? getMatchOutcome(source.from, "loser") : getMatchOutcome(source.from);
    if (outcome === "team1") return getSourceLabel(match.source1) + (source.outcome === "loser" ? " ✕" : " ✓");
    if (outcome === "team2") return getSourceLabel(match.source2) + (source.outcome === "loser" ? " ✕" : " ✓");
    if (outcome === "draw")  return `Empate · ${match.round}`;
    if (source.outcome === "loser") return `Perdedor ${match.round}`;
    return `${getSourceLabel(match.source1)} / ${getSourceLabel(match.source2)}`;
  }
  return "---";
}

function getKnockoutTeam(source) {
  if (source.group)  return getTeamByPosition(source.group, source.pos);
  if (source.groups) return source.groups.map(g => `3º${g}`).join("/");
  if (source.from) {
    const match = knockoutMatches.find(m => m.id === source.from);
    if (!match) return source.from;
    const outcome = source.outcome === "loser" ? getMatchOutcome(source.from, "loser") : getMatchOutcome(source.from);
    if (outcome === "team1") return getKnockoutTeam(match.source1);
    if (outcome === "team2") return getKnockoutTeam(match.source2);
    if (outcome === "draw")  return `Empate en ${match.round}`;
    if (source.outcome === "loser") return `Perdedor ${match.round}`;
    return `${getSourceLabel(match.source1)} / ${getSourceLabel(match.source2)}`;
  }
  return "TBD";
}

// ─── SMART RE-RENDERS (sin perder foco) ──────────────────────────────────────
function rerenderStandings() {
  document.querySelectorAll("[data-standings-group]").forEach(el => {
    const groupName = el.dataset.standingsGroup;
    const group = groups.find(g => g.name === groupName);
    if (!group) return;
    el.querySelector("tbody").innerHTML = buildStandingsRows(calculateGroupStandings(group));
  });
}

function rerenderKnockoutTeams() {
  // Actualiza solo las etiquetas de equipo en la fase eliminatoria
  document.querySelectorAll("[data-knockout-team]").forEach(el => {
    const matchId = el.dataset.knockoutTeam;
    const side    = el.dataset.side; // "1" | "2"
    const match   = knockoutMatches.find(m => m.id === matchId);
    if (!match) return;
    const source = side === "1" ? match.source1 : match.source2;
    const team = getKnockoutTeam(source);
    const flag = mapFlag(team);
    el.innerHTML = `<span class="flag">${escapeHtml(flag)}</span>${escapeHtml(team)}`;
    // También actualizar el data-team-name del input de anotadores correspondiente
    const card = el.closest(".bracket-row");
    if (card) {
      const scorerInput = card.querySelector(`.scorer-input[data-knockout-scorer="${matchId}"][data-team="${side}"]`);
      if (scorerInput) scorerInput.dataset.teamName = team;
    }
  });
}

// ─── BUILD STANDINGS ROWS ────────────────────────────────────────────────────
function buildStandingsRows(standings) {
  return standings.map((row, i) => {
    const diff = row.gf - row.ga;
    const qualify = i < 2 ? ' style="background:rgba(47,111,246,0.06)"' : "";
    return `<tr${qualify}>
      <td><span class="pos-badge">${i + 1}</span> <span class="flag">${escapeHtml(mapFlag(row.team))}</span>${escapeHtml(row.team)}</td>
      <td class="col-hide">${row.played}</td><td class="col-hide">${row.won}</td><td class="col-hide">${row.draw}</td><td class="col-hide">${row.lost}</td>
      <td class="col-hide">${row.gf}</td><td class="col-hide">${row.ga}</td>
      <td class="${diff > 0 ? "diff-pos" : diff < 0 ? "diff-neg" : ""}">${diff >= 0 ? "+" + diff : diff}</td>
      <td><strong>${row.points}</strong></td>
    </tr>`;
  }).join("");
}

// ─── GROUP STAGE RENDER ───────────────────────────────────────────────────────
function renderGroupStage() {
  groupStageContainer.innerHTML = "";
  const title = document.createElement("h2");
  title.textContent = "Fase de grupos";
  groupStageContainer.appendChild(title);
  groups.forEach(group => groupStageContainer.appendChild(buildGroupCard(group)));
  attachGroupInputs();
  attachAutocomplete(groupStageContainer);
}

function buildGroupCard(group) {
  const standings = calculateGroupStandings(group);
  const card = document.createElement("div");
  card.className = "group-card";

  card.innerHTML = `
    <h3><span class="group-headline">Grupo ${escapeHtml(group.name)}</span></h3>
    <div class="group-body">
      <div class="table-wrapper">
        <table data-standings-group="${escapeHtml(group.name)}">
          <thead>
            <tr>
              <th>Equipo</th><th class="col-hide">PJ</th><th class="col-hide">G</th><th class="col-hide">E</th><th class="col-hide">P</th>
              <th class="col-hide">GF</th><th class="col-hide">GC</th><th>DG</th><th>Pts</th>
            </tr>
          </thead>
          <tbody>${buildStandingsRows(standings)}</tbody>
        </table>
      </div>
      <div class="match-list">
        <div class="stage-heading">Partidos</div>
        ${group.matches.map(match => buildMatchRow(match)).join("")}
      </div>
    </div>
  `;
  return card;
}

function buildMatchRow(match) {
  const result = getResult(match.id);
  const id = escapeHtml(match.id);
  const t1 = escapeHtml(match.team1), t2 = escapeHtml(match.team2);
  return `
    <div class="match-row">
      <div class="match-time">${escapeHtml(formatMatchTime(match.date, match.time, match.stadium))}</div>
      <div class="match-team-row">
        <div class="team-block">
          <div class="team-label"><span class="flag">${escapeHtml(mapFlag(match.team1))}</span>${t1}</div>
          <div class="scorer-block">
            <label class="input-label">Anotadores</label>
            <div class="autocomplete-wrapper">
              <input class="scorer-input" type="text" placeholder="Ej. Rodríguez, García"
                value="${escapeHtml(getScorer(match.id, 1))}"
                data-scorer-id="${id}" data-team="1" data-team-name="${t1}" />
              <div class="autocomplete-list"></div>
            </div>
          </div>
        </div>
        <div class="score-col">
          <input class="score-input" type="number" min="0" step="1"
            value="${escapeHtml(result.score1)}" data-result-id="${id}" data-team="1" />
        </div>
      </div>
      <div class="mobile-vs">vs</div>
      <div class="match-team-row">
        <div class="team-block">
          <div class="team-label"><span class="flag">${escapeHtml(mapFlag(match.team2))}</span>${t2}</div>
          <div class="scorer-block">
            <label class="input-label">Anotadores</label>
            <div class="autocomplete-wrapper">
              <input class="scorer-input" type="text" placeholder="Ej. Sánchez, López"
                value="${escapeHtml(getScorer(match.id, 2))}"
                data-scorer-id="${id}" data-team="2" data-team-name="${t2}" />
              <div class="autocomplete-list"></div>
            </div>
          </div>
        </div>
        <div class="score-col">
          <input class="score-input" type="number" min="0" step="1"
            value="${escapeHtml(result.score2)}" data-result-id="${id}" data-team="2" />
        </div>
      </div>
    </div>`;
}

function attachGroupInputs() {
  groupStageContainer.querySelectorAll(".score-input[data-result-id]").forEach(input => {
    input.oninput = e => setResult(e.target.dataset.resultId, e.target.dataset.team, e.target.value);
  });
  groupStageContainer.querySelectorAll(".scorer-input[data-scorer-id]").forEach(input => {
    input.oninput = e => setScorer(e.target.dataset.scorerId, e.target.dataset.team, e.target.value);
  });
}

// ─── KNOCKOUT RENDER ─────────────────────────────────────────────────────────
function renderKnockout() {
  knockoutContainer.innerHTML = "";
  const title = document.createElement("h2");
  title.textContent = "Fase eliminatoria";
  knockoutContainer.appendChild(title);

  const info = document.createElement("p");
  info.style.color = "var(--muted)";
  info.style.marginBottom = "16px";
  info.textContent = "Los mejores terceros de grupo clasifican según las combinaciones del Reglamento FIFA (Anexo C). Las referencias 3ºX/Y/Z se actualizan cuando los resultados lo permiten.";
  knockoutContainer.appendChild(info);

  const sections = [
    ["Dieciseisavos de final", knockoutMatches.filter(m => m.id.startsWith("r16-"))],
    ["Octavos de final",       knockoutMatches.filter(m => m.id.startsWith("oct-"))],
    ["Cuartos de final",       knockoutMatches.filter(m => m.id.startsWith("qf-"))],
    ["Semifinales",            knockoutMatches.filter(m => m.id.startsWith("sf-"))],
  ];
  sections.forEach(([label, matches]) => {
    if (matches.length) knockoutContainer.appendChild(buildBracketSection(label, matches));
  });

  // Final y tercer lugar
  const lastCard = document.createElement("div");
  lastCard.className = "bracket-card";
  const tp = knockoutMatches.find(m => m.id === "thirdplace");
  const fn = knockoutMatches.find(m => m.id === "final");
  if (tp) lastCard.appendChild(buildBracketSection("Tercer lugar", [tp]));
  if (fn) lastCard.appendChild(buildBracketSection("Final", [fn]));
  knockoutContainer.appendChild(lastCard);

  attachKnockoutInputs();
  attachAutocomplete(knockoutContainer);
}

function buildBracketSection(titleText, matches) {
  const wrapper = document.createElement("div");
  wrapper.className = "bracket-card";
  const h3 = document.createElement("h3");
  h3.textContent = titleText;
  wrapper.appendChild(h3);
  matches.forEach(match => wrapper.appendChild(buildBracketRow(match)));
  return wrapper;
}

function buildBracketRow(match) {
  const result = getKnockoutResult(match.id);
  const team1  = getKnockoutTeam(match.source1);
  const team2  = getKnockoutTeam(match.source2);
  const id = escapeHtml(match.id);
  const t1 = escapeHtml(team1), t2 = escapeHtml(team2);

  const row = document.createElement("div");
  row.className = "bracket-row";
  row.innerHTML = `
    <div class="match-time">${escapeHtml(formatMatchTime(match.date, match.time, match.stadium))}</div>
    <div class="match-team-row">
      <div class="team-block">
        <div class="team-label" data-knockout-team="${id}" data-side="1">
          <span class="flag">${escapeHtml(mapFlag(team1))}</span>${t1}
        </div>
        <div class="scorer-block">
          <label class="input-label">Anotadores</label>
          <div class="autocomplete-wrapper">
            <input class="scorer-input" type="text" placeholder="Ej. Gómez"
              value="${escapeHtml(getKnockoutScorer(match.id, 1))}"
              data-knockout-scorer="${id}" data-team="1" data-team-name="${t1}" />
            <div class="autocomplete-list"></div>
          </div>
        </div>
      </div>
      <div class="score-col">
        <input class="score-input" type="number" min="0" step="1"
          value="${escapeHtml(result.score1)}" data-knockout-result="${id}" data-team="1" />
      </div>
    </div>
    <div class="mobile-vs">vs</div>
    <div class="match-team-row">
      <div class="team-block">
        <div class="team-label" data-knockout-team="${id}" data-side="2">
          <span class="flag">${escapeHtml(mapFlag(team2))}</span>${t2}
        </div>
        <div class="scorer-block">
          <label class="input-label">Anotadores</label>
          <div class="autocomplete-wrapper">
            <input class="scorer-input" type="text" placeholder="Ej. Díaz"
              value="${escapeHtml(getKnockoutScorer(match.id, 2))}"
              data-knockout-scorer="${id}" data-team="2" data-team-name="${t2}" />
            <div class="autocomplete-list"></div>
          </div>
        </div>
      </div>
      <div class="score-col">
        <input class="score-input" type="number" min="0" step="1"
          value="${escapeHtml(result.score2)}" data-knockout-result="${id}" data-team="2" />
      </div>
    </div>`;
  return row;
}

function attachKnockoutInputs() {
  knockoutContainer.querySelectorAll(".score-input[data-knockout-result]").forEach(input => {
    input.oninput = e => setKnockoutResult(e.target.dataset.knockoutResult, e.target.dataset.team, e.target.value);
  });
  knockoutContainer.querySelectorAll(".scorer-input[data-knockout-scorer]").forEach(input => {
    input.oninput = e => setKnockoutScorer(e.target.dataset.knockoutScorer, e.target.dataset.team, e.target.value);
  });
}

// ─── TOP SCORERS ─────────────────────────────────────────────────────────────
function getTopScorers() {
  const scorersData = {}; // name → { goals, team }

  function addScorers(scorerArray, team) {
    if (!Array.isArray(scorerArray)) return;
    scorerArray.forEach(name => {
      if (!name) return;
      if (!scorersData[name]) scorersData[name] = { goals: 0, team: team || playerTeamMap[name] || "—" };
      scorersData[name].goals++;
    });
  }

  // Fase de grupos
  groups.forEach(group => {
    group.matches.forEach(match => {
      const { score1, score2 } = getResult(match.id);
      const g1 = parseScore(score1), g2 = parseScore(score2);
      // Solo validar que el partido tenga resultado; los goles de cada anotador se cuentan individualmente
      const s1 = state.scorers[`${match.id}-1`];
      const s2 = state.scorers[`${match.id}-2`];
      if (g1 !== null) addScorers(s1, match.team1);
      if (g2 !== null) addScorers(s2, match.team2);
    });
  });

  // Fase eliminatoria
  knockoutMatches.forEach(match => {
    const r = getKnockoutResult(match.id);
    const g1 = parseScore(r.score1), g2 = parseScore(r.score2);
    const ks1 = state.knockoutScorers[`${match.id}-1`];
    const ks2 = state.knockoutScorers[`${match.id}-2`];
    // Recuperar nombres de equipo del estado actual
    const team1 = getKnockoutTeam(match.source1);
    const team2 = getKnockoutTeam(match.source2);
    if (g1 !== null) addScorers(ks1, team1);
    if (g2 !== null) addScorers(ks2, team2);
  });

  return Object.entries(scorersData)
    .map(([name, { goals, team }]) => ({ name, goals, team }))
    .sort((a, b) => b.goals - a.goals || a.name.localeCompare(b.name, "es"));
}

function renderTopScorers() {
  const container = document.getElementById("topScorersStage");
  if (!container) return;

  const topScorers = getTopScorers();

  if (topScorers.length === 0) {
    container.innerHTML = `
      <div class="intro-card scorers-card">
        <h2>⚽ Tabla de goleadores</h2>
        <p class="empty-scorers">Ingresa anotadores en los partidos para verlos aquí.</p>
      </div>`;
    return;
  }

  const maxGoals = topScorers[0].goals;

  container.innerHTML = `
    <div class="intro-card scorers-card">
      <h2>⚽ Tabla de goleadores</h2>
      <div class="table-wrapper">
        <table class="scorers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Jugador</th>
              <th>Equipo</th>
              <th>Goles</th>
            </tr>
          </thead>
          <tbody>
            ${topScorers.map((scorer, i) => {
              const pct = maxGoals > 0 ? Math.round((scorer.goals / maxGoals) * 100) : 0;
              const flag = mapFlag(scorer.team);
              return `<tr class="${i === 0 ? "top-scorer" : ""}">
                <td class="rank-cell">${i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : i + 1}</td>
                <td class="scorer-name-cell">${escapeHtml(scorer.name)}</td>
                <td class="scorer-team-cell">
                  <span class="flag">${escapeHtml(flag)}</span>${escapeHtml(scorer.team)}
                </td>
                <td class="scorer-goals-cell">
                  <div class="goals-bar-wrap">
                    <div class="goals-bar" style="width:${pct}%"></div>
                    <span class="goals-count">${scorer.goals}</span>
                  </div>
                </td>
              </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    </div>`;
}

// ─── RESET ────────────────────────────────────────────────────────────────────
function resetAll() {
  if (!confirm("¿Deseas reiniciar todos los resultados y anotadores?")) return;
  state.results = {};
  state.scorers = {};
  state.knockoutResults = {};
  state.knockoutScorers = {};
  saveState();
  renderGroupStage();
  renderKnockout();
  renderTopScorers();
}

resetBtn.addEventListener("click", resetAll);

// ─── INIT ─────────────────────────────────────────────────────────────────────
buildPlayerTeamMap();
renderGroupStage();
renderKnockout();
renderTopScorers();