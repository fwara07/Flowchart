import React from "react";

export default function CustomEdge({
  source,
  target,
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  animated,
  style = {},
  data,
}) {
  const edgePath = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 4,
  });
  return (
    <>
      <defs>
        {data.hasArrow && (
          <marker
            className="react-flow__arrowhead"
            id={`marker-${id}`}
            markerWidth="20"
            markerHeight="20"
            viewBox="-10 -10 20 20"
            orient="auto"
            refX="0"
            refY="0"
          >
            <polyline
              // stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              // fill={color}
              points="-5,-4 0,0 -5,4 -5,-4"
            />
          </marker>
        )}
      </defs>
      <path
        id={id}
        d={edgePath}
        style={style}
        markerEnd={`url(#marker-${id})`}
      />
    </>
  );
}
