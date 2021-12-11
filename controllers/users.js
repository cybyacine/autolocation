let User = require('../models/user');

async function allUsers() {
    const users = await User.find({}, null, {sort: {createdAt: -1}});
    console.log(users)
    return users;
}

async function deleteUser(id) {
    User.deleteOne({_id: id},
        (err, user) => {
            if (err)
                return false
            return true;
        }
    );
}

async function search(search) {
    const users = await User.find({
        $or: [
            {email: {$regex: '.*' + search + '.*'}},
            {full_name: {$regex: '.*' + search + '.*'}},
            {phone: {$regex: '.*' + search + '.*'}},
            {address: {$regex: '.*' + search + '.*'}},
            {role: {$regex: '.*' + search + '.*'}},
        ]
    }, null, {sort: {createdAt: -1}});
    console.log(users)
    return users;
}

module.exports = {
    allUsers,
    deleteUser,
    search,
}
