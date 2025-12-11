import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import CustomNode from "./components/CustomNode";
import CustomEdge from "./components/CustomEdge";
import useFlowHistory from "./components/hooks/useHistory";
const nodeTypes = { customNode: CustomNode };
const edgeTypes = {
  custom: CustomEdge,
};

export default function App() {
  const initialEdges = [
    {
      id: "e1-2",
      source: "text2text",
      target: "text2image",
      type: "custom",
    },
  ];
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "text2text",
      type: "customNode",
      position: { x: 200, y: 150 },
      data: {
        theme: "green",
        title: "Text to Text",
        time: "5s",
        icon: "📝",
        model: "GPT-4o Mini",
        placeholder: "Describe the story or idea...",
        inputLabel: "text*",
        outputLabel: "text",
        showAspect: false,
      },
    },
    {
      id: "text2image",
      type: "customNode",
      position: { x: 800, y: 150 },
      data: {
        theme: "blue",
        title: "Text to Image",
        time: "5s–30s",
        icon: "🖼",
        model: "Hailuo Image 01",
        placeholder: "Describe the image style...",
        inputLabel: "text*",
        outputLabel: "image",
        showAspect: true,
      },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { pushHistory, undo, redo } = useFlowHistory(
    nodes,
    edges,
    setNodes,
    setEdges
  );

  const addNewNode = () => {
    const newNode = {
      id: `newnode-${nodes.length + 1}`,
      type: "customNode",
      position: { x: 400, y: 300 },
      data: {
        theme: "green",
        title: "New Node",
        time: "10s",
        icon: "🆕",
        model: "New Model",
        placeholder: "New node placeholder...",
        inputLabel: "input*",
        outputLabel: "output",
        showAspect: false,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    pushHistory([...nodes, newNode], edges);
  };

  const handleNodeChange = useCallback(
    (changes) => {
      onNodesChange(changes);
      console.log(changes);
      // setTimeout(() => pushHistory(nodes, edges), 0);
    },
    [onNodesChange]
  );
  const hanleEdgeChange = useCallback(
    (changes) => {
      onEdgesChange(changes);
      console.log(changes);
      setTimeout(() => pushHistory(nodes, edges), 0);
    },
    [nodes, edges, pushHistory, onEdgesChange]
  );

  const handleNodeDragStop = useCallback(
    (evt, node) => {
      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id ? { ...n, position: node.position } : n
        )
      );

      // 只在拖动结束后加入历史 
      pushHistory(
        nodes.map((n) =>
          n.id === node.id ? { ...n, position: node.position } : n
        ),
        edges
      );
    },
    [nodes, edges, pushHistory, setNodes]
  );

  const handleConnect = useCallback(
    (params) => {
      setEdges((eds) => {
        const newEdges = addEdge({ ...params, type: "custom" }, eds);
        pushHistory(nodes, newEdges);
        return newEdges;
      });
    },
    [nodes, pushHistory, setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}>
        <button onClick={undo}>Undo</button>
        <button onClick={redo} style={{ marginLeft: 10 }}>
          Redo
        </button>
        <button onClick={addNewNode} style={{ marginLeft: 10 }}>
          addNewNode
        </button>
      </div>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onConnect={handleConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={handleNodeChange}
        onEdgesChange={hanleEdgeChange}
        onNodeDragStop={handleNodeDragStop}
      >
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
}
