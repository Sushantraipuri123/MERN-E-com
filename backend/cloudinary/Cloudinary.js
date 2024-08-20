const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: 'dnn6bhdmp',
    api_key: '981874316477662',
    api_secret: 'ytZBrW4wo1FW9Dpv_4QH9d3ZEEQ'
});

const uploadFile = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });
        fs.unlinkSync(localFilePath); 
        return result;
    } catch (error) {
        console.error('Upload failed:', error);
        fs.unlinkSync(localFilePath); // Remove local file if upload fails
        return null;
    }
}

module.exports = uploadFile;