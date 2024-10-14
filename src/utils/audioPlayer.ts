class AudioPlayer {
     private static instance: AudioPlayer | null = null;
     private audio: HTMLAudioElement | null = null;

     private constructor() {
          if (typeof window !== 'undefined') {
               this.audio = new Audio();
          }
     }

     public static getInstance(): AudioPlayer {
          if (!AudioPlayer.instance) {
               AudioPlayer.instance = new AudioPlayer();
          }
          return AudioPlayer.instance;
     }

     public getAudioElement(): HTMLAudioElement | null {
          return this.audio;
     }
}

export default AudioPlayer.getInstance();