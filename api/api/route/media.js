const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const mediaPath = './media-resource'

const { 
    createMedia, 
    getAllMedia, 
    getMedia, 
    updateMedia, 
    deleteMedia
} = require('../../controller/media')

function getExtension(filename) {
    const parts = filename.split(".");
    return parts[parts.length - 1];
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, mediaPath);
    },
    filename: async (req, file, cb) => {
        const today = new Date()   
        const newMedia = await createMedia({
            created_date: today.toISOString().slice(0, 10),
            name: "", url: "", type: ""
        })
        const extension = getExtension(file.originalname)
        const fileName = `${newMedia[0].id}.${extension}` 
        cb(null, fileName)
    }
});
  
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => { 
        cb(null, true)
    }
});

router.post('/', upload.single('files'), async (req,res) => {
    try {
        const updatedMedia = await updateMedia({
            _id: req.file.filename.slice(0, 24),
            url: `http://localhost:4000/media-resource/${req.file.filename}`,
            name: req.file.filename,
            type: req.body.type
        })
        res.status(200).json(updatedMedia)
    }
    catch {
        res.status(404)
    }
})

router.get('/get-all', async (req,res) => {
    try {
        const data = await getAllMedia()
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const data = await getMedia()
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

router.get('/file', async (req,res) => {
    try {
        res.status(200).sendFile(`${mediaPath}/60824dc7e1001857c44a84a9.jpg`)
    } catch {
        res.status(404)
    }
})

router.put('/', async (req,res) => {
    try {
        const data = await updateMedia(req.body)
        res.status(200).json(data)
    }
    catch {
        res.status(404)
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const data = await deleteMedia(req.params.id)
        fs.readdir(mediaPath, (err, files) => {
            if(err) {
                console.error(err)
                res.status(404)
            }
            files.forEach(file => {
                if(file.includes(String(req.params.id))) {
                    try {
                        fs.unlinkSync(`${mediaPath}/${file}`)
                        res.status(200).json(data)
                    } catch(err) {
                        console.error(err)
                        res.status(404)
                    }
                }
            })
        })
    }
    catch {
        res.status(404)
    }
})

module.exports = router;