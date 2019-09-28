package Application.Models;

public class Card {
    private int value;
    private String path;
    private String color;
    private int x;
    private int y;

    public Card(int value, String path, String color, int x, int y) {
        this.value = value;
        this.path = path;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getValue() {
        return value;
    }

    public String getColor() {
        return color;
    }

    public String getPath() {
        return path;
    }

}
