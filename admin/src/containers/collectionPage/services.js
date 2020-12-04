import {storage} from "../../firebase"

const compareName = (nameA, nameB, opt) => {
    if(nameA > nameB) return opt*1
    if(nameA < nameB) return opt*(-1)
    if(nameA == nameB) return 0
}

const searchTableItem = (state, filter) => {
    switch(state.collection) {
        case "user":
            return(
                state.listItems.filter(item => 
                    item._id.includes(filter.search) 
                    || item.fullName.includes(filter.search) 
                    || item.authenticateMethod.local.email.includes(filter.search)
                )
            )
        case "course":
            return(
                state.listItems.filter(item => 
                    item._id.includes(filter.search) 
                    || item.name.includes(filter.search) 
                )
            )
        case "trans":
            return(
                state.listItems.filter(item => item._id.includes(filter.search))
            )
        default: break
    }
}

const filterAndSortTableItems = (state, filter) => {
    let tableItems = []
    switch(state.collection) {
        case 'user': {
            tableItems = state.listItems.filter(item => {
                return  String(item.role).includes(filter.userRole)
                        && String(item.sex).includes(filter.userGender)
            })
            switch(state.sort) {
                case "name-A-Z":  {tableItems.sort((a, b) => compareName(a.fullName, b.fullName, 1)); break}    
                case "name-Z-A": tableItems.sort((a, b) => compareName(a.fullName, b.fullName, -1)); break
                case "balance-asc": tableItems.sort((a, b) => a.balance - b.balance); break
                case "balance-des": tableItems.sort((a, b) => b.balance - a.balance); break
                default: break
            }
            return tableItems
        }
        case 'course': {
            tableItems = state.listItems.filter(item => {
                return (
                    (item.schedule.dayInWeek[0].includes(filter.courseDayInWeek) 
                    || item.schedule.dayInWeek[1].includes(filter.courseDayInWeek))
                    && String(item.schedule.shift).includes(filter.courseShift)
                    && String(item.category).includes(filter.courseCategory)
                    && String(item.isActive).includes(filter.courseStatus)
                )
            })
            switch(state.sort) {
                case "name-A-Z": tableItems.sort((a, b) => compareName(a.name, b.name, 1)); break    
                case "name-Z-A": tableItems.sort((a, b) => compareName(a.name, b.name, -1)); break
                case "price-asc": tableItems.sort((a, b) => a.price - b.price); break
                case "price-des": tableItems.sort((a, b) => b.price - a.price); break
                case "rate-asc": tableItems.sort((a, b) => a.rate - b.rate); break
                case "rate-des": tableItems.sort((a, b) => b.rate - a.rate); break
                case "mstudent-asc": tableItems.sort((a, b) => a.maxStudent - b.maxStudent); break
                case "mstudent-des": tableItems.sort((a, b) => b.maxStudent - a.maxStudent); break
                case "quantity-asc": tableItems.sort((a, b) => a.quantity - b.quantity); break
                case "quantity-des": tableItems.sort((a, b) => b.quantity - a.quantity); break
                default: break
            }
            return tableItems
        }
        case 'trans': {
            tableItems = state.listItems.filter(item => {
                return String(item.status).includes(filter.transStatus)
            })
            return tableItems
        }
        default: break
    }
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
    for(let i=0; i< (folder == "user" ? 1 : 3); i++) {
        const storageRef = storage.ref(`/${folder}/${id}_${i}`)
        deleteImgs.push(storageRef)
    }
    await Promise.all(deleteImgs.map(val => { 
        return val.delete() 
    }))
}

export {
    searchTableItem,
    filterAndSortTableItems,
    getInputImages, 
    getDownloadImageURLs,
    deleteFirebaseImgs
}