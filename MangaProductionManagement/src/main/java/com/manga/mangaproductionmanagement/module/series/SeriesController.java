package com.manga.mangaproductionmanagement.module.series;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
// Đã cập nhật: Cho phép React chạy trên cổng 3000 gọi vào lấy dữ liệu thành công
@CrossOrigin(origins = "http://localhost:3000")
public class SeriesController {

    @GetMapping("/series")
    public ResponseEntity<List<Series>> getSeriesList() {
        List<Series> list = new ArrayList<>();

        // Khởi tạo dữ liệu giả lập sử dụng Constructor của file Series.java mới sửa package
        list.add(new Series(1, "One Piece", "Eiichiro Oda"));
        list.add(new Series(2, "Attack on Titan", "Hajime Isayama"));
        list.add(new Series(3, "The Boys", "Garth Ennis"));

        return ResponseEntity.ok(list);
    }
}