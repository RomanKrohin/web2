    const form = document.getElementById('form');
    const submitFieldsBtn = document.getElementById('submit_fields');
    const submitGraphBtn = document.getElementById('submit-graph');
    const clearGraphBtn = document.getElementById('clear_graf');
    const errorDiv = document.getElementById('error_div');
    const resultTable = document.getElementById('result-table');
    const svg = document.getElementById('svg');
    const points = [];
    let x_values = [];

    document.querySelectorAll(".x_val").forEach(function(button){
        button.addEventListener("click",handler);
    })
    
    function handler(event ){
        x_values.push(event.target.value);
    }
    

submitFieldsBtn.addEventListener('click', function(e) {
    e.preventDefault();
        errorDiv.innerHTML = '';
      
        const x = x_values[x_values.length - 1];
        const y = document.querySelector('input[name="y_field"]').value;
        const R = document.querySelector('input[name="R_field"]').value;
        if (validate(x, y, R)) {
          sendFormDataToServlet(x, y, R);
        }
      
        localStorage.setItem('x_values', JSON.stringify(x_values));
        localStorage.setItem('y_field', y);
        localStorage.setItem('R_field', R);
});
      

clearGraphBtn.addEventListener('click', function(e) {
    points.length = 0;
    localStorage.removeItem('graphData');
  });
      
submitGraphBtn.addEventListener('click', function(e) {
    e.preventDefault();
  
    const R = document.querySelector('input[name="R_field"]').value;
    points.forEach(function(point) {
      const x = ((parseFloat(point.getAttribute('cx')) - 400) / (100 / R) + (2 * R)).toFixed(2);
      const y = ((400 - parseFloat(point.getAttribute('cy'))) / (100 / R) - (2 * R)).toFixed(2);
      if (validate(x, y, R)) {
        sendFormDataToServlet(x, y, R);
      }
    });
  
    savePointsToLocalStorage();
  });
      
  
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
  
    savePointsToLocalStorage();
  });

  loadPointsFromLocalStorage();

function restoreFieldValues() {
        const savedYField = localStorage.getItem('y_field');
        if (savedYField) {
          document.querySelector('input[name="y_field"]').value = savedYField;
        }
      
        const savedRField = localStorage.getItem('R_field');
        if (savedRField) {
          document.querySelector('input[name="R_field"]').value = savedRField;
        }
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
    console.log(x, y ,R)
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
        window.location.href = 'index.jsp'
      } else if (xhr.status === 404) {
        window.location.href = '/web2/error.jsp?error=404';
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
    const savedData = {
      x: points.map(function(point) {
        return parseFloat(point.getAttribute('cx'));
      }),
      y: points.map(function(point) {
        return parseFloat(point.getAttribute('cy'));
      })
    };
    localStorage.setItem('graphData', JSON.stringify(savedData));
  }

  function loadPointsFromLocalStorage() {
    const savedData = localStorage.getItem('graphData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const { x, y } = parsedData;
  
      for (let i = 0; i < x.length; i++) {
        const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        point.setAttribute('cx', x[i]);
        point.setAttribute('cy', y[i]);
        point.setAttribute('r', 4);
        point.setAttribute('fill', 'red');
        svg.appendChild(point);
        points.push(point);
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