module.exports = class Rutas {
    constructor() {
        this.productos = []
        this.listar = '/listar'
        this.listarId = '/listar/:id'
        this.guardar = '/guardar'
        this.actualizar = '/actualizar/:id'
        this.borrar = '/borrar/:id'
    }

    funcionListar = (req, res) => {
        if (this.productos.length==0) {
            res.json({error:'No hay productos cargados'});
        } else {
            res.json(this.productos);
        }  
    }

    funcionListarId= (req, res) => {
        let id = parseInt(req.params.id);
        const productobuscado = this.productos.find(e => e.id === id)
        if (productobuscado) {
            res.json(productobuscado);
        } else {
            res.json({error:'Producto no encontrado'}); 
        }  
    }

    funcionGuardar = (req, res) => {
        let { id, title, price, thumbnail} = req.body
        id=this.productos.length+1;
        const newProducto = { 
            id: id,
            title: title,
            price: price,
            thumbnail: thumbnail
        }
        res.json({operacion:'Producto grabado', error:''});
        this.productos.push(newProducto)
    }

    funcionActualizar = (req, res) => {
        const id = Number(req.params.id);
        const { title, price, thumbnail} = req.body
        const productobuscado = this.productos.find(e => e.id === id)
        if (id && title && price && thumbnail) {
            if (productobuscado){
                productobuscado.title = title
                productobuscado.price  = price
                productobuscado.thumbnail = thumbnail
                return res.json({
                    'message': 'Producto Actualizado',
                    'producto': productobuscado
                })
            } else {
                return res.json({'message': 'Producto no encontrado'})
            }
        } else {
            res.status(500).json({error: 'Hubo un error'});
        } 
    }

    funcionBorrar = (req, res) => {
        let id = parseInt(req.params.id);
        const productobuscado = this.productos.find(e => e.id === id)
        if (productobuscado) {
            let indice = this.productos.indexOf(productobuscado);
            this.productos.splice(indice, 1);
            return res.json({
                'message': 'Producto Eliminado',
                'producto': productobuscado
            })
        } else {
            return res.json({'message': 'Producto no encontrado'})
        }  
    }
}