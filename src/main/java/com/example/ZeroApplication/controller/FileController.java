package com.example.ZeroApplication.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ZeroApplication.entity.FilePropertyEntity;
import com.example.ZeroApplication.service.FileService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
@Tag(name = "Контроллер файлов", description = "Есть возможность загружать файл, брать файл по ссылке")
public class FileController {

    private final FileService fileService;

    @PostMapping("/")
    public FilePropertyEntity uploadFile(@RequestBody String file) {
        return fileService.saveFile(file);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<String> loadFileByName(@PathVariable("uuid") String uuid) {
        return fileService.getFileById(uuid);
    }

    @GetMapping("/{uuid}/get")
    public ResponseEntity<String> getBat(@PathVariable("uuid") String uuid) {
        return fileService.generateBat(uuid);
    }
}