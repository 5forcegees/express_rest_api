/**
 * Created by glenn.dufresne on 1/27/16.
 */

module.exports = function (seq, DataTypes) {
  return seq.define('whole_sheet', {
      screen: {
        type: DataTypes.STRING,
        get: function () {
          return this.getDataValue('screen')
        }
      },
      screen_number: {type: DataTypes.STRING},
      screen_name: {type: DataTypes.STRING},
      l2: {type: DataTypes.STRING},
      screen_owner: {type: DataTypes.STRING},
      sa_owner: {type: DataTypes.STRING},
      tp1: {type: DataTypes.STRING},
      tp2: {type: DataTypes.STRING},
      tp3d: {type: DataTypes.STRING},
      tp3e: {type: DataTypes.STRING},
      screen_level_e2e_mapping: {type: DataTypes.STRING},
      service_level_e2e_mapping_status: {type: DataTypes.STRING},
      field_level_e2e_mapping: {type: DataTypes.STRING},
      defects: {type: DataTypes.STRING},
      raid: {type: DataTypes.STRING},
      facade_number: {type: DataTypes.STRING},
      facade_api: {type: DataTypes.STRING},
      core_api: {type: DataTypes.STRING},
      e_wsil: {type: DataTypes.STRING},
      esp_service: {type: DataTypes.STRING},
      core_design_complete_date: {type: DataTypes.STRING},
      facade_design_complete: {type: DataTypes.STRING},
      facade_dev_complete: {type: DataTypes.STRING}
    },
    {
      instanceMethods: {
        getRow: function () {
          return [
            this.screen,
            this.screen_number,
            this.screen_name,
            this.l2,
            this.screen_owner,
            this.sa_owner,
            this.tp1,
            this.tp2,
            this.tp3d,
            this.tp3e,
            this.screen_level_e2e_mapping,
            this.service_level_e2e_mapping_status,
            this.field_level_e2e_mapping,
            this.defects,
            this.raid,
            this.facade_number,
            this.facade_api,
            this.core_api,
            this.e_wsil,
            this.esp_service,
            this.core_design_complete_date,
            this.facade_design_complete,
            this.facade_dev_complete
          ]
        }
      },
      freezeTableName: true // Model tableName will be the same as the model name
    }
  )
};
