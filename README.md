### issue description

CAP Nodejs reading LargeBinary/BLOB from HANA Database in `setInterval` raise an error: `"error while parsing protocol: invalid lob locator id (piecewise lob reading)"`.

> https://cap.cloud.sap/docs/guides/databases#reading-largebinary-blob

### how to reproduce:

1. run `cds watch` locally.
2. open `api.http` and execute `Step#1-Step#4`
3. everything works fine locally.
4. deploy to BTP CF env: `npm i && mbt build && cf deploy mta_archives/*.mtar -f`.
5. change URL and Authorization for `api.http`, repeat `Step#1-Step#4`, `Step#4` will reproduce this issue.

Please refer to [BTP CF log file log-btp-cf-env.txt](./log-btp-cf-env.txt) and search `fae5ac1d-394e-4ac4-aa74-589be41c4ca1`. Line 37 is the error message: `"message":"error while parsing protocol: invalid lob locator id (piecewise lob reading)"`
