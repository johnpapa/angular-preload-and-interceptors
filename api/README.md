# Azure Functions API

This project is an Azure Functions app, that responds to GET, POST, PUT, and DELETE endpoints for Mary Poppins movie characters.

Be sure to create the file `api/local.setting.json` and modify its contents as follows:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "CORS": "http://localhost:3000,http://localhost:4200,http://localhost:5000,http://localhost:8080"
  }
}
```

## Resources

- [Azure Free Trial](https://azure.microsoft.com/en-us/free/?wt.mc_id=angular_preload-github-jopapa)
- [VS Code](https://code.visualstudio.com?wt.mc_id=angular_preload-github-jopapa)
- [VS Code Extension for Node on Azure](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack&WT.mc_id=angular_preload-github-jopapa)
- Azure Functions [local.settings.json](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local#local-settings-file?WT.mc_id=angular_preload-github-jopapa) file
