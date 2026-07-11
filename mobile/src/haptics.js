import { Platform } from 'react-native'
import * as Haptics from 'expo-haptics'

// Équivalent de vibrate() web — no-op silencieux sur web/appareils sans moteur.
export function vibrate(strong = false) {
  if (Platform.OS === 'web') return
  Haptics.impactAsync(
    strong ? Haptics.ImpactFeedbackStyle.Heavy : Haptics.ImpactFeedbackStyle.Light
  ).catch(() => {})
}
