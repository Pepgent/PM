const f04_input = 651501700160
const f04_film = "film_97b08704402546f5a774ad35216ecaf3"
const f04_temp = 2200
const f04_doubled = calc(f04_input)
const { score: f04_score, report: f04_report } = review(f04_doubled)
const { curve: f04_curve, log: f04_log } = anneal(f04_film, f04_temp)