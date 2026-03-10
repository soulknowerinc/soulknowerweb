"use client";

import { PortableText } from "@portabletext/react";

const components = {
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    h4: ({ children }) => <h4>{children}</h4>,
    blockquote: ({ children }) => (
      <div className="article-quote">
        <p>{children}</p>
      </div>
    ),
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  types: {
    quote: ({ value }) => (
      <div className="article-quote">
        <p>{value?.text}</p>
        {value?.cite && <cite>{value.cite}</cite>}
      </div>
    ),
    callout: ({ value }) => (
      <div className="article-callout">
        {value?.icon && <span className="callout-icon">{value.icon}</span>}
        {value?.title && <h4>{value.title}</h4>}
        {value?.text && <p>{value.text}</p>}
      </div>
    ),
    techniqueCard: ({ value }) => (
      <div className="technique-card">
        {value?.stepNumber && <div className="step-number">{value.stepNumber}</div>}
        {value?.title && <h4>{value.title}</h4>}
        {value?.text && <p>{value.text}</p>}
      </div>
    ),
    techniqueGrid: ({ value }) => (
      <div className="technique-grid">
        {(value?.cards || []).map((card, i) => (
          <div key={i} className="technique-card">
            {card?.stepNumber && <div className="step-number">{card.stepNumber}</div>}
            {card?.title && <h4>{card.title}</h4>}
            {card?.text && <p>{card.text}</p>}
          </div>
        ))}
      </div>
    ),
    divider: () => (
      <div className="article-divider">
        <span>✦ ✦ ✦</span>
      </div>
    ),
  },
};

export default function PortableTextRenderer({ value }) {
  if (!value?.length) return null;
  return (
    <PortableText
      value={value}
      components={components}
    />
  );
}
