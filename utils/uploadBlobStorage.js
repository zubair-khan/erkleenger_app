const storageBlob = require("@azure/storage-blob");
const uploadToBlobStorage = (file) => {
    return async function  (req, res, next) {
        console.log("cond=====================================>", req.file);
        if (req.file && req.file.filename) {
        let blobName = req.file.filename;
        let mimeType = req.file.mimetype;
        let containerName = "";
        
        if (process.env.NODE_ENV === "internal" || process.env.NODE_ENV === "staging" || process.env.NODE_ENV === "localhost") {
            containerName = 'test/uploads_staging/uploads';
        } else {
            containerName = 'uploads';
        }
        console.log("containerName====>", containerName)
        //-----------upload blob-----------------//
        const accountname = process.env.BLOB_STORAGE_ACC_NAME;
        const key = process.env.BLOB_STORAGE_ACC_KEY;
        const cerds = new storageBlob.StorageSharedKeyCredential(accountname, key);
        const blobServiceClient = new storageBlob.BlobServiceClient(`https://${accountname}.blob.core.windows.net`, cerds);
        const containerClient = blobServiceClient.getContainerClient(containerName);
        var filePath = '../uploads/' + blobName;
        console.log("filePath============>", filePath)
        const contentType = mimeType;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        // set mimetype as determined from browser with file upload control
        const options = { blobHTTPHeaders: { blobContentType: mimeType } };
        const uploadBlobResponse = await blockBlobClient.uploadFile(filePath, options);
        console.log("uploadBlobResponse=================>", uploadBlobResponse)
        
    }   
    return next();
    }
}
module.exports = {
    uploadToBlobStorage,
}