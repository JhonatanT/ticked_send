import descompress from 'decompress'
import fs from 'fs'

class SaveService{
    async execute(page:string){
           
        try {
            const files = await descompress(`./Email/.rar/${page}.zip`,`./Email/${page}`)
            fs.unlink(`./Email/.rar/${page}.zip`, () => {console.log("Deletado");})
            return files

        } catch (err) {
            return err
        }

    }
}
export{SaveService}