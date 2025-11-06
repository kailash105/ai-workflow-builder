import { useEffect, useRef, useState } from "react";
import { Handle, Position, useUpdateNodeInternals } from "reactflow";

const VAR_RE = /\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;

export default function TextNode({ id, data }) {
  const [currText, setCurrText] = useState(data?.text || "");
  const [vars, setVars] = useState([]);
  const areaRef = useRef(null);
  const containerRef = useRef(null);
  const updateNodeInternals = useUpdateNodeInternals();

  useEffect(() => {
    const s = new Set();
    let m;
    while ((m = VAR_RE.exec(currText)) !== null) s.add(m[1]);
    setVars([...s]);
  }, [currText]);

  useEffect(() => {
    updateNodeInternals(id);
  }, [id, vars, updateNodeInternals]);

  useEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = el.scrollHeight + "px";

    const minW = 220, maxW = 420;
    const approx = Math.min(maxW, Math.max(minW, Math.ceil((el.value?.length || 0) * 1.05)));
    if (containerRef.current) containerRef.current.style.width = approx + "px";
  }, [currText]);

  return (
    <div ref={containerRef} style={{ border: "1px solid #e5e7eb", borderRadius: 12, background: "white" }}>
      <div style={{ padding: "8px 10px", background: "#0f172a", color: "white", fontWeight: 600, fontSize: 13 }}>
        Text
      </div>

      {vars.map((v) => (
        <Handle key={v} id={`var:${v}`} type="target" position={Position.Left} />
      ))}

      <div style={{ padding: 12 }}>
        <textarea
          ref={areaRef}
          rows={1}
          style={{ width: "100%", resize: "none", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 10px", fontSize: 13 }}
          placeholder="Type text… Use {{variable}}"
          value={currText}
          onChange={(e) => setCurrText(e.target.value)}
        />
        <div style={{ marginTop: 6, fontSize: 11, color: "#6b7280" }}>
          Vars detected: {vars.length ? vars.join(", ") : "none"}
        </div>
      </div>

      <Handle type="source" position={Position.Right} id={`${id}-output`} />
    </div>
  );
}
