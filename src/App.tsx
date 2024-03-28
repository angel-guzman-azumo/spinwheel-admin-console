import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { DateTool } from "./pages/dateTool/dateTool";
import { RootPage } from "./pages/root/root";
import { Box } from "@chakra-ui/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/dateTool",
    element: <DateTool />,
  },
]);

function App() {
  return (
    <Box>
      <RouterProvider router={router} />
    </Box>
  );
}

export default App;
