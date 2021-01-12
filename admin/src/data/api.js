const localLogin = async (email, password) => {
    let url = `http://localhost:4000/auth/local?email=${email}&password=${password}`
    let response = await fetch(url, { method : 'GET' })
    return response
}

const localLogout = async () => {
    let url = `http://localhost:4000/auth/logout`
    let response = await fetch(url, { method : 'GET' })
    return response
}

const getAll = async (endpoint) => {
    let url = 'http://localhost:4000/' + endpoint + '/get-all'
    let response = await fetch(url, { method : 'GET' })
    let result = await response.json()
    return result
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

export { localLogin, localLogout, getAll, remove, update, create }