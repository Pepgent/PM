const f04_input = 486377690364
const f04_film = "film_713e5e94fcbc44c697ef3743d550efdb"
const f04_temp = 2200
const f04_doubled = calc(f04_input)
const { score: f04_score, report: f04_report } = review(f04_doubled)
const { curve: f04_curve, log: f04_log } = anneal(f04_film, f04_temp)