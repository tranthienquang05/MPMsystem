package com.manga.mangaproductionmanagement.series;

public class Series {
    private int id;
    private String title;
    private String author;

    // 1. Thêm Constructor không đối số (Bắt buộc để Spring Boot map JSON sau này)
    public Series() {
    }

    // 2. Thêm Constructor đầy đủ đối số để chúng ta khởi tạo dữ liệu test cho nhanh
    public Series(int id, String title, String author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }

    // Constructor cũ của bạn giữ nguyên hoặc xóa đi cũng được
    public Series(int id) {
        this.id = id;
    }

    // Các hàm Getter và Setter bên dưới giữ nguyên của bạn...
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }


}
