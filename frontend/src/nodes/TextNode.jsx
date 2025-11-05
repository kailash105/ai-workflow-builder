import React,{useEffect,useRef,useState} from "react";
import {Handle,Position,useUpdateNodeInternals} from "reactflow";
import NodeShell from "./NodeShell";
const VAR_RE=/\{\{\s*([A-Za-z_$][\w$]*)\s*\}\}/g;

export default function TextNode({id,data}) {
  const [value,setValue]=useState(data?.value??"");
  const [vars,setVars]=useState([]);
  const areaRef=useRef(null);
  const containerRef=useRef(null);
  const updateNodeInternals=useUpdateNodeInternals();

  useEffect(()=>{
    const s=new Set(); let m;
    while((m=VAR_RE.exec(value))!==null)s.add(m[1]);
    setVars([...s]);
  },[value]);

  useEffect(()=>{updateNodeInternals(id);},[id,vars,updateNodeInternals]);

  useEffect(()=>{
    const el=areaRef.current; if(!el)return;
    el.style.height="0px"; el.style.height=el.scrollHeight+"px";
    const minW=240,maxW=420;
    const w=Math.min(maxW,Math.max(minW,Math.ceil((el.value?.length??0)*1.1)));
    if(containerRef.current)containerRef.current.style.width=w+"px";
  },[value]);

  return(
    <div ref={containerRef}>
      <NodeShell title="Text" inputs={[]} outputs={[{id:"out"}]}>
        {vars.map(v=>(
          <Handle key={v} id={`var:${v}`} type="target" position={Position.Left} style={{top:"unset"}}/>
        ))}
        <textarea ref={areaRef} rows={1} className="vs-textarea"
          placeholder="Type text… Use {{variable}} to create handles"
          value={value}
          onChange={e=>{
            setValue(e.target.value);
            data?.onChange?.(id,{value:e.target.value});
          }}/>
        <div className="vs-text-hint">
          Vars detected: {vars.length?vars.join(", "):"none"}
        </div>
      </NodeShell>
    </div>
  );
}
