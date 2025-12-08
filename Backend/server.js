const { createServer } = require("http");
const app = require("./app");
const logger = require("./lib/logger");
const log = logger.child({ label: "server.js" });

const server = createServer(app);
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  log.info(`server is running on port ${PORT}`);
});
