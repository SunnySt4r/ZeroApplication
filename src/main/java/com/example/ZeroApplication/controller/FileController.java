package com.example.ZeroApplication.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ZeroApplication.dto.FilePropertyDto;
import com.example.ZeroApplication.entity.FilePropertyEntity;
import com.example.ZeroApplication.mapper.FilePropertyMapper;
import com.example.ZeroApplication.service.FileService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
@Tag(name = "Контроллер файлов", description = "Есть возможность загружать файл, брать файл по ссылке")
public class FileController {

    private final FileService fileService;
    private final FilePropertyMapper mapper;

    @PostMapping("/")
    public FilePropertyEntity uploadFile(@RequestBody String file) throws Exception {
        return fileService.saveJson(file);
    }

    @GetMapping("/{uuid}")
    public ResponseEntity<String> loadFileByName(@PathVariable("uuid") String uuid) throws Exception {
        return fileService.getFileById(uuid);
    }

    @GetMapping("/{uuid}/get")
    public ResponseEntity<FilePropertyDto> getBat(@PathVariable("uuid") String uuid) throws Exception {
        return ResponseEntity.ok(mapper.toFilePropertyDto(fileService.generateBat(uuid)));
    }
}