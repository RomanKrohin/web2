    const form = document.getElementById('form');
    const submitFieldsBtn = document.getElementById('submit_fields');
    const errorDiv = document.getElementById('error_div');
    const resultTable = document.getElementById('result-table');
    const svg = document.getElementById('svg');
    let x_values=[];
    let points = [];

    document.querySelectorAll(".x_val").forEach(function(button){
        button.addEventListener("click",handler);
    })
    
    function handler(event ){
        x_values.push(event.target.value);
    }
    
    const RField = document.getElementById('R_field');

    RField.addEventListener('input', function(e) {
      const R = parseFloat(RField.value).toFixed(1);
      localStorage.setItem('R_field', R);

      const pointsSVG = document.querySelectorAll('#svg circle');
      pointsSVG.forEach(function(point) {
        point.parentNode.removeChild(point);
    });

      document.querySelector('#svg text[data-dynamic-rx]').textContent = +R/2;
      document.querySelector('#svg text[data-dynamic-rxx]').textContent = +R;
      document.querySelector('#svg text[data-dynamic-r-x]').textContent = -R/2;
      document.querySelector('#svg text[data-dynamic-r-xx]').textContent = -R;
      document.querySelector('#svg text[data-dynamic-ry]').textContent = -R/2;
      document.querySelector('#svg text[data-dynamic-ryy]').textContent = -R;
      document.querySelector('#svg text[data-dynamic-r-y]').textContent = +R/2;
      document.querySelector('#svg text[data-dynamic-r-yy]').textContent = +R;

    const savedData = localStorage.getItem('graphData');
    if (savedData && !isNaN(R)) {
      const parsedData = JSON.parse(savedData);
      const { x, y } = parsedData;
      points=[];
      for (let i = 0; i < x.length; i++) {
          const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          point.setAttribute('cx', ((parseFloat(x[i]) - 2 * R) * (100 / R) + 400).toFixed(0));
          point.setAttribute('cy', (200 - (100 / R) * (parseFloat(y[i]))).toFixed(0));
          point.setAttribute('r', 3);
          point.setAttribute('fill', 'red');
          svg.appendChild(point);
          points.push(point);
      }
    }
});

submitFieldsBtn.addEventListener('click', function(e) {
    e.preventDefault();
        errorDiv.innerHTML = '';
      
        const x = x_values[x_values.length - 1];
        const y = document.querySelector('input[name="y_field"]').value;
        const R = document.querySelector('input[name="R_field"]').value;
        if (validate(x, y, R)) {
          printPoint(x, y, R);
          sendFormDataToServlet(x, y, R);
        }
      
        localStorage.setItem('x_values', JSON.stringify(x_values));
        localStorage.setItem('y_field', y);
        localStorage.setItem('R_field', R);
});

function printPoint(x, y, R) {
  const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  point.setAttribute('cx', ((x - 2 * R) * (100 / R) + 400).toFixed(0));
  point.setAttribute('cy', (200 - (100 / R) * (y)).toFixed(0));
  point.setAttribute('r', 3);
  point.setAttribute('fill', 'red');
  svg.appendChild(point);
  points.push(point);

  savePointsToLocalStorage();
}
     
svg.addEventListener('click', function(e) {
  const rect = svg.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  point.setAttribute('cx', x);
  point.setAttribute('cy', y);
  point.setAttribute('r', 3);
  point.setAttribute('fill', 'red');
  svg.appendChild(point);
  points.push(point);

  const R = document.querySelector('input[name="R_field"]').value;
  if (validate(((x - 400) / (100 / R) + (2 * R)).toFixed(2), ((400 - y) / (100 / R) - (2 * R)).toFixed(2), R)){
    sendFormDataToServlet(((x - 400) / (100 / R) + (2 * R)).toFixed(2), ((400 - y) / (100 / R) - (2 * R)).toFixed(2), R);
  }

  savePointsToLocalStorage();
});


