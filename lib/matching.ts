export function scoreCompatibility(a: any, b: any) {
  let score = 0
  if (a.prayer_frequency != null && b.prayer_frequency != null) score += Math.max(0, 20 - Math.abs(a.prayer_frequency - b.prayer_frequency) * 4)
  if (a.marriage_timeline && a.marriage_timeline === b.marriage_timeline) score += 20
  if (a.children_preference && a.children_preference === b.children_preference) score += 15
  if (a.relocation_willingness && a.relocation_willingness === b.relocation_willingness) score += 10
  if (a.madhhab && a.madhhab === b.madhhab) score += 10
  if (a.halal_lifestyle && a.halal_lifestyle === b.halal_lifestyle) score += 10
  if (a.education && a.education === b.education) score += 5
  if (a.occupation && a.occupation === b.occupation) score += 5
  return Math.min(score, 100)
}
