import { Unit } from './models/unit.model';
import { UnitInputDto } from './dtos/unit-input.dto';
import { Itinerary } from '../shared/models/itinerary.model';
import { ItineraryInputDto } from './dtos/itinerary-input.dto';
import { FormationInputDto } from './dtos/formation-input.dto';
import { Formation } from '../shared/models/formation.model';
import { Session } from '../shared/models/session.model';
import { SessionInputDto } from './dtos/session-input.dto';
import { Lesson } from '../shared/models/lesson.model';
import { LessonInputDto } from './dtos/lesson-input.dto';
import { Exercise } from './models/exercise.model';
import { ExerciseInputDto } from './dtos/exercise-input.dto';
import { Video } from './models/video.model';
import { VideoInputDto } from './dtos/video-input.dto';
import { Interaction } from './models/interaction.model';
import { InteractionInputDto } from './dtos/interaction-input.dto';
import { Solution } from './models/solution.model';
import { SolutionInputDto } from './dtos/solution-input.dto';
import { JustificationInputDto } from './dtos/justification-input.dto';
import { Justification } from './models/justification.model';
import { ItineraryMiddleInputDto } from './dtos/itinerary-middle-input.dto';

export class DtoConverter {

  constructor() { }

  convertUnit(unitDto: UnitInputDto): Unit {
    const unit: Unit = new Unit(unitDto.name, unitDto.code, unitDto.content);
    if (unitDto.itineraries) {
      for (let i = 0; i < unitDto.itineraries.length; i++) {
        unit.addItinerary(this.convertMiddlewareItinerary(unitDto.itineraries[i]));
      }
    }
    return unit;
  }

  convertMiddlewareItinerary(itineraryMiddleDto: ItineraryMiddleInputDto): Itinerary {
    return this.convertItinerary(itineraryMiddleDto.itinerary);
  }

  convertItinerary(itineraryDto: ItineraryInputDto): Itinerary {
    const itinerary: Itinerary = new Itinerary(itineraryDto.name);
    itinerary.setId(itineraryDto.id);
    if (itineraryDto.formations) {
      for (let i = 0; i < itineraryDto.formations.length; i++) {
        itinerary.addFormation(this.convertFormation(itineraryDto.formations[i]));
      }
    }
    return itinerary;
  }

  convertFormation(formationDto: FormationInputDto): Formation {
    if (formationDto.session) {
      return this.convertSession(formationDto.session);
    } else {
      return this.convertItinerary(formationDto.itinerary);
    }
  }

  convertSession(sessionDto: SessionInputDto): Session {
    const session: Session = new Session(sessionDto.name);
    session.setId(sessionDto.id);
    if (sessionDto.lessons) {
      for (let i = 0; i < sessionDto.lessons.length; i++) {
        session.addLesson(this.convertLesson(sessionDto.lessons[i]));
      }
    }
    return session;
  }

  convertLesson(lessonDto: LessonInputDto): Lesson {
    const lesson: Lesson = new Lesson(lessonDto.name);
    lesson.setId(lessonDto.id);
    if (lessonDto.interactions) {
      for (let i = 0; i < lessonDto.interactions.length; i++) {
        lesson.addInteractions(this.convertInteraction(lessonDto.interactions[i]));
      }
    }
    return lesson;
  }

  convertExercise(exerciseDto: ExerciseInputDto): Exercise {
    const exercise: Exercise = new Exercise(exerciseDto.formulation);
    exercise.setId(exerciseDto.id);
    if (exerciseDto.solutions) {
      for (let i = 0; i < exerciseDto.solutions.length; i++) {
        exercise.addSolution(this.convertSolution(exerciseDto.solutions[i]));
      }
    }
    return exercise;
  }

  convertInteraction(interactionDto: InteractionInputDto): Interaction {
    if (interactionDto.exercise) {
      return this.convertExercise(interactionDto.exercise);
    } else {
      return this.convertVideo(interactionDto.video);
    }
  }

  convertVideo(videoDto: VideoInputDto): Video {
    const video = new Video();
    video.setId(videoDto.id);
    video.setUrl(videoDto.url);
    return video;
  }

  convertSolution(solutionDto: SolutionInputDto): Solution {
    const solution: Solution = new Solution(solutionDto.text, solutionDto.isCorrect);
    if (solutionDto.justifications) {
      for (let i = 0; i < solutionDto.justifications.length; i++) {
        solution.addJustification(this.convertJustification(solutionDto.justifications[i]));
      }
    }
    return solution;
  }

  convertJustification(justificationDto: JustificationInputDto) {
    return new Justification(justificationDto.text, justificationDto.isCorrect);
  }
}
