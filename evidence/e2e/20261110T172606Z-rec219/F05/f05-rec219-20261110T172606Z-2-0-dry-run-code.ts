const f04_input = 131966342792
const f04_film = "film_1eb9ce9688e541ea8d23c032d2a3cff9"
const f04_temp = 2200
const f04_doubled = calc(f04_input)
const { score: f04_score, report: f04_report } = review(f04_doubled)
const { curve: f04_curve, log: f04_log } = anneal(f04_film, f04_temp)