import { Unit} from '../teacher/graph-unit/models/unit.model';
import { UnitDto} from '../teacher/shared/unit.dto';
import { Itinerary} from '../teacher/info-unit/models/itinerary.model';
import { ItineraryDto} from './dtos/itinerary.dto';
import { FormationDto} from './dtos/formation.dto';
import { Formation} from '../teacher/info-unit/models/formation.model';
import { Session} from '../teacher/info-unit/models/session.model';
import { SessionDto} from './dtos/session.dto';
import { Lesson} from '../teacher/info-unit/models/lesson.model';
import { LessonDto} from './dtos/lesson.dto';
import { Exercise} from '../teacher/shared/exercise.model';
import { ExerciseDto} from './dtos/exercise.dto';
import { Video} from '../teacher/info-unit/models/video.model';
import { VideoDto} from './dtos/video.dto';
import { Interaction} from '../teacher/info-unit/models/interaction.model';
import { InteractionDto} from './dtos/interaction.dto';
import { Solution} from '../teacher/shared/solution.model';
import { SolutionDto} from './dtos/solution.dto';
import { JustificationDto} from './dtos/justification.dto';
import { Justification} from '../teacher/shared/justification.model';
import { ItineraryMiddle } from './dtos/itinerary-middle.dto';


export class DtoConverter {

  constructor() {

  }

  convertUnit(unitDto: UnitDto): Unit {
    const unit: Unit = new Unit(unitDto.name, unitDto.code, unitDto.content);
    if (unitDto.itineraries) {
      for (let i = 0; i < unitDto.itineraries.length; i++) {
        unit.addItinerary(this.convertMiddlewareItinerary(unitDto.itineraries[i]));
      }
    }
    return unit;
  }

  convertMiddlewareItinerary(itineraryMiddleDto: ItineraryMiddle): Itinerary {
    return this.convertItinerary(itineraryMiddleDto.itinerary);
  }

  convertItinerary(itineraryDto: ItineraryDto): Itinerary {
    const itinerary: Itinerary = new Itinerary(itineraryDto.name);
    itinerary.setId(itineraryDto.id);
    if (itineraryDto.formations) {
      for (let i = 0; i < itineraryDto.formations.length; i++) {
        itinerary.addFormation(this.convertFormation(itineraryDto.formations[i]));
      }
    }
    return itinerary;
  }

  convertFormation(formationDto: FormationDto): Formation {
    if (formationDto.session) {
      return this.convertSession(formationDto.session);
    } else {
      return this.convertItinerary(formationDto.itinerary);
    }
  }

  convertSession(sessionDto: SessionDto): Session {
    const session: Session = new Session(sessionDto.name);
    session.setId(sessionDto.id);
    if (sessionDto.lessons) {
      for (let i = 0; i < sessionDto.lessons.length; i++) {
        session.addLesson(this.convertLesson(sessionDto.lessons[i]));
      }
    }
    return session;
  }

  convertLesson(lessonDto: LessonDto): Lesson {
    const lesson: Lesson = new Lesson(lessonDto.name);
    lesson.setId(lessonDto.id);
    if (lessonDto.interactions) {
      for (let i = 0; i < lessonDto.interactions.length; i++) {
        lesson.addInteractions(this.convertInteraction(lessonDto.interactions[i]));
      }
    }
    return lesson;
  }

  convertExercise(exerciseDto: ExerciseDto): Exercise {
    const exercise: Exercise = new Exercise(exerciseDto.formulation);
    exercise.setId(exerciseDto.id);
    if (exerciseDto.solutions) {
      for (let i = 0; i < exerciseDto.solutions.length; i++) {
        exercise.addSolution(this.convertSolution(exerciseDto.solutions[i]));
      }
    }
    return exercise;
  }

  convertInteraction(interactionDto: InteractionDto): Interaction {
    if (interactionDto.exerciseDto) {
      return this.convertExercise(interactionDto.exerciseDto);
    } else {
      return this.convertVideo(interactionDto.videoDto);
    }
  }

  convertVideo(videoDto: VideoDto): Video {
    return new Video(videoDto.url);
  }

  convertSolution(solutionDto: SolutionDto): Solution {
    const solution: Solution = new Solution(solutionDto.text, solutionDto.isCorrect);
    if (solutionDto.justifications) {
      for (let i = 0; i < solutionDto.justifications.length; i++) {
        solution.addJustification(this.convertJustification(solutionDto.justifications[i]));
      }
    }
    return solution;
  }

  convertJustification(justificationDto: JustificationDto) {
    return new Justification(justificationDto.text, justificationDto.isCorrect);
  }
}
