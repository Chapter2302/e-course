import {storage} from '../../../../firebase/firebase'

const validateEmail = (email)  => {
    console.log('email: ', email)
    const regexp = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/
    return regexp.test(email)  
}

const validateDate = (date) => {
    const regexp = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
    return regexp.test(date)
}

const getInputImages = async (e) => {
    let inputImgs = []
    for(let i=0; i<3; i++) {
        let reader = new FileReader()
        if(e.target.files[i] && document.getElementsByClassName("carousel-item")[i]) {
            reader.onload = () => {
                let output = document.getElementsByClassName("carousel-item")[i].getElementsByClassName("d-block w-100")[0]
                output.src = reader.result
            }
            reader.readAsDataURL(e.target.files[i])
            inputImgs.push(e.target.files[i])
        }
    }
    return inputImgs
}

const getDownloadImageURLs = async (imgs, id, folder) => {
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
}

const deleteFirebaseImgs = async (id, folder) => {
    const deleteImgs = []
    for(let i=0; i<3; i++) {
        const storageRef = storage.ref(`/${folder}/${id}_${i}`)
        deleteImgs.push(storageRef)
    }
    await Promise.all(deleteImgs.map(val => { 
        return val.delete() 
    }))
}

export {
    getInputImages, 
    getDownloadImageURLs,
    deleteFirebaseImgs,
    validateDate,
    validateEmail
}