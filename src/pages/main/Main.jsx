import { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  SelectionMode,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import "./Main.css"
import TextNode from "../../nodes/TextNode/TextNode";

// import initialNodes from "./nodes.js";
// import initialEdges from "./edges.js";

const panOnDrag = [1, 2];

export const initialNodes = [];

export const initialEdges = [];

const nodeTypes = { textNode: TextNode };

const Main = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [textValue, setTextValue] = useState("");

  const onConnect = (connection) => {
      return setEdges((eds) => addEdge(connection, eds));
    }

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = event.target.getBoundingClientRect();
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: new Date().getTime().toString(),
      type: 'textNode',
      position,
      data: { label: `Test Message ${nodes.length + 1}` },
      handle: 'left'
    };

    setNodes([
      ...nodes,
      newNode
    ]);
  }

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onElementClick = (event, element) => {
    setTextValue(element.data.label)
    setNodes((prev) => {
      return prev.map((obj) => ({
        ...obj,
        data: {
          ...obj.data,
          isSelected: obj.id === element.id ? !obj.data.isSelected : false,
        },
      }));
    })
  }

  const isAnyNodeSelected = () => {
    return !!nodes.filter((obj) => obj.data.isSelected).length;
  }

  const onTextChange = (e) => {
    const val = e.target.value;
    setTextValue(val);
    setNodes((prev) => {
      return prev.map((obj) => ({
        ...obj,
        data: {
          ...obj.data,
          label: obj.data.isSelected ? val : obj.data.label
        }
      }))
    })
  }

  const isValidConnectrion = (connection) => {
    return !!!edges.filter((con) => con.source === connection.source).length
  }

  const isError = () => {
    if(nodes.length <= 1) return false;
    
    const unconnectedNodes = nodes.filter((node) => {
      const isConnected = edges.some((edge) => edge.target === node.id);
      return !isConnected;
    });
    
    return unconnectedNodes.length > 1
  }

  const saveChanges = () => {
    if(isError()) alert("Cannot Save Changes")
    else alert("Changes Saved Successfully")
  }

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div style={{ height: "10vh", width: "100vw", background: "grey", display: 'flex', justifyContent: 'flex-end' }}>
        <button style={{ margin: '10px', padding: '7px', alignSelf: 'flex-end'}} onClick={saveChanges}>Save Changes</button>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ width: "75vw", height: "90vh" }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            panOnScroll
            selectionOnDrag
            panOnDrag={panOnDrag}
            onDrop={onDrop}
            onNodeClick={onElementClick}
            isValidConnection={isValidConnectrion}
            onDragOver={onDragOver}
            selectionMode={SelectionMode.Partial}
            nodeTypes={nodeTypes}
          >
            <Background color="#ccc" variant={"cross"} />
            <Controls />
          </ReactFlow>
        </div>
        <div style={{ width: '20%'}}>
          {!isAnyNodeSelected() && <div
            className="node"
            onDragStart={(event) => onDragStart(event, "default")}
            draggable
          >
            Send Message
          </div>}
          {isAnyNodeSelected() && <div style={{ padding: '10px'}}>
            <p>TEXT</p>
            <textarea value={textValue} style={{ width: '100%'}} rows={5} onChange={onTextChange} />
            <button onClick={() => {
              setNodes((prev) => prev.map((obj) => ({...obj, data: {...obj.data, isSelected: false}})))
            }}>BACK</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Main;
