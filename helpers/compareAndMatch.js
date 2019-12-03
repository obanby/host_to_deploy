function compareAndMatch(originalObj, newObject) {
    const keys = Object.keys(newObject);
    keys.map(k => {
        if (newObject[k] !== originalObj[k]) {
            originalObj[k] = newObject[k];
        }
    });
}

module.exports = compareAndMatch;