function restoreFieldValues() {
        const savedYField = localStorage.getItem('y_field');
        if (savedYField) {
          document.querySelector('input[name="y_field"]').value = savedYField;
        }
      
        const savedRField = localStorage.getItem('R_field');
        if (savedRField) {
          document.querySelector('input[name="R_field"]').value = savedRField;
        }
        document.querySelector('#svg text[data-dynamic-rx]').textContent = +savedRField/2;
        document.querySelector('#svg text[data-dynamic-rxx]').textContent = +savedRField;
        document.querySelector('#svg text[data-dynamic-r-x]').textContent = -savedRField/2;
        document.querySelector('#svg text[data-dynamic-r-xx]').textContent = -savedRField;
        document.querySelector('#svg text[data-dynamic-ry]').textContent = -savedRField/2;
        document.querySelector('#svg text[data-dynamic-ryy]').textContent = -savedRField;
        document.querySelector('#svg text[data-dynamic-r-y]').textContent = +savedRField/2;
        document.querySelector('#svg text[data-dynamic-r-yy]').textContent = +savedRField;
}

function showError(message) {
    const errorDiv = document.getElementById('error_div');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    setTimeout(function () {
        errorDiv.style.display = 'none';
    }, 3000);
}

function validate(x, y, R) {
    if (x.trim() === '') {
      showError("Please enter a value for x");
      return false;
    }
    if (isNaN(y) || isNaN(R)){
        showError("Please enter numeric value")
        return false;
    }
    if (y < -5){
        showError("y needs to be > -5", 3000);
        return false;
    }
    if (y > 3){
        showError("y needs to be < 3", 3000);
        return false;
    }
    if (R > 4){
        showError("R needs to be < 4", 3000);
        return false;
    }
    if (R < 1){
        showError("R needs to be > 1", 3000);
        return false;
    }
    return true;
}

function sendFormDataToServlet(x, y, R) {
    const url = '/web2/controller?' + 'x=' + encodeURIComponent(x) + '&y=' + encodeURIComponent(y) + '&R=' + encodeURIComponent(R);
  
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (xhr.status === 200) {
        window.location.href = 'index.jsp';
        window.location.href = 'result.jsp';
      } else if (xhr.status === 404) {
        window.location.replace ('error.jsp?error=404 Not Found');
      } else {
        showError('Error: ' + xhr.status);
      }
    };
    xhr.onerror = function () {
      showError('Request failed');
    };
    xhr.open('GET', url, true);
    xhr.send();
  }
  
  function savePointsToLocalStorage() {
    const R = parseFloat(RField.value).toFixed(2);
    const savedData = {
      x: points.map(function(point) {
        return parseFloat(((point.getAttribute('cx') - 400) / (100 / R) + (2 * R)).toFixed(2));
      }),
      y: points.map(function(point) {
        return parseFloat(((400 - point.getAttribute('cy')) / (100 / R) - (2 * R)).toFixed(2));
      })
    };
    localStorage.setItem('graphData', JSON.stringify(savedData));
  }

  function loadPointsFromLocalStorage() {
    const savedData = localStorage.getItem('graphData');
    if (savedData) {
      restoreFieldValues();
      const R = parseFloat(RField.value).toFixed(2);
      const parsedData = JSON.parse(savedData);
      const { x, y } = parsedData;
      for (let i = 0; i < x.length; i++) {
        if (!isNaN(R), !isNaN(x[i]),!isNaN(y[i])){
          const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
          point.setAttribute('cx', ((parseFloat(x[i]) - 2 * R) * (100 / R) + 400).toFixed(0));
          point.setAttribute('cy', (200 - (100 / R) * (parseFloat(y[i]))).toFixed(0));
          point.setAttribute('r', 3);
          point.setAttribute('fill', 'red');
          svg.appendChild(point);
          points.push(point);
        }
      }
    }
  }

window.addEventListener('load', function() {
    const savedXValues = localStorage.getItem('x_values');
    if (savedXValues) {
      x_values = JSON.parse(savedXValues);
    }
  
    restoreFieldValues();
});

loadPointsFromLocalStorage();