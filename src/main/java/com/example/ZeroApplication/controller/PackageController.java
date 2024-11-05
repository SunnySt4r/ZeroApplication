package com.example.ZeroApplication.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/package")
@Tag(name = "Контроллер файлов", description = "Есть возможность загружать файл, брать файл по ссылке")
public class PackageController {
    
}
