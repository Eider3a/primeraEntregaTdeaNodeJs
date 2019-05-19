const fs = require('fs');//To work with files.
const argv = require('yargs');//To work with command line.
const p = require('path');//To work with path.
const cursos = require(p.join(__dirname, 'data', 'cursos.js'));//Requiring the cursos file.
const matriculasPath = p.join(__dirname, 'data', 'matriculas.txt');

//https://khaledgarbaya.net/articles/how-to-create-a-node-js-command-line-tool-with-yargs-middleware
//https://github.com/yargs/yargs
//https://coderwall.com/p/_ppzrw/be-careful-with-settimeout-in-loops
//https://github.com/yargs/yargs/issues/225

//Declaracion de las funciones requeridas en el programa.
function showCursos() {
    for (let i = 0; i < cursos.length; i++) {
        setTimeout(function () {
            console.log(`El curso de ${cursos[i].name} con id:${cursos[i].id} tiene una duracion de ${cursos[i].duration} semanas y tiene un precio de ${cursos[i].price} pesos`)
        }, 2000 * (i + 1));

    }
}

function verificarCurso(id, name, cedula) {
    //Se busca el curso por id dentro del arreglo cursos.
    var curso = cursos.find(c => c.id === id);
    if (curso) {//En caso de que se ingrese un id de curso valido.
        const matricula = `El estudiante ${name} con CC:${cedula} ha sido matriculado en el curso ${curso.name} con una duracion de ${curso.duration} semanas y un costo de ${curso.price} pesos.`;

        //Proceso para crear y escribir en el archivo.
        fs.writeFile(matriculasPath, matricula, err => {
            if (!err) {
                console.log('Matricula satisfactoria (Se ha creado el archivo)');
            }
            else {
                console.log('Error al realizar la matricula (No se pudo crear el archivo)');

            }
        });

    }
    else {
        console.log('El ID ingresado no corresponde a ninguno de nuestros cursos');
        showCursos()
    }
}


argv
    .command('$0', 'Default command', () => { }, (argv) => {//Comando por defecto, sin ningun commando.
        showCursos();
    })
    .command('cursos', 'Despliega todos los cursos disponibles', () => {//Comando para listar los cursos.
        showCursos();
    })
    .command('inscribir', 'Inscripcion a un curso', (yargs) => {//Comando para realizar la inscripcion.
        //Inscribir command options
        return yargs
            .option('id', { alias: 'i', require: true })
            .option('name', { alias: 'n', require: true })
            .option('cedula', { alias: 'c', require: true });
    }, ({ id, name, cedula }) => {
        verificarCurso(id, name, cedula);

    })
    .argv;







