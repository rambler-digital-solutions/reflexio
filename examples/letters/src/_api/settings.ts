


export const loadSetting = () => {

    const settings = {
        login: 'asapovk@gmail.com'
    }
    return  new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(settings)
        } , 1200)
    })
}