package utils;
public class Result {
    private String x;
    private String y;
    private String r;
    private String value;
    private String execTime;
    private String time;
    
    public Result(String x, String y, String r, String value, String execTime, String time) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.value = value;
        this.execTime = execTime;
        this.time = time;
    }

    public Result() {
    }
    
    public String getX() {
        return x;
    }
    
    public void setX(String x) {
        this.x = x;
    }
    
    public String getY() {
        return y;
    }
    
    public void setY(String y) {
        this.y = y;
    }
    
    public String getR() {
        return r;
    }
    
    public void setR(String r) {
        this.r = r;
    }
    
    public String getValue() {
        return value;
    }
    
    public void setValue(String value) {
        this.value = value;
    }
    
    public String getExecTime() {
        return execTime;
    }
    
    public void setExecTime(String execTime) {
        this.execTime = execTime;
    }
    
    public String getTime() {
        return time;
    }
    
    public void setTime(String time) {
        this.time = time;
    }
}
