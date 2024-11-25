import React, { useState, useEffect } from "react";

const TypingTest = () => {
  const [codeText, setCodeText] = useState("");
  const [typedText, setTypedText] = useState("");
  const [isTestRunning, setIsTestRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [results, setResults] = useState({ speed: null, accuracy: null });

  useEffect(() => {
    let timer;
    if (isTestRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      endTest();
    }
    return () => clearInterval(timer);
  }, [isTestRunning, timeLeft]);

  const startTest = () => {
    if (!codeText.trim()) {
      alert("Please paste some code to start the test.");
      return;
    }
    setIsTestRunning(true);
    setResults({ speed: null, accuracy: null });
    setTypedText("");
    setTimeLeft(60);
  };

  const endTest = () => {
    setIsTestRunning(false);

    const originalWords = codeText.trim().split(/\s+/);
    const typedWords = typedText.trim().split(/\s+/);
    const correctWords = originalWords.reduce(
      (count, word, idx) => (word === typedWords[idx] ? count + 1 : count),
      0
    );

    const accuracy = ((correctWords / originalWords.length) * 100).toFixed(2);
    const wordsTyped = typedText.trim().split(/\s+/).length;
    const speed = Math.round((wordsTyped / (60 - timeLeft)) * 60);

    setResults({ speed, accuracy });
  };

  return (
    <div style={styles.container}>
      <h1>Typing Speed and Accuracy Test</h1>
      {!isTestRunning && (
        <>
          <p>Paste your code snippet below:</p>
          <textarea
            style={styles.textarea}
            value={codeText}
            onChange={(e) => setCodeText(e.target.value)}
            placeholder="Paste your code here..."
          />
          <button style={styles.button} onClick={startTest}>
            Start Typing Test
          </button>
        </>
      )}

      {isTestRunning && (
        <>
          <div style={styles.timer}>
            Time Remaining: {Math.floor(timeLeft / 60)}:
            {timeLeft % 60 < 10 ? "0" : ""}
            {timeLeft % 60}
          </div>
          <div style={styles.codeDisplay}>{codeText}</div>
          <textarea
            style={styles.textarea}
            value={typedText}
            onChange={(e) => setTypedText(e.target.value)}
            placeholder="Start typing here..."
          />
          <button style={styles.button} onClick={endTest}>
            Finish Test
          </button>
        </>
      )}

      {results.speed !== null && (
        <div style={styles.results}>
          <div style={styles.result}>Typing Speed: {results.speed} WPM</div>
          <div style={styles.result}>Accuracy: {results.accuracy}%</div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    fontFamily: "Arial, sans-serif",
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginBottom: "10px",
    fontSize: "16px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  codeDisplay: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    padding: "10px",
    marginBottom: "10px",
    background: "#f0f0f0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontFamily: "monospace",
    fontSize: "16px",
  },
  timer: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#007bff",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  results: {
    marginTop: "20px",
  },
  result: {
    margin: "10px 0",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default TypingTest;
