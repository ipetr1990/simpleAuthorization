import mongoose from 'mongoose';

const User = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true, },
    roles: [{type: String, ref: 'Role', default: 'USER'}]
});

export default mongoose.model('User', User);