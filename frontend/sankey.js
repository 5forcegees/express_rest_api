var colors = {
  'financial': '#edbd00',
  'account': '#367d85',
  'profile': '#97ba4c',
  'WSIL': '#f5662b',
  'N/A': '#3f3e47',
  'fallback': '#9f9fa3'
};
var defaultData = {
  'nodes': [
    {'name': 'SC1001 - Manage Profile - Addresses', 'id': 'SC1001'},
    {'name': '203 getGeneralProfile', 'id': '203'},
    {'name': '348 getStates', 'id': '348'},
    {'name': 'getCustomer', 'id': 'getCustomer'},
    {'name': 'getLineOfServices', 'id': 'getLineOfServices'},
    {'name': 'getLineOfServicesDetails', 'id': 'getLineOfServicesDetails'},
    {'name': 'getFinancialAccount', 'id': 'getFinancialAccount'},
    {'name': 'getFinancialAccountDetails', 'id': 'getFinancialAccountDetails'},
    {'name': 'getFinancialAccountDeviceDetails', 'id': 'getFinancialAccountDeviceDetails'},
    {'name': 'getLineofServiceAddress', 'id': 'getLineofServiceAddress'},
    {'name': 'N/A', 'id': 'N/A'},
    {'name': 'CustomerDetailsWSIL.getCustomerDetails', 'id': 'CustomerDetailsWSIL.getCustomerDetails'},
    {
      'name': 'FinancialAccountDetailsWSIL.getFinancialAccountDetails',
      'id': 'FinancialAccountDetailsWSIL.getFinancialAccountDetails'
    },
    {
      'name': 'LineOfServiceDetailsWSIL.getLineOfServiceDetails',
      'id': 'LineOfServiceDetailsWSIL.getLineOfServiceDetails'
    },
    {
      'name': 'FinancialAccountDetailsWSIL.getFinancialAccountDetails',
      'id': 'FinancialAccountDetailsWSIL.getFinancialAccountDetails'
    },
    {
      'name': 'FinancialAccountDetailsWSIL.getFinancialAccountDetails',
      'id': 'FinancialAccountDetailsWSIL.getFinancialAccountDetails'
    },
    {
      'name': 'financialAccountDetailsWSIL.getAccountDeviceDetails',
      'id': 'financialAccountDetailsWSIL.getAccountDeviceDetails'
    },
    {
      'name': 'LineOfServiceDetailsWSIL.getLineOfServiceDetails',
      'id': 'LineOfServiceDetailsWSIL.getLineOfServiceDetails'
    }
  ],
  'links': [
    {'source': 0, 'value': 0.00007, 'target': 1},
    {'source': 0, 'value': 0.00011, 'target': 2},
    {'source': 1, 'value': 0.00021, 'target': 3},
    {'source': 1, 'value': 0.00031, 'target': 4},
    {'source': 1, 'value': 0.00041, 'target': 5},
    {'source': 1, 'value': 0.00051, 'target': 6},
    {'source': 1, 'value': 0.00061, 'target': 7},
    {'source': 1, 'value': 0.00071, 'target': 8},
    {'source': 1, 'value': 0.00081, 'target': 9},
    {'source': 2, 'value': 0.00091, 'target': 10},
    {'source': 3, 'value': 0.00111, 'target': 11},
    {'source': 4, 'value': 0.00121, 'target': 12},
    {'source': 5, 'value': 0.00131, 'target': 13},
    {'source': 6, 'value': 0.00141, 'target': 14},
    {'source': 7, 'value': 0.00151, 'target': 15},
    {'source': 8, 'value': 0.00161, 'target': 16},
    {'source': 9, 'value': 0.00171, 'target': 17}
  ]
};

function loadChart(json) {
  var link_count = Object.keys(json.links).length;
  var desired_height = (500 > +link_count * 10) ? 500 : +link_count * 10;
  $('#chart').height(desired_height);

  var chart = d3.select('#chart').append('svg').chart('Sankey.Path');
  chart
    .name(label)
    .colorNodes(function (name, node) {
      return color(node, 1) || colors.fallback;
    })
    .colorLinks(function (link) {
      return color(link.source, 4) || color(link.target, 1) || colors.fallback;
    })
    .nodeWidth(15)
    .nodePadding(10)
    .spread(true)
    .iterations(30)
    .draw(json);
  function label(node) {
    return node.name.replace(/\s*\(.*?\)$/, '');
  }

  function color(node, depth) {
    for (var key in colors) {
      if (node.name.toLowerCase().indexOf(key) > -1) {
        return colors[key];
      }
    }
    if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
      return color(node.targetLinks[0].source, depth - 1);
    } else {
      return null;
    }
  }

  if (document.getElementById('chart').childNodes.length > 1) { // Remove old chart
    var chart = document.getElementById('chart');
    chart.removeChild(chart.childNodes[0]);
  }
}

function getChart() {
  var fieldName = document.getElementById('field_name').value;
  var fieldValueStr = document.getElementById('field_values').value;

  var xmlhttp;
  if (window.XMLHttpRequest) {
    xmlhttp = new XMLHttpRequest();
  } else {
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      loadChart(JSON.parse(xmlhttp.responseText));
    }
  };

  if (fieldName !== '' && fieldValueStr !== '') {
    xmlhttp.open('GET', 'http://localhost:8080/api?field_name=' + fieldName + '&field_value=' + fieldValueStr + '&sankey=true', true);
    xmlhttp.send();
  } else {
    loadChart(defaultData);
  }
}
