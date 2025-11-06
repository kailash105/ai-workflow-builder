export function withNodeDataUpdater(setNodes) {
  return (id, patch) =>
    setNodes((nds) =>
      nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...patch } } : n))
    );
}
