import React from "react";
import { getSmoothStepPath, getBezierPath } from "react-flow-renderer";

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
  const edgePath =
    data.type === "smoothstep"
      ? getSmoothStepPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
        })
      : getBezierPath({
          sourceX,
          sourceY,
          sourcePosition,
          targetX,
          targetY,
          targetPosition,
        });
  return (
    <>
      {data.hasArrow && (
        <defs>
          <marker
            className="react-flow__arrowhead"
            id={`marker-start-${id}`}
            markerWidth="25"
            markerHeight="30"
            viewBox="10 10 -20 -20"
            orient="auto"
            refX={edgePath.x1}
            refY="0"
          >
            <polyline
              stroke="#BBBBC0"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              fill="#BBBBC0"
              points="-5,-4 0,0 -5,4 -5,-4"
            />
          </marker>
          <marker
            className="react-flow__arrowhead"
            id={`marker-${id}`}
            markerWidth="25"
            markerHeight="30"
            viewBox="-10 -10 20 20"
            orient="auto"
            refX="0"
            refY="0"
          >
            <polyline
              stroke="#BBBBC0"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              fill="#BBBBC0"
              points="-5,-4 0,0 -5,4 -5,-4"
            />
          </marker>
        </defs>
      )}
      <path
        id={id}
        d={edgePath}
        className="react-flow__edge-path"
        style={style}
        markerEnd={`url(#marker-${id})`}
        markerStart={`url(#marker-start-${id})`}
      />
    </>
  );
}
