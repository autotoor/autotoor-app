import { UnavailabilityError } from 'expo-modules-core';
import * as Speech from 'expo-speech';
export class SpeechService {
  public async speak(text: string, onDone: () => void): Promise<void> {
    Speech.speak(text, { onDone });
  }

  public async resume(text: string, onDone: () => void): Promise<any> {
    try {
      await Speech.resume();
    } catch (e) {
      if (e instanceof UnavailabilityError && text) {
        await Speech.speak(text, { onDone });
      }
    }
  }

  public async pause(): Promise<any> {
    try {
      await Speech.pause();
    } catch (e) {
      if (e instanceof UnavailabilityError) {
        await Speech.stop();
      }
    }
  }

  public async stop(): Promise<any> {
    Speech.stop();
  }
}
