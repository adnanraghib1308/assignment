export const initialNodes = [
  {
    id: "1",
    type: "input",
    data: { label: "Input Nodesadfasdf" },
    position: { x: 25, y: 2 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Nodesadfasdf</div> },
    position: { x: 10, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 25 },
  },
];

export const initialEdges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3", animated: true },
];
