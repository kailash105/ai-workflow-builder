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

const nodeTypes = {
  text: TextNode,
  promptTemplate: PromptTemplateNode,
  jsonParse: JsonParseNode,
  joinText: JoinTextNode,
  delay: DelayNode,
  regexExtract: RegexExtractNode,
};

const initialNodes = [
  {
    id: "1",
    type: "text",
    position: { x: 150, y: 120 },
    data: { text: "Hello {{name}}" },
  },
  {
    id: "2",
    type: "promptTemplate",
    position: { x: 520, y: 120 },
    data: { template: "Greet {{name}}" },
  },
  {
    id: "3",
    type: "joinText",
    position: { x: 520, y: 280 },
    data: { sep: "-" },
  },
];

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onChange = useMemo(() => withNodeDataUpdater(setNodes), [setNodes]);
  const nodesWithChange = nodes.map((n) => ({
    ...n,
    data: { ...(n.data ?? {}), onChange },
  }));

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
      <header className="app-header glassy">
        <div className="brand">
          <img
            src="/vite.svg"
            alt="logo"
            className="logo"
          />
          <span>VectorShift — Frontend Assessment</span>
        </div>
        <button className="vs-btn" onClick={handleSubmit}>
          Submit Pipeline
        </button>
      </header>

      <main className="app-main">
        <ReactFlow
          nodes={nodesWithChange}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background
            variant="dots"
            gap={18}
            size={1.2}
            color="#d1d5db"
          />
          <MiniMap
            nodeColor={() => "#2563eb"}
            maskColor="rgba(37,99,235,0.1)"
          />
          <Controls />
        </ReactFlow>
      </main>
    </div>
  );
}
