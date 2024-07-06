/**
 * @whatItDoes Represents an assessment choice.
 *
 * @description
 *  An assessment choice forms a single choice in an assessment.
 */
export class AssessmentChoice {
  constructor(label: string, description: string, choiceUuid: string, id: string, choiceVid: string, choiceCode: string, delta: string, hiddenOnSurvey: string) {
    this.label = label;
    this.description = description;
    this.choiceUuid = choiceUuid;
    this.id = id;
    this.choiceVid = choiceVid;
    this.choiceCode = choiceCode;
    this.delta = delta;
    this.hiddenOnSurvey = hiddenOnSurvey;
  }

  /**
   * The label is used as the result value in the HL7 message.
   * It populates the assessment.value variable.
   */
  label: string;

  /**
   * The human readable description of the choice, this is displayed to users.
   */
  description: string;

  /**
   * The UUID assigned to this assessment choice by Drupal.
   */
  choiceUuid: string;

  /**
   * The below were added to facilitate teh form builder
   */

  /**
   * The choice ID
   */
  id: string;

  /**
   * In Drupal the revissions are kept, this is the Revision ID.
   */
  choiceVid: string;

  /**
   * The MOSAIQ Choice Code
   */
  choiceCode: string;

  /**
   *
   */
  delta: string;

  /**
   *
   */
  hiddenOnSurvey: string;
}
