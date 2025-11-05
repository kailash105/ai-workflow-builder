import React, { useMemo } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";

import { withNodeDataUpdater } from "./flow/useNodeDataUpdater";
import TextNode from "./nodes/TextNode";
import {
  PromptTemplateNode,
  JsonParseNode,
  JoinTextNode,
  DelayNode,
  RegexExtractNode,
} from "./nodes/custom/index.jsx";
import { submitPipeline } from "./submit";

// ✅ Moved outside the component
const nodeTypes = {
  text: TextNode,
  promptTemplate: PromptTemplateNode,
  jsonParse: JsonParseNode,
  joinText: JoinTextNode,
  delay: DelayNode,
  regexExtract: RegexExtractNode,
};

const initialNodes = [
  { id: "1", type: "text", position: { x: 150, y: 100 }, data: { value: "Hello {{name}}" } },
  { id: "2", type: "promptTemplate", position: { x: 520, y: 100 }, data: { template: "Greet {{name}}" } },
  { id: "3", type: "joinText", position: { x: 520, y: 260 }, data: { sep: " - " } },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onChange = useMemo(() => withNodeDataUpdater(setNodes), [setNodes]);
  const nodesWithChange = nodes.map((n) => ({ ...n, data: { ...(n.data ?? {}), onChange } }));
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  const handleSubmit = async () => {
    try {
      await submitPipeline({ nodes: nodesWithChange, edges });
    } catch (e) {
      window.alert(e.message);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <span>VectorShift — Frontend Assessment</span>
        <div style={{ marginLeft: "auto" }}>
          <button className="vs-btn" onClick={handleSubmit}>
            Submit Pipeline
          </button>
        </div>
      </header>

      <main className="app-main">
        <ReactFlow
          nodes={nodesWithChange}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}  // ✅ stable reference
          fitView
        >
          <Background />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </main>
    </div>
  );
}
