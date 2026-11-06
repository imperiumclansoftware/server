class UserDto {
    static create(incomingData) {
        return {
            email: incomingData.email,
            password: incomingData.password
        }
    }
}

module.exports = UserDto
