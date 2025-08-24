// backend/routes/upload.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../cloudinary');
const fs = require('fs');

const router = express.Router();




router.post('/upload', async (req, res) => {
    try {
        // console.log("========== Cloudinary ==========", req.file)
        const result = await cloudinary.uploader.upload(req.file.path);

        
        // Optionally remove local file
        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            imageUrl: result.secure_url,
            public_id: result.public_id,
            localPath: `/uploads/permanent/${req.file.originalname}`
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Upload failed', error });
    }
});

module.exports = router;


















// const express = require('express');
// const multer = require('multer');
// const cloudinary = require('../cloudinary');
// const fs = require('fs');
// const path = require('path');

// const router = express.Router();

// // Use multer to store the file temporarily in 'uploads/' folder
// const upload = multer({ dest: 'uploads/' });

// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     console.log("File received:", req.file);

//     // 1. Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'posts_images'
//     });

//     // 2. Define permanent local folder
//     const permanentFolder = path.join(__dirname, '..', 'uploads', 'permanent');

//     // 3. Create folder if not exists
//     if (!fs.existsSync(permanentFolder)) {
//       fs.mkdirSync(permanentFolder, { recursive: true });
//     }

//     // 4. Rename file to avoid conflict
//     const fileExt = path.extname(req.file.originalname); // e.g. .jpg
//     const uniqueFileName = Date.now() + fileExt;
//     const permanentFilePath = path.join(permanentFolder, uniqueFileName);

//     // 5. Copy file from temp to permanent folder
//     fs.copyFileSync(req.file.path, permanentFilePath);

//     // 6. Delete temp file created by multer
//     fs.unlinkSync(req.file.path);

//     // 7. Return success response
//     res.json({
//       success: true,
//       cloudinaryUrl: result.secure_url,
//       public_id: result.public_id,
//       localPath: `/uploads/permanent/${uniqueFileName}` // You can serve this with express.static
//     });

//   } catch (error) {
//     console.error("Upload failed:", error);
//     res.status(500).json({ success: false, message: 'Upload failed', error });
//   }
// });

// module.exports = router;
