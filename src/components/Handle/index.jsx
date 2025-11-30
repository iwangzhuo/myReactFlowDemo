import { Handle } from "@xyflow/react";
import "./styles.css";

export default function CustomHandle({
  type = "source",
  position,
  id,
  style = {},
}) {
  return (
    <Handle
      type={type}
      position={position}
      id={id}
      style={{
        background: "transparent", // 隐藏默认点
        border: "none",
        padding: 0,
        ...style,
      }}
    >
      <div
        className="handle"
        // style={{
        //   width: 14,
        //   height: 14,
        //   borderRadius: '50%',
        //   background: '#fff',
        //   border: '3px solid #0066ff',
        //   boxShadow: '0 0 4px rgba(0,0,0,0.2)',
        //   cursor: 'crosshair',
        // }}
      >
        <div
          className={
            "handle-label " +
            (position == "left" ? "handle-left" : "handle-right")
          }
        >
          <div className="handle-icon">
            <span className="handle-icon-circle"></span>
            <span className="handle-icon-line"></span>
          </div>
          <span>1234</span>
        </div>
      </div>
    </Handle>
  );
}
