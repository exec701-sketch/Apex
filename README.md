
# Apex Precision CNC

Run `npm start` from this directory and open http://127.0.0.1:4173. The site has six brochure routes and the RFQ form at `/contact`. No package installation is required.

The local RFQ endpoint writes each validated submission as JSON under `.rfq-inbox/rfq/`. Set `APEX_RFQ_INBOX` to change the destination. The hosted Worker uses the private Sites R2 binding `BUCKET` and stores records under the `rfq/` prefix. The form confirms only a successful write. It does not send email or CRM notifications.

The photos in `assets/` are crops of the supplied mockups. The Windows script `crop-assets.ps1` regenerates them from the original PNG files in the parent directory. Run `npm run build` to generate the deployment bundle.

## Deploy from GitHub

Create a private R2 bucket named `apex-precision-cnc-rfq` in the target Cloudflare account. In Workers & Pages, create a Worker from the GitHub repository and set the project name to `apex-precision-cnc`. Use the production branch `main`, the repository root, `npm run build` as the build command, and `npx wrangler deploy` as the deploy command.

After deployment, open `/contact` on the public Worker URL and confirm a test submission creates a JSON record under `rfq/` in the private bucket.
