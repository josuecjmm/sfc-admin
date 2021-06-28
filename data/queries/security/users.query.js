exports.insert = () => {
    return `INSERT INTO User 
        (personalId, password, fullName )
        VALUES (?, ?, ?)
    `
};

exports.selectList = () => {
    return `Select id, personalId, fullName from User`
};

exports.selectListEmail = () => {
    return `Select id, email, password from User
    WHERE email = ?`
};

exports.selectListPersonalIds = () => {
    return `Select id, personalId, password from User
    WHERE personalId = ?`
};

exports.selectToken = () => {
    return `Select
    id, reset_token, reset_token_expiration 
    from User
    WHERE reset_token = ?
    AND reset_token_expiration > NOW()`
};

exports.selectById = () => {
    return `Select id, personalId, fullName, password from User
    WHERE id = ?`
};

exports.selectByEmail = () => {
    return `Select id,user,email,is_admin From User
    WHERE password = ?
    AND email = ?`
};

exports.update = () => {
    return `UPDATE User 
    SET 
    personalId = ?,
    password = ?,
    fullName = ?
    WHERE id = ?
    `
};

exports.updateResetToken = () => {
    return `UPDATE User
    SET 
    reset_token = ?, 
    reset_token_expiration = ?
    WHERE id = ? 
    ; 
    `
}

exports.updatePassword = () => {
    return `UPDATE User
    SET 
    password = ?
    WHERE reset_token = ? 
    AND id = ?
    ; 
    `
}
