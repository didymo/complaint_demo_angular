/**
 * Stores the data of a Survey retrieved from the list of Surveys
 * Maintains the format defined from Drupal
 */
export class ListOfSurveys {
  constructor(
    label: string,
    entityId: number,
    revisionId: number,
    obdId: number,
    revisionCreationTime: string,
    revisionStatus: string
  ) {
    this.label = label;
    this.entityId = entityId;
    this.revisionId = revisionId;
    this.obdId = obdId;
    this.revisionCreationTime = revisionCreationTime;
    this.revisionStatus = revisionStatus;
  }
  /**
   * Tabview's label
   */
  label: string;
  /**
   * The entity id of a tab view
   * Uniquely identifies the tabview drupal
   */
  entityId: number;
  revisionId: number;
  obdId: number;
  revisionCreationTime: string;
  revisionStatus: string;
}
