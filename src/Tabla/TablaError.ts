import { Error } from "./Error";

export class TablaError {
    static arregloErrores: Error[] = [];

    static vaciarArreglo(): void {
        this.arregloErrores = [];
    }

    static insertarError(err: Error): void {
        this.arregloErrores.push(err);
    }

    static mostrarTabla(): void {
        for (let index = 0; index < this.arregloErrores.length; index++) {
            console.log(this.arregloErrores[index])
        }
    }

    static graficarTabla(): string {
        let cadena: string;
        for (let index = 0; index < this.arregloErrores.length; index++) {
            cadena += `<tr><td>${this.arregloErrores[index].tipo}</td><td>${this.arregloErrores[index].descripcion}</td><td>${this.arregloErrores[index].linea}</td><td>${this.arregloErrores[index].columna}</td></tr>\n`;
        }
        return cadena;
    }
}