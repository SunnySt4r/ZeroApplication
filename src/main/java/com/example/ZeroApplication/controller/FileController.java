package com.example.ZeroApplication.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ZeroApplication.entity.FilePropertyEntity;
import com.example.ZeroApplication.repository.FilePropertyRepository;
import com.example.ZeroApplication.service.FileService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/file")
@Tag(name = "Контроллер файлов", description = "Есть возможность загружать файл, брать файл по ссылке")
public class FileController {

    private final FileService fileService;
    private final FilePropertyRepository repository;

    @PostMapping("/")
    public FilePropertyEntity uploadFile(@RequestBody String file) throws Exception {
        return fileService.saveJson(file);
    }

    @GetMapping("/{uuid}")
    public byte[] loadFileByName(@PathVariable("uuid") String uuid) throws Exception {
        return fileService.getFileById(uuid);
    }

    @GetMapping("/all")
    public ResponseEntity<List<FilePropertyEntity>> loadFileByName() throws Exception {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping("/{uuid}/generate")
    public byte[] getBat(@PathVariable("uuid") String uuid, @RequestBody String file) throws Exception {
        return  fileService.generateBat(uuid, file);
    }
}