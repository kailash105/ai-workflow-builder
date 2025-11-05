import React from "react";
import { buildNode } from "../factory.jsx";

export const PromptTemplateNode = buildNode({
  title: "Prompt Template",
  inputs: [{ id: "vars" }],
  outputs: [{ id: "prompt" }],
  render: ({ id, data }) => (
    <div>
      <label style={{ fontSize: 12, color: "#6b7280" }}>Template</label>
      <textarea
        className="vs-textarea"
        rows={3}
        placeholder="Hello {{name}}..."
        value={data?.template ?? ""}
        onChange={(e) => data?.onChange?.(id, { template: e.target.value })}
      />
    </div>
  ),
});

export const JsonParseNode = buildNode({
  title: "JSON Parse",
  inputs: [{ id: "json" }],
  outputs: [{ id: "object" }],
  render: () => (
    <div style={{ fontSize: 12, color: "#475569" }}>
      Parses JSON → object
    </div>
  ),
});

export const JoinTextNode = buildNode({
  title: "Join Text",
  inputs: [{ id: "a" }, { id: "b" }],
  outputs: [{ id: "joined" }],
  render: ({ id, data }) => (
    <div>
      <label style={{ fontSize: 12, color: "#6b7280" }}>Separator</label>
      <input
        className="vs-input"
        placeholder=", "
        value={data?.sep ?? ", "}
        onChange={(e) => data?.onChange?.(id, { sep: e.target.value })}
      />
    </div>
  ),
});

export const DelayNode = buildNode({
  title: "Delay",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  render: ({ id, data }) => (
    <div>
      <label style={{ fontSize: 12, color: "#6b7280" }}>Milliseconds</label>
      <input
        className="vs-input"
        type="number"
        min={0}
        value={data?.ms ?? 250}
        onChange={(e) => data?.onChange?.(id, { ms: Number(e.target.value) })}
      />
    </div>
  ),
});

export const RegexExtractNode = buildNode({
  title: "Regex Extract",
  inputs: [{ id: "text" }],
  outputs: [{ id: "matches" }],
  render: ({ id, data }) => (
    <div>
      <label style={{ fontSize: 12, color: "#6b7280" }}>Pattern</label>
      <input
        className="vs-input"
        placeholder="\\d+"
        value={data?.pattern ?? ""}
        onChange={(e) => data?.onChange?.(id, { pattern: e.target.value })}
      />
      <div className="vs-text-hint">Returns all matches.</div>
    </div>
  ),
});
