const mongoose = require('mongoose');
const { Schema } = mongoose;
const { compareSync, hashSync, genSaltSync } = require('bcryptjs');

const UserSchema = new Schema({
    name: {type: String, required: true},
    username: {tupe: String, required: true},
    password: {type: String, required: true}
})

//sobreescribimos el metodo JSON par que no se nos envie el password en la respuesta, que no sea visible y puedan acceder a el desde el exterior.
UserSchema.methods.toJSON = function(){
    let user = this.toObject();
    delete user.password;
    return user;
}
//creamos un metodo para comparar las contraseñas!
UserSchema.methods.comparePassword = function(pass){
    return compareSync(pass, this.password);
}

//creramos un hook, una pre funcion en el modelo para saber si se esta modiicando la contraseña y si es asi
//la hasheamos
UserSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')) return next();

    const salt = genSaltSync(10);
    const hashedPassword = hashSync(user.password, salt);
    user.password = hashedPassword;
    next();
})



module.exports = mongoose.model('user', UserSchema);