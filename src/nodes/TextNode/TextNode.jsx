import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';
import "./TextNode.css"

const handleStyle = { left: 10 };

function TextNode({ data, isConnectable }) {

  return (
    <div className="text-updater-node" style={{ background: "#f7f7f5", borderColor: data.isSelected ? 'green': 'white' }}>
      <Handle
        type="target"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <div
        className="wrapperNode"
        style={{ width: "200px", height: "70px", borderRadius: "12px" }}
      >
        <div
          style={{
            padding: "6px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#b7f0a3",
            color: "#18ad60",
            borderRadius: "13px",
          }}
        >
          Send Messages
        </div>
        <div
          style={{
            padding: "15px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#141010",
            fontFamily: 'sans-serif'
          }}
        >
          {data.label}
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextNode;