import React from "react";
import { Handle, Position } from "reactflow";

export const NodeShell = ({ title, inputs = [], outputs = [], children }) => {
  return (
    <div className="node-card">
      <div className="node-header">{title}</div>
      <div className="node-body">{children}</div>
      {inputs.map((inp, i) => (
        <Handle key={i} type="target" position={Position.Left} id={inp.id} />
      ))}
      {outputs.map((out, i) => (
        <Handle key={i} type="source" position={Position.Right} id={out.id} />
      ))}
    </div>
  );
};
