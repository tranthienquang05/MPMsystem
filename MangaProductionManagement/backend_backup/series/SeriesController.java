package com.manga.mangaproductionmanagement.series;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
// Bùa mở cổng kết nối: Cho phép React (cổng 5173) gọi vào lấy dữ liệu mà không bị lỗi CORS
@CrossOrigin(origins = "http://localhost:5173")
public class SeriesController {

    @GetMapping("/series") // Đường dẫn API sẽ là: http://localhost:8080/api/series
    public ResponseEntity<List<Series>> getSeriesList() {
        List<Series> list = new ArrayList<>();

        // Khởi tạo dữ liệu giả lập dùng Constructor đầy đủ tham số vừa thêm ở Bước 1
        list.add(new Series(1, "One Piece", "Eiichiro Oda"));
        list.add(new Series(2, "Attack on Titan", "Hajime Isayama"));
        list.add(new Series(3, "The Boys", "Garth Ennis"));

        return ResponseEntity.ok(list);
    }
}