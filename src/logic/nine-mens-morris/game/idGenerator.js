const alphabet = '23456789abdegjkmnpqrvwxyz';
const idLength = 12;


exports.nextId = (length = idLength) => {
    let id = '';
    for (let i = 0; i < length; i++) {
        id += alphabet.charAt( Math.floor( Math.random() * alphabet.length ) );
    }
    return id;
};
