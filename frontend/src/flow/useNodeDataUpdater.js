export function withNodeDataUpdater(setNodes) {
    return (id, patch) => {
      setNodes((nodes) =>
        nodes.map((n) =>
          n.id === id ? { ...n, data: { ...(n.data ?? {}), ...patch } } : n
        )
      );
    };
  }
  