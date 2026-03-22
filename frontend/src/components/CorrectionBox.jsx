export default function CorrectionBox({ correction }) {

  if (!correction) return null;

  return (
    <div style={{
      background: "#fff3cd",
      padding: "8px",
      marginTop: "5px",
      borderRadius: "5px"
    }}>
      <div>❌ {correction.wrongText}</div>
      <div>✅ {correction.correctedText}</div>
      <small>{correction.explanation}</small>
    </div>
  );
}