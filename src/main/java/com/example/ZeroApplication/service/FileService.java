package com.example.ZeroApplication.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.ZeroApplication.dto.FilePropertyDto;
import com.example.ZeroApplication.entity.FilePropertyEntity;
import com.example.ZeroApplication.mapper.FilePropertyMapper;
import com.example.ZeroApplication.repository.FilePropertyRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FileService {

    private final MinioService minioService;
    private final FilePropertyRepository repository;
    private final FilePropertyMapper filePropertyMapper;

    public byte[] getFileById(String uuid) throws Exception {
        FilePropertyEntity entity = repository.getReferenceById(UUID.fromString(uuid));
        byte[] json = minioService.download(entity.getLinkJson());
        return json;
    }

    public FilePropertyDto saveJson(String file) throws Exception {
        String contentType = "application/json";
        FilePropertyDto filePropertyDto = minioService.uploadFile(file, contentType);
        FilePropertyEntity entity = new FilePropertyEntity();
        entity.setLinkJson(filePropertyDto.getLink());
        return filePropertyMapper.toFilePropertyDto(repository.save(entity));
    }

    public byte[] generateBat(String uuid, String file) throws Exception {
        return BatGeneratorService.generateBatFile(file).getBytes();
    }

    public List<FilePropertyDto> findAll() {
        return repository.findAll().stream().map(e -> filePropertyMapper.toFilePropertyDto(e)).toList();
    }
    
}
