import { useRef } from "react";

export default function useFlowHistory(nodes, edges, setNodes, setEdges) {
  const history = useRef([{ nodes, edges }]);
  const pointer = useRef(0);

  const pushHistory = (newNodes, newEdges) => {
    history.current = history.current.slice(0, pointer.current + 1);
    history.current.push({ nodes: newNodes, edges: newEdges });
    pointer.current++;
  };

  const undo = () => {
    if (pointer.current === 0) return;

    pointer.current--;
    const state = history.current[pointer.current];
    setNodes(state.nodes);
    setEdges(state.edges);
  };

  const redo = () => {
    if (pointer.current === history.current.length - 1) return;

    pointer.current++;
    const state = history.current[pointer.current];
    setNodes(state.nodes);
    setEdges(state.edges);
  };

  return {
    pushHistory,
    undo,
    redo,
  };
}
