import { Exercise } from '../../exercise.model';

export class AutoMessageMotor {

    constructor() {}

    welcomeMessage(): string[] {
        return ['Bienvenid@', 'Un placer que estes por aquí', 'Veamos si has podido con lo aprendido jejeje'];
    }

    goodbyeMessage(): string[] {
        return ['Dale a siguiente para continuar con la lección.', '¡Hasta la próxima!'];
    }

    statisticsMessage(exercise: Exercise): string[] {
        const messages: string[] = [];
        messages.push('Se acabó, ya has terminado los ejercicios');
        if (exercise.getCounterFail() === 0) {
            messages.push('Has superado todos los ejercicios sin fallos. ¡Enhorabuena!');
        } else {
            messages.push('Has tenido un total de: ' + exercise.getCounterFail() + ' fallos.');
        }
        return messages;
    }
}
