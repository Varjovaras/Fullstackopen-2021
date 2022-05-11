interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CourseDescriptionPart {
  type: 'normal';
}
interface CourseSubmissionPart extends CourseDescriptionPart {
  type: 'submission';
  exerciseSubmissionLink: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSpecialPart extends CourseDescriptionPart {
  type: 'special';
  requirements: string[];
}

// type union of above types
type CoursePart =
  | CourseNormalPart
  | CourseSubmissionPart
  | CourseProjectPart
  | CourseSpecialPart;

export default CoursePart;
