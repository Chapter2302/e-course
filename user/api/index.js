const localLogin = async (email, password) => {
    let url = "http://localhost:4000/auth/local"
    let response = await fetch(url, { 
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'POST',
        body: JSON.stringify({email: email, password: password})
    })
    return response
}

const localLogout = async () => {
    let url = `http://localhost:4000/auth/logout`
    let response = await fetch(url, { method : 'GET' })
    return response
}

const getAll = async () => {
    const url = 'http://localhost:4000/course/get-all-guess'
    const response = await fetch(url, { method : 'GET' })
    if(response.status == 200) {
        const result = await response.json()
        return result
    }
    return null
}

const getUserHistoryTransaction = async () => {
    const uid = JSON.parse(localStorage.getItem("session")).id
    const response = await fetch(`http://localhost:4000/user/get/history/${uid}`, {method: 'GET'})
    if(response.status == 200) {
        const result = await response.json()
        return result
    }
    return null
}

const create = async (endpoint, data) => {
    let url = 'http://localhost:4000/' + endpoint + '/add'
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'POST',
        body: JSON.stringify(data)
    })
    return response
}

const update = async (endpoint , data) => {
    let url = 'http://localhost:4000/' + endpoint + '/update'
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'PUT',
        body: JSON.stringify(data)
    })
    return response
}

const remove = async (endpoint , id) => {
    let url = 'http://localhost:4000/' + endpoint + '/delete'
    let response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method : 'DELETE',
        body: JSON.stringify({id: id})
    })
    return response
}

export { localLogin, localLogout, getAll, getUserHistoryTransaction, remove, update, create }