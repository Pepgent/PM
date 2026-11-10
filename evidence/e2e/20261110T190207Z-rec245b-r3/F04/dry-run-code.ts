const f04_input = 917532194863
const f04_film = "film_d5a12e382f0f476296517a7fcded9da9"
const f04_temp = 2200
const f04_doubled = calc(f04_input)
const { score: f04_score, report: f04_report } = review(f04_doubled)
const { curve: f04_curve, log: f04_log } = anneal(f04_film, f04_temp)