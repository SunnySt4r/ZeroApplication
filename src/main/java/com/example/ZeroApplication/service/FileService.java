package com.example.ZeroApplication.service;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.ZeroApplication.dto.FilePropertyDto;
import com.example.ZeroApplication.entity.FilePropertyEntity;
import com.example.ZeroApplication.repository.FilePropertyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileService {

    private final MinioService minioService;
    private final FilePropertyRepository repository;

    public ResponseEntity<String> getFileById(String uuid) throws Exception {
        FilePropertyEntity entity = repository.getReferenceById(UUID.fromString(uuid));
        String json = minioService.download(entity.getLinkJson()).toString();
        return ResponseEntity.ok(json);
    }

    public FilePropertyEntity saveJson(String file) throws Exception {
        String contentType = "application/json";
        FilePropertyDto filePropertyDto = minioService.uploadFile(file, contentType);
        FilePropertyEntity entity = new FilePropertyEntity();
        entity.setLinkJson(filePropertyDto.getLink());
        return repository.save(entity);
    }

    public FilePropertyEntity generateBat(String uuid) throws Exception {
        String contentType = "application/x-msdos-program";
        FilePropertyEntity entity = repository.getReferenceById(UUID.fromString(uuid));
        String json = minioService.download(entity.getLinkJson()).toString();
        String bat = generateBatFileFromJson(json);
        FilePropertyDto filePropertyDto = minioService.uploadFile(bat, contentType);
        entity.setLinkBat(filePropertyDto.getLink());
        return repository.save(entity);
    }

    private String generateBatFileFromJson(String json) {
        //TODO
        return "";
    }
    
}
