const { validUsers, platos, pagos, nuevosPedidos, confPedidos, estados } = require('./arrays');
const moment = require('moment');
///--Middleware del Admin--///
function adminLog(req, res, next) {
    const { mail, pass } = req.body;
    for (let usuario of validUsers) {
        if (usuario.admin === true) {

            if (mail === usuario.email && pass === usuario.password) {

                res.send('Bienvenido Admin ')
                next();
                return
            }
        }
    } res.send('No es admin')
};
//middleware para validar Admin//
function adminValidate(req, res, next) {
    const pos = Number(req.headers.pos);

    if (validUsers[pos] !== null && validUsers[pos] !== undefined) {

        if (validUsers[pos].admin === true) {
            
            next();
            return;
        }
    } res.status(403).send('No es admin');
};
///--Middleware para crear un usuario nuevo--///
function crearUsuario(req, res) {
    const { usuario, nombre, apellido, email, telefono, direccion, password, repPasswrd } = req.body;
    if (usuario && nombre && apellido && email && telefono && direccion && password && repPasswrd) {
        let existe = false;
        for (let usuario of validUsers) {
            if (usuario.email === email) {
                existe = true;
            }
        }
        if (existe === false) {
            if (password === repPasswrd) {
                const id = validUsers.length + 1;
                const admin = false;
                const newUser = { ...req.body, id, admin }
                //console.log(newUser);

                validUsers.push(newUser);

                res.status(200).send(validUsers);
            }
            else {
                res.status(405).send("El password no coincide.");
            }
        }
        else {
            res.status(406).send("El mail ya esta registrado.");
        }
    } else {
        res.status(406).send("Por favor complete todos los campos");
    }
};
///--Funcion para ver usuarios--///
function verUsers(req, res) {

    res.send(validUsers);
};
///--Funcion para ingresar--///
function loginValidation(req, res) {
    const { mail, pass } = req.body;
    let pos = 0
    for (let usuario of validUsers) {
        if (mail === usuario.email && pass === usuario.password) {
            console.log(usuario)

            res.status(200).json({ pos, message: 'ingreso exitoso' })
            return
        }
        pos = pos + 1
    } res.status(406).send('mal')
};
function validateUser(req, res, next) {
    const pos = Number(req.headers.pos);
    if (validUsers[pos] !== null && validUsers[pos] !== undefined) {
        next();
        return;
    }
    res.status(403).send('usuario o contrasena incorrecto');

}

function login(req, res, next) {
    const { mail, pass } = req.body;
    for (let usuario of validUsers) {
        if (mail === usuario.email && pass === usuario.password) {
            console.log(usuario)

            next();
            return;
        }
    } res.status(406).send('usuario o contrasena incorrecta')
};
///// Middleware para buscar un plato especifico ////// 
function midBuscarId(req, res, next) {
    const idPlato = Number(req.params.idPlato);
    for (const plato of platos) {
        if (idPlato === plato.id) {
            return next();
        }
    }
    res.status(404).send('plato no encontrado');
};
///Mostrar Menu////
function showPlatos(req, res) {
    res.json(platos);
};
///agregar platos
function crearplato(req, res) {
    const id = platos.length + 1;
    function Plato(id, descripcion, precio) {
        this.id = id
        this.descripcion = descripcion;
        this.precio = precio;
    };
    const { descripcion, precio } = req.body;

    platos.push(new Plato(id, descripcion, precio));
    res.status(200).json({ platos, message: 'se agrego el plato' });
};
///ver un plato
function showPlato(req, res) {
    const idPlato = Number(req.params.idPlato);
    if (req.params.idPlato !== null && req.params.idPlato !== undefined) {

        for (const plato of platos) {
            if (idPlato === plato.id) {
                res.send(plato)
            };
        } res.status(401).send('No existe ese plato');
    }
};
//eliminar un plato
function eliminar(req, res) {
    const idPlato = Number(req.params.idPlato);
    for (const plato of platos)
        if (plato.id === idPlato) {
            const pos = platos.indexOf(plato)
            platos.splice(pos, 1);
            res.send('plato eliminado');
        }
};

///modificar un plato
function modificar(req, res) {
    const idPlato = Number(req.params.idPlato);
    for (const plato of platos)
        if (plato.id === idPlato) {
            const pos = platos.indexOf(plato);
            platos[pos].descripcion = req.body.descripcion;
            platos[pos].precio = req.body.precio;

            res.send('plato modificado');
        }
};
///ver pedidos
function pedidos(req, res) {
    res.json({ confPedidos, nuevosPedidos });
};
//realizar nuevo pedido
function hacerNuevoPedido(req, res) {
    const fecha = moment().format('DD MM YYYY hh:mm');
    const idPlato = Number(req.params.idPlato);
    const cantidad = Number(req.body.cantidad);

    for (const plato of platos) {
        if (idPlato === plato.id) {

            const subtotal = plato.precio * cantidad;
            const id = nuevosPedidos.length + 1;
            const estado = "Pendiente";
            const newPedido = { ...req.body, id, plato, fecha, estado, subtotal };
            nuevosPedidos.push(newPedido);
            return res.json(nuevosPedidos);
        }
    } res.status(406).send('El producto no es valido');
};
//confirmar pedido
function hacerPedido(req, res) {
    const fecha = moment().format('DD MM YYYY hh:mm');
    const { direccion } = req.body;
    const idPago = Number(req.params.idPago);
    var total = 0;
    for (nuevoP of nuevosPedidos) {
        total = (total + nuevoP.subtotal);
    };

    for (const pago of pagos) {
        if (idPago === pago.id) {

            const id = confPedidos.length + 1;
            const estado = estados[1];
            confPedidos.push(new Confirmados(id, fecha, estado, pago, total, direccion, nuevosPedidos));
            res.send(confPedidos);
            
        }
    } { res.status(406).send('debe seleccionar pago') }
};

/////ver el historial/////
function historial(req, res) {
    res.send(confPedidos);
};

function Confirmados(id, fecha, estado, pago, total, direccion, nuevosPedidos) {
    this.id = id;
    this.fecha = fecha;
    this.estado = estado;
    this.pago = pago;
    this.total = total;
    this.direccion = direccion;
    this.nuevosPedidos = nuevosPedidos;
};
//ver pagos disponibles
function payment(req, res) {
    res.send(pagos);
};
///modificar estado de pedidos
function modifEstado(req, res) {
    const idPedido = Number(req.params.idPedido)
    for (const pedido of confPedidos) {
        if (idPedido === pedido.id) {

            const position = confPedidos.indexOf(pedido);
            confPedidos[position].estado = req.body.estado;
            res.status(200).send('Se modifico el estado con exito');

        }
    } res.status(406).send('Pedido no existe');
};


module.exports = {
    adminLog,
    crearUsuario,
    verUsers,
    loginValidation,
    login,
    showPlatos,
    midBuscarId,
    crearplato,
    showPlato,
    eliminar,
    modificar,
    pedidos,
    hacerNuevoPedido,
    hacerPedido,
    historial,
    payment,
    modifEstado,
    validateUser,
    adminValidate

};