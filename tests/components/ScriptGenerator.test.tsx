// import { render, screen, fireEvent } from "@testing-library/react";
// import ScriptGenerator from "../../src/components/ScriptGenerator/ScriptGenerator";
// import toolsData from "../../src/data/tools.json";

// describe("ScriptGenerator integration", () => {
//   it("renders header and buttons", () => {
//     render(<ScriptGenerator toolsData={toolsData} />);
//     expect(screen.getByText(/Script Generator/i)).toBeInTheDocument();
//   });

//   it("allows selecting OS and package manager", () => {
//     render(<ScriptGenerator toolsData={toolsData} />);
//     const linuxBtn = screen.getByText(/LINUX/i);
//     fireEvent.click(linuxBtn);
//     expect(linuxBtn).toHaveClass("bg-gradient-to-r"); // active styling
//   });

//   it("allows searching tools", () => {
//     render(<ScriptGenerator toolsData={toolsData} />);
//     const searchBox = screen.getByPlaceholderText(/Search tools/i);
//     fireEvent.change(searchBox, { target: { value: "node" } });
//     expect(screen.getByText(/node/i)).toBeInTheDocument();
//   });

//   it("toggles tool selection and generates script", () => {
//     render(<ScriptGenerator toolsData={toolsData} />);
//     const tool = screen.getByText(/node/i);
//     fireEvent.click(tool);
//     const output = screen.getByRole("textbox");
//     expect(output.value).toContain("node");
//   });

//   it("clears script when tool is unselected", () => {
//     render(<ScriptGenerator toolsData={toolsData} />);
//     const tool = screen.getByText(/node/i);
//     fireEvent.click(tool);
//     fireEvent.click(tool);
//     const output = screen.getByRole("textbox");
//     expect(output.value).toBe("");
//   });
// });
