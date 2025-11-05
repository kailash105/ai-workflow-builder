import React from "react";
import NodeShell from "./NodeShell";

export function buildNode(config) {
  const {title, icon, inputs=[], outputs=[], render=()=>null, footer=null, className=""} = config;
  return function GenericNode(props) {
    return (
      <NodeShell title={title} icon={icon} inputs={inputs} outputs={outputs}
        footer={footer ? footer(props):null} className={className}>
        {render(props)}
      </NodeShell>
    );
  };
}
