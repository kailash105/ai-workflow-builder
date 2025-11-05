export async function submitPipeline({ nodes, edges }) {
    const payload = {
      nodes: nodes.map(n => ({ id: n.id, type: n.type, data: n.data ?? {} })),
      edges: edges.map(e => ({ id: e.id, source: e.source, target: e.target }))
    };
    const res = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    window.alert(`Pipeline Results:
  - Nodes: ${json.num_nodes}
  - Edges: ${json.num_edges}
  - Is DAG: ${json.is_dag ? "Yes ✅" : "No ❌"}`);
    return json;
  }
  