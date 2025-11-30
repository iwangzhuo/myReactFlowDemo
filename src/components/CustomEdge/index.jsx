import { BaseEdge, getBezierPath } from "@xyflow/react";

export default function CustomEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition,
  style = {},
  markerEnd,
 selected
}) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <g>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          stroke: selected ? '#0066ff' : '#999',
          strokeWidth: selected ? 6 : 4,
          ...style,
        }}
        // markerEnd={markerEnd}
      />
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={20}
      />
    </g>
  );
}
