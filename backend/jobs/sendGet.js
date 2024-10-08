import cron from "node-cron";
import https from "https";

const URL = "https://lnworld-clone.onrender.com";

const job = cron.schedule("*/14 * * * *", function () {
  https.get(URL).on("error", e => {
    console.error("Error while sending request", e);
  });
});

export default job;
