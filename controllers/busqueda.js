const { response } = require("express")


const getBusqueda = async(req, res = response) =>
{

    const busqueda = req.params.busqueda;


    console.log(busqueda);

        res.status(200).json({
            ok: true,
            msg: 'getBusqueda'
        });       
}



module.exports = {
    getBusqueda
}