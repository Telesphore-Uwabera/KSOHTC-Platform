import "dotenv/config";
import { createServer } from "./index";

const port = Number(process.env.PORT || 8085);
const app = createServer();

app.listen(port, () => {
  console.log(`[OK] Backend API running on http://localhost:${port}`);
  console.log(`[API] http://localhost:${port}/api`);
  console.log(`[LOG] API requests and responses will be logged below.\n`);
});

