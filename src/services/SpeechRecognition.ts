export default class SpeechRecognitionService {
  private recognition: SpeechRecognition;
  public interimResults: string = '';

  constructor() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;
  }

  startRecognition() {
    if (!this.recognition) {
      throw new Error('Recognition is not initialized');
    }

    this.recognition.start();
  }

  stopRecognition() {
    if (!this.recognition) {
      throw new Error('Recognition is not initialized');
    }

    this.recognition.stop();
  }

  cancelRecognition() {
    this.recognition.abort();
  }

  setRecognitionListener(
    listener: (results: SpeechRecognitionResult[]) => void
  ) {
    if (!this.recognition) {
      throw new Error('Recognition is not initialized');
    }

    this.recognition.onresult = (event) => {
      const speechToText = Array.from(event.results);
      listener(speechToText);
    };
  }
}
