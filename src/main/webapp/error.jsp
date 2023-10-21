<%@ page language="java" contentType="text/html; charset=UTF-8"pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Error Page</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="./css/design.css">
    <style>
        html, body {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .error-message {
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="error-message">
        <h2>Error:</h2>
            <p><%= request.getParameter("error") %>
        </p>
    </div>
</body>
</html>
