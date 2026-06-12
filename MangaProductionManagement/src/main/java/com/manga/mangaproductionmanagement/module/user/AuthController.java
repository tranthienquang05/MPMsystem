package com.manga.mangaproductionmanagement.user;

import com.manga.mangaproductionmanagement.user.dto.LoginRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Map<String, Object> result = userService.authenticate(request.getUsernameOrEmail(), request.getPassword());
        return ResponseEntity.ok(result);
    }
}

