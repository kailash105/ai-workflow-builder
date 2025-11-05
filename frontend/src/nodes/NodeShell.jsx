import React from "react";
import { Handle, Position } from "reactflow";

export default function NodeShell({ title, icon=null, inputs=[], outputs=[], children, footer=null, className="" }) {
  return (
    <div className={`vs-node ${className}`}>
      <div className="vs-node__title">
        {icon && <span>{icon}</span>}
        <span>{title}</span>
      </div>
      {inputs.map((h,i)=>(
        <Handle key={h.id??i} id={h.id??String(i)} type="target" position={Position.Left} style={{top:"unset"}}/>
      ))}
      <div className="vs-node__body">{children}</div>
      {footer && <div style={{borderTop:"1px solid #e5e7eb",padding:10}}>{footer}</div>}
      {outputs.map((h,i)=>(
        <Handle key={h.id??i} id={h.id??String(i)} type="source" position={Position.Right} style={{top:"unset"}}/>
      ))}
    </div>
  );
}
