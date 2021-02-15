const getDownloadImageURLs = async (imgs, id, folder) => {
    try {
        const uploadedImages = await Promise.all(imgs.map(async (val, i) => {
            const image = val
            const storageRef = storage.ref(`/${folder}/${id}_${i}`)
            const uploadTask = storageRef.put(image)
            const url = await new Promise((resolve, reject) => {
            uploadTask.on('state_changed', 
                snapShot => {
                    console.log(snapShot)
                }, 
                error => reject(error),
                async () => {
                    const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
                    resolve(downloadUrl);
                })
            })
            return url
        }))
        return uploadedImages
    } catch { return }
}

const deleteFirebaseImgs = async (id, folder) => {
    const deleteImgs = []
    try { 
        for(let i=0; i< (folder == "user" ? 1 : 3); i++) {
            const storageRef = storage.ref(`/${folder}/${id}_${i}`)
            deleteImgs.push(storageRef)
        }
        await Promise.all(deleteImgs.map(val => { 
            return val.delete() 
        }))
    }
    catch {
        return
    }
}

export {
    getDownloadImageURLs,
    deleteFirebaseImgs
}