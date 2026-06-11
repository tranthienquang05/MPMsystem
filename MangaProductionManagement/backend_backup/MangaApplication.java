package com.manga.mangaproductionmanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication // Đây là annotation quyền lực báo hiệu cho Spring Boot biết đây là tâm dịch kích hoạt hệ thống
public class MangaApplication {
    public static void main(String[] args) {
        SpringApplication.run(MangaApplication.class, args);
    }
}