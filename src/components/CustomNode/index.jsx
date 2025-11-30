import { Handle, Position } from "@xyflow/react";
import CustomHandle from "../Handle";
import { FiPlay, FiClock } from "react-icons/fi";
import { FaPlayCircle } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import "./styles.css";

export default function CustomNode({ data }) {
  return (
    <div className={`flow-node ${data.theme || "green"}`}>
      <div className="node-header">
        <div className="node-title-left">
          <span className="node-icon">{data.icon}</span>
          <span className="node-title">{data.title}</span>
          <div className="node-timer">
            <FiClock size={14} /> {data.time}
          </div>
        </div>
        <div className="node-run-btn">
          <FaPlayCircle className="node-run-btn-icon" />
        </div>
      </div>
      <div className="node-body">
        <div className="node-section">
          <div className="node-label-row">
            <label>Creative Instruction *</label>
            <button className="small-btn">
              <ImAttachment /> Add PDF
            </button>
          </div>
          <div className="node-textarea-container">
            <textarea
              placeholder={data.placeholder}
              className="node-textarea"
            />
          </div>
        </div>

        {data.showAspect && (
          <div className="node-section">
            <label>Aspect Ratio</label>
            <select className="node-select">
              <option>16:9</option>
              <option>9:16</option>
              <option>1:1</option>
            </select>
          </div>
        )}

        {/* Model Section */}
        <div className="node-section">
          <label>Choose AI Model(s) *</label>
          <div className="model-box">
            <button className="add-model">+ Add models</button>
            <div className="model-tag">{data.model}</div>
            <div className="model-tag">{data.model}</div>
            <div className="model-tag">{data.model}</div>
          </div>
        </div>
      </div>

      {/* <Handle
        type="target"
        position={Position.Left}
        className="node-handle"
      ></Handle>
      <div className="handle-label handle-left">
        <div className="handle-icon">
          <span className="handle-icon-circle"></span>
          <span className="handle-icon-line"></span>
        </div>
        <span>{data.inputLabel}</span>
      </div> */}
      <CustomHandle
        type="target"
        position={Position.Left}
        className="node-handle"
        id="in"
      />
      <CustomHandle
        type="source"
        position={Position.Right}
        className="node-handle"
        id="out"
      />
    </div>
  );
}
