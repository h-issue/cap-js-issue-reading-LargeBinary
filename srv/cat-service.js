module.exports = async function () {
  const logger = cds.log("CatalogService");
  const { RawDataFile } = this.entities;

  this.on("test", async (req) => {
    return await doJob();
  });

  let interval;
  let isJobRunning = false;

  this.on("startInterval", async (req) => {
    logger.info("Interval started.");
    interval = setInterval(async () => {
      if (isJobRunning) {
        logger.info("Previous job is still running, skipping this interval.");
        return;
      }

      isJobRunning = true;
      try {
        const doJobResult = await doJob();
        logger.info(`doJobResult: ${doJobResult}`);
      } catch (error) {
        logger.error(`Read LargeBinary content failed.`, error);
      } finally {
        isJobRunning = false;
      }
    }, 10_000);
  });

  this.on("stopInterval", async (req) => {
    if (interval) {
      clearInterval(interval);
      isJobRunning = false;
      logger.info("Interval stopped.");
    }
  });

  async function doJob() {
    try {
      logger.info(`Start!`);

      const record = await SELECT.one
        .from(RawDataFile)
        .columns((c) => {
          c.ID, c.content, c.filename;
        })
        .where({
          content: { "is not": null },
        })
        .orderBy({ createdAt: 1 });

      if (!record) {
        logger.info(`Not records found.`);
        return `Not records found.`;
      }

      const { ID, content, filename } = record;

      logger.info(`🎯Begin read LargeBinary content!`);

      const chunks = [];
      content.on("data", (chunk) => {
        logger.info(`${ID} on 'data', received ${chunk.length} bytes of data.`);
        chunks.push(chunk);
      });

      const streamPromise = new Promise((resolve, reject) =>
        content.on("end", async () => {
          logger.info(`${ID} on 'end', ${chunks.length} times.`);
          const content = Buffer.concat(chunks);
          resolve(content);
        })
      );

      const bufferContent = await streamPromise;
      logger.info(
        `${ID} received ${bufferContent.length} bytes of data in total.`
      );

      logger.info(`Done!`);
    } catch (error) {
      logger.error(`Read LargeBinary content failed.`, error);
      return "Not OK.";
    }

    return "OK";
  }
};
