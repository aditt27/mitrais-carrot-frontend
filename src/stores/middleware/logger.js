const logger = store => next => action => {
    console.log('redux-mw-action', action)
    next(action)
}

export default logger