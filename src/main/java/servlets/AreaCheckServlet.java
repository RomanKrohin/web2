package servlets;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import utils.Result;

@WebServlet("/checkArea")
public class AreaCheckServlet  extends HttpServlet{
    private static final String RESULT_LIST_ATTRIBUTE = "resultList";

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        try {
            float x = Float.parseFloat(request.getParameter("x"));
            float y = Float.parseFloat(request.getParameter("y"));
            float R = Float.parseFloat(request.getParameter("R"));
            if (validate(x, y, R)) {
                Result result = new Result();
                double start = System.nanoTime();
                result.setValue(String.valueOf(checkArea(x, y, R)));
                result.setX(String.valueOf(x));
                result.setY(String.valueOf(y));
                result.setR(String.valueOf(R));
                result.setTime(String.valueOf(LocalDateTime.now()));

                ServletContext servletContext = getServletContext();
                List<Result> results = (List<Result>) servletContext.getAttribute("results");
                if (results == null) {
                    results = new ArrayList<>();
                    servletContext.setAttribute("results", results);
                }
                results.add(result);

                double execTime = Math.round(((System.nanoTime() - start) * 0.00001) * 100.0) / 100.0;
                result.setExecTime(String.valueOf(execTime));

                addResultToServletContext(request, result);

                ObjectMapper mapper = new ObjectMapper();
                String jsonResult = mapper.writeValueAsString(result);

                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");

                response.getWriter().write(jsonResult);
            }
        } catch (Exception e) {
            request.setAttribute("error", e.toString());
            request.getRequestDispatcher("/error.jsp").forward(request, response);
        }
    }

    @Override
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        String errorMessage = "Возникла проблема при обработке запроса.";
        request.setAttribute("error", errorMessage);
        request.getRequestDispatcher("/error.jsp").forward(request, response);
    }
    
    private boolean validate(float x, float y, float R){
        if (x < -3){
            return false;
        }
        if (x > 5){
            return false;
        }
        if (y < -5){
            return false;
        }
        if (y > 3){
            return false;
        }
        if (R > 4){
            return false;
        }
        if (R < 1){
            return false;
        }
        return true;
      }
    
    private boolean checkArea(float x, float y, float R){
        if (x >= 0 && x <= R/2 && y >= 0 && y <= R) {
            return true;
        }
        if (x >= 0 && y <= 0 && Math.sqrt(x*x+y*y)<= R) {
            return true;
        }
        if (x<=0 && y<=0 && y>=x/2-R/2) {
            return true;
        }
        return false;
    }

    @SuppressWarnings("unchecked")
    private void addResultToServletContext(HttpServletRequest request, Result result) {
        List<Result> resultList = (List<Result>) request.getServletContext().getAttribute(RESULT_LIST_ATTRIBUTE);
        if (resultList == null) {
            resultList = new ArrayList<>();
        }

        resultList.add(result);
        request.getServletContext().setAttribute(RESULT_LIST_ATTRIBUTE, resultList);
    }
    
}
