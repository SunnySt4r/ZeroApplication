package com.example.ZeroApplication.service;

import com.example.ZeroApplication.config.MinioProperties;
import com.example.ZeroApplication.dto.FilePropertyDto;

import io.minio.GetObjectArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.RemoveObjectArgs;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.apache.commons.compress.utils.IOUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MinioService {

  private final MinioClient minioClient;
  private final MinioProperties properties;

  public FilePropertyDto uploadFile(String file, String contentType) throws Exception {
    String fileId = UUID.randomUUID().toString();

    InputStream inputStream = new ByteArrayInputStream(file.getBytes());
    minioClient.putObject(
        PutObjectArgs.builder()
            .bucket(properties.getBucket())
            .object(fileId)
            .stream(inputStream, file.length(), 10*1024*1024)
            .contentType(contentType)
            .build()
    );

    return FilePropertyDto.builder()
        .link(fileId)
        .build();
  }

  public byte[] download(String link) throws Exception {
    return IOUtils.toByteArray(minioClient.getObject(
            GetObjectArgs.builder()
                .bucket(properties.getBucket())
                .object(link)
                .build()
        )
    );
  }

  public void deleteFile(String link) throws Exception {
    minioClient.removeObject(
        RemoveObjectArgs.builder()
            .bucket(properties.getBucket())
            .object(link)
            .build()
    );
  }
}
