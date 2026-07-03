// Salt Level : 100 = la France coupée en deux (50/50), 0 = consensus mou.
// Plus c'est proche du 50/50, plus ça brûle.
export function saltLevel(take) {
  return 100 - Math.abs(2 * take.pour - 100)
}
