import React from "react";
import { NodeShell } from "./NodeShell";

export function buildNode({ title, inputs = [], outputs = [], render }) {
  return function GenericNode(props) {
    return (
      <NodeShell title={title} inputs={inputs} outputs={outputs}>
        {render(props)}
      </NodeShell>
    );
  };
}
