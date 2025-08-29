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
    return cds.tx(async () => {
      // <== Create transaction for whole query execution
      try {
        const record = await SELECT.one.from(RawDataFile)
          .columns`ID, content, filename`.where`content is not null`.orderBy({
          createdAt: 1,
        });

        if (!record) {
          return `Not records found.`;
        }

        const { ID, content, filename } = record;
        const chunks = [];
        for await (const chunk of content) {
          // <== Read through the whole stream inside the transaction
          chunks.push(chunk);
        }
        const bufferContent = Buffer.concat(chunks);
        logger.info(
          `${ID} received ${bufferContent.length} bytes of data in total.`
        );
        // TODO do something on bufferContent
      } catch (error) {
        return "Not OK.";
      }

      return "OK";
    });
  }
};
