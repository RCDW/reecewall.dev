// Typed token access for TS consumers (e.g. Canvas/SVG that can't read CSS vars).
export const tokens = {
  ink: "#201d19", muted: "#76726b", soft: "#9a958c",
  accent: "#0e5b54", accentDeep: "#0a4640", forecast: "#4a4ab7",
  paper: "#fdfcf9", card: "#f4f1ea", hair: "#e6e1d6",
  pillBg: "#ecf3f1", pillInk: "#0f534c", warn: "#993c1d",
} as const;
export type Tokens = typeof tokens;
