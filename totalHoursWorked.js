import { 
  LightningElement,
  api,
  wire,
  track 
} from 'lwc';

// import apex method
import searchEmployeeShiftHistory from "@salesforce/apex/EmployeePunchesController.searchEmployeeShiftHistory";

export default class TotalHoursWorked extends LightningElement {

  @wire(searchEmployeeShiftHistory) employeeShiftHistory;

  @api get useEmployeeShiftHistory() {
    
    var html_code = '';
    var employee_shifts;
    var total_number_of_hours = 0;

    if (this.employeeShiftHistory.data == 'no shifts this week') {

      if (this.employeeShiftHistory.data !== undefined) {

        html_code += '<div style="text-align: left; width: 100%; padding-top: 15px">\n';
        html_code += '<label><span style="font-size: 12pt">You have no shifts this week.</span></label>\n';
        html_code += '</div>\n';
      }
    } else {

      if (this.employeeShiftHistory.data !== undefined) {
        
        employee_shifts = JSON.parse(this.employeeShiftHistory.data);

        for (var i = 0; i < employee_shifts["employee_weekly_shifts"].length; i ++) {

          total_number_of_hours += employee_shifts["employee_weekly_shifts"][i]["number_of_hours"];
        }

        html_code += '<div style="text-align: left; width: 100%; padding-top: 15px">\n';

        if (total_number_of_hours == 1) {

          html_code += '<label><span style="font-size: 12pt"><b>Total hours this week:</b> ' +
          total_number_of_hours + ' hour</span></label>\n';
        } else {

          html_code += '<label><span style="font-size: 12pt"><b>Total hours this week:</b> ' +
          total_number_of_hours + ' hours</span></label>\n';
        }
        
        html_code += '</div>\n';
        
        for (var i = 0; i < employee_shifts["employee_weekly_shifts"].length; i ++) {
          
          if (employee_shifts["employee_weekly_shifts"][i]["number_of_hours"] == 1) {

            html_code += '<div style="text-align: left; width: 100%; padding-top: 15px">\n';
            html_code += '<label><span style="font-size: 12pt"><b>'
            + employee_shifts["employee_weekly_shifts"][i]["date"] + ':</b> ' +
            employee_shifts["employee_weekly_shifts"][i]["number_of_hours"] + ' hour</span></label>\n';
            html_code += '</div>\n';
          } else {

            html_code += '<div style="text-align: left; width: 100%; padding-top: 15px">\n';
            html_code += '<label><span style="font-size: 12pt"><b>'
            + employee_shifts["employee_weekly_shifts"][i]["date"] + ':</b> ' +
            employee_shifts["employee_weekly_shifts"][i]["number_of_hours"] + ' hours</span></label>\n';
            html_code += '</div>\n';
          }
        }
      }
    }

    return html_code;
  }
}
