import { useState } from "react";

export default function ContextBanner({ mode, info }) {
  const [expanded, setExpanded] = useState(false);

  if (mode === "topic") {
    return (
      <div className="context-banner context-banner--topic">
        <span className="context-banner__icon">📌</span>
        <span className="context-banner__label">Topic:</span>
        <span className="context-banner__value">{info.title}</span>
      </div>
    );
  }

  if (mode === "passage") {
    return (
      <div className={`context-banner context-banner--passage ${expanded ? "context-banner--expanded" : ""}`}>
        <div className="context-banner__header" onClick={() => setExpanded(prev => !prev)}>
          <span className="context-banner__icon">📖</span>
          <span className="context-banner__label">Passage</span>
          <span className="context-banner__toggle">{expanded ? "▲ Hide" : "▼ Show"}</span>
        </div>
        {expanded && (
          <div className="context-banner__passage-text">
            {info.tamilText}
          </div>
        )}
      </div>
    );
  }

  return null;
}