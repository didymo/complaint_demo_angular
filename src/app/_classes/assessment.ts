import {AssessmentChoice} from "./assessment-choice";

export class Assessment {




  constructor(code: string, id: string, assessmentVid: string, assessmentLabel: string, assessmentCode: string, displayType: string, delta: string, required: string, description: string, type: number, assessmentUuid: string, answer: string, choices: AssessmentChoice[]) {
    this.code = code;
    this.id = id;
    this.assessmentVid = assessmentVid;
    this.assessmentLabel = assessmentLabel;
    this.assessmentCode = assessmentCode;
    this.displayType = displayType;
    this.delta = delta;
    this.required = required;
    this.description = description;
    this.type = type;
    this.assessmentUuid = assessmentUuid;
    this.answer = answer;
    this.choices = choices;
  }


  /**
   * The code is used to form the HL7 message, it is not displayed to users.
   */
  code: string;

  id: string;
  assessmentVid: string;
  assessmentLabel: string;
  assessmentCode: string;
  displayType: string;
  delta: string;
  required: string;

  /**
   * The description is shown to users as the assessment name.
   */
  description: string;

  /**
   * Type == 4 means this assessment has no choices, Type == 5 means that it does.
   */
  type: number;

  /**
   * The UUID assigned to this assessment by Drupal.
   */
  assessmentUuid: string;

  /**
   * The answer is populated by choice.label for assessments that have choices.
   * The answer is populated by text entry if the assessment does not have choices.
   */
  answer: string;

  /**
   * An array of assessment choices.
   * If an assessment has no choices, it will still be populated by one assessment choice. It's not used.
   */
  choices: AssessmentChoice[];
}
