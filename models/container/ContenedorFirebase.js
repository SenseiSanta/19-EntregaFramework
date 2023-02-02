import admin from 'firebase-admin'

export class ContenedorFirebase {
    constructor(coleccion) {
        const db = admin.firestore()
        this.coleccion = db.collection(coleccion);
    }

    async getAll () {
        try {
            let response = await this.coleccion.get();
            let data = [];
            response.forEach(doc =>{
                data.push({...doc.data() })
            })
            return data
        }
        catch(error) {
            console.log(error)
        }
    }

    async save(obj) {
        try {
            let doc = this.coleccion.doc();
            await doc.create({...obj,id: doc.id});
            return {status: 'saved', data: obj}
        } catch (error) {
            console.log(error)
            return {error: 'El objeto no se ha guardado'}
        }
    }

    async getById(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                throw new Error('El id solicitado no existe')
            } else {
                const data = doc.data();
                return {...data, id}
            }
        } catch (error) {
            console.log(error)
            return {error: 'Objeto no encontrado'}
        }
    }

    async deleteById(id) {
        try {
            const toDelete = await this.coleccion.doc(id).get()
            const doc = this.coleccion.doc(id);
            if (toDelete.exists) {
                await doc.delete()
                return `Objeto con id ${id} eliminado`
            } else {
                return `El Objeto con id ${id} no existe. Nada se ha eliminado`
            }
        }
        catch (error) {
            console.log(error)
            return false
        }
    }

    async updateById(id, obj) {
        try {
            const toUpdate = await this.coleccion.doc(id).get()
            if (toUpdate.exists) {
                const doc = this.coleccion.doc(id);
                await doc.update(obj)
                return {state: {update: true, newData: obj}}
            } else {
                return {state: {update: false, data: 'El ID es erroneo o inexistente'}}
            }
        }
        catch (error) {
            console.log(error)
            return {state: {update: false, data: error}}; 
        }
    }

    async deleteAll() {
        try {
            const doc = this.coleccion.doc();
            await doc.delete()
            return 'Base de datos reiniciada'
        } catch (error) {
            return 'Ha ocurrido un error al eliminar: No se pudo reiniciar la BD'
        }
    }
}