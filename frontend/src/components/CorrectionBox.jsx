export default function CorrectionBox({ correction }) {

  if (!correction) return null;

  return (
    <div className="correction-box">
      <div>❌ {correction.wrongText}</div>
      <div>✅ {correction.correctedText}</div>
      <small>{correction.explanation}</small>
    </div>
  );
}