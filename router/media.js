const express = require('express');
const router = express.Router();
const storage = require('../utils/multer');
const controller = require('../app/controller')
const multer = require('multer')();

router.use('/images', express.static('public/images'));
router.use('/files', express.static('public/files'));
router.use('/videos', express.static('public/videos'));

router.post('/v1/upload/image', 
        storage.image.single('image'),
        controller.media.uploadImage)
router.post('/v1/upload/video', 
        storage.video.single('video'),
        controller.media.uploadVideo)
router.post('/v1/upload/documents', 
        storage.document.single('doc'),
        controller.media.uploadDocument)

//Qr-code
router.post('/v1/qrcode', controller.media.qrcode)

//imagekit
router.post('/v1/upload/imagekit',
        multer.single('image'),
        controller.media.imagekitUpload
)

module.exports = router;