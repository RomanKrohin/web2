<%@page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="customTag" uri="/WEB-INF/tags" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="utils.Result" %>
<%
    List<Result> resultList;
    Result resultR;
    String R="R";
    if (request.getServletContext().getAttribute("resultList") == null){
        resultList = new ArrayList<>();
    }
    else{
        resultList = (List<Result>) request.getServletContext().getAttribute("resultList");
        resultR = resultList.get(resultList.size()-1);
        R=String.valueOf(resultR.getR());
    } 
%>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./css/design.css">
    </head>

    <body>
        <script src="./js/script.js" async defer></script>
        <header>
            Крохин Роман Олегович: P3224, Вариант: 24045
        </header>

        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
                <th width="30%">
                    <form id="form">
                        <br>
                        <div>
                            <label for="x_field">x:</label>
                            <br>
                            <button class = "x_val" type="button" name="x_value" value="-3">-3</button>
                            <button class = "x_val" type="button" name="x_value" value="-2">-2</button>
                            <button class = "x_val" type="button" name="x_value" value="-1">-1</button>
                            <button class = "x_val" type="button" name="x_value" value="0">0</button>
                            <button class = "x_val" type="button" name="x_value" value="1">1</button>
                            <button class = "x_val" type="button" name="x_value" value="2">2</button>
                            <button class = "x_val" type="button" name="x_value" value="3">3</button>
                            <button class = "x_val" type="button" name="x_value" value="4">4</button>
                            <button class = "x_val" type="button" name="x_value" value="5">5</button>
                            
                            <br>
                            <input type="text" placeholder="y" name="y_field" maxlength="10" required>
                            <br>
                            <input type="text" placeholder="R" name="R_field" maxlength="10" id="R_field" required>
                            <br>
                            <button class="submitBtn" name="submit" type="submit" id="submit_fields">Send</button>
                            </form>
                            <div id="error_div"></div>
                            <div id="graph">
                                <svg
                                height="400"
                                width="400"
                                xmlns="http://www.w3.org/2000/svg"
                                id="svg"
                                class="no-select">
                                <line stroke="black"
                                    x1="50"
                                    x2="350"
                                    y1="200"
                                    y2="200"
                                ></line>
                                <line stroke="black"
                                    x1="200"
                                    x2="200"
                                    y1="50"
                                    y2="350"
                                ></line>
                                <line stroke="black"
                                    x1="250"
                                    x2="250"
                                    y1="205"
                                    y2="195"
                                ></line>
                                <line stroke="black"
                                    x1="300"
                                    x2="300"
                                    y1="205"
                                    y2="195"
                                />
                                <line stroke="black"
                                x1="100"
                                x2="100"
                                y1="205"
                                y2="195"
                                />
                                <line stroke="black"
                                    x1="150"
                                    x2="150"
                                    y1="205"
                                    y2="195"
                                />
                    
                                <line stroke="black"
                                    x1="195"
                                    x2="205"
                                    y1="150"
                                    y2="150"
                                />
                                <line stroke="black"
                                    x1="195"
                                    x2="205"
                                    y1="100"
                                    y2="100"
                                />
                    
                                <line stroke="black"
                                    x1="195"
                                    x2="205"
                                    y1="250"
                                    y2="250"
                                />
                                <line stroke="black"
                                    x1="195"
                                    x2="205"
                                    y1="300"
                                    y2="300"
                                />
                    
                    
                                <text fill="black"
                                    x="245"
                                    y="190"
                                    data-dynamic-rx
                                >
                                </text>
                                <text fill="black"
                                    x="298"
                                    y="190"
                                    data-dynamic-rxx
                                >
                                </text>
                    
                                <text fill="black"
                                    x="90"
                                    y="190"
                                    data-dynamic-r-xx
                                >
                                </text>
                                <text fill="black"
                                    x="140"
                                    y="190"
                                    data-dynamic-r-x
                                >
                                </text>
                    
                                <text fill="black"
                                    x="210"
                                    y="155"
                                    data-dynamic-r-y
                                >
                                </text>
                                <text fill="black"
                                    x="210"
                                    y="105"
                                    data-dynamic-r-yy
                                >
                                </text>
                    
                                <text fill="black"
                                    x="210"
                                    y="255"
                                    data-dynamic-ry
                                >
                                </text>
                                <text fill="black"
                                    x="210"
                                    y="305"
                                    data-dynamic-ryy
                                >
                                </text>
                                <polygon points="360,200 350,195 350,205" fill="black" />
                                <polygon points="200,40 195,50 205,50" fill="black" />
                                <text fill="black"
                                    x="210"
                                    y="60"
                                >Y
                                </text>
                                <text fill="black"
                                    x="340"
                                    y="190"
                                >X
                                </text>
                                <path d="M 200 250 A 50 50, 0, 0, 0, 250 200 L 200 200 Z"
                                    fill="blue"
                                    fill-opacity="0.1"
                                    stroke="blue"
                                ></path>
                                <path d="M200 200 L300 200 L300 150 L200 150 Z"
                                    fill="blue"
                                    fill-opacity="0.1"
                                    stroke="blue"
                                ></path>
                                <path d="M200 200 L200 250 L100 200 Z"
                                    fill="blue"
                                    fill-opacity="0.1"
                                    stroke="blue"
                                ></path>
                                </svg>
                            </div>
                        </div>
                </th>
                <div>
                    <th width="70%">
                        <table id="result-table" width="100%">
                            <thead>
                                <tr>
                                    <th>X</th>
                                    <th>Y</th>
                                    <th>R</th>
                                    <th>Value</th>
                                    <th>Execution Time</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                            <% for (Result result : resultList) { %>
                                <tr>
                                    <td><%= result.getX() %></td>
                                    <td><%= result.getY() %></td>
                                    <td><%= result.getR() %></td>
                                    <td><%= result.getValue() %></td>
                                    <td><%= result.getExecTime() %></td>
                                    <td><%= result.getTime() %></td>
                                </tr>
                            <% } %>
                            </tbody>
                        </table>
                        <customTag:countTrue listOfResults="<%= resultList%>" />
                    </th>
                </div>
            </tr>
        </table>
    </body>

</html>