import {Assessment} from "./assessment";

export class Survey {
  constructor(label: string, obdId: number, active: string, tabViewType: number, entityId: number, diagnosisName: string, submitted: boolean, index: number, koboFormId: string, ownedByUser: boolean, tabViewCreatedTime: string, tabViewChangedTime: string, tabViewVid: string, assessments: Assessment[]) {
    this.label = label;
    this.obdId = obdId;
    this.active = active;
    this.tabViewType = tabViewType;
    this.entityId = entityId;
    this.diagnosisName = diagnosisName;
    this.submitted = submitted;
    this.index = index;
    this.koboFormId = koboFormId;
    this.ownedByUser = ownedByUser;
    this.tabViewCreatedTime = tabViewCreatedTime;
    this.tabViewChangedTime = tabViewChangedTime;
    this.tabViewVid = tabViewVid;
    this.assessments = assessments;
  }


  /**
   * The human readable name of the tab view.
   */
  label: string;

  /**
   * An obdId is the primary key of a tab view in the MOSAIQ database.
   * Tab views that originate from MOSAIQ (original or cloned) will have an obdId.
   * If a tab view was built in MOSAIQ it will have an obdId of 0.
   *
   * @see tabViewType
   *  obdId is a component of determining the tabViewType.
   */
  obdId: number;

  /**
   * Used to determine if a tab view exists in the Drupal system.
   * This is useful if you are determining if a tab view in MOSAIQ is available in Drupal.
   *
   * 'active' if it is active.
   * 'inactive' if it is not.
   */
  active: string;

  /**
   * tabViewType is used to differentiate how a tab view was created.
   *
   * It is enumerated:
   * 0 is a tab view from MOSAIQ.
   * 1 is a tab view that has been cloned from a MOSAIQ tab view.
   * 2 is a tab view that has been created independent of MOSAIQ.
   */
  tabViewType: number;

  /**
   * The primary key of the tab view entity in Drupal.
   * Useful for querying the system for details of a particular tab view.
   */
  entityId: number;

  /**
   * The human readable name of the Diagnosis, looks like (C01).
   * Sometimes a patient will have multiple diagnoses that result in the same tab view being listed twice.
   * This is useful to differentiate between tab views on a list.
   */
  diagnosisName: string;

  /**
   * When the submission button is pressed this should be set as true.
   * This allows us to remove previously submitted forms from the list.
   */
  submitted: boolean;

  /**
   * Normally we have an array of tab view stubs when we load a page.
   * The index variable is used to identify what the index of the tab view is.
   * This allows us to easily manipulate tab views and propagate by passing instances of the array by reference.
   */
  index: number;

  /**
   * Tab Views in Drupal have a record of what their formId is in KoboToolbox.
   * We would like this value so that we can differentiate between Tab Views that are in Kobo
   * and Tab Views that are not yet in Kobo.
   * An entry in this field indicates that it exists at KoboToolbox.
   */
  koboFormId: string;

  /**
   * Determines if the Tab View is owned by a user and if it should be shown on the user specific Tab View list.
   */
  ownedByUser: boolean;

  /**
   * The created time of a tab-view
   */
  tabViewCreatedTime: string;

  /**
   * The changed time of a tab-view
   */
  tabViewChangedTime: string;

  /**
   * The VID of a tab-view
   */
  tabViewVid: string;

  /**
   * A list of assessments associated with the tab view.
   */
  assessments: Assessment[];
}

/**
 * @whatItDoes Represents a Tab View as a by only the Drupal id and array index.
 *
 * @description
 * A Tab View Stub aims to provide a single object to pass around between components.
 * The object contains the array index and the Drupal entity id and is used for loading individual tab views.
 */
export class TabViewStub {

  constructor(entityId: number, index: number) {
    this.entityId = entityId;
    this.index = index;
  }

  /**
   * The primary key of the tab view entity in Drupal.
   * Used for querying the system for details of a particular tab view.
   */
  entityId: number;

  /**
   * The index variable is used to identify what the index of the tab view is in a list of tab views.
   */
  index: number;
}
