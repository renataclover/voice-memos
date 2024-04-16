# My Voice Memos

My Voice Memos is a minimalistic web application that enables users to create, manage, and store voice-driven and text memos

## Getting started

Clone the repository:

```bash
git clone git@github.com:renataclover/voice-memos.git
```

Navigate to the project directory and install dependencies:

```bash
cd voice-memos
npm ci
```

Start the application:

```bash
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) to view it in the browser.

## Key Features

- **Voice to Text Conversion**: Enables memo creation through voice (for en-US) using the Web Speech API
- **Keyboard memo creation**: Users can create memos using text input
- **Editable Memos**: Memos can be edited or re-recorded. Text changes to memos are saved automatically when you click outside the memo field. Re-recorded voice memos are saved on click of the "Stop" button.
- **Data Management**: Memos are persistently stored using IndexedDb.
- **User Interface**: Utilizes components from ui.shadcn.com to ensure a user-friendly experience that is both visually appealing and functional.

## Technical Implementation

### Speech Recognition

The Web Speech API is used to convert voice to text. The `SpeechRecognitionService` is a facade that abstracts the Web Speech API's complexity.

The configuration for speech recognition sets the language to en-US and enables continuous recognition without interim results. Continuous recognition allows for real-time transcription of voice input. And the interim results are not needed as the final result is used to create the memo.

The `SpeechRecognitionService` is used by the `useRecordMemo` hook through `ReactContext` to manage the voice memo recording process.
`ReactContext` was chosen here for it's simplicity and dependency injection capabilities.

`useRecordMemo` hook is also responsible for checking if the microphone is available and permission is granted.

### Data Management

`IndexedDb` was selected over LocalStorage due to its ability to handle larger, more structured data sets and automatic key incrementation.
The [idb](https://www.npmjs.com/package/idb) library, a promise-based wrapper for IndexedDb, simplifies working with IndexedDb.

The `MemosStorage`, implementing the Repository Pattern, abstracts storage implementation and is made accessible via `ReactContext` for dependency injection. The `useMemos` hook simplifies interaction with memo data inside React components, concealing its storage and retrieval mechanisms.

### User Interface

The UI is built using components from [shadcn/ui](https://ui.shadcn.com/). The components are styled using `Tailwind CSS`. `Tailwind CSS` was chosen for its utility-first approach to styling. Basic components from `shadcn/ui` are in the `components/ui` directory.

The goal was to spend less time on styling and more time on memos management functionality. That's why the UI is is not feature-rich.